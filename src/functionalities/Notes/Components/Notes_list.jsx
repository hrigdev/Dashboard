import React from "react";

function Notes_list({ entries, searcher, deleteEntry }) {



    return (
        <nav className="navbar">
            {entries.length > 0 ? (
                entries.map((entry) => (
                    <div key={entry.id}>
                        <button onClick={() => searcher(entry.id)}>
                            {entry.content.substring(0, 20)} 
                        </button>
                        <button onClick={()=> deleteEntry(entry.id)}>del</button>
                    </div>
                ))
            ) : (
                <p>No entries available</p>
            )}
        </nav>
    );
}

export default Notes_list;
