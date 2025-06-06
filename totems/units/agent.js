/*
 *  UNLOGGED
 */
//--------------------------------------------------
//---------- TOLL SPECIAL AGENT --------------------
var TollSpecialAgent = function() {
   //-these are the questers
};
TollSpecialAgent.prototype = new GenieAgent();
TollSpecialAgent.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, null, null, null, specs, sprite);
};
