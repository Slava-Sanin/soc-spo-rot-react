import React, {useEffect, useState} from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';

const Toolbar = ({
                  state, setState,
                  setSokobanLevelData,
                  setSpotLevelData,
                  setRotmsLevelData,
                  handleSpotDialogTrigger
        }) => {
    /*
     backgroundModes[0] - Sokoban background mode
     backgroundModes[1] - Spot background mode
     backgroundModes[2] - Rotms background mode
     mode 1 - Background is transparent
     mode 2 - Background of '.main-window' is visible
     mode 3 - Backgrounds of '.main-window' and '#tabs-x' is visible
    */

    console.log("Redrawing Toolbar");
    const handleBackgroundMode = (game) => {
        state.backgroundModes[game]++;
        if (state.backgroundModes[game] > 3) state.backgroundModes[game] = 1;
        setState({...state});
    };

    const toggleSound = () => {
        setState({
            ...state,
            soundMode: !state.soundMode
        });
    };

    const toggleToolbarMode = () => {
        setState({
            ...state,
            toolbarMode: !state.toolbarMode
        });
    };

    const newGame = () => {
        console.log("Clicked newGame");
        switch (state.selectedTab)
        {
            case 0:
                state.p1.NewGame();
                setSokobanLevelData([...state.p1.data_level]);
                break;

            case 1:
                state.p2.NewGame();
                //setState({...state});
                setSpotLevelData([...state.p2.data_level]);
                console.log(state.p2)
                break;

            case 2:
                state.p3.NewGame();
                setRotmsLevelData([...state.p3.data_level]);
                break;

            default:
        }

        switchUndoMode(false);
    };

    const switchUndoMode = (mode) => {
        state.undoStates[state.selectedTab] = mode;
        setState({...state});
    }

    const handleUndo = () => {
        console.log("Clicked undo");
        switch (state.selectedTab)
        {
            case 0: //Socoban
                if (state.p1.moves === 0) return;
                if (!state.p1.level_is_completed) state.p1.Undo();
                break;

            case 1: //Spot
                if (state.p2.moves === 0) return;
                if (!state.p2.level_is_completed) state.p2.Undo();
                break;

            case 2: //Rotms
                if (state.p3.moves === 0) return;
                if (!state.p3.level_is_completed) state.p3.Undo();
                break;

            default:
        }
        switchUndoMode(false);
    };


    return (
        <div className='toolbar' >
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
                    className={state.soundMode ? "sound" : "no-sound"}
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
                    disabled={(state.undoStates[state.selectedTab] === false)}
                    onClick={ handleUndo }
                ><span className="mytooltiptext">Undo</span>
            </button>

            <button id='toolbar-switch'
                    onClick={ toggleToolbarMode }
                ><span className="mytooltiptext">Toolbar mode</span>
            </button>

            <SpotToolbar state={state} setState={setState} handleSpotDialogTrigger={handleSpotDialogTrigger} />
            <VirtualButtons state={state} setState={setState} />
        </div>
    );
}

export default Toolbar;