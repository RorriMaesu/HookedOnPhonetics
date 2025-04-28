import { useState } from 'react';
import useSettingsStore from '../store/settingsStore';

function IntensityToggle() {
  const { intensityLevel, updateSetting } = useSettingsStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleIntensityChange = (level) => {
    if (level !== intensityLevel) {
      setShowConfirmation(true);
    }
  };
  
  const confirmIntensityChange = (level) => {
    updateSetting('intensityLevel', level);
    setShowConfirmation(false);
  };
  
  const cancelIntensityChange = () => {
    setShowConfirmation(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Intensity Settings</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Learning Intensity</h3>
        <p className="text-gray-600 mb-6">
          Adjust your learning schedule based on your goals and availability.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
              intensityLevel === 'high' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => handleIntensityChange('high')}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                intensityLevel === 'high' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                {intensityLevel === 'high' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold">High Intensity</h4>
                <p className="text-gray-600 mb-2">Daily practice for maximum progress</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Recommended for intensive intervention</li>
                  <li>30-45 minutes of daily practice</li>
                  <li>Weekly progress assessments</li>
                  <li>Personalized feedback on all activities</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
              intensityLevel === 'maintenance' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
            onClick={() => handleIntensityChange('maintenance')}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                intensityLevel === 'maintenance' ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                {intensityLevel === 'maintenance' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold">Maintenance</h4>
                <p className="text-gray-600 mb-2">3 times per week to maintain skills</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Recommended for skill maintenance</li>
                  <li>20-30 minutes, 3 times per week</li>
                  <li>Bi-weekly progress checks</li>
                  <li>Focus on reinforcing learned skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Current Schedule:</h4>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            {intensityLevel === 'high' ? (
              <div>
                <p className="font-medium">Daily Practice Schedule</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
                  <li>Phonics: 10-15 minutes</li>
                  <li>Fluency: 10-15 minutes</li>
                  <li>Writing: 10-15 minutes</li>
                  <li>Weekly teletherapy session: 45 minutes</li>
                </ul>
              </div>
            ) : (
              <div>
                <p className="font-medium">Maintenance Schedule</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600">
                  <li>Monday: Phonics (20-30 minutes)</li>
                  <li>Wednesday: Fluency (20-30 minutes)</li>
                  <li>Friday: Writing (20-30 minutes)</li>
                  <li>Bi-weekly teletherapy session: 30 minutes</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Change Intensity Level?</h3>
            <p className="text-gray-600 mb-6">
              Changing your intensity level will adjust your learning schedule and reminders. 
              Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelIntensityChange}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmIntensityChange(intensityLevel === 'high' ? 'maintenance' : 'high')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntensityToggle;
