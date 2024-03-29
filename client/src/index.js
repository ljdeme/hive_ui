import React, { useEffect } from 'react';
import './index.css';
import InProgress from './pages/InProgress';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

// Create the root element once
const root = createRoot(document.getElementById('root'));

function AppWithScripts() {
  useEffect(() => {
    // Load all the scripts one by one
    loadScript('https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.min.js', () => {
      loadScript('https://code.createjs.com/1.0.0/createjs.min.js', () => {
        loadScript('https://cdn.jsdelivr.net/npm/easeljs@1/lib/easeljs.min.js', () => {
          loadScript('https://cdn.jsdelivr.net/npm/eventemitter2@6/lib/eventemitter2.min.js', () => {
            loadScript('https://cdn.jsdelivr.net/npm/ros2d@0/build/ros2d.js', () => {
              // All scripts are loaded, now render your app
              root.render(
                <Router>
                  <App />
                </Router>
              );
            });
          });
        });
      })
    });
  }, []);

  return (
    <div>
      <InProgress />
    </div>
  );
}

// Initial render
root.render(<AppWithScripts />);

// Measure performance using reportWebVitals
reportWebVitals();
