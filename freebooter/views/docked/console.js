
//---------------------------------------------------------
//---------- SOLAR DOCKED CONSOLE VIEW --------------------
var SolarDockedConsoleView = function() {
};
SolarDockedConsoleView.prototype = new GenieSubView();
SolarDockedConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarDockedConsoleView.prototype.SetControls = function() {  //UNLOGGED

};
/*
SolarDockedConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

};
*/
SolarDockedConsoleView.prototype.Update = function() {  //UNLOGGED

	SolarSystem.SelectedPlanet.Update();
	SolarSystem.DrawControlPanel();
};
SolarDockedConsoleView.prototype.Draw = function() {

	this.DisplayPilotInfo();
	SolarSystem.DrawControlPanel();
};
SolarDockedConsoleView.prototype.DisplayPilotInfo = function() {

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Pilot:", 5, 15, { COLOUR: "white" } );
	this.TextWriter.Write(PlayerPilot.Name.First, 70, 15, { COLOUR: "white" } );
	this.TextWriter.Write(PlayerPilot.Name.Last, 70, 30, { COLOUR: "white" } );
	this.TextWriter.Write("Planet:", 5, 50, { COLOUR: "white" } );
	this.TextWriter.Write(PlanetNames[PlayerPilot.Planet.Index], 70, 50, { COLOUR: "white" } );
	this.TextWriter.Write("Station:", 5, 70, { COLOUR: "white" } );
	this.TextWriter.Write(StationNames[PlayerPilot.Station.Index], 70, 70, { COLOUR: "white" } );
	this.TextWriter.Write("Solarons:", 5, 90, { COLOUR: "white" } );
	this.TextWriter.Write(PlayerPilot.Solarons, 70, 90, { COLOUR: "white" } );
	this.TextWriter.ResetContext();
};
