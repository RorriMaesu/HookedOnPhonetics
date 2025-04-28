import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import './config/firebase'; // Initialize Firebase

// Create a router with future flags to address warnings
// Use basename for GitHub Pages if needed
const isGitHubPages = window.location.hostname.includes('github.io');
const basename = isGitHubPages ? '/HookedOnPhonetics' : '/';

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <App />,
    },
  ],
  {
    basename: basename,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
