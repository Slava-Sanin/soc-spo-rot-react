import React from 'react';
import '../../CSS/virtual_buttons.css';
import {moveVirtualButtons} from "../../code/functions";
import {virtual_buttons_moving} from "../../code/globals";
import $ from "jquery";

 const VirtualButtons = ({state}) => {
    let _virtual_buttons_moving = virtual_buttons_moving;

    return (
        <div className="virtual_buttons" style={{display: (state.selectedTab === 0) ? "block" : "none"}}>
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
                            onMouseMove={ (event) => moveVirtualButtons(event) }
                            onClick={ () => {
                                if (_virtual_buttons_moving === 0)
                                {
                                    _virtual_buttons_moving = 1;
                                    $("#virtual_move").removeClass().addClass("virtual_move_on");
                                }
                                else
                                {
                                    _virtual_buttons_moving = 0;
                                    $("#virtual_move").removeClass().addClass("virtual_move_off");
                                }
                            } }
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