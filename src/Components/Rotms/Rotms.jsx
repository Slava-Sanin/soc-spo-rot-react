import React from 'react';
import '../../CSS/rotms.css';

const Rotms = (props) => {
    return (
        <div>
            {props.data_level.map((number, index) => (
            <div className={`div-rot-${(number === ' ') ? 'Z' : number}`} key={'rot'+index}></div>
            ))}
        </div>
    );
}

export default Rotms;