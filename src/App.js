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
    background0,
    background,
    path0,
    path1,
    path2,
    path3,
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

//import main from "./code/main";

const
    p1 = new ClassSokoban(),
    p2 = new ClassSpot(),
    p3 = new ClassRotms();

const App = () => {
    const refApp = useRef(null);
    const [state, setState] = useState({
     selectedTab: 0,
     p1,p2,p3
    });
    const [sokobanLevel, setSokobanLevel] = useState(p1.data_level);
    const [spotLevel, setSpotLevel] = useState(p2.data_level);
    const [rotmsLevel, setRotmsLevel] = useState(p3.data_level);
    const [moves, setMoves] = useState(0);
    const { selectedTab } = state;

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
        if (state.selectedTab !== 0) return;
        if (event.key === 'ArrowUp') {
            state.p1.movetop(72);
        } else if (event.key === 'ArrowDown') {
            state.p1.movetop(80);
        } else if (event.key === 'ArrowLeft') {
            state.p1.movetop(75);
        } else if (event.key === 'ArrowRight') {
            state.p1.movetop(77);
        }
        
        //setMoves(++moves);
    };

      return (
      <div ref={refApp} className="App">
        <Helmet>
         {/*<script src="./code/constants.js" />*/}
         {/*<script src="./code/dialogs.js" />*/}
         {/* <script src="./code/ClassFire.js" />        */}
         {/* <script src="./code/ClassSokoban.js" /> */}
         {/* <script src="./code/ClassSpot.js" /> */}
         {/* <script src="./code/ClassRotms.js" />       */}
         {/*<script src="./code/globals.js" />          */}
         {/*<script src="./code/functions.js" />       */}
         {/*<script src="./code/main.js" />*/}
         </Helmet>

        <div className="wrapper">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="App-header-p"><a className="App-link" href="https://sok-spo-rot.game" target="_blank" rel="noopener noreferrer"> Sok-Spo-Rot </a></p>
            </header>
            <hr/>
            <Toolbar state={state}/>

            <div className="main-window">

                    <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect} disableUpDownKeys disableLeftRightKeys focusTabOnClick>

                      <TabList>
                        <Tab>Sokoban</Tab>
                        <Tab>Spot</Tab>
                        <Tab>Rotms</Tab>
                      </TabList>

                      <TabPanel>
                        <div id="tabs-1" style={{display: (selectedTab === 0) ? "block" : "none"}}>
                            <div id="sokoban-board" className="board">
                              <Sokoban level={sokobanLevel} />
                            </div>
                            <div className="scroll">
                                <button type="button" className="up" onClick={()=>{
                                    p1.change_level(-1);
                                    setSokobanLevel(p1.data_level);
                                }}></button>
                                <div className="tracking"></div>
                                <div className="lev-position"></div>
                                <button type="button" className="down" onClick={()=>{
                                    p1.change_level(1);
                                    setSokobanLevel(p1.data_level);
                                }}></button>
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-2" style={{display: (selectedTab === 1) ? "block" : "none"}}>
                            <div className="board">
                              <Spot level={spotLevel} />
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-3" style={{display: (selectedTab === 2) ? "block" : "none"}}>
                            <div className="board">
                              <Rotms level={rotmsLevel} />
                            </div>
                            <div className="scroll">
                                <button type="button" className="up" onClick={()=>{
                                    p3.change_level(-1);
                                    setRotmsLevel(p3.data_level);
                                }}></button>
                                <div className="tracking"></div>
                                <div className="lev-position"></div>
                                <button type="button" className="down" onClick={()=>{
                                    p3.change_level(1);
                                    setRotmsLevel(p3.data_level);
                                }}></button>
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
