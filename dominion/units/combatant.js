
//-------------------------------------------------------
//---------- DOMINION ARMY COMBATANT --------------------
var DominionArmyCombatant = function() {
   var Theatre;
	var TertiaryColour;
};
DominionArmyCombatant.prototype = new DominionUnit();
DominionArmyCombatant.prototype.Set = function(specs, sprite, drctn) {
   DominionUnit.prototype.Set.call(this, specs, sprite, drctn);

};
DominionArmyCombatant.prototype.SetNation = function(nation) {	//TODO: at the moment, this applies only to powers
	DominionUnit.prototype.SetNation.call(this, nation);

	this.PrimaryColour = DominionUtils.GetPrimaryColour(this.Nation);
	this.SecondaryColour = DominionUtils.GetSecondaryColour(this.Nation);
	this.TertiaryColour = DominionUtils.GetSecondaryColour(this.Nation);
	this.ReColour();
};
/*
DominionArmyCombatant.prototype.FireWeapon = function() {
   //NOTE: at the moment, have this here since each army unit type will fire, but more so since they will all have the same
   //	   logic to determine whether they are firing based on Stance (so this method could be CheckWeaponFire)
};
*/
