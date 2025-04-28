import { useState } from 'react';
import IntensityToggle from '../components/IntensityToggle';
import ImageService from '../components/ImageService';
import useSettingsStore from '../store/settingsStore';

function Settings() {
  const { theme, fontSize, speechRecognition, updateSetting } = useSettingsStore();
  const [activeSection, setActiveSection] = useState('appearance');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600">Customize your learning experience.</p>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeSection === 'appearance'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('appearance')}
          >
            Appearance
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeSection === 'speech'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('speech')}
          >
            Speech Recognition
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeSection === 'intensity'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('intensity')}
          >
            Learning Intensity
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeSection === 'images'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveSection('images')}
          >
            Image Generation
          </button>
        </div>

        <div className="p-6">
          {activeSection === 'appearance' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Appearance</h2>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Theme</label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('theme', 'light')}
                  >
                    Light
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('theme', 'dark')}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Font Size</label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      fontSize === 'small' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('fontSize', 'small')}
                  >
                    Small
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      fontSize === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('fontSize', 'medium')}
                  >
                    Medium
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      fontSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('fontSize', 'large')}
                  >
                    Large
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'speech' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Speech Recognition</h2>

              <div>
                <label className="block text-gray-700 mb-2">Speech Recognition Engine</label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      speechRecognition === 'webSpeech'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('speechRecognition', 'webSpeech')}
                  >
                    Web Speech API
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      speechRecognition === 'deepgram'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => updateSetting('speechRecognition', 'deepgram')}
                  >
                    Deepgram
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">Speech Recognition Information</h3>
                <p className="text-sm text-gray-600">
                  Web Speech API is built into most modern browsers and works offline, but may have
                  limited accuracy.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Deepgram provides higher accuracy but requires an internet connection and API key.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'intensity' && <IntensityToggle />}

          {activeSection === 'images' && <ImageService />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Account Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">User Profile</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Name:</span> Demo User
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Email:</span> demo@example.com
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Account Type:</span> Standard
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Data & Privacy</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                Your data is stored securely and is not shared with third parties.
              </p>
              <div className="mt-3">
                <button className="text-sm text-blue-600 hover:underline">Download My Data</button>
              </div>
              <div className="mt-1">
                <button className="text-sm text-red-600 hover:underline">Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
