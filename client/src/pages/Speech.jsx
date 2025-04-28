import { useState } from 'react';
import SpeechPractice from '../components/SpeechPractice';
import TeletherapyWidget from '../components/TeletherapyWidget';
import useProgressStore from '../store/progressStore';

function Speech() {
  const [activeModule, setActiveModule] = useState('practice');
  const { speechProgress } = useProgressStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Speech Practice</h1>
      <p className="text-gray-600">
        Improve your pronunciation and speaking skills with interactive exercises.
      </p>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'practice'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('practice')}
          >
            Speech Practice
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeModule === 'teletherapy'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveModule('teletherapy')}
          >
            Teletherapy
          </button>
        </div>

        <div className="p-6">
          {activeModule === 'practice' && <SpeechPractice />}
          {activeModule === 'teletherapy' && <TeletherapyWidget />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Speech Progress</h2>
        <p className="text-gray-600">Track your progress in developing speech skills.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Pronunciation</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${speechProgress.pronunciation}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {speechProgress.pronunciation}% complete
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Fluency</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${speechProgress.fluency}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {speechProgress.fluency}% complete
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${speechProgress.overall}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-right">
              {speechProgress.overall}% complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speech;
