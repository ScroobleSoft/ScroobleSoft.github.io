
//---------------------------------------------------
//----------- LEXI FIDDLE VIEW ----------------------
var LexiFiddleView = function() {
	var Board;
	var Selector;
	var Moves, Errors, Seconds, Frames;
	var InstructionsButton, SolveButton, RestartButton, QuitButton;
	var CornerIcon, VowelsIcon, RewardIcon;
	var FirstOpenFlag, SolvedFlag, CornerFlag, VowelsFlag;
};
LexiFiddleView.prototype = new GenieView();
LexiFiddleView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Moves = 0;
	this.Errors = 0;
	this.Seconds = 0;
	this.Frames = 60;
	this.FirstOpenFlag = true;
};
LexiFiddleView.prototype.SetComponents = function() {

	this.Selector = new FiddleWordsSelector();
	this.Selector.Set(this.Randomizer, this);
	this.Board = new FiddleBoard();
	this.Board.Set(this.Specs.BOARD, this.Context, this.GraphicsTool, this.Randomizer, this);
	this.DailyDate = new Date();
};
LexiFiddleView.prototype.SetControls = function() {

	this.SetButtons();
	this.SetIcons();
};
LexiFiddleView.prototype.SetButtons = function() {

	this.InstructionsButton = this.SetTextButton(this.Specs.BUTTON.INSTRUCTIONS, RoundedCornerImages, this.TextWriter);
	this.SolveButton = this.SetTextButton(this.Specs.BUTTON.SOLVE, RoundedCornerImages, this.TextWriter);
	this.RestartButton = this.SetTextButton(this.Specs.BUTTON.RESTART, RoundedCornerImages, this.TextWriter);
	this.QuitButton = this.SetTextButton(this.Specs.BUTTON.QUIT, RoundedCornerImages, this.TextWriter);
};
LexiFiddleView.prototype.SetIcons = function() {

	this.CornerIcon = this.SetCornersIcon(this.Specs.ICON.CORNER, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.CORNER.IMAGE, GreyIconCornerImages);
	this.VowelsIcon = this.SetCornersIcon(this.Specs.ICON.VOWELS, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.VOWELS.IMAGE, GreyIconCornerImages);
	this.RewardIcon = this.SetCornersIcon(this.Specs.ICON.REWARD, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.REWARD.IMAGE, GreyIconCornerImages);
};
LexiFiddleView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	if (this.FirstOpenFlag) {
		this.FirstOpenFlag = false;
		FiddleGuideDialog.Open();
	} else

		this.Update();
};
LexiFiddleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateButtons();
	if (this.SolvedFlag)
		return;

	this.Board.Update();
	this.UpdateIcons();
	this.UpdateTimer();
};
LexiFiddleView.prototype.Draw = function() {

	this.Board.Draw();

	//Display scorecard
	this.GraphicsTool.DrawRectangle(20, 10, 100, 30, "rgb(063,191,223)", 1);
	this.TextWriter.Write("Moves: "+this.Moves, 25, 30, { COLOUR: "rgb(063,191,223)" } );
	this.GraphicsTool.DrawRectangle(130, 10, 100, 30, "rgb(063,191,223)", 1);
	this.TextWriter.Write("Errors: 0", 135, 30, { COLOUR: "rgb(063,191,223)" } );
	this.GraphicsTool.DrawRectangle(240, 10, 100, 30, "rgb(063,191,223)", 1);
	this.TextWriter.Write("Seconds: 0", 245, 30, { COLOUR: "rgb(063,191,223)" } );

	//Game info
	this.TextWriter.SetFont("18px Arial");
	this.TextWriter.SetColour("rgb(063,191,223)");
	this.TextWriter.Write(this.DailyDate.toDateString(), 25, 430);
	if (this.GameType!=this.Specs.TYPE.RANDOM)
		this.TextWriter.Write(this.Selector.SolutionIndex+1, 325-(Math.floor(Math.log10(this.Selector.SolutionIndex+1))*10), 430);
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
LexiFiddleView.prototype.UpdateButtons = function() {

	//Instructions
	if (this.InstructionsButton.CheckClicked()) {
		this.InstructionsButton.DeActivate();
		FiddleInstructionView.Open();
	}

	//Solve
	if (this.SolveButton.CheckClicked()) {
		this.SolveButton.Disable();
		this.Board.Solve();
	}

	//Restart
	if (this.RestartButton.CheckClicked())
		this.Close(this.OpenOptionsView.bind(this), 100);

	//Quit
	if (this.QuitButton.CheckClicked())
		this.Close(this.OpenMainView.bind(this), 100);
};
LexiFiddleView.prototype.UpdateIcons = function() {

	if (!this.CornerFlag)
		if (this.CornerIcon.CheckPressed()) {
			this.CornerIcon.DeActivate();
			this.Board.PlaceCorners();
			this.CornerFlag = true;
		}

	if (!this.VowelsFlag)
		if (this.VowelsIcon.CheckPressed()) {
			this.VowelsIcon.DeActivate();
			this.Board.PlaceVowels();
			this.VowelsFlag = true;
		}
};
LexiFiddleView.prototype.UpdateTimer = function() {

	--this.Frames;
	if (!this.Frames)
		if (this.Seconds<999) {
			this.IncrementSeconds();
			this.Frames = 60;
		}
};
LexiFiddleView.prototype.IncrementMoves = function() {

	++this.Moves;
	this.GraphicsTool.DrawRectangle(22, 12, 96, 26, this.Specs.COLOUR, 0);
	this.TextWriter.Write("Moves: "+this.Moves, 25, 30, { COLOUR: "rgb(063,191,223)" } );
};
LexiFiddleView.prototype.IncrementErrors = function() {

	++this.Errors;
	this.GraphicsTool.DrawRectangle(132, 12, 96, 26, this.Specs.COLOUR, 0);
	this.TextWriter.Write("Errors: "+this.Errors, 135, 30, { COLOUR: "rgb(063,191,223)" } );
};
LexiFiddleView.prototype.IncrementSeconds = function() {

	if (this.Seconds>999)
		return;

	++this.Seconds;
	this.GraphicsTool.DrawRectangle(242, 12, 96, 26, this.Specs.COLOUR, 0);
	if (this.Seconds==999)
		this.TextWriter.Write("Seconds: "+this.Seconds, 245, 30, { COLOUR: "red" } );
	else
		this.TextWriter.Write("Seconds: "+this.Seconds, 245, 30, { COLOUR: "rgb(063,191,223)" } );
};
LexiFiddleView.prototype.Reset = function() {

	this.CornerIcon.Reset();
	this.VowelsIcon.Reset();
	this.RewardIcon.Reset();
	this.SolvedFlag = false;
	this.CornerFlag = false;
	this.VowelsFlag = false;
	this.Moves = 0;
	this.Seconds = 0;
	this.Frames = 60;
	this.Board.Reset();
};
LexiFiddleView.prototype.OpenOptionsView = function() {

	this.Reset();
	FiddleOptionsView.Open();
};
LexiFiddleView.prototype.OpenMainView = function() {

	MainView.Open();
	MainView.Update();
};
