
//-----------------------------------------------------------
//----------- LEXI FIDDLE OPTIONS VIEW ----------------------
var LexiFiddleOptionsView = function() {
	var Fiddle;
	var DailyButton, StashButton, RandomButton;
};
LexiFiddleOptionsView.prototype = new GenieView();
LexiFiddleOptionsView.prototype.Set = function(cnvs, specs, trtl) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Fiddle = trtl;
};
LexiFiddleOptionsView.prototype.SetControls = function() {

	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.StashButton = this.SetTextButton(this.Specs.BUTTON.STASH, RaisedCornerImages, this.TextWriter);
	this.RandomButton = this.SetTextButton(this.Specs.BUTTON.RANDOM, RaisedCornerImages, this.TextWriter);
};
LexiFiddleOptionsView.prototype.ShowControls = function() {

	this.TextWriter.Font = this.TextWriter.Specs.FONT;
	this.TextWriter.Specs.FONT = "18px Arial bold";

	GenieView.prototype.ShowControls.call(this);

	this.TextWriter.ResetFont();
};
LexiFiddleOptionsView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	this.Update();
};
LexiFiddleOptionsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.DailyButton.CheckClicked()) {
		FiddleView.Selector.SelectDaily();
		this.Close(this.OpenFiddleView.bind(this), 100);
	}

	if (this.StashButton.CheckClicked())
		this.Close(this.OpenStashView.bind(this), 100);

	if (this.RandomButton.CheckClicked()) {
		FiddleView.Selector.SelectRandom();
		this.Close(this.OpenFiddleView.bind(this), 100);
	}
};
LexiFiddleOptionsView.prototype.OpenFiddleView = function() {

	this.Fiddle.Board.SetSolution(this.Fiddle.Selector);
	this.Fiddle.Board.SetLetters();
	FiddleView.Open();
};
LexiFiddleOptionsView.prototype.OpenStashView = function() {

	FiddleStashView.Open();
};
