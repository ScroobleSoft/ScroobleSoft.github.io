
//-------------------------------------------------
//---------- TACTICAL MISSILER --------------------
var TacticalMissiler = function() {
};
TacticalMissiler.prototype = new TacticalTrooper();
TacticalMissiler.prototype.Set = function(specs, sprite) {
	TacticalTrooper.prototype.Set.call(this, specs, sprite);

	this.Type = TACTICAlUNIT.MISSILER;
};
TacticalMissiler.prototype.Draw = function(specs, sprite) {  //UNLOGGED - TODO: adjust for firing
	TacticalTrooper.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		EastLauncherSprite.Draw(this.ScreenCoords.X+this.Specs.MISSILE.E.X, this.ScreenCoords.Y+this.Specs.MISSILE.E.Y);
	else
		WestLauncherSprite.Draw(this.ScreenCoords.X+this.Specs.MISSILE.W.X, this.ScreenCoords.Y+this.Specs.MISSILE.W.Y);
};
