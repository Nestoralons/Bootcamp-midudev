import React, { useState, useRef } from "react";
import Toggable from "./Toggable";

export default function NoteForm({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState("");
  const toggableref = useRef();
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: false,
    };

    addNote(noteObject);
    setNewNote("");
    toggableref.current.toggleVisibility();
  };
  return (
    <Toggable bottonLabel="New Note" ref={toggableref}>
      <h3>Create a new Note</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your content"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleLogout}>LogOut</button>
    </Toggable>
  );
}
