import { create } from 'zustand';

const useProgressStore = create((set, get) => ({
  // Progress data for different modules
  phonicsProgress: {
    soundSwap: 0,
    elkoninBox: 0,
    overall: 0,
  },
  speechProgress: {
    pronunciation: 0,
    fluency: 0,
    overall: 0,
  },
  writingProgress: {
    planning: 0,
    organizing: 0,
    drafting: 0,
    revising: 0,
    overall: 0,
  },
  
  // Update progress for a specific module and skill
  updateProgress: (module, skill, value) => {
    set((state) => {
      const moduleProgress = { ...state[`${module}Progress`] };
      moduleProgress[skill] = value;
      
      // Calculate overall progress as average of all skills
      const skills = Object.keys(moduleProgress).filter(k => k !== 'overall');
      const sum = skills.reduce((acc, curr) => acc + moduleProgress[curr], 0);
      moduleProgress.overall = sum / skills.length;
      
      return {
        [`${module}Progress`]: moduleProgress,
      };
    });
  },
  
  // Get overall progress across all modules
  getOverallProgress: () => {
    const state = get();
    const modules = ['phonics', 'speech', 'writing'];
    const sum = modules.reduce((acc, module) => acc + state[`${module}Progress`].overall, 0);
    return sum / modules.length;
  },
  
  // Reset progress for a specific module
  resetProgress: (module) => {
    set((state) => {
      const moduleProgress = { ...state[`${module}Progress`] };
      Object.keys(moduleProgress).forEach(key => {
        moduleProgress[key] = 0;
      });
      
      return {
        [`${module}Progress`]: moduleProgress,
      };
    });
  },
}));

export default useProgressStore;
