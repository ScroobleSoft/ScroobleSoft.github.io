
SolarComponents.prototype.CreateIntroViews = function() {

	IntroView = new SolarIntroView();
	IntroInfoView = new SolarIntroInfoView();
	IntroConsoleView = new SolarIntroConsoleView();
};
SolarComponents.prototype.SetIntroViews = function() {

	IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
	IntroInfoView.Set(this.Interface.ZoomScape, VIEW.INTRO.INFO, IntroView);
	IntroConsoleView.SetLinks(null, this.TextWriter, this.Randomizer);
	IntroConsoleView.Set(this.Interface.Console, VIEW.INTRO.CONSOLE, IntroView);
	IntroView.SetSubViews(IntroInfoView, IntroConsoleView);
};
SolarComponents.prototype.CreateCockpitViews = function() {
	
	CockpitInfoView = new SolarCockpitInfoView();
	CockpitConsoleView = new SolarCockpitConsoleView();
};
SolarComponents.prototype.SetCockpitViews = function() {

	CockpitInfoView.SetLinks(this.GraphicsTool);
	CockpitInfoView.Set(this.Interface.ZoomScape, VIEW.COCKPIT.INFO, VoyageView);
	CockpitConsoleView.SetLinks(this.GraphicsTool);
	CockpitConsoleView.Set(this.Interface.Console, VIEW.COCKPIT.CONSOLE, VoyageView);
};
SolarComponents.prototype.CreateCourierViews = function() {  //UNLOGGED

	CourierView = new SolarCourierView();
	CourierInfoView = new SolarCourierInfoView();
	CourierConsoleView = new SolarCourierConsoleView();
};
SolarComponents.prototype.SetCourierViews = function() {  //UNLOGGED

	CourierView.SetLinks(this.GraphicsTool, this.TextWriter);
	CourierView.Set(this.Interface.PrimeScape, VIEW.COURIER);
	CourierInfoView.Set(this.Interface.ZoomScape, VIEW.COURIER.INFO, CourierView);
	CourierConsoleView.Set(this.Interface.Console, VIEW.COURIER.CONSOLE, CourierView);
	CourierView.SetSubViews(CourierInfoView, CourierConsoleView);
};
SolarComponents.prototype.CreateDockedViews = function() {

	DockedView = new SolarDockedView();
	DockedInfoView = new SolarDockedInfoView();
	DockedConsoleView = new SolarDockedConsoleView();
};
SolarComponents.prototype.SetDockedViews = function() {

	DockedView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	DockedView.Set(this.Interface.PrimeScape, VIEW.DOCKED);
	DockedInfoView.SetLinks(this.GraphicsTool);
	DockedInfoView.Set(this.Interface.ZoomScape, VIEW.DOCKED.INFO, DockedView);
	DockedConsoleView.SetLinks(null, this.TextWriter);
	DockedConsoleView.Set(this.Interface.Console, VIEW.DOCKED.CONSOLE, DockedView);
	DockedView.SetSubViews(DockedInfoView, DockedConsoleView);
};
SolarComponents.prototype.CreateJumpViews = function() {  //UNLOGGED

	JumpView = new SolarJumpView();
	JumpInfoView = new SolarJumpInfoView();
	JumpConsoleView = new SolarJumpConsoleView();
};
SolarComponents.prototype.SetJumpViews = function() {  //UNLOGGED

	JumpView.SetLinks(this.GraphicsTool, this.TextWriter);
	JumpView.Set(this.Interface.PrimeScape, VIEW.JUMP);
	JumpInfoView.Set(this.Interface.ZoomScape, VIEW.JUMP.INFO, JumpView);
	JumpConsoleView.Set(this.Interface.Console, VIEW.JUMP.CONSOLE, JumpView);
	JumpView.SetSubViews(JumpInfoView, JumpConsoleView);
};
SolarComponents.prototype.CreateTradeViews = function() {

	TradeView = new SolarTradeView();
	TradeInfoView = new SolarTradeInfoView();
	TradeConsoleView = new SolarTradeConsoleView();
};
SolarComponents.prototype.SetTradeViews = function() {

	TradeView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	TradeView.Set(this.Interface.PrimeScape, VIEW.TRADE);
	TradeInfoView.Set(this.Interface.ZoomScape, VIEW.TRADE.INFO, TradeView);
	TradeConsoleView.SetLinks(this.GraphicsTool);
	TradeConsoleView.Set(this.Interface.Console, VIEW.TRADE.CONSOLE, TradeView);
	TradeView.SetSubViews(TradeInfoView, TradeConsoleView);
};
SolarComponents.prototype.SetVoyageViews = function() {

	VoyageView.Set(this.Interface.PrimeScape, VIEW.VOYAGE);
	VoyageView.SetSubViews(CockpitInfoView, CockpitConsoleView);
};
SolarComponents.prototype.CreateWordViews = function() {  //UNLOGGED
	
	WordsInfoView = new SolarWordsInfoView();
	WordsConsoleView = new SolarWordsConsoleView();
};
SolarComponents.prototype.SetWordViews = function() {  //UNLOGGED

	WordsInfoView.SetLinks(this.GraphicsTool);
	WordsInfoView.Set(this.Interface.ZoomScape, VIEW.WORDS.INFO, VoyageView);
	WordsConsoleView.SetLinks(this.GraphicsTool);
	WordsConsoleView.Set(this.Interface.Console, VIEW.WORDS.CONSOLE, VoyageView);
};
