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

// Build the client application for GitHub Pages
console.log('Building the client application for GitHub Pages...');
try {
  // Set the DEPLOY_TARGET environment variable to 'github'
  process.env.DEPLOY_TARGET = 'github';

  // Build the client application
  runCommand('cd client && npm run build');
  console.log('Client application built successfully for GitHub Pages!');

  // Create a .nojekyll file to prevent GitHub from processing the site with Jekyll
  fs.writeFileSync(path.join(__dirname, '..', 'client', 'dist', '.nojekyll'), '');
  console.log('Created .nojekyll file');

  // Deploy to GitHub Pages
  console.log('Deploying to GitHub Pages...');
  try {
    // Create gh-pages branch if it doesn't exist
    try {
      runCommand('git checkout gh-pages');
      runCommand('git checkout main');
    } catch (error) {
      console.log('Creating gh-pages branch...');
      runCommand('git checkout -b gh-pages');
      runCommand('git checkout main');
    }

    // Push the contents of client/dist to the gh-pages branch
    runCommand('git subtree push --prefix client/dist origin gh-pages');
    console.log('Deployed to GitHub Pages successfully!');
    console.log('Your app is now available at: https://rorrimeasu.github.io/HookedOnPhonetics/');
  } catch (error) {
    console.error('Error deploying to GitHub Pages:', error);
    console.log(
      'To deploy to GitHub Pages manually, push the contents of client/dist to the gh-pages branch:'
    );
    console.log('git subtree push --prefix client/dist origin gh-pages');
  }

  console.log('GitHub Pages setup complete!');
} catch (error) {
  console.error('Error building client application for GitHub Pages:', error);
  process.exit(1);
}
