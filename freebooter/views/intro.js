
//------------------------------------------------
//---------- SOLAR INTRO VIEW --------------------
var SolarIntroView = function() {
};
SolarIntroView.prototype = new GenieView();
SolarIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
SolarIntroView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	Starfield.Generate();
	this.Update();
};
SolarIntroView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	Starfield.Draw();
	Cockpit.Draw();
	Starfield.Update();
	this.InfoView.Update();
	this.ConsoleView.Update();
};
SolarIntroView.prototype.CloseAll = function() {  //TODO: Mobile only, possibly

	GenieView.prototype.Close.call(this, this.OpenDockedView.bind(this), 100);
};
SolarIntroView.prototype.OpenDockedView = function() {

	DockedView.Open();
};
