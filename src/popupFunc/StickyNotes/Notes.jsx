import React, { useEffect, useState } from "react";
import NotesInput from "./NotesInput";

function Notes(props) {
  const [entries, setEntries] = useState([]);
  const [content, setContent] = useState({
    date: null,
    id: null,
    content: "",
  });


 
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
      <div className="notes-entrySection">
        <NotesInput
          value={content.content}
          entries={entries}
          content={content}
          setEntries={setEntries}
          setContent={setContent}
        />
      </div>
    </div>
  );
}

export default Notes;
