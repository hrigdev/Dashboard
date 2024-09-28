import { useState } from "react";
import To_do from "./functionalities/To_do/To_do";
import Notes from "./functionalities/Notes/Notes";
import Finance from "./functionalities/Finance/Finance";
import Tracker from "./functionalities/Tracker/Tracker";
import "./App.css";

function App() {
  const [active, setActive] = useState(0);

  return (
    <>
      
      <To_do />
      <Notes />
       <Finance />
       <Tracker />
    </>
  );
}

export default App;
