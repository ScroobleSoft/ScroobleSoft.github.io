
//---------------------------------------------------
//---------- TACTICAL ROCKET POD --------------------
var TacticalRocketPod = function() {
};
TacticalRocketPod.prototype = new TacticalUnit();
TacticalRocketPod.prototype.Set = function(specs, sprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite);

	this.Type = TACTICAlUNIT.ROCKEtPOD;
};
TacticalRocketPod.prototype.Draw = function(specs, sprite) {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalUnit.prototype.Draw.call(this);

	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.L.X, this.ScreenCoords.Y+this.Specs.WHEEL.L.Y);		//left
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.C.X, this.ScreenCoords.Y+this.Specs.WHEEL.C.Y);		//central
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.R.X, this.ScreenCoords.Y+this.Specs.WHEEL.R.Y);		//right
};
