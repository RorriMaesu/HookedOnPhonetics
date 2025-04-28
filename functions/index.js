import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

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
