import $ from 'jquery';
import React, {useEffect, useState} from 'react';
import '../../CSS/toolbar.css';
import SpotToolbar from './SpotToolbar';
import VirtualButtons from './VirtualButtons';

const Toolbar = ({state}) => {
    const [sokobanBackgroundMode, setSokobanBackgroundMode] = useState(3);
    const handleSokobanBackgroundMode = () => {
        let mode = sokobanBackgroundMode + 1;
        if (mode > 3) mode = 1;
        setSokobanBackgroundMode(mode);
    };

    useEffect(() => {
        switch (sokobanBackgroundMode) {
            case 1:
                $('.main-window').addClass("background-off");
                $('#tabs-1').addClass("background-off");
                break;

            case 2:
                $('.main-window').removeClass("background-off");
                $('#tabs-1').addClass("background-off");
                break;

            case 3:
                $('#tabs-1').removeClass("background-off");
                break;

            default:
        }
        console.log('bg mode: ', sokobanBackgroundMode);
    }, [sokobanBackgroundMode]);

    return (
        <div className='toolbar'>
            <button id='btn-sokoban'
                    key='btn-1'
                    onClick={handleSokobanBackgroundMode}>
                <span className="mytooltiptext">Sokoban Background Mode ({sokobanBackgroundMode}/3)</span>
            </button>

            <button id='btn-spot'
                    key='btn-2'>
                <span className="mytooltiptext">Spot Background Mode</span>
            </button>

            <button id='btn-rotms'
                    key='btn-3'>
                <span className="mytooltiptext">Rotms Background Mode</span>
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