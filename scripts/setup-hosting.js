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

// Build the client application
console.log('Building the client application...');
try {
  runCommand('cd client && npm run build');
  console.log('Client application built successfully!');
} catch (error) {
  console.error('Error building client application:', error);
  process.exit(1);
}

// Deploy to Firebase Hosting
console.log('Deploying to Firebase Hosting...');
try {
  runCommand('firebase deploy --only hosting');
  console.log('Deployed to Firebase Hosting successfully!');
  console.log('Your app is now available at: https://hookedonphonetics-d58c3.web.app');
} catch (error) {
  console.error('Error deploying to Firebase Hosting:', error);
  process.exit(1);
}

console.log('Firebase Hosting setup complete!');
