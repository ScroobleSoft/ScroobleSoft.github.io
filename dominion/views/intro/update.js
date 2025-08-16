
DominionIntroView.prototype.UpdatePlayButtons = function() {

	if (this.DailyButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.DAILY;
		Game.SetDaily();
		this.SetPersonnel();
		this.SetProfilesScreen();
		Game.ResetDaily();
	}

	if (this.FreeFormButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.FREeFORM;
		this.Close(this.OpenGlobalView.bind(this), 100);
	}

	if (this.MultiChoiceButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.MULTiCHOICE;
		this.SetPersonnel();
		this.SetProfilesScreen();
	}

	if (this.PlayButton.CheckClicked()) {
		this.PlayButton.DeActivate();
		this.InfoButton.DeActivate();
		this.State = this.Specs.STATE.OPEN;
		this.Open();
	}
};
DominionIntroView.prototype.SetPersonnel = function() {

	Powers.forEach(function(pwr) {pwr.SetPersonnel();});
	AlliedStates.forEach(function(alld) {alld.SetPersonnel();});
	CityStates.forEach(function(cStts) {cStts.SetPersonnel();});
};
DominionIntroView.prototype.SetProfilesScreen = function() {

	this.DailyButton.DeActivate();
	this.FreeFormButton.DeActivate();
	this.MultiChoiceButton.DeActivate();
	this.State = this.Specs.STATE.START;
	this.SetProfiles();
	this.DisplayProfiles();
	this.ShowControls();
};
DominionIntroView.prototype.UpdateInfoButton = function() {

	if (this.InfoButton.CheckClicked()) {
		if (this.InfoCount==0) {
			this.DailyButton.DeActivate();
			this.FreeFormButton.DeActivate();
			this.MultiChoiceButton.DeActivate();
			this.MoveInfoButton();
		}
		this.DisplayInfo();
		this.State = this.Specs.STATE.INFO;
		this.PlayButton.Show();
		this.InfoButton.Show();
		++this.InfoCount;
	}
};
DominionIntroView.prototype.UpdateProfileButtons = function() {  //UNLOGGED

	if (this.PickMaleButton.CheckClicked()) {
		this.AdjustProfileButtons();
		if (this.FemaleFirstFlag) {
			this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			PlayerPower.HeadOfState.Name = this.FemaleName;
			PlayerPower.HeadOfState.Profile = this.FemaleProfile;
		} else {
			this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			PlayerPower.HeadOfState.Name = this.MaleName;
			PlayerPower.HeadOfState.Profile = this.MaleProfile;
		}
	}

	if (this.PickFemaleButton.CheckClicked()) {
		this.AdjustProfileButtons();
		if (this.FemaleFirstFlag) {
			this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			PlayerPower.HeadOfState.Name = this.MaleName;
			PlayerPower.HeadOfState.Profile = this.MaleProfile;
		} else {
			this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			PlayerPower.HeadOfState.Name = this.FemaleName;
			PlayerPower.HeadOfState.Profile = this.FemaleProfile;
		}
	}

	if (this.ModifyMaleButton.CheckClicked()) {
		alert ("Feature not yet implemented.");
		return;
		//TODO: re-write below to use a view
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.State = this.Specs.STATE.MALE;
		this.Controls.forEach( function(cntrl) {cntrl.Disable();} );
		this.OpenCharacterCustomizer();
	}

	if (this.ModifyFemaleButton.CheckClicked()) {
		alert ("Feature not yet implemented.");
		return;
	}
};
DominionIntroView.prototype.UpdatePastButton = function() {  //UNLOGGED

	if (this.PastButton.CheckClicked()) {
	}
};
DominionIntroView.prototype.UpdateCharacterControls = function() {  //UNLOGGED

	if (this.OkButton.CheckClicked()) {
	}

	if (this.CancelButton.CheckClicked()) {
	}
};
DominionIntroView.prototype.UpdateTurnButtons = function() {  //UNLOGGED

	if (this.ShortButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.SHORT;
		this.Close(this.OpenAssetsView.bind(this), 100);
	}

	if (this.MediumButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.MEDIUM;
		this.Close(this.OpenAssetsView.bind(this), 100);
	}

	if (this.LongButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.LONG;
		this.Close(this.OpenAssetsView.bind(this), 100);
	}
};
DominionIntroView.prototype.MoveInfoButton = function() {

	this.InfoButton.Specs.L = 185;
	this.InfoButton.Specs.T = 315;
};
DominionIntroView.prototype.MoveTurnButtons = function() {  //UNLOGGED

	if (Game.Type==DOMINION.GAME.DAILY) {
		this.ShortButton.Specs.L = 195;
		this.MediumButton.Specs.L = 195;
		this.LongButton.Specs.L = 195;
	}
};
DominionIntroView.prototype.AdjustProfileButtons = function() {

	this.PickMaleButton.Hide(this.Specs.COLOUR);
	this.ModifyMaleButton.Hide(this.Specs.COLOUR);
	this.PickFemaleButton.Hide(this.Specs.COLOUR);
	this.ModifyFemaleButton.Hide(this.Specs.COLOUR);

	this.ShortButton.Enable();
	this.MediumButton.Enable();
	this.LongButton.Enable();
};
