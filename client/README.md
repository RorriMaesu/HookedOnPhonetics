# Hooked On Phonetics - Client

This is the client-side application for Hooked On Phonetics, a literacy and speech web application.

## Technologies Used

- React + Vite
- TailwindCSS
- Zustand (State Management)
- React Router
- Web Speech API
- Vitest (Testing)

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The development server will start at http://localhost:3000.

### Building for Production

```bash
# Build for production
pnpm build
```

The build output will be in the `dist` directory.

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
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `store/` - Zustand state management
  - `App.jsx` - Main application component
  - `main.jsx` - Entry point
- `public/` - Static assets
- `dist/` - Build output (generated)
