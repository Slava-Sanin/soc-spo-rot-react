import React, {useState, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Helmet } from "react-helmet";

import './App.css';
import './CSS/spot_toolbar.css';
import './CSS/tabs.css';
import './CSS/scroll.css';
import './CSS/status.css';

import logo from './assets/images/spot.ico';
import Toolbar from './Components/Toolbar/Toolbar';
import Status from './Components/Status/Status';
import SpotColorDialog from './Components/Toolbar/SpotColorDialog';
import Sokoban from './Components/Sokoban/Sokoban';
import Spot from './Components/Spot/Spot';
import Rotms from './Components/Rotms/Rotms';
import ClassSokoban from './code/ClassSokoban';
import { PlayerDlg, ComputerDlg, ClassSpot } from './code/ClassSpot';
import ClassRotms from './code/ClassRotms';

import {
    IDM_Load,
    IDM_Save,
    IDM_Save_As,
    IDM_Save_All,
    IDM_Exit,
    IDM_Status_Off,
    IDM_Status_On,
    IDM_Status,
    IDM_Undo,
    IDM_On,
    IDM_Off,
    IDM_Background,
    IDM_Table,
    IDM_Spot_Options,
    IDM_Spot_Color,
    IDM_Help,
    IDM_About,
    IDM_NormalSize,
    ID_TOOLBAR,
    TOOLS_BMP,
    IDM_Sokoban,
    IDM_Spot,
    IDM_Rotms,
    IDM_Sound,
    IDM_New,
    IDM_Finish,
    NUMBUTTONS,
    A,
    B,
    Asp,
    Bsp,
    W1,
    W2,
    W3,
    W4,
    otstup,
    otstup_sp,
    MENU_PIC
} from "./code/constants";

import {
    host,
    soundPath,
    Backgrounds,
    CurPath,
    paintstruct,
    parts,
    gamecode,
    loaded,
    glob_sound,
    status_line,
    table,
    Save_as_Flag,
    level_in_text_format,
    timer,
    prev_game,
    virtual_buttons_moving
} from "./code/globals";

import {
    loadDoc,
    InitStatus,
    SomeArrow,
    Sound_On_Off,
    PlayMySound,
    Change_Player_color,
    Change_Computer_color,
    Sleep,
    GetColor,
    moveVirtualButtons
} from "./code/functions";
import $ from "jquery";

//import main from "./code/main";

const
    p1 = new ClassSokoban(),
    p2 = new ClassSpot(),
    p3 = new ClassRotms();

const App = () => {
    console.log('------------------------')
    console.log("Redrawing App");

    const refApp = useRef(null);
    const [state, setState] = useState({
     selectedTab: 0,
     soundMode: glob_sound,
     toolbarMode: false,
     backgroundModes: [3,3,3],
     undoStates: [false,false,false],
     p1,p2,p3
    });
    const [sokobanLevelData, setSokobanLevelData] = useState(p1.data_level);
    const [spotLevelData, setSpotLevelData] = useState(p2.data_level);
    const [rotmsLevelData, setRotmsLevelData] = useState(p3.data_level);
    const { selectedTab, backgroundModes } = state;

    p1.refState = state;
    p2.refState = state;
    p3.refState = state;
    p3.setState = setState;
    p3.setRotmsLevelData = setRotmsLevelData;

    const handleTabSelect = (tab) => {
        setState({
            ...state,
            selectedTab: tab,
        });
        //refApp.current.focus();
    }

    useEffect(() => {
        // Добавляем обработчик события keydown
        document.addEventListener('keydown', handleKeyDown);

        // Очистка обработчика при размонтировании компонента
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    /*useEffect(() => {
        //refApp.current.focus();

        console.log('selectedTab changed');
    }, [selectedTab]);*/

    const handleKeyDown = (event) => {
        if (selectedTab !== 0) return;
        let movesBefore = p1.moves;
        if (event.key === 'ArrowUp') {
            state.p1.movetop(72);
        } else if (event.key === 'ArrowDown') {
            state.p1.movetop(80);
        } else if (event.key === 'ArrowLeft') {
            state.p1.movetop(75);
        } else if (event.key === 'ArrowRight') {
            state.p1.movetop(77);
        }
        if (p1.moves === movesBefore) return;

        let tempUndoStates = [...state.undoStates];
        tempUndoStates[0] = true;
        setState({
            ...state,
            undoStates: tempUndoStates
        });

        //setMoves(++moves);
    };

    const changeSokobanLevel = (direction) => {
        p1.change_level(direction);

        let tempUndoStates = [...state.undoStates];
        tempUndoStates[0] = false;
        setState({
            ...state,
            undoStates: tempUndoStates
        });

        setSokobanLevelData(p1.data_level);
    };

    const changeRotmsLevel = (direction) => {
        p3.change_level(direction);

        let tempUndoStates = [...state.undoStates];
        tempUndoStates[0] = false;
        setState({
            ...state,
            undoStates: tempUndoStates
        });

        setRotmsLevelData(p3.data_level);
    };


    /*------------------------------------------------------------------------------
       Rotms part
      ------------------------------------------------------------------------------*/
    const handleClick = (event) => {
        console.log('clicked mouse in Rotms');
        if (selectedTab !== 2) return;
        let element = event.target;
        console.log("element: ", element);
        let parentElement = element.parentElement;
        let elementRect = element.getBoundingClientRect();
        let parentRect = parentElement.getBoundingClientRect();

        let offsetX = elementRect.left - parentRect.left;
        let offsetY = elementRect.top - parentRect.top;
        console.log('Относительные координаты элемента: X:', offsetX, 'Y:', offsetY);

        //let x = (elem.offsetTop - 50 - (elem.offsetTop % 25) ) / 25;
        //let y = (elem.offsetLeft - 5) / 25;
        let x = parseInt(offsetY / 25);
        let y = parseInt(offsetX / 25);
        console.log(x,y);

        p3.pushbutton(x, y);
    }

    /*useEffect(() => {
        console.log('Rotms element mounted');
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            console.log('Rotms element unmounted');
        };
    }, []);*/

    /*------------------------------------------------------------------------------
       End Rotms part
      ------------------------------------------------------------------------------*/

      return (
      <div ref={refApp} className="App">

        <div className="wrapper">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="App-header-p"><a className="App-link" href="https://sok-spo-rot.game" target="_blank" rel="noopener noreferrer"> Sok-Spo-Rot </a></p>
            </header>
            <hr/>

            <Toolbar state={state} setState={setState} setSokobanLevelData={setSokobanLevelData}/>

            <div className="main-window"
                 style={{background: (backgroundModes[selectedTab] !== 1) ? `url("${Backgrounds.backgroundDefault}")` : 'none'}}>

                    <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect} disableUpDownKeys disableLeftRightKeys focusTabOnClick>

                      <TabList>
                        <Tab>Sokoban</Tab>
                        <Tab>Spot</Tab>
                        <Tab>Rotms</Tab>
                      </TabList>

                      <TabPanel>
                        <div id="tabs-1" style={{
                            display: (selectedTab === 0) ? "block" : "none",
                            background: (backgroundModes[0] === 3) ? `url("${Backgrounds.backgroundTab1}")` : "none"
                        }}>
                            <div id="sokoban-board" className="board">
                              <Sokoban level={sokobanLevelData} />
                            </div>
                            <div className="scroll">
                                <button type="button" className="up" onClick={() => changeSokobanLevel(-1)}></button>
                                {/*<div className="tracking"></div>*/}
                                <div className="lev-position"
                                     style={{height: `${state.p1.level/state.p1.maxLevel*304}px`}}
                                ></div>
                                <button type="button" className="down" onClick={() => changeSokobanLevel(1)}></button>
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-2" style={{
                            display: (selectedTab === 1) ? "block" : "none",
                            background: (backgroundModes[1] === 3) ? `url("${Backgrounds.backgroundTab2}")` : "none"
                        }}>
                            <div className="board">
                              <Spot level={spotLevelData} />
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-3" style={{
                            display: (selectedTab === 2) ? "block" : "none",
                            background: (backgroundModes[2] === 3) ? `url("${Backgrounds.backgroundTab3}")` : "none"
                        }}>
                            <div className="board">
                              <Rotms level={rotmsLevelData} handleClick={handleClick} />
                            </div>
                            <div className="scroll">
                                <button type="button"
                                        className="up"
                                        onClick={()=> changeRotmsLevel(-1)}
                                ></button>
                                <div className="lev-position"
                                     style={{height: `${state.p3.level/state.p3.maxLevel*304}px`}}
                                ></div>
                                <button type="button"
                                        className="down"
                                        onClick={()=> changeRotmsLevel(1)}
                                ></button>
                            </div>
                        </div>
                      </TabPanel>

                    </Tabs>

                </div>
            </div>

          <Status state={state} />

          <SpotColorDialog />

          <div className="footer">
              <p> © Viacheslav Sanin - 2023 - <a
                      style={{color: "blue", textDecoration: "none"}}
                      rel="author"
                      type="text/html"
                      target="_blank"
                      href="https://www.linkedin.com/in/slava1974/">
                      www.linkedin.com/in/slava1974
                  </a>
              </p>
          </div>

          </div>

      );
}

export default App;
