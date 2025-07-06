// * show planet at which docked in Info Box
// * instantaneous teleporting between stations

//--------------------------------------------------------
//---------- SOLAR TRADE CONSOLE VIEW --------------------
var SolarTradeConsoleView = function() {
	var LaunchButton;
	var Route;
};
SolarTradeConsoleView.prototype = new GenieSubView();
SolarTradeConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Route = new SolarRoute();
	this.Route.Set(this.GraphicsTool);
};
SolarTradeConsoleView.prototype.SetControls = function() {

//	if (Game.CheckMobile()) {  TODO: TEMP
		this.LaunchButton = this.SetImageButton(this.Specs.BUTTON.LAUNCH, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
//	}
};
/*
SolarTradeConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.Update();
};
*/
SolarTradeConsoleView.prototype.Update = function() {

	if (this.LaunchButton.CheckClicked()) {
		VoyageView.SetDestination(Planets[this.MainView.VoyagePlanets[this.MainView.VoyageSelected]]);
		Journey.SetLocations(this.MainView.Planet, Planets[this.MainView.VoyagePlanets[this.MainView.VoyageSelected]]);
		this.MainView.CloseAll();
	}
};
SolarTradeConsoleView.prototype.Draw = function() {  //UNLOGGED

	this.Route.Display();

	//TEMP only - locations change dynamically . . . actually, will draw a red metre to show how close
	ShipImage.Draw(8, 188);
	StationImage.Draw(119, 7)
};
