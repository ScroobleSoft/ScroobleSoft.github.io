
//-------------------------------------------------
//---------- TACTICAL BAZOOKER --------------------
var TacticalBazooker = function() {
};
TacticalBazooker.prototype = new TacticalTrooper();
TacticalBazooker.prototype.Set = function(specs, sprite) {
	TacticalTrooper.prototype.Set.call(this, specs, sprite);

	this.Type = TACTICAlUNIT.BAZOOKER;
};
TacticalBazooker.prototype.Draw = function(specs, sprite) {  //UNLOGGED - TODO: adjust for animation (and firing)
	TacticalTrooper.prototype.Draw.call(this);

	if (this.Direction==DIRECTION.E)
		EastBazookaSprite.Draw(this.ScreenCoords.X+this.Specs.BAZOOKA.E.X, this.ScreenCoords.Y+this.Specs.BAZOOKA.E.Y);
	else
		WestBazookaSprite.Draw(this.ScreenCoords.X+this.Specs.BAZOOKA.W.X, this.ScreenCoords.Y+this.Specs.BAZOOKA.W.Y);
};
