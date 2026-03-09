
//----------------------------------------------------
//---------- SQUAD MELEE SIM VIEW --------------------
var SquadMeleeSimView = function() {
	var SimButton, PlayButton, AttackButton;
	var LeftSquads, RightSquads;
	var LeftSatrapy, RightSatrapy;
	var LeftSquadSoldiers, RightSquadSoldiers;
	var MaxLeftSoldiers, MaxRightSoldiers, MaxSoldiers;
	var Terrain;
	var LeftAdvantages, RightAdvantages;
	var SquadIndex, Casualties;								//variables used in fighting

	var i;
};
SquadMeleeSimView.prototype = new GenieView();
SquadMeleeSimView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
