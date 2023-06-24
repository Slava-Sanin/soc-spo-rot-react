import React, {useEffect, useState} from 'react';
import '../../CSS/spot_toolbar.css';
import men from '../../assets/images/men.png';
import computer from '../../assets/images/computer.jpg';
import {ComputerDlg, PlayerDlg} from "../../code/globals";

const SpotColorDialog = ({handleSpotDialogTrigger}) => {
	const [playerIs, setPlayerIs] = useState(PlayerDlg.is);
	const [computerIs, setComputerIs] = useState(ComputerDlg.is);

	/*useEffect(() => {},
		[]
		);*/

	const handleFirstOrSecond = () => {
		let temp = PlayerDlg.is;
		PlayerDlg.is = ComputerDlg.is;
		ComputerDlg.is = temp;
		setPlayerIs(PlayerDlg.is);
		setComputerIs(ComputerDlg.is);
	}

	return (
		<div id="Spot_color_dialog">
			<div className="wraper2">
				<div className="header">
					<p>Spot's options</p>
					<button style={{float: "right"}} onClick={handleSpotDialogTrigger}>X</button>
				</div>
					<div className="div2">
						<div className="div3">

						<div className="div15">
							<div className="div4">
								<div className="div5">
									<div className="div6">
										<img src={men} alt="man" height="60" width="60" />
									</div>

									<div className="div9">
										<div className="div7"></div>
										<div className="div8"></div>
									</div>

									<div className="div6" style={{float: "right"}}>
										<img src={computer} alt="computer" height="60" width="60" />
									</div>
								</div>

								<div className="wraper3">
									<div className="div10">
										<form name="Player" onChange="Change_Player_color();">
											<input type="radio" name="color" value="2" checked /><br/>
											<input type="radio" name="color" value="3" /><br/>
											<input type="radio" name="color" value="4" /><br/>
											<input type="radio" name="color" value="5" /><br/>
											<input type="radio" name="color" value="6" />
										</form>
									</div>
									<div className="div11">
					{/*  				images of spots					*/}
									</div>
									<div className="div12">
										<form name="Computer" onChange="Change_Computer_color();">
											<input type="radio" name="color" value="2" /><br/>
											<input type="radio" name="color" value="3" checked /><br/>
											<input type="radio" name="color" value="4" /><br/>
											<input type="radio" name="color" value="5" /><br/>
											<input type="radio" name="color" value="6" />
										</form>
									</div>
								</div>
								<div id="Player_is" className="div14">{(playerIs === 1) ? 'First' : 'Second'}</div>
								<div className="div13">
									<div className="div8"></div>
									<div className="div7"></div>
									<button id="first-or-second" type="button"
											onClick={handleFirstOrSecond}
									>&lt;&gt;</button>
								</div>
								<div id="Computer_is" className="div14">{(computerIs === 1) ? 'First' : 'Second'}</div>
							</div>
						</div>

						</div>
					</div>

			</div>
		</div>
	);
}

export default SpotColorDialog;
    