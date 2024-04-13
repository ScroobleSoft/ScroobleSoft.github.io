
GenieCrackleView.prototype.DisplayOptions = function() {

	this.Context.fillStyle = this.Specs.OPTION.COLOUR;
	this.Context.fillRect(this.Specs.OPTION.L, this.Specs.OPTION.T, this.Specs.OPTION.W, this.Specs.OPTION.H);

	this.GraphicsTool.DrawRectangle(this.Specs.OPTION.L, this.Specs.OPTION.T, this.Specs.OPTION.W, this.Specs.OPTION.H, "black", 3);
	this.TextWriter.Write("Choose game type:", 100, 105);

	this.TypeRadioOptions.Show();
	this.OkButton.Show();
};
GenieCrackleView.prototype.PollOptions = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollOptions.bind(this));

	if (this.OkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.TypeRadioOptions.Hide();
		setTimeout(this.StartGame.bind(this), 100);
	}
};
GenieCrackleView.prototype.StartGame = function() {

	//Set game type
	this.OkButton.Hide();
	if (this.TypeRadioOptions.Selected==3)
		this.WordLength = this.Randomizer.GetInRange(5,7);
	else
		this.WordLength = this.TypeRadioOptions.Selected + 5;
	this.SetWord();
	Mouse.ClearAll();

	//Clear previous game's data
	this.Ledger.Clear();
	this.SubmissionEntry.Erase();
	this.SubmissionEntry.Clear();

	//Prepare interface
	this.DrawInterface();
	this.EraseButton.Disable();
	this.SubmitButton.Disable();

	//Start loop
	this.Keyboard.Activate();
	this.Update();
};
