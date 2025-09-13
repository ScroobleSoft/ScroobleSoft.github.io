
DominionIntroView.prototype.UpdatePlayButtons = function() {

	if (this.DailyButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.DAILY;
		Game.SetDaily();
		this.SetPersonnel();
		Game.ResetDaily();
		setTimeout(this.OpenProfilesScreen.bind(this), 100);
	}

	if (this.FreeFormButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.FREeFORM;
		this.SetPersonnel();
		setTimeout(this.OpenProfilesScreen.bind(this), 100);
	}

	if (this.MultiChoiceButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.MULTiCHOICE;
		this.SetPersonnel();
		setTimeout(this.OpenProfilesScreen.bind(this), 100);
	}

	if (this.SurvivalButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.SURVIVAL;
		this.SetPersonnel();
		setTimeout(this.OpenProfilesScreen.bind(this), 100);
	}
};
DominionIntroView.prototype.SetPersonnel = function() {

	Powers.forEach(function(pwr) {pwr.SetPersonnel();});
	AlliedStates.forEach(function(alld) {alld.SetPersonnel();});
	CityStates.forEach(function(cStts) {cStts.SetPersonnel();});
};
DominionIntroView.prototype.OpenProfilesScreen = function() {

	this.DailyButton.DeActivate();
	this.FreeFormButton.DeActivate();
	this.MultiChoiceButton.DeActivate();
	this.SurvivalButton.DeActivate();
	this.GuideButton.DeActivate();
	this.InfoButton.DeActivate();
	this.State = this.Specs.STATE.START;
	this.SetProfiles();
	this.DisplayProfiles();
	this.ShowControls();
};
DominionIntroView.prototype.UpdateInfoButton = function() {

	if (this.GuideButton.CheckClicked()) {
		this.Close(this.OpenGuideView.bind(this), 100);
		return;
	}

	if (this.InfoButton.CheckClicked()) {
		if (this.InfoCount==0)
			setTimeout(this.OpenInfoDialog.bind(this), 100);
		else {
			this.DisplayInfo();
			++this.InfoCount;
		}
		return;
	}

	if (this.PlayButton.CheckClicked()) {
		this.PlayButton.DeActivate();
		this.InfoButton.DeActivate();
		this.ResetInfoButton();
		this.InfoCount = 0;
		this.State = this.Specs.STATE.OPEN;
		WorldMap.Draw();
		setTimeout(this.Open.bind(this), 100);
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
DominionIntroView.prototype.UpdateTurnButtons = function() {

	if (this.ShortButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.SHORT;
		this.StartGame();
	}

	if (this.MediumButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.MEDIUM;
		this.StartGame();
	}

	if (this.LongButton.CheckClicked()) {
		Game.TurnLimit = DOMINION.TURNS.LONG;
		this.StartGame();
	}
};
DominionIntroView.prototype.UpdateRadioControl = function() {

	if (this.GameRadioOptions.CheckClicked()) {
		if (this.GameRadioOptions.Selected==0) {
			this.PastButton.Hide();
			this.GraphicsTool.DrawRectangle(60, 275, 125, 20, this.Specs.COLOUR, 0);
		} else {
			this.TextWriter.Write(this.GameInfo, 60, 285, { COLOUR: "white" } );
			this.PastButton.Show();
		}
	}
};
DominionIntroView.prototype.MoveInfoButton = function() {

	this.InfoButton.Specs.T = 315;
};
DominionIntroView.prototype.ResetInfoButton = function() {

	this.InfoButton.Specs.T = 295;
};
/*
DominionIntroView.prototype.MoveTurnButtons = function() {  //UNLOGGED

	if (Game.Type==DOMINION.GAME.DAILY) {
		this.ShortButton.Specs.L = 195;
		this.MediumButton.Specs.L = 195;
		this.LongButton.Specs.L = 195;
	}
};
*/
DominionIntroView.prototype.AdjustProfileButtons = function() {

	this.PickMaleButton.Hide(this.Specs.COLOUR);
	this.ModifyMaleButton.Hide(this.Specs.COLOUR);
	this.PickFemaleButton.Hide(this.Specs.COLOUR);
	this.ModifyFemaleButton.Hide(this.Specs.COLOUR);

	this.ShortButton.Enable();
	this.MediumButton.Enable();
	this.LongButton.Enable();
};
DominionIntroView.prototype.OpenInfoDialog = function() {

	this.DailyButton.DeActivate();
	this.FreeFormButton.DeActivate();
	this.MultiChoiceButton.DeActivate();
	this.SurvivalButton.DeActivate();
	this.GuideButton.DeActivate();
	this.MoveInfoButton();
	this.GraphicsTool.DrawRectangle(80, 310, 240, 40, this.Specs.COLOUR, 0);
	this.PlayButton.Show();
	this.InfoButton.Show();
	this.State = this.Specs.STATE.INFO;
	this.DisplayInfo();
	++this.InfoCount;
};
DominionIntroView.prototype.StartGame = function() {
/*
	if (Game.Type==DOMINION.GAME.DAILY)
		this.Close(this.OpenAssetsView.bind(this), 100);
	else if (Game.Type==DOMINION.GAME.MULTiCHOICE) {
		GlobalView.SetConsoleView(TurnConsoleView);
		this.Close(this.OpenSolicitationView.bind(this), 100);
	}
	*/
	switch (Game.Type) {
		case DOMINION.GAME.FREeFORM:
			this.Close(this.OpenAssetsView.bind(this), 100);
			break;
		case DOMINION.GAME.MULTiCHOICE:
			GlobalView.SetConsoleView(TurnConsoleView);
			this.Close(this.OpenGlobalView.bind(this), 100);
//			this.Close(this.OpenSolicitationView.bind(this), 100);
			break;
		case DOMINION.GAME.SURVIVAL:
			this.Close(this.OpenOfficeView.bind(this), 100);
			break;
	}
};
