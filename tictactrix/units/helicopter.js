
//----------------------------------------------------------
//------------ TACTICAL HELICOPTER -------------------------
var TacticalHelicopter = function() {
};
TacticalHelicopter.prototype = new TacticalJet();
TacticalHelicopter.prototype.Set = function(specs, sprite, wSprite) {
	TacticalJet.prototype.Set.call(this, specs, sprite, wSprite);

};
