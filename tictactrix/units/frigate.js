
//------------------------------------------------------
//------------ TACTICAL FRIGATE ------------------------
var TacticalFrigate = function() {
};
TacticalFrigate.prototype = new TacticalShip();
TacticalFrigate.prototype.Set = function(specs, sprite, wSprite) {
	TacticalShip.prototype.Set.call(this, specs, sprite, wSprite);

};
