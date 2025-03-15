
//----------------------------------------------------------
//---------- FOOTBALL FIXTURES SUB VIEW --------------------
var FootballFixturesSubView = function() {
	var ToggleIconPanel;
	var League, Team;
	var Clicked;
	var LeagueSymbol;
	var DiamondCupSymbol, EmeraldCupSymbol, RubyCupSymbol, SapphireCupSymbol;
	var Indent;

	var info;
};
FootballFixturesSubView.prototype = new GenieNestedView();
FootballFixturesSubView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

	if (Game.CheckMobile())
		this.Indent = 0;
	else
		this.Indent = 400;
};
FootballFixturesSubView.prototype.SetImages = function() {

	this.LeagueSymbol = new GenieImage();
	this.LeagueSymbol.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LEAGUeSYMBOL);
	this.DiamondCupSymbol = new GenieImage();
	this.DiamondCupSymbol.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIAMONdCUpSYMBOL);
	this.EmeraldCupSymbol = new GenieImage();
	this.EmeraldCupSymbol.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.EMERALdCUpSYMBOL);
	this.RubyCupSymbol = new GenieImage();
	this.RubyCupSymbol.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.RUByCUpSYMBOL);
	this.SapphireCupSymbol = new GenieImage();
	this.SapphireCupSymbol.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SAPPHIReCUpSYMBOL);
};
FootballFixturesSubView.prototype.SetControls = function() {

	if (Game.CheckMobile())
		this.ToggleIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.TOGGLE, this.Specs.ICOnPANEL.TOGGLE.IMAGE, IconCornerImages, this.GraphicsTool);
};
FootballFixturesSubView.prototype.ShowControls = function() {

	if (Game.CheckMobile())
		this.ToggleIconPanel.Show();
};
FootballFixturesSubView.prototype.SetTeam = function(team) {

	this.Team = team;
};
FootballFixturesSubView.prototype.Open = function() {
	GenieNestedView.prototype.Open.call(this);

	this.InfoView.Open();
	if (this.ConsoleView)	//TODO: temp patch
		this.ConsoleView.Open();

	this.Update();
};
FootballFixturesSubView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Game.CheckMobile())
		if (this.ToggleIconPanel.CheckMouseDown()) {
			this.ColourScape();
			this.Draw();
			this.ShowControls();
		}
	this.InfoView.Update();
	if (this.ConsoleView)	//TODO: temp patch
		this.ConsoleView.Update();
};
FootballFixturesSubView.prototype.Draw = function() {  //TODO: more fixture entries displayed in desktop view

	switch (this.InfoView.FixturesIconPanel.DepressedIcon) {
		case FIXTURES.SEASON:
			 this.DisplaySeasonFixtures();
			 break;
		case FIXTURES.NEXT10:
			 this.DisplayNext10Fixtures();
			 break;
		case FIXTURES.LEAGUE:
			 this.DisplayLeagueFixtures();
			 break;
		case FIXTURES.CUPS:
			 this.DisplayCupFixtures();
			 break;
		case FIXTURES.DIAMOND:
			 this.DisplayDiamondFixtures();
			 break;
		case FIXTURES.EMERALD:
			 this.DisplayEmeraldFixtures();
			 break;
		case FIXTURES.RUBY:
			 this.DisplayRubyFixtures();
			 break;
		case FIXTURES.SAPPHIRE:
			 this.DisplaySapphireFixtures();
			 break;
	}
};
FootballFixturesSubView.prototype.ColourScape = function() {

	if (!Game.CheckMobile())
		return;

	GenieNestedView.prototype.ColourScape.call(this);
};
