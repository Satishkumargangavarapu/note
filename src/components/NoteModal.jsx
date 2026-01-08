import React, { useState, useEffect } from 'react';
import './NoteModal.css';

const NoteModal = ({ note, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsImportant, setEditIsImportant] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    if (note) {
      setEditTitle(note.title || '');
      setEditDescription(note.description || '');
      setEditIsImportant(note.isImportant || false);
      setIsEditing(false);
      setEditError('');
    }
  }, [note]);

  if (!note) return null;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    
    const dateStr = date.toLocaleDateString('en-US', dateOptions);
    const timeStr = date.toLocaleTimeString('en-US', timeOptions);
    return `${dateStr} • ${timeStr}`;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(note.title || '');
    setEditDescription(note.description || '');
    setEditIsImportant(note.isImportant || false);
    setEditError('');
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      setEditError('Title is required');
      return;
    }

    if (onUpdate) {
      onUpdate({
        ...note,
        title: editTitle.trim(),
        description: editDescription.trim(),
        isImportant: editIsImportant
      });
    }
    setIsEditing(false);
    setEditError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close">
          ×
        </button>
        
        {isEditing ? (
          <div className="modal-edit-mode">
            <div className="modal-edit-header">
              <h2 className="modal-title">Edit Note</h2>
              <button className="modal-edit-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            
            <div className="modal-edit-form">
              <div className="modal-form-group">
                <label className="modal-form-label">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`modal-form-input ${editError ? 'modal-form-input-error' : ''}`}
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    if (editError) setEditError('');
                  }}
                  placeholder="Enter note title"
                />
                {editError && <span className="modal-error-message">{editError}</span>}
              </div>

              <div className="modal-form-group">
                <label className="modal-form-label">Description</label>
                <textarea
                  className="modal-form-textarea"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Enter note description (optional)"
                  rows="6"
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-checkbox-label">
                  <input
                    type="checkbox"
                    className="modal-checkbox-input"
                    checked={editIsImportant}
                    onChange={(e) => setEditIsImportant(e.target.checked)}
                  />
                  <span className="modal-checkbox-custom"></span>
                  <span className="modal-checkbox-text">Mark as Important</span>
                </label>
              </div>

              <button className="modal-save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{note.title}</h2>
              <div className="modal-header-actions">
                {note.isImportant && (
                  <span className="modal-important-badge" title="Important Note">
                    ⭐ Important
                  </span>
                )}
                <button className="modal-edit-button" onClick={handleEdit} title="Edit note">
                  ✏️ Edit
                </button>
              </div>
            </div>
            {note.createdAt && (
              <div className="modal-timestamp">
                Created: {formatTimestamp(note.createdAt)}
              </div>
            )}
            {note.updatedAt && (
              <div className="modal-timestamp">
                Updated: {formatTimestamp(note.updatedAt)}
              </div>
            )}
            {note.description && (
              <div className="modal-description">
                {note.description}
              </div>
            )}
            {!note.description && (
              <div className="modal-description-empty">
                No description provided.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NoteModal;

