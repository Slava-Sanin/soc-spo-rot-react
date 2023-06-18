import React from 'react';
import '../../CSS/spot.css';

const Spot = ({level, handleClick}) => {
    console.log("Redrawing Component Spot");

    return (
        <>
          {level.map((number, index) => (
            <div className={`div-spo-${(number === ' ') ? 'Z' : number}`}
                 key={'spo'+index}
                 onClick={['2', '3', '4', '5', '6'].includes(number) ? handleClick : null}
            ></div>
          ))}
        </>
    );
}

export default Spot;