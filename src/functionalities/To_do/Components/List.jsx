import React from "react";

function List(props){

    function child_delete(){
        let i= props.content_id;
        props.Delete(i);
    }

    return(
        <div>
            {props.content_value} 
            <button onClick={child_delete}>Delete</button>
        </div>
    )

}

export default List;