// * show planet at which docked in Info Box
// * instantaneous teleporting between stations

//-----------------------------------------------------
//---------- SOLAR TRADE INFO VIEW --------------------
var SolarTradeInfoView = function() {
};
SolarTradeInfoView.prototype = new GenieSubView();
SolarTradeInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
/*
SolarTradeInfoView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.InstantButton = this.SetTextButton(this.Specs.BUTTON.INSTANT, RaisedCornerImages, this.TextWriter);
		this.SubsButton = this.SetTextButton(this.Specs.BUTTON.SUBSTITUTION, RaisedCornerImages, this.TextWriter);
		this.PauseButton = this.SetTextButton(this.Specs.BUTTON.PAUSE, RaisedCornerImages, this.TextWriter);
	}
};
*/
/*
SolarTradeInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.Update();
};
*/
SolarTradeInfoView.prototype.Update = function() {  //UNLOGGED

	SolarSystem.Draw();
	SolarSystem.Update();
};
