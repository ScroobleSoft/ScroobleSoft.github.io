
//--------------------------------------------------------
//------------ TACTICAL DESTROYER ------------------------
var TacticalDestroyer = function() {
};
TacticalDestroyer.prototype = new TacticalShip();
TacticalDestroyer.prototype.Set = function(specs, sprite, wSprite) {
	TacticalShip.prototype.Set.call(this, specs, sprite, wSprite);

};
