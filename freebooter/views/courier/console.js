
//----------------------------------------------------------
//---------- SOLAR COURIER CONSOLE VIEW --------------------  UNLOGGED
var SolarCourierConsoleView = function() {
	var HelpButton, OptionsButton, DockButton;
};
SolarCourierConsoleView.prototype = new GenieSubView();
SolarCourierConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarCourierConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
//		this.JumpButton = this.SetImageButton(this.Specs.BUTTON.JUMP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
//		this.DockButton = this.SetImageButton(this.Specs.BUTTON.DOCK, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
//		this.HelpButton = this.SetImageButton(this.Specs.BUTTON.HELP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
//		this.OptionsButton = this.SetImageButton(this.Specs.BUTTON.OPTIONS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}
};
/*
SolarCourierConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.Update();
};
*/
SolarCourierConsoleView.prototype.Update = function() {
/*
	if (this.JumpButton.CheckClicked()) {
//		VoyageView.SetDestination(Planets[this.MainView.VoyagePlanets[(2*this.MainView.VoyageSelected)+1]]);
//		this.MainView.CloseAll();
	}
	if (this.DockButton.CheckClicked()) {
	}
	if (this.OptionsButton.CheckClicked()) {
	}
	if (this.HelpButton.CheckClicked()) {
	}
*/
};
SolarCourierConsoleView.prototype.Draw = function() {  //UNLOGGED

};
