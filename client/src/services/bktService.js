import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { API_BASE_URL } from '../config/constants';

/**
 * Service for interacting with the BKT (Bayesian Knowledge Tracing) API
 */
class BktService {
  /**
   * Record a skill attempt and update the BKT state
   * 
   * @param {string} skillId - The ID of the skill
   * @param {boolean} correct - Whether the attempt was correct
   * @returns {Promise<Object>} - The updated BKT state
   */
  async recordAttempt(skillId, correct) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const idToken = await user.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/skills/${skillId}/attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          correct,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to record attempt');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error recording attempt:', error);
      throw error;
    }
  }
  
  /**
   * Get the next recommended skill for the current user
   * 
   * @returns {Promise<Object>} - The next recommended skill
   */
  async getNextSkill() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const idToken = await user.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/users/${user.uid}/nextSkill`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // No next skill found
        }
        
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get next skill');
      }
      
      const data = await response.json();
      return data.nextSkill;
    } catch (error) {
      console.error('Error getting next skill:', error);
      throw error;
    }
  }
  
  /**
   * Check if a skill is mastered by the current user
   * 
   * @param {string} skillId - The ID of the skill
   * @returns {Promise<boolean>} - Whether the skill is mastered
   */
  async isSkillMastered(skillId) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const idToken = await user.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/users/${user.uid}/skills/${skillId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return false; // Skill not found, so not mastered
        }
        
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check skill mastery');
      }
      
      const data = await response.json();
      return data.mastery >= 0.95; // Consider mastered if mastery probability >= 95%
    } catch (error) {
      console.error('Error checking skill mastery:', error);
      throw error;
    }
  }
}

export default new BktService();
