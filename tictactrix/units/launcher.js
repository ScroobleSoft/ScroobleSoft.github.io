
//---------------------------------------------------------
//---------- TACTICAL MISSILE LAUNCHER --------------------
var TacticalMissileLauncher = function() {
};
TacticalMissileLauncher.prototype = new TacticalLandUnit();
TacticalMissileLauncher.prototype.Set = function(specs, sprite, wSprite) {
	TacticalLandUnit.prototype.Set.call(this, specs, sprite, wSprite);

	this.Type = TACTICAlUNIT.MISSILeLAUNCHER;
};
/*
TacticalMissileLauncher.prototype.Draw = function() {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalLandUnit.prototype.Draw.call(this);

};
*/
TacticalMissileLauncher.prototype.DrawUndercarriage = function() {

	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.L.X, this.ScreenCoords.Y+this.Specs.WHEEL.L.Y);		//left
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.C.X, this.ScreenCoords.Y+this.Specs.WHEEL.C.Y);		//central
	TireSprite.Draw(this.ScreenCoords.X+this.Specs.WHEEL.R.X, this.ScreenCoords.Y+this.Specs.WHEEL.R.Y);		//right
};
