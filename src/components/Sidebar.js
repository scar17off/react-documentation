import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDocContext } from '../contexts/DocContext';

function Sidebar({ darkMode, toggleDarkMode }) {
  const { docs } = useDocContext();
  const [openFolders, setOpenFolders] = useState({});

  useEffect(() => {
    // Set all folders to open by default
    const initialOpenState = {};
    docs.pages.forEach(page => {
      if (page.subpages) {
        initialOpenState[page.path] = true;
      }
    });
    setOpenFolders(initialOpenState);
  }, [docs.pages]);

  const toggleFolder = (path) => {
    setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderItems = (items, level = 0) => {
    return items.map((item) => (
      <li key={item.path} className={`level-${level}`}>
        <div className="folder-item">
          {item.subpages && (
            <span
              className={`folder-icon ${openFolders[item.path] ? 'open' : ''}`}
              onClick={() => toggleFolder(item.path)}
            >
              {openFolders[item.path] ? '−' : '+'}
            </span>
          )}
          <Link to={item.path}>{item.title}</Link>
        </div>
        {item.subpages && (
          <ul className={`subpages-list ${openFolders[item.path] ? 'open' : ''}`}>
            {renderItems(item.subpages, level + 1)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav className="sidebar">
      <h2>Documentation</h2>
      <ul>{renderItems(docs.pages)}</ul>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Sidebar;