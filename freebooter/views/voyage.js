
//-------------------------------------------------
//---------- SOLAR VOYAGE VIEW --------------------
var SolarVoyageView = function() {
	var DestinationPlanet;
	var State;

	var i;
};
SolarVoyageView.prototype = new GenieView();
SolarVoyageView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.LAUNCHING;
};
SolarVoyageView.prototype.SetDestination = function(dstntn) {  //UNLOGGED

	this.DestinationPlanet = dstntn;
	//-set console with distance calculated
};
SolarVoyageView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	Starfield.Generate();
	Starfield.SetSpeed(0.01);
	this.Update();
};
SolarVoyageView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.State==this.Specs.STATE.LAUNCHING) {
		Starfield.Accelerate(0.01);
		if (Starfield.Speed>=2.0)
			this.State = this.Specs.STATE.TRAVELLING;
	}
	Starfield.Draw();
	Cockpit.Draw();
	Starfield.Update();
	this.InfoView.Update();
	this.ConsoleView.Update();
};
SolarVoyageView.prototype.LaunchWordGames = function() {  //UNLOGGED

	this.InfoView.Close();
	this.ConsoleView.Close();
	this.InfoView = WordsInfoView;
	this.ConsoleView = WordsConsoleView;
	this.InfoView.Open();
	this.ConsoleView.Open();
};
