import { useState, useRef } from 'react';

function FluencySprint() {
  const [isReading, setIsReading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wcpm, setWcpm] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  
  const sampleText = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. It is often used to test typewriters and computer fonts. The phrase has been used since the late 19th century to display examples of fonts and to test typewriters. A pangram is a sentence that contains every letter of a given alphabet.`;
  
  const wordCount = sampleText.split(' ').length;
  
  const startReading = () => {
    setIsReading(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
  };
  
  const stopReading = () => {
    setIsReading(false);
    clearInterval(timerRef.current);
    
    // Calculate words per minute
    const minutes = elapsedTime / 60;
    const calculatedWcpm = Math.round(wordCount / minutes);
    
    setWordsRead(wordCount);
    setAccuracy(95); // Placeholder value
    setWcpm(calculatedWcpm);
  };
  
  const resetReading = () => {
    setIsReading(false);
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setWordsRead(0);
    setAccuracy(0);
    setWcpm(0);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fluency Sprint</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Reading Timer</div>
          <div className="text-2xl font-mono">{formatTime(elapsedTime)}</div>
        </div>
        
        <div className="mb-6">
          {!isReading && wcpm === 0 ? (
            <div className="flex space-x-4">
              <button
                onClick={startReading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Reading
              </button>
            </div>
          ) : isReading ? (
            <div className="flex space-x-4">
              <button
                onClick={stopReading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={resetReading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        
        <div className={`p-4 rounded-lg ${isReading ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
          <p className="text-gray-800 leading-relaxed">{sampleText}</p>
        </div>
      </div>
      
      {!isReading && wcpm > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-600 uppercase font-semibold">Words Read</div>
              <div className="text-3xl font-bold">{wordsRead}</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="text-sm text-green-600 uppercase font-semibold">Accuracy</div>
              <div className="text-3xl font-bold">{accuracy}%</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="text-sm text-purple-600 uppercase font-semibold">WCPM</div>
              <div className="text-3xl font-bold">{wcpm}</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Standard Celeration Chart</h4>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart visualization will be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FluencySprint;
