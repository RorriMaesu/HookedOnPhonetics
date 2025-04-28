const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

// Check if gcloud CLI is installed
try {
  runCommand('gcloud --version');
} catch (error) {
  console.error('Google Cloud SDK (gcloud) is not installed. Please install it from:');
  console.error('https://cloud.google.com/sdk/docs/install');
  console.error('After installation, run: gcloud auth login');
  process.exit(1);
}

// Check if user is logged in to gcloud
try {
  const whoami = runCommand('gcloud auth list');
  if (!whoami.includes('ACTIVE')) {
    console.log('Please login to Google Cloud first:');
    console.log('gcloud auth login');
    process.exit(1);
  }
} catch (error) {
  console.log('Please login to Google Cloud first:');
  console.log('gcloud auth login');
  process.exit(1);
}

// Run setup-firebase.js
console.log('Running setup-firebase.js...');
try {
  runCommand('node scripts/setup-firebase.js');
} catch (error) {
  console.error('Error running setup-firebase.js:', error);
  process.exit(1);
}

// Run init-firestore.js
console.log('Running init-firestore.js...');
try {
  runCommand('node scripts/init-firestore.js');
} catch (error) {
  console.error('Error running init-firestore.js:', error);
  process.exit(1);
}

// Run setup-functions.js
console.log('Running setup-functions.js...');
try {
  runCommand('node scripts/setup-functions.js');
} catch (error) {
  console.error('Error running setup-functions.js:', error);
  process.exit(1);
}

// Run setup-hosting.js
console.log('Running setup-hosting.js...');
try {
  runCommand('node scripts/setup-hosting.js');
} catch (error) {
  console.error('Error running setup-hosting.js:', error);
  process.exit(1);
}

// Run setup-github-pages.js
console.log('Running setup-github-pages.js...');
try {
  runCommand('node scripts/setup-github-pages.js');
} catch (error) {
  console.error('Error running setup-github-pages.js:', error);
  console.log('Continuing with setup...');
}

// Start Firebase emulators
console.log('Starting Firebase emulators...');
try {
  runCommand('firebase emulators:start');
} catch (error) {
  console.error('Error starting Firebase emulators:', error);
  process.exit(1);
}

console.log('Firebase setup complete!');
