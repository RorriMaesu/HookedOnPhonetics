import { useState } from 'react';

function MorphologyEngine() {
  const [selectedPrefix, setSelectedPrefix] = useState('');
  const [selectedRoot, setSelectedRoot] = useState('');
  const [selectedSuffix, setSelectedSuffix] = useState('');
  const [wordDefinition, setWordDefinition] = useState('');
  
  const prefixes = [
    { value: 're', meaning: 'again or back' },
    { value: 'un', meaning: 'not or opposite' },
    { value: 'dis', meaning: 'not or opposite' },
    { value: 'pre', meaning: 'before' },
    { value: 'in', meaning: 'not or in' },
  ];
  
  const roots = [
    { value: 'form', meaning: 'shape' },
    { value: 'ject', meaning: 'throw' },
    { value: 'spect', meaning: 'look' },
    { value: 'port', meaning: 'carry' },
    { value: 'tract', meaning: 'pull' },
  ];
  
  const suffixes = [
    { value: 'able', meaning: 'capable of' },
    { value: 'ible', meaning: 'capable of' },
    { value: 'tion', meaning: 'action or process' },
    { value: 'ment', meaning: 'action or result' },
    { value: 'ful', meaning: 'full of' },
  ];
  
  const handlePrefixClick = (prefix) => {
    setSelectedPrefix(prefix.value);
    updateWordDefinition(prefix.value, selectedRoot, selectedSuffix);
  };
  
  const handleRootClick = (root) => {
    setSelectedRoot(root.value);
    updateWordDefinition(selectedPrefix, root.value, selectedSuffix);
  };
  
  const handleSuffixClick = (suffix) => {
    setSelectedSuffix(suffix.value);
    updateWordDefinition(selectedPrefix, selectedRoot, suffix.value);
  };
  
  const updateWordDefinition = (prefix, root, suffix) => {
    if (!root) {
      setWordDefinition('');
      return;
    }
    
    const prefixObj = prefixes.find(p => p.value === prefix);
    const rootObj = roots.find(r => r.value === root);
    const suffixObj = suffixes.find(s => s.value === suffix);
    
    let definition = '';
    
    if (prefixObj) {
      definition += `"${prefixObj.value}" (${prefixObj.meaning}) + `;
    }
    
    definition += `"${rootObj.value}" (${rootObj.meaning})`;
    
    if (suffixObj) {
      definition += ` + "${suffixObj.value}" (${suffixObj.meaning})`;
    }
    
    setWordDefinition(definition);
  };
  
  const resetWord = () => {
    setSelectedPrefix('');
    setSelectedRoot('');
    setSelectedSuffix('');
    setWordDefinition('');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Morphology Engine</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Word Factory</h3>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-2">
            <div className={`h-16 min-w-[80px] flex items-center justify-center rounded-lg border-2 ${selectedPrefix ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              {selectedPrefix || 'Prefix'}
            </div>
            <div className="text-gray-400">+</div>
            <div className={`h-16 min-w-[80px] flex items-center justify-center rounded-lg border-2 ${selectedRoot ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
              {selectedRoot || 'Root'}
            </div>
            <div className="text-gray-400">+</div>
            <div className={`h-16 min-w-[80px] flex items-center justify-center rounded-lg border-2 ${selectedSuffix ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}>
              {selectedSuffix || 'Suffix'}
            </div>
            <div className="text-gray-400">=</div>
            <div className="h-16 min-w-[120px] flex items-center justify-center rounded-lg bg-yellow-50 border-2 border-yellow-300 font-bold">
              {selectedPrefix}{selectedRoot}{selectedSuffix}
            </div>
          </div>
        </div>
        
        {wordDefinition && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-2">Word Meaning</h4>
            <p>{wordDefinition}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2 text-green-600">Prefixes</h4>
            <div className="space-y-2">
              {prefixes.map((prefix) => (
                <button
                  key={prefix.value}
                  onClick={() => handlePrefixClick(prefix)}
                  className={`w-full p-2 rounded-lg text-left ${selectedPrefix === prefix.value ? 'bg-green-100 border border-green-300' : 'bg-gray-50 border border-gray-200 hover:bg-green-50'}`}
                >
                  <span className="font-semibold">{prefix.value}-</span>
                  <span className="text-sm text-gray-600 ml-2">({prefix.meaning})</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-blue-600">Roots</h4>
            <div className="space-y-2">
              {roots.map((root) => (
                <button
                  key={root.value}
                  onClick={() => handleRootClick(root)}
                  className={`w-full p-2 rounded-lg text-left ${selectedRoot === root.value ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 border border-gray-200 hover:bg-blue-50'}`}
                >
                  <span className="font-semibold">{root.value}</span>
                  <span className="text-sm text-gray-600 ml-2">({root.meaning})</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-purple-600">Suffixes</h4>
            <div className="space-y-2">
              {suffixes.map((suffix) => (
                <button
                  key={suffix.value}
                  onClick={() => handleSuffixClick(suffix)}
                  className={`w-full p-2 rounded-lg text-left ${selectedSuffix === suffix.value ? 'bg-purple-100 border border-purple-300' : 'bg-gray-50 border border-gray-200 hover:bg-purple-50'}`}
                >
                  <span className="font-semibold">-{suffix.value}</span>
                  <span className="text-sm text-gray-600 ml-2">({suffix.meaning})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetWord}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reset Word
          </button>
        </div>
      </div>
    </div>
  );
}

export default MorphologyEngine;
