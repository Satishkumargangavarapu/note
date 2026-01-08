import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange, filterType, onFilterChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search notes by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className="filter-buttons">
        <button
          className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filterType === 'important' ? 'active' : ''}`}
          onClick={() => onFilterChange('important')}
        >
          Important
        </button>
        <button
          className={`filter-button ${filterType === 'normal' ? 'active' : ''}`}
          onClick={() => onFilterChange('normal')}
        >
          Normal
        </button>
      </div>
    </div>
  );
};

export default SearchBar;


