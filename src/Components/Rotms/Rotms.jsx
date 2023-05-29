import React, { Component } from 'react';
// import ReactDOM from 'react-dom/client';
import '../../CSS/rotms.css';
import RotmsLevels from "../../Rotms/levels.json";

export default class Rotms extends Component {
    constructor() {
        super();
        let rotms_array = RotmsLevels[0].data.split('');

        for (let x = 0; x < rotms_array.length ; x++) {
            if (rotms_array[x] === ' ') rotms_array[x] = 'Z';            
        }

        this.state = {rotms_array};
    } 

    render() {
      return (
        <div>        
          {this.state.rotms_array.map((number, index) => (
            <div className={"div-rot-" + number} key={index}></div>
          ))}
        </div>
      );
    }

  }