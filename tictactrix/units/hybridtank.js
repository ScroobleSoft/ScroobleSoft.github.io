
//----------------------------------------------------
//---------- TACTICAL HYBRID TANK --------------------
var TacticalHybridTank = function() {
};
TacticalHybridTank.prototype = new TacticalUnit();
TacticalHybridTank.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.HYBRIdTANK;
};
TacticalHybridTank.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	HybridTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.X, this.ScreenCoords.Y+this.Specs.TRACK.Y);
};
