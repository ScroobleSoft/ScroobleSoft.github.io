
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
	this.Controls.push(SpindlePushButton);
	this.Controls.push(JigglePushButton);
	this.Controls.push(CrosslePushButton);
	this.Controls.push(BundlePushButton);
};
GenieMainView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.TextWriter.Write("Crackle",  49, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Shuffle", 232, 190, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Crossle",  51, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Jiggle",  239, 390, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Spindle",  49, 590, { COLOUR: "blue", FONT: "24px Arial" } );
	this.TextWriter.Write("Bundle",  232, 590, { COLOUR: "blue", FONT: "24px Arial" } );
};
GenieMainView.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (CracklePushButton.CheckPressed())
		this.Close(this.LaunchCrackle.bind(this), 100);

	if (ShufflePushButton.CheckPressed())
		this.Close(this.LaunchShuffle.bind(this), 100);

	if (SpindlePushButton.CheckPressed())
		this.Close(this.LaunchSpindle.bind(this), 100);

	if (JigglePushButton.CheckPressed())
		this.Close(this.LaunchJiggle.bind(this), 100);

	if (CrosslePushButton.CheckPressed())
		this.Close(this.LaunchCrossle.bind(this), 100);

	if (BundlePushButton.CheckPressed())
		this.Close(this.LaunchBundle.bind(this), 100);
};
GenieMainView.prototype.LaunchCrackle = function() {

	CrackleView.Open();
	CrackleView.Update();
};
GenieMainView.prototype.LaunchShuffle = function() {

	ShuffleView.Open();
	ShuffleView.Update();
};
GenieMainView.prototype.LaunchSpindle = function() {

	//UNLOGGED

	alert("Coming soon - please be patient.");
	this.Open();
	this.Update();
	return;

	SpindleView.Open();
	SpindleView.Update();
};
GenieMainView.prototype.LaunchJiggle = function() {

	//UNLOGGED

	alert("Coming soon - please be patient.");
	this.Open();
	this.Update();
	return;

	JiggleView.Open();
	JiggleView.Update();
};
GenieMainView.prototype.LaunchCrossle = function() {

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
