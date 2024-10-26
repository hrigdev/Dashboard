import { useState, useEffect } from "react";
import To_do from "./functionalities/To_do/To_do";
import Notes from "./functionalities/Notes/Notes";
import Finance from "./functionalities/Finance/Finance";
import Tracker from "./functionalities/Tracker/Tracker";
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import "./App.css";

function App() {
  const [finalAmount, setFinalAmount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");

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
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        <div className="goals-container">GOALS</div>
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
              <div className="description">
                Daily Objective
              </div>
            </div>
            <div className="fn">
              <div className="description">
                Quick List    
              </div>
              <div className="todo-entries" >
                <To_do />
              </div>
            </div>
          </div>
        </div>
        <div className="container container2 finance">
          <div className="container-header finance-header">
            <div className="fn-header">
              CURRENT <br />BALANCE <br /> 
              <span className="amount">
                 Rs.{finalAmount}
              </span>
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
              MOST USED TODAY:
              <br />
              <br />
              MOST USED THIS WEEK:
              <br />
              <br />
              MOST USED THIS MONTH:
            </div>
            <div className="fn-header">TRACKER</div>
          </div>
          <Tracker />
        </div>
        <div className="container container4 notes">
          <div className="container-header notes-header">
            <div className="fn-header">NOTES</div>
            <div className="subheader">MOST RECENT:</div>
          </div>
          <Notes />
        </div>
      </div>
    </>
  );
}

export default App;
