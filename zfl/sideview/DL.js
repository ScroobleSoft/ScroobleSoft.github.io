
//-----------------------------------------------------------
//---------- SIDE VIEW DEFENSIVE LINEMAN --------------------
var SideViewDefensiveLineman = function() {
   var Assignment;
};
SideViewDefensiveLineman.prototype = new SideViewGridder();
SideViewDefensiveLineman.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.Animation.Frames = 15;
};
SideViewDefensiveLineman.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

   switch (this.State.Motion) {
      case DL.STATE.RISING:
	 --this.Animation.Frames;
	 if (!this.Animation.Frames) {
	    if (this.Direction==DIRECTION.E)
	       this.Sprite = LeftGridderSprite;
	    else
	       this.Sprite = RightGridderSprite;
	    this.Animation.State = 7;
	    this.State.Motion = DL.STATE.BRACING;
	    this.Animation.Frames = 15;
	 }
	 break;
      case DL.STATE.BRACING:
	 --this.Animation.Frames;
	 if (!this.Animation.Frames) {
	    this.Animation.State = 9;
	    this.State.Motion = DL.STATE.RUSHING;
	    this.Animation.Frames = 15;
	 }
	 break;
      case DL.STATE.RUSHING:
	 this.UpdateAnimation();
	 break;
   }
};
