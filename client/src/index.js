import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

// Imports for ROS libraries
const script1 = document.createElement('script');
script1.src = 'https://cdn.jsdelivr.net/npm/ros2d@0.10.0/build/ros2d.min.js';
document.head.appendChild(script1);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
        <App /> 
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
