import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './config/firebase'; // Initialize Firebase

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/HookedOnPhonetics">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
