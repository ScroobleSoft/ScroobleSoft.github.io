
EmpireComponents.prototype.CreateIntroViews = function() {

	IntroView = new EmpireIntroView();
	IntroView.Set(GameScape.PrimeScape, VIEW.INTRO);
	IntroInfoView = new ImperialIntroInfoView();
	IntroInfoView.Set(GameScape.ZoomScape, VIEW.INTRO.INFO, IntroView);
	IntroConsoleView = new ImperialIntroConsoleView();
	IntroConsoleView.Set(GameScape.Console, VIEW.INTRO.CONSOLE, IntroView);
	IntroView.SetSubViews(IntroInfoView, IntroConsoleView);
};
EmpireComponents.prototype.CreateBattleViews = function() {

	BattleView = new ImperialBattleView();
	BattleView.Set(GameScape.PrimeScape, VIEW.BATTLE);
	BattleInfoView = new ImperialBattleInfoView();
	BattleInfoView.Set(GameScape.ZoomScape, VIEW.BATTLE.INFO, BattleView);
	BattleConsoleView = new ImperialBattleConsoleView();
	BattleConsoleView.Set(GameScape.Console, VIEW.BATTLE.CONSOLE, BattleView);
	BattleView.SetSubViews(BattleInfoView, BattleConsoleView);
};
EmpireComponents.prototype.CreateClashViews = function() {

	//Play
	RegimentClashView = new ImperialClashView();
	RegimentClashView.Set(GameScape.PrimeScape, VIEW.CLASH);
	RegimentClashInfoView = new ImperialClashInfoView();
	RegimentClashInfoView.Set(GameScape.ZoomScape, VIEW.CLASH.INFO, RegimentClashView);
	RegimentClashConsoleView = new ImperialClashConsoleView();
	RegimentClashConsoleView.Set(GameScape.Console, VIEW.CLASH.CONSOLE, RegimentClashView);
	RegimentClashView.SetSubViews(RegimentClashInfoView, RegimentClashConsoleView);

	//Sim
	ClashSimView = new RegimentClashSimView();
	ClashSimView.Set(GameScape.PrimeScape, VIEW.SIM.CLASH);
};
EmpireComponents.prototype.CreateSkirmishViews = function() {  //UNLOGGED

	BattalionSkirmishView = new ImperialSkirmishView();
	BattalionSkirmishView.Set(GameScape.PrimeScape, VIEW.BATTALION);

	//Sim
};
EmpireComponents.prototype.CreateMeleeViews = function() {  //UNLOGGED

	SquadMeleeView = new ImperialMeleeView();
	SquadMeleeView.Set(GameScape.PrimeScape, VIEW.SQUAD);

	//Sim
};
EmpireComponents.prototype.CreateCombatViews = function() {  //UNLOGGED

	SoldierCombatView = new ImperialCombatView();
	SoldierCombatView.Set(GameScape.PrimeScape, VIEW.SOLDIER);

	//Sim
};
