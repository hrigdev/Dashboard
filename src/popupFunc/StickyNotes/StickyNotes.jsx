import React from "react";
import Notes from "./Notes";
import Draggable from 'react-draggable';


function StickyNotes(){
    return(
        <Draggable>
        <div className="draggable-container">
            <div className="drag">

            </div>
            <div className="input">
                <Notes />
            </div>
        </div>
        </Draggable>
    )
}

export default StickyNotes;