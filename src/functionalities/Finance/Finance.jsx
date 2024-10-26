import React from "react";
import IncExp from "./IncExp";

function Finance(props) {
    return(
       <> 
        <IncExp  onFinalAmountUpdate={props.onFinalAmountUpdate} />
         </>
    )
}

export default Finance;
