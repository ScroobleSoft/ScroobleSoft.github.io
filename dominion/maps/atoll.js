
//----------------------------------------------
//---------- DOMINION ATOLL --------------------
var DominionAtoll = function() {
   var Location;
   var Octagon;
};
DominionAtoll.prototype = {
   Set() {
      this.Location = new Coordinate2D();
   },
   SetLocation(loc) {

      this.Location.Set(loc.X, loc.Y);
   },
   Draw() {  //likely REDUNDANT since map takes care of drawing
      //one octagon and 4 squares - use fillRect
   }
};
