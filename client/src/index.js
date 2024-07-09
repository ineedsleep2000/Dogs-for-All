// src/index.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
