
DominionIntroView.prototype.ShowStartControls = function() {

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
};
DominionIntroView.prototype.OpenProfilesScreen = function() {

	this.State = this.Specs.STATE.START;
	this.SetProfiles();
	this.DisplayProfiles();
	this.ShowControls();
};
DominionIntroView.prototype.SetProfiles = function() {

	if (this.Randomizer.CheckBoolean()) {		//male first
		this.MaleX = 70;
		this.FemaleX = 210;
	} else {												//female first
		this.FemaleFirstFlag = true;
		this.MaleX = 210;
		this.FemaleX = 70;
	}
};
DominionIntroView.prototype.DisplayProfiles = function() {

	this.DisplayCharacterInfo();
	this.DisplayGameInfo();
};
DominionIntroView.prototype.DisplayCharacterInfo = function() {
	var x;

	this.GraphicsTool.DrawRectangle(50, 50, 300, 300, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(50, 50, 300, 300, "white", 3);

	CharacterGenerator.SetNation(PlayerPower);

	//Male
	CharacterGenerator.SetProfile(this.MaleProfile);
	this.GraphicsTool.DrawRectangle(this.MaleX, 70, 100, 100, "rgb(175,239,255)", 0);
	this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 106, "black", 3);
	CharacterGenerator.Draw(this.MaleX, 70);
	x = (106-StringUtils.GetTextWidth(this.MaleName, null, this.Context))/2;
	this.TextWriter.Write(this.MaleName, this.MaleX+x-3, 188, { COLOUR: "white" } );

	//Female
	CharacterGenerator.SetProfile(this.FemaleProfile);
	this.GraphicsTool.DrawRectangle(this.FemaleX, 70, 100, 100, "rgb(175,239,255)", 0);
	this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 106, "black", 3);
	CharacterGenerator.Draw(this.FemaleX, 70);
	x = (106-StringUtils.GetTextWidth(this.FemaleName, null, this.Context))/2;
	this.TextWriter.Write(this.FemaleName, this.FemaleX+x-3, 188, { COLOUR: "white" } );
};
DominionIntroView.prototype.DisplayGameInfo = function() {

	//Daily game info
	if (Game.Type==DOMINION.GAME.DAILY) {
		this.GraphicsTool.DrawRectangle(60, 235, 125, 100, "white", 2);
		this.GraphicsTool.DrawRectangle(70, 235, 50, 10, this.Specs.COLOUR, 0);
		this.TextWriter.Write("Game", 75, 240, { COLOUR: "white" } );
		if (this.PastGamesFlag) {
			this.TextWriter.Write("Past", 70, 262, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
			//-name of game chosen
		} else {
			this.TextWriter.Write("Daily", 70, 262, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
			this.TextWriter.Write(this.GameInfo, 70, 286, { COLOUR: "white" } );
		}
	}

	//Game options
	this.TextWriter.Write("Votes", 300, 240, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("20", 310, 267, { COLOUR: "white" } );
	this.TextWriter.Write("35", 310, 297, { COLOUR: "white" } );
	this.TextWriter.Write("50", 310, 327, { COLOUR: "white" } );
};
DominionIntroView.prototype.UpdateProfileButtons = function() {

	this.UpdatePickButtons();
	this.UpdateModifyButtons();
};
DominionIntroView.prototype.UpdatePickButtons = function() {

	//Male
	if (this.PickMaleButton.CheckClicked()) {
		this.AdjustProfileButtons();
		if (this.FemaleFirstFlag) {
			this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			this.SelectedName = this.FemaleName;
			this.SelectedProfile = this.FemaleProfile;
			this.LeaderPickedFlag = GENDER.FEMALE;
		} else {
			this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			this.SelectedName = this.MaleName;
			this.SelectedProfile = this.MaleProfile;
			this.LeaderPickedFlag = GENDER.MALE;
		}
	}

	//Female
	if (this.PickFemaleButton.CheckClicked()) {
		this.AdjustProfileButtons();
		if (this.FemaleFirstFlag) {
			this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			this.SelectedName = this.MaleName;
			this.SelectedProfile = this.MaleProfile;
			this.LeaderPickedFlag = GENDER.MALE;
		} else {
			this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 125, this.Specs.COLOUR, 0);
			this.SelectedName = this.FemaleName;
			this.SelectedProfile = this.FemaleProfile;
			this.LeaderPickedFlag = GENDER.FEMALE;
		}
	}
};
DominionIntroView.prototype.UpdateModifyButtons = function() {  //UNLOGGED

	//Male
	if (this.ModifyMaleButton.CheckClicked()) {
		alert ("Feature not yet implemented.");
		return;

		this.State = this.Specs.STATE.MALE;
		setTimeout(this.OpenCharacterCustomizer.bind(this), 100);
		this.ShowControls();
	}

	//Female
	if (this.ModifyFemaleButton.CheckClicked()) {
		alert ("Feature not yet implemented.");
		return;

		this.State = this.Specs.STATE.FEMALE;
		setTimeout(this.OpenCharacterCustomizer.bind(this), 100);
		this.ShowControls();
	}
};
DominionIntroView.prototype.UpdatePastButton = function() {

	if (this.PastButton.CheckClicked()) {
		this.State = this.Specs.STATE.PAST;
		this.MonthsTouchBar.SelectedKey = this.DailyDate.getMonth();
		setTimeout(this.OpenPastGamesScreen.bind(this), 100);
	}
/*
		var days = Calendar.GetDayIndex();
		Calendar.DetermineDate(days);

		var x = 0;
*/
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
DominionIntroView.prototype.StartGame = function() {

	//Set personnel here
	if (Game.Type & DOMINION.GAME.DAILY)
		if (this.PastGameDate)
			this.Randomizer.SetDailySeed(this.PastGameDate);

	Powers.forEach(function(pwr) {pwr.SetPersonnel();});
	AlliedStates.forEach(function(alld) {alld.SetPersonnel();});
	CityStates.forEach(function(cStts) {cStts.SetPersonnel();});

	if (Game.Type & DOMINION.GAME.DAILY)
		this.Randomizer.ResetSeeds();

	PlayerPower.HeadOfState.Name = this.SelectedName;
	PlayerPower.HeadOfState.Profile = this.SelectedProfile;

	switch (Game.Type & 0xF) {
		case DOMINION.GAME.FREeFORM:
			this.Close(this.OpenAssetsView.bind(this), 100);
			break;
		case DOMINION.GAME.DAILY:
		case DOMINION.GAME.MULTiCHOICE:
//			GlobalView.SetConsoleView(TurnConsoleView);
//			this.Close(this.OpenGlobalView.bind(this), 100);
//			this.Close(this.OpenSolicitationView.bind(this), 100);
			this.Close(this.OpenChoiceView.bind(this), 100);
			break;
		case DOMINION.GAME.SURVIVAL:
			this.Close(this.OpenOfficeView.bind(this), 100);
			break;
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
