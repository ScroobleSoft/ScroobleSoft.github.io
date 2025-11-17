/*
 *  UNLOGGED
 */
//------------------------------------------------
//---------- GALLERY FACILITY --------------------
var GalleryFacility = function() {
   var Industrialist;
   var WIMPs;
   var Assemblers;
   var Stations;
   var Portals;
   var Roads;
   var Features;	//TEMP
   var Intersections;
   var ScreenCentre;
};
GalleryFacility.prototype = {
   Set(indstrlst, sCentre) {
      this.Industrialist = indstrlst;
      this.ScreenCentre = sCentre;
      this.Features = Utilities.CreateArray(SECTOR.COUNT, Coordinate2D);
      this.GenerateIntersections();
   },
   Generate() {  //TEMP
   },
   GenerateIntersections() {  //NOTE: calculations repeated for each facility - INEFFICIENT, but Ok
      var x, y;

      this.Intersections = Utilities.Create2DArray(9, 9, GalleryIntersection);
      for (x=0;x<9;++x)
	 for (y=0;y<9;++y) {
	    this.Intersections[x][y].Set();
	    this.Intersections[x][y].Location.X = 40*x;
	    this.Intersections[x][y].Location.Y = 40*y;
	    if (y>0)
	       this.Intersections[x][y].North = this.Intersections[x][y-1];
	    if (x<8)
	       this.Intersections[x][y].East = this.Intersections[x+1][y];
	    if (y<8)
	       this.Intersections[x][y].South = this.Intersections[x][y+1];
	    if (x>0)
	       this.Intersections[x][y].West = this.Intersections[x-1][y];
	 }
   }
};
