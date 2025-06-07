
//------------------------------------------------------
//---------- SOLAR DOCKED INFO VIEW --------------------
var SolarDockedInfoView = function() {
	var PlanetRotation;
};
SolarDockedInfoView.prototype = new GenieSubView();
SolarDockedInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.PlanetRotation = 0;
};
SolarDockedInfoView.prototype.Open = function() {

	SolarSystem.SelectedPlanet.DrawInBuffer();

	GenieSubView.prototype.Open.call(this);
};
SolarDockedInfoView.prototype.Update = function() {

	 ++this.PlanetRotation;
	 if (this.PlanetRotation>=800)
		 this.PlanetRotation = 0;
	 this.Draw();
};
SolarDockedInfoView.prototype.Draw = function() {

	this.Context.fillStyle = "black";
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.GraphicsTool.SetContext(this.Context);
	SolarSystem.SelectedPlanet.Draw(this.PlanetRotation, true);
	this.GraphicsTool.ResetContext();
};
