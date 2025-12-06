
//------------------------------------------------------
//------------ TACTICAL BOMBER -------------------------  UNLOGGED
var TacticalBomber = function() {
};
TacticalBomber.prototype = new TacticalJet();
TacticalBomber.prototype.Set = function(specs, sprite, wSprite) {
	TacticalJet.prototype.Set.call(this, specs, sprite, wSprite);

};
