/*
 *  re-design: first pick a station (view shows a few octagonal ones with ship very tiny), then switch to larger (still top-down) view for docking,
 *  manual docking being cheaper since auto-docking requires paying a fee to station for it to use its tractor beam; a third view would show interior
 *
 *  TODO: this is only displayed in aaa version, and so is REDUNDANT, but maybe can be moved elsewhere (however, will only look attractive if the polygon
 *	  faces are shaded to give a 3D effect
 */
//------------------------------------------------------
//----------- SOLAR DOCKING STATION --------------------
var SolarDockingStation = function() {
   var Screen;
   var GraphicsTool;
   var CalcPad;
   var Planet;
   var State, Rotation;
   var Dividers;

   var Angle, OpeningAngle;
   var Sides;
   var Vertices;
   var ResizedVertices;
   var EntranceVertices;
   var ResizedEntranceVertices;

   var i;
};
SolarDockingStation.prototype = {
   Set(cntxt, gTool, cPad) {	//ISSUE: CalcPad is currently REDUNDANT - will only be used if station edge is not straight
      var i;

      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.CalcPad = cPad;
      this.Dividers = new Array(6);
      this.Rotation = 0;
      for (i=0;i<6;++i)
	 this.Dividers[i] = 60 + (120*i);

      this.Generate();
   },
   SetPlanet(planet) {

      //UNLOGGED

      this.Planet = planet;
   },
   Generate() {
      var sides;
      var polygon;
/*
      //Set station coordinates
      this.Sides = SOLArDOCKINgSTATION.MInSIDES + Utilities.GetRandomNumber(1+SOLArDOCKINgSTATION.MAxSIDES-SOLArDOCKINgSTATION.MInSIDES, STARtAtZERO);
      this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, SOLArDOCKINgSTATION.SIZE);
      this.ResizedVertices = Utilities.CreateArray(this.Vertices.length, Coordinate2D);

      //Set entrance coordinates
      this.EntranceVertices = this.CalcPad.GetPolygonVertices(SOLArDOCKINgSTATION.ENTRANCE.SIDES, SOLArDOCKINgSTATION.ENTRANCE.SIZE);
      this.ResizedEntranceVertices = Utilities.CreateArray(SOLArDOCKINgSTATION.ENTRANCE.SIDES);
*/
      this.Vertices = new Array();
      this.ResizedVertices = new Array();
      this.EntranceVertices = new Array();
      this.ResizedEntranceVertices = new Array();

      for (sides=SOLArDOCKINgSTATION.MInSIDES;sides<=SOLArDOCKINgSTATION.MAxSIDES;++sides) {
	 polygon = this.CalcPad.GetPolygonVertices(sides, SOLArDOCKINgSTATION.SIZE);
//	 polygon.forEach(function(vertex){vertex.X += SCREEN.WIDTH/2; vertex.Y = (SCREEN.WIDTH/2)-vertex.Y;});
	 this.Vertices.push(polygon);
	 polygon = this.CalcPad.GetPolygonVertices(sides, SOLArDOCKINgSTATION.ENTRANCE.SIZE);
//	 polygon.forEach(function(vertex){vertex.X += SCREEN.WIDTH/2; vertex.Y = (SCREEN.WIDTH/2)-vertex.Y;});
	 this.EntranceVertices.push(polygon);
	 polygon = ArrayUtils.Create(sides, Coordinate2D);
	 this.ResizedVertices.push(polygon);
	 polygon = ArrayUtils.Create(sides, Coordinate2D);
	 this.ResizedEntranceVertices.push(polygon);
      }
   },
   SetDimensions(sides) {
      var i;

      //Reset vertices
      this.Sides = sides - SOLArDOCKINgSTATION.MInSIDES;
      for (i=0;i<this.ResizedVertices[this.Sides].length;++i) {
	 this.ResizedVertices[this.Sides][i].X = this.Vertices[this.Sides][i].X;
	 this.ResizedVertices[this.Sides][i].Y = this.Vertices[this.Sides][i].Y;
	 this.ResizedEntranceVertices[this.Sides][i].X = this.EntranceVertices[this.Sides][i].X;
	 this.ResizedEntranceVertices[this.Sides][i].Y = this.EntranceVertices[this.Sides][i].Y;
      }

      //Reset state
      this.State = SOLArDOCKINgSTATION.STATE.SPINNING;
      this.Angle = 0;

      //Set spinning cessation limit
      this.OpeningAngle = this.Randomizer.GetNumberWithinRange(180, 359);
   },
   Update() {

      //UNLOGGED
/*
      switch (this.State) {
	 case SOLArDOCKINgSTATION.STATE.SPINNING:
	    ++this.Angle;
	    if (this.Angle==360)
	       this.Angle = 0;
	    break;
	 case SOLArDOCKINgSTATION.STATE.EXPANDING:
	    break;
	 case SOLArDOCKINgSTATION.STATE.CONTRACTING:
	    break;
	 case SOLArDOCKINgSTATION.STATE.OPENING:
	    break;
	 case SOLArDOCKINgSTATION.STATE.CLOSING:
	    break;
      }
*/
      ++this.Rotation;
      for (this.i=0;this.i<this.Dividers.length;++this.i)
	 if (this.Rotation==120) {
	    this.Dividers[this.i] -= 120;
	    if (this.i==this.Dividers.length-1)
	       this.Rotation =0;
	 } else
	    ++this.Dividers[this.i];
   },
/*
   ReSize(scale) {  //TODO: needs modification
      for (this.i=0;this.i<this.Vertices.length;++this.i) {
	 this.ResizedVertices[this.i].X = scale*this.Vertices[this.i].X;
	 this.ResizedVertices[this.i].Y = scale*this.Vertices[this.i].Y;
      }
      for (this.i=0;this.i<this.EntranceVertices.length;++this.i) {
	 this.ResizedEntranceVertices[this.i].X = scale*this.EntranceVertices[this.i].X;
	 this.ResizedEntranceVertices[this.i].Y = scale*this.EntranceVertices[this.i].Y;
      }
   },
*/
   Draw(size, angle) {
      this.Screen.fillStyle = this.Planet.ContinentColour.GetRGBFormat();
      for (this.i=0;this.i<this.Dividers.length;++this.i)
	 this.GraphicsTool.DrawLine( { X: 500, Y: this.Dividers[this.i] }, { X: SCREEN.WIDTH, Y: this.Dividers[this.i] }, this.Planet.TerrainColour.GetRGBFormat(), 1);
   }
};
