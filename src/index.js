import 'jquery';  // Import jQuery
import 'popper.js'; // Import Popper.js
import 'bootstrap'; // Import Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import "../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select"; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App/App"
import Context from './Components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context>
  
);

