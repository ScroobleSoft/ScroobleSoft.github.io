/*
 *  used by LaserLattice for individual segments
 *  ISSUE: what about height? will that ever be a factor?
 *  TODO: can this be derived from GENIeFX?
 */
//---------------------------------------------------
//---------- GENIE LASER SEGMENT --------------------
var GenieLaserSegment = function() {
   var Lattice;
   var Specs;
   var Position, Destination;
   var Midpoint;				//for on-screen check
   var ScreenPosition, ScreenDestination
   var ScreenMidpoint;				//for Z-Order sorting
   var Opacity;
   var Extant;
//   var BoundingBox;
};
GenieLaserSegment.prototype = {
   Set(lttc) {
      this.Position = new Coordinate2D();
      this.Destination = new Coordinate2D();
      this.Midpoint = new Coordinate2D();
      this.ScreenPosition = new Coordinate2D();
      this.ScreenDestination = new Coordinate2D();
      this.ScreenMidpoint = new Coordinate2D();
      this.BoundingBox = new GenieRect();
      this.Lattice = lttc;
   },
   Activate(pos, dst, specs) {
      this.Position.Set(pos.X, pos.Y);
      this.Destination.Set(dst.X, dst.Y);
      this.Midpoint.X = this.Position.X + ((this.Destination.X-this.Position.X)/2);
      this.Midpoint.Y = this.Position.Y + ((this.Destination.Y-this.Position.Y)/2);
      this.Specs = specs;
      this.Opacity = 1.0;
   },
   Map() {
      this.ScreenPosition.Set(this.Position.X-this.Lattice.ScreenRect.L, this.Position.Y-this.Lattice.ScreenRect.T);
      this.ScreenDestination.Set(this.Destination.X-this.Lattice.ScreenRect.L, this.Destination.Y-this.Lattice.ScreenRect.T);
      if (this.Lattice.Perspective) {
	 GeoUtils.PerspectiveAdjust(this.ScreenPosition, this.Lattice.Perspective);
	 GeoUtils.PerspectiveAdjust(this.ScreenDestination, this.Lattice.Perspective);
      }
      this.ScreenMidpoint.X = this.ScreenPosition.X + ((this.ScreenDestination.X-this.ScreenPosition.X)/2);
      this.ScreenMidpoint.Y = this.ScreenPosition.Y + ((this.ScreenDestination.Y-this.ScreenPosition.Y)/2);
   },
   CheckOnScreen(sLength) {
      return (SpaceUtils.CheckPointInPolygon(this.Midpoint, this.Lattice.ScreenQuad, sLength));
   },
   Update() {
      this.Opacity -= 0.01;
      if (this.Opacity<=0)
	 this.Extant = false;
   },
   Draw() {
      this.Lattice.GraphicsTool.DrawLine(this.ScreenPosition, this.ScreenDestination, this.Specs.COLOUR || CANNON.COLOUR, this.Specs.W || CANNON.W, this.Opacity);
   }
};
