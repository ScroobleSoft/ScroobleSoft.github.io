
//--------------------------------------------------------------
//---------- FOOTBALL TRAINING CONSOLE VIEW --------------------
var FootballTrainingConsoleView = function() {
	var TrainButton;
};
FootballTacticsConsoleView.prototype = new GenieSubView();
FootballTacticsConsoleView.prototype.Set = function(cnvs, specs) {
	GenieSubView.prototype.Set.call(this, cnvs, specs);

};
FootballTacticsConsoleView.prototype.SetControls = function() {
	//UNLOGGED
	this.TrainButton = new ImageButton();
	this.TrainButton.Set(this.Interface.Console, this.Specs.BUTTON.TRAIN, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.TrainButton.SetCorners(ShallowCornerImages);
	this.Controls.push(this.TrainButton);
};
FootballTacticsConsoleView.prototype.Update = function() {
	//UNLOGGED
};
