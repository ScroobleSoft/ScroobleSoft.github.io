
//-------------------------------------------------------------
//---------- FOOTBALL TEAM CONSOLE VIEW -----------------------
var FootballTeamConsoleView = function() {
	var TabButtonImages, TabBevelImages, TabButtonPanel, MatchButton;		//mobile
};
FootballTeamConsoleView.prototype = new GenieSubView();
FootballTeamConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
FootballTeamConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {

		//Button panel
		this.TabBevelImages = new GenieImage();
		this.TabBevelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.IMAGE.BEVEL);
		this.TabButtonImages = new GenieImage();
		this.TabButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.BUTTOnPANEL.TAB.IMAGE);
		this.TabButtonPanel = new GenieButtonPanel();
		this.TabButtonPanel.Set(this.Canvas, this.Specs.BUTTOnPANEL.TAB, this.TabBevelImages);
		this.TabButtonPanel.SetButtonPics(this.TabButtonImages);
		this.Controls.push(this.TabButtonPanel);

		//Button
		this.MatchButton = new ImageButton();
		this.MatchButton.Set(this.Canvas, this.Specs.BUTTON.MATCH, ImageManager.Pics[IMAGeINDEX.MOBILE]);
		this.MatchButton.SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.MatchButton);
	}
};
FootballTeamConsoleView.prototype.ShowControls = function() {

	if (Game.CheckMobile()) {
		this.TabButtonPanel.Show();
		this.MatchButton.Show();
	}
};
FootballTeamConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.TabButtonPanel.CheckButtonPressed())
		if (this.TabButtonPanel.ButtonPressed!=this.MainView.PanelID) {
			this.MainView.PanelID = this.TabButtonPanel.ButtonPressed;
			this.MainView.Close(this.OpenPanelView.bind(this), 100);
		}

	if (this.MatchButton.CheckClicked()) {
		HighlightsView.SetFixture(this.MainView.Team, League.Week);
		this.MainView.Close(this.OpenHighlightsView.bind(this), 100);
	}
};
FootballTeamConsoleView.prototype.OpenPanelView = function() {

	switch (this.TabButtonPanel.ButtonPressed) {
		case this.Specs.BUTTOnPANEL.TAB.SQUAD:
			this.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.YOUTH:
			break;
		case this.Specs.BUTTOnPANEL.TAB.FORMATION:
			FormationSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.TACTICS:
			TacticsSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.TRAINING:
			TrainingSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.TRANSFERS:
			TransferSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.OPPONENT:
			OpponentSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.FIXTURES:
			FixturesSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.TABLES:
			TableSubView.Open();
			break;
		case this.Specs.BUTTOnPANEL.TAB.STATS:
			StatsSubView.Open();
			break;
	}

	Game.Interface.ResumeInput();
};
FootballTeamConsoleView.prototype.OpenHighlightsView = function() {

	HighlightsView.Open();
};
