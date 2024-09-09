
LexiSpindleView.prototype.UpdateClick = function() {

	if (Mouse.CheckDowned(CANVAS.PRIME)) {
		if (!this.Ledger.UpdateClick())
			this.Keyboard.UpdateClick();
	}
};
LexiSpindleView.prototype.UpdateButtons = function() {

	//Hint
	if (this.HintButton.CheckClicked())
		this.Ledger.PlaceHint();

	//Solve
	if (this.SolveButton.CheckClicked()) {
		this.SolveButton.Disable();
		this.ResetButton.Disable();
		this.Ledger.Solve();
	}

	//Reset
	if (this.ResetButton.CheckClicked())
		this.Ledger.ClearIncorrectEntries();

	//Restart
	if (this.RestartButton.CheckClicked()) {
		this.Reset();
		this.Close(this.OpenSpindleOptionsView.bind(this), 100);
	}

	//Quit
	if (this.QuitButton.CheckClicked()) {
		this.Reset();
		this.Close(this.OpenMainView.bind(this), 100);
	}

	//Help
	if (this.HelpButton.CheckClicked()) {
//		cancelAnimationFrame(this.AnimationFrameHandle);
		SpindleHelpView.Open();
//		SpindleHelpView.Update();
	}
};
LexiSpindleView.prototype.UpdateErrors = function() {

	this.GraphicsTool.DrawRectangle(10, 470, 45, 20, "rgb(143,111,239)", 0);
	++this.Errors;
	this.TextWriter.Write(this.Errors, 10, 485, { COLOUR: "rgb(255,223,255)" } );
};
LexiSpindleView.prototype.UpdateSeconds = function() {

	this.GraphicsTool.DrawRectangle(300, 470, 45, 20, "rgb(143,111,239)", 0);
	++this.Timer;
	this.TextWriter.Write(this.Timer, 300, 485, { COLOUR: "rgb(255,223,255)" } );
};
