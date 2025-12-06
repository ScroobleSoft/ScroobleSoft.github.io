
//---------------------------------------------------
//------------ TACTICAL JET -------------------------  UNLOGGED - may or may not be REDUNDANT
var TacticalJet = function() {
};
TacticalJet.prototype = new TacticalUnit();
TacticalJet.prototype.Set = function(specs, sprite, wSprite) {
	TacticalUnit.prototype.Set.call(this, specs, sprite, wSprite);

};
