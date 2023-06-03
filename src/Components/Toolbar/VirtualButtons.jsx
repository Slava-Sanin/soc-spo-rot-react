import React, {useState} from 'react';
import { throttle } from 'lodash';
import '../../CSS/virtual_buttons.css';
import {moveVirtualButtons} from "../../code/functions";
//import {virtual_buttons_moving} from "../../code/globals";
import $ from "jquery";

const VirtualButtonSettings = {
    isWasDragged: false,
    x: 430,
    y: 31,
    dragging: false
}

 const VirtualButtons = ({state}) => {
     const [dragging, setDragging] = useState(false);
     //let dragging = false;
     //const [position, setPosition] = useState({ x: VirtualButtonSettings.x, y: VirtualButtonSettings.y });
     const [position, setPosition] = useState({});

     const handleMouseDown = () => {
        //VirtualButtonSettings.dragging = true;
        setDragging(true);
     }

     const handleMouseMove = throttle((event) => {
         if (dragging) {
             VirtualButtonSettings.isWasDragged = true;
             const { clientX, clientY } = event;
             setPosition({ x: clientX - 137/2, y: clientY - 137/2 });
             console.log(position);
         }
     }, 200);

     const handleMouseUp = () => {
        //VirtualButtonSettings.dragging = false;
        setDragging(false);
     }

     /*const handleDragStart = () => {
         setDragging(true);
         VirtualButtonSettings.dragging = true;
         VirtualButtonSettings.isWasDragged = true;
         $("#virtual_move").removeClass().addClass("virtual_move_on");
     };

     const handleDrag = (event) => {
         event.preventDefault();
         if (dragging) {
             const { clientX, clientY } = event;
             VirtualButtonSettings.x = clientX - 137/2;
             VirtualButtonSettings.y = clientY - 137/2;
             //if (!clientX && !clientY) return;
             setPosition({ x: clientX - 137/2, y: clientY - 137/2 });
         }
         console.log(VirtualButtonSettings);
     };

     const handleDragEnd = (event) => {
         setDragging(false);
         //dragging = false;
         //VirtualButtonSettings.isWasDragged = false;
         $("#virtual_move").removeClass().addClass("virtual_move_off");
         //VirtualButtonSettings.dragging = false;
         //moveVirtualButtons(event);
         //let x = event.clientX - 137/2;
         //let y = event.clientY - 137/2;
         //if (virtual_buttons_moving) $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
         //$("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
         //console.log(VirtualButtonSettings);
     };
*/
    return (
        <div
             className="virtual_buttons"
             style={{
                 display: (state.selectedTab === 0) ? "block" : "none",
                 //cursor: VirtualButtonSettings.dragging ? "none" : "auto",
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
                            //draggable
                            //onDragStart={handleDragStart}
                            //onDrag={handleDrag}
                            //onDragEnd={handleDragEnd}

                            //onMouseMoveCapture
                            onMouseDown={ handleMouseDown }
                            onMouseMove={ handleMouseMove }
                            onMouseUp={ handleMouseUp }

                            /*onMouseMove={ (event) => moveVirtualButtons(event) }
                            onClick={ () => {
                                if (!dragging)
                                {
                                    setDragging(true);
                                    $("#virtual_move").removeClass().addClass("virtual_move_on");
                                }
                                else
                                {
                                    setDragging(false);
                                    $("#virtual_move").removeClass().addClass("virtual_move_off");
                                }
                            } }*/
                        >+</th>
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