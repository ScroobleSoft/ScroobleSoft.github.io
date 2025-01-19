
//-under the game side view, there is 600x150px space to see 4 plays at a time, so on offense can have 4 play options for pass/run each
//    .screen		.short yardage run
//    .short pass	.guards run
//    .medium pass	.tackles run
//    .long pass	.outside run
//  there would be 4 batches of plays on defense as well
//    .run defense
//    .medium pass
//    .nickel
//    .dime

//-------------------------------------------------
//---------- FOOTBALL PLAYBOOK --------------------
var FootballPlaybook = function() {
   var Plays;
};
FootballPlaybook.prototype = {
   Set() {
      this.Plays = new Array();
   }
};
