import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Notes_list({ entries, searcher, deleteEntry }) {
  const getTextFromHTML = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      {sortedEntries.length > 0 ? (
        <nav className="notes-sidebar">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="note-entry-container">
              <button className="note-entry" onClick={() => searcher(entry.id)}>
                {getTextFromHTML(entry.content).substring(0, 14)}
              </button>
              <button
                className="note-delete"
                onClick={() => deleteEntry(entry.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default Notes_list;
