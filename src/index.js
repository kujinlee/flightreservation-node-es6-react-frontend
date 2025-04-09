import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root for React 18

root.render(
  <Router basename="/flightreservation-node-es6-react-frontend"> {/* Fix basename */}
    <App />
  </Router>
);
