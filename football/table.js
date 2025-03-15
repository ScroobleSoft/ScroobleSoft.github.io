
//-----------------------------------------------------
//----------- PREMIER LEAGUE TABLE --------------------
var PremierLeagueTable = function() {
   var Positions;
};
PremierLeagueTable.prototype = {
   Set() {
      this.Positions = new Array(LEAGUE.TEAMS);		//NOTE: new array to sort by points
      this.SetTeams();
   },
   SetTeams() {
      var i;

      for (i=0;i<LEAGUE.TEAMS;++i)
	 this.Positions[i] = Teams[i];
   },
   Sort() {

      Teams.forEach(function(team){team.CalculatePoints();});
      this.Positions.sort(function(a, b) {
	 if (b.Points>a.Points)
	    return (1);
	 else if (b.Points<a.Points)
	    return (-1);
	 else {
	    if (b.GoalDifference>a.GoalDifference)
	       return (1);
	    else if (b.GoalDifference<a.GoalDifference)
	       return (-1);
	    else {
	       if (b.GoalsFor>a.GoalsFor)
		  return (1);
	       else if (b.GoalsFor<a.GoalsFor)
		  return (-1);
	       else
		  return (0);
	    }
	 }
      });
   }
};
