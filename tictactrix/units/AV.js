
//-------------------------------------------
//---------- TACTICAL AV --------------------
var TacticalAV = function() {
};
TacticalAV.prototype = new TacticalUnit();
TacticalAV.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.AV;
};
TacticalAV.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	LargeTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.X, this.ScreenCoords.Y+this.Specs.TREAD.Y);
};
