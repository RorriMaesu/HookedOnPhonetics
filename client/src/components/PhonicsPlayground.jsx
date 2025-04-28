import { useState } from 'react';

function PhonicsPlayground() {
  const [selectedGame, setSelectedGame] = useState('soundSwap');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Phonics Playground</h2>
      
      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 ${selectedGame === 'soundSwap' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedGame('soundSwap')}
        >
          Sound-Swap
        </button>
        <button
          className={`px-4 py-2 ${selectedGame === 'elkoninBox' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedGame('elkoninBox')}
        >
          Elkonin-Box
        </button>
      </div>
      
      {selectedGame === 'soundSwap' && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Sound-Swap Game</h3>
          <p className="text-gray-600 mb-4">Change one sound to make a new word.</p>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-800 font-bold text-xl">c</div>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-800 font-bold text-xl">a</div>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-800 font-bold text-xl">t</div>
            </div>
            
            <p className="text-gray-600">Change one letter to make "bat"</p>
            
            <div className="flex space-x-2">
              <input 
                type="text" 
                maxLength="1" 
                className="w-12 h-12 text-center text-xl font-bold border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-800 font-bold text-xl">a</div>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-800 font-bold text-xl">t</div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Check
            </button>
          </div>
        </div>
      )}
      
      {selectedGame === 'elkoninBox' && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Elkonin-Box Tiles</h3>
          <p className="text-gray-600 mb-4">Segment words into individual sounds.</p>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center mb-4">
              <img 
                src="https://via.placeholder.com/150?text=Dog" 
                alt="Dog" 
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex space-x-1">
              <div className="w-16 h-16 border-2 border-blue-300 rounded-lg flex items-center justify-center"></div>
              <div className="w-16 h-16 border-2 border-blue-300 rounded-lg flex items-center justify-center"></div>
              <div className="w-16 h-16 border-2 border-blue-300 rounded-lg flex items-center justify-center"></div>
            </div>
            
            <div className="flex space-x-2">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg text-green-800 font-bold text-xl cursor-pointer hover:bg-green-200">d</div>
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg text-green-800 font-bold text-xl cursor-pointer hover:bg-green-200">o</div>
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg text-green-800 font-bold text-xl cursor-pointer hover:bg-green-200">g</div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Check
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhonicsPlayground;
