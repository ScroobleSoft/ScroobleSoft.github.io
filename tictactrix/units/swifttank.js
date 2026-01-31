
//---------------------------------------------------
//---------- TACTICAL SWIFT TANK --------------------
var TacticalSwiftTank = function() {
};
TacticalSwiftTank.prototype = new TacticalLandUnit();
TacticalSwiftTank.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.SWIFtTANK;
};
/*
TacticalSwiftTank.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

};
*/
TacticalSwiftTank.prototype.DrawUndercarriage = function() {

	SwiftTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.X, this.ScreenCoords.Y+this.Specs.TRACK.Y, (this.Clan.Index*this.Specs.S));
};
