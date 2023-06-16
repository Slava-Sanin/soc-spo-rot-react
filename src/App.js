import React, {useState, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './App.css';
import './CSS/spot_toolbar.css';
import './CSS/tabs.css';
import './CSS/scroll.css';
import './CSS/status.css';

//import logo from './assets/images/spot.ico';
import logo from './assets/images/logo64.png';
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
    PlayMySound,
    Change_Player_color,
    Change_Computer_color,
    Sleep,
    GetColor,
    moveVirtualButtons
} from "./code/functions";


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
    p1.setState = setState;
    p1.setSokobanLevelData = setSokobanLevelData;

    p2.refState = state;

    p3.refState = state;
    p3.setState = setState;
    p3.setRotmsLevelData = setRotmsLevelData;

    const handleTabSelect = (tab) => {
        setState({
            ...state,
            selectedTab: tab,
        });
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const handleKeyDown = (event) => {
        event.preventDefault();
        if (selectedTab !== 0) return;
        let movesBefore = p1.moves;

        if (event.key === 'ArrowUp') {
            p1.movetop(72);
        } else if (event.key === 'ArrowDown') {
            p1.movetop(80);
        } else if (event.key === 'ArrowLeft') {
            p1.movetop(75);
        } else if (event.key === 'ArrowRight') {
            p1.movetop(77);
        }

        if (p1.moves === movesBefore) return;
        if (p1.level_is_completed) return;

        setSokobanLevelData([...p1.data_level]);
    };

    const changeSokobanLevel = (direction) => {
        p1.change_level(direction);
        setSokobanLevelData([...p1.data_level]);
    };

    const changeRotmsLevel = (direction) => {
        p3.change_level(direction);
        setRotmsLevelData([...p3.data_level]);
    };


    /*------------------------------------------------------------------------------
       Rotms part
      ------------------------------------------------------------------------------*/
    const handleClick = (event) => {
        console.log('clicked mouse in Rotms');
        if (selectedTab !== 2) return;
        let element = event.target;
        let parentElement = element.parentElement;
        let elementRect = element.getBoundingClientRect();
        let parentRect = parentElement.getBoundingClientRect();

        let offsetX = elementRect.left - parentRect.left;
        let offsetY = elementRect.top - parentRect.top;

        let x = parseInt(offsetY / 25);
        let y = parseInt(offsetX / 25);

        p3.pushbutton(x, y);
    }
    /*------------------------------------------------------------------------------
       End Rotms part
      ------------------------------------------------------------------------------*/

      return (
      <div ref={refApp} className="App" style={{backgroundColor: state.toolbarMode ? 'rgb(234,220,187,0.5)' : 'transparent'}}>

        <div className="wrapper">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="App-header-p"><a className="App-link" href="https://sok-spo-rot.game" target="_blank" rel="noopener noreferrer"> Sok-Spo-Rot </a></p>
            </header>
            <hr/>

            <Toolbar state={state}
                     setState={setState}
                     setSokobanLevelData={setSokobanLevelData}
                     setSpotLevelData={setSpotLevelData}
                     setRotmsLevelData={setRotmsLevelData}
            />

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

          {/*<SpotColorDialog />*/}

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
