import React from 'react';
import '../../CSS/socoban.css';

const Socoban = (props) => {
    console.log("Redrawing Component Socoban");
    console.log(props);

    return (
        <>
            {props.level.map((number, index) => (
            <div className={`div-soc-${(number === ' ') ? 'Z' : number}`} key={'soc'+index}></div>
            ))}
        </>
    );
}

export default Socoban;

