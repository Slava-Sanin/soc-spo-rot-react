import $ from 'jquery';
import React, {useEffect, useState} from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';

const Toolbar = ({state}) => {
    /*
     backgroundMode[0] - Sokoban background mode
     backgroundMode[1] - Spot background mode
     backgroundMode[2] - Rotms background mode
     mode 1 - Background is transparent
     mode 2 - Background of '.main-window' is visible
     mode 3 - Background of 'tab-x' is visible
    */

    const [backgroundMode, setBackgroundMode] = useState([3,3,3]);
    const handleBackgroundMode = (game) => {
        let modes = [...backgroundMode];
        modes[game]++;
        if (modes[game] > 3) modes[game] = 1;
        switch (game) {
            case 0: state.p1.backgroundMode = modes[0];
                break;
            case 1: state.p2.backgroundMode = modes[1];
                break;
            case 2: state.p3.backgroundMode = modes[2];
                break;
            default:
        }
        setBackgroundMode(modes);
    };

    useEffect(() => {
        let elem = "#tabs-" + (state.selectedTab + 1);
        console.log(elem);
        switch (backgroundMode[state.selectedTab]) { //mode
            case 1:
                $('.main-window').addClass("background-off");
                $(elem).addClass("background-off");
                break;

            case 2:
                $('.main-window').removeClass("background-off");
                $(elem).addClass("background-off");
                break;

            case 3:
                $(elem).removeClass("background-off");
                break;

            default:
        }
        console.log('bg mode: ', backgroundMode);
    }, [backgroundMode]);

    return (
        <div className='toolbar'>
            <button id='btn-sokoban'
                    key='btn-1'
                    onClick={() => handleBackgroundMode(0)}>
                <span className="mytooltiptext">Sokoban Background Mode ({backgroundMode[0]}/3)</span>
            </button>

            <button id='btn-spot'
                    key='btn-2'
                    onClick={() => handleBackgroundMode(1)}>
                <span className="mytooltiptext">Spot Background Mode ({backgroundMode[1]}/3)</span>
            </button>

            <button id='btn-rotms'
                    key='btn-3'
                    onClick={() => handleBackgroundMode(2)}>
                <span className="mytooltiptext">Rotms Background Mode ({backgroundMode[2]}/3)</span>
            </button>

            <button id='btn-sound'
                    key='btn-4'
                    className='sound' ><span className="mytooltiptext">Sound On/Off</span>
            </button>

            <button id='btn-save'
                    key='btn-5'>
                <span className="mytooltiptext">Save</span>
            </button>

            <button id='btn-new'
                    key='btn-6'>
                <span className="mytooltiptext">New game</span>
            </button>

            <button id='btn-finish'
                    key='btn-7'
                    onClick={()=>window.close()}>
                <span className="mytooltiptext">Close and Exit</span>
            </button>

            <button id='btn-undo'
                    key='btn-8'>
                <span className="mytooltiptext">Undo</span>
            </button>

            <SpotToolbar state={state} />
            <VirtualButtons state={state} />
        </div>
    );
}

export default Toolbar;