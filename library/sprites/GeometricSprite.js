/*
 *  .Shapes array is useful for sending a mass rotate/flip/scale etc. command
 *  TODO: instead of a gallery, should have a 'states' or 'forms' array that saves pre-computed dimensions (CompositeSprite will
 *	  still need a gallery)
 */
//------------------------------------------------
//---------- GEOMETRIC SPRITE --------------------
var GeometricSprite = function() {
	var CalcPad, GraphicsTool;
	var Buffer, BufferFlag;
	var GS;	//essentially, transformed specs . . . might be REDUNDANT
	var Shapes;

	var i, ox, oy;	//scratch variables
};
GeometricSprite.prototype = new GenieSprite();
GeometricSprite.prototype.Set = function(cntxt, specs, cPad) {
	GenieSprite.prototype.Set.call(this, cntxt, null, specs);

	this.CalcPad = cPad;
	this.SetShapesArray();
};
GeometricSprite.prototype.SetContext = function(cntxt) {

	for (this.i=0;this.i<this.Shapes.length;++this.i)
		this.Shapes[this.i].Context = cntxt;
};
GeometricSprite.prototype.SetShapesArray = function() {

	this.Shapes = new Array(this.Specs.GS.length);
	this.SetShapes(this.Shapes, this.Specs.GS);
};
GeometricSprite.prototype.SetShapes = function(aShapes, gSpecs) {
	var i;
	var specs;
	var shape;

	//UNLOGGED

	for (i=0;i<gSpecs.length;++i) {
		switch (gSpecs[i].SHAPE) {
			case SHAPE.LINE:
				shape = new GenieLineGraphic();
				shape.Set(this.Context, gSpecs[i]);
				break;
			case SHAPE.ARC:
				break;
			case SHAPE.CIRCLE:
				break;
			case SHAPE.ELLIPSE:
				shape = new GenieEllipse();
				shape.Set(this.Context, gSpecs[i]);
				break;
			case SHAPE.TRIANGLE:
				break;
			case SHAPE.RECTANGLE:
				shape = new GenieRectangle();
				shape.Set(this.Context, gSpecs[i]);
				break;
			case SHAPE.DIAMOND:
				break;
			case SHAPE.POLYGON:
				shape = new GeniePolygon();
				shape.Set(this.Context, this.CalcPad, gSpecs[i]);
				break;
			case SHAPE.HEXAGON:
				break;
			case SHAPE.OCTAGON:
				break;
			case SHAPE.IRREGULAR:
				shape = new GenieIrregularPolygon();
				shape.Set(this.Context, gSpecs[i]);
				break;
		}
		aShapes[i] = shape;
	}
};
GeometricSprite.prototype.ActivateBuffer = function(w, h) {
	var cntxt;

	//Create buffer if necessary
	if (!this.Buffer) {
		this.Buffer = new GenieBuffer();
		this.Buffer.Set();
		if (w) {
	 this.Buffer.Canvas.width = w;
	 this.Buffer.Canvas.height = h;
		}
	} else
		this.Buffer.Clear();

	//Draw to buffer
	this.SetContext(this.Buffer.Context);
	this.Draw(this.Buffer.Canvas.width/2, this.Buffer.Canvas.height/2);
	this.SetContext(this.Context);
	this.BufferFlag = true;
};
GeometricSprite.prototype.DeactivateBuffer = function() {

	this.BufferFlag = false;
};
GeometricSprite.prototype.Draw = function(x, y) {

	if (this.BufferFlag)
		this.Context.drawImage(this.Buffer.Canvas, x-(this.Buffer.Canvas.width/2), y-(this.Buffer.Canvas.height/2));
	else {
		for (this.i=0;this.i<this.Shapes.length;++this.i)
	 if (this.Shapes[this.i].Specs.SHAPE==SHAPE.LINE)
		 this.Shapes[this.i].Draw(x, y, this.Shapes[this.i].Point1, this.Shapes[this.i].Point2);
	 else
		 this.Shapes[this.i].Draw(x+this.Shapes[this.i].X, y+this.Shapes[this.i].Y);
	}
};
GeometricSprite.prototype.Flip = function(orntd) {

	//LOGGED - UNTESTED

	for (this.i=0;this.i<this.Shapes.length;++this.i) {
		if (orntd & FLIPPED.HORIZONTAL)
	 this.Shapes[this.i].X = -this.Shapes[this.i].X;
		if (orntd & FLIPPED.VERTICAL)
	 this.Shapes[this.i].Y = -this.Shapes[this.i].Y;
	}
};
GeometricSprite.prototype.Rotate = function(angle) {

	//UNLOGGED

	for (this.i=0;this.i<this.Shapes.length.length;++this.i) {
		if (this.Shapes[this.i]==SHAPE.LINE) {
	 GeoUtils.Rotate(this.Shapes[i].Point1, angle);
	 GeoUtils.Rotate(this.Shapes[i].Point2, angle);
		} else
	 GeoUtils.Rotate(this.Shapes[i], angle);
	}
};
GeometricSprite.prototype.DrawFlipped = function(x, y) {

	//can't be LOGGED

};
GeometricSprite.prototype.DrawRotated = function(x, y, angle) {

	//UNLOGGED

};
GeometricSprite.prototype.DrawResized = function(x, y, scale) {  //NOTE: only implementing for Rects with lineWidth of 0 . . . only revision is UNLOGGED

	for (this.i=0;this.i<this.Specs.GS.length;++this.i) {
		this.Context.fillStyle = this.Specs.GS[this.i].COLOUR;
		this.Context.fillRect(x+(scale*this.Specs.GS[this.i].X), y+(scale*this.Specs.GS[this.i].Y), scale*this.Specs.GS[this.i].W, scale*this.Specs.GS[this.i].H);
	}
};
GeometricSprite.prototype.DrawTransformed = function(x, y) {

	//UNLOGGED - only implemented for buffered form, and that may be the only way drawing in this way will be allowed

	this.Context.translate(x, y);
	if (this.Angle)
		this.Context.rotate(this.Angle*(Math.PI/180));

	if (this.Scale==1.0 || !this.Scale)
		this.Context.drawImage(this.Buffer.Canvas, -(this.Buffer.Canvas.width/2), -(this.Buffer.Canvas.height/2));
	else {
		this.ox = (((1-this.Scale)/2)*this.Buffer.Canvas.width) - (this.Buffer.Canvas.width/2);
		this.oy = (((1-this.Scale)/2)*this.Buffer.Canvas.height) - (this.Buffer.Canvas.height/2);
		this.Context.drawImage(this.Buffer.Canvas, 0, 0, this.Buffer.Canvas.width, this.Buffer.Canvas.height, this.ox, this.oy, this.Scale*this.Buffer.Canvas.width, this.Scale*this.Buffer.Canvas.height);
	}

	if (this.Angle)
		this.Context.rotate(-this.Angle*(Math.PI/180));
	this.Context.translate(-x, -y);
};
GeometricSprite.prototype.ReColour = function(aPairs) {

	if (Array.isArray(aPairs[0])) {  //check if array or array of arrays is passed
		if (Array.isArray(this.Specs.GS[0][0])) {	//check if its an Animated Composite Sprite
			for (this.i=0;this.i<aPairs.length;++this.i)
				for (this.j=0;this.j<this.Specs.GS.length;++this.j)
					for (this.k=0;this.k<this.Specs.GS[this.j].length;++this.k)
						if (this.Specs.GS[this.j][this.k].COLOUR==aPairs[this.i][0])
							this.Specs.GS[this.j][this.k].COLOUR = aPairs[this.i][1];
		} else {						//only a Composite Sprite
			for (this.i=0;this.i<aPairs.length;++this.i)
				for (this.j=0;this.j<this.Specs.GS.length;++this.j)
					if (this.Specs.GS[this.j].COLOUR==aPairs[this.i][0])
						this.Specs.GS[this.j].COLOUR = aPairs[this.i][1];
		}
	} else {
		if (Array.isArray(this.Specs.GS[0][0])) {	//check if its an Animated Composite Sprite
			for (this.i=0;this.i<this.Specs.GS.length;++this.i)
				for (this.j=0;this.j<this.Specs.GS[this.i].length;++this.j)
					if (this.Specs.GS[this.i][this.j].COLOUR==aPairs[0])
						this.Specs.GS[this.i][this.j].COLOUR = aPairs[1];
		} else {
			for (this.i=0;this.i<this.Specs.GS.length;++this.i)
				if (this.Specs.GS[this.i].COLOUR = aPairs[0])
					this.Specs.GS[this.i].COLOUR = aPairs[1];
		}
	}
};
