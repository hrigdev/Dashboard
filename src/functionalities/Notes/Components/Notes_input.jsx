import React from "react";
import Tiptap from "./Tiptap";
import { v4 as uuidv4 } from 'uuid';

function Notes_input(props) {



    function insertVal(v) {

        if (props.content.id == null) {
            const currentDate = new Date();
            const dateString = currentDate.toString();
            const id= uuidv4();
            let newEntry = {
                date: dateString,
                id: id,
                content: v,
            };
            props.setEntries((prevValues) => [...prevValues, newEntry]);
            props.setContent(newEntry)
        } else {
            props.setEntries((prevValues) =>
                prevValues.map((entry) =>
                    entry.id === props.content.id
                        ? { ...entry, content: v }
                        : entry
                )
            );
        }
    }

    return (
        <div>
            <Tiptap
                insert={insertVal}
                content={props.content ? props.content.content : ''}
            />
        </div>
    );
}

export default Notes_input;
