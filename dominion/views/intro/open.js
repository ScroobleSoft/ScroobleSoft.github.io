
DominionIntroView.prototype.ShowOpenControls = function() {

	this.DailyButton.Show();
	this.FreeFormButton.Show();
	this.MultiChoiceButton.Show();
	this.SurvivalButton.Show();
	this.GuideButton.Show();
	this.InfoButton.Show();
};
DominionIntroView.prototype.UpdatePlayButtons = function() {

	if (this.DailyButton.CheckClicked()) {
		Game.Type = DOMINION.GAME.DAILY;
		this.SetPersonnel();
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

	if (Game.Type==DOMINION.GAME.DAILY) {
		this.MaleName = Game.DailyCharacters[Game.DailyCharacters.length-1].Male.Name;
		this.MaleProfile = Game.DailyCharacters[Game.DailyCharacters.length-1].Male.Profile;
		this.FemaleName = Game.DailyCharacters[Game.DailyCharacters.length-1].Female.Name;
		this.FemaleProfile = Game.DailyCharacters[Game.DailyCharacters.length-1].Female.Profile;
	} else {
		this.MaleName = CharacterGenerator.GenerateMaleName();
		this.MaleProfile = CharacterGenerator.GenerateMaleProfile();
		this.FemaleName = CharacterGenerator.GenerateFemaleName();
		this.FemaleProfile = CharacterGenerator.GenerateFemaleProfile();
	}
};
