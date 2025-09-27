
//--------------------------------------------
//---------- DOMINION APC --------------------
var DominionAPC = function() {
	var Shells;
};
DominionAPC.prototype = new DominionArmyCombatant();
DominionAPC.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
