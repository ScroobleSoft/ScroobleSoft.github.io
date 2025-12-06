
//------------------------------------------------
//---------- TACTICAL TROOPER --------------------
var TacticalTrooper = function() {
};
TacticalTrooper.prototype = new TacticalUnit();
TacticalTrooper.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.TROOPER;
};
TacticalTrooper.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation
	TacticalUnit.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E) {
		RightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.E.X, this.ScreenCoords.Y+this.Specs.ARM.E.Y);
		FeetSprite.Draw(this.ScreenCoords.X+this.Specs.FEET.E.X, this.ScreenCoords.Y+this.Specs.FEET.E.Y, this.Clan.Index);
	} else {
		LeftArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.W.X, this.ScreenCoords.Y+this.Specs.ARM.W.Y);
		FeetSprite.Draw(this.ScreenCoords.X+this.Specs.FEET.W.X, this.ScreenCoords.Y+this.Specs.FEET.W.Y, this.Clan.Index);
	}
};
