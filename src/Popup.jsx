import React from "react";
import PopTracker from "./popupFunc/Tracker/PopTracker";
import StickyNotes from "./popupFunc/StickyNotes/StickyNotes";

function Popup(){
    return(
        <div className="popup-container">
        <PopTracker />
        <StickyNotes />
        </div>
    )
}

export default Popup;