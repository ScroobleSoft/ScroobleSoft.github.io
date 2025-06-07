
//---------------------------------------------------
//----------- ROGUE SOLAR SYSTEM --------------------
var RogueSolarSystem = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, Randomizer;
	var Sun;
	var SelectedPlanet, DestinationPlanet;
	var DisplaySpeed;

	var i;
};
RogueSolarSystem.prototype = {
	Set(cntxt, iBox, cPanel, gTool, rGenerator) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.Sun = new RogueSun();
		this.Sun.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool);
		this.DisplaySpeed = 1.0;
	},
	SetPlanets() {
		var i;

		for (i=0;i<SOLArSYSTEM.PLANETS;++i) {
			Planets[i].Orbit.Radius = (1.5*i) + (2*SUN.R);
			Planets[i].Orbit.Speed = this.Randomizer.GetInRange(1,4) / 4;		//in degrees, gives a range of 24-120s
			Planets[i].Orbit.Speed *= (2*SUN.R) / Planets[i].Orbit.Radius;
			Planets[i].Orbit.Direction = i % 2;											//TODO: make this a boolean entry
			Planets[i].Orbit.Angle = this.Randomizer.GetIndex(360);				//starting angle
		}
	},
	SelectPlanet(iPlanet) {

		if (this.SelectedPlanet)
			this.SelectedPlanet.Selected = false;
		this.SelectedPlanet = Planets[iPlanet];
		this.SelectedPlanet.Selected = true;
	},
	SetDestinationPlanet(dstntn) {  //UNLOGGED

		this.DestinationPlanet = dstntn;
	},
	Draw() {

		this.InfoBox.fillStyle = "black";
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
		this.Sun.Draw();
		this.DrawInfoBoxPlanets();
	},
	DrawMain() {  //UNLOGGED

		this.Screen.fillStyle = "black";
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.Sun.DrawMain();
		Planets.forEach(function(plnt){plnt.DrawMain();});
	},
	DrawInfoBoxPlanets() {

		//Draw a line between voyage planets, if chosen
		if ( this.SelectedPlanet && this.DestinationPlanet ) {
			this.GraphicsTool.SetContext(this.InfoBox);
			this.GraphicsTool.DrawLine(this.SelectedPlanet.Location, this.DestinationPlanet.Location, "white", 1);
			this.GraphicsTool.ResetContext();
		}

		for (this.i=0;this.i<SOLArSYSTEM.PLANETS;++this.i)
			if (this.DestinationPlanet) {
				if (this.i==this.DestinationPlanet.Index)
					Planets[this.i].DrawInInfoBox(true);
				else
					Planets[this.i].DrawInInfoBox();
			} else
				Planets[this.i].DrawInInfoBox();
	},
	DrawControlPanel() {

		this.ControlPanel.fillStyle = "black";
		this.ControlPanel.fillRect(8, 95, 140, 140);
		this.Sun.DrawControlPanel();
		this.SelectedPlanet.DrawInControlPanel();
	},
	Update() {

		for (this.i=0;this.i<SOLArSYSTEM.PLANETS;++this.i)
			Planets[this.i].Update(this.DisplaySpeed);
	},
	CheckPlanetClicked() {

		for (this.i=0;this.i<PLANET.COUNT;++this.i)
			if (Utilities.GetDistance(Mouse.GetClickCoordinates(), Planets[this.i].Location)<=3) {
				this.SelectedPlanet = Planets[this.i];
				Planets[this.i].Selected = true;
				return (true);
			}

		return (false);
	},
	ClearPlanetSelection() {

		this.SelectedPlanet.Selected = false;
		this.SelectedPlanet = null;
	}
};
