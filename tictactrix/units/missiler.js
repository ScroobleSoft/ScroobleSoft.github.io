
//-------------------------------------------------
//---------- TACTICAL MISSILER --------------------
var TacticalMissiler = function() {
};
TacticalMissiler.prototype = new TacticalTrooper();
TacticalMissiler.prototype.Set = function(specs, sprite, wSprite) {
	TacticalTrooper.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.MISSILER;
};
TacticalMissiler.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for firing
	TacticalTrooper.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		EastLauncherSprite.Draw(this.ScreenCoords.X+this.Specs.LAUNCHER.E.X, this.ScreenCoords.Y+this.Specs.LAUNCHER.E.Y);
	else
		WestLauncherSprite.Draw(this.ScreenCoords.X+this.Specs.LAUNCHER.W.X, this.ScreenCoords.Y+this.Specs.LAUNCHER.W.Y);
};
