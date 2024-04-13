
//-----------------------------------------------------
//----------- GENIE CRACKLE VIEW ----------------------
var GenieCrackleView = function() {
	var Ledger, SubmissionEntry, Keyboard;													//interface
	var Words, Attempts;																			//data
	var LetterImages, SectionImage, KeyButtonImages, KeyLetterImages;				//images
	var EraseButton, SubmitButton;															//upper buttons
	var TypeRadioOptions, OKButton;															//options
	var InstructionImages, TileImages, InstructOkButton;								//instructions
	var ControlFlag;

	var x, y, letter;		//scratch variables
};
GenieCrackleView.prototype = new GenieView();
GenieCrackleView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool, tWriter, rGenerator);
};
GenieCrackleView.prototype.Open = function() {

	this.Canvas.View = this;
	this.ColourScape();
	this.Canvas.ResumeInput();

	this.ResetButtons();
	this.ResetIcons();
	this.DisplayOptions();
	this.PollOptions();
};
GenieCrackleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	try {
		this.UpdateControls();
		if (this.ControlFlag)
			this.ControlFlag = false;
		else
			this.UpdateMouse();
	} catch {
		cancelAnimationFrame(this.AnimationFrameHandle);
		alert("Crackle has crashed - sorry!");
	}
};
GenieCrackleView.prototype.DrawInterface = function() {

	this.ColourScape(null, this.Specs.COLOUR);

	this.Ledger.Draw();
	this.Ledger.DrawEntries();
	this.Keyboard.Draw();
	this.SubmissionEntry.Draw();
	this.SubmissionEntry.DisplayLetters();
	this.DisplayAttempts();

	this.EraseButton.Show();
	InstructionsButton.Show();
	this.SubmitButton.Show();

	HintButton.Show();
	SolveButton.Show();
	RestartButton.Show();
	QuitButton.Show();

	ExpandIcon.Show();
	FullScreenIcon.Show();
};
GenieCrackleView.prototype.DisplayAttempts = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.ATTEMPTS.X, this.Specs.ATTEMPTS.Y, this.Specs.ATTEMPTS.W, this.Specs.ATTEMPTS.H, this.Specs.SECTION.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(this.Specs.ATTEMPTS.X, this.Specs.ATTEMPTS.Y, this.Specs.ATTEMPTS.W, this.Specs.ATTEMPTS.H, "black", 1);
	this.TextWriter.Write(this.Specs.ATTEMPTS.LABEL.TEXT, this.Specs.ATTEMPTS.LABEL.X, this.Specs.ATTEMPTS.LABEL.Y);
	this.TextWriter.Write(this.Attempts, this.Specs.ATTEMPTS.COUNT.X, this.Specs.ATTEMPTS.COUNT.Y);
};
