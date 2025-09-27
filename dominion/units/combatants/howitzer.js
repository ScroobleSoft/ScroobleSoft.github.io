
//-------------------------------------------------
//---------- DOMINION HOWITZER --------------------
var DominionHowitzer = function() {
	var Shells;
};
DominionHowitzer.prototype = new DominionArmyCombatant();
DominionHowitzer.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
