
//----------------------------------------------------
//----------- LEXI SPINDLE VIEW ----------------------
var LexiSpindleView = function() {
	var Ledger, Keyboard;
	var Selector;
	var DailyDate, GameType;

	var IntroImage;
	var Errors, Timer, FPS, Frames;
	var HintButton, SolveButton, ResetButton, RestartButton, QuitButton, HelpButton;
	var FirstOpenFlag;
};
LexiSpindleView.prototype = new GenieView();
LexiSpindleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {

	this.SetLinks(gTool, tWriter, rGenerator);

	GenieView.prototype.Set.call(this, cnvs, specs);
	this.Errors = 0;
	this.Timer = 0;
	this.FPS = 60;
	this.Frames = this.FPS;
	this.FirstOpenFlag = true;
};
LexiSpindleView.prototype.Open = function() {
	//UNLOGGED
/*
	this.GameType = this.Specs.TYPE.ELEVEN;
	this.Selector.SelectWords();
*/
	GenieView.prototype.Open.call(this);

	if (this.FirstOpenFlag) {
		this.DeActivateControls();
		this.IntroImage.Draw();
		this.PollClick();
	} else
		this.Update();
};
LexiSpindleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

//	try {
		this.UpdateClick();
		this.UpdateButtons();
		this.Keyboard.UpdateKeys();
		--this.Frames;
		if (!this.Frames)
			if (this.Timer<(5*this.FPS)) {
				this.Frames = this.FPS;
				if (!this.Ledger.SolvedFlag)
					this.UpdateSeconds();
			}
//	} catch {
//		cancelAnimationFrame(this.AnimationFrameHandle);
//		alert("Spindle has crashed - sorry!");
//	}
};
LexiSpindleView.prototype.PollClick = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollClick.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.FirstOpenFlag = false;
		Mouse.ClearAll();
		this.Open();
/*
		this.ColourScape();
		this.Draw();
		this.ShowControls();
		this.Update();
*/
	}
};
LexiSpindleView.prototype.Draw = function() {

	this.Ledger.DrawFrame();
	this.Ledger.ShowVowels();
	this.Ledger.SelectedCell.DrawSelectionSquare();
	this.Keyboard.Draw();
	this.DrawScorecard();
};
LexiSpindleView.prototype.DrawScorecard = function() {
	var x;
	var mins;

	this.DailyDate = new Date();
	this.TextWriter.Write(this.DailyDate.toDateString(), 80, 462, { FONT: "18px Arial", COLOUR: "rgb(255,223,255)" } );
	if (this.GameType==this.Specs.TYPE.DAILY) {
		x = 270 - (Math.floor(Math.log10(this.Selector.WordIndex+1))*10);
		this.TextWriter.Write(this.Selector.WordIndex+1, x, 462, { FONT: "18px Arial", COLOUR: "rgb(255,223,255)" } );
	} else if (this.GameType==this.Specs.TYPE.MINUTE) {
		mins = this.DailyDate.getMinutes();
		this.TextWriter.Write(mins, 255, 462, { FONT: "18px Arial", COLOUR: "rgb(255,223,255)" } );
	}
	this.GraphicsTool.DrawRectangle(5, 445, 60, 50, "rgb(255,223,255)", 1);
	this.TextWriter.Write("Errors: ", 10, 465, { COLOUR: "rgb(255,223,255)" } );
	this.TextWriter.Write(this.Errors, 10, 485, { COLOUR: "rgb(255,223,255)" } );
	this.GraphicsTool.DrawRectangle(295, 445, 60, 50, "rgb(255,223,255)", 1);
	this.TextWriter.Write("Secs: ", 300, 465, { COLOUR: "rgb(255,223,255)" } );
	this.TextWriter.Write(this.Timer, 300, 485, { COLOUR: "rgb(255,223,255)" } );
};
LexiSpindleView.prototype.Solved = function() {

	this.HintButton.Disable();
	this.SolveButton.Disable();
	this.ResetButton.Disable();
};
LexiSpindleView.prototype.Reset = function() {

	this.Errors = 0;
	this.Timer = 0;
	this.FPS = 60;
	this.Frames = this.FPS;
	this.Ledger.Reset();
	this.Keyboard.Reset();
};
LexiSpindleView.prototype.OpenSpindleOptionsView = function() {

	this.Reset();
	SpindleOptionsView.Open();
};
