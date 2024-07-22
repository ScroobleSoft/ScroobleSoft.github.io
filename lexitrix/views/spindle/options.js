
//------------------------------------------------------------
//----------- LEXI SPINDLE OPTIONS VIEW ----------------------
var LexiSpindleOptionsView = function() {
	var DailyButton, ElevenButton, NineButton, SevenButton, MinuteButton;
};
LexiSpindleOptionsView.prototype = new GenieView();
LexiSpindleOptionsView.prototype.Set = function(cnvs, specs, tWriter) {

	this.SetLinks(null, tWriter);

	GenieView.prototype.Set.call(this, cnvs, specs);
};
LexiSpindleOptionsView.prototype.SetControls = function() {

	this.DailyButton = new TextButton();
	this.DailyButton.Set(this.Canvas, this.Specs.BUTTON.DAILY, this.TextWriter);
	this.DailyButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.DailyButton);
	this.ElevenButton = new TextButton();
	this.ElevenButton.Set(this.Canvas, this.Specs.BUTTON.ELEVEN, this.TextWriter);
	this.ElevenButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.ElevenButton);
	this.NineButton = new TextButton();
	this.NineButton.Set(this.Canvas, this.Specs.BUTTON.NINE, this.TextWriter);
	this.NineButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.NineButton);
	this.SevenButton = new TextButton();
	this.SevenButton.Set(this.Canvas, this.Specs.BUTTON.SEVEN, this.TextWriter);
	this.SevenButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SevenButton);
	this.MinuteButton = new TextButton();
	this.MinuteButton.Set(this.Canvas, this.Specs.BUTTON.MINUTE, this.TextWriter);
	this.MinuteButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.MinuteButton);
};
LexiSpindleOptionsView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	this.Update();
};
LexiSpindleOptionsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.DailyButton.CheckClicked()) {
		SpindleView.GameType = SpindleView.Specs.TYPE.DAILY;
		SpindleView.Selector.SelectWords();
		this.Close(this.OpenSpindleView.bind(this), 100);
	}
	if (this.ElevenButton.CheckClicked()) {
		SpindleView.GameType = SpindleView.Specs.TYPE.ELEVEN;
		SpindleView.Selector.SelectWords();
		this.Close(this.OpenSpindleView.bind(this), 100);
	}
	if (this.NineButton.CheckClicked()) {
		SpindleView.GameType = SpindleView.Specs.TYPE.NINE;
		SpindleView.Selector.SelectWords();
		this.Close(this.OpenSpindleView.bind(this), 100);
	}
	if (this.SevenButton.CheckClicked()) {
		SpindleView.GameType = SpindleView.Specs.TYPE.SEVEN;
		SpindleView.Selector.SelectWords();
		this.Close(this.OpenSpindleView.bind(this), 100);
	}
	if (this.MinuteButton.CheckClicked()) {
		SpindleView.GameType = SpindleView.Specs.TYPE.MINUTE;
		SpindleView.Selector.SelectWords();
		this.Close(this.OpenSpindleView.bind(this), 100);
	}
};
LexiSpindleOptionsView.prototype.OpenSpindleView = function() {

	SpindleView.Open();
};
