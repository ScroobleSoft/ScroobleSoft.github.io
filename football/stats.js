
//-----------------------------------------------------
//---------- FOOTBALL PLAYER STATS --------------------
var FootballPlayerStats = function() {  //NOTE: not tracking off-sides even if implemented
   var Games;
   var Passes;
   var Goals;
   var SetUps;
   var BallControl;
   var Shots;
   var Tackles;
   var Headers;
   var PlusMinus;
   var Saves;  //?
};
FootballPlayerStats.prototype = {
   Set() {
      this.Games = new GamesStats();
      this.Passes = new PassStats();
      this.Goals = new GoalStats();
      this.SetUps = 0;
      this.Shots = new ShotStats();
      this.Tackles = 0;
      this.Headers = new HeadingStats();
      this.PlusMinus = 0;
   },
   Reset() {  //NOTE: as opposed to Load

      //Games
      this.Games.Played = 0;
      this.Games.Minutes = 0;
      this.Games.SubAppearances = 0;
      this.Games.Subbed = 0;

      //Passes
      this.Passes.Attempted = 0;
      this.Passes.Completed = 0;
      this.Passes.ShortCompleted = 0;
      this.Passes.MediumCompleted = 0;
      this.Passes.LongCompleted = 0;
      this.Passes.CrossesMade = 0;
      this.Passes.CrossesMissed = 0;

      //Goals
      this.Goals.Scored = 0;
      this.Goals.Headed = 0;
      this.Goals.OutsideBox = 0;
      this.Goals.Penalties = 0;
      this.Goals.FreeKicks = 0;

      //Shots
      this.Shots.Taken = 0;
      this.Shots.Missed = 0;
      this.Shots.Saved = 0;
      this.Shots.Woodwork = 0;
      this.Shots.OutsideBox = 0;

      //Ball control
      this.BallControl.AttemptedDribbles = 0;
      this.BallControl.SuccessfulDribbles = 0;
      this.BallControl.AccurateFlicks = 0;
      this.BallControl.WaywardFlicks = 0;
      this.BallControl.SuccessfulTraps = 0;
      this.BallControl.FailedTraps = 0;

      //Heading
      this.Headers.Won = 0;
      this.Headers.Lost = 0;
      this.Headers.Accurate = 0;
      this.Headers.Wayward = 0;
   }
};

//-- GAMES STATS --
var GamesStats = function() {
   var Played;
   var Minutes;			//NOTE: applicable to youth players, or for measuring morale
   var SubAppearances;		//NOTE: not keeping record of occasions as unused sub
   var Subbed;
};

//-- PASS STATS --
var PassStats = function() {
   var Attempted;
   var Completed;
   var ShortCompleted, MediumCompleted, LongCompleted;
   var CrossesMade;
   var CrossesMissed;
};

//-- GOAL STATS --
var GoalStats = function() {
   var Scored;
   var Headed;
   var OutsideBox;
   var Penalties;
   var FreeKicks;
};

//-- SHOT STATS --
var ShotStats = function() {
   var Taken;
   var Missed;		//i.e. missed target
   var Saved;
   var Woodwork;	//ISSUE: may not need recording, and could count as missed
   var OutsideBox;
};

//-- BALL CONTROL STATS --
var BallControlStats = function() {
   var AttemptedDribbles;
   var SuccessfulDribbles;
   var AccurateFlicks;
   var WaywardFlicks;
   var SuccessfulTraps;
   var FailedTraps;
};

//-- HEADING STATS --
var HeadingStats = function() {
   var Won;
   var Lost;
   var Accurate;
   var Wayward;
};
