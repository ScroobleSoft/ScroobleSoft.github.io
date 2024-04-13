
//----------------------------------------------
//---------- RING EXPLOSION --------------------  ASSUMPTION: explosion will be at least 6px wide
var RingExplosion = function() {
	var Radius;
	var ColourIndex;

	var i, j, rds;
};
RingExplosion.prototype = new GenieExplosion();
RingExplosion.prototype.Set = function(specs, gTool, sRect) {
	GenieFX.prototype.Set.call(this, specs, null, null, gTool, null, sRect);

};
RingExplosion.prototype.Activate = function(pos, rds) {
	GenieExplosion.prototype.Activate.call(this, pos);

	this.Radius = rds || this.Specs.RDS;
	this.Radius = this.Radius || EXPLOSION.RING.RDS;
	this.Extant = this.Specs.F ? this.Specs.F : EXPLOSION.RING.F;
};
RingExplosion.prototype.Draw = function() {

	this.DetermineScreenCoords();
	this.rds = this.Radius - (EXPLOSION.RING.RDS/2);
	this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, this.rds, YellowRedSpectrum[0], 0, this.Extant/this.Frames);
	for (this.i=1;this.i<YellowRedSpectrum.length;++this.i)
		this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, this.rds+this.i, YellowRedSpectrum[this.i], 3, this.Extant/this.Frames);
};
