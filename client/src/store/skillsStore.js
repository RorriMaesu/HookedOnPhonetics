import { create } from 'zustand';
import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import bktService from '../services/bktService';
import { mockSkills, mockUserSkills, mockNextSkill } from '../data/mockSkills';

const useSkillsStore = create((set, get) => ({
  // Skills data
  skills: [],
  userSkills: {},
  nextSkill: null,
  isLoading: false,
  error: null,

  // Fetch all skills
  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      let skills = [];

      try {
        // Try to fetch from Firestore first
        const skillsRef = collection(db, 'skills');
        const skillsQuery = query(skillsRef, orderBy('difficulty'));
        const snapshot = await getDocs(skillsQuery);

        skills = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // If no skills found in Firestore, use mock data
        if (skills.length === 0) {
          console.log('No skills found in Firestore, using mock data');
          skills = mockSkills;
        }
      } catch (firestoreError) {
        // If Firestore fails, use mock data
        console.log('Firestore error, using mock data:', firestoreError);
        skills = mockSkills;
      }

      set({ skills, isLoading: false });
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Fetch user skills (with mastery data)
  fetchUserSkills: async userId => {
    set({ isLoading: true, error: null });
    try {
      let userSkills = {};

      try {
        // Try to fetch from Firestore first
        const userSkillsRef = collection(db, `users/${userId}/skills`);
        const snapshot = await getDocs(userSkillsRef);

        snapshot.docs.forEach(doc => {
          userSkills[doc.id] = doc.data();
        });

        // If no user skills found in Firestore, use mock data
        if (Object.keys(userSkills).length === 0) {
          console.log('No user skills found in Firestore, using mock data');
          userSkills = mockUserSkills;
        }
      } catch (firestoreError) {
        // If Firestore fails, use mock data
        console.log('Firestore error, using mock data:', firestoreError);
        userSkills = mockUserSkills;
      }

      set({ userSkills, isLoading: false });
      return userSkills;
    } catch (error) {
      console.error('Error fetching user skills:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Get the next recommended skill
  fetchNextSkill: async () => {
    set({ isLoading: true, error: null });
    try {
      let nextSkill = null;

      try {
        // Try to fetch from BKT service first
        nextSkill = await bktService.getNextSkill();

        // If no next skill found, use mock data
        if (!nextSkill) {
          console.log('No next skill found from BKT service, using mock data');
          nextSkill = mockNextSkill;
        }
      } catch (bktError) {
        // If BKT service fails, use mock data
        console.log('BKT service error, using mock data:', bktError);
        nextSkill = mockNextSkill;
      }

      set({ nextSkill, isLoading: false });
      return nextSkill;
    } catch (error) {
      console.error('Error fetching next skill:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Record a skill attempt
  recordSkillAttempt: async (skillId, correct) => {
    set({ isLoading: true, error: null });
    try {
      const result = await bktService.recordAttempt(skillId, correct);

      // Update the user skill in the store
      set(state => {
        const userSkills = { ...state.userSkills };
        userSkills[skillId] = {
          ...(userSkills[skillId] || {}),
          mastery: result.mastery,
          lastUpdated: new Date().toISOString(),
        };
        return { userSkills, isLoading: false };
      });

      return result;
    } catch (error) {
      console.error('Error recording skill attempt:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Check if a skill is mastered
  isSkillMastered: skillId => {
    const { userSkills } = get();
    const skill = userSkills[skillId];
    return skill?.mastery >= 0.95;
  },

  // Get skill mastery level
  getSkillMastery: skillId => {
    const { userSkills } = get();
    const skill = userSkills[skillId];
    return skill?.mastery || 0;
  },

  // Clear any errors
  clearError: () => set({ error: null }),
}));

export default useSkillsStore;
