	//-clicking 'uncloak' brings up pirates on radar (in Info Box)
	//-the closer one gets to a station, the fewer the pirates to be found
	//-action switches to 'asteroid' screen

SolarMiniGames.prototype.SetPirates = function() {

	this.ControlPanel.clearRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);
	this.KraitAngle = 0;

	this.Pirates = new AgentArray();
	this.Pirates.Set(20, PirateShip, null, { ALIGN: ALIGNMENT.CENTRE }, FusciaDiabloSprite);
	this.Pirates.SetLinks(this.GraphicsTool, this.CalcPad, this.Randomizer);

	this.DrawStationSpace();
	this.DrawStarfield();
	this.DrawFramework();

	this.TextWriter.Write("Click Info Box to pick landing spot", 5, 20, null, CANVAS.CONSOLE);
};
SolarMiniGames.prototype.PlayPirates = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayPirates.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		if (this.CheckSpotPicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.ControlPanel.clearRect(0, 0, CONTROlPANEL.WIDTH, 40);
	 this.SetShips();
	 this.FightPirates();
		}
};
SolarMiniGames.prototype.CheckSpotPicked = function() {

	//Check if spot is inside rings
	if (SpaceUtils.CheckPointInCircle(Mouse.GetClickCoordinates(), { X: INFoBOX.WIDTH/2, Y: INFoBOX.HEIGHT/2 }, INFoBOX.WIDTH/2))
		if (!SpaceUtils.CheckPointInCircle(Mouse.GetClickCoordinates(), { X: INFoBOX.WIDTH/2, Y: INFoBOX.HEIGHT/2 }, 50))  //check if too close to the station
	 return (true);
};
SolarMiniGames.prototype.FightPirates = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.FightPirates.bind(this));

	this.DrawStarfield();
	this.DrawFramework();
	BlueKraitSprite.DrawRotated(300, 300, this.KraitAngle);
	this.DrawRadar();
	this.Pirates.Draw();

	this.UpdateController();
};
SolarMiniGames.prototype.DrawStarfield = function() {

	//UNLOGGED

	this.Screen.fillStyle = "black";
	this.Screen.fillRect(100, 100, SCREEN.WIDTH-200, SCREEN.HEIGHT-200);
};
SolarMiniGames.prototype.DrawFramework = function() {

	//Black out pirate slots
	this.Screen.fillStyle = "black";
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, 100);				//top band
	this.Screen.fillRect(0, SCREEN.HEIGHT-100, SCREEN.WIDTH, 100);		//bottom band
	this.Screen.fillRect(0, 100, 100, SCREEN.HEIGHT-200);			//left band
	this.Screen.fillRect(SCREEN.WIDTH-100, 100, 100, SCREEN.HEIGHT-200);		//right band

	//Outer and inner frames
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, "white", 1);
	this.GraphicsTool.DrawRectangle(100, 100, 400, 400, "white", 1);

	//Vertical separators
	for (coords.X=100;coords.X<500;coords.X+=100) {
		coords.Y = 0;
		this.GraphicsTool.DrawVerticalLine(coords, 100, "white", 1);
		coords.Y = 500;
		this.GraphicsTool.DrawVerticalLine(coords, 100, "white", 1);
	}
	--coords.X;
	coords.Y = 0;
	this.GraphicsTool.DrawVerticalLine(coords, 100, "white", 1);		//penultimate 'box' has to be narrower to align
	coords.Y = 500;
	this.GraphicsTool.DrawVerticalLine(coords, 100, "white", 1);

	//Horizontal separators
	for (coords.Y=100;coords.Y<500;coords.Y+=100) {
		coords.X = 0;
		this.GraphicsTool.DrawHorizontalLine(coords, 100, "white", 1);
		coords.X = 500;
		this.GraphicsTool.DrawHorizontalLine(coords, 100, "white", 1);
	}
	--coords.Y;
	coords.X = 0;
	this.GraphicsTool.DrawHorizontalLine(coords, 100, "white", 1);		//penultimate 'box' has to be narrower to align
	coords.X = 500;
	this.GraphicsTool.DrawHorizontalLine(coords, 100, "white", 1);
};
SolarMiniGames.prototype.UpdateController = function() {
	if (Controller.Right)
		++this.KraitAngle;
	if (Controller.Left)
		--this.KraitAngle;
};
SolarMiniGames.prototype.DrawStationSpace = function() {
	this.InfoBox.fillStyle = "black";
	this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.GraphicsTool.SwitchContextByID(CANVAS.ZOOM);
	this.GraphicsTool.DrawCircle(INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, 10, GREY.SILVER, 5);
	for (indx=50;indx<INFoBOX.WIDTH/2;indx+=10)
		this.GraphicsTool.DrawCircle(INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, indx, "white", 1, 0.5);
	this.GraphicsTool.RestoreContext();
};
SolarMiniGames.prototype.SetShips = function() {
	var dstnc;
	var nPirates;
	var aLocs;
	var scale;		//used to determine how far away a ship is at start

	//Generate ships
	dstnc = SpaceUtils.GetDistance(Mouse.GetClickCoordinates(), { X: INFoBOX.WIDTH/2, Y: INFoBOX.HEIGHT/2 } );
	num = 2*Math.floor(dstnc/10);
	nPirates = this.Randomizer.GetInRange(8,num);
	for (indx=0;indx<nPirates;++indx) {
		this.Pirates[indx].SetExtant();
		this.Pirates[indx].SetVisible();
		this.Pirates[indx].Generate();
	}

	//Set ship locations
	aLocs = new Array(nPirates);
	this.Randomizer.GetUniqueIndices(aLocs, nPirates, 20);
	for (indx=0;indx<nPirates;++indx) {
		this.Pirates[indx].SetPosition(aLocs[indx]);
		scale = this.Randomizer.GetInRange(4, 8);
		this.Pirates[indx].Location.Set(scale*(this.Pirates[indx].Position.X-300), scale*(this.Pirates[indx].Position.Y-300));
	}
};
SolarMiniGames.prototype.DrawRadar = function() {

	this.InfoBox.fillStyle = "black";
	this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.GraphicsTool.DrawCircle(INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, 3, PAINT.SEA, 0);			//blue krait

	//Draw pirate ship blips
	this.GraphicsTool.SwitchContext(this.InfoBox);
	for (indx=0;indx<20;++indx)
		if (this.Pirates[indx].CheckExtant()) {
	 coords.X = (this.Pirates[indx].Location.X/20) + (INFoBOX.WIDTH/2);
	 coords.Y = (this.Pirates[indx].Location.Y/20) + (INFoBOX.HEIGHT/2);
	 this.GraphicsTool.DrawCircle(coords.X, coords.Y, 3, this.Pirates[indx].Colours[1], 0);
		}
	this.GraphicsTool.RestoreContext();
};
