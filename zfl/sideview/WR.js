
//-------------------------------------------------------
//---------- SIDE VIEW WIDE RECEIVER --------------------
var SideViewWideReceiver = function() {
   var Route, RouteIndex;
   var StartPosition;
};
SideViewWideReceiver.prototype = new SideViewGridder();
SideViewWideReceiver.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.StartPosition = new Coordinate2D();
   this.Animation.Frames = 80;
   this.State.Open = R.OPEN.COVERED;
};
SideViewWideReceiver.prototype.Snap = function() {

   //UNLOGGED

   this.State.Motion = WR.STATE.RUNNING;
};
SideViewWideReceiver.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

   switch (this.State.Motion) {
      case WR.STATE.RUNNING:
	 this.UpdateRoute();
	 this.UpdateAnimation();
	 break;
      case WR.STATE.BREAKING:
	 this.State.Animation = 8;		//TODO: this probably is the right state
	 this.Animation.Frames = 120;		//TODO: for now, the WR will wait for 2secs
	 break;
      case WR.STATE.WAITING:
	 --this.Animation.Frames;
	 if (!this.Animation.Frames) {
	    //--pick a direction to run to, probably laterally
	    this.Animation.Frames = 10;
	 }
	 break;
   }
};
