import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import useSkillsStore from '../../store/skillsStore';
import contentService from '../../services/contentService';
import './MorphologyLab.css';

/**
 * MorphologyLab component for learning word parts and their meanings
 */
const MorphologyLab = () => {
  const { lessonId } = useParams();
  const { user } = useUserStore();
  const { recordSkillAttempt } = useSkillsStore();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);

        // Get lesson from content service
        const foundLesson = await contentService.getMorphologyLesson(lessonId);

        if (foundLesson) {
          setLesson(foundLesson);
          setUserAnswers(new Array(foundLesson.words.length).fill(null));
        } else {
          // If lesson not found, get the first lesson from content service
          const lessons = await contentService.getMorphologyLessons({ limit: 1 });
          if (lessons && lessons.length > 0) {
            setLesson(lessons[0]);
            setUserAnswers(new Array(lessons[0].words.length).fill(null));
            console.warn(`Lesson with ID ${lessonId} not found, using default lesson`);
          } else {
            setError('No lessons available. Please try again later.');
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Failed to load lesson. Please try again later.');
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleAnswerSelect = (partType, meaning) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentWordIndex] = { partType, meaning };
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    const currentWord = lesson.words[currentWordIndex];
    const userAnswer = userAnswers[currentWordIndex];

    if (!userAnswer) {
      return false;
    }

    // Find the part that matches the user's selected part type
    const correctPart = currentWord.parts.find(part => part.type === userAnswer.partType);

    if (!correctPart) {
      return false;
    }

    // Check if the meaning matches
    return correctPart.meaning === userAnswer.meaning;
  };

  const handleNext = async () => {
    const isCorrect = checkAnswer();

    if (isCorrect) {
      // Update score
      setScore(prevScore => prevScore + 1);
    }

    setShowFeedback(true);

    // After a delay, move to the next word or complete the lesson
    setTimeout(() => {
      setShowFeedback(false);

      if (currentWordIndex < lesson.words.length - 1) {
        setCurrentWordIndex(prevIndex => prevIndex + 1);
      } else {
        // Lesson complete
        setLessonComplete(true);

        // Calculate final score as a percentage
        const finalScore = (score + (isCorrect ? 1 : 0)) / lesson.words.length;

        // Update BKT state
        try {
          if (user) {
            recordSkillAttempt('morphology', finalScore >= 0.7);
          } else {
            console.log('User not authenticated, skipping BKT update');
          }
        } catch (err) {
          console.error('Error recording skill attempt:', err);
        }
      }
    }, 2000);
  };

  const resetLesson = () => {
    setCurrentWordIndex(0);
    setUserAnswers(new Array(lesson.words.length).fill(null));
    setShowFeedback(false);
    setLessonComplete(false);
    setScore(0);
  };

  if (loading) {
    return <div className="morphology-lab-loading">Loading lesson...</div>;
  }

  if (error) {
    return <div className="morphology-lab-error">{error}</div>;
  }

  if (lessonComplete) {
    const finalScore = score / lesson.words.length;
    const percentage = Math.round(finalScore * 100);

    return (
      <div className="morphology-lab-container">
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            &larr; Back to Dashboard
          </Link>
          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Morphology | Difficulty: {lesson.difficulty}
          </span>
        </div>

        <h2 className="morphology-lab-title">{lesson.title}</h2>

        <div className="lesson-complete">
          <h3>Lesson Complete!</h3>

          <div className="score-container">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
            </div>
            <p className="score-text">
              You got {score} out of {lesson.words.length} correct!
            </p>
          </div>

          <div className="lesson-summary">
            <h4>What You Learned:</h4>
            <ul>
              {lesson.words.map((word, index) => (
                <li key={index}>
                  <strong>{word.word}</strong>: {word.definition}
                </li>
              ))}
            </ul>
          </div>

          <button className="retry-button" onClick={resetLesson}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentWord = lesson.words[currentWordIndex];
  const userAnswer = userAnswers[currentWordIndex];
  const isCorrect = showFeedback && checkAnswer();

  return (
    <div className="morphology-lab-container">
      <div className="flex justify-between items-center mb-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
        <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
          Morphology | Difficulty: {lesson.difficulty}
        </span>
      </div>

      <h2 className="morphology-lab-title">{lesson.title}</h2>

      <div className="lesson-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentWordIndex / lesson.words.length) * 100}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Word {currentWordIndex + 1} of {lesson.words.length}
        </span>
      </div>

      <div className="word-card">
        <div className="word-header">
          <h3
            className="word-title"
            dangerouslySetInnerHTML={{ __html: currentWord.colorCoded }}
          ></h3>
          <p className="word-definition">{currentWord.definition}</p>
        </div>

        <div className="word-sentence">
          <p>"{currentWord.sentence}"</p>
        </div>

        <div className="word-parts">
          <h4>Word Parts:</h4>

          <div className="parts-container">
            {currentWord.parts.map((part, index) => (
              <div key={index} className={`part-card ${part.type}`}>
                <div className="part-header">
                  <span className="part-type">{part.type}</span>
                  <span className="part-text">{part.text}</span>
                </div>

                <div className="part-meaning">
                  <h5>Meaning:</h5>
                  <p>{part.meaning}</p>
                </div>

                <button
                  className={`select-button ${
                    userAnswer?.partType === part.type && userAnswer?.meaning === part.meaning
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(part.type, part.meaning)}
                  disabled={showFeedback}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Correct! Great job!</p>
            ) : (
              <p>Not quite. The correct answer is highlighted.</p>
            )}
          </div>
        )}

        <button className="next-button" onClick={handleNext} disabled={!userAnswer || showFeedback}>
          {currentWordIndex < lesson.words.length - 1 ? 'Next Word' : 'Complete Lesson'}
        </button>
      </div>
    </div>
  );
};

export default MorphologyLab;
