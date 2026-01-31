
//------------------------------------------------------
//------------ TACTICAL STRAFER ------------------------
var TacticalStrafer = function() {
};
TacticalStrafer.prototype = new TacticalJet();
TacticalStrafer.prototype.Set = function(specs, sprite, wSprite) {
	TacticalJet.prototype.Set.call(this, specs, sprite, wSprite);

};
