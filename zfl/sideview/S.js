
//------------------------------------------------
//---------- SIDE VIEW SAFETY --------------------
var SideViewSafety = function() {
   var Assignment;
};
SideViewSafety.prototype = new SideViewGridder();
SideViewSafety.prototype.Set = function(specs, sprite) {
   SideViewGridder.prototype.Set.call(this, specs, sprite);

   this.Position = POSITION.S;
};
SideViewSafety.prototype.Update = function() {
//   SideViewGridder.prototype.Update.call(this);

   //UNLOGGED

};
