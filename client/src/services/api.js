/**
 * API service for making requests to the backend
 */

// Base API URL from environment variables
const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://us-central1-hookedonphonetics-d58c3.cloudfunctions.net/api';

/**
 * Make a request to the API
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<any>} - The response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

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
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - The registered user data
   */
  register: async userData => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store the auth token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  },

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   * @returns {Promise<Object>} - The logged in user data
   */
  login: async credentials => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store the auth token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  },

  /**
   * Logout the current user
   * @returns {Promise<Object>} - The logout response
   */
  logout: async () => {
    // Remove the auth token
    localStorage.removeItem('authToken');

    return { message: 'Logout successful' };
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
    return apiRequest(`/progress/${userId}`);
  },

  /**
   * Save user progress
   * @param {Object} progressData - The progress data to save
   * @returns {Promise<Object>} - The saved progress data
   */
  saveProgress: async progressData => {
    return apiRequest('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  },
};

/**
 * Health check API method
 */
export const healthCheck = async () => {
  return apiRequest('/health');
};

/**
 * Skills API methods
 */
export const skillsAPI = {
  /**
   * Record a skill attempt
   * @param {string} skillId - The skill ID
   * @param {Object} attemptData - The attempt data
   * @returns {Promise<Object>} - The updated skill data
   */
  recordAttempt: async (skillId, attemptData) => {
    return apiRequest(`/skills/${skillId}/attempt`, {
      method: 'POST',
      body: JSON.stringify(attemptData),
    });
  },

  /**
   * Get the next recommended skill
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} - The next skill recommendation
   */
  getNextSkill: async userId => {
    return apiRequest(`/users/${userId}/nextSkill`);
  },

  /**
   * Get a user's skill data
   * @param {string} userId - The user ID
   * @param {string} skillId - The skill ID
   * @returns {Promise<Object>} - The skill data
   */
  getUserSkill: async (userId, skillId) => {
    return apiRequest(`/users/${userId}/skills/${skillId}`);
  },
};

export default {
  auth: authAPI,
  progress: progressAPI,
  skills: skillsAPI,
  healthCheck,
};
