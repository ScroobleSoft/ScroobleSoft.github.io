
LexiSpindleView.prototype.SetComponents = function() {

	this.Selector = new SpindleWordsSelector();
	this.Selector.Set(this.Randomizer, this);
	this.Ledger = new SpindleLedger();
	this.Ledger.Set(this.Specs.LEDGER, this.Context, this.GraphicsTool, this.Randomizer, this);
	this.Keyboard = new SpindleKeyboard();
	this.Keyboard.Set(this.Specs.KEYBOARD, this.Context, this.Ledger, this);
};
LexiSpindleView.prototype.SetControls = function() {

	//Buttons
	this.HintButton = new TextButton();
	this.HintButton.Set(this.Canvas, this.Specs.BUTTON.HINT, this.TextWriter);
	this.HintButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.HintButton);
	this.SolveButton = new TextButton();
	this.SolveButton.Set(this.Canvas, this.Specs.BUTTON.SOLVE, this.TextWriter);
	this.SolveButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.SolveButton);
	this.ResetButton = new TextButton();
	this.ResetButton.Set(this.Canvas, this.Specs.BUTTON.RESET, this.TextWriter);
	this.ResetButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.ResetButton);
	this.RestartButton = new TextButton();
	this.RestartButton.Set(this.Canvas, this.Specs.BUTTON.RESTART, this.TextWriter);
	this.RestartButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.RestartButton);
	this.QuitButton = new TextButton();
	this.QuitButton.Set(this.Canvas, this.Specs.BUTTON.QUIT, this.TextWriter);
	this.QuitButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.QuitButton);
	this.HelpButton = new TextButton();
	this.HelpButton.Set(this.Canvas, this.Specs.BUTTON.HELP, this.TextWriter);
	this.HelpButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.HelpButton);
};
LexiSpindleView.prototype.SetFrameRate = function() {

	if (this.Canvas.FPS>=90) {
		this.FPS = Math.round(this.Canvas.FPS);
		this.Frames = this.FPS;
	}
};
LexiSpindleView.prototype.SetImages = function() {

	this.IntroImage = new GenieImage();
	this.IntroImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.INSTRUCTIONS], this.Specs.IMAGE.INTRO);
};
