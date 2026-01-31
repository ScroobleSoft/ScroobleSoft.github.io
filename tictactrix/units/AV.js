
//-------------------------------------------
//---------- TACTICAL AV --------------------
var TacticalAV = function() {
};
TacticalAV.prototype = new TacticalLandUnit();
TacticalAV.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.AV;
};
/*
TacticalAV.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	LargeTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.X, this.ScreenCoords.Y+this.Specs.TREAD.Y);
};
*/
TacticalAV.prototype.DrawUndercarriage = function() {

	LargeTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.X, this.ScreenCoords.Y+this.Specs.TREAD.Y, (this.Clan.Index*this.Specs.S));
};
