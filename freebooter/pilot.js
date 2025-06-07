/*
 *  complete net worth is a sum of solarons and assets, this being calculated as needed (or maybe should be stored in a variable for leaderboard sorting)
 */
//-------------------------------------------
//---------- SOLAR PILOT --------------------
var SolarPilot = function() {
	var Name;
   var Location;	//NOTE: not necessarily indicated by coords, but more by StarLane/Docking Station number
	var Planet, Station;
   var Mission;
   var Solarons;
	var Assets;		//TODO: this could be a complex structure, since there is all type of cargo and valuables that can be hauled
   var Ship;
};
SolarPilot.prototype = {
   Set() {
      this.Solarons = 0;
		this.Name = new GenieName();
   }
};
