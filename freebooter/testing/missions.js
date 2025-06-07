
SolarTesting.prototype.SetMissionsTryOut = function() {
	this.MissionLevels = new Array(8);
	for (indx=0;indx<this.MissionLevels.length;++indx)
		this.MissionLevels[indx] = this.Randomizer.GetInRange(0, RainbowColours.length-1);
	this.DisplayMissions();
	this.StationSize = 1;
	Starfield.Generate();
};
SolarTesting.prototype.DisplayMissions = function() {
	this.PanelRect = new GenieRect();
	this.Screen.fillStyle = "grey";
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	for (this.i=0;this.i<8;++this.i) {
		this.GraphicsTool.DrawRectangle(5, 5+(30*this.i), 400, 20, RainbowColours[this.MissionLevels[this.i]], 0);
		this.GraphicsTool.DrawRectangle(5, 5+(30*this.i), 400, 20, "black", 3);
		if (this.i<RainbowColours.length)
			this.GraphicsTool.DrawRectangle(500, 5+(30*this.i), 20, 20, RainbowColours[this.i], 0);
		info = "Mission " + (this.i+1);
		indx = this.Randomizer.GetInRange(0, PLANET.COUNT-1);
		info += ": transport cargo to Station " + PlanetNames[indx];
		indx = this.Randomizer.GetInRange(0, STATION.COUNT.PLANET-1);
		info += " "+ StationNames[indx];
		this.TextWriter.Write(info, 15, 20+(30*this.i));
	}
};
SolarTesting.prototype.PlayMissionsTryOut = function() {

	//UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayMissionsTryOut.bind(this));

	this.ProcessMouse();
};
SolarTesting.prototype.ProcessMouse = function() {
	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		for (indx=0;indx<8;++indx) {
	 this.PanelRect.Set(5, 5+(30*indx), 400, 20);
	 if (SpaceUtils.CheckPointInBox(Mouse.GetClickCoordinates(), this.PanelRect))
		 break;
		}
		if (indx!=8) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.MissionDifficulty = this.MissionLevels[indx] + 1;
	 this.TextWriter.Write("Mission difficulty level "+this.MissionDifficulty+" selected; launching soon . . .", 5, 275);
	 this.Frames = 300;
	 this.MissionLength = (2+(2*this.MissionDifficulty))*3600;  //mission lengths are 4/6/8/10/12/14/16 minutes, and pay 400/500/600/700/800/900/1000 solarons
	 this.SetShips();
	 this.Wait();
		}
	}
};
SolarTesting.prototype.SetShips = function() {
	var nShips;

	nShips = this.Randomizer.GetInRange(6, (12*this.MissionDifficulty)+6);  //averages to 12/18/24/30/36/42/48
	this.ShipLocations = Utilities.CreateArray(nShips, Coordinate3D);
	this.ShipTypes = new Array(nShips);
	for (indx=0;indx<nShips;++indx) {
		this.ShipTypes[indx] = this.Randomizer.GetInRange(0, 10);  //since at the moment there are 11 ship sprites
		this.ShipLocations[indx].Z = Math.round(this.MissionLength*Math.random());
		do {
	 this.ShipLocations[indx].X = (SCREEN.WIDTH/2) - this.Randomizer.GetInRange(0, SCREEN.WIDTH-1);
	 this.ShipLocations[indx].Y = (SCREEN.HEIGHT/2) - this.Randomizer.GetInRange(0, SCREEN.HEIGHT-1);
		} while (this.ShipLocations[indx].X>-10 && this.ShipLocations[indx].X<10 && this.ShipLocations[indx].Y>-10 && this.ShipLocations[indx].Y<10);
	}
};
SolarTesting.prototype.Wait = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Wait.bind(this));

	--this.Frames;
	if (!this.Frames) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.LeaveHabStat();
	}
};
SolarTesting.prototype.LeaveHabStat = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.LeaveHabStat.bind(this));

	Starfield.Draw();
	StarStile.Draw();
	Cockpit.Draw();
	StarStile.Update();

	++this.Frames;

	//Stop when hexagon size==SCREEN.WIDTH
	if (this.Frames==300) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.PerformMission();
	}
};
SolarTesting.prototype.PerformMission = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PerformMission.bind(this));

	Starfield.Draw();
	Cockpit.Draw();
	this.DrawShips();

	Starfield.Update();

	--this.MissionLength;
	if (!this.MissionLength) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Frames = 180;
		this.Dock();
	}
};
SolarTesting.prototype.DrawShips = function() {
	for (indx=0;indx<this.ShipTypes.length;++indx)
		if (this.ShipLocations[indx].Z>this.MissionLength && this.ShipLocations[indx].Z<this.MissionLength+120) {
	 coords.X = this.ShipLocations[indx].X + (SCREEN.WIDTH/2);
	 coords.Y = this.ShipLocations[indx].Y + (SCREEN.HEIGHT/2);
	 this.GraphicsTool.DrawCircle(coords.X, coords.Y, (this.ShipLocations[indx].Z-this.MissionLength)/2, RainbowColours[this.ShipTypes[indx]], 0);
		}
};
SolarTesting.prototype.Dock = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Dock.bind(this));

	this.ShowStation();

	--this.Frames;
	if (!this.Frames)
		cancelAnimationFrame(this.AnimationFrameHandle);
};
SolarTesting.prototype.ShowStation = function() {

	//UNLOGGED

	this.GraphicsTool.DrawEllipse(300, 300, 4*this.StationSize, this.StationSize, "grey", 0)
	this.StationSize += 0.25;
};
/*
	},
	Journey() {

		//LOGGED - TEMP

		this.AnimationFrameHandle = requestAnimationFrame(this.Journey.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 this.EnterStarStile = true;
	 SelectedPlanet = Planets[this.Randomizer.GetInRange(0, PLANET.COUNT-1)];
	 SelectedPlanet.Selected = true;
	 SelectedPlanet.DrawInBuffer();
	 this.Frames = 0;
	 document.getElementById("TextInfo").innerHTML = "Click Screen to enter StarStile";
		}

		if (this.EnterStarStile) {
	 StarStile.DrawReverseEntry();
	 StarStile.UpdateReverseEntry();
	 ++this.Frames;
		}

		if (this.Reset || this.Frames==200) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Reset = false;
		}
	}
*/
