
//--------------------------------------------------
//---------- TACTICAL MEGA TANK --------------------
var TacticalMegaTank = function() {
};
TacticalMegaTank.prototype = new TacticalUnit();
TacticalMegaTank.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.MEGaTANK;
};
TacticalMegaTank.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		MegaTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.E.X, this.ScreenCoords.Y+this.Specs.TRACK.E.Y);
	else
		MegaTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.W.X, this.ScreenCoords.Y+this.Specs.TRACK.W.Y);
};
