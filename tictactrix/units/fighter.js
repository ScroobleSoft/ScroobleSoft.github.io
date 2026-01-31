
//-------------------------------------------------------
//------------ TACTICAL FIGHTER -------------------------
var TacticalFighter = function() {
};
TacticalFighter.prototype = new TacticalJet();
TacticalFighter.prototype.Set = function(specs, sprite, wSprite) {
	TacticalJet.prototype.Set.call(this, specs, sprite, wSprite);

};
