import React from 'react';
import '../../CSS/spot_toolbar.css';

const SpotColorDialog = () => {
	return (
		<div id="Spot_color_dialog">
			<div className="wraper2">
				<div className="header">
					<p>Spot's options</p><button style={{float: "right"}}>X</button>
				</div>
					<div className="div2">
						<div className="div3">

						<div className="div15">
							<div className="div4">
								<div className="div5">
									<div className="div6">
										<img src="../assets/images/men.png" alt="man" height="60" width="60" />
									</div>

									<div className="div9">
										<div className="div7"></div>
										<div className="div8"></div>
									</div>

									<div className="div6" style={{float: "right"}}>
										<img src="../assets/images/computer.jpg" alt="computer" height="60" width="60" />
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
								<div id="Player_is" className="div14">First</div>
								<div className="div13">
									<div className="div8"></div>
									<div className="div7"></div>
									<button id="first-or-second" type="button">&lt;&gt;</button>
								</div>
								<div id="Computer_is" className="div14">Second</div>
							</div>
						</div>

						</div>
					</div>

			</div>
		</div>
	);
}

export default SpotColorDialog;
    