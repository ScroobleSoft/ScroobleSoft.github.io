
//-------------------------------------------------------
//---------- GENIE IRREGULAR POLYGON --------------------
var GenieIrregularPolygon = function() {
	var SpecsVertices;
	var Vertices;
	var BasReliefVertices;

	var i;
};
GenieIrregularPolygon.prototype = new GenieShape();
GenieIrregularPolygon.prototype.Set = function(cntxt, specs) {
	GenieShape.prototype.Set.call(this, cntxt, null, specs);

	this.SpecsVertices = specs.VERTICES;
	this.Vertices = new GenieArray();
	this.Vertices.Set(this.SpecsVertices.length, Coordinate2D);
	this.Reset();
};
GenieIrregularPolygon.prototype.Reset = function() {
	var i;

	GenieShape.prototype.Reset.call(this);

	for (i=0;i<this.Vertices.length;++i) {
		this.Vertices[i].X = this.SpecsVertices[i].X;
		this.Vertices[i].Y = this.SpecsVertices[i].Y;
	}
};
GenieIrregularPolygon.prototype.Draw = function(x, y, colour, lWidth, opcty, style) {

	//UNLOGGED

	if (x==null)
		x = this.X;
	if (y==null)
		y = this.Y;
	colour = colour || this.Colour;
	colour = colour || "black";
	if (lWidth==null)
		lWidth = this.LineWidth;
	opcty = opcty || this.Opacity;

	if (opcty) {
		this.GlobalAlpha = this.Context.globalAlpha;
		this.Context.globalAlpha = opcty;
	} else
		this.GlobalAlpha = null;

	this.ExecuteDraw(x, y, this.Vertices, colour, lWidth);

	if (this.GlobalAlpha)
		this.Context.globalAlpha = this.GlobalAlpha;
};
GenieIrregularPolygon.prototype.SpecsDraw = function() {

	this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.Specs.VERTICES, this.Specs.COLOUR, this.Specs.LW);
};
GenieIrregularPolygon.prototype.QuickDraw = function() {

	this.ExecuteDraw(this.X, this.Y, this.Vertices, this.Colour, this.LineWidth);
};
GenieIrregularPolygon.prototype.ExecuteDraw = function(x, y, vrtcs, colour, lWidth) {

	if (lWidth) {
		this.Context.lineWidth = lWidth;
		this.Context.strokeStyle = colour;
	} else
		this.Context.fillStyle = colour;
	this.Context.beginPath();
	this.Context.moveTo(x+vrtcs[0].X, y+vrtcs[0].Y);
	for (this.i=1;this.i<vrtcs.length;++this.i)
		this.Context.lineTo(x+vrtcs[this.i].X, y+vrtcs[this.i].Y);
	if (lWidth) {
		this.Context.lineTo(x+vrtcs[0].X, y+vrtcs[0].Y);
		this.Context.stroke();
	} else
		this.Context.fill();
	this.Context.closePath();
};
/*
GenieIrregularPolygon.prototype.DrawBasRelief = function(x, y, size) {

	//UNLOGGED - since at the moment colours, line widths and angles are fixed
	//NOTE: this is only applicable to GJ MOON crater drawings

	if (!this.Vertices) {
		this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, size);
		this.BasReliefVertices = this.CalcPad.GetPolygonVertices(this.Sides, size-1);
	}

	//Draw light border
	this.Context.lineWidth = 1;
	this.Context.strokeStyle = GREY.MEDIUM;
	this.Context.beginPath();
	this.Context.moveTo(x+this.Vertices[0].X, y-this.Vertices[0].Y);
	for (this.i=1;this.i<Math.floor(this.Sides/2)+1;++this.i)
		this.Context.lineTo(x+this.Vertices[this.i].X, y-this.Vertices[this.i].Y);
	this.Context.stroke();
	this.Context.closePath();

	//Draw dark border
	this.Context.lineWidth = 1;
	this.Context.strokeStyle = "white";
	this.Context.beginPath();
	this.Context.moveTo(x+this.Vertices[Math.floor(this.Sides/2)].X, y-this.Vertices[Math.floor(this.Sides/2)].Y);
	for (this.i=Math.floor(this.Sides/2)+1;this.i<this.Sides;++this.i)
		this.Context.lineTo(x+this.Vertices[this.i].X, y-this.Vertices[this.i].Y);
	this.Context.lineTo(x+this.Vertices[0].X, y-this.Vertices[0].Y);
	this.Context.stroke();
	this.Context.closePath();
};
*/
