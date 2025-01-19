
GridironRoster.prototype.GetOffenseRating = function() {	//NOTE: average, not cumulative, not rounded
   var i, j;
   var nGridders;
   var qlty;

   nGridders = 0;
   qlty = 0;
   for (i=0;i<5;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 qlty += this.Gridders[i][j].Quality;
	 ++nGridders;
      }

   return (qlty/nGridders);
};
GridironRoster.prototype.GetDefenseRating = function() {	//NOTE: average, not cumulative, not rounded
   var i, j;
   var nGridders;
   var qlty;

   nGridders = 0;
   qlty = 0;
   for (i=5;i<10;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 qlty += this.Gridders[i][j].Quality;
	 ++nGridders;
      }

   return (qlty/nGridders);
};
GridironRoster.prototype.GetTeamRating = function() {		//NOTE: cumulative . . . ASSUMPTION: all roster slots will be filled
   var i, j;
   var nGridders;
   var qlty;

   nGridders = 0;
   qlty = 0;
   for (i=0;i<5;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 qlty += this.Gridders[i][j].Quality;
	 ++nGridders;
      }

   return (qlty/nGridders);
};
GridironRoster.prototype.GetOffStartersRating = function() {	//NOTE: cumulative . . . ASSUMPTION: starters have been selected
   var i;
   var oRtng;

   oRtng = 0;
   for (i=0;i<OFFENSE.PLAYERS;++i) {
      if (this.Team.OffStarters[i])
	 oRtng += this.Team.OffStarters[i].Quality;
      else
	 oRtng += GRADE.Fplus;					//assigning an F+ for street free agents
   }

   return (oRtng);
};
GridironRoster.prototype.GetDefStartersRating = function() {	//NOTE: cumulative . . . ASSUMPTION: starters have been selected
   var i;
   var dRtng;

   dRtng = 0;
   for (i=0;i<DEFENSE.PLAYERS;++i) {
      if (this.Team.DefStarters[i])
	 dRtng += this.Team.DefStarters[i].Quality;
      else
	 dRtng += GRADE.Fplus;					//assigning an F+ for street free agents
   }

   return (dRtng);
};
GridironRoster.prototype.GetTeamStartersRating = function() {	//NOTE: cumulative . . . ASSUMPTION: starters have been selected

   return (this.GetOffStartersRating()+this.GetDefStartersRating());
};
GridironRoster.prototype.GetOffenseValue = function() {	//NOTE: average, not cumulative, not rounded, not starters only
   var i, j;
   var nGridders;
   var value;

   nGridders = 0;
   value = 0;
   for (i=0;i<5;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 value += this.Gridders[i][j].Value;
	 ++nGridders;
      }

   return (value/nGridders);
};
GridironRoster.prototype.GetDefenseValue = function() {	//NOTE: average, not cumulative, not rounded, not starters only
   var i, j;
   var nGridders;
   var value;

   nGridders = 0;
   value = 0;
   for (i=5;i<10;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 value += this.Gridders[i][j].Value;
	 ++nGridders;
      }

   return (value/nGridders);
};
GridironRoster.prototype.GetTeamValue = function() {	//NOTE: average, not cumulative, not rounded, not starters only
   var i, j;
   var nGridders;
   var value;

   nGridders = 0;
   value = 0;
   for (i=0;i<POSITION.COUNT;++i)
      for (j=0;j<this.Gridders[i].length;++j) {
	 value += this.Gridders[i][j].Value;
	 ++nGridders;
      }

   return (value);
};
