
GenieCrackleView.prototype.UpdateControls = function() {

	this.UpdateCrackleButtons();
	this.UpdateStandardButtons();
	this.UpdateIcons();
};
GenieCrackleView.prototype.UpdateCrackleButtons = function() {

	if (this.SubmitButton.CheckClicked()) {
		this.Ledger.Update(this.SubmissionEntry.Letters);
		++this.Attempts;
		this.GraphicsTool.DrawRectangle(this.Specs.ATTEMPTS.COUNT.X, this.Specs.ATTEMPTS.COUNT.Y-15, 20, 20, this.Specs.SECTION.COLOUR, 0);
		this.TextWriter.Write(this.Attempts, this.Specs.ATTEMPTS.COUNT.X, this.Specs.ATTEMPTS.COUNT.Y);
		this.SubmitButton.Disable();
		this.EraseButton.Disable();
		if (this.CheckSolved()) {
			HintButton.Disable();
			SolveButton.Disable();
			this.Keyboard.Suspend();
		}
		this.SubmissionEntry.Clear();
		this.ControlFlag = true;
	}

	if (this.EraseButton.CheckClicked()) {
		this.SubmissionEntry.Clear();
		this.EraseButton.Disable();
		this.SubmitButton.Disable();
		this.ControlFlag = true;
	}
};
GenieCrackleView.prototype.UpdateStandardButtons = function() {

	if (HintButton.CheckClicked()) {
		this.SubmissionEntry.AddHint(this.Ledger.Word);
		this.ControlFlag = true;
	}

	if (SolveButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Ledger.Update(this.Ledger.Word);
		HintButton.Disable();
		SolveButton.Disable();
		this.EraseButton.Disable();
		this.SubmitButton.Disable();
		this.Keyboard.Suspend();
		this.ControlFlag = true;
	}

	if (RestartButton.CheckClicked()) {
		this.Disable();
		this.DisplayOptions();
		this.PollOptions();
	}

	if (QuitButton.CheckClicked())
		this.Close(this.OpenMainView.bind(this), 100);

	if (InstructionsButton.CheckClicked()) {
		this.Disable();
		this.ControlFlag = true;
		this.DisplayInstructions();
		this.PollInstructions();
	}
};
GenieCrackleView.prototype.UpdateIcons = function() {  //TODO: move to LexiView

	if (ExpandIcon.CheckClicked()) {
		if (ExpandIcon.CheckPressed())
			LexiScape.Expand();
		else
			LexiScape.Contract();
		this.ControlFlag = true;
	}

	if (FullScreenIcon.CheckClicked()) {
		if (FullScreenIcon.CheckPressed())
			LexiScape.SetFullScreen();
		else
			LexiScape.SetBrowserSize();
		this.ControlFlag = true;
	}
};
GenieCrackleView.prototype.UpdateMouse = function() {

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {

		//Keyboard
		if ( Mouse.Click.X>=this.Specs.KEYBOARD.X && Mouse.Click.X<(this.Specs.KEYBOARD.X+this.Specs.KEYBOARD.W) &&
			  Mouse.Click.Y>=this.Specs.KEYBOARD.Y && Mouse.Click.Y<(this.Specs.KEYBOARD.Y+this.Specs.KEYBOARD.H)) {
			this.Keyboard.UpdateClick();
			if (this.SubmissionEntry.CheckFilled())
				this.SubmitButton.Enable();
			else if (this.SubmissionEntry.CheckPartiallyFilled())
				if (!this.EraseButton.Enabled)
					this.EraseButton.Enable();
		}

		//Submission field
		if ( Mouse.Click.X>=this.SubmissionEntry.X && Mouse.Click.X<(this.SubmissionEntry.X+this.SubmissionEntry.W) &&
			  Mouse.Click.Y>=this.SubmissionEntry.Y && Mouse.Click.Y<(this.SubmissionEntry.Y+this.SubmissionEntry.H))
			this.SubmissionEntry.UpdateClick();
	} else
		Mouse.ClearClicks();
};
GenieCrackleView.prototype.CheckSolved = function() {
	var i;

	for (i=0;i<this.WordLength;++i)
		if (this.Ledger.Word[i]!=this.SubmissionEntry.Letters[i])
			return (false);

	return (true);
};
GenieCrackleView.prototype.DisplayInstructions = function() {
	var i;
	var clr;

	this.Context.fillStyle = this.Specs.INSTRUCTIONS.COLOUR.BACKGROUND;
	this.Context.fillRect(this.Specs.INSTRUCTIONS.L, this.Specs.INSTRUCTIONS.T, this.Specs.INSTRUCTIONS.W, this.Specs.INSTRUCTIONS.H);

	clr = this.Specs.INSTRUCTIONS.COLOUR.FRAME;
	this.GraphicsTool.DrawRectangle(this.Specs.INSTRUCTIONS.L, this.Specs.INSTRUCTIONS.T, this.Specs.INSTRUCTIONS.W, this.Specs.INSTRUCTIONS.H, clr, 3);
	this.TextWriter.Write("Enter a word by clicking keys.", 60, 180);

	this.InstructionImages.Draw(60, 190);
	for (i=0;i<3;++i)
		this.TileImages.DrawPatchNumber(i, 60, 240+(50*i));
	this.TextWriter.Write("Green indicates a letter", 110, 255);
	this.TextWriter.Write("is in the right position.", 110, 270);
	this.TextWriter.Write("Yellow means it is part of the", 110, 305);
	this.TextWriter.Write("word but in a different position.", 110, 320);
	this.TextWriter.Write("Red appears when the letter is", 110, 355);
	this.TextWriter.Write("not found in the word at all.", 110, 370);
	this.TextWriter.Write("(Solution: 'UDDER')", 110, 390);

	this.InstructOkButton.Show();
};
GenieCrackleView.prototype.PollInstructions = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollInstructions.bind(this));

	if (this.InstructOkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.InstructOkButton.Hide();
		this.DrawInterface();
		this.Update();
	}
};
GenieCrackleView.prototype.OpenMainView = function() {

	MainView.Open();
};
