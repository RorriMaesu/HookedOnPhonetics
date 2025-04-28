import { useState, useEffect, useRef } from 'react';
import useSettingsStore from '../store/settingsStore';

function SpeechPractice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidenceScores, setConfidenceScores] = useState([]);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [practiceWords, setPracticeWords] = useState([
    'articulate',
    'benevolent',
    'cognizant',
    'diligent',
    'eloquent',
    'fastidious',
    'gregarious',
    'hypothetical',
    'innovative',
    'judicious',
  ]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const recognitionRef = useRef(null);
  const { speechRecognition } = useSettingsStore();
  
  useEffect(() => {
    // Check if Web Speech API is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSpeechSupported(false);
    } else {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const result = event.results[0];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
        
        // Generate mock confidence scores for each word
        const words = transcriptText.split(' ');
        const scores = words.map(() => Math.random());
        setConfidenceScores(scores);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  const startListening = () => {
    setTranscript('');
    setConfidenceScores([]);
    setSelectedWord(null);
    setIsListening(true);
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      // Fallback for testing when speech recognition is not available
      setTimeout(() => {
        const mockTranscript = `This is a simulated speech recognition result for the word ${practiceWords[currentWordIndex]}.`;
        setTranscript(mockTranscript);
        
        const words = mockTranscript.split(' ');
        const scores = words.map(() => Math.random());
        setConfidenceScores(scores);
        
        setIsListening(false);
      }, 2000);
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };
  
  const handleWordClick = (index) => {
    setSelectedWord(index);
  };
  
  const markWordCorrect = () => {
    if (selectedWord !== null) {
      // In a real implementation, this would update the user's progress
      setSelectedWord(null);
    }
  };
  
  const markWordIncorrect = () => {
    if (selectedWord !== null) {
      // In a real implementation, this would update the user's progress
      setSelectedWord(null);
    }
  };
  
  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % practiceWords.length);
    setTranscript('');
    setConfidenceScores([]);
    setSelectedWord(null);
  };
  
  const previousWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex - 1 + practiceWords.length) % practiceWords.length);
    setTranscript('');
    setConfidenceScores([]);
    setSelectedWord(null);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Speech Practice</h2>
      
      {!isSpeechSupported && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
          <p className="font-bold">Speech Recognition Not Supported</p>
          <p>Your browser does not support the Web Speech API. Please try using Chrome, Edge, or Safari.</p>
          <p className="mt-2">Using {speechRecognition === 'webSpeech' ? 'Web Speech API' : 'Deepgram'} as configured in settings.</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Pronunciation Practice</h3>
        
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousWord}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">Practice Word ({currentWordIndex + 1}/{practiceWords.length})</p>
            <p className="text-2xl font-bold">{practiceWords[currentWordIndex]}</p>
          </div>
          
          <button
            onClick={nextWord}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Next →
          </button>
        </div>
        
        <div className="flex justify-center mb-6">
          {isListening ? (
            <button
              onClick={stopListening}
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition-colors"
            >
              Stop Listening
            </button>
          ) : (
            <button
              onClick={startListening}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-colors"
              disabled={!isSpeechSupported}
            >
              Start Listening
            </button>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg min-h-[100px] mb-4">
          {isListening ? (
            <p className="text-center text-gray-500">Listening...</p>
          ) : transcript ? (
            <p className="text-gray-800">
              {transcript.split(' ').map((word, index) => (
                <span 
                  key={index}
                  onClick={() => handleWordClick(index)}
                  className={`cursor-pointer ${
                    selectedWord === index 
                      ? 'bg-yellow-200' 
                      : confidenceScores[index] < 0.6 
                        ? 'bg-red-100' 
                        : confidenceScores[index] < 0.8 
                          ? 'bg-yellow-100' 
                          : ''
                  } ${confidenceScores[index] < 0.6 ? 'border-b-2 border-red-400' : ''}`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-center text-gray-500">Your speech will appear here...</p>
          )}
        </div>
        
        {selectedWord !== null && (
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={markWordCorrect}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              ✓ Correct
            </button>
            <button
              onClick={markWordIncorrect}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ✗ Incorrect
            </button>
          </div>
        )}
        
        <div className="text-center text-sm text-gray-500">
          <p>Words with lower confidence are highlighted. Click on any word to mark it as correct or incorrect.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Speech Tips</h3>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Speak clearly and at a moderate pace.</li>
          <li>Practice difficult sounds repeatedly.</li>
          <li>Record yourself speaking and listen to identify areas for improvement.</li>
          <li>Pay attention to word stress and intonation.</li>
          <li>Read aloud regularly to improve fluency.</li>
        </ul>
      </div>
    </div>
  );
}

export default SpeechPractice;
