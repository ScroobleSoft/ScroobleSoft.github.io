
DominionIntroView.prototype.SetControls = function() {

	//Choice
	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.FreeFormButton = this.SetTextButton(this.Specs.BUTTON.FREeFORM, RaisedCornerImages, this.TextWriter);
	this.MultiChoiceButton = this.SetTextButton(this.Specs.BUTTON.MULTiCHOICE, RaisedCornerImages, this.TextWriter);
	this.SurvivalButton = this.SetTextButton(this.Specs.BUTTON.SURVIVAL, RaisedCornerImages, this.TextWriter);
	this.PlayButton = this.SetTextButton(this.Specs.BUTTON.PLAY, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
	this.InfoButton = this.SetTextButton(this.Specs.BUTTON.INFO, RaisedCornerImages, this.TextWriter);

	//Head of state
	this.PickMaleButton = this.SetTextButton(this.Specs.BUTTON.PICkMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyMaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyMALE, RaisedCornerImages, this.TextWriter);
	this.PickFemaleButton = this.SetTextButton(this.Specs.BUTTON.PICkFEMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyFemaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyFEMALE, RaisedCornerImages, this.TextWriter);

	//Game Options
	this.ShortButton = this.SetTextButton(this.Specs.BUTTON.SHORT, RaisedCornerImages, this.TextWriter);
	this.MediumButton = this.SetTextButton(this.Specs.BUTTON.MEDIUM, RaisedCornerImages, this.TextWriter);
	this.LongButton = this.SetTextButton(this.Specs.BUTTON.LONG, RaisedCornerImages, this.TextWriter);
	this.PastButton = this.SetTextButton(this.Specs.BUTTON.PAST, RaisedCornerImages, this.TextWriter);

	//Profile
	this.OkButton = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, this.TextWriter);
	this.CancelButton = this.SetTextButton(this.Specs.BUTTON.CANCEL, RaisedCornerImages, this.TextWriter);

	this.GameRadioOptions = this.SetRadioControls(this.Specs.RADIO.GAME, RadioOptionImage, this.TextWriter)
};
DominionIntroView.prototype.ShowControls = function() {

	switch (this.State) {
		case this.Specs.STATE.OPEN:
			this.DailyButton.Show();
			this.FreeFormButton.Show();
			this.MultiChoiceButton.Show();
			this.SurvivalButton.Show();
			this.GuideButton.Show();
			this.InfoButton.Show();
			break;
		case this.Specs.STATE.START:
			this.PickMaleButton.Show();
			this.ModifyMaleButton.Show();
			this.PickFemaleButton.Show();
			this.ModifyFemaleButton.Show();
			this.ShortButton.Show();
			this.MediumButton.Show();
			this.LongButton.Show();
			if (!this.LeaderPickedFlag) {
				this.ShortButton.Disable();
				this.MediumButton.Disable();
				this.LongButton.Disable();
			}
			if (Game.Type==DOMINION.GAME.DAILY)
				this.PastButton.Show();
			else
				this.GameRadioOptions.Show();
			break;
		case this.Specs.STATE.INFO:
			this.PlayButton.Show();
			this.InfoButton.Show();
			break;
		case this.Specs.STATE.CHARACTER:
			this.OkButton.Show();
			this.CancelButton.Show();
	}
};
