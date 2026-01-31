
//------------------------------------------------
//---------- TACTICAL TROOPER --------------------
var TacticalTrooper = function() {
};
TacticalTrooper.prototype = new TacticalLandUnit();
TacticalTrooper.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.TROOPER;
	this.UndercarriageSpecs = this.Specs.BOOTS;
	this.UndercarriageSprite = BootsSprite;
};
TacticalTrooper.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation
	TacticalLandUnit.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		RightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.E.X, this.ScreenCoords.Y+this.Specs.ARM.E.Y);
	else
		LeftArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.W.X, this.ScreenCoords.Y+this.Specs.ARM.W.Y);
};
