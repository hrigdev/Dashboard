import { useState } from "react";
import To_do from "./functionalities/To_do/To_do";
import Notes from "./functionalities/Notes/Notes";
import Finance from "./functionalities/Finance/Finance";
import Tracker from "./functionalities/Tracker/Tracker";
import "./App.css";

function App() {
  const [active, setActive] = useState(0);
  function getDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  }

  return (
    <>
      <div className="header-container">
        <div className="title-container">
          <div className="header">Dashboard</div>
          <div className="date">{getDate()}</div>
        </div>
        <div className="goals-container">GOALS</div>
        <div className="button-container"></div>
      </div>
      <div className="fn-container">
        <div className="container container1 todo">
          <div className="container-header todo-header">
            <div className="fn-header">TO DO</div>
            <div className="subheader">TIME REMAINING: XX:XX</div>
          </div>
          <To_do />
        </div>
        <div className="container container2 finance">
          <div className="container-header finance-header">
            <div className="fn-header">
              CURRENT <br />
              BALANCE <br /> Rs. XXXX
            </div>
            <div className="subheader">recents:</div>
          </div>
          <div className="fn">
            <Finance />
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
