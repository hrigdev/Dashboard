import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function List(props) {
  function child_delete() {
    let i = props.content_id;
    props.Delete(i);
  }

  return (
    <div className="todo-entry">
      {props.content_value}
      <button className="todo-entry-delete" onClick={child_delete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default List;
