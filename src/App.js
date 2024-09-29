import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { DocProvider } from './contexts/DocContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Set dark mode as default

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DocProvider>
      <Router>
        <div className="app-container">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/*" element={<Content />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DocProvider>
  );
}

export default App;