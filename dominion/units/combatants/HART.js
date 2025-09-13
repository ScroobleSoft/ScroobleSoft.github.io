
//---------------------------------------------
//---------- DOMINION HART --------------------
var DominionHART = function() {
   var Theatre;
	var TertiaryColour;
};
DominionHART.prototype = new DominionArmyCombatant();
DominionHART.prototype.Set = function(specs, sprite, drctn) {
   DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
