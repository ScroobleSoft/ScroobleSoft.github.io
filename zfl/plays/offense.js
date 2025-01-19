
//--------------------------------------------------
//---------- OFFENSIVE PLAYBOOK --------------------
var OffensivePlaybook = function() {
   var DumpPasses, ShortPasses, MediumPasses, LongPasses, DeepPasses;
   var GoalLineRuns, InsideRuns, OutsideRuns;
};
OffensivePlaybook.prototype = new FootballPlaybook();
OffensivePlaybook.prototype.Set = function() {

   //Passes . . . TODO: array might eventually have pre-defined sizes, such as 9 for short passes
   this.DumpPasses = new Array();
   this.ShortPasses = new Array();
   this.MediumPasses = new Array();
   this.LongPasses = new Array();
   this.DeepPasses = new Array();

   //Runs
   this.GoalLineRuns = new Array();
   this.InsideRuns = new Array();
   this.OutsideRuns = new Array();
};
