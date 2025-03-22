
FootballComponents.prototype.CreateLeagueViews = function() {

	LeagueView = new FootballLeagueView();
	LeagueInfoView = new FootballLeagueInfoView();
	LeagueConsoleView = new FootballLeagueConsoleView();
};
FootballComponents.prototype.SetLeagueViews = function() {

	LeagueView.Set(this.Interface.PrimeScape, VIEW.LEAGUE, this.GraphicsTool, this.TextWriter, this.Randomizer);
	LeagueView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	LeagueInfoView.Set(this.Interface.ZoomScape, VIEW.LEAGUE.INFO, LeagueView);
	LeagueInfoView.SetLinks(null, this.TextWriter);
	LeagueConsoleView.SetLinks(null, this.TextWriter);
	LeagueConsoleView.Set(this.Interface.Console, VIEW.LEAGUE.CONSOLE, LeagueView);
//	if (Game.CheckMobile())
		LeagueView.SetSubViews(LeagueInfoView, LeagueConsoleView);
};
FootballComponents.prototype.SetTeamViews = function() {

	TeamView.Set(this.Interface.PrimeScape, VIEW.TEAM);
	TeamView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	TeamInfoView.Set(this.Interface.ZoomScape, VIEW.TEAM.INFO, TeamView);
	TeamInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	if (Game.CheckMobile()) {
		TeamConsoleView.Set(this.Interface.Console, VIEW.TEAM.CONSOLE, TeamView);
		TeamView.SetSubViews(TeamInfoView, TeamConsoleView);
	} else
		TeamView.SetSubViews(TeamInfoView, FormationConsoleView);
};
FootballComponents.prototype.SetFormationViews = function() {

	FormationSubView.SetLinks(this.GraphicsTool, this.TextWriter);
	FormationSubView.Set(this.Interface.PrimeScape, VIEW.FORMATION, TeamView);
	FormationInfoView.Set(this.Interface.ZoomScape, VIEW.FORMATION.INFO, FormationSubView);
	FormationInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	FormationConsoleView.SetLinks(this.GraphicsTool, this.TextWriter);
	FormationConsoleView.Set(this.Interface.Console, VIEW.FORMATION.CONSOLE, FormationSubView);
	FormationSubView.SetSubViews(FormationInfoView, FormationConsoleView);
};
FootballComponents.prototype.SetTransferViews = function() {

	TransferSubView.SetLinks(this.GraphicsTool, this.TextWriter);
	TransferSubView.Set(this.Interface.PrimeScape, VIEW.TRANSFERS, TeamView);
	TransferConsoleView.Set(this.Interface.Console, VIEW.TRANSFERS.CONSOLE, TransferSubView);
	TransferSubView.SetSubViews(null, TransferConsoleView);
};
FootballComponents.prototype.SetHighlightsViews = function() {

	HighlightsView = new MatchHighlightsView();
	HighlightsView.SetLinks(this.GraphicsTool, this.TextWriter);
	HighlightsView.Set(this.Interface.PrimeScape, VIEW.HIGHLIGHTS);
	HighlightsInfoView = new MatchHighlightsInfoView();
	HighlightsInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	HighlightsInfoView.Set(this.Interface.ZoomScape, VIEW.HIGHLIGHTS.INFO, HighlightsView);
	HighlightsConsoleView = new MatchHighlightsConsoleView();
	HighlightsConsoleView.SetLinks(this.GraphicsTool, this.TextWriter);
	HighlightsConsoleView.Set(this.Interface.Console, VIEW.HIGHLIGHTS.CONSOLE, HighlightsView);
	HighlightsView.SetSubViews(HighlightsInfoView, HighlightsConsoleView);
};
FootballComponents.prototype.SetFixturesViews = function() {

	FixturesSubView.SetLinks(this.GraphicsTool, this.TextWriter);
	FixturesSubView.Set(this.Interface.PrimeScape, VIEW.FIXTURES, TeamView);
	FixturesInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	FixturesInfoView.Set(this.Interface.ZoomScape, VIEW.FIXTURES.INFO, TeamView);
	if (Game.CheckMobile())
		FixturesSubView.SetSubViews(FixturesInfoView, TeamConsoleView);
	else
		FixturesSubView.SetSubViews(FixturesInfoView);
};
FootballComponents.prototype.SetOpponentViews = function() {

	OpponentSubView.Set(this.Interface.PrimeScape, VIEW.OPPONENT, TeamView);
	if (Game.CheckMobile()) {
		OpponentInfoView.Set(this.Interface.ZoomScape, VIEW.OPPONENT.INFO, TeamView);
		OpponentInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
		OpponentSubView.SetSubViews(OpponentInfoView, TeamConsoleView);
	}
};
