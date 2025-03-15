
//----------------------------------------------------
//---------- EMERALD FOOTBALL CUP --------------------  //TODO: probably needs a FootballCup base class
var EmeraldFootballCup = function() {
   var Teams;
   var State, Round;
   var Points;		//TODO: this data structure has to be defined, containing .Points, .GoalsFor, .GoalsAgainst, and other tie-breaker stats
};
EmeraldFootballCup.prototype = {
   Set(pLeague, cLeague) {  //p- premiereship, c- championship

      this.State = CUPS.STATE.PReSTART;
      this.Round = 0;
      this.Teams = new (CUP.EMERALD.TEAMS);
//      this.Points = ArrayUtils.Create(CUP.EMERALD.TEAMS, <points structure> );
   },
   Generate() {

      //UNLOGGED

      //-rank first 22 teams by previous year's final table position
      //-fill in the next 22 randomly
      //-for first round, last 22 will be rotated using ::RotateSectionLeft
      //-top 32 move to the knockout round, 12 play 5 games in same type of round-robin style as previous, half the teams getting a home field advantage
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
