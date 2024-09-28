import React, { useEffect, useState } from "react";
import Notes_input from "./Components/Notes_input";
import Notes_list from "./Components/Notes_list";

function Notes(props) {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState({
    date: null,
    id: null,
    content: "",
  });

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
    <div className="notesSection">
      <button onClick={createNewEntry}>New</button>
      <div className="notes-listSection">
        <Notes_list
          entries={entries}
          searcher={searcher}
          deleteEntry={deleteEntry}
        />
      </div>
      <div className="notes-entrySection">
        <Notes_input
          value={content.content}
          entries={entries}
          content={content}
          setEntries={setEntries}
          searcher={searcher}
          setContent={setContent}
        />
      </div>
    </div>
  );
}

export default Notes;
