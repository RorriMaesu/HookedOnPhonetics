import { useState } from 'react';

function ContextClueDetective() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [guessedMeaning, setGuessedMeaning] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Sample passage with unknown words
  const passage = {
    text: `The archaeologist carefully excavated the ancient artifacts. She was meticulous in her work, recording every detail and taking photographs. The artifacts were fragile and could easily be damaged. Some of the pottery was adorned with intricate designs that depicted scenes from daily life. The archaeologist was ecstatic when she discovered a perfectly preserved scroll. This was an unprecedented find for the region.`,
    unknownWords: [
      {
        word: 'excavated',
        position: 4,
        definition: 'dug out and removed',
        clueType: 'definition',
        clueText: 'carefully dug out and removed',
      },
      {
        word: 'meticulous',
        position: 11,
        definition: 'showing great attention to detail; very careful and precise',
        clueType: 'example',
        clueText: 'recording every detail and taking photographs',
      },
      {
        word: 'fragile',
        position: 24,
        definition: 'easily broken or damaged',
        clueType: 'restatement',
        clueText: 'could easily be damaged',
      },
      {
        word: 'adorned',
        position: 35,
        definition: 'decorated or enhanced the appearance of',
        clueType: 'synonym',
        clueText: 'decorated with',
      },
      {
        word: 'ecstatic',
        position: 53,
        definition: 'feeling or expressing overwhelming happiness or joyful excitement',
        clueType: 'context',
        clueText: 'very happy because of the discovery',
      },
      {
        word: 'unprecedented',
        position: 64,
        definition: 'never done or known before',
        clueType: 'explanation',
        clueText: 'never before found in this region',
      },
    ],
  };
  
  // Split the passage into words
  const words = passage.text.split(/\s+/);
  
  // Find the unknown word objects by their positions
  const getUnknownWordByPosition = (position) => {
    return passage.unknownWords.find(word => word.position === position);
  };
  
  const handleWordClick = (index) => {
    const unknownWord = getUnknownWordByPosition(index);
    if (unknownWord) {
      setSelectedWord(unknownWord);
      setGuessedMeaning('');
      setShowHint(false);
      setShowAnswer(false);
    }
  };
  
  const checkGuess = () => {
    // In a real implementation, this would use NLP to check if the guessed meaning is close enough
    // For now, we'll just show the answer
    setShowAnswer(true);
  };
  
  const resetExercise = () => {
    setSelectedWord(null);
    setGuessedMeaning('');
    setShowHint(false);
    setShowAnswer(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Context Clue Detective</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Find the Unknown Words</h3>
        <p className="text-gray-600 mb-4">Click on words you don't know to use context clues to figure out their meanings.</p>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
          <p className="leading-relaxed">
            {words.map((word, index) => {
              const unknownWord = getUnknownWordByPosition(index);
              const cleanWord = word.replace(/[.,;!?]$/, '');
              const punctuation = word.substring(cleanWord.length);
              
              return (
                <span key={index}>
                  {unknownWord ? (
                    <button
                      onClick={() => handleWordClick(index)}
                      className={`font-medium ${selectedWord && selectedWord.position === index ? 'bg-yellow-200 text-yellow-800' : 'text-blue-600 hover:bg-blue-50'}`}
                    >
                      {cleanWord}
                    </button>
                  ) : (
                    <span>{cleanWord}</span>
                  )}
                  {punctuation}
                  {' '}
                </span>
              );
            })}
          </p>
        </div>
        
        {selectedWord && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 border-b border-gray-200">
              <h4 className="font-bold text-lg">Selected Word: <span className="text-blue-600">{selectedWord.word}</span></h4>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="guessedMeaning" className="block text-gray-700 mb-2">What do you think this word means?</label>
                <textarea
                  id="guessedMeaning"
                  value={guessedMeaning}
                  onChange={(e) => setGuessedMeaning(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Enter your guess..."
                ></textarea>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={checkGuess}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!guessedMeaning.trim()}
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
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                  <h5 className="font-semibold mb-1">Hint:</h5>
                  <p>Look for {selectedWord.clueType} context clues in the surrounding text.</p>
                  <p className="mt-2">Relevant text: "{selectedWord.clueText}"</p>
                </div>
              )}
              
              {showAnswer && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold mb-1">Definition:</h5>
                  <p>{selectedWord.definition}</p>
                  <h5 className="font-semibold mt-3 mb-1">Context Clue Type:</h5>
                  <p>{selectedWord.clueType}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContextClueDetective;
