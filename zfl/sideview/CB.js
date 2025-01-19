
//----------------------------------------------------
//---------- SIDE VIEW CORNERBACK --------------------
var SideViewCornerback = function() {
   var Assignment;
};
SideViewCornerback.prototype = new SideViewGridder();
SideViewCornerback.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

};
SideViewCornerback.prototype.SetTarget = function(wr) {

   //UNLOGGED

   this.Target = wr;
   this.SetPosition( { X: this.Target.Position.X+28, Y: this.Target.Position.Y } );
};
SideViewCornerback.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

   switch (this.State.Motion) {
      case CB.STATE.COVERING:
	 this.UpdateAnimation();
	 if (this.Target)				//TODO: this check may be REDUNDANT because will only cover a target
	    this.SetVelocity(this.Target.Velocity);
	 this.Move();
	 break;
      case CB.STATE.POSITIONING:		//i.e., moving into zone position
	 break;
      case CB.STATE.BREAKING:
	 //-run to spot between QB and R, maybe same x-coord as R, 10-20px difference in y-coord, then knock-down/pick
	 break;
      case CB.STATE.TACKLING:
	 break;
   }
};
