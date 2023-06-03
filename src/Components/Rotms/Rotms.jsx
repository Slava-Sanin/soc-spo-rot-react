import React from 'react';
import '../../CSS/rotms.css';

const Rotms = (props) => {
    return (
        <>
            {props.level.map((number, index) => (
            <div className={`div-rot-${(number === ' ') ? 'Z' : number}`} key={'rot'+index}></div>
            ))}
        </>
    );
}

export default Rotms;