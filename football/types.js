
//-- MATCH TEAM --
var MatchTeam = function() {
	var Club;
   var Players, Subs;		// .Players are starters
	var Formation;
   var Tactics;
   var Locations;
   var MatchUps;
};
MatchTeam.prototype = {
   Set() {
		this.SetLists();
   },
	SetLists() {

		this.Players = new Array(MATCH.PLAYERS);
		this.Subs = new Array(MATCH.SUBS);
	}
};
