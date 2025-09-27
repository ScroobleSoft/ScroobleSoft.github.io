
//---------------------------------------------
//---------- DOMINION JEEP --------------------
var DominionJeep = function() {
};
DominionJeep.prototype = new DominionArmyCombatant();
DominionJeep.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
