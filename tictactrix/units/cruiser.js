
//------------------------------------------------------
//------------ TACTICAL CRUISER ------------------------
var TacticalCruiser = function() {
};
TacticalCruiser.prototype = new TacticalShip();
TacticalCruiser.prototype.Set = function(specs, sprite, wSprite) {
	TacticalShip.prototype.Set.call(this, specs, sprite, wSprite);

};
