# Hooked On Phonetics

A production-ready, full-stack literacy and speech web application designed to help users improve their reading, writing, and speech skills.

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

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- **Trigger**: Push to `main` or `scaffold` branches, or pull requests to these branches
- **Environment**: Windows latest
- **Steps**:
  1. Checkout code
  2. Set up Node.js and pnpm
  3. Install dependencies
  4. Run linting
  5. Run tests
  6. Build the application
  7. Run Playwright E2E tests

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
