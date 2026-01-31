
TacticalComponents.prototype.CreateIntroViews = function() {

	IntroView = new TacticalIntroView();
	TutorialInfoView = new TacticalTutorialInfoView();
	DocsConsoleView = new TacticalDocsConsoleView();
	OptionsView = new GameOptionsView();
	DailyView = new DailyGameView();
};
TacticalComponents.prototype.SetIntroViews = function() {

	IntroView.SetLinks(null, this.TextWriter);
	IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
	TutorialInfoView.Set(this.Interface.ZoomScape, VIEW.TUTORIAL, IntroView);
	DocsConsoleView.Set(this.Interface.Console, VIEW.DOCS, IntroView);
	IntroView.SetSubViews(TutorialInfoView, DocsConsoleView);
	OptionsView.Set(this.Interface.PrimeScape, VIEW.OPTIONS);
	DailyView.Set(this.Interface.PrimeScape, VIEW.DAILY);
};
TacticalComponents.prototype.CreateDocumentationViews = function() {

	GuideView = new TacticalGuideView();
	GuideInfoView = new TacticalGuideInfoView();
	GuideConsoleView = new TacticalGuideConsoleView();
	HelpView = new TacticalHelpView();
	HelpInfoView = new TacticalHelpInfoView();
	HelpConsoleView = new TacticalHelpConsoleView();
	FAQView = new TacticalFAQView();
	FAQInfoView = new TacticalFAQInfoView();
	FAQConsoleView = new TacticalFAQConsoleView();
	UnitsView = new TacticalUnitsView();
	UnitsInfoView = new TacticalUnitsInfoView();
	UnitsConsoleView = new TacticalUnitsConsoleView();
};
TacticalComponents.prototype.SetDocumentationViews = function() {

	GuideView.Set(this.Interface.PrimeScape, VIEW.GUIDE);
	GuideInfoView.Set(this.Interface.ZoomScape, VIEW.GUIDE.INFO, GuideView);
	GuideConsoleView.Set(this.Interface.ControlPanel, VIEW.GUIDE.CONSOLE, GuideView);
	GuideView.SetSubViews(GuideInfoView, GuideConsoleView);
	HelpView.Set(this.Interface.PrimeScape, VIEW.HELP);
	HelpInfoView.Set(this.Interface.ZoomScape, VIEW.HELP.INFO, HelpView);
	HelpConsoleView.Set(this.Interface.ControlPanel, VIEW.HELP.CONSOLE, HelpView);
	HelpView.SetSubViews(HelpInfoView, HelpConsoleView);
	FAQView.Set(this.Interface.PrimeScape, VIEW.FAQ);
	FAQInfoView.Set(this.Interface.ZoomScape, VIEW.FAQ.INFO, FAQView);
	FAQConsoleView.Set(this.Interface.ControlPanel, VIEW.FAQ.CONSOLE, FAQView);
	FAQView.SetSubViews(FAQInfoView, FAQConsoleView);
	UnitsView.Set(this.Interface.PrimeScape, VIEW.UNITS);
	UnitsInfoView.Set(this.Interface.ZoomScape, VIEW.UNITS.INFO, UnitsView);
	UnitsConsoleView.Set(this.Interface.ControlPanel, VIEW.UNITS.CONSOLE, UnitsView);
	UnitsView.SetSubViews(UnitsInfoView, UnitsConsoleView);
};
