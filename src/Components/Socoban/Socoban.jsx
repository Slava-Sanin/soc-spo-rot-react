import React, { Component } from 'react';
// import ReactDOM from 'react-dom/client';
import '../../CSS/socoban.css';
import SocobanLevels from "../../Socoban/levels.json";

export default class Socoban extends Component {
    constructor() {
        super();
         let socoban_array = SocobanLevels[0].data.split('');

        for (let x = 0; x < socoban_array.length ; x++) {
            if (socoban_array[x] === ' ') socoban_array[x] = 'Z';            
        }

        this.state = {socoban_array};
    }    

    render() {
        return (
        <div>        
            {this.state.socoban_array.map((number, index) => (
            <div className={"div-soc-" + number} key={'soc'+index}></div>
            ))}
        </div>
        );
    }

}