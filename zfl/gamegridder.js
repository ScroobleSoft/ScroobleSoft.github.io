
//--------------------------------------------
//---------- GAME GRIDDER --------------------
var GameGridder = function() {
};
GameGridder.prototype = new GenieAgent();
GameGridder.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.State.Motion = GRIDDER.STATE.PReSNAP;
};
GameGridder.prototype.SetGridder = function(grddr) {

   //UNLOGGED

};
