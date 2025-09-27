
//---------------------------------------------
//---------- DOMINION HART --------------------
var DominionHART = function() {
};
DominionHART.prototype = new DominionArmyCombatant();
DominionHART.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
