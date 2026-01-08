import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import NoteModal from './components/NoteModal';
import SearchBar from './components/SearchBar';
import './App.css';

const STORAGE_KEY = 'notes-app-data';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes to localStorage:', error);
      }
    }
  }, [notes, isLoading]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note
      )
    );
    if (selectedNote && selectedNote.id === updatedNote.id) {
      setSelectedNote({ ...updatedNote, updatedAt: new Date().toISOString() });
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  // Filter and search notes
  const filteredNotes = notes.filter((note) => {
    // Filter by type
    if (filterType === 'important' && !note.isImportant) return false;
    if (filterType === 'normal' && note.isImportant) return false;

    // Search by title or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const titleMatch = note.title.toLowerCase().includes(query);
      const descMatch = note.description?.toLowerCase().includes(query);
      return titleMatch || descMatch;
    }

    return true;
  });

  // Sort notes: important notes first, then by creation time (newest first)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    // Use createdAt if available, otherwise fall back to id
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : parseInt(a.id);
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : parseInt(b.id);
    return bTime - aTime; // Newest first
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Notes</h1>
      </header>
      
      <main className="app-main">
        <NoteForm onSubmit={handleAddNote} />
        
        {!isLoading && notes.length > 0 && (
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterType={filterType}
            onFilterChange={setFilterType}
          />
        )}
        
        <section className="notes-section">
          {isLoading ? (
            <Loader />
          ) : sortedNotes.length === 0 ? (
            <EmptyState 
              message={
                searchQuery || filterType !== 'all'
                  ? 'No notes match your search or filter.'
                  : 'No notes available. Add your first note'
              }
            />
          ) : (
            <NoteList 
              notes={sortedNotes} 
              onDelete={handleDeleteNote}
              onNoteClick={handleNoteClick}
            />
          )}
        </section>
      </main>
      <NoteModal 
        note={selectedNote} 
        onClose={handleCloseModal}
        onUpdate={handleUpdateNote}
      />
    </div>
  );
}

export default App;

