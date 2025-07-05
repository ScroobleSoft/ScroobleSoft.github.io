
//-------------------------------------------------
//---------- SOLAR VOYAGE VIEW --------------------
var SolarVoyageView = function() {
	var DestinationPlanet;
	var Speed, State;

	var i;
};
SolarVoyageView.prototype = new GenieView();
SolarVoyageView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Speed = VOYAGE.SPEED.STOPPED;
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
		else if (Math.ceil(Starfield.Speed/0.25)!=this.InfoView.SpeedStep) {
			this.InfoView.SpeedStep = Math.ceil(Starfield.Speed/0.25);
			this.InfoView.DisplaySpeed();
		}
	}
	Journey.Update();
	Starfield.Draw();
	Cockpit.Draw();
	Starfield.Update();
	if (this.State==this.Specs.STATE.TRAVELLING) {
		this.InfoView.Update();
		this.ConsoleView.Update();
	}

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE))
		this.ConsoleView.UpdateClick();
	else
		Mouse.ClearAll();
};
SolarVoyageView.prototype.LaunchWordGames = function() {

	this.InfoView.Close();
	this.ConsoleView.Close();
	this.InfoView = WordsInfoView;
	this.ConsoleView = WordsConsoleView;
	this.InfoView.Open();
	this.ConsoleView.Open();
};
SolarVoyageView.prototype.CloseWordGames = function() {

	this.Canvas.SuspendInput();
	this.InfoView.State = VIEW.WORDS.STATE.INTRO;
	this.InfoView.Close();
	this.ConsoleView.Close();
	this.InfoView = CockpitInfoView;
	this.ConsoleView = CockpitConsoleView;
	this.InfoView.Open();
	this.ConsoleView.Open();
	Mouse.ClearAll();
	this.Canvas.ResumeInput();
};
