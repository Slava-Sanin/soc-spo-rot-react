import React from 'react';
import '../../CSS/spot.css';

const Spot = (props) => {
    console.log("Redrawing Component Spot");

    return (
        <>
          {props.level.map((number, index) => (
            <div className={`div-spo-${(number === ' ') ? 'Z' : number}`} key={'spo'+index}></div>
          ))}
        </>
    );
}

export default Spot;