import React from 'react';
import '../../CSS/socoban.css';

const Socoban = (props) => {
    return (
        <div>
            {props.data_level.map((number, index) => (
            <div className={`div-soc-${(number === ' ') ? 'Z' : number}`} key={'soc'+index}></div>
            ))}
        </div>
    );
}

export default Socoban;

