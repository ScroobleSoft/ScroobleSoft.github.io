/*
 *  NOTE: equilateral only right now, but other options, such as right and isosceles, can be added
 */
//----------------------------------------------
//---------- GENIE TRIANGLE --------------------
var GenieTriangle = function() {
   var Height;
   var Base;
   var Alignment;
   var Vertices;
   var BasReliefVertices;

   var i;
};
GenieTriangle.prototype = new GenieShape();
GenieTriangle.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Height = this.Specs.H;
   this.Alignment = this.Specs.ALIGN || DIRECTION.N;
   this.SetVertices();
};
GenieTriangle.prototype.SetVertices = function() {  //UNTESTED
   var hBase, hHeight;  //h- half

   this.Base = (2*this.Height)/Math.tan(Math.PI/3);	//60 degrees
   hBase = this.Base/2;
   hHeight = this.Height/2;
   switch (this.Alignment) {
      case DIRECTION.N:
	 this.Vertices = [ { X: 0, Y: -hHeight }, { X: hBase, Y: hHeight }, { X: -hBase, Y: hHeight } ];
	 break;
      case DIRECTION.E:
	 this.Vertices = [ { X: hHeight, Y: 0 }, { X: -hHeight, Y: hBase }, { X: -hHeight, Y: -hBase } ];
	 break;
      case DIRECTION.S:
	 this.Vertices = [ { X: 0, Y: hHeight }, { X: hBase, Y: -hHeight }, { X: -hBase, Y: -hHeight } ];
	 break;
      case DIRECTION.W:
	 this.Vertices = [ { X: -hHeight, Y: 0 }, { X: hHeight, Y: -hBase }, { X: hHeight, Y: hBase } ];
	 break;
   }
};
GenieTriangle.prototype.Draw = function(x, y, size, colour, lineWidth, style, angle, opcty) {

   //UNLOGGED - quick and dirty at the moment

   if (lineWidth) {
	 this.Screen.strokeStyle = colour;
	 this.Screen.lineWidth = lineWidth;
   } else
	 this.Screen.fillStyle = colour;
      this.Screen.beginPath();
      this.Screen.moveTo(x+this.Vertices[0].X, y+this.Vertices[0].Y);
      for (this.i=1;this.i<this.Vertices.length;++this.i)
	 this.Screen.lineTo(x+this.Vertices[i].X, y+this.Vertices[i].Y);
      if (lineWidth) {
	 this.Screen.lineTo(x+this.Vertices[0].X, y+this.Vertices[0].Y);
	 this.Screen.stroke();
      } else
	 this.Screen.fill();
      this.Screen.closePath();
};
