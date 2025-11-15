
//---------------------------------------------
//---------- TACTICAL JEEP --------------------
var TacticalJeep = function() {
};
TacticalJeep.prototype = new TacticalUnit();
TacticalJeep.prototype.Set = function(specs, sprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite);

	this.Type = TACTICAlUNIT.JEEP;
};
TacticalJeep.prototype.Draw = function(specs, sprite) {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.B.X, this.ScreenCoords.Y+this.Specs.WHEEL.B.Y);		//back
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.F.X, this.ScreenCoords.Y+this.Specs.WHEEL.F.Y);		//front
};
