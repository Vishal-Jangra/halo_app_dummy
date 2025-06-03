import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.min.css'; // Core grid CSS (minified)
import 'ag-grid-community/styles/ag-theme-alpine.min.css'; // Alpine theme (minified, includes dark)
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; // Singular form

// Register AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]); // Singular form, wrapped in an array

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
