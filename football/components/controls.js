
FootballComponents.prototype.CreateIntroControls = function() {

	NewGameButton = new ImageButton();
	TutorialButton = new ImageButton();
	DemoButton = new ImageButton();
	MiniGamesButton = new ImageButton();

	FeaturedGameButton = new ImageButton();
	DailyGameButton = new ImageButton();
	WeeklyGameButton = new ImageButton();
	RandomGameButton = new ImageButton();
};
FootballComponents.prototype.SetIntroControls = function() {

	NewGameButton.Set(this.Interface.ZoomScape, NEwGAMeBUTTOnMEDIUmIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	TutorialButton.Set(this.Interface.ZoomScape, TUTORIAlBUTTOnMEDIUmIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	DemoButton.Set(this.Interface.ZoomScape, DEMoBUTTOnMEDIUmIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	MiniGamesButton.Set(this.Interface.ZoomScape, MINiGAMEsBUTTOnMEDIUmIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);

	FeaturedGameButton.Set(this.Interface.Console, FEATUREdBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	DailyGameButton.Set(this.Interface.Console, DAILyBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	WeeklyGameButton.Set(this.Interface.Console, WEEKLyBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	RandomGameButton.Set(this.Interface.Console, RANDOmBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
FootballComponents.prototype.CreateFormationControls = function() {

	//UNLOGGED

	AutoSelectButton = new TextButton();
	ClearSelectionsButton = new TextButton();
	SubsCheckBox = new GenieCheckBox();
	OpponentCheckBox = new GenieCheckBox();
};
FootballComponents.prototype.SetFormationControls = function() {

	//UNLOGGED

	AutoSelectButton.Set(this.Interface.PrimeScape, AUToSELECtBUTTON, this.TextWriter);
	ClearSelectionsButton.Set(this.Interface.PrimeScape, CLEArSELECTIONsBUTTON, this.TextWriter);
	SubsCheckBox.Set(this.Interface.PrimeScape, SUBsCHECkBOX, CheckBoxImage);
	SubsCheckBox.SetLinks(null, this.TextWriter);
	OpponentCheckBox.Set(this.Interface.PrimeScape, OPPONENtCHECkBOX, CheckBoxImage);
	OpponentCheckBox.SetLinks(null, this.TextWriter);
};
