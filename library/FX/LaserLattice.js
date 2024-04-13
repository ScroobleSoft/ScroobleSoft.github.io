
//---------------------------------------------------
//---------- GENIE LASER LATTICE --------------------
var GenieLaserLattice = function() {
   var GraphicsTool;
   var ScreenManager;
   var ScreenRect;
   var ScreenQuad;
   var Perspective;

   var Segments;
   var SegmentLength;
   var Segment;

   var i, dstn, pos, offst, sgmnts;	//scratch variables
};
GenieLaserLattice.prototype = {
   Set(nSegments, sLength, prspctv) {
      this.Segments = new GenieFXList();
      this.Segments.Set(nSegments, GenieLaserSegment, this);
      this.SegmentLength = sLength;	//TODO: could have 32 as a default value since most sprites don't exceed that width
      this.Perspective = prspctv;

      this.dstn = new Coordinate2D();
      this.offst = new Coordinate2D();
      this.pos = new Coordinate2D();
   },
   SetLinks(gTool, sManager, sRect, sQuad) {
      this.GraphicsTool = gTool;
      this.ScreenManager = sManager;
      this.ScreenRect = sRect;
      this.ScreenQuad = sQuad;
   },
   Add(pos, dstn, dstnc, specs) {  //TODO: may also have to pass in whether it was a succesful hit (spark) or not (could have a separate spark list)

      //Add all full segments
      this.sgmnts = Math.ceil(dstnc/this.SegmentLength);
      this.offst.X = (dstn.X-pos.X)/this.sgmnts;
      this.offst.Y = (dstn.Y-pos.Y)/this.sgmnts;
      this.pos.Set(pos.X, pos.Y);
      for (this.i=1;this.i<this.sgmnts;++this.i) {
	 this.Segment = this.Segments.GetOpen();
	 this.dstn.Set(this.pos.X+this.offst.X, this.pos.Y+this.offst.Y);
	 this.Segment.Activate(this.pos, this.dstn, specs);
	 this.pos.Set(this.dstn.X, this.dstn.Y);
      }

      //Add remainder segment
      this.Segment = this.Segments.GetOpen();
      this.Segment.Activate(this.pos, this.dstn, specs);
   },
   Draw(zOrder) {
      for (this.i=0;this.i<this.Segments.length;++this.i)
	 if (this.Segments[this.i].Extant) {
	    this.Segments[this.i].Map();
	    if (this.Segments[this.i].CheckOnScreen())
	       if (zOrder!=undefined) {
		  if (this.Segments[this.i].ScreenMidpoint.Y>=zOrder && this.Segments[this.i].ScreenMidpoint.Y<(zOrder+1))
		     this.Segments[this.i].Draw();
	       } else
		  this.Segments[this.i].Draw();
	 }
   },
   Update() {
      for (this.i=0;this.i<this.Segments.length;++this.i)
	 if (this.Segments[this.i].Extant)
	    this.Segments[this.i].Update();
   }
};
