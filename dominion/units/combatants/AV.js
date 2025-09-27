
//---------------------------------------------
//---------- DOMINION AV --------------------
var DominionAV = function() {
	var Charge;
};
DominionAV.prototype = new DominionArmyCombatant();
DominionAV.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
