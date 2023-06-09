import React, {useState} from 'react';
import { throttle } from 'lodash';
import '../../CSS/virtual_buttons.css';
import {moveVirtualButtons} from "../../code/functions";
//import {virtual_buttons_moving} from "../../code/globals";
//import $ from "jquery";

const VirtualButtonSettings = {
    isWasDragged: false,
    //x: 430,
    //y: 31,
}

 const VirtualButtons = ({state}) => {
     const [dragging, setDragging] = useState(false);
     //const [position, setPosition] = useState({ x: VirtualButtonSettings.x, y: VirtualButtonSettings.y });
     const [position, setPosition] = useState({});

     const handleMouseDown = () => {
        setDragging(true);
     }

     const handleMouseMove = throttle((event) => {
         if (dragging) {
             VirtualButtonSettings.isWasDragged = true;
             const { clientX, clientY } = event;
             setPosition({ x: clientX - 137/2, y: clientY - 137/2 });
         }
     }, 10);

     const handleMouseUp = () => {
        setDragging(false);
     }

    return (
        <div
             className="virtual_buttons"
             style={{
                 display: (state.selectedTab === 0) ? "block" : "none",
                 position: VirtualButtonSettings.isWasDragged ? "fixed" : "absolute",
                 left: position.x,
                 top: position.y,
             }}>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th id="virtual_up" onClick={ () => {state.p1.movetop(72)} }></th>
                        <th></th>
                    </tr>

                    <tr>
                        <th id="virtual_left" onClick={ () => {state.p1.movetop(75)} }></th>
                        <th id="virtual_move"
                            className={dragging ? "virtual_move_on" : "virtual_move_off"}
                            //onMouseMoveCapture
                            onMouseDown={ handleMouseDown }
                            onMouseMove={ handleMouseMove }
                            onMouseUp={ handleMouseUp }
                        >+<span className="mytooltiptext">You can drag it to any place</span></th>
                        <th id="virtual_right" onClick={ () => {state.p1.movetop(77)} }></th>
                    </tr>

                    <tr>
                        <th></th>
                        <th id="virtual_down" onClick={ () => {state.p1.movetop(80)} }></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default VirtualButtons;