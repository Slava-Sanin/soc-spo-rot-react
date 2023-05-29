import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Helmet } from "react-helmet";

import './App.css';
import './CSS/spot_toolbar.css';
import './CSS/tabs.css';
import './CSS/scroll.css';
import './CSS/status.css';

import logo from './G4W/images/spot.ico';
import Toolbar from './Components/Toolbar/Toolbar';
import SpotColorDialog from './Components/Toolbar/SpotColorDialog';
import Socoban from './Components/Socoban/Socoban';
import Spot from './Components/Spot/Spot';
import Rotms from './Components/Rotms/Rotms';
import ClassSocoban from './code/ClassSocoban';
import ClassSpot from './code/ClassSpot';
import ClassRotms from './code/ClassRotms';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      p1: new ClassSocoban(),
      p2: new ClassSpot(),
      p3: new ClassRotms()
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect = (tab) => {
    this.setState({
      selectedTab: tab
    });
  }

	//  componentDidMount() {
        
	//   }

	render() {
    //let activeGame = this.state.activeTab;
    const { selectedTab } = this.state;

  return (
  <div className="App">
    <Helmet>     
     <script src="./code/constants.js" />
     <script src="./code/dialogs.js" />
     {/* <script src="./code/ClassFire.js" />        */}
     {/* <script src="./code/ClassSocoban.js" /> */}
     {/* <script src="./code/ClassSpot.js" /> */}
     {/* <script src="./code/ClassRotms.js" />       */}
     <script src="./code/globals.js" />          
     <script src="./code/functions.js" />       
     {/* <script src="./code/main.js" />        */}
     </Helmet>
    <div className="wraper">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        <p className="App-header-p"><a className="App-link" href="https://soc-spo-rot.game" target="_blank" rel="noopener noreferrer"> Soc-Spo-Rot </a></p>
        </header>
        <hr/>
        <Toolbar />      
		
        <div className="main-window">
        
        <Tabs selectedIndex={selectedTab} onSelect={this.handleTabSelect}>
          
          <TabList>
            <Tab>Socoban</Tab>
            <Tab>Spot</Tab>
            <Tab>Rotms</Tab>
          </TabList>

          <TabPanel>            
            <div id="tabs-1" style={{display: (selectedTab === 0) ? "block" : "none"}}>
                <div className="board">
                  <Socoban />            
                </div>
                <div className="scroll">
                    <button type="button" className="up"></button>
                    <div className="tracking"></div>
                    <div className="lev-position"></div>
                    <button type="button" className="down"></button>
                </div>
            </div>
            </TabPanel>

            <TabPanel>      
            <div id="tabs-2" style={{display: (selectedTab === 1) ? "block" : "none"}}>
                <div className="board">
                  <Spot />  
                </div>
            </div>
            </TabPanel>

            <TabPanel>
            <div id="tabs-3" style={{display: (selectedTab === 2) ? "block" : "none"}}>
                <div className="board">
                  <Rotms />
                </div>
                <div className="scroll">
                    <button type="button" className="up"></button>
                    <div className="tracking"></div>
                    <div className="lev-position"></div>
                    <button type="button" className="down"></button>
                </div>
            </div>            
          </TabPanel>

        </Tabs>            
            
	        </div>
        </div>
          
	    <div className="status"><span style={{paddingLeft: '4px'}} /> Try to play!!! </div>
	  
      <SpotColorDialog />

      <div className="footer">
        <p> © Viacheslav Sanin - 2017 - socsporot@gmail.com </p>
      </div>
	
 	  </div>
    
  );
 }
}

export default App;
