
//----------------------------------------------------
//----------- LEXI CROSSLE VIEW ----------------------
var LexiCrossleView = function() {
	var Board;
	var Keyboard;
	var Selector;
	var DailyDate, GameType, Difficulty;

	var SelectedCell;
	var CellImage;
	var Keys, Letters, Timer, Frames;
	var BorderIconImage, BorderIcon;
	var InstructionsButton, SolveButton, RestartButton, QuitButton;
	var GenerateButton;		//NOTE: will be removed on deployed app

	var i;
};
LexiCrossleView.prototype = new GenieView();
LexiCrossleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {

	this.SetLinks(gTool, tWriter, rGenerator);

	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Keys = 0;
	this.Letters = 0;
	this.Timer = 0;
	this.Frames = 60;
};
LexiCrossleView.prototype.SetComponents = function() {

	this.Selector = new CrossleWordsSelector();
	this.Selector.Set(this.Randomizer);
	this.Board = new CrossleBoard();
	this.Board.Set(this.Specs.BOARD, this.Context, this.GraphicsTool, this);
	this.Keyboard = new CrossleKeyboard();
	this.Keyboard.Set(this.Specs.KEYBOARD, this.Context, this.Specs.COLOUR, this.Board, this);
	this.DailyDate = new Date();
};
LexiCrossleView.prototype.SetControls = function() {

	this.BorderIconImage = new GenieImage();
	this.BorderIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.BORDER.IMAGE);
	this.BorderIcon = new GenieIcon();
	this.BorderIcon.Set(this.Canvas, this.Specs.ICON.BORDER, this.BorderIconImage);
	this.BorderIcon.SetCornersPic(IconCornerImages);
	this.Controls.push(this.BorderIcon);

	this.InstructionsButton = new TextButton();
	this.InstructionsButton.Set(this.Canvas, this.Specs.BUTTON.INSTRUCTIONS, this.TextWriter);
	this.InstructionsButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.InstructionsButton);
	this.SolveButton = new TextButton();
	this.SolveButton.Set(this.Canvas, this.Specs.BUTTON.SOLVE, this.TextWriter);
	this.SolveButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.SolveButton);
	this.RestartButton = new TextButton();
	this.RestartButton.Set(this.Canvas, this.Specs.BUTTON.RESTART, this.TextWriter);
	this.RestartButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.RestartButton);
	this.QuitButton = new TextButton();
	this.QuitButton.Set(this.Canvas, this.Specs.BUTTON.QUIT, this.TextWriter);
	this.QuitButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.QuitButton);

	this.GenerateButton = new TextButton();
	this.GenerateButton.Set(this.Canvas, { L: 265, T: 560, W: 80, H: 25, LABEL: "Generate" }, this.TextWriter);
//	this.Controls.push(this.GenerateButton);
};
LexiCrossleView.prototype.SetDaily = function() {
	var ms;

	this.GameType = this.Specs.TYPE.DAILY;
	ms = this.DailyDate.getTime();
	this.Selector.SolutionIndex = Math.floor((ms-this.Specs.MILLISECONDS)/(24*60*60*1000));
};
LexiCrossleView.prototype.SetNumber = function(num) {

	this.GameType = this.Specs.TYPE.NUMBERED;
	this.Selector.SolutionIndex = num;
};
LexiCrossleView.prototype.SetSymmetrical = function() {

	this.GameType = this.Specs.TYPE.SYMMETRICAL;
	this.Selector.SolutionIndex = this.Randomizer.GetIndex(Solutions.length);
};
LexiCrossleView.prototype.SetAsymmetric = function() {

	this.GameType = this.Specs.TYPE.ASYMMETRIC;
	this.Selector.SolutionIndex = this.Randomizer.GetIndex(Solutions.length);
};
LexiCrossleView.prototype.SetDifficulty = function(lvl) {

	this.Difficulty = lvl;
};
LexiCrossleView.prototype.Draw = function() {

	this.Board.DrawGrid();
	this.Keyboard.Draw();
	this.TextWriter.Write(this.DailyDate.toDateString(), 20, 390, { FONT: "18px Arial" } );
	if (this.GameType!=this.Specs.TYPE.ASYMMETRIC)
		this.TextWriter.Write(this.Selector.SolutionIndex+1, 325-(Math.floor(Math.log10(this.Selector.SolutionIndex+1))*10), 390, { FONT: "18px Arial" } );

	//Display scorecard
	this.GraphicsTool.DrawRectangle(20, 10, 90, 30, "black", 1);
	this.TextWriter.Write("Keys: "+this.Keys, 25, 30);
	this.GraphicsTool.DrawRectangle(120, 10, 90, 30, "black", 1);
	this.TextWriter.Write("Letters: "+this.Letters, 125, 30);
	this.GraphicsTool.DrawRectangle(220, 10, 120, 30, "black", 1);
	this.TextWriter.Write("Seconds: ", 225, 30);
	this.DrawSeconds();
};
LexiCrossleView.prototype.SelectWords = function() {

	switch (this.GameType) {
		case this.Specs.TYPE.DAILY:
		case this.Specs.TYPE.NUMBERED:
			this.Selector.Select();
			break;
		case this.Specs.TYPE.SYMMETRICAL:
			this.Selector.SolutionIndex = this.Randomizer.GetIndex(Solutions.length);
			this.Selector.Select();
			break;
		case this.Specs.TYPE.ASYMMETRIC:
			this.Selector.Generate(8-this.Difficulty);
			break;
	}
	this.Board.SetSolution(this.Selector);
};
LexiCrossleView.prototype.IncrementKeyCount = function() {

	++this.Keys;
	this.GraphicsTool.DrawRectangle(60, 12, 30, 20, this.Specs.COLOUR, 0);
	this.TextWriter.Write(this.Keys, 65, 30);
};
LexiCrossleView.prototype.IncrementLetterCount = function() {

	++this.Letters;
	this.GraphicsTool.DrawRectangle(170, 12, 30, 20, this.Specs.COLOUR, 0);
	this.TextWriter.Write(this.Letters, 175, 30);
};
LexiCrossleView.prototype.DrawSeconds = function() {

	this.GraphicsTool.DrawRectangle(300, 12, 35, 20, this.Specs.COLOUR, 0);
	if (!this.Timer)
		this.TextWriter.Write("0", 325, 30);
	else 
		this.TextWriter.Write(this.Timer, 325-(Math.floor(Math.log10(this.Timer))*8), 30);
};
LexiCrossleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	try {

	this.UpdateClick();
	this.UpdateButtons();
	this.Board.Update();
	this.Keyboard.UpdateKeys();
	--this.Frames;
	if (!this.Frames)
		if (this.Timer<=300) {
			++this.Timer;
			this.Frames = 60;
			this.DrawSeconds();
		}

	} catch {
		cancelAnimationFrame(this.AnimationFrameHandle);
		alert("Crossle has crashed - sorry!");
	}
};
LexiCrossleView.prototype.UpdateClick = function() {

	if (Mouse.CheckDowned(CANVAS.PRIME)) {
		if (!this.Board.UpdateClick())
			this.Keyboard.UpdateClick();
	}
};
LexiCrossleView.prototype.UpdateButtons = function() {

	//Instructions
	if (this.InstructionsButton.CheckClicked()) {
//		cancelAnimationFrame(this.AnimationFrameHandle);
		//-launch dialog
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
/*
	//Generate
	if (this.GenerateButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Selector.Generate(3);
		this.Board.SetSolution(this.Selector);
		this.Board.Solve();
	}
*/
	//Border icon
	if (this.BorderIcon.CheckPressed()) {
		if (this.Board.BorderFlag)
			this.BorderIcon.Draw(PRESSED);
		else
			this.Board.FillBorder();
	}
};
LexiCrossleView.prototype.OpenMainView = function() {

	MainView.Open();
	MainView.Update();
};
LexiCrossleView.prototype.Reset = function() {

	this.Keys = 0;
	this.Letters = 0;
	this.Timer = 0;
	this.Frames = 60;
	this.Board.Reset();
	this.Keyboard.Reset();
};
LexiCrossleView.prototype.OpenOptionsView = function() {

	this.Reset();
	CrossleOptionsView.Open();
	CrossleOptionsView.Update();
};