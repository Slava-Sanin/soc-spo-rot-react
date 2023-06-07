import $ from 'jquery';
import React, {useEffect, useState} from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';

const Toolbar = ({state, setState}) => {
    /*
     backgroundModes[0] - Sokoban background mode
     backgroundModes[1] - Spot background mode
     backgroundModes[2] - Rotms background mode
     mode 1 - Background is transparent
     mode 2 - Background of '.main-window' is visible
     mode 3 - Backgrounds of '.main-window' and '#tabs-x' is visible
    */

    console.log('------------------------')
    console.log("Redrawing Toolbar");
    console.log("state.backgroundModes: ", state.backgroundModes);

    const [soundMode, setSoundMode] = useState(state.soundMode);
    const [toolbarMode, setToolbarMode] = useState(state.toolbarMode);

    const handleBackgroundMode = (game) => {
        let { backgroundModes } = state;
        backgroundModes[game]++;
        if (backgroundModes[game] > 3) backgroundModes[game] = 1;

        setState({
            ...state,
            backgroundModes,
        });
    };

    const toggleSound = () => {
        state.soundMode = !state.soundMode;
        setSoundMode(state.soundMode);
    };

    const toggleToolbarMode = () => {
        state.toolbarMode = !state.toolbarMode;
        setToolbarMode(state.toolbarMode);
    };

    /*useEffect(() => {
        let elem = "#tabs-" + (state.selectedTab + 1);
        console.log(elem);
        switch (state.backgroundModes[state.selectedTab]) { //mode
            case 1:
                $('.main-window').addClass("background-off");
                $(elem).addClass("background-off");
                break;

            case 2:
                $('.main-window').removeClass("background-off");
                $(elem).addClass("background-off");
                break;

            case 3:
                $('.main-window').removeClass("background-off");
                $(elem).removeClass("background-off");
                break;

            default:
        }
        console.log('bg mode: ', backgroundModes);
    }, [backgroundModes]);*/

    return (
        <div className='toolbar' style={{backgroundColor: !toolbarMode && "transparent"}}>
            <button id='btn-sokoban'
                    key='btn-1'
                    disabled={(state.selectedTab !== 0)}
                    onClick={() => handleBackgroundMode(0)}
                    ><span className="mytooltiptext">Sokoban Background Mode ({state.backgroundModes[0]}/3)</span>
            </button>

            <button id='btn-spot'
                    key='btn-2'
                    disabled={(state.selectedTab !== 1)}
                    onClick={() => handleBackgroundMode(1)}
                    ><span className="mytooltiptext">Spot Background Mode ({state.backgroundModes[1]}/3)</span>
            </button>

            <button id='btn-rotms'
                    key='btn-3'
                    disabled={(state.selectedTab !== 2)}
                    onClick={() => handleBackgroundMode(2)}
                    ><span className="mytooltiptext">Rotms Background Mode ({state.backgroundModes[2]}/3)</span>
            </button>

            <button id='btn-sound'
                    key='btn-4'
                    className={soundMode ? "sound" : "no-sound"}
                    onClick={ toggleSound }
                    ><span className="mytooltiptext">Sound On/Off</span>
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

            <button id='toolbar-switch'
                    style={{
                        backgroundColor: 'red',
                        float: 'right',
                        width: '15px',
                        height: '15px',
                        margin: '10px',
                        borderRadius: '50%'
                    }}
                    onClick={ toggleToolbarMode }>
                ><span className="mytooltiptext">Toolbar mode</span>
            </button>
        </div>
    );
}

export default Toolbar;