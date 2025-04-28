# Hooked On Phonetics - Server

This is the server-side application for Hooked On Phonetics, a literacy and speech web application.

## Technologies Used

- Node.js
- Express
- Firebase (Auth & Firestore)
- Gemini Flash 2.5 API
- Replicate SDXL API
- Vitest (Testing)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm
- Firebase project

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Gemini AI API
GEMINI_API_KEY=your_gemini_api_key

# Replicate API
REPLICATE_API_TOKEN=your_replicate_api_token

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Development

```bash
# Start development server
pnpm dev
```

The server will start at http://localhost:3001.

### Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

## Project Structure

- `src/` - Source code
  - `ai/` - AI service integrations
  - `config/` - Configuration files
  - `controllers/` - Route controllers
  - `middleware/` - Express middleware
  - `routes/` - API routes
  - `index.js` - Entry point
