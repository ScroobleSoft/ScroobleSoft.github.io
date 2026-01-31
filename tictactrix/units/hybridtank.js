
//----------------------------------------------------
//---------- TACTICAL HYBRID TANK --------------------
var TacticalHybridTank = function() {
};
TacticalHybridTank.prototype = new TacticalLandUnit();
TacticalHybridTank.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.HYBRIdTANK;
};
/*
TacticalHybridTank.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	HybridTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.X, this.ScreenCoords.Y+this.Specs.TRACK.Y);
};
*/
TacticalHybridTank.prototype.DrawUndercarriage = function() {

	HybridTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.X, this.ScreenCoords.Y+this.Specs.TRACK.Y, (this.Clan.Index*this.Specs.S));
};
