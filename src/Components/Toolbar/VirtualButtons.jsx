import React, { Component } from 'react';
// import ReactDOM from 'react-dom/client';
import '../../CSS/virtual_buttons.css';
//import '../../code/ClassSocoban'

export default class VirtualButtons extends Component {
    // window.virtualButtonsState = virtualButtonsState;
    
    constructor(props) {        
        super(props);
        let virtualButtonsState;
        //this.state = {virtualButtonsState};
        //this.state.p1 = new ClassSocoban();                
    }     

    //movetop(k) { window.p1.movetop(k); }
    //moveVirtualButtons(e) { window.moveVirtualButtons(e); }

    render() {
        return (
            <div className="virtual_buttons">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th id="virtual_up" onClick={this.state.p1.movetop(72)}></th>
                        <th></th>
                    </tr>

                    <tr>
                        <th id="virtual_left" onClick={this.state.p1.movetop(75)}></th>
                        <th id="virtual_move" onMouseMove={(event)=>this.state.moveVirtualButtons(event)}>+</th>
                        <th id="virtual_right" onClick={this.state.p1.movetop(77)}></th>
                    </tr>

                    <tr>
                        <th></th>
                        <th id="virtual_down" onClick={this.state.p1.movetop(80)}></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>           
        );
    }

}