import $ from 'jquery';
import React, {useEffect, useState} from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';
import {InitStatus, PlayMySound} from "../../code/functions";

const Toolbar = ({state, setState}) => {
    /*
     backgroundModes[0] - Sokoban background mode
     backgroundModes[1] - Spot background mode
     backgroundModes[2] - Rotms background mode
     mode 1 - Background is transparent
     mode 2 - Background of '.main-window' is visible
     mode 3 - Backgrounds of '.main-window' and '#tabs-x' is visible
    */

    console.log("Redrawing Toolbar");
    console.log("state.backgroundModes: ", state.backgroundModes);

    const [soundMode, setSoundMode] = useState(state.soundMode);
    const [toolbarMode, setToolbarMode] = useState(state.toolbarMode);
    const [undoStates, setUndoStates] = useState(state.undoStates);

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

    const newGame = () => {
        switch (state.selectedTab)
        {
            case 0:
                state.p1.NewGame();
                break;
            case 1:
                state.p2.NewGame();
                break;
            case 2:
                state.p3.NewGame();
                break;
            default:
        }

        let tempUndoStates = [...undoStates];
        tempUndoStates[state.selectedTab] = false;
        setUndoStates(tempUndoStates);

        setState({
            ...state,
            undoStates: tempUndoStates
        });

        //InitStatus(state);
    };

    const undo = () => {
        console.log("Clicked undo");
        switch (state.selectedTab)
        {
            case 0: //Socoban
                if (state.p1.moves === 0) return;
                if (!state.p1.level_is_completed) state.p1.Undo();
                break;
            case 1: //Spot

                break;
            case 2: //Rotms
                if (state.p3.moves === 0) return;
                if (!state.p3.level_is_completed) state.p3.Undo();
                break;
            default:
        }
        let tempUndoStates = [...undoStates];
        tempUndoStates[state.selectedTab] = false;
        setUndoStates(tempUndoStates);
        setState({
            ...state,
            undoStates: tempUndoStates
        });
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
                    key='btn-6'
                    onClick={ newGame }
                ><span className="mytooltiptext">New game</span>
            </button>

            <button id='btn-finish'
                    key='btn-7'
                    onClick={()=>window.close()}>
                <span className="mytooltiptext">Close and Exit</span>
            </button>

            <button id='btn-undo'
                    key='btn-8'
                    disabled={(undoStates[state.selectedTab] === false)}
                    onClick={ undo }
                ><span className="mytooltiptext">Undo</span>
            </button>

            <button id='toolbar-switch'
                    onClick={ toggleToolbarMode }
                ><span className="mytooltiptext">Toolbar mode</span>
            </button>

            <SpotToolbar state={state} />
            <VirtualButtons state={state} />
        </div>
    );
}

export default Toolbar;