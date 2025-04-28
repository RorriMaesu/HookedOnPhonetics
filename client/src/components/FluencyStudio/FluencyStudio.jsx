import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import useSkillsStore from '../../store/skillsStore';
import contentService from '../../services/contentService';
import './FluencyStudio.css';

/**
 * FluencyStudio component for practicing reading fluency
 */
const FluencyStudio = () => {
  const { passageId } = useParams();
  const { user } = useUserStore();
  const { recordSkillAttempt } = useSkillsStore();
  const [passage, setPassage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [timer, setTimer] = useState(0);
  const [wcpm, setWcpm] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [highlightedText, setHighlightedText] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        setLoading(true);

        // Get passage from content service
        const foundPassage = await contentService.getFluencyPassage(passageId);

        if (foundPassage) {
          setPassage(foundPassage);
        } else {
          // If passage not found, get the first passage from content service
          const passages = await contentService.getFluencyPassages({ limit: 1 });
          if (passages && passages.length > 0) {
            setPassage(passages[0]);
            console.warn(`Passage with ID ${passageId} not found, using default passage`);
          } else {
            setError('No passages available. Please try again later.');
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching passage:', err);
        setError('Failed to load passage. Please try again later.');
        setLoading(false);
      }
    };

    fetchPassage();

    // Clean up audio resources when component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [passageId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);

        setAudioBlob(audioBlob);
        setAudioUrl(url);

        // Calculate WCPM (Words Correct Per Minute)
        // In a real app, this would use speech recognition to analyze the recording
        const minutes = timer / 60;
        const estimatedWcpm = Math.round(passage.wordCount / minutes);

        setWcpm(estimatedWcpm);

        // Generate feedback based on WCPM
        generateFeedback(estimatedWcpm);

        // Update BKT state
        const correct = estimatedWcpm >= passage.targetWcpm * 0.8;

        try {
          // Use the skillsStore to record the attempt
          if (user) {
            await recordSkillAttempt('fluency', correct);
          } else {
            console.log('User not authenticated, skipping BKT update');
          }
        } catch (err) {
          console.error('Error recording skill attempt:', err);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Start timer
      setTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone. Please check your permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();

      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());

      setRecording(false);

      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const generateFeedback = wcpm => {
    let feedbackText = '';
    let color = '';

    if (wcpm >= passage.targetWcpm * 1.1) {
      feedbackText =
        'Excellent! Your reading speed is above the target. Focus on maintaining good expression and comprehension.';
      color = 'green';
    } else if (wcpm >= passage.targetWcpm) {
      feedbackText = "Great job! You've reached the target reading speed with good accuracy.";
      color = 'green';
    } else if (wcpm >= passage.targetWcpm * 0.8) {
      feedbackText =
        "Good effort! You're close to the target reading speed. Try practicing this passage again to improve.";
      color = 'orange';
    } else {
      feedbackText =
        'Keep practicing! Try breaking the passage into smaller chunks and practice each part before reading the whole passage again.';
      color = 'red';
    }

    setFeedback({ text: feedbackText, color });
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const highlightPhrase = phrase => {
    setHighlightedText(phrase);
  };

  if (loading) {
    return <div className="fluency-studio-loading">Loading passage...</div>;
  }

  if (error) {
    return <div className="fluency-studio-error">{error}</div>;
  }

  return (
    <div className="fluency-studio-container">
      <div className="flex justify-between items-center mb-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {passage.category} | Level: {passage.readingLevel}
        </span>
      </div>

      <h2 className="fluency-studio-title">{passage.title}</h2>

      <div className="fluency-studio-content">
        <div className="passage-container">
          <div className="passage-text">
            {passage.text.split('. ').map((sentence, index) => (
              <span
                key={index}
                className={highlightedText === sentence ? 'highlighted' : ''}
                onClick={() => highlightPhrase(sentence)}
              >
                {sentence}
                {index < passage.text.split('. ').length - 1 ? '. ' : ''}
              </span>
            ))}
          </div>

          <div className="passage-info">
            <div className="word-count">
              <span className="info-label">Words:</span>
              <span className="info-value">{passage.wordCount}</span>
            </div>
            <div className="target-wcpm">
              <span className="info-label">Target WCPM:</span>
              <span className="info-value">{passage.targetWcpm}</span>
            </div>
            <div className="difficulty">
              <span className="info-label">Difficulty:</span>
              <span className="info-value">{passage.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="recording-container">
          <div className="timer">{formatTime(timer)}</div>

          <div className="recording-controls">
            {!recording && !audioUrl && (
              <button className="start-recording-button" onClick={startRecording}>
                Start Reading
              </button>
            )}

            {recording && (
              <button className="stop-recording-button" onClick={stopRecording}>
                Stop Recording
              </button>
            )}

            {audioUrl && (
              <div className="audio-player">
                <audio src={audioUrl} controls />
                <button
                  className="retry-button"
                  onClick={() => {
                    URL.revokeObjectURL(audioUrl);
                    setAudioUrl(null);
                    setAudioBlob(null);
                    setWcpm(null);
                    setFeedback(null);
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {wcpm !== null && (
            <div className="results">
              <div className="wcpm-result">
                <span className="result-label">Your WCPM:</span>
                <span className="result-value">{wcpm}</span>
              </div>

              {feedback && (
                <div className="feedback" style={{ color: feedback.color }}>
                  {feedback.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="prosody-coach">
        <h3>Prosody Coach</h3>
        <p>Click on any sentence in the passage to practice reading it with expression.</p>

        {highlightedText && (
          <div className="prosody-tips">
            <h4>Tips for Reading with Expression:</h4>
            <ul>
              <li>Pause briefly at commas and longer at periods</li>
              <li>Raise your voice slightly for questions</li>
              <li>Emphasize important words</li>
              <li>Change your tone to match the mood of the text</li>
            </ul>

            <div className="highlighted-sentence">"{highlightedText}"</div>

            <button
              className="practice-button"
              onClick={() => {
                // In a real app, this would provide audio guidance
                alert('Prosody practice feature coming soon!');
              }}
            >
              Practice This Sentence
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FluencyStudio;
