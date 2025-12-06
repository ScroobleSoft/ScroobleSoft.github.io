
//---------------------------------------------------
//---------- TACTICAL SWIFT TANK --------------------
var TacticalSwiftTank = function() {
};
TacticalSwiftTank.prototype = new TacticalUnit();
TacticalSwiftTank.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.SWIFtTANK;
};
TacticalSwiftTank.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	SwiftTrackSprite.Draw(this.ScreenCoords.X+this.Specs.TRACK.X, this.ScreenCoords.Y+this.Specs.TRACK.Y);
};
