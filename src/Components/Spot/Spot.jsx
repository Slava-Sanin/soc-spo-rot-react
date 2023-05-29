import React, { Component } from 'react';
// import ReactDOM from 'react-dom/client';
import '../../CSS/spot.css';
import SpotLevels from "../../Spot/levels.json";

export default class Spot extends Component {            
    constructor() {
        super();
        let spot_array = SpotLevels[0].data.split('');

        for (let x = 0; x < spot_array.length ; x++) {
            if (spot_array[x] === ' ') spot_array[x] = 'Z';            
        }

        this.state = {spot_array};
    }    

    render() {
      return (
        <div>        
          {this.state.spot_array.map((number, index) => (
            <div className={"div-spo-" + number} key={'sp'+index}></div>
          ))}
        </div>
      );
    }

  }