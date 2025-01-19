
//-----------------------------------------------------------
//---------- SIDE VIEW OFFENSIVE LINEMAN --------------------
var SideViewOffensiveLineman = function() {
   var BlockingAssignment;
};
SideViewOffensiveLineman.prototype = new SideViewGridder();
SideViewOffensiveLineman.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.Animation.Frames = 15;
};
SideViewOffensiveLineman.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

   switch (this.State.Motion) {
      case OL.STATE.RISING:
	 --this.Animation.Frames;
	 if (!this.Animation.Frames) {
	    if (this.Direction==DIRECTION.E)
	       this.Sprite = LeftGridderSprite;
	    else
	       this.Sprite = RightGridderSprite;
	    this.Animation.State = 7;
	    this.State.Motion = OL.STATE.BRACING;
	    this.Animation.Frames = 15;
	 }
	 break;
      case OL.STATE.BRACING:
	 --this.Animation.Frames;
	 if (!this.Animation.Frames) {
	    this.Animation.State = 9;
	    this.State.Motion = OL.STATE.BLOCKING;
	    this.Animation.Frames = 15;
	 }
	 break;
      case OL.STATE.BLOCKING:
	 this.UpdateAnimation();
	 break;
      case OL.STATE.BEATEN:
//	 --this.Animation.Frames;
//	 if (!this.Animation.Frames) {
//	    //--pick a direction to run to, probably laterally
//	    this.Animation.Frames = 10;
//	 }
	 break;
   }
};
