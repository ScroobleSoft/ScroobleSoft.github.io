
//------------------------------------------------
//---------- FADING EXPLOSION --------------------
var FadingExplosion = function() {
	var MaxFrames;
};
FadingExplosion.prototype = new GenieExplosion();
FadingExplosion.prototype.Set = function(specs, sprite, gTool, sRect) {
	GenieFX.prototype.Set.call(this, specs, sprite, null, gTool, null, sRect);

	this.MaxFrames = this.Extant;
};
FadingExplosion.prototype.Draw = function() {  //TODO: appear in one form, then fade away

	this.DetermineScreenCoords();
	this.Sprite.Context.globalAlpha = this.Extant/this.MaxFrames;
	this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
	this.Sprite.Context.globalAlpha = 1.0;
};
