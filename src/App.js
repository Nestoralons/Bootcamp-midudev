import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
const App = () => {
  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (e) => {
    noteService.create(e).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };
  const handleLogout = () => {
    setUser(null);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await loginService.login({
        username: username,
        password: password,
      });
      console.log(user);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      // console.log(user);
      noteService.setToken(user.token);
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  const renderLogin = () => {
    return (
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Login</button>
      </form>
    );
  };
  const renderCreateNote = () => {
    return (
      <>
        <form onSubmit={addNote}>
          <input
            placeholder="Write your content"
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={handleLogout}>LogOut</button>
      </>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user ? renderCreateNote() : renderLogin()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
