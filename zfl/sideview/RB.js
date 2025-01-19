
//------------------------------------------------------
//---------- SIDE VIEW RUNNING BACK --------------------
var SideViewRunningBack = function() {
   var Route, RouteIndex;
   var StartPosition;
};
SideViewRunningBack.prototype = new SideViewGridder();
SideViewRunningBack.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.StartPosition = new Coordinate2D();
   this.Animation.Frames = 80;
   this.Position = POSITION.RB;
};
SideViewRunningBack.prototype.Snap = function() {

   //UNLOGGED

};
SideViewRunningBack.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

};
