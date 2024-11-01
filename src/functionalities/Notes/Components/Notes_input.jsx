import React, { useEffect } from "react";
import Tiptap from "./Tiptap";
import { v4 as uuidv4 } from "uuid";

function Notes_input(props) {
  function insertVal(v) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(v, "text/html");
    if (doc.body.textContent == "") {
      console.log("cant save an empty submission");
      return;
    }
    if (props.content.id == null) {
      const currentDate = new Date();
      const dateString = currentDate.toString();
      const id = uuidv4();
      let newEntry = {
        date: dateString,
        id: id,
        content: v,
      };
      props.setEntries((prevValues) => [...prevValues, newEntry]);
      props.setContent(newEntry);
    } else {
      props.setEntries((prevValues) =>
        prevValues.map((entry) =>
          entry.id === props.content.id ? { ...entry, content: v } : entry
        )
      );
    }
  }

  useEffect(() => {
    if (props.entries.length > 0 && !props.content.id) {
      // If there are entries and no content id set, use the last entry's content
      props.setContent(props.entries[props.entries.length - 1]);
    }
  }, [props.entries]); // Dependency array to trigger when entries change

  return (
    <div>
      <Tiptap
        createNewEntry={props.createNewEntry}
        insert={insertVal}
        content={props.content ? props.content.content : ""}
      />
    </div>
  );
}

export default Notes_input;
