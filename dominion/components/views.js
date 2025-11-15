
DominionComponents.prototype.CreateGlobalViews = function() {

	GlobalView = new DominionGlobalView();

	GazetteerInfoView = new DominionGazetteerInfoView();
	VotesInfoView = new DominionVotesInfoView();
	BudgetInfoView = new DominionBudgetInfoView();
	ReservesInfoView = new DominionReservesInfoView();
	DiplomacyInfoView = new DominionRelationsInfoView();
	CashInfoView = new DominionCashInfoView();
	ArmsInfoView = new DominionArmsInfoView();
	EventsInfoView = new DominionEventsInfoView();

	ActionConsoleView = new DominionActionConsoleView();
};
DominionComponents.prototype.SetGlobalViews = function() {

	GazetteerInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	GazetteerInfoView.Set(this.Interface.ZoomScape, VIEW.GAZETTEER, GlobalView);

	//Info sub-views
	VotesInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	VotesInfoView.Set(this.Interface.ZoomScape, VIEW.VOTES, GlobalView);
	BudgetInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	BudgetInfoView.Set(this.Interface.ZoomScape, VIEW.BUDGET, GlobalView);
	ReservesInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	ReservesInfoView.Set(this.Interface.ZoomScape, VIEW.RESERVES, GlobalView);
	DiplomacyInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	DiplomacyInfoView.Set(this.Interface.ZoomScape, VIEW.DIPLOMACY, GlobalView);
	CashInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	CashInfoView.Set(this.Interface.ZoomScape, VIEW.CASH, GlobalView);
	ArmsInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	ArmsInfoView.Set(this.Interface.ZoomScape, VIEW.ARMS, GlobalView);
	EventsInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	EventsInfoView.Set(this.Interface.ZoomScape, VIEW.EVENTS, GlobalView);
	ActionConsoleView.SetLinks(this.GraphicsTool);
	ActionConsoleView.Set(this.Interface.Console, VIEW.ACTION, GlobalView);

	GlobalView.SetLinks(this.GraphicsTool, this.TextWriter);
	GlobalView.Set(this.Interface.PrimeScape, VIEW.GLOBAL);
	GlobalView.SetSubViews(GazetteerInfoView, ActionConsoleView);
};
DominionComponents.prototype.SetIntroViews = function() {

	IntroView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
	IntroView.SetSubViews(GazetteerInfoView, ActionConsoleView);
};
DominionComponents.prototype.SetFinancialViews = function() {

	AssetsView.SetLinks(null, this.TextWriter);
	AssetsView.Set(this.Interface.PrimeScape, VIEW.ASSETS);
	AssetsView.SetSubViews(BudgetInfoView);
	ForcesView.SetLinks(null, this.TextWriter);
	ForcesView.Set(this.Interface.PrimeScape, VIEW.FORCES);
	BondsView.SetLinks(null, this.TextWriter);
	BondsView.Set(this.Interface.PrimeScape, VIEW.BONDS);
	InvestmentView.SetLinks(this.GraphicsTool, this.TextWriter);
	InvestmentView.Set(this.Interface.PrimeScape, VIEW.INVESTMENT);
};
DominionComponents.prototype.SetTurnViews = function() {

	SolicitationView.SetLinks(null, null, this.Randomizer);
	SolicitationView.Set(this.Interface.PrimeScape, VIEW.SOLICITATION);
	SolicitationInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	SolicitationInfoView.Set(this.Interface.ZoomScape, VIEW.SOLICITATION.INFO);
	TurnConsoleView = new DominionTurnConsoleView();
	TurnConsoleView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	TurnConsoleView.Set(this.Interface.Console, VIEW.TURN, SolicitationView);
	SolicitationView.SetSubViews(GazetteerInfoView, TurnConsoleView);					//TODO: TurnConsoleView to be replaced by PhasesConsoleView (or such)
	ChoiceView = new DominionChoiceView();
	ChoiceView.Set(this.Interface.PrimeScape, VIEW.CHOICE);
	ChoiceInfoView = new DominionChoiceInfoView();
	ChoiceInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	ChoiceInfoView.Set(this.Interface.ZoomScape, VIEW.CHOICE.INFO, ChoiceView);
//	ChoiceView.SetSubViews(ChoiceInfoView, TurnConsoleView);
	ChoiceView.SetSubViews(GazetteerInfoView, TurnConsoleView);
	TurnConsoleView.MainView = ChoiceView;									//TODO: HACK! (see above)
};
DominionComponents.prototype.SetOfficeViews = function() {

	OfficeView.SetLinks(this.GraphicsTool, this.TextWriter);
	OfficeView.Set(this.Interface.PrimeScape, VIEW.OFFICE);
	OfficeInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	OfficeInfoView.Set(this.Interface.ZoomScape, VIEW.OFFICE, OfficeView);
	OfficeView.SetSubViews(OfficeInfoView, DocumentationConsoleView);
};
DominionComponents.prototype.SetGuideViews = function() {  //UNLOGGED

	GuideView = new DominionGuideView();
	GuideView.SetLinks(this.GraphicsTool, this.TextWriter);
	GuideView.Set(this.Interface.PrimeScape, VIEW.GUIDE);
	GuideInfoView = new DominionGuideInfoView();
	GuideInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
	GuideInfoView.Set(this.Interface.ZoomScape, VIEW.GUIDE.INFO);
	GuideView.SetSubViews(GuideInfoView, DocumentationConsoleView);
};
