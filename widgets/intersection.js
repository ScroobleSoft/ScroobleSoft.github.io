
//----------------------------------------------------
//---------- GALLERY INTERSECTION --------------------
var GalleryIntersection = function() {
   var Location;
   var North, East, South, West;	//neighbours
   var Blocked;
   var OnScreen;
};
GalleryIntersection.prototype = {
   Set() {
      this.Blocked = new Array(4);
      this.Location = new Coordinate2D();
   }
};
