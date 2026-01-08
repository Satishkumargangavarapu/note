import React from 'react';
import './NoteItem.css';

const NoteItem = ({ note, onDelete, onNoteClick }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    
    const dateStr = date.toLocaleDateString('en-US', dateOptions);
    const timeStr = date.toLocaleTimeString('en-US', timeOptions);
    return `${dateStr} • ${timeStr}`;
  };

  const handleClick = (e) => {
    if (e.target.closest('.delete-button') || e.target.closest('.note-timestamp')) {
      return;
    }
    if (onNoteClick) {
      onNoteClick(note);
    }
  };

  return (
    <div 
      className={`note-item ${note.isImportant ? 'note-item-important' : ''}`}
      onClick={handleClick}
    >
      {note.createdAt && (
        <span className="note-timestamp" title={new Date(note.createdAt).toLocaleString()}>
          {formatTimestamp(note.createdAt)}
        </span>
      )}
      <div className="note-content">
        <div className="note-header">
          <h3 className="note-title">{note.title}</h3>
          {note.isImportant && (
            <span className="important-badge" title="Important Note">
              ⭐ Important
            </span>
          )}
        </div>
        {note.description && (
          <p className="note-description">{note.description}</p>
        )}
      </div>
      <button 
        className="delete-button"
        onClick={() => onDelete(note.id)}
        aria-label="Delete note"
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;

