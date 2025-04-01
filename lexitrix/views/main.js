
//-----------------------------------------------
//---------- GENIE MAIN VIEW --------------------
var GenieMainView = function () {
   var CalcPad;
   var ScreenRect;
};
GenieMainView.prototype = new GenieView();
GenieMainView.prototype.Set = function(cnvs, specs, tWriter) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(null, tWriter);
};
GenieMainView.prototype.SetControls = function() {

	this.Controls.push(CrosslePushButton);
	this.Controls.push(CracklePushButton);
	this.Controls.push(TurtlePushButton);
	this.Controls.push(FiddlePushButton);
	this.Controls.push(SpindlePushButton);
	this.Controls.push(ShufflePushButton);
};
GenieMainView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.TextWriter.Write("Crossle",  51, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Crackle", 232, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Turtle",   42, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Fiddle",  232, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Spindle",  49, 590, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Shuffle", 232, 590, { COLOUR: "blue", FONT: "24px Arial" } );

	this.Canvas.SetFrameRateMeasurement();
};
GenieMainView.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.Canvas.UpdateFrameRateMeasurement();

	if (CracklePushButton.CheckPressed())
		this.Close(this.LaunchCrackle.bind(this), 100);

	if (CrosslePushButton.CheckPressed())
		this.Close(this.LaunchCrossle.bind(this), 100);

	if (TurtlePushButton.CheckPressed())
		this.Close(this.LaunchTurtle.bind(this), 100);

	if (SpindlePushButton.CheckPressed())
		this.Close(this.LaunchSpindle.bind(this), 100);

	if (FiddlePushButton.CheckPressed())
		this.Close(this.LaunchFiddle.bind(this), 100);

	if (ShufflePushButton.CheckPressed())
		alert("Under construction - sorry!");
//		this.Close(this.LaunchShuffle.bind(this), 100);
};
GenieMainView.prototype.LaunchCrackle = function() {

	CrackleView.Open();
};
GenieMainView.prototype.LaunchShuffle = function() {

	ShuffleView.Open();
	ShuffleView.Update();
};
GenieMainView.prototype.LaunchCrossle = function() {

//	CrossleView.CalibrateFrameRate();
	CrossleOptionsView.Open();
	CrossleOptionsView.Update();
};
GenieMainView.prototype.LaunchTurtle = function() {

	TurtleOptionsView.Open();
};
GenieMainView.prototype.LaunchSpindle = function() {

	SpindleOptionsView.Open();
};
GenieMainView.prototype.LaunchFiddle = function() {

	FiddleOptionsView.Open();
};
