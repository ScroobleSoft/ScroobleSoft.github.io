
//---------------------------------------------------
//---------- DOMINION MOBILE GUN --------------------
var DominionMobileGun = function() {
	var Rockets;
};
DominionMobileGun.prototype = new DominionArmyCombatant();
DominionMobileGun.prototype.Set = function(specs, sprite, drctn) {
	DominionArmyCombatant.prototype.Set.call(this, specs, sprite, drctn);

};
