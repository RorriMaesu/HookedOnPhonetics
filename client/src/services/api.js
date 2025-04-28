/**
 * API service for making requests to the backend
 */

import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { API_BASE_URL } from '../config/constants';

// Get Firebase Functions instance
const functions = getFunctions();

/**
 * Make a request to the API using Firebase Functions
 * @param {string} functionName - The Firebase function name
 * @param {Object} data - The data to send to the function
 * @returns {Promise<any>} - The response data
 */
const callFunction = async (functionName, data = {}) => {
  try {
    const functionRef = httpsCallable(functions, functionName);
    const result = await functionRef(data);
    return result.data;
  } catch (error) {
    console.error(`Function Error (${functionName}):`, error);
    throw error;
  }
};

/**
 * Make a request to the API using fetch
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<any>} - The response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    // Get the current user's ID token
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // For 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Auth API methods
 */
export const authAPI = {
  /**
   * Get the current user's profile
   * @returns {Promise<Object>} - The user profile data
   */
  getCurrentUser: async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No user is currently signed in');
      }

      // Get additional user data from Firestore if needed
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  /**
   * Update the current user's profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise<Object>} - The updated profile data
   */
  updateProfile: async profileData => {
    return callFunction('updateUserProfile', profileData);
  },
};

/**
 * Progress API methods
 */
export const progressAPI = {
  /**
   * Get user progress
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} - The user progress data
   */
  getUserProgress: async userId => {
    return callFunction('getUserProgress', { userId });
  },

  /**
   * Save user progress
   * @param {Object} progressData - The progress data to save
   * @returns {Promise<Object>} - The saved progress data
   */
  saveProgress: async progressData => {
    return callFunction('saveProgress', progressData);
  },

  /**
   * Get user statistics
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} - The user statistics
   */
  getUserStats: async userId => {
    return callFunction('getUserStats', { userId });
  },
};

/**
 * Health check API method
 */
export const healthCheck = async () => {
  return callFunction('healthCheck');
};

/**
 * Skills API methods
 */
export const skillsAPI = {
  /**
   * Get all skills
   * @returns {Promise<Array>} - Array of all skills
   */
  getAllSkills: async () => {
    return callFunction('getAllSkills');
  },

  /**
   * Get a skill by ID
   * @param {string} skillId - The skill ID
   * @returns {Promise<Object>} - The skill data
   */
  getSkill: async skillId => {
    return callFunction('getSkill', { skillId });
  },

  /**
   * Record a skill attempt
   * @param {string} skillId - The skill ID
   * @param {Object} attemptData - The attempt data
   * @returns {Promise<Object>} - The updated skill data
   */
  recordAttempt: async (skillId, attemptData) => {
    return callFunction('recordSkillAttempt', {
      skillId,
      ...attemptData,
    });
  },

  /**
   * Get the next recommended skill
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} - The next skill recommendation
   */
  getNextSkill: async userId => {
    return callFunction('getNextSkill', { userId });
  },

  /**
   * Get a user's skill data
   * @param {string} userId - The user ID
   * @param {string} skillId - The skill ID
   * @returns {Promise<Object>} - The skill data
   */
  getUserSkill: async (userId, skillId) => {
    return callFunction('getUserSkill', { userId, skillId });
  },

  /**
   * Get all user skills
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} - Object mapping skill IDs to user skill data
   */
  getUserSkills: async userId => {
    return callFunction('getUserSkills', { userId });
  },
};

/**
 * Content API methods
 */
export const contentAPI = {
  /**
   * Get all passages
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Array of passages
   */
  getPassages: async (options = {}) => {
    return callFunction('getPassages', options);
  },

  /**
   * Get a passage by ID
   * @param {string} passageId - The passage ID
   * @returns {Promise<Object>} - The passage data
   */
  getPassage: async passageId => {
    return callFunction('getPassage', { passageId });
  },

  /**
   * Get all lessons
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Array of lessons
   */
  getLessons: async (options = {}) => {
    return callFunction('getLessons', options);
  },

  /**
   * Get a lesson by ID
   * @param {string} lessonId - The lesson ID
   * @returns {Promise<Object>} - The lesson data
   */
  getLesson: async lessonId => {
    return callFunction('getLesson', { lessonId });
  },
};

export default {
  auth: authAPI,
  progress: progressAPI,
  skills: skillsAPI,
  content: contentAPI,
  healthCheck,
};
