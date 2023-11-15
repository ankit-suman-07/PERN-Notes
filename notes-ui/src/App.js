import './App.css';
import { useEffect, useState } from 'react';

import DeleteIcon from "./assets/delete.png";
import AddIcon from "./assets/add.png";


function App() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes") //By default fetch will do the get request
        const notes = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log("Error : ", e);
      }
    };

    fetchNotes();
  }, [])

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowCard(true);
  }

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content
          }),
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setShowCard(false);
    } catch (error) {
      console.log("Error : ", error);
    }

  }

  const deleteNote = async (e, noteId) => {
    e.stopPropagation();
    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      const updatedNotes = notes.filter((note) => note.id !== noteId)
      setNotes(updatedNotes);
      setShowCard(false);
    } catch (error) {
      console.log("Error : ", error);
    }

  }

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }
    console.log("title : ", title);
    console.log("content : ", content);

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        })

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id
          ? updatedNote
          : note
      )

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
      setShowCard(false);
    } catch (error) {
      console.log("Error : ", error)
    }


  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
    setShowCard(false);
  }

  const handleBottomClick = () => {
    setShowCard(prev => !prev);
  }


  return (
    <div className="App">
      <div className='form-div' id={showCard ? "show-form" : "hide-form"} >
        <div className='form-text' >
          Create New Note
        </div>

        <form onSubmit={(e) =>
          selectedNote
            ? handleUpdateNote(e)
            : handleAddNote(e)}

        >

          <input
            placeholder='Title'
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            required
          />
          <textarea
            placeholder='Content'
            value={content}
            onChange={(e) => { setContent(e.target.value) }}
            rows={10} required
          />
          {
            selectedNote ? (
              <div className='edit-btn' >
                <button type='submit' className='save-btn' >Save</button>
                <button onClick={handleCancel} className='cancel-btn' >Cancel</button>
              </div>
            )
              : (
                <button type='submit' className='add-btn' >Add Note</button>

              )
          }

        </form>
      </div>
      <div className='notes-outer' >

        <div className='notes-text' >
          NOTES
        </div>
        <div className='notes-inner'>
          {
            notes.map((note, idx) => {
              return (
                <div
                  className='notes-card'
                  key={idx}
                  onClick={() => handleNoteClick(note)} >
                  <div className='note-top' >
                    <div className='note-title' >
                      {note.title}
                    </div>
                    <button
                      onClick={(e) => deleteNote(e, note.id)}
                    >
                      <img src={DeleteIcon} alt='delete-btn' />
                    </button>

                  </div>

                  <div className='note-content' >
                    {note.content}</div>
                </div>
              );
            })
          }

        </div>
      </div>
      <div className='bottom-box' >
        <button className='bottom-add-btn' onClick={handleBottomClick} >
          <img src={AddIcon} alt='add-btn' />
        </button>
      </div>
    </div>
  );
}

export default App;
