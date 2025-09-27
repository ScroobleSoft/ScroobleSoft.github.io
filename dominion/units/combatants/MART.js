
//---------------------------------------------
//---------- DOMINION MART --------------------
var DominionMART = function() {
};
DominionMART.prototype = new DominionArmyCombatant();
DominionMART.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
