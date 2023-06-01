import React from "react";
import {InitStatus} from "../../code/functions"

const Status = ({state}) => {
    return (
        <>
            {InitStatus(state)}
        </>
    );
};
export default Status;

