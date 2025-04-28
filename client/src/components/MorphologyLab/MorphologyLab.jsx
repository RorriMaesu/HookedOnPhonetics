import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import bktService from '../../services/bktService';
import './MorphologyLab.css';

/**
 * MorphologyLab component for learning word parts and their meanings
 */
const MorphologyLab = () => {
  const { lessonId } = useParams();
  const { user } = useAuthStore();
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
        
        // Fetch lesson from Firestore (this would be implemented in a real app)
        // For now, we'll use mock data
        const mockLesson = {
          id: 'morphology_prefixes',
          title: 'Common Prefixes',
          description: 'Learn common prefixes and their meanings',
          words: [
            {
              word: 'unhappy',
              colorCoded: '<span class="prefix">un</span><span class="root">happy</span>',
              parts: [
                { type: 'prefix', text: 'un', meaning: 'not' },
                { type: 'root', text: 'happy', meaning: 'feeling pleasure or contentment' }
              ],
              definition: 'not happy; sad or discontented',
              sentence: 'She was unhappy with her test score and decided to study harder next time.'
            },
            {
              word: 'preview',
              colorCoded: '<span class="prefix">pre</span><span class="root">view</span>',
              parts: [
                { type: 'prefix', text: 'pre', meaning: 'before' },
                { type: 'root', text: 'view', meaning: 'to look at or see' }
              ],
              definition: 'to view or see beforehand',
              sentence: 'The teacher gave us a preview of the material we would cover next week.'
            },
            {
              word: 'rewrite',
              colorCoded: '<span class="prefix">re</span><span class="root">write</span>',
              parts: [
                { type: 'prefix', text: 're', meaning: 'again' },
                { type: 'root', text: 'write', meaning: 'to form letters or words' }
              ],
              definition: 'to write again or differently',
              sentence: 'She had to rewrite her essay after receiving feedback from her teacher.'
            },
            {
              word: 'disappear',
              colorCoded: '<span class="prefix">dis</span><span class="root">appear</span>',
              parts: [
                { type: 'prefix', text: 'dis', meaning: 'not, opposite of' },
                { type: 'root', text: 'appear', meaning: 'to come into view' }
              ],
              definition: 'to cease to be visible or to exist',
              sentence: 'The magician made the rabbit disappear during the magic show.'
            },
            {
              word: 'misplace',
              colorCoded: '<span class="prefix">mis</span><span class="root">place</span>',
              parts: [
                { type: 'prefix', text: 'mis', meaning: 'wrongly' },
                { type: 'root', text: 'place', meaning: 'to put in a specific location' }
              ],
              definition: 'to put in a wrong place and be unable to find',
              sentence: 'I misplaced my keys and spent an hour looking for them.'
            }
          ]
        };
        
        setLesson(mockLesson);
        setUserAnswers(new Array(mockLesson.words.length).fill(null));
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
    
    if (!userAnswer) return false;
    
    // Find the part that matches the user's selected part type
    const correctPart = currentWord.parts.find(part => part.type === userAnswer.partType);
    
    if (!correctPart) return false;
    
    // Check if the meaning matches
    return correctPart.meaning === userAnswer.meaning;
  };
  
  const handleNext = () => {
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
        bktService.recordAttempt('morphology_prefixes', finalScore >= 0.7);
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
        <h2 className="morphology-lab-title">{lesson.title}</h2>
        
        <div className="lesson-complete">
          <h3>Lesson Complete!</h3>
          
          <div className="score-container">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
            </div>
            <p className="score-text">You got {score} out of {lesson.words.length} correct!</p>
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
          
          <button 
            className="retry-button"
            onClick={resetLesson}
          >
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
          <h3 className="word-title" dangerouslySetInnerHTML={{ __html: currentWord.colorCoded }}></h3>
          <p className="word-definition">{currentWord.definition}</p>
        </div>
        
        <div className="word-sentence">
          <p>"{currentWord.sentence}"</p>
        </div>
        
        <div className="word-parts">
          <h4>Word Parts:</h4>
          
          <div className="parts-container">
            {currentWord.parts.map((part, index) => (
              <div 
                key={index}
                className={`part-card ${part.type}`}
              >
                <div className="part-header">
                  <span className="part-type">{part.type}</span>
                  <span className="part-text">{part.text}</span>
                </div>
                
                <div className="part-meaning">
                  <h5>Meaning:</h5>
                  <p>{part.meaning}</p>
                </div>
                
                <button 
                  className={`select-button ${userAnswer?.partType === part.type && userAnswer?.meaning === part.meaning ? 'selected' : ''}`}
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
        
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={!userAnswer || showFeedback}
        >
          {currentWordIndex < lesson.words.length - 1 ? 'Next Word' : 'Complete Lesson'}
        </button>
      </div>
    </div>
  );
};

export default MorphologyLab;
