
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

	this.Controls.push(CracklePushButton);
	this.Controls.push(ShufflePushButton);
	this.Controls.push(CrosslePushButton);
	this.Controls.push(BundlePushButton);
	this.Controls.push(SpindlePushButton);
	this.Controls.push(SaddlePushButton);
};
GenieMainView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.TextWriter.Write("Crackle",  49, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Shuffle", 232, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Crossle",  51, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Bundle",  239, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Spindle",  49, 590, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Saddle",  232, 590, { COLOUR: "blue", FONT: "24px Arial" } );

	this.Canvas.SetFrameRateMeasurement();
};
GenieMainView.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.Canvas.UpdateFrameRateMeasurement();

	if (CracklePushButton.CheckPressed())
		this.Close(this.LaunchCrackle.bind(this), 100);

	if (ShufflePushButton.CheckPressed())
		this.Close(this.LaunchShuffle.bind(this), 100);

	if (CrosslePushButton.CheckPressed())
		this.Close(this.LaunchCrossle.bind(this), 100);

	if (BundlePushButton.CheckPressed())
		this.Close(this.LaunchBundle.bind(this), 100);

	if (SpindlePushButton.CheckPressed())
		this.Close(this.LaunchSpindle.bind(this), 100);

	if (SaddlePushButton.CheckPressed())
		this.Close(this.LaunchSaddle.bind(this), 100);
};
GenieMainView.prototype.LaunchCrackle = function() {

	CrackleView.Open();
};
GenieMainView.prototype.LaunchShuffle = function() {

	ShuffleView.Open();
	ShuffleView.Update();
};
GenieMainView.prototype.LaunchCrossle = function() {

	CrossleView.CalibrateFrameRate();
	CrossleOptionsView.Open();
	CrossleOptionsView.Update();
};
GenieMainView.prototype.LaunchBundle = function() {

	//UNLOGGED

	alert("Coming soon - please be patient.");
	this.Open();
	this.Update();
	return;

	BundleView.Open();
	BundleView.Update();
};
GenieMainView.prototype.LaunchSpindle = function() {

	SpindleOptionsView.Open();
};
GenieMainView.prototype.LaunchSaddle = function() {

	//UNLOGGED

	alert("Coming soon - please be patient.");
	this.Open();
	this.Update();
	return;

	JiggleView.Open();
	JiggleView.Update();
};
