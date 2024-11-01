import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Goals = ({ entries, setEntries }) => {
  const [currentContent, setCurrentContent] = useState("");
  const [fadeClass, setFadeClass] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContracting, setIsContracting] = useState(false);
  const [dailyGoals, setDailyGoals] = useState([""]);
  const [mainGoal, setMainGoal] = useState("");
  const [userInput, setUserInput] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [userEditIndex, setUserEditIndex] = useState(null);

  // Sample data
  const initialData = [
    { id: 1, goal: "Build healthy habits", daily: ["Exercise", "Meditate"] },
    {
      id: 2,
      goal: "Learn new skills",
      daily: ["Study React", "Practice coding"],
    },
    { id: 3, goal: "Stay productive", daily: ["Plan tasks", "Track progress"] },
  ];

  useEffect(() => {
    setEntries(initialData);
    setCurrentContent(initialData[0].goal);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (entries.length > 0 && !isExpanded) {
        setFadeClass("fade-out");
        setTimeout(() => {
          setCurrentContent((prev) => {
            const currentIndex = entries.findIndex(
              (entry) => entry.goal === prev
            );
            const nextIndex = (currentIndex + 1) % entries.length;
            return entries[nextIndex].goal;
          });
          setFadeClass("fade-in");
        }, 2500);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [entries, isExpanded]);

  const handleClose = () => {
    setUserInput(false);
    setIsContracting(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsContracting(false);
    }, 330);
  };

  const addDailyGoal = (event) => {
    event.preventDefault();
    setDailyGoals((prevGoals) => [...prevGoals, ""]); // Add a new empty string to daily goals
  };

  const handleDailyGoalChange = (index, value) => {
    const newDailyGoals = [...dailyGoals];
    newDailyGoals[index] = value;
    setDailyGoals(newDailyGoals);
  };

  const deleteDailyGoal = (index) => {
    const newDailyGoals = dailyGoals.filter((_, i) => i !== index);
    setDailyGoals(newDailyGoals);
  };

  function addNewEntry(event) {
    event.preventDefault();
    // Check if the main goal is empty
    if (mainGoal.trim() === "") {
      alert("Main goal cannot be empty.");
      return;
    }

    // Filter out empty daily goals
    const filteredDailyGoals = dailyGoals.filter((goal) => goal.trim() !== "");

    const id = uuidv4();
    const currentDate = new Date();
    const dateString = currentDate.toString();
    const object = {
      date: dateString,
      id: id,
      goal: mainGoal,
      daily: filteredDailyGoals,
    };
    setEntries((prevValue) => [...prevValue, object]);
    setMainGoal("");
    setUserInput(false);
    setDailyGoals([""]);
  }

  function handleMainGoalChange(value) {
    setMainGoal(value);
  }

  function saveUpdate(id) {
    const currentDate = new Date();
    const dateString = currentDate.toString();

    setEntries((prevValue) =>
      prevValue.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              date: dateString,
              goal: mainGoal,
              daily: dailyGoals.filter((goal) => goal.trim() !== ""),
            }
          : entry
      )
    );
    console.log("Entry has been updated");
    setUserInput(false);
    setUserEdit(false);
    setUserEditIndex(null);
  }

  function deleteEntry(id) {
    setEntries((prevValue) => prevValue.filter((value) => value.id !== id));
    console.log("entry has been deleted " + id);
  }

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <div className="goals-wrapper">
      {isExpanded ? (
        <div
          className={`goals-expanded ${isExpanded ? "expanded" : ""} ${
            isContracting ? "contracting" : ""
          }`}
        >
          <div className="goals-header">
            Goals
            <button className="close-button" onClick={handleClose}>
              ×
            </button>
          </div>
          <div className="goals-content">
            {userInput ? (
              <form onSubmit={addNewEntry}>
                <div className="daily-goals-container">
                  <input
                    type="text"
                    placeholder="Enter main goal"
                    onChange={(e) => handleMainGoalChange(e.target.value)}
                    value={mainGoal}
                  />
                  {dailyGoals.map((_, index) => (
                    <div key={index} className="daily-goal-input">
                      <input
                        type="text"
                        value={dailyGoals[index]}
                        onChange={(e) =>
                          handleDailyGoalChange(index, e.target.value)
                        }
                      />
                      {userEdit && (
                        <button
                          type="button"
                          onClick={() => deleteDailyGoal(index)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <button className="add-daily-goal" onClick={addDailyGoal}>
                    +
                  </button>
                </div>
                <button type="submit">Add</button>
                <button
                  type="button"
                  onClick={() => {
                    setUserInput(false);
                    setMainGoal("");
                    setDailyGoals([""]);
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setUserInput(true);
                  setDailyGoals([""]);
                  setMainGoal("");
                  setUserEditIndex(null);
                  setUserEdit(false);
                }}
              >
                New
              </button>
            )}
            {entries.map((entry) => (
              <div key={entry.id} className="goal-item">
                {userEdit && entry.id === userEditIndex && !userInput ? (
                  <form>
                    <input
                      type="text"
                      value={mainGoal}
                      onChange={(e) => handleMainGoalChange(e.target.value)}
                    />
                    <ul>
                      {dailyGoals.map((_, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={dailyGoals[index]}
                            onChange={(e) =>
                              handleDailyGoalChange(index, e.target.value)
                            }
                          />
                          {userEdit && (
                            <button
                              type="button"
                              onClick={() => deleteDailyGoal(index)}
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    <button onClick={addDailyGoal}>+</button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUserEditIndex(null);
                        setUserEdit(false);
                        saveUpdate(entry.id);
                      }}
                    >
                      Done
                    </button>
                  </form>
                ) : (
                  <>
                    <h3>{entry.goal}</h3>
                    <ul>
                      {entry.daily.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setUserEdit(true);
                        setUserEditIndex(entry.id);
                        setMainGoal(entry.goal);
                        setDailyGoals(entry.daily);
                        if (userInput) {
                          setUserInput(false);
                        }
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setUserEditIndex(null);
                        setUserEdit(false);
                        deleteEntry(entry.id);
                      }}
                    >
                      delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button className="goals-button" onClick={() => setIsExpanded(true)}>
          Goals | <span className={fadeClass}>{currentContent}</span>
        </button>
      )}
    </div>
  );
};

export default Goals;
