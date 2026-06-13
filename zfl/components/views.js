
GridironComponents.prototype.CreateIntroViews = function() {

	IntroView = new GridironIntroView();
	IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
	IntroInfoView = new GridironIntroInfoView();
	IntroInfoView.Set(this.Interface.ZoomScape, VIEW.INTRO.INFO, IntroView);
	IntroConsoleView = new GridironIntroConsoleView();
	IntroConsoleView.Set(this.Interface.Console, VIEW.INTRO.CONSOLE, IntroView);
	IntroView.SetSubViews(IntroInfoView, IntroConsoleView);
};
GridironComponents.prototype.CreatePhoneViews = function() {

	RosterView = new GridironRosterView();
	RosterView.Set(this.Interface.PrimeScape, VIEW.ROSTER);
	GridderInfoView = new GridironGridderInfoView();
	GridderInfoView.Set(this.Interface.ZoomScape, VIEW.GRIDDER, RosterView);
	SquadConsoleView = new GridironSquadConsoleView();
	SquadConsoleView.Set(this.Interface.Console, VIEW.SQUAD, RosterView);
	RosterView.SetSubViews(GridderInfoView, SquadConsoleView);
	PrioritiesConsoleView = new NeedPrioritiesConsoleView();
	PrioritiesConsoleView.Set(this.Interface.Console, VIEW.PRIORITIES, RosterView);
};
GridironComponents.prototype.CreateDraftViews = function() {

	DraftPreview = new GridironDraftPreview();
	DraftPreview.Set(this.Interface.PrimeScape, VIEW.DRAFT.PREVIEW, this.GraphicsTool, this.TextWriter);
	DraftPreview.SetSubScapes(null, this.Interface.Console);
//	DraftPreview.SetSubViews(DraftInfoView, DraftConsoleView);
	DraftProspectsView = new GridironDraftProspectsView();
	DraftProspectsView.Set(this.Interface.PrimeScape, VIEW.PROSPECTS);
	ProspectsConsoleView = new GridironProspectsConsoleView();
	ProspectsConsoleView.Set(this.Interface.Console, VIEW.PROSPECTS.CONSOLE, DraftProspectsView);
	DraftProspectsView.SetSubViews(GridderInfoView, ProspectsConsoleView);
	DraftView = new GridironDraftView();
	DraftView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	DraftView.Set(this.Interface.PrimeScape, VIEW.DRAFT);
	DraftInfoView = new GridironDraftInfoView();
	DraftInfoView.Set(this.Interface.ZoomScape, VIEW.DRAFT.INFO, DraftView);
	DraftInfoView.SetLinks(null, this.TextWriter);
	DraftConsoleView = new GridironDraftConsoleView();
	DraftConsoleView.SetLinks(this.GraphicsTool, this.TextWriter);
	DraftConsoleView.Set(this.Interface.Console, VIEW.DRAFT.CONSOLE, DraftView);
	DraftView.SetSubViews(DraftInfoView, DraftConsoleView);
	DraftView.SetDraft(Draft);
	MarkedDialogView = new MarkedProspectsDialogView();
	MarkedDialogView.Set(this.Interface.PrimeScape, VIEW.MARKED, DraftProspectsView);
};
GridironComponents.prototype.CreateSeasonViews = function() {

	//Main view
	SeasonView = new GridironSeasonView();
	SeasonView.Set(this.Interface.PrimeScape, VIEW.SEASON);
	SeasonInfoView = new GridironSeasonInfoView();
	SeasonInfoView.Set(this.Interface.ZoomScape, VIEW.SEASON.INFO, SeasonView);
	SeasonConsoleView = new GridironSeasonConsoleView();
	SeasonConsoleView.Set(this.Interface.Console, VIEW.SEASON.CONSOLE, SeasonView);
	SeasonView.SetSubViews(SeasonInfoView, SeasonConsoleView);

	//Match-Ups
	MatchUpsView = new GridironMatchUpsView();
	MatchUpsView.Set(this.Interface.PrimeScape, VIEW.MATChUPs);
	ExitConsoleView = new MatchUpsExitConsoleView();
	ExitConsoleView.Set(this.Interface.Console, VIEW.EXIT, MatchUpsView);
	MatchUpsView.SetSubViews(SeasonInfoView, ExitConsoleView);

	//Match stats
	StatsView = new MatchStatsView();
	StatsView.Set(this.Interface.PrimeScape, VIEW.MATCH.STATS);
	StatsInfoView = new MatchStatsInfoView();
	StatsInfoView.Set(this.Interface.ZoomScape, VIEW.MATCH.STATS.INFO, StatsView);
	StatsConsoleView = new MatchStatsConsoleView();
	StatsConsoleView.Set(this.Interface.Console, VIEW.MATCH.STATS.CONSOLE, StatsView);
	StatsView.SetSubViews(StatsInfoView, StatsConsoleView);
};
GridironComponents.prototype.CreateMatchViews = function() {

	MatchView = new GridironMatchView();
	MatchView.Set(this.Interface.PrimeScape, VIEW.MATCH);
	MatchInfoView = new GridironMatchInfoView();
	MatchInfoView.Set(this.Interface.ZoomScape, VIEW.MATCH.INFO, MatchView);
	MatchConsoleView = new GridironMatchConsoleView();
	MatchConsoleView.Set(this.Interface.Console, VIEW.MATCH.CONSOLE, MatchView);
	MatchView.SetSubViews(MatchInfoView, MatchConsoleView);
};
