import React, { useEffect, useState } from "react";
import Notes_input from "./Components/Notes_input";
import Notes_list from "./Components/Notes_list";
import AddIcon from "@mui/icons-material/Add";

function Notes(props) {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState({
    date: null,
    id: null,
    content: "",
  });

  const [mouseMovement, setMouseMovement] = useState(false);

  const [input, setInput] = useState(false);

  function mouseEnter() {
    setMouseMovement(true);
  }

  function mouseLeave() {
    setMouseMovement(false);
  }

  function searcher(id) {
    const found = entries.find((entry) => entry.id === id);
    if (found) {
      console.log("searching...");

      setContent(found);
    } else {
      console.log("the thing is not found");
    }
  }

  function deleteEntry(id) {
    setEntries((prevValue) => prevValue.filter((value) => value.id != id));
  }

  // Function to clear the editor and prepare for a new note
  function createNewEntry() {
    setContent({
      date: null,
      id: null,
      content: "",
    });

    setInput(true);
  }

  useEffect(() => {
    console.log("Entries updated:", entries);
    if (entries.length == 0) {
      setContent("");
    }
  }, [entries]);

  useEffect(() => {
    if (content) {
      console.log("Content updated:", content);
    }
  }, [content]);

  return (
    <>
      <div className="notesSection">
        <div className="notes-listSection">
          <Notes_list
            entries={entries}
            searcher={searcher}
            deleteEntry={deleteEntry}
          />
        </div>
        {input == true ? (
          <div className="notes-entrySection">
            <button className="notes-button" onClick={createNewEntry}>
              <AddIcon />
            </button>
            <Notes_input
              value={content.content}
              entries={entries}
              content={content}
              setEntries={setEntries}
              searcher={searcher}
              setContent={setContent}
            />
          </div>
        ) : entries.length > 0 ? (
          <div>show the latest entry</div>
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
