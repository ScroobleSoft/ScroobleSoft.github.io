
//---------------------------------------------------
//----------- LEXI TURTLE VIEW ----------------------
var LexiTurtleView = function() {
	var Shell;
	var Selector;
	var DailyDate;

	var IntroImage;
	var Errors, Seconds, Frames;
	var LettersIcon, VowelsIcon;
	var InstructionsButton, SolveButton, RestartButton, QuitButton;
	var FirstOpenFlag, SolvedFlag, VowelsFlag, LettersFlag;

	var i;
};
LexiTurtleView.prototype = new GenieView();
LexiTurtleView.prototype.Set = function(cnvs, specs,) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Errors = 0;
	this.Seconds = 0;
	this.Frames = 60;
	this.FirstOpenFlag = true;

	//TEMP
	this.GameType = this.Specs.TYPE.DAILY;
};
LexiTurtleView.prototype.SetComponents = function() {

	this.Selector = new TurtleWordsSelector();
	this.Selector.Set(this.Randomizer, this);
	this.Shell = new TurtleShell();
	this.Shell.Set(this.Specs.SHELL, this.Context, this.GraphicsTool, this);
	ScreenKeyboard.SetApp(this);
	ScreenKeyboard.SetColour(this.Specs.COLOUR);
	ScreenKeyboard.SetLocation(this.Specs.KEYBOARD.X, this.Specs.KEYBOARD.Y);
	this.DailyDate = new Date();
};
LexiTurtleView.prototype.SetControls = function() {

	this.SetButtons();
	this.SetIcons();
};
LexiTurtleView.prototype.SetButtons = function() {

	this.InstructionsButton = this.SetTextButton(this.Specs.BUTTON.INSTRUCTIONS, RoundedCornerImages, this.TextWriter);
	this.SolveButton = this.SetTextButton(this.Specs.BUTTON.SOLVE, RoundedCornerImages, this.TextWriter);
	this.RestartButton = this.SetTextButton(this.Specs.BUTTON.RESTART, RoundedCornerImages, this.TextWriter);
	this.QuitButton = this.SetTextButton(this.Specs.BUTTON.QUIT, RoundedCornerImages, this.TextWriter);
};
LexiTurtleView.prototype.SetIcons = function() {

	this.LettersIcon = this.SetCornersIcon(this.Specs.ICON.LETTERS, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.LETTERS.IMAGE,
														GreyIconCornerImages);
	this.VowelsIcon = this.SetCornersIcon(this.Specs.ICON.VOWELS, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.VOWELS.IMAGE,
														GreyIconCornerImages);
};
LexiTurtleView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	if (this.FirstOpenFlag) {
		this.FirstOpenFlag = false;
		TurtleGuideDialog.Open();
	} else
		this.Update();
};
LexiTurtleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateButtons();
	if (this.SolvedFlag)
		return;

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		ScreenKeyboard.Update();
		this.Shell.Update();
	}
	this.UpdateIcons();
	this.UpdateTimer();
};
LexiTurtleView.prototype.Draw = function() {

	this.Shell.Draw();
	ScreenKeyboard.Draw();

	//Display scorecard
	this.GraphicsTool.DrawRectangle(20, 10, 100, 30, "rgb(191,255,047)", 1);
	this.TextWriter.Write("Errors: "+this.Errors, 25, 30, { COLOUR: "rgb(191,255,047)" } );
	this.GraphicsTool.DrawRectangle(220, 10, 100, 30, "rgb(191,255,047)", 1);
	this.TextWriter.Write("Seconds: 0", 225, 30, { COLOUR: "rgb(191,255,047)" } );

	//Game info
	this.TextWriter.SetFont("18px Arial");
	this.TextWriter.SetColour("rgb(191,255,047)");
	this.TextWriter.Write(this.DailyDate.toDateString(), 5, 285);
	if (this.GameType!=this.Specs.TYPE.RANDOM)
		this.TextWriter.Write(this.Selector.SolutionIndex+1, 325-(Math.floor(Math.log10(this.Selector.SolutionIndex+1))*10), 285);
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
LexiTurtleView.prototype.UpdateButtons = function() {

	//Instructions
	if (this.InstructionsButton.CheckClicked())
		TurtleInstructionView.Open();

	//Solve
	if (this.SolveButton.CheckClicked()) {
		this.SolveButton.Disable();
		this.Shell.Solve();
	}

	//Restart
	if (this.RestartButton.CheckClicked())
		this.Close(this.OpenOptionsView.bind(this), 100);

	//Quit
	if (this.QuitButton.CheckClicked())
		this.Close(this.OpenMainView.bind(this), 100);
};
LexiTurtleView.prototype.UpdateIcons = function() {

	if (!this.VowelsFlag)
		if (this.VowelsIcon.CheckPressed()) {
			this.VowelsIcon.DeActivate();
			this.Shell.FillVowels();
			this.VowelsFlag = true;
		}

	if (this.LettersIcon.CheckMouseDown()) {
		if (this.LettersIcon.CheckPressed())
			this.LettersFlag = true;
		else
			this.LettersFlag = false;
	}
};
LexiTurtleView.prototype.UpdateTimer = function() {

	--this.Frames;
	if (!this.Frames)
		if (this.Seconds<300) {
			this.IncrementSeconds();
			this.Frames = 60;
		}
};
LexiTurtleView.prototype.IncrementErrors = function() {

	++this.Errors;
	this.GraphicsTool.DrawRectangle(22, 12, 96, 26, this.Specs.COLOUR, 0);
	this.TextWriter.Write("Errors: "+this.Errors, 25, 30, { COLOUR: "rgb(191,255,047)" } );
};
LexiTurtleView.prototype.IncrementSeconds = function() {

	if (this.Seconds>300)
		return;

	++this.Seconds;
	this.GraphicsTool.DrawRectangle(222, 12, 96, 26, this.Specs.COLOUR, 0);
	if (this.Seconds==300)
		this.TextWriter.Write("Seconds: "+this.Seconds, 225, 30, { COLOUR: "red" } );
	else
		this.TextWriter.Write("Seconds: "+this.Seconds, 225, 30, { COLOUR: "rgb(191,255,047)" } );
};
LexiTurtleView.prototype.Reset = function() {

	this.LettersIcon.Reset();
	this.VowelsIcon.Reset();
	this.SolvedFlag = false;
	this.LettersFlag = false;
	this.VowelsFlag = false;
	this.Errors = 0;
	this.Seconds = 0;
	this.Frames = 60;
	this.Shell.Reset();
};
LexiTurtleView.prototype.OpenMainView = function() {

	MainView.Open();
	MainView.Update();
};
LexiTurtleView.prototype.OpenOptionsView = function() {

	this.Reset();
	TurtleOptionsView.Open();
};
