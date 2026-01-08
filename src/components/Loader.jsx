import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading notes...</p>
    </div>
  );
};
export default Loader;

