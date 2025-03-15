
//-------------------------------------------------------------
//---------- FOOTBALL TACTICS CONSOLE VIEW --------------------
var FootballTacticsConsoleView = function() {
	var KickOffButton;
};
FootballTacticsConsoleView.prototype = new GenieSubView();
FootballTacticsConsoleView.prototype.Set = function(cnvs, specs) {
	GenieSubView.prototype.Set.call(this, cnvs, specs);

};
FootballTacticsConsoleView.prototype.SetControls = function() {
	//UNLOGGED
	this.KickOffButton = new ImageButton();
	this.KickOffButton.Set(this.Interface.Console, this.Specs.BUTTON.KICkOFF, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.KickOffButton.SetCorners(ShallowCornerImages);
	this.Controls.push(this.KickOffButton);
};
FootballTacticsConsoleView.prototype.Update = function() {
	//UNLOGGED
	//-kick off button click is monitored, but is enabled only once selections are complete
};
