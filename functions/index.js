import { onRequest, onCall } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { updateBktState, getNextSkill } from './src/bkt.js';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to service account key file
const serviceAccountPath = join(__dirname, 'config', 'serviceAccountKey.json');

// Initialize Firebase Admin
try {
  // Check if service account key file exists
  if (fs.existsSync(serviceAccountPath)) {
    // Use service account key file
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('Firebase Admin initialized with service account key');
  } else {
    // Fall back to default credentials
    initializeApp();
    console.log('Firebase Admin initialized with default credentials');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  // Fall back to default credentials
  initializeApp();
  console.log('Firebase Admin initialized with default credentials after error');
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Auth routes
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user with Firebase Auth Admin
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: displayName || '',
    });

    // Create a custom token for the new user
    const token = await getAuth().createCustomToken(userRecord.uid);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || '',
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user by email
    const userRecord = await getAuth().getUserByEmail(email);

    // Create a custom token for the user
    const token = await getAuth().createCustomToken(userRecord.uid);

    return res.status(200).json({
      message: 'Login successful',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || '',
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// User progress routes
app.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);

    // Only allow users to access their own data
    if (decodedToken.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Get user progress from Firestore
    const progressSnapshot = await getFirestore()
      .collection('progress')
      .where('userId', '==', userId)
      .get();

    const progressData = [];
    progressSnapshot.forEach(doc => {
      progressData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.status(200).json({ progress: progressData });
  } catch (error) {
    console.error('Get progress error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get progress' });
  }
});

app.post('/progress', async (req, res) => {
  try {
    const { userId, module, activity, score, completed } = req.body;

    // Verify auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);

    // Only allow users to update their own data
    if (decodedToken.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Add progress to Firestore
    const progressRef = await getFirestore().collection('progress').add({
      userId,
      module,
      activity,
      score,
      completed,
      timestamp: new Date().toISOString(),
    });

    return res.status(201).json({
      message: 'Progress saved successfully',
      progressId: progressRef.id,
    });
  } catch (error) {
    console.error('Save progress error:', error);
    return res.status(500).json({ error: error.message || 'Failed to save progress' });
  }
});

// BKT routes
app.post('/skills/:skillId/attempt', async (req, res) => {
  try {
    const { skillId } = req.params;
    const { userId, correct } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Verify auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);

    // Only allow users to update their own data
    if (decodedToken.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Update BKT state
    const result = await updateBktState(userId, skillId, correct);

    return res.status(200).json(result);
  } catch (error) {
    console.error('BKT update error:', error);
    return res.status(500).json({ error: error.message || 'Failed to update BKT state' });
  }
});

app.get('/users/:userId/nextSkill', async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify auth token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);

    // Only allow users to access their own data
    if (decodedToken.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Get next skill recommendation
    const nextSkill = await getNextSkill(userId);

    if (!nextSkill) {
      return res.status(404).json({ message: 'No suitable next skill found' });
    }

    return res.status(200).json({ nextSkill });
  } catch (error) {
    console.error('Next skill error:', error);
    return res.status(500).json({ error: error.message || 'Failed to get next skill' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export the Express API as a Firebase Function
export const api = onRequest(
  {
    region: 'us-central1',
    cors: true,
    maxInstances: 10,
  },
  app
);

// Firestore triggers
export const onProgressUpdate = onDocumentCreated('progress/{progressId}', async event => {
  try {
    const progressData = event.data.data();
    const { userId, activity, score } = progressData;

    if (!userId || !activity) {
      console.error('Missing required fields in progress document');
      return;
    }

    // Map activity to skill ID (this would be more sophisticated in a real app)
    const skillId = activity.replace(/\s+/g, '_').toLowerCase();

    // Determine if the attempt was correct based on score
    const correct = score >= 0.7; // Consider 70% or higher as correct

    // Update BKT state
    await updateBktState(userId, skillId, correct);

    console.log(`Updated BKT state for user ${userId}, skill ${skillId}, correct: ${correct}`);
  } catch (error) {
    console.error('Error in onProgressUpdate trigger:', error);
  }
});

// Callable functions
export const healthCheck = onCall({ region: 'us-central1' }, async request => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

export const getAllSkills = onCall({ region: 'us-central1' }, async request => {
  try {
    const skillsSnapshot = await getFirestore().collection('skills').orderBy('difficulty').get();

    const skills = [];
    skillsSnapshot.forEach(doc => {
      skills.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return skills;
  } catch (error) {
    console.error('Error getting skills:', error);
    throw new Error('Failed to get skills');
  }
});

export const getSkill = onCall({ region: 'us-central1' }, async request => {
  try {
    const { skillId } = request.data;

    if (!skillId) {
      throw new Error('Skill ID is required');
    }

    const skillDoc = await getFirestore().collection('skills').doc(skillId).get();

    if (!skillDoc.exists) {
      throw new Error('Skill not found');
    }

    return {
      id: skillDoc.id,
      ...skillDoc.data(),
    };
  } catch (error) {
    console.error('Error getting skill:', error);
    throw new Error('Failed to get skill');
  }
});

export const recordSkillAttempt = onCall({ region: 'us-central1' }, async request => {
  try {
    // Ensure user is authenticated
    if (!request.auth) {
      throw new Error('User must be authenticated');
    }

    const { skillId, userId, correct } = request.data;

    if (!skillId || correct === undefined) {
      throw new Error('Skill ID and correct status are required');
    }

    // Use the authenticated user's ID if userId is not provided
    const uid = userId || request.auth.uid;

    // Update BKT state
    return await updateBktState(uid, skillId, correct);
  } catch (error) {
    console.error('Error recording skill attempt:', error);
    throw new Error('Failed to record skill attempt');
  }
});

export const getNextSkillFunction = onCall({ region: 'us-central1' }, async request => {
  try {
    // Ensure user is authenticated
    if (!request.auth) {
      throw new Error('User must be authenticated');
    }

    const { userId } = request.data;

    // Use the authenticated user's ID if userId is not provided
    const uid = userId || request.auth.uid;

    // Get next skill recommendation
    const nextSkill = await getNextSkill(uid);

    return { nextSkill };
  } catch (error) {
    console.error('Error getting next skill:', error);
    throw new Error('Failed to get next skill');
  }
});

export const getUserSkill = onCall({ region: 'us-central1' }, async request => {
  try {
    // Ensure user is authenticated
    if (!request.auth) {
      throw new Error('User must be authenticated');
    }

    const { userId, skillId } = request.data;

    if (!skillId) {
      throw new Error('Skill ID is required');
    }

    // Use the authenticated user's ID if userId is not provided
    const uid = userId || request.auth.uid;

    // Get the user's skill
    const userSkillDoc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('skills')
      .doc(skillId)
      .get();

    if (!userSkillDoc.exists) {
      throw new Error('User skill not found');
    }

    return {
      id: userSkillDoc.id,
      ...userSkillDoc.data(),
    };
  } catch (error) {
    console.error('Error getting user skill:', error);
    throw new Error('Failed to get user skill');
  }
});

export const getUserSkills = onCall({ region: 'us-central1' }, async request => {
  try {
    // Ensure user is authenticated
    if (!request.auth) {
      throw new Error('User must be authenticated');
    }

    const { userId } = request.data;

    // Use the authenticated user's ID if userId is not provided
    const uid = userId || request.auth.uid;

    // Get the user's skills
    const userSkillsSnapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('skills')
      .get();

    // Create a map of user skills
    const userSkills = {};
    userSkillsSnapshot.forEach(doc => {
      userSkills[doc.id] = doc.data();
    });

    return userSkills;
  } catch (error) {
    console.error('Error getting user skills:', error);
    throw new Error('Failed to get user skills');
  }
});
