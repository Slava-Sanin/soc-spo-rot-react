import React, { Component } from 'react';
// import ReactDOM from 'react-dom/client';
import '../../CSS/spot_toolbar.css';

export default class SpotToolbar extends Component {
    // window.spotToolbarState = spotToolbarState;

    constructor() {
        super();
        let spotToolBar;

        this.state = {spotToolBar};
    }    

    render() {
        return (
			<div className="Spot_toolbar" style={{display: (this.props.selectedTab === 1) ? "block" : "none"}}>

				<div className="ramka left">
					<p>Player</p>
					<div className="Spot_color left"></div>
				</div>

				<button id="Spot_toolbar_button"></button>

				<div className="ramka right">
					<p>Computer</p>
					<div className="Spot_color right"></div>
				</div>

			</div>            
        );
    }

}