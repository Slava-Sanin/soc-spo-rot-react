import React, {useState} from 'react';
import '../../CSS/virtual_buttons.css';
import {moveVirtualButtons} from "../../code/functions";
//import {virtual_buttons_moving} from "../../code/globals";
import $ from "jquery";

let VirtualButtonSettings = {
    isWasDragged: false,
    x: 430,
    y: 31,
    dragging: false
}

 const VirtualButtons = ({state}) => {
     //const [dragging, setDragging] = useState(false);
     //let dragging = false;
     const [position, setPosition] = useState({ x: VirtualButtonSettings.x, y: VirtualButtonSettings.y });
     const handleDragStart = () => {
         //setDragging(true);
         VirtualButtonSettings.dragging = true;
         VirtualButtonSettings.isWasDragged = true;
         $("#virtual_move").removeClass().addClass("virtual_move_on");
     };

     const handleDrag = (event) => {
         //if (VirtualButtonSettings.dragging) {
             const { clientX, clientY } = event;
             VirtualButtonSettings.x = clientX - 137/2;
             VirtualButtonSettings.y = clientY - 137/2;
             setPosition({ x: clientX - 137/2, y: clientY - 137/2 });
         //}
     };

     const handleDragEnd = () => {
         //setDragging(false);
         //dragging = false;
         //VirtualButtonSettings.isWasDragged = false;
         VirtualButtonSettings.dragging = false;
         $("#virtual_move").removeClass().addClass("virtual_move_off");
         //moveVirtualButtons(event);
         //let x = event.clientX - 137/2;
         //let y = event.clientY - 137/2;
         //if (virtual_buttons_moving) $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
         //$("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
     };

    return (
        <div
             className="virtual_buttons"
             style={{
                 display: (state.selectedTab === 0) ? "block" : "none",
                 cursor: VirtualButtonSettings.dragging ? "none" : "auto",
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
                            draggable
                            onDragStart={handleDragStart}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
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