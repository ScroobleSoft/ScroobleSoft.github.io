
//-------------------------------------------------
//---------- OCTAGONAL NATIONS --------------------
var OctagonalNations = function () {
	var CalcPad;
	var ScreenRect;

	var Type;
	var Turn, Fortnight, Week, Day, Phase, TurnLimit;
	var DailyCharacters;
};
OctagonalNations.prototype = new GenieGame();
OctagonalNations.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
	this.ScreenRect.Set((MAP.W-SCREEN.WIDTH)/2, (MAP.H-SCREEN.HEIGHT)/2, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.Settings = GAME.PLATFORM.PC;
	this.Settings += GAME.SCREEN.NORMAL + GAME.SCREEN.BROWSER;
	this.Settings += GAME.STATE.RUNNING;
	this.Components = new DominionComponents();

	this.Turn = 1;
	this.Fortnight = 1;
	this.Week = 1;
	this.Day = 1;
	this.Phase = 1;
};
OctagonalNations.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
};
OctagonalNations.prototype.Start = function() {

	//TODO: possibly an options screen first

	Powers.forEach(function(pwr){pwr.Generate();});
	AlliedStates.forEach(function(alld){alld.Generate();});
	CityStates.forEach(function(cty){cty.Generate();});

	GlobalView.SetNation(PlayerPower);
	GlobalView.Open();
	if (Game.CheckMobile()) {
		GlobalView.Disable();
//		this.Randomizer.SetDailySeed(DOMINION.DATE);
		this.SetDaily(DOMINION.DATE);
		IntroView.Open();
		IntroView.Update();
		IntroView.ConsoleView.DeActivateControls();
	} else
		GlobalView.Update();
};
