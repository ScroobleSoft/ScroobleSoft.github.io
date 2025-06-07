
//--------------------------------------------------------
//---------- SOLAR INTRO CONSOLE VIEW --------------------
var SolarIntroConsoleView = function() {
	var DailyButton, RandomButton;
};
SolarIntroConsoleView.prototype = new GenieSubView();
SolarIntroConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarIntroConsoleView.prototype.SetControls = function() {

//	if (Game.CheckMobile()) {  TODO: uncomment in
		this.DailyButton = this.SetImageButton(this.Specs.BUTTON.DAILY, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
		this.RandomButton = this.SetImageButton(this.Specs.BUTTON.RANDOM, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
//	}
};
/*
SolarIntroConsoleView.prototype.Open = function() {
	GenieSubView.prototype.Open.call();

	this.Update();
};
*/
SolarIntroConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.DailyButton.CheckClicked()) {
		this.SetGame();
		this.MainView.CloseAll();
	}
	if (this.RandomButton.CheckClicked()) {
		this.SetGame();
		this.MainView.CloseAll();
	}
};
SolarIntroConsoleView.prototype.Draw = function() {

	this.TextWriter.SetContext(this.Context);

	this.TextWriter.Write("Welcome to the illogical", 5, 15, { COLOUR: "white" } );
	this.TextWriter.Write("solar system, where", 5, 30, { COLOUR: "white" } );
	this.TextWriter.Write("planets orbit in different", 5, 45, { COLOUR: "white" } );
	this.TextWriter.Write("directions at insane", 5, 60, { COLOUR: "white" } );
	this.TextWriter.Write("speeds, and the space", 5, 75, { COLOUR: "white" } );
	this.TextWriter.Write("in-between is littered", 5, 90, { COLOUR: "white" } );
	this.TextWriter.Write("with mini-planets.", 5, 105, { COLOUR: "white" } );

	this.TextWriter.Write("Solar system not to", 5, 130, { COLOUR: "white" } );
	this.TextWriter.Write("scale (obviously).", 5, 145, { COLOUR: "white" } );

	this.TextWriter.Write("Pick a game type:", 5, 175, { COLOUR: "white" } );

	this.TextWriter.ResetContext();
};
SolarIntroConsoleView.prototype.SetGame = function() {
	var i;
	var iPlnt, iSttn;
	var aPlts, aPlnts;

	//Pilot Names
	aPlts = new Array(PILOT.COUNT);
	this.Randomizer.GetUniqueIndices(aPlts, PILOT.COUNT, MaleNames.length+FemaleNames.length);
	aPlnts = new Array(PILOT.COUNT);
	this.Randomizer.GetUniqueIndices(aPlnts, PILOT.COUNT, LastNames.length);
	for (i=0;i<PILOT.COUNT;++i) {
		if (aPlts[i]<MaleNames.length)
			Pilots[i].Name.First = MaleNames[aPlts[i]];
		else
			Pilots[i].Name.First = FemaleNames[aPlts[i]-MaleNames.length];
		Pilots[i].Name.Last = "De " + LastNames[aPlnts[i]];
	}

	//Location (for player pilot only, to begin . . . TODO!)
	iPlnt = this.Randomizer.GetIndex(SOLArSYSTEM.PLANETS);
	SolarSystem.SelectPlanet(iPlnt);
	PlayerPilot.Planet = Planets[iPlnt];
	iSttn = this.Randomizer.GetIndex(STATION.COUNT.PLANET);
	PlayerPilot.Station = Planets[iPlnt].Stations[iSttn];

	//Views
	DockedView.SetPlanetStation(PlayerPilot.Planet, PlayerPilot.Station);
};
