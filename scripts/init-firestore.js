const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
try {
  const serviceAccountPath = path.join(__dirname, '..', 'functions', 'config', 'serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized with service account key');
  } else {
    // Fall back to default credentials
    admin.initializeApp();
    console.log('Firebase Admin initialized with default credentials');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  process.exit(1);
}

// Get Firestore instance
const db = admin.firestore();

// Sample skills data
const skills = [
  {
    id: 'phoneme_awareness',
    name: 'Phoneme Awareness',
    description: 'Recognize and manipulate individual sounds in words',
    difficulty: 1,
    prerequisites: [],
    category: 'phonology',
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
    difficulty: 1,
    prerequisites: ['phoneme_awareness'],
    category: 'phonics',
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
    difficulty: 2,
    prerequisites: ['letter_sound_correspondence'],
    category: 'phonics',
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
    difficulty: 2,
    prerequisites: ['letter_sound_correspondence'],
    category: 'phonics',
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
    difficulty: 3,
    prerequisites: ['blending', 'segmenting'],
    category: 'syllables',
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
    difficulty: 4,
    prerequisites: ['syllable_types'],
    category: 'morphology',
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
    difficulty: 4,
    prerequisites: ['syllable_types'],
    category: 'fluency',
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
];

// Sample passages data
const passages = [
  {
    id: 'passage_1',
    title: 'The Mysterious Forest',
    text: 'Deep in the heart of the mysterious forest, ancient trees stood tall and proud. Their branches reached toward the sky, creating a canopy that filtered the sunlight into dappled patterns on the forest floor. A small stream wound its way through the undergrowth, its clear water bubbling over smooth stones. Birds called to one another from hidden perches, their songs echoing through the quiet woods. A family of deer moved silently between the trees, pausing occasionally to nibble at tender shoots of grass. The air was filled with the scent of pine needles and wildflowers. It was a peaceful place, untouched by the busy world beyond its borders.',
    wordCount: 103,
    difficulty: 'intermediate',
    targetWcpm: 120,
    category: 'narrative',
    readingLevel: '4-5',
  },
  {
    id: 'passage_2',
    title: 'The Water Cycle',
    text: 'Water is always moving in a continuous cycle. The sun heats up water from oceans, lakes, and rivers, turning it into water vapor. This process is called evaporation. As the water vapor rises into the cooler air, it condenses to form clouds. This is condensation. When the clouds become heavy with water droplets, precipitation occurs in the form of rain, snow, sleet, or hail. The water falls back to Earth and collects in bodies of water or soaks into the ground. Some of it flows as runoff into streams and rivers, eventually making its way back to the ocean. The cycle then begins again with evaporation.',
    wordCount: 98,
    difficulty: 'intermediate',
    targetWcpm: 115,
    category: 'informational',
    readingLevel: '4-5',
  },
  {
    id: 'repeated_reading',
    title: 'The Lost Key',
    text: 'Maya could not find her house key anywhere. She looked in her backpack, on her desk, and under her bed. She even checked all her coat pockets. "Mom, have you seen my key?" she called. Her mother suggested checking the kitchen counter. Maya ran to the kitchen and there it was, right next to the fruit bowl. "I must have left it there when I got a snack after school," she thought. Maya was relieved. She put the key in her pocket and promised herself to be more careful next time.',
    wordCount: 82,
    difficulty: 'beginner',
    targetWcpm: 100,
    category: 'narrative',
    readingLevel: '2-3',
  },
];

// Sample lessons data
const lessons = [
  {
    id: 'prefixes',
    title: 'Common Prefixes',
    description: 'Learn common prefixes and their meanings',
    skillId: 'morphology',
    difficulty: 'intermediate',
    words: [
      {
        word: 'unhappy',
        colorCoded: '<span class="prefix">un</span><span class="root">happy</span>',
        parts: [
          { type: 'prefix', text: 'un', meaning: 'not' },
          { type: 'root', text: 'happy', meaning: 'feeling pleasure or contentment' }
        ],
        definition: 'not happy; sad or discontented',
        sentence: 'She was unhappy with her test score and decided to study harder next time.'
      },
      {
        word: 'preview',
        colorCoded: '<span class="prefix">pre</span><span class="root">view</span>',
        parts: [
          { type: 'prefix', text: 'pre', meaning: 'before' },
          { type: 'root', text: 'view', meaning: 'to look at or see' }
        ],
        definition: 'to view or see beforehand',
        sentence: 'The teacher gave us a preview of the material we would cover next week.'
      },
      {
        word: 'rewrite',
        colorCoded: '<span class="prefix">re</span><span class="root">write</span>',
        parts: [
          { type: 'prefix', text: 're', meaning: 'again' },
          { type: 'root', text: 'write', meaning: 'to form letters or words' }
        ],
        definition: 'to write again or differently',
        sentence: 'She had to rewrite her essay after receiving feedback from her teacher.'
      },
    ],
  },
  {
    id: 'suffixes',
    title: 'Common Suffixes',
    description: 'Learn common suffixes and their meanings',
    skillId: 'morphology',
    difficulty: 'intermediate',
    words: [
      {
        word: 'teacher',
        colorCoded: '<span class="root">teach</span><span class="suffix">er</span>',
        parts: [
          { type: 'root', text: 'teach', meaning: 'to impart knowledge or skill' },
          { type: 'suffix', text: 'er', meaning: 'person who does something' }
        ],
        definition: 'a person who teaches, especially in a school',
        sentence: 'Our teacher explained the math problem step by step.'
      },
      {
        word: 'happiness',
        colorCoded: '<span class="root">happy</span><span class="suffix">ness</span>',
        parts: [
          { type: 'root', text: 'happy', meaning: 'feeling pleasure or contentment' },
          { type: 'suffix', text: 'ness', meaning: 'state or quality' }
        ],
        definition: 'the state of being happy',
        sentence: 'The children\'s laughter was a sign of their happiness.'
      },
    ],
  },
];

// Function to add data to Firestore
async function addDataToFirestore() {
  try {
    // Add skills
    console.log('Adding skills to Firestore...');
    const skillsPromises = skills.map(async (skill) => {
      const { id, ...skillData } = skill;
      await db.collection('skills').doc(id).set(skillData);
      console.log(`Added skill: ${id}`);
    });
    await Promise.all(skillsPromises);
    
    // Add passages
    console.log('Adding passages to Firestore...');
    const passagesPromises = passages.map(async (passage) => {
      const { id, ...passageData } = passage;
      await db.collection('passages').doc(id).set(passageData);
      console.log(`Added passage: ${id}`);
    });
    await Promise.all(passagesPromises);
    
    // Add lessons
    console.log('Adding lessons to Firestore...');
    const lessonsPromises = lessons.map(async (lesson) => {
      const { id, ...lessonData } = lesson;
      await db.collection('lessons').doc(id).set(lessonData);
      console.log(`Added lesson: ${id}`);
    });
    await Promise.all(lessonsPromises);
    
    console.log('All data added to Firestore successfully!');
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
}

// Create a test user
async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    // Check if user already exists
    try {
      const userRecord = await admin.auth().getUserByEmail('test@example.com');
      console.log('Test user already exists:', userRecord.uid);
      return userRecord.uid;
    } catch (error) {
      // User doesn't exist, create a new one
      if (error.code === 'auth/user-not-found') {
        const userRecord = await admin.auth().createUser({
          email: 'test@example.com',
          password: 'password123',
          displayName: 'Test User',
        });
        console.log('Test user created:', userRecord.uid);
        return userRecord.uid;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

// Initialize user skills
async function initializeUserSkills(userId) {
  try {
    console.log(`Initializing skills for user ${userId}...`);
    
    // Add some initial skill mastery data
    const userSkills = {
      'phoneme_awareness': {
        mastery: 0.95,
        attempts: 10,
        correctAttempts: 9,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      'letter_sound_correspondence': {
        mastery: 0.8,
        attempts: 8,
        correctAttempts: 6,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      'blending': {
        mastery: 0.6,
        attempts: 5,
        correctAttempts: 3,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
    };
    
    // Add user skills to Firestore
    const userSkillsRef = db.collection('users').doc(userId).collection('skills');
    const promises = Object.entries(userSkills).map(async ([skillId, skillData]) => {
      await userSkillsRef.doc(skillId).set(skillData);
      console.log(`Added skill ${skillId} for user ${userId}`);
    });
    
    await Promise.all(promises);
    console.log(`Skills initialized for user ${userId}`);
  } catch (error) {
    console.error('Error initializing user skills:', error);
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Add data to Firestore
    await addDataToFirestore();
    
    // Create a test user
    const userId = await createTestUser();
    
    // Initialize user skills
    await initializeUserSkills(userId);
    
    console.log('Firestore initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    process.exit(1);
  }
}

// Run the main function
main();
