import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      // Theme settings
      theme: 'light', // 'light' or 'dark'
      fontSize: 'medium', // 'small', 'medium', or 'large'
      
      // Speech recognition settings
      speechRecognition: 'webSpeech', // 'webSpeech' or 'deepgram'
      
      // Learning intensity settings
      intensityLevel: 'high', // 'high' or 'maintenance'
      
      // Update a specific setting
      updateSetting: (setting, value) => {
        set({ [setting]: value });
      },
      
      // Reset all settings to defaults
      resetSettings: () => {
        set({
          theme: 'light',
          fontSize: 'medium',
          speechRecognition: 'webSpeech',
          intensityLevel: 'high',
        });
      },
    }),
    {
      name: 'hooked-on-phonetics-settings',
    }
  )
);

export default useSettingsStore;
