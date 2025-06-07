// * show planet at which docked in Info Box
// * instantaneous teleporting between stations

//--------------------------------------------------------
//---------- SOLAR TRADE CONSOLE VIEW --------------------
var SolarTradeConsoleView = function() {
	var ShipImage, StationImage;
	var LaunchButton;
	var Route;
};
SolarTradeConsoleView.prototype = new GenieSubView();
SolarTradeConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Route = new SolarRoute();
	this.Route.Set(this.GraphicsTool);
};
SolarTradeConsoleView.prototype.SetImages = function() {

	this.ShipImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SHIP);
	this.StationImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.STATION);
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
		VoyageView.SetDestination(Planets[this.MainView.VoyagePlanets[(2*this.MainView.VoyageSelected)+1]]);
		this.MainView.CloseAll();
	}
};
SolarTradeConsoleView.prototype.Draw = function() {  //UNLOGGED

	this.Route.Display();

	//TEMP only - locations change dynamically
	this.ShipImage.Draw(8, 188);
	this.StationImage.Draw(119, 7)
};
