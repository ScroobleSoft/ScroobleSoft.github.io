
//-----------------------------------------------------------
//----------- LEXI TURTLE OPTIONS VIEW ----------------------
var LexiTurtleOptionsView = function() {
	var Turtle;
	var DailyButton, StashButton, RandomButton;
};
LexiTurtleOptionsView.prototype = new GenieView();
LexiTurtleOptionsView.prototype.Set = function(cnvs, specs, trtl) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Turtle = trtl;
};
LexiTurtleOptionsView.prototype.SetControls = function() {

	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.StashButton = this.SetTextButton(this.Specs.BUTTON.STASH, RaisedCornerImages, this.TextWriter);
	this.RandomButton = this.SetTextButton(this.Specs.BUTTON.RANDOM, RaisedCornerImages, this.TextWriter);
};
LexiTurtleOptionsView.prototype.ShowControls = function() {

	this.TextWriter.Font = this.TextWriter.Specs.FONT;
	this.TextWriter.Specs.FONT = "18px Arial bold";

	GenieView.prototype.ShowControls.call(this);

	this.TextWriter.ResetFont();
};
LexiTurtleOptionsView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	this.Update();
};
LexiTurtleOptionsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.DailyButton.CheckClicked()) {
		TurtleView.Selector.SelectDaily();
		this.Close(this.OpenTurtleView.bind(this), 100);
	}

	if (this.StashButton.CheckClicked())
		this.Close(this.OpenStashView.bind(this), 100);

	if (this.RandomButton.CheckClicked()) {
		TurtleView.Selector.Generate(0);
		this.Close(this.OpenTurtleView.bind(this), 100);
	}
};
LexiTurtleOptionsView.prototype.OpenTurtleView = function() {

	this.Turtle.Shell.SetSolution(this.Turtle.Selector);
	TurtleView.Open();
};
LexiTurtleOptionsView.prototype.OpenStashView = function() {

	TurtleStashView.Open();
};
