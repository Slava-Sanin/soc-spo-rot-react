import React, {useState} from 'react';
import { throttle } from 'lodash';
import '../../CSS/virtual_buttons.css';
//import {virtual_buttons_moving} from "../../code/globals";

const VirtualButtonSettings = {
    isWasDragged: false,
    //x: 430,
    //y: 31,
}

 const VirtualButtons = ({state, setState}) => {
     const [dragging, setDragging] = useState(false);
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

     const handleKeyDown = (key) => {
         if (state.selectedTab !== 0) return;
         let movesBefore = state.p1.moves;

         if (key === 'ArrowUp') {
             state.p1.movetop(72);
         } else if (key === 'ArrowDown') {
             state.p1.movetop(80);
         } else if (key === 'ArrowLeft') {
             state.p1.movetop(75);
         } else if (key === 'ArrowRight') {
             state.p1.movetop(77);
         }

         if (state.p1.moves === movesBefore) return;
         if (state.p1.level_is_completed) return;

         setState({...state});
     };

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
                        <th id="virtual_up" onClick={ () => {handleKeyDown('ArrowUp')} }></th>
                        <th></th>
                    </tr>

                    <tr>
                        <th id="virtual_left" onClick={ () => {handleKeyDown('ArrowLeft')} }></th>
                        <th id="virtual_move"
                            className={dragging ? "virtual_move_on" : "virtual_move_off"}
                            //onMouseMoveCapture
                            onMouseDown={ handleMouseDown }
                            onMouseMove={ handleMouseMove }
                            onMouseUp={ handleMouseUp }
                        >+<span className="mytooltiptext">You can drag it to any place</span></th>
                        <th id="virtual_right" onClick={ () => {handleKeyDown('ArrowRight')} }></th>
                    </tr>

                    <tr>
                        <th></th>
                        <th id="virtual_down" onClick={ () => {handleKeyDown('ArrowDown')} }></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default VirtualButtons;