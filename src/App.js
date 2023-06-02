import React, { useState, useEffect } from 'react';
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
import Socoban from './Components/Socoban/Socoban';
import Spot from './Components/Spot/Spot';
import Rotms from './Components/Rotms/Rotms';
import ClassSocoban from './code/ClassSocoban';
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
    IDM_Socoban,
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

import main from "./code/main";

const
    p1 = new ClassSocoban(),
    p2 = new ClassSpot(),
    p3 = new ClassRotms();

const App = () => {
    const [state, setState] = useState({
     selectedTab: 0,
     p1,p2,p3
    });

    //this.handleTabSelect = this.handleTabSelect.bind(this);

    const handleTabSelect = (tab) => {
        setState({
            ...state,
            selectedTab: tab
        });
    }

    /*componentDidMount() {
        //main();
        document.addEventListener('keydown', this.handleKeyDown);
        //timer = setInterval(InitStatus, 1000);
    }

    componentWillUnmount() {
        clearInterval(timer);
        document.removeEventListener('keydown', this.handleKeyDown);
    }*/

    const handleKeyDown = (event) => {
        if (state.selectedTab !== 0) return;
        if (event.key === 'ArrowUp') {
            console.log('Нажата стрелка вверх');
            state.p1.movetop(72);
        } else if (event.key === 'ArrowDown') {
            console.log('Нажата стрелка вниз');
            state.p1.movetop(80);
        } else if (event.key === 'ArrowLeft') {
            console.log('Нажата стрелка влево');
            state.p1.movetop(75);
        } else if (event.key === 'ArrowRight') {
            console.log('Нажата стрелка вправо');
            state.p1.movetop(77);
        }
        //this.forceUpdate();
    };

    const { selectedTab } = state;

      return (
      <div className="App">
        <Helmet>
         {/*<script src="./code/constants.js" />*/}
         {/*<script src="./code/dialogs.js" />*/}
         {/* <script src="./code/ClassFire.js" />        */}
         {/* <script src="./code/ClassSocoban.js" /> */}
         {/* <script src="./code/ClassSpot.js" /> */}
         {/* <script src="./code/ClassRotms.js" />       */}
         {/*<script src="./code/globals.js" />          */}
         {/*<script src="./code/functions.js" />       */}
         {/*<script src="./code/main.js" />*/}
         </Helmet>

        <div className="wraper">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="App-header-p"><a className="App-link" href="https://soc-spo-rot.game" target="_blank" rel="noopener noreferrer"> Soc-Spo-Rot </a></p>
            </header>
            <hr/>
            <Toolbar selectedTab={selectedTab}/>

            <div className="main-window">

                    <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>

                      <TabList>
                        <Tab>Socoban</Tab>
                        <Tab>Spot</Tab>
                        <Tab>Rotms</Tab>
                      </TabList>

                      <TabPanel>
                        <div id="tabs-1" style={{display: (selectedTab === 0) ? "block" : "none"}}>
                            <div className="board">
                              <Socoban data_level={p1.data_level} />
                            </div>
                            <div className="scroll">
                                <button type="button" className="up" onClick={()=>{
                                    p1.change_level(-1);
                                    //forceUpdate();
                                }}></button>
                                <div className="tracking"></div>
                                <div className="lev-position"></div>
                                <button type="button" className="down" onClick={()=>{
                                    p1.change_level(1);
                                    //this.forceUpdate();
                                }}></button>
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-2" style={{display: (selectedTab === 1) ? "block" : "none"}}>
                            <div className="board">
                              <Spot data_level={p2.data_level} />
                            </div>
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div id="tabs-3" style={{display: (selectedTab === 2) ? "block" : "none"}}>
                            <div className="board">
                              <Rotms data_level={p3.data_level} />
                            </div>
                            <div className="scroll">
                                <button type="button" className="up" onClick={()=>{
                                    p3.change_level(-1);
                                    //this.forceUpdate();
                                }}></button>
                                <div className="tracking"></div>
                                <div className="lev-position"></div>
                                <button type="button" className="down" onClick={()=>{
                                    p3.change_level(1);
                                    //this.forceUpdate();
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
            <p> © Viacheslav Sanin - 2023 - socsporot@gmail.com </p>
          </div>

          </div>

      );
}

export default App;
