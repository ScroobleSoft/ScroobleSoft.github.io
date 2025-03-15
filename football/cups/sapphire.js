
//-----------------------------------------------------
//---------- SAPPHIRE FOOTBALL CUP --------------------
var SapphireFootballCup = function() {
   var Teams;
   var State, Round;
   var Points;		//TODO: this data structure has to be defined, containing .Points, .GoalsFor, .GoalsAgainst, and other tie-breaker stats
};
SapphireFootballCup.prototype = {
   Set() {
      this.State = CUPS.STATE.PReSTART;
      this.Round = 0;
      this.Teams = new (CUP.SAPPHIRE.TEAMS);
//      this.Points = ArrayUtils.Create(CUP.SAPPHIRE.TEAMS, <points structure> );
   },
   Generate() {

      //UNLOGGED

      //-rank first 46 teams by previous year's final table position
      //-fill in the next 46 randomly
      //-for first round, last 46 will be rotated using ::RotateSectionLeft
      //-top 64 move to the knockout round, remaining 28 are handled as in the Emerald Cup
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


//-------------------------------------------------
//---------- RUBY FOOTBALL CUP --------------------
var RubyFootballCup = function() {
};
RubyFootballCup.prototype = {
   Set() {

   },
};
