import { useState } from 'react';

function SemanticFeatureAnalyzer() {
  const [selectedWord, setSelectedWord] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [features, setFeatures] = useState({
    category: '',
    function: '',
    examples: '',
    nonExamples: '',
    synonyms: '',
    antonyms: '',
  });
  
  const tier2Words = [
    'analyze',
    'beneficial',
    'consequence',
    'demonstrate',
    'elaborate',
    'fundamental',
    'generate',
    'hypothesis',
    'integrate',
    'justify',
  ];
  
  const wordData = {
    analyze: {
      category: 'Verb',
      function: 'To examine methodically by separating into parts and studying their interrelations',
      examples: 'Scientists analyze data to draw conclusions. Students analyze literature to understand themes.',
      nonExamples: 'Guessing, skimming, or making quick judgments without careful examination',
      synonyms: 'Examine, investigate, study, evaluate, scrutinize',
      antonyms: 'Synthesize, combine, generalize, overlook',
    },
    beneficial: {
      category: 'Adjective',
      function: 'Producing good or helpful results or effects',
      examples: 'Regular exercise is beneficial for health. Reading is beneficial for vocabulary development.',
      nonExamples: 'Harmful activities, wasteful practices, or detrimental behaviors',
      synonyms: 'Helpful, advantageous, favorable, useful, valuable',
      antonyms: 'Harmful, detrimental, disadvantageous, unfavorable',
    },
    // Other words would have similar data structures
  };
  
  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setCustomWord('');
    
    if (wordData[word]) {
      setFeatures(wordData[word]);
    } else {
      // Reset features for words without predefined data
      setFeatures({
        category: '',
        function: '',
        examples: '',
        nonExamples: '',
        synonyms: '',
        antonyms: '',
      });
    }
  };
  
  const handleCustomWordChange = (e) => {
    setCustomWord(e.target.value);
    setSelectedWord('');
    
    // Reset features for custom words
    setFeatures({
      category: '',
      function: '',
      examples: '',
      nonExamples: '',
      synonyms: '',
      antonyms: '',
    });
  };
  
  const handleFeatureChange = (feature, value) => {
    setFeatures({
      ...features,
      [feature]: value,
    });
  };
  
  const saveAnalysis = () => {
    // In a real implementation, this would save the analysis to a database
    alert('Analysis saved successfully!');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Semantic Feature Analyzer</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Select a Tier-2 Word</h3>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tier2Words.map((word) => (
              <button
                key={word}
                onClick={() => handleWordSelect(word)}
                className={`px-3 py-1 rounded-full ${selectedWord === word ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {word}
              </button>
            ))}
          </div>
          
          <div className="mt-4">
            <label htmlFor="customWord" className="block text-gray-700 mb-2">Or enter your own word:</label>
            <input
              type="text"
              id="customWord"
              value={customWord}
              onChange={handleCustomWordChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a word..."
            />
          </div>
        </div>
        
        {(selectedWord || customWord) && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              Semantic Feature Analysis for "{selectedWord || customWord}"
            </h3>
            
            <div>
              <label htmlFor="category" className="block text-gray-700 mb-1">Category:</label>
              <input
                type="text"
                id="category"
                value={features.category}
                onChange={(e) => handleFeatureChange('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Noun, Verb, Adjective"
              />
            </div>
            
            <div>
              <label htmlFor="function" className="block text-gray-700 mb-1">Function/Definition:</label>
              <textarea
                id="function"
                value={features.function}
                onChange={(e) => handleFeatureChange('function', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="What does this word mean or do?"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="examples" className="block text-gray-700 mb-1">Examples:</label>
              <textarea
                id="examples"
                value={features.examples}
                onChange={(e) => handleFeatureChange('examples', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Sentences or contexts where this word applies"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="nonExamples" className="block text-gray-700 mb-1">Non-Examples:</label>
              <textarea
                id="nonExamples"
                value={features.nonExamples}
                onChange={(e) => handleFeatureChange('nonExamples', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="What this word does NOT apply to"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="synonyms" className="block text-gray-700 mb-1">Synonyms:</label>
              <input
                type="text"
                id="synonyms"
                value={features.synonyms}
                onChange={(e) => handleFeatureChange('synonyms', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Words with similar meanings"
              />
            </div>
            
            <div>
              <label htmlFor="antonyms" className="block text-gray-700 mb-1">Antonyms:</label>
              <input
                type="text"
                id="antonyms"
                value={features.antonyms}
                onChange={(e) => handleFeatureChange('antonyms', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Words with opposite meanings"
              />
            </div>
            
            <div className="pt-4">
              <button
                onClick={saveAnalysis}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SemanticFeatureAnalyzer;
