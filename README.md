# Hooked On Phonetics

A production-ready, full-stack literacy and speech web application designed to help users improve their reading, writing, and speech skills.

[![Deploy to GitHub Pages](https://github.com/RorriMaesu/HookedOnPhonetics/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/RorriMaesu/HookedOnPhonetics/actions/workflows/deploy-gh-pages.yml)
[![Deploy to Firebase](https://github.com/RorriMaesu/HookedOnPhonetics/actions/workflows/deploy-firebase.yml/badge.svg)](https://github.com/RorriMaesu/HookedOnPhonetics/actions/workflows/deploy-firebase.yml)

## Overview

Hooked On Phonetics is a comprehensive literacy platform that provides interactive tools for phonics, fluency, morphology, sentence construction, semantic analysis, context clues, story mapping, speech practice, and writing workshops.

![Architecture Diagram](docs/architecture-diagram.png)

### Key Features

- **Phonics Playground**: Interactive phonics exercises with Sound-Swap games and Elkonin-Box tile linking
- **Fluency Sprint**: Timed WCPM (Words Correct Per Minute) practice with Standard Celeration charts
- **Morphology Engine**: Word-Factory with drag-drop morpheme matrices and semantic feature analysis
- **Sentence Combiner**: Three-step complexity ladder for sentence construction
- **Context Clue Detective**: Interactive unknown-word highlighter with context clue routines
- **Story Map Builder**: Interactive story-grammar maps and expository inference missions
- **Speech Practice**: Web Speech recognition with confidence-band UI and self-validation
- **Writing Workshop**: POW+TREE tabbed wizard with revision checklists and peer-review prompts
- **Teletherapy Widget**: Embedded video-chat mockup with shared whiteboard
- **Image Generation**: Local SDXL-Turbo with Replicate SDXL fallback

## Prerequisites

- Node.js 20.x or later
- Python 3.12 (for SDXL-Turbo batch rendering)
- pnpm (package manager)
- Firebase project (for authentication and database)
- API keys for Gemini, Replicate, and Deepgram (optional)
- NVIDIA GPU (optional, for local image generation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hooked-on-phonetics.git
   cd hooked-on-phonetics
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env` in both the client and server directories
   - Fill in your API keys and configuration values

4. Set up Python environment for image generation (optional):
   ```bash
   cd scripts
   pip install -r requirements.txt
   ```

## Running Locally

Start the development server:

```bash
pnpm dev
```

This will concurrently start both the client and server:

- Client: http://localhost:3000
- Server: http://localhost:3001

## Module Guide

### Phonics Playground

The Phonics Playground module provides interactive exercises for developing phonological awareness and phonics skills.

**Features:**

- Sound-Swap Games: Practice manipulating sounds in words
- Elkonin-Box Tiles: Segment words into individual sounds
- Progress tracking with visual feedback

### Fluency Sprint

The Fluency Sprint module helps users improve reading fluency through timed reading exercises.

**Features:**

- Timed reading passages with automatic WCPM calculation
- Standard Celeration charts to track progress
- Adaptive difficulty based on accuracy rates

### Morphology Engine

The Morphology Engine helps users understand word structure and meaning through interactive exercises.

**Features:**

- Word-Factory with prefixes, roots, and suffixes
- Semantic Feature Analysis for vocabulary development
- Interactive morpheme matrices

### Sentence Combiner

The Sentence Combiner helps users develop more complex sentence structures.

**Features:**

- Three-step complexity ladder (coordinate → subordinate → participial)
- Guided practice with hints and examples
- Automatic feedback on sentence structure

### Semantic Feature Analyzer

The Semantic Feature Analyzer helps users develop deeper understanding of vocabulary.

**Features:**

- Analysis templates for Tier-2 words
- Category, function, examples, and non-examples
- Synonym and antonym exploration

### Context Clue Detective

The Context Clue Detective helps users develop strategies for understanding unknown words.

**Features:**

- Interactive text with unknown word highlighting
- Guided context clue routines
- Different types of context clues (definition, example, etc.)

### Story Map Builder & Discourse Drills

These modules help users develop narrative and expository writing skills.

**Features:**

- Interactive story-grammar maps
- Expository inference missions
- Comprehension questions with feedback

### Speech Practice

The Speech Practice module helps users improve pronunciation and speaking skills.

**Features:**

- Web Speech recognition with confidence-band UI
- Self-validation taps on low-confidence words
- Pronunciation exercises with feedback

### Writing Workshop

The Writing Workshop module guides users through the writing process.

**Features:**

- POW+TREE tabbed wizard (Plan, Organize, Write, Revise)
- Mandatory revision checklist
- Peer-review prompts (Gemini-driven)

### Teletherapy Widget & Intensity Toggle

These features provide support for remote therapy sessions and customized learning schedules.

**Features:**

- Embedded video-chat mockup
- Shared whiteboard
- Intensity toggle between "High Intensity" (daily) and "Maintenance" (3×/week)

### Image Service

The Image Service provides educational images for various modules.

**Features:**

- Local SDXL-Turbo for fast generation
- Replicate SDXL fallback for higher quality
- Prompt-hash caching for efficiency

## Scripts

### render_batch.py

This script processes a batch of image generation prompts using SDXL-Turbo.

**Usage:**

```bash
python scripts/render_batch.py --prompt "Your prompt here" --output_dir "client/public/images"
```

### nightlyRender.ps1

This PowerShell script schedules nightly batch rendering during off-hours.

**Usage:**

```bash
# Run the script directly
.\scripts\nightlyRender.ps1

# Schedule the script to run daily at 2:00 AM
.\scripts\nightlyRender.ps1 -Schedule
```

**Note:** Requires administrative privileges to schedule tasks.

### deploy.ps1

This PowerShell script builds and deploys the application to Azure Static Web Apps.

**Usage:**

```bash
.\deploy.ps1
```

## Testing

Run tests:

```bash
pnpm test
```

This will run tests for both the client and server with Vitest.

For coverage reports:

```bash
pnpm test:coverage
```

End-to-end tests with Playwright:

```bash
cd e2e
npx playwright test
```

## CI/CD and Deployment

The project uses GitHub Actions for continuous integration and deployment:

### GitHub Pages Deployment

The frontend is deployed to GitHub Pages:

- **Trigger**: Push to `main` branch or manual dispatch
- **Environment**: Ubuntu latest
- **Steps**:
  1. Checkout code
  2. Set up Node.js and pnpm
  3. Install dependencies
  4. Build the application with environment variables from GitHub Secrets
  5. Deploy to GitHub Pages

### Firebase Functions Deployment

The backend is deployed to Firebase Functions:

- **Trigger**: Push to `main` branch that changes Firebase-related files or manual dispatch
- **Environment**: Ubuntu latest
- **Steps**:
  1. Checkout code
  2. Set up Node.js
  3. Install Firebase CLI
  4. Install dependencies
  5. Deploy to Firebase Functions and Firestore

### Setting Up Deployment

1. **GitHub Pages**:

   - Go to your repository settings
   - Navigate to Pages
   - Set source to GitHub Actions

2. **Firebase**:

   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login:ci` to get a token
   - Add the token to GitHub Secrets as `FIREBASE_TOKEN`
   - Add all Firebase configuration values to GitHub Secrets
   - **Important**: Upgrade your Firebase project to the Blaze (pay-as-you-go) plan to deploy Firebase Functions
     - Visit: https://console.firebase.google.com/project/hookedonphonetics-d58c3/usage/details
     - Click on "Upgrade" to switch to the Blaze plan

3. **GitHub Secrets**:
   Add the following secrets to your repository:

   - `FIREBASE_API_KEY`: AIzaSyAHYqdkPxtRs9Ok07GRkmGS7-0AqKxZeZc
   - `FIREBASE_AUTH_DOMAIN`: hookedonphonetics-d58c3.firebaseapp.com
   - `FIREBASE_PROJECT_ID`: hookedonphonetics-d58c3
   - `FIREBASE_STORAGE_BUCKET`: hookedonphonetics-d58c3.firebasestorage.app
   - `FIREBASE_MESSAGING_SENDER_ID`: 311010495947
   - `FIREBASE_APP_ID`: 1:311010495947:web:8ceff4b0c881385aaeba4e
   - `FIREBASE_MEASUREMENT_ID`: G-X9Q90Q9R43
   - `FIREBASE_TOKEN`: (Get this by running `firebase login:ci`)
   - `FIREBASE_FUNCTIONS_URL`: https://us-central1-hookedonphonetics-d58c3.cloudfunctions.net/api
   - `FIREBASE_SERVICE_ACCOUNT`: (The entire JSON content of your service account key file)

   To add these secrets:

   1. Go to your repository on GitHub
   2. Click on "Settings"
   3. In the left sidebar, click on "Secrets and variables" > "Actions"
   4. Click on "New repository secret"
   5. Add each secret with the name and value as listed above

   For the `FIREBASE_SERVICE_ACCOUNT` secret:

   1. Go to the Firebase Console: https://console.firebase.google.com/project/hookedonphonetics-d58c3/settings/serviceaccounts/adminsdk
   2. Click on "Generate new private key"
   3. Open the downloaded JSON file
   4. Copy the entire content of the file
   5. Paste it as the value for the `FIREBASE_SERVICE_ACCOUNT` secret

## Config & Security

- All secrets are read from `.env` files (not committed to the repository)
- Example configuration is provided in `.env.example` files
- Firebase security rules restrict read/write access to authenticated users
- HTTPS is enforced in production

## Troubleshooting

### GPU Conflicts

If you encounter GPU conflicts when running the image generation scripts:

1. Check that no other GPU-intensive applications are running
2. Try setting a specific GPU ID with the `--gpu_id` parameter
3. Fall back to CPU rendering if necessary

### Windows Elevation

Some scripts require administrative privileges:

- The `nightlyRender.ps1` script with `-Schedule` parameter requires elevation
- Run PowerShell as Administrator when scheduling tasks

### Common Errors

- **Firebase Authentication Errors**: Check your Firebase configuration in `.env`
- **API Key Errors**: Ensure all required API keys are set in `.env`
- **CORS Errors**: Make sure the server is running and CORS is properly configured
- **GPU Out of Memory**: Reduce batch size or image dimensions in the image generation scripts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
