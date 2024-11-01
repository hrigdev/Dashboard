import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckIcon from "@mui/icons-material/Check";
import List from "./Components/List";

function To_do(props) {
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Load entries from local storage
    const storedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    const lastSaveDate = localStorage.getItem("lastSaveDate");

    const isNewDay = () => {
      const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
      return lastSaveDate !== today;
    };

    if (isNewDay()) {
      // Clear entries if a new day has started
      localStorage.removeItem("entries");
      localStorage.setItem(
        "lastSaveDate",
        new Date().toISOString().slice(0, 10)
      );
    } else {
      setEntries(storedEntries);
    }
  }, []);

  useEffect(() => {
    // Save entries to local storage whenever they change
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  function submitEntry(event) {
    event.preventDefault();
    if (value === "") {
      console.log("null value cannot be saved.");
      return;
    }
    const current_entry = { id: uuidv4(), value: value };
    setEntries((prevValue) => [...prevValue, current_entry]);
    setValue("");
  }

  function submitValue(event) {
    setValue(event.target.value);
  }

  function Delete(id) {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries)); // Update local storage
  }

  return (
    <>
      <form onSubmit={submitEntry} className="todo-form">
        <input
          placeholder="Enter for quick list"
          className="todo-entry"
          type="text"
          onChange={submitValue}
          value={value}
        ></input>
        <button className="todo-button">
          <CheckIcon />
        </button>
      </form>
      <div className="todo-entries-container">
        {entries.map((entry) => (
          <div key={entry.id} className="todo-entries">
            <List
              content_id={entry.id}
              content_value={entry.value}
              Delete={Delete}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default To_do;
