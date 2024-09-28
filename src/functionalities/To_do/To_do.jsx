// useEffect useState
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./Components/List";

function To_do(props) {
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState([]);

  function submitEntry(event) {
    event.preventDefault();
    if (value == "") {
      console.log("null value cannot be saved.");
      return;
    }
    let current_entry = { id: uuidv4(), value: value };
    console.log(current_entry);
    setEntries((prevValue) => [...prevValue, current_entry]);
    setValue("");
  }

  function submitValue(event) {
    setValue(event.target.value);
  }

  function Delete(id) {
    console.log(id);
    setEntries(entries.filter((entry) => entry.id != id));
  }

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <>
      <form onSubmit={submitEntry}>
        <input type="text" onChange={submitValue} value={value}></input>
        <button>Tick</button>
      </form>
      <div>
        {entries.map((entry, index) => {
          return (
            <List
              key={entry.id}
              content_id={entry.id}
              content_value={entry.value}
              Delete={Delete}
            />
          );
        })}
      </div>
    </>
  );
}

export default To_do;
