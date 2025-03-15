
//----------------------------------------------------
//---------- DIAMOND FOOTBALL CUP --------------------  //TODO: probably needs a FootballCup base class
var DiamondFootballCup = function() {
   var Teams;
   var State, Round;
   var Points;		//TODO: this data structure has to be defined, containing .Points, .GoalsFor, .GoalsAgainst, and other tie-breaker stats
};
DiamondFootballCup.prototype = {
   Set(league) {

      this.State = CUPS.STATE.PReSTART;
      this.Round = 0;
      this.Teams = new (CUP.DIAMOND.TEAMS);
//      this.Points = ArrayUtils.Create(CUP.DIAMOND.TEAMS, <points structure> );
   },
   Generate() {

      //UNLOGGED

      //-rank first 10 teams by previous year's final table position
      //-fill in the next 10 randomly
      //-for first round, last 10 will be rotated using ::RotateSectionLeft
   },
   PlayRoundRobin() {

      //UNLOGGED

      //-play match
      //-update points table (and other stats)
      //-rotate bottom row (second half of .Teams array)
   },
   PlayKnockout() {

      //UNLOGGED

   },
   PlayBottomRounds() {

      //UNLOGGED
   }
};

/* UNLOGGED
var CupContestant = function() {
   var Team;
   var Played;
   var Won, Lost, Tied;
   var GoalsFor, GoalsAgainst;
};
*/
