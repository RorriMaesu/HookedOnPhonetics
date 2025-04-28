import { useState } from 'react';

function SentenceCombiner() {
  const [level, setLevel] = useState('coordinate');
  const [sentence1, setSentence1] = useState('The dog barked.');
  const [sentence2, setSentence2] = useState('The cat meowed.');
  const [combinedSentence, setCombinedSentence] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const hints = {
    coordinate: 'Try using a coordinating conjunction like "and", "but", or "or" to join the sentences.',
    subordinate: 'Try using a subordinating conjunction like "because", "when", or "although" to show the relationship between the sentences.',
    participial: 'Try using a participle phrase (ending in -ing or -ed) to combine the sentences.',
  };
  
  const examples = {
    coordinate: 'The dog barked, and the cat meowed.',
    subordinate: 'The dog barked when the cat meowed.',
    participial: 'Barking loudly, the dog startled the meowing cat.',
  };
  
  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setCombinedSentence('');
    setIsCorrect(null);
    setShowHint(false);
  };
  
  const checkSentence = () => {
    if (!combinedSentence.trim()) {
      return;
    }
    
    // This is a simplified check - in a real implementation, 
    // we would use NLP to analyze the sentence structure
    let correct = false;
    
    if (level === 'coordinate') {
      correct = combinedSentence.includes('and') || 
                combinedSentence.includes('but') || 
                combinedSentence.includes('or');
    } else if (level === 'subordinate') {
      correct = combinedSentence.includes('because') || 
                combinedSentence.includes('when') || 
                combinedSentence.includes('although') ||
                combinedSentence.includes('if') ||
                combinedSentence.includes('while');
    } else if (level === 'participial') {
      correct = combinedSentence.includes('ing') || 
                combinedSentence.includes('ed');
    }
    
    setIsCorrect(correct);
  };
  
  const resetExercise = () => {
    setCombinedSentence('');
    setIsCorrect(null);
    setShowHint(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sentence Combiner</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex space-x-4 border-b mb-6">
          <button
            className={`px-4 py-2 ${level === 'coordinate' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => handleLevelChange('coordinate')}
          >
            Coordinate
          </button>
          <button
            className={`px-4 py-2 ${level === 'subordinate' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => handleLevelChange('subordinate')}
          >
            Subordinate
          </button>
          <button
            className={`px-4 py-2 ${level === 'participial' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => handleLevelChange('participial')}
          >
            Participial
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Combine these sentences:</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              {sentence1}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              {sentence2}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="combinedSentence" className="block text-gray-700 mb-2">Your combined sentence:</label>
          <textarea
            id="combinedSentence"
            value={combinedSentence}
            onChange={(e) => setCombinedSentence(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Type your combined sentence here..."
          ></textarea>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={checkSentence}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
        
        {showHint && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
            <h4 className="font-semibold mb-2">Hint:</h4>
            <p>{hints[level]}</p>
            <h4 className="font-semibold mt-4 mb-2">Example:</h4>
            <p>{examples[level]}</p>
          </div>
        )}
        
        {isCorrect !== null && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h4 className="font-semibold mb-2">{isCorrect ? 'Correct!' : 'Try Again'}</h4>
            <p>
              {isCorrect 
                ? 'Great job combining the sentences!' 
                : 'Your sentence doesn\'t seem to use the right structure. Try using the hint for guidance.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SentenceCombiner;
