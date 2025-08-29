import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Auto-Scrolling Cards App</h1>
        <p className="header-subtitle">Two containers with different scrolling speeds</p>
      </div>
    </header>
  );
};

export default Header;
