
//---------------------------------------------
//---------- TACTICAL JEEP --------------------
var TacticalJeep = function() {
};
TacticalJeep.prototype = new TacticalLandUnit();
TacticalJeep.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.JEEP;
};
/*
TacticalJeep.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalLandUnit.prototype.Draw.call(this);

};
*/
TacticalJeep.prototype.DrawUndercarriage = function() {

	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.B.X, this.ScreenCoords.Y+this.Specs.WHEEL.B.Y);		//back
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.F.X, this.ScreenCoords.Y+this.Specs.WHEEL.F.Y);		//front
};
