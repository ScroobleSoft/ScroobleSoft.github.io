
//-------------------------------------------
//---------- EMPIRE GAME --------------------
var EmpireGame = function () {
};
EmpireGame.prototype = new GenieNewGame();
EmpireGame.prototype.Set = function() {
	GenieNewGame.prototype.Set.call(this);

	this.Components = new EmpireComponents();
	GAME.TILES = true;		//TEMP HACK for GenieAgent::Set, which will eventually rely on .TILES: true being a field in Agent Specs
};
EmpireGame.prototype.SetMobile = function() {  //UNLOGGED
	GenieNewGame.prototype.SetMobile.call(this);

	BATTLeFIELD.W = BATTLeFIELD.MOBILE.W;
	BATTLeFIELD.H = BATTLeFIELD.MOBILE.H;
	BATTLeFIELD.REGION = BATTLeFIELD.MOBILE.REGION;
	BATTLeFIELD.REGIONS = BATTLeFIELD.MOBILE.REGIONS;
	ARMY.COMMAND = ARMY.COMMAND.MOBILE;
};
