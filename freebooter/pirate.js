
//-------------------------------------------
//---------- PIRATE SHIP --------------------
var PirateShip = function() {
   var GraphicsTool, CalcPad;
   var Faces;
   var Location;
   var Colours;
   var Slot;				//1 of 20
   var AngleChangeFlag;
};
PirateShip.prototype = new SolarShip();
PirateShip.prototype.Set = function(specs, pirate) {
   SolarShip.prototype.Set.call(this, specs, pirate);

   this.Angle = 0;
   this.Location = new Coordinate2D();
};
PirateShip.prototype.SetLinks = function(gTool, cPad, rGenerator) {
   this.GraphicsTool = gTool;
   this.CalcPad = cPad;
   this.Randomizer = rGenerator;
};
PirateShip.prototype.SetPosition = function(slot) {
   SolarShip.prototype.SetPosition.call(this, PiratePositions[slot]);
};
PirateShip.prototype.Generate = function() {
   var nSides;
   var vrtcs;

   nSides = 2*this.Randomizer.GetInRange(4,10);
   vrtcs = this.CalcPad.GetPolygonVertices(nSides, 40);
   this.Faces = new Array(nSides);
   for (this.i=0;this.i<nSides;++this.i) {
      this.Faces[this.i] = new Array();
      this.Faces[this.i].push( { X: 0, Y: 0 } );
      this.Faces[this.i].push( { X: vrtcs[this.i].X, Y: vrtcs[this.i].Y } );
      if (this.i==(this.Faces.length-1))
	 this.Faces[this.i].push( { X: vrtcs[0].X, Y: vrtcs[0].Y } );
      else
	 this.Faces[this.i].push( { X: vrtcs[this.i+1].X, Y: vrtcs[this.i+1].Y } );
   }
   this.Colours = PirateColours[this.Randomizer.GetInRange(0,11)];
};
PirateShip.prototype.Update = function() {
   //-update location
   //-spin in place if need to turn
   //-update firing/re-charging
};
PirateShip.prototype.Draw = function() {

   //UNLOGGED

   //-draw rotated in its slot

   this.DetermineScreenCoords();
   for (this.i=0;this.i<this.Faces.length;++this.i) {
      if (this.i % 2)
	 this.GraphicsTool.DrawPolygon(this.ScreenCoords.X, this.ScreenCoords.Y, this.Faces[this.i], this.Colours[1], 0);
      else
	 this.GraphicsTool.DrawPolygon(this.ScreenCoords.X, this.ScreenCoords.Y, this.Faces[this.i], this.Colours[0], 0);
   }
};
