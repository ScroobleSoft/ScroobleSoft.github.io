
//-------------------------------------------------
//---------- RUBY FOOTBALL CUP --------------------
var RubyFootballCup = function() {
   var Teams;
   var State, Round;
   var Points;		//TODO: this data structure has to be defined, containing .Points, .GoalsFor, .GoalsAgainst, and other tie-breaker stats
};
RubyFootballCup.prototype = {
   Set() {

      this.State = CUPS.STATE.PReSTART;
      this.Round = 0;
      this.Teams = new (CUP.RUBY.TEAMS);
//      this.Points = ArrayUtils.Create(CUP.RUBY.TEAMS, <points structure> );
   },
   Generate() {

      //UNLOGGED

      //-rank first 34 teams by previous year's final table position
      //-fill in the next 34 randomly
      //-for first round, last 34 will be rotated using ::RotateSectionLeft
      //-top 64 move to the knockout round, remaining 4 are handled as in Diamond Cup
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
