
//--------------------------------------------------
//---------- TACTICAL ARTILLERY --------------------
var TacticalArtillery = function() {
};
TacticalArtillery.prototype = new TacticalUnit();
TacticalArtillery.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.ARTILLERY;
};
TacticalArtillery.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		MediumTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.E.X, this.ScreenCoords.Y+this.Specs.TREAD.E.Y);
	else
		MediumTreadSprite.Draw(this.ScreenCoords.X+this.Specs.TREAD.W.X, this.ScreenCoords.Y+this.Specs.TREAD.W.Y);
};
