import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    // Remove error message as soon as input becomes valid
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImportantChange = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate title
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    // Submit the note
    onSubmit({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      isImportant: isImportant,
      createdAt: new Date().toISOString()
    });

    // Reset form
    setTitle('');
    setDescription('');
    setIsImportant(false);
    setError('');
  };

  const isSubmitDisabled = !title.trim();

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          className={`form-input ${error ? 'form-input-error' : ''}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter note title"
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-textarea"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter note description (optional)"
          rows="4"
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={isImportant}
            onChange={handleImportantChange}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Mark as Important</span>
        </label>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitDisabled}
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;

