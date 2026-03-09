/* all UNLOGGED
		Duel wtih 9 (10?) vulnerable hot spots to aim at whenever they are exposed
		No parrying, only thrusting
		Sprites keep moving (sort of vibrating) all the time
		Of course, there can be more than 1 on 1 battles (1 on 8?)
*/
//----------------------------------------------------
//---------- IMPERIAL COMBAT VIEW --------------------
var ImperialCombatView = function() {
	var LeftSoldier, RightSoldier;
};
ImperialCombatView.prototype = new GenieView();
ImperialCombatView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
ImperialCombatView.prototype.SetSoldiers = function(lSldr, rSldr) {

	this.LeftSoldier = lSldr;
	this.RightSoldier = rSldr;
};
ImperialCombatView.prototype.Draw = function() {  //UNLOGGED

	//-arcade duel, with "low thrust"/"medium thrust"/"high parry"/"low parry" etc. buttons
	//-alternatively, could have a 3x3 grid, possibly in Info Box, showing vulnerable area in foe requiring quick reflex to click on
	// a square when it becomes red
};
