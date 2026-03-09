/* all UNLOGGED
		The plan is that this is a 10x10 grid, but there could be as many as 80 squads vs 10 squads, so battlefield could get crowded
		May need to use different colour tiles depending on terrain type
		So, all squads will have a random rating between 1 to 10 (maybe evenly distributed - definitely!)
		Note that a 1 vs a 10 still has a 10% chance of winning
		Ratings could even go as high as 11 due to terrain advantage (should advantage be 20%?)
		Gameplay will then centre around match-ups
		Of course, all engagements can be taken down to squad level in Squad Battle View
*/
//------------------------------------------------------
//---------- IMPERIAL SKIRMISH VIEW --------------------
var ImperialSkirmishView = function() {
	var LeftBattalion, RightBattalion;
};
ImperialSkirmishView.prototype = new GenieView();
ImperialSkirmishView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
ImperialSkirmishView.prototype.SetBatallions = function(lBttln, rBttln) {  //UNLOGGED

	this.LeftBattalion = lBttln;
	this.RightBattalion = rBttln;
};
ImperialSkirmishView.prototype.Draw = function() {  //UNLOGGED

	//-play area is side view, 10x4 battlefield, 80x60 rectangular tiles
	//-mobile: same, except 40x30 tiles
};
