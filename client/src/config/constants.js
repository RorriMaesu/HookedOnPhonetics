/**
 * Application constants
 */

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://us-central1-hookedonphonetics-d58c3.cloudfunctions.net/api';

// Mastery threshold (95%)
export const MASTERY_THRESHOLD = 0.95;

// Skill categories
export const SKILL_CATEGORIES = {
  PHONOLOGY: 'phonology',
  PHONICS: 'phonics',
  SYLLABLES: 'syllables',
  MORPHOLOGY: 'morphology',
  FLUENCY: 'fluency',
  VOCABULARY: 'vocabulary',
  COMPREHENSION: 'comprehension',
  WRITING: 'writing',
};

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 1,
  EASY: 2,
  INTERMEDIATE: 3,
  ADVANCED: 4,
  EXPERT: 5,
};

export default {
  API_BASE_URL,
  MASTERY_THRESHOLD,
  SKILL_CATEGORIES,
  DIFFICULTY_LEVELS,
};
