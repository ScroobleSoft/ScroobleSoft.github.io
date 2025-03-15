/*
 ** MouseDown, not MouseClick
*/
//--------------------------------------------------
//---------- FOOTBALL TEAM VIEW --------------------
var FootballTeamView = function() {
	var Team;
	var Tabs;
	var TabView, PanelID;
};
FootballTeamView.prototype = new GenieView();
FootballTeamView.prototype.Set = function(cnvs, specs) { //(cntxt, iBox, cPanel, gTool, tWriter, rGenerator) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Tabs.SelectionIndex = this.Specs.TABS.FORMATION;
	this.NestedView = SquadView;
	this.PanelID = this.Specs.CONSOLE.BUTTOnPANEL.TAB.SQUAD;
};
FootballTeamView.prototype.SetControls = function() {
	//UNLOGGED
	this.Tabs = new GenieMultiColouredTabs();
	this.Tabs.Set(this.Canvas, this.Specs.TABS, this.Specs.IMAGE.TABS);
	this.Controls.push(this.Tabs);
};
FootballTeamView.prototype.SetTeam = function(team) {

	this.Team = team;
	SquadView.SetSquad(this.Team.Squad);
	YouthView.SetAcademy(this.Team.YouthTeam);
	FormationSubView.SetTeam(this.Team);
	FixturesSubView.SetTeam(this.Team);
	OpponentSubView.SetTeam(this.Team);
	OpponentSubView.SetLinks(this.GraphicsTool, this.TextWriter);
	this.InfoView.SetFootballer(this.Team.Squad.Goalkeepers[0]);
/* TODO: KickOffButton has been RE-DESIGNED, but the following steps need to be followed to implement (and test) it-
		KickOffButton = new FootballKickOffButton();	in Components.js
	-the background image needs to be switched in scratch.png (will be moved to FootballControls.png once it's working)
	-::IndexedReColour and ::IndexedReColourState in AnimatedCompositeSprite are untested (and likely need to DE-BUGGED)
*/
};
FootballTeamView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	if (!Game.CheckMobile())
		this.OpenTabSelected();
};
FootballTeamView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

		if (this.Tabs.CheckTabChanged()) {
//	 this.TabView.Close();
			this.OpenTabSelected();
			return;
		}

		//Pass mouse clicks to appropriate view depending on location and/or tab selected
		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
			if (Mouse.Click.X<400)
				SquadView.Clicked();
			else
				this.TabView.Clicked = true;
		}
/*
		if (KickOffButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
			MatchUpSim.Simulate();
//			MatchSideView.Operate();
		}
*/
		if (this.TabView)
			this.TabView.Update();

		GenieView.prototype.Update.call(this);

//		Mouse.ClearClicks();
};
/*
FootballTeamView.prototype.Close = function() {

		//UNLOGGED

		TeamViewTabs.Hide();
		this.TabView.Close();
		KickOffButton.Close();
};
*/
FootballTeamView.prototype.OpenTabSelected = function() {

	switch (this.Tabs.SelectedTab) {
		/*
		case TEAmVIEW.TAB.ACADEMY:
			YouthView.Open();
			this.TabView = YouthView;
			break;
			*/
		case this.Specs.TABS.FORMATION:
			FormationSubView.Open();
			this.TabView = FormationSubView;
			break;
		case this.Specs.TABS.TRAINING:
			TrainingSubView.Open();
			this.TabView = TrainingSubView;
			break;
		case this.Specs.TABS.TACTICS:
			TacticsSubView.Open();
			this.TabView = TacticsSubView;
			break;
		case this.Specs.TABS.TRANSFERS:
			TransferSubView.Open();
			this.TabView = TransferSubView;
			break;
		case this.Specs.TABS.FIXTURES:
			FixturesSubView.Open();
			this.TabView = FixturesSubView;
			break;
		case this.Specs.TABS.OPPONENT:
			OpponentSubView.Open();
			this.TabView = OpponentSubView;
			break;
		case this.Specs.TABS.TABLES:
			TableSubView.Open();
			this.TabView = TableSubView;
			break;
		case this.Specs.TABS.STATS:
			StatsSubView.Open();
			this.TabView = StatsSubView;
			break;
	}
};
