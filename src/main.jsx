import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Zorg dat dit naar je App.jsx wijst
import './index.css'; // Je globale CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);