
//------------------------------------------------
//---------- GENIE PULSE BEAM --------------------
var GeniePulseBeam = function() {  //NOTE: Frames don't even get used here
//NOTE: beam should go back and forth over a 600px distance in 1 sec, so will have to travel 20px/frame, given as P in specs
   var GraphicsTool;
   var Destination;
   var Colour;
   var Thickness;
   var Opacity;
//   var Specs;		//TODO: move to GenieFX
   var PixelsPerFrame;
   var Segment;
   var Segments;
   var Advancing;

   var x, y, pbPixels, pbDistance, pbColour, pbThickness, pbOpacity;
};
GeniePulseBeam.prototype = new GenieFX();
GeniePulseBeam.prototype.Set = function(specs, gtool) {  //NOTE: spark sprite may be passed here later
//   GenieFX.prototype.Set.call(this, specs);  //ISSUE: GenieFX needs to store specs

   this.GraphicsTool = gtool;
   this.Specs = specs;		//TODO: move to GenieFX
};
GeniePulseBeam.prototype.Clone = function(pBeam) {
   this.Set(pBeam.Specs, pBeam.GraphicsTool);
};
GeniePulseBeam.prototype.Activate = function(pos, dstn) {
   GenieFX.prototype.Activate.call(this, pos);

   if (!this.Destination)
      this.Destination = new Coordinate2D();
   this.Destination.X = dstn.X;
   this.Destination.Y = dstn.Y;
   this.pbDistance = Utilities.GetDistance(this.Position, this.Destination);
   this.pbPixels = this.PixelsPerFrame || this.Specs.P;
   this.Segments = this.Distance/this.pbPixels;
   this.Segment = 1;
   this.Advancing = true;
   this.Extant = true;
};
GeniePulseBeam.prototype.Draw = function() {
   this.pbColour = this.Colour || this.Specs.COLOUR;	//NOTE: this and the 2 below are adding inefficiency
   this.pbThickness = this.Thickness || this.Specs.W;
   this.pbOpacity = this.Opacity || this.Specs.O;
   if (this.Advancing) {
      this.x = this.Position.X + (this.Destination.X-this.Position.X)*(this.Segment/this.Segments);
      this.y = this.Position.Y + (this.Destination.Y-this.Position.Y)*(this.Segment/this.Segments);
      this.GraphicsTool.GOL.G2D.DrawLine(this.Position.X, this.Position.Y, this.x, this.y, this.pbColour, this.pbThickness, this.pbOpacity);
      ++this.Segment;
      if (this.Segment==this.Segments)
	  this.Advancing = false;
   } else {
      this.x = this.Position.X + (this.Destination.X-this.Position.X)*(this.Segment/this.Segments);
      this.y = this.Position.Y + (this.Destination.Y-this.Position.Y)*(this.Segment/this.Segments);
      this.GraphicsTool.GOL.G2D.DrawLine(this.x, this.y, this.Destination.X, this.Destination.Y, this.pbColour, this.pbThickness, this.pbOpacity);
      --this.Segment;
      if (this.Segment==0)
	 this.Extant = false;
   }
};
