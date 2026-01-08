import React from 'react';
import NoteItem from './NoteItem';
import './NoteList.css';

const NoteList = ({ notes, onDelete, onNoteClick }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete}
          onNoteClick={onNoteClick}
        />
      ))}
    </div>
  );
};

export default NoteList;

