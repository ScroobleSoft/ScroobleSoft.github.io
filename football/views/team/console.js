
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
			this.MainView.PanelID = this.TabButtonPanel.ButtonPressed;			//REDUNDANT
//			this.MainView.Close(this.OpenPanelView.bind(this), 100);
			this.MainView.CloseAll();
		}

	if (this.MatchButton.CheckClicked()) {
		HighlightsView.SetFixture(this.MainView.Team, League.Week);
		this.MainView.Close(this.OpenHighlightsView.bind(this), 100);
	}
};
FootballTeamConsoleView.prototype.OpenTeamView = function() {  //UNLOGGED

	TeamView.Open();
};
FootballTeamConsoleView.prototype.OpenFormationView = function() {  //UNLOGGED

	FormationSubView.Open();
};
FootballTeamConsoleView.prototype.OpenTransferView = function() {  //UNLOGGED

	TransferSubView.Open();
};
FootballTeamConsoleView.prototype.OpenHighlightsView = function() {

	HighlightsView.Open();
};
