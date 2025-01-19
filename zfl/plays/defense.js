
//--------------------------------------------------
//---------- DEFENSIVE PLAYBOOK --------------------
var DefensivePlaybook = function() {
   var ShortPasses, MediumMM, MediumZone, NickelMM, NickelZone, Dime;
   var GoalLineRuns;
};
DefensivePlaybook.prototype = new FootballPlaybook();
DefensivePlaybook.prototype.Set = function() {

   //Passes
   this.ShortPasses = new Array();
   this.MediumMM = new Array();
   this.MediumZone = new Array();
   this.NickelMM = new Array();
   this.NickelZone = new Array();
   this.Dime = new Array();
   this.GoalLineRuns = new Array();
};
