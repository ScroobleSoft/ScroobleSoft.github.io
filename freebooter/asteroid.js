/*
 *  size can vary from 40 to 60 px in length and width
 */
//-------------------------------------------------
//----------- SOLAR ASTEROID ----------------------
var SolarAsteroid = function() {
   var GraphicsTool, CalcPad;
   var Randomizer;
   var Location;
   var Speed, SpinRate;
   var Vertices, CurrentVertices;
   var Angle;
};
SolarAsteroid.prototype = {
   Set(gTool, cPad, rGenerator) {
      this.GraphicsTool = gTool;
      this.CalPad = cPad;
      this.Randomizer = rGenerator;
      this.Angle = 0;
   },
   Generate() {
      var nSides;
      var size;

      //UNLOGGED

      this.Speed = this.Randomizer.GetNumberWithinRange(1,4);
      this.SpinRate = this.Randomizer.GetNumberWithinRange(1,3);
      nSides = this.Randomizer.GetNumberWithinRange(8,20);
      size = this.Randomizer.GetNumberWithinRange(40,60);
      this.Vertices = this.CalcPad.GetPolygonVertices(nSides, size);
   },
   ReConfigure() {

      //UNLOGGED

   },
   CheckOnScreen() {
   },
   Update() {
   },
   Draw() {
   }
};
