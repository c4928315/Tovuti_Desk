import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

