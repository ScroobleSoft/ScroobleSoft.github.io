
//-------------------------------------------------
//---------- OCTAGONAL NATIONS --------------------
var OctagonalNations = function () {
	var CalcPad;
	var ScreenRect;

	var Type, DailyDate;
	var Turn, Fortnight, Phase, TurnLimit;  //TODO: replace .Turn with .Fortnight
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

	this.DailyDate = DOMINION.DATE;
	this.Turn = 1;
	this.Fortnight = 0;
	this.Phase = 0;
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
		IntroView.Open();
		IntroView.Update();
		IntroView.ConsoleView.DeActivateControls();
		this.Randomizer.SetDailySeed(DOMINION.DATE);
	} else
		GlobalView.Update();
};
