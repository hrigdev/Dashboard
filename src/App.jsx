import { useState, useEffect } from "react";
import To_do from "./functionalities/To_do/To_do";
import Notes from "./functionalities/Notes/Notes";
import Finance from "./functionalities/Finance/Finance";
import PopTracker from "./popupFunc/Tracker/PopTracker";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Goals from "./functionalities/Goals/Goals";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [showSidebar, setShowSideBar] = useState(false);
  const [sidebarButton, setSideBarButton] = useState(false);
  const [mostUsedToday, setMostUsedToday] = useState("");
  const [mostUsedThisWeek, setMostUsedThisWeek] = useState("");
  const [mostUsedThisMonth, setMostUsedThisMonth] = useState("");

  function handleFinalAmountUpdate(amount) {
    setFinalAmount(amount);
  }

  function getDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  }

  function calculateTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set to the last moment of the current day

    const timeDiff = endOfDay - now; // Difference in milliseconds

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 10);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <>
      <div className="header-container">
        <div className="title-container">
          <div className="header">Dashboard</div>
          <div className="date">{getDate()}</div>
        </div>
        <div className="goals-container">
          <Goals entries={entries} setEntries={setEntries} />
        </div>
        <div className="button-container">
          <div>
            <SettingsIcon />
          </div>
          <div>
            <InfoIcon />
          </div>
        </div>
      </div>
      <div className="fn-container">
        <div className="container container1 todo">
          <div className="container-header todo-header">
            <div className="fn-header">TO DO</div>
            <div className="subheader">TIME REMAINING: {timeRemaining}</div>
          </div>
          <div className="fn-todo">
            <div className="todo-goals">
              <div className="description">Daily Objective</div>
              <div className="daily-objective">
                <ul className="daily-objective-list">
                  {entries.map((entry) =>
                    entry.daily.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="fn">
              <div className="description">Quick List</div>
              <div className="todo-entries">
                <To_do />
              </div>
            </div>
          </div>
        </div>
        <div className="container container2 finance">
          <div className="container-header finance-header">
            <div className="fn-header">
              CURRENT <br />
              BALANCE <br />
              <span className="amount">Rs.{finalAmount}</span>
            </div>
            <div className="subheader">recents:</div>
          </div>
          <div className="fn">
            <Finance onFinalAmountUpdate={handleFinalAmountUpdate} />
          </div>
        </div>
        <div className="container container3 tracker">
          <div className="container-header tracker-header">
            <div className="subheader">
              <p>MOST USED TODAY: {mostUsedToday || "No data"}</p>
              <p>MOST USED THIS WEEK: {mostUsedThisWeek || "No data"}</p>
              <p>MOST USED THIS MONTH: {mostUsedThisMonth || "No data"}</p>
            </div>
            <div className="fn-header">TRACKER</div>
          </div>
          <PopTracker
            setMostUsedToday={setMostUsedToday}
            setMostUsedThisWeek={setMostUsedThisWeek}
            setMostUsedThisMonth={setMostUsedThisMonth}
          />
        </div>
        <div className="container container4 notes">
          <div className="container-header notes-header">
            <div className="notes-nav">
              <div className="fn-header">NOTES</div>
              <div>
                {sidebarButton ? (
                  <button
                    onClick={() => setShowSideBar(!showSidebar)}
                    className="notes-sidebar-show"
                  >
                    {showSidebar ? <CloseIcon /> : <MenuIcon />}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* <div className="subheader">MOST RECENT:</div> */}
          </div>
          <Notes
            showSidebar={showSidebar}
            setSideBarButton={setSideBarButton}
          />
        </div>
      </div>
    </>
  );
}

export default App;
