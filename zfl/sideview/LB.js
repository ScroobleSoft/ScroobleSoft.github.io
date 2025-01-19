
//----------------------------------------------------
//---------- SIDE VIEW LINEBACKER --------------------
var SideViewLinebacker = function() {
   var Assignment;
};
SideViewLinebacker.prototype = new SideViewGridder();
SideViewLinebacker.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.Position = POSITION.LB;
};
SideViewLinebacker.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

};
