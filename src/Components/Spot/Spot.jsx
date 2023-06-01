import React from 'react';
import '../../CSS/spot.css';

const Spot = (props) => {
    return (
        <div>
          {props.data_level.map((number, index) => (
            <div className={`div-spo-${(number === ' ') ? 'Z' : number}`} key={'spo'+index}></div>
          ))}
        </div>
    );
}

export default Spot;