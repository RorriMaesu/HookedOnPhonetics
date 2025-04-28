const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const configDir = path.join(__dirname, '..', 'functions', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Firebase project configuration
const firebaseConfig = {
  projectId: 'hookedonphonetics-d58c3',
  apiKey: 'AIzaSyAHYqdkPxtRs9Ok07GRkmGS7-0AqKxZeZc',
  authDomain: 'hookedonphonetics-d58c3.firebaseapp.com',
  storageBucket: 'hookedonphonetics-d58c3.firebasestorage.app',
  messagingSenderId: '311010495947',
  appId: '1:311010495947:web:8ceff4b0c881385aaeba4e',
  measurementId: 'G-X9Q90Q9R43'
};

// Save Firebase config to .env file
const envContent = `VITE_FIREBASE_API_KEY=${firebaseConfig.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${firebaseConfig.authDomain}
VITE_FIREBASE_PROJECT_ID=${firebaseConfig.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${firebaseConfig.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${firebaseConfig.messagingSenderId}
VITE_FIREBASE_APP_ID=${firebaseConfig.appId}
VITE_FIREBASE_MEASUREMENT_ID=${firebaseConfig.measurementId}
VITE_API_URL=https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/api
`;

fs.writeFileSync(path.join(__dirname, '..', 'client', '.env'), envContent);
console.log('Firebase config saved to client/.env');

// Function to run a command and log output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.stdout || error.message);
    throw error;
  }
}

// Check if user is logged in to Firebase
try {
  const whoami = runCommand('firebase login:list');
  if (!whoami.includes('hookedonphonetics-d58c3')) {
    console.log('Please login to Firebase first:');
    console.log('firebase login');
    process.exit(1);
  }
} catch (error) {
  console.log('Please login to Firebase first:');
  console.log('firebase login');
  process.exit(1);
}

// Create a service account key
console.log('Creating service account key...');
try {
  // Check if service account key already exists
  const serviceAccountPath = path.join(configDir, 'serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    console.log('Service account key already exists');
  } else {
    // Use gcloud to create and download service account key
    runCommand(`gcloud iam service-accounts keys create ${serviceAccountPath} --iam-account=firebase-adminsdk-fbsvc@hookedonphonetics-d58c3.iam.gserviceaccount.com`);
    console.log(`Service account key saved to ${serviceAccountPath}`);
  }
} catch (error) {
  console.error('Error creating service account key. You may need to create it manually:');
  console.error('1. Go to https://console.firebase.google.com/project/hookedonphonetics-d58c3/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate new private key"');
  console.error('3. Save the key to functions/config/serviceAccountKey.json');
}

console.log('Firebase setup complete!');
