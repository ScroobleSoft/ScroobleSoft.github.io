
//--------------------------------------------
//---------- DOMINION IFV --------------------
var DominionIFV = function() {
	var Charge;
};
DominionIFV.prototype = new DominionArmyCombatant();
DominionIFV.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
