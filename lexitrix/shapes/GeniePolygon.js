
//---------------------------------------------
//---------- GENIE POLYGON --------------------
var GeniePolygon = function() {
   var Sides;
   var SpecsVertices;
   var Vertices;
   var BasReliefVertices;

   var i, x, y;
};
GeniePolygon.prototype = new GenieShape();
GeniePolygon.prototype.Set = function(cntxt, cPad, specs) {
   GenieShape.prototype.Set.call(this, cntxt, cPad, specs);

   this.Sides = this.Specs.SIDES;
   //TODO: may also supply ANGLE in specs, which would have to be passed as an argument below
   this.SpecsVertices = this.CalcPad.GetPolygonVertices(this.Sides, this.Specs.Size);
   this.Vertices = new GenieArray();
   this.Vertices.Set(this.Sides, Coordinate2D);
   this.Reset();
};
GeniePolygon.prototype.Reset = function() {
   var i;

   GenieShape.prototype.Reset.call(this);

   if (this.Sides==this.Specs.SIDES && this.Size==this.Specs.SIZE)			//NOTE: number of sides and size can be changed by app
      for (i=0;i<this.Sides;++i) {
	 this.Vertices[i].X = this.SpecsVertices[i].X;
	 this.Vertices[i].Y = this.SpecsVertices[i].Y;
      }
   else {
      this.Size = this.Specs.SIZE;
      this.Sides = this.Specs.SIDES;
      this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, this.Size);		//NOTE: old vertices are lost
   }
};
GeniePolygon.prototype.ResetSides = function(sides) {

   this.Sides = sides;
   this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, this.Size);	//NOTE: old vertices are lost
};
GeniePolygon.prototype.ResetSize = function(size) {

   //UNLOGGED - base class call? would be applicable to diamond, circle etc

   this.Size = size;
   this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, this.Size);	//NOTE: old vertices are lost
};
GeniePolygon.prototype.ResetColour = function(colour) {

   //UNLOGGED - should be in GenieShape

   this.Colour = colour;
};
GeniePolygon.prototype.Draw = function(x, y) {

   //UNLOGGED

   //TODO: below is a TEMP HACK
   if (this.Style==STYLE.BAsRELIEF) {
      this.QuickDraw(x, y);
      this.DrawBasRelief(x, y);
   } else
      this.QuickDraw(x, y);
};
GeniePolygon.prototype.SpecsDraw = function(x, y) {

   x = x || this.Specs.X;
   y = y || this.Specs.Y;
   this.ExecuteDraw(x, y, this.SpecsVertices, this.Specs.COLOUR, this.Specs.LW);
};
GeniePolygon.prototype.QuickDraw = function(x, y) {

   x = x || this.Specs.X;
   y = y || this.Specs.Y;
   this.ExecuteDraw(x, y, this.Vertices, this.Colour, this.LineWidth);
};
GeniePolygon.prototype.ExecuteDraw = function(x, y, vrtcs, colour, lWidth) {

   //UNLOGGED

   if (lWidth) {
      this.Context.lineWidth = lWidth;
      this.Context.strokeStyle = colour;
   } else
      this.Context.fillStyle = colour;
   this.Context.beginPath();
   this.Context.moveTo(x+vrtcs[0].X, y+vrtcs[0].Y);
   for (this.i=1;this.i<this.Sides;++this.i)
      this.Context.lineTo(x+vrtcs[this.i].X, y+vrtcs[this.i].Y);
   if (lWidth) {
      this.Context.lineTo(x+vrtcs[0].X, y+vrtcs[0].Y);
      this.Context.stroke();
   } else
      this.Context.fill();
   this.Context.closePath();
};
GeniePolygon.prototype.DrawBasRelief = function(x, y, size) {

   //UNLOGGED - since at the moment colours, line widths and angles are fixed
   //NOTE: this is only applicable to GJ MOON crater drawings (because of colours)

   if (!this.Vertices) {
      this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, size);
      this.BasReliefVertices = this.CalcPad.GetPolygonVertices(this.Sides, size-1);
   }

   //Draw light border (or dark if inverted)
   this.Context.lineWidth = 2;
   if (this.Specs.BAsRELIEF) {  //Check if 'inverted' is chosen
      if (this.Specs.COLOURS)
	 this.Context.strokeStyle = this.Specs.COLOURS.L;
      else
	 this.Context.strokeStyle = "white";
   } else {
      if (this.Specs.COLOURS)
	 this.Context.strokeStyle = this.Specs.COLOURS.D;
      else
	 this.Context.strokeStyle = GREY.MEDIUM;
   }
   this.Context.beginPath();
   this.Context.moveTo(x+this.Vertices[0].X, y+this.Vertices[0].Y);
   for (this.i=1;this.i<Math.floor(this.Sides/2)+1;++this.i)
      this.Context.lineTo(x+this.Vertices[this.i].X, y+this.Vertices[this.i].Y);
   this.Context.stroke();
   this.Context.closePath();

   //Draw dark border (or light if inverted)
   this.Context.lineWidth = 1;
   if (this.Specs.BAsRELIEF) {  //Check if 'inverted' is chosen
      if (this.Specs.COLOURS)
	 this.Context.strokeStyle = this.Specs.COLOURS.D;
      else
	 this.Context.strokeStyle = GREY.MEDIUM;
   } else {
      if (this.Specs.COLOURS)
	 this.Context.strokeStyle = this.Specs.COLOURS.L;
      else
	 this.Context.strokeStyle = "white";
   }
   this.Context.beginPath();
   this.Context.moveTo(x+this.Vertices[Math.floor(this.Sides/2)].X, y+this.Vertices[Math.floor(this.Sides/2)].Y);
   for (this.i=Math.floor(this.Sides/2)+1;this.i<this.Sides;++this.i)
      this.Context.lineTo(x+this.Vertices[this.i].X, y+this.Vertices[this.i].Y);
   this.Context.lineTo(x+this.Vertices[0].X, y+this.Vertices[0].Y);
   this.Context.stroke();
   this.Context.closePath();
};
