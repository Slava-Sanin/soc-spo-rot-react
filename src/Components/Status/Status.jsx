import React, {useState, useEffect} from "react";
import {InitStatus} from "../../code/functions"

const Status = ({state}) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            {InitStatus(state)}
        </>
    );
}

export default Status;

