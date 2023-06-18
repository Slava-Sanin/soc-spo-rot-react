import React from 'react';
import '../../CSS/rotms.css';

const Rotms = ({level, handleClick}) => {
    console.log("Redrawing Component Rotms");

    return (
        <>
            {level.map((number, index) => (
            <div className={`div-rot-${(number === ' ') ? 'Z' : number}`}
                 key={'rot'+index}
                 onClick={['1', '2', '3', '4', '5'].includes(number) ? handleClick : null}
            ></div>
            ))}
        </>
    );
}

export default Rotms;