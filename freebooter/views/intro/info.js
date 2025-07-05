
//-----------------------------------------------------
//---------- SOLAR INTRO INFO VIEW --------------------
var SolarIntroInfoView = function() {
};
SolarIntroInfoView.prototype = new GenieSubView();
SolarIntroInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarIntroInfoView.prototype.Update = function() {

	SolarSystem.Draw();
	SolarSystem.Update();
};
