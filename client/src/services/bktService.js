import { getAuth } from 'firebase/auth';
import { skillsAPI } from './api';

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

      return await skillsAPI.recordAttempt(skillId, {
        userId: user.uid,
        correct,
      });
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

      try {
        const data = await skillsAPI.getNextSkill(user.uid);
        return data.nextSkill;
      } catch (error) {
        if (error.message.includes('404')) {
          return null; // No next skill found
        }
        throw error;
      }
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

      try {
        const data = await skillsAPI.getUserSkill(user.uid, skillId);
        return data.mastery >= 0.95; // Consider mastered if mastery probability >= 95%
      } catch (error) {
        if (error.message.includes('404')) {
          return false; // Skill not found, so not mastered
        }
        throw error;
      }
    } catch (error) {
      console.error('Error checking skill mastery:', error);
      throw error;
    }
  }
}

export default new BktService();
