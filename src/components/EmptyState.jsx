import React from 'react';
import './EmptyState.css';
const EmptyState = ({ message = 'Add your first note' }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📝</div>
      <h3 className="empty-state-title">No notes available</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};
export default EmptyState;

