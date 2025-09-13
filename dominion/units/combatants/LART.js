
//---------------------------------------------
//---------- DOMINION LART --------------------
var DominionLART = function() {
   var Theatre;
	var TertiaryColour;
};
DominionLART.prototype = new DominionArmyCombatant();
DominionLART.prototype.Set = function(specs, sprite, drctn) {
   DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
