/**
 * Mock data for skills
 */

import { SKILL_CATEGORIES, DIFFICULTY_LEVELS } from '../config/constants';

const { 
  PHONOLOGY, 
  PHONICS, 
  SYLLABLES, 
  MORPHOLOGY, 
  FLUENCY, 
  VOCABULARY, 
  COMPREHENSION, 
  WRITING 
} = SKILL_CATEGORIES;

const { 
  BEGINNER, 
  EASY, 
  INTERMEDIATE, 
  ADVANCED, 
  EXPERT 
} = DIFFICULTY_LEVELS;

/**
 * Mock skills data
 */
export const mockSkills = [
  {
    id: 'phoneme_awareness',
    name: 'Phoneme Awareness',
    description: 'Recognize and manipulate individual sounds in words',
    difficulty: BEGINNER,
    prerequisites: [],
    category: PHONOLOGY,
    activities: [
      {
        id: 'phoneme_isolation',
        name: 'Phoneme Isolation',
        description: 'Identify individual sounds in words',
      },
      {
        id: 'phoneme_blending',
        name: 'Phoneme Blending',
        description: 'Combine individual sounds to form words',
      },
      {
        id: 'phoneme_segmentation',
        name: 'Phoneme Segmentation',
        description: 'Break words into individual sounds',
      },
    ],
  },
  {
    id: 'letter_sound_correspondence',
    name: 'Letter-Sound Correspondence',
    description: 'Connect letters to their sounds',
    difficulty: BEGINNER,
    prerequisites: ['phoneme_awareness'],
    category: PHONICS,
    activities: [
      {
        id: 'letter_recognition',
        name: 'Letter Recognition',
        description: 'Identify letters by name and sound',
      },
      {
        id: 'sound_matching',
        name: 'Sound Matching',
        description: 'Match letters to their sounds',
      },
      {
        id: 'letter_writing',
        name: 'Letter Writing',
        description: 'Practice writing letters',
      },
    ],
  },
  {
    id: 'blending',
    name: 'Blending',
    description: 'Combine sounds to form words',
    difficulty: EASY,
    prerequisites: ['letter_sound_correspondence'],
    category: PHONICS,
    activities: [
      {
        id: 'onset_rime_blending',
        name: 'Onset-Rime Blending',
        description: 'Blend the beginning sound with the rest of the word',
      },
      {
        id: 'word_building',
        name: 'Word Building',
        description: 'Build words by combining sounds',
      },
      {
        id: 'word_chains',
        name: 'Word Chains',
        description: 'Change one sound at a time to make new words',
      },
    ],
  },
  {
    id: 'segmenting',
    name: 'Segmenting',
    description: 'Break words into individual sounds',
    difficulty: EASY,
    prerequisites: ['letter_sound_correspondence'],
    category: PHONICS,
    activities: [
      {
        id: 'sound_counting',
        name: 'Sound Counting',
        description: 'Count the number of sounds in words',
      },
      {
        id: 'sound_isolation',
        name: 'Sound Isolation',
        description: 'Identify specific sounds in words',
      },
      {
        id: 'sound_deletion',
        name: 'Sound Deletion',
        description: 'Remove sounds from words to make new words',
      },
    ],
  },
  {
    id: 'syllable_types',
    name: 'Syllable Types',
    description: 'Recognize and read different syllable patterns',
    difficulty: INTERMEDIATE,
    prerequisites: ['blending', 'segmenting'],
    category: SYLLABLES,
    activities: [
      {
        id: 'closed_syllables',
        name: 'Closed Syllables',
        description: 'Syllables ending in a consonant (CVC)',
      },
      {
        id: 'open_syllables',
        name: 'Open Syllables',
        description: 'Syllables ending in a vowel (CV)',
      },
      {
        id: 'vowel_consonant_e',
        name: 'Vowel-Consonant-e Syllables',
        description: 'Syllables with a silent e (CVCe)',
      },
    ],
  },
  {
    id: 'morphology',
    name: 'Morphology',
    description: 'Understand word parts and their meanings',
    difficulty: ADVANCED,
    prerequisites: ['syllable_types'],
    category: MORPHOLOGY,
    activities: [
      {
        id: 'prefixes',
        name: 'Prefixes',
        description: 'Word parts added to the beginning of words',
      },
      {
        id: 'suffixes',
        name: 'Suffixes',
        description: 'Word parts added to the end of words',
      },
      {
        id: 'root_words',
        name: 'Root Words',
        description: 'Base words that can have prefixes and suffixes added',
      },
    ],
  },
  {
    id: 'fluency',
    name: 'Fluency',
    description: 'Read with accuracy, speed, and expression',
    difficulty: ADVANCED,
    prerequisites: ['syllable_types'],
    category: FLUENCY,
    activities: [
      {
        id: 'repeated_reading',
        name: 'Repeated Reading',
        description: 'Read the same passage multiple times to improve fluency',
      },
      {
        id: 'choral_reading',
        name: 'Choral Reading',
        description: 'Read along with a model reader',
      },
      {
        id: 'timed_reading',
        name: 'Timed Reading',
        description: 'Read as many words as possible in a set time',
      },
    ],
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Learn and understand new words',
    difficulty: INTERMEDIATE,
    prerequisites: ['blending', 'segmenting'],
    category: VOCABULARY,
    activities: [
      {
        id: 'word_relationships',
        name: 'Word Relationships',
        description: 'Understand synonyms, antonyms, and homonyms',
      },
      {
        id: 'context_clues',
        name: 'Context Clues',
        description: 'Use surrounding text to determine word meaning',
      },
      {
        id: 'word_categories',
        name: 'Word Categories',
        description: 'Group words by meaning or function',
      },
    ],
  },
  {
    id: 'comprehension',
    name: 'Comprehension',
    description: 'Understand and interpret text',
    difficulty: EXPERT,
    prerequisites: ['fluency', 'vocabulary'],
    category: COMPREHENSION,
    activities: [
      {
        id: 'main_idea',
        name: 'Main Idea',
        description: 'Identify the central theme or message of a text',
      },
      {
        id: 'sequencing',
        name: 'Sequencing',
        description: 'Understand the order of events in a text',
      },
      {
        id: 'inferencing',
        name: 'Inferencing',
        description: 'Draw conclusions based on information in the text',
      },
    ],
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Express ideas through written language',
    difficulty: EXPERT,
    prerequisites: ['morphology', 'vocabulary'],
    category: WRITING,
    activities: [
      {
        id: 'sentence_structure',
        name: 'Sentence Structure',
        description: 'Construct grammatically correct sentences',
      },
      {
        id: 'paragraph_writing',
        name: 'Paragraph Writing',
        description: 'Organize ideas into cohesive paragraphs',
      },
      {
        id: 'essay_writing',
        name: 'Essay Writing',
        description: 'Develop multi-paragraph compositions',
      },
    ],
  },
];

/**
 * Mock user skills data
 */
export const mockUserSkills = {
  phoneme_awareness: {
    mastery: 0.95,
    lastUpdated: '2023-06-15T12:00:00Z',
  },
  letter_sound_correspondence: {
    mastery: 0.85,
    lastUpdated: '2023-06-20T12:00:00Z',
  },
  blending: {
    mastery: 0.75,
    lastUpdated: '2023-06-25T12:00:00Z',
  },
  segmenting: {
    mastery: 0.65,
    lastUpdated: '2023-06-30T12:00:00Z',
  },
  syllable_types: {
    mastery: 0.45,
    lastUpdated: '2023-07-05T12:00:00Z',
  },
  morphology: {
    mastery: 0.25,
    lastUpdated: '2023-07-10T12:00:00Z',
  },
  fluency: {
    mastery: 0.15,
    lastUpdated: '2023-07-15T12:00:00Z',
  },
};

/**
 * Mock next skill recommendation
 */
export const mockNextSkill = {
  id: 'syllable_types',
  name: 'Syllable Types',
  description: 'Recognize and read different syllable patterns',
  difficulty: INTERMEDIATE,
  prerequisites: ['blending', 'segmenting'],
  category: SYLLABLES,
};

export default {
  mockSkills,
  mockUserSkills,
  mockNextSkill,
};
