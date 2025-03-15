/*
 *  UNLOGGED
 */
//----------------------------------------------------
//---------- SIDE-VIEW MATCH VIEW --------------------
var SideViewMatchView = function() {
   var Match;
   var Pitch;
//   var Players;
};
SideViewMatchView.prototype = new GenieView();
SideViewMatchView.prototype.Set = function(cnvs, specs, sRect) {
   GenieView.prototype.Set.call(this, cnvs, specs, sRect);

   this.Match = Match;
   this.Pitch = SideViewPitch;
};
SideViewMatchView.prototype.Open = function() {

   //-more than one sub-view
};
SideViewMatchView.prototype.Update = function() {

   //UNLOGGED

   this.PitchDraw();
   //-draw players+ball
};
