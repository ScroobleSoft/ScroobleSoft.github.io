
//---------------------------------------------------
//------------ TACTICAL SHIP ------------------------
var TacticalShip = function() {
};
TacticalShip.prototype = new TacticalUnit();
TacticalShip.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

};
