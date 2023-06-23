import React, {useEffect, useState} from 'react';
import '../../CSS/spot_toolbar.css';
import SpotColorDialog from "./SpotColorDialog";

const SpotToolbar = ({state, setState, handleSpotDialogTrigger}) => {

        return (
			<div className="Spot_toolbar" style={{display: (state.selectedTab === 1) ? "block" : "none"}}>

				<div className="ramka left">
					<p>Player</p>
					<div className="Spot_color left"></div>
				</div>

				<button id="Spot_toolbar_button"
						onClick={handleSpotDialogTrigger}
				></button>

				<div className="ramka right">
					<p>Computer</p>
					<div className="Spot_color right"></div>
				</div>

			</div>            
        );
}

export default SpotToolbar;