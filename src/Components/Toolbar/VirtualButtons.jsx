import React from 'react';
import '../../CSS/virtual_buttons.css';

 const VirtualButtons = (props) => {
    return (
        <div className="virtual_buttons" style={{display: (props.selectedTab === 0) ? "block" : "none"}}>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th id="virtual_up" onClick={ () => {props.p1.movetop(72)} }></th>
                        <th></th>
                    </tr>

                    <tr>
                        <th id="virtual_left" onClick={ () => {props.p1.movetop(75)} }></th>
                        <th id="virtual_move" onMouseMove={ (event) => props.moveVirtualButtons(event) }>+</th>
                        <th id="virtual_right" onClick={ () => {props.p1.movetop(77)} }></th>
                    </tr>

                    <tr>
                        <th></th>
                        <th id="virtual_down" onClick={ () => {props.p1.movetop(80)} }></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default VirtualButtons;