
//--------------------------------------------------
//---------- DOMINION ARTILLERY --------------------
var DominionArtillery = function() {
	var Shells;
};
DominionArtillery.prototype = new DominionArmyCombatant();
DominionArtillery.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
