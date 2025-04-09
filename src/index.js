import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const history = createBrowserHistory({
  v7_startTransition: true, // Enable React Router v7 startTransition flag
  v7_relativeSplatPath: true, // Enable React Router v7 relative splat path flag
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
);
