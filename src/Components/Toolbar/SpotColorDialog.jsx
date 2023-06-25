import React, {useEffect, useState} from 'react';
import '../../CSS/spot_toolbar.css';
import men from '../../assets/images/men.png';
import computer from '../../assets/images/computer.jpg';
import {PlayerDlg, ComputerDlg} from "../../code/globals";

const SpotColorDialog = ({handleSpotDialogTrigger}) => {
	const [config, setConfig] = useState(false);

	useEffect(() => {
			console.log("Redrawing Spot's options")
			console.log("PlayerDlg:",PlayerDlg)
			console.log("ComputerDlg:",ComputerDlg)
		});

	const handleFirstOrSecond = () => {
		let temp = PlayerDlg.is;
		PlayerDlg.is = ComputerDlg.is;
		ComputerDlg.is = temp;
		setConfig(!config);
	}

	const handleChangePlayerColor = (params) =>	{
		PlayerDlg.color = parseInt(document.forms["Player"].color.value);
		if (PlayerDlg.color === ComputerDlg.color)
		{
			ComputerDlg.color++;
			if (ComputerDlg.color > 6) ComputerDlg.color = 2;
		}
		setConfig(!config);
	}

	const handleChangeComputerColor = () => {
		ComputerDlg.color = parseInt(document.forms["Computer"].color.value);
		if (ComputerDlg.color === PlayerDlg.color)
		{
			PlayerDlg.color++;
			if (PlayerDlg.color > 6) PlayerDlg.color = 2;
		}
		setConfig(!config);
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
										<form name="Player" onChange={handleChangePlayerColor}>
											{
												[2,3,4,5,6].map((number, index) => (
													<React.Fragment key={'pl' + index}>
														<input type="radio"
														   name="color"
														   value={number}
														   checked={number === PlayerDlg.color}
														/>
														<br/>
													</React.Fragment>
												))
											}
										</form>
									</div>
									<div className="div11">

									{/*	images of spots	*/}

									</div>
									<div className="div12">
										<form name="Computer" onChange={handleChangeComputerColor}>
											{
												[2,3,4,5,6].map((number, index) => (
													<React.Fragment key={'pc' + index}>
														<input type="radio"
															   name="color"
															   value={number}
															   checked={number === ComputerDlg.color}
														/>
														<br/>
													</React.Fragment>
												))
											}
										</form>
									</div>
								</div>
								<div id="Player_is" className="div14">{(PlayerDlg.is === 1) ? 'First' : 'Second'}</div>
								<div className="div13">
									<div className="div8"></div>
									<div className="div7"></div>
									<button id="first-or-second" type="button"
											onClick={handleFirstOrSecond}
									>&lt;&gt;</button>
								</div>
								<div id="Computer_is" className="div14">{(ComputerDlg.is === 1) ? 'First' : 'Second'}</div>
							</div>
						</div>

						</div>
					</div>

			</div>
		</div>
	);
}

export default SpotColorDialog;
    