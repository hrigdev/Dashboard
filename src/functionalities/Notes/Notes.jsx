import React, { useEffect, useState } from "react";
import Notes_input from "./Components/Notes_input";
import Notes_list from "./Components/Notes_list";
import AddIcon from "@mui/icons-material/Add";

function Notes(props) {
  const [note_entries, setNoteEntries] = useState([]); // Changed to note_entries
  const [content, setContent] = useState({
    date: null,
    id: null,
    content: "",
  });

  const [mouseMovement, setMouseMovement] = useState(false);
  const [input, setInput] = useState(false);
  useEffect(() => {
    const storedEntries = JSON.parse(
      localStorage.getItem("note_entries") || "[]"
    );
    setNoteEntries(storedEntries);

    if (storedEntries.length > 0) {
      setContent(storedEntries[storedEntries.length - 1]); // Set content to the last entry
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note_entries", JSON.stringify(note_entries));
  }, [note_entries]);

  function mouseEnter() {
    setMouseMovement(true);
  }

  function mouseLeave() {
    setMouseMovement(false);
  }

  function searcher(id) {
    const found = note_entries.find((entry) => entry.id === id);
    if (found) {
      setContent(found);
    }
  }

  function deleteEntry(id) {
    setNoteEntries((prevValue) => prevValue.filter((value) => value.id !== id));
  }

  function createNewEntry() {
    setContent({
      date: null,
      id: null,
      content: "",
    });
    setInput(true);
  }

  useEffect(() => {
    if (note_entries.length === 0) {
      setContent("");
      props.setSideBarButton(false);
    } else {
      props.setSideBarButton(true);
    }
  }, [note_entries]);

  return (
    <>
      <div className="notesSection">
        {props.showSidebar && (
          <div className="notes-listSection">
            <Notes_list
              entries={note_entries} // Pass note_entries to Notes_list
              searcher={searcher}
              deleteEntry={deleteEntry}
            />
          </div>
        )}
        {input ? (
          <div className="notes-entrySection">
            <Notes_input
              createNewEntry={createNewEntry}
              value={content.content}
              entries={note_entries} // Pass note_entries to Notes_input
              content={content}
              setEntries={setNoteEntries} // Update state with setNoteEntries
              searcher={searcher}
              setContent={setContent}
            />
          </div>
        ) : note_entries.length > 0 ? (
          <div className="notes-entrySection">
            <Notes_input
              createNewEntry={createNewEntry}
              value={content.content}
              entries={note_entries} // Pass note_entries to Notes_input
              content={content}
              setEntries={setNoteEntries} // Update state with setNoteEntries
              searcher={searcher}
              setContent={setContent}
            />
          </div>
        ) : (
          <div
            className="note-message"
            onMouseOver={mouseEnter}
            onMouseOut={mouseLeave}
          >
            {mouseMovement ? (
              <button className="notes-button add" onClick={createNewEntry}>
                <div>
                  <AddIcon />
                </div>
              </button>
            ) : (
              <>NO RECENT ENTRY</>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Notes;
