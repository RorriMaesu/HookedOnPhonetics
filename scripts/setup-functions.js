const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const configDir = path.join(__dirname, '..', 'functions', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

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

// Check if Firebase CLI is installed
try {
  runCommand('firebase --version');
} catch (error) {
  console.log('Firebase CLI not found. Installing...');
  runCommand('npm install -g firebase-tools');
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

// Deploy Firebase Functions
console.log('Deploying Firebase Functions...');
try {
  // Install dependencies
  console.log('Installing dependencies...');
  runCommand('cd functions && npm install');
  
  // Deploy functions
  console.log('Deploying functions...');
  runCommand('firebase deploy --only functions');
  
  console.log('Firebase Functions deployed successfully!');
} catch (error) {
  console.error('Error deploying Firebase Functions:', error);
  process.exit(1);
}

// Deploy Firestore Rules
console.log('Deploying Firestore Rules...');
try {
  runCommand('firebase deploy --only firestore:rules');
  console.log('Firestore Rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Firestore Rules:', error);
  process.exit(1);
}

// Deploy Storage Rules
console.log('Deploying Storage Rules...');
try {
  runCommand('firebase deploy --only storage:rules');
  console.log('Storage Rules deployed successfully!');
} catch (error) {
  console.error('Error deploying Storage Rules:', error);
  process.exit(1);
}

console.log('Firebase setup complete!');
