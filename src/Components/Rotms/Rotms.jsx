import React from 'react';
import '../../CSS/rotms.css';

const Rotms = (props) => {
    console.log("Redrawing Component Rotms");

    return (
        <>
            {props.level.map((number, index) => (
            <div className={`div-rot-${(number === ' ') ? 'Z' : number}`}
                 key={'rot'+index}
                 onClick={ ['1', '2', '3', '4', '5'].includes(number) && props.handleClick }
            ></div>
            ))}
        </>
    );
}

export default Rotms;