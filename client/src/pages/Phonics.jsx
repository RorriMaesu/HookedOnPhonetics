import { useState } from 'react';
import PhonicsPlayground from '../components/PhonicsPlayground';
import FluencySprint from '../components/FluencySprint';
import MorphologyEngine from '../components/MorphologyEngine';
import useProgressStore from '../store/progressStore';

function Phonics() {
  const [activeModule, setActiveModule] = useState('phonics');
  const { phonicsProgress } = useProgressStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Phonics Playground</h1>
      <p className="text-gray-600">
        Develop phonological awareness and phonics skills through interactive exercises.
      </p>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'phonics'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('phonics')}
          >
            Phonics Playground
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'fluency'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('fluency')}
          >
            Fluency Sprint
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'morphology'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('morphology')}
          >
            Morphology Engine
          </button>
        </div>

        <div className="p-6">
          {activeModule === 'phonics' && <PhonicsPlayground />}
          {activeModule === 'fluency' && <FluencySprint />}
          {activeModule === 'morphology' && <MorphologyEngine />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Phonics Progress</h2>
        <p className="text-gray-600">Track your progress in mastering phonics skills.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Sound-Swap Games</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${phonicsProgress.soundSwap}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {phonicsProgress.soundSwap}% complete
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Elkonin-Box Tiles</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${phonicsProgress.elkoninBox}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {phonicsProgress.elkoninBox}% complete
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${phonicsProgress.overall}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {phonicsProgress.overall}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phonics;
