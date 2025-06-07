
//-------------------------------------------------------
//---------- SOLAR JUMP CONSOLE VIEW --------------------
var SolarJumpConsoleView = function() {
	var JumpButton, DockButton, HelpButton, OptionsButton;
};
SolarJumpConsoleView.prototype = new GenieSubView();
SolarJumpConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarJumpConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.JumpButton = this.SetImageButton(this.Specs.BUTTON.JUMP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.DockButton = this.SetImageButton(this.Specs.BUTTON.DOCK, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.HelpButton = this.SetImageButton(this.Specs.BUTTON.HELP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.OptionsButton = this.SetImageButton(this.Specs.BUTTON.OPTIONS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}
};
/*
SolarJumpConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.Update();
};
*/
SolarJumpConsoleView.prototype.Update = function() {  //UNLOGGED

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
};
SolarJumpConsoleView.prototype.Draw = function() {  //UNLOGGED

};
