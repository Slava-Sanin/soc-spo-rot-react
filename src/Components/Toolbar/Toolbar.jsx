import React from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';

const Toolbar = (props) => {
    return (
        <div className='toolbar'>
            <button id='btn-socoban' key='btn-1'><span className="mytooltiptext">Play Socoban</span></button>
            <button id='btn-spot' key='btn-2'><span className="mytooltiptext">Play Spot</span></button>
            <button id='btn-rotms' key='btn-3'><span className="mytooltiptext">Play Rotms</span></button>
            <button id='btn-sound' className='sound' key='btn-4' ><span className="mytooltiptext">Sound On/Off</span></button>
            <button id='btn-save' key='btn-5'><span className="mytooltiptext">Save</span></button>
            <button id='btn-new' key='btn-6'><span className="mytooltiptext">New game</span></button>
            <button id='btn-finish' key='btn-7' onClick={()=>window.close()}><span className="mytooltiptext">Close and Exit</span></button>
            <button id='btn-undo' key='btn-8'><span className="mytooltiptext">Undo</span></button>

            <SpotToolbar selectedTab={props.selectedTab} />
            <VirtualButtons selectedTab={props.selectedTab} />
        </div>
    );
}

export default Toolbar;