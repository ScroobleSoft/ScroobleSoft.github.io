
/***** NOTE: below is probably what was going to be used for NPC ships in 3D view */

//-------------------------------------------------
//---------- SOLAR BOUNTY SHIP --------------------
var SolarBountyShip = function() {
   var Vertices;
   var ScaledVertices;
};
SolarBountyShip.prototype = new GenieAgent();
SolarBountyShip.prototype.Set = function(pos, dstn, drctn, specs, sprite, unit) {
   GenieAgent.prototype.Set.call(this, pos, dstn, drctn, specs, sprite, unit);
};
SolarBountyShip.prototype.SetLinks = function(gTool) {
   this.GraphicsTool = gTool;
};
SolarBountyShip.prototype.Update = function() {
   //get scaled vertices based on distance
};
SolarBountyShip.prototype.Draw = function() {
};
