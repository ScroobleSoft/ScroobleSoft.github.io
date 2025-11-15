
//-----------------------------------------------
//---------- TACTICAL GUNNER --------------------
var TacticalGunner = function() {
};
TacticalGunner.prototype = new TacticalTrooper();
TacticalGunner.prototype.Set = function(specs, sprite) {
	TacticalTrooper.prototype.Set.call(this, specs, sprite);

	this.Type = TACTICAlUNIT.GUNNER;
};
TacticalGunner.prototype.Draw = function(specs, sprite) {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalTrooper.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		EastRifleSprite.Draw(this.ScreenCoords.X+this.Specs.GUN.E.X, this.ScreenCoords.Y+this.Specs.GUN.E.Y);
	else
		WestRifleSprite.Draw(this.ScreenCoords.X+this.Specs.GUN.W.X, this.ScreenCoords.Y+this.Specs.GUN.W.Y);
};
