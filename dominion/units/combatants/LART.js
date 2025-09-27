
//---------------------------------------------
//---------- DOMINION LART --------------------
var DominionLART = function() {
};
DominionLART.prototype = new DominionArmyCombatant();
DominionLART.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
