
//-----------------------------------------------------
//---------- SOLAR INTRO INFO VIEW --------------------
var SolarIntroInfoView = function() {
};
SolarIntroInfoView.prototype = new GenieSubView();
SolarIntroInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
/*
SolarIntroInfoView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.InstantButton = this.SetTextButton(this.Specs.BUTTON.INSTANT, RaisedCornerImages, this.TextWriter);
		this.SubsButton = this.SetTextButton(this.Specs.BUTTON.SUBSTITUTION, RaisedCornerImages, this.TextWriter);
		this.PauseButton = this.SetTextButton(this.Specs.BUTTON.PAUSE, RaisedCornerImages, this.TextWriter);
	}
};
*/
/*
SolarIntroInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

};
*/
SolarIntroInfoView.prototype.Update = function() {  //UNLOGGED

	SolarSystem.Draw();
	SolarSystem.Update();
};
