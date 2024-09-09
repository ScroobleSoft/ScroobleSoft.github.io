/*
 *  rule of thumb - use GenieGraphics if drawing simple lines and shapes that don't need storage, otherwise use GenieShapes and descendants
 */
//----------------------------------------------
//---------- GENIE GRAPHICS --------------------
var GenieGraphics = function() {
	var Context;
	var Screen, InfoBox, ControlPanel;
	var CalcPad;
	var GlobalAlpha;
	var Offset;
	var Vertices;			//TEMP only - for backward compatibility (eventually will be used for Octagon drawing)
	var Octagon;

	var i, angle, radians, height, segment, coords, coords2, vrtcs, half;
};
GenieGraphics.prototype = {
	Set(cntxt, iBox, cPanel) {
		this.Context = cntxt;
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;

		this.Octagon = [ { X: -5, Y: -12 }, { X:  5, Y: -12 }, { X:  12, Y: -5 }, { X:  12, Y:  5 },
				 { X:  5, Y:  12 }, { X: -5, Y:  12 }, { X: -12, Y:  5 }, { X: -12, Y: -5 }  ];
		this.Vertices = ArrayUtils.Create2D(8, Coordinate2D);

		this.coords = new Coordinate2D();
		this.coords2 = new Coordinate2D();
	},
	SetCalcPad(cPad) {

		this.CalcPad = cPad;
	},
	SwitchContext(cntxt) {  //a bit REDUNDANT, DE-LOGGABLE

		if (cntxt)
			this.Context = cntxt;
	},
	SetContext(cntxt) {

		if (cntxt)
			this.Context = cntxt;
	},
	SwitchContextByID(id) {
		switch (id) {
	 case CANVAS.PRIME:
		 this.Context = this.Screen;
		 break;
	 case CANVAS.ZOOM:
		 this.Context = this.InfoBox;
		 break;
	 case CANVAS.CONSOLE:
		 this.Context = this.ControlPanel;
		 break;
		}
	},
	SwitchToInfoBox() {
		this.Context = this.InfoBox;
	},
	SwitchToControlPanel() {
		this.Context = this.ControlPanel;
	},
	RestoreContext() {
		this.Context = this.Screen;
	},
	SetOpacity(opcty) {

		if (opcty) {
	 this.GlobalAlpha = this.Context.globalAlpha;
	 this.Context.globalAlpha = opcty;
		} else
	 this.GlobalAlpha = null;
	},
	ResetOpacity() {

		if (this.GlobalAlpha)
	 this.Context.globalAlpha = this.GlobalAlpha;
	},
	DrawLine(pos, dstn, colour, lWidth, opcty) {

		this.SetOpacity(opcty);
		this.Context.beginPath();
		this.Context.strokeStyle = colour || "black";
		this.Context.lineWidth = lWidth || 1;
		this.Context.moveTo(pos.X, pos.Y);
		this.Context.lineTo(dstn.X, dstn.Y);
		this.Context.stroke();
		this.Context.closePath();
		this.ResetOpacity();
	},
	DrawLines(aPnts, colour, lWidth, opcty) {  //draw joined lined, passed in as an array

		this.DrawPositionedLines(0, 0, aPnts, colour, lWidth, opcty);
	},
	DrawPositionedLines(x, y, aPnts, colour, lWidth, opcty) {

		this.SetOpacity(opcty);
		this.Context.beginPath();
		this.Context.strokeStyle = colour || "black";
		this.Context.lineWidth = lWidth || 1;
		this.Context.moveTo(x+aPnts[0].X, y+aPnts[0].Y);
		for (this.i=1;this.i<aPnts.length;++this.i) {
			this.Context.lineTo(x+aPnts[this.i].X, y+aPnts[this.i].Y);
		}
		this.Context.stroke();
		this.Context.closePath();
		this.ResetOpacity();
	},
	DrawHorizontalLine(pos, lngth, colour, lWidth, opcty) {  //NOTE: draws left to right

		if (lWidth % 2)
			this.coords.Set(pos.X, pos.Y+0.5);
		else
			this.coords.Set(pos.X, pos.Y+1);
		this.coords2.Set(this.coords.X+lngth, this.coords.Y);
		this.DrawLine(this.coords, this.coords2, colour, lWidth, opcty);
	},
	DrawVerticalLine(pos, lngth, colour, lWidth, opcty) {  //NOTE: draws top to bottom

		if (lWidth % 2)
			this.coords.Set(pos.X+0.5, pos.Y);
		else
			this.coords.Set(pos.X+1, pos.Y);
		this.coords2.Set(this.coords.X, this.coords.Y+lngth);
		this.DrawLine(this.coords, this.coords2, colour, lWidth, opcty);
	},
	DrawArc(x, y, rds, sAngle, eAngle, colour, lWidth, opcty) {

		this.SetOpacity(opcty);
		sAngle = GeoUtils.DegreesToRadians(sAngle) - (Math.PI/2);
		eAngle = GeoUtils.DegreesToRadians(eAngle) - (Math.PI/2);
		this.Context.beginPath();
		this.Context.arc(x, y, rds, sAngle, eAngle);
		if (lWidth) {
			this.Context.lineWidth = lWidth;
			this.Context.strokeStyle = colour || "black";
			this.Context.stroke();
		} else {
			this.Context.lineTo(x, y);
			this.Context.fillStyle = colour || "black";
			this.Context.fill();
		}
		this.Context.closePath();
		this.ResetOpacity(opcty);
	},
	DrawCircle(x, y, rds, colour, lWidth, opcty) {

		this.SetOpacity(opcty);
		this.Context.beginPath();
		this.Context.arc(x, y, rds, 0, 2*Math.PI);
		if (lWidth) {
	 this.Context.lineWidth = lWidth || 1;
	 this.Context.strokeStyle = colour || "black";
	 this.Context.stroke();
		} else {
	 this.Context.fillStyle = colour || "black";
	 this.Context.fill();
		}
		this.Context.closePath();
		this.ResetOpacity(opcty);
	},
	SkewSquareToCircle(img, sqr, x, y, rds) {  //draws to screen

		//NOTE: does not take care of image wrapping - calling method responsible for that
		//ASSUMPTION: square and circle are of same size
		//TODO: scaling option should be added

		for (this.i=rds;this.i>rds-(sqr.W/2);--this.i) {
	 this.height = Math.sqrt(Math.pow(rds, 2) - Math.pow(rds-this.i, 2));  //NOTE: height is actually half
	 this.Context.drawImage(img, sqr.L+this.i-1, sqr.T, 1, 2*rds, x-(rds-this.i), y-this.height, 1, 2*this.height);
	 this.Context.drawImage(img, sqr.L+(2*rds)-this.i, sqr.T, 1, 2*rds, x+(rds-this.i), y-this.height, 1, 2*this.height);
		}
	},
	DrawEllipse(x, y, width, height, colour, lWidth, opcty) {
		this.SetOpacity(opcty);
		this.Context.beginPath();
		this.Context.ellipse(x, y, width/2, height/2, 0, 0, 2*Math.PI);
		if (lWidth) {
	 this.Context.lineWidth = lWidth;
	 this.Context.fillStyle = colour || "black";
	 this.Context.stroke();
		} else {
	 this.Context.fillStyle = colour || "black";
	 this.Context.fill();
		}
		this.Context.closePath();
		this.ResetOpacity(opcty);
	},
	DrawTriangle(x, y, size, colour, lWidth, alignment, style, angle, opcty) {

		//Determine vertices
		this.half = size / Math.tan(Math.PI/3);	//60 degrees
		switch (alignment) {
			case DIRECTION.N:
				this.vrtcs = [ { X: 0, Y: size/2 }, { X: this.half, Y: -size/2 }, { X: -this.half, Y: -size/2 } ];
				break;
			case DIRECTION.E:
				this.vrtcs = [ { X: size/2, Y: 0 }, { X: -size/2, Y: -this.half }, { X: -size/2, Y: this.half } ];
				break;
			case DIRECTION.S:
				this.vrtcs = [ { X: 0, Y: -size/2 }, { X: this.half, Y: size/2 }, { X: -this.half, Y: size/2 } ];
				break;
			case DIRECTION.W:
				this.vrtcs = [ { X: -size/2, Y: 0 }, { X: size/2, Y: this.half }, { X: size/2, Y: -this.half } ];
				break;
		}

		//ISSUE: below UNTESTED
		if (angle)
			for (this.i=0;this.i<this.vrtcs.length;++this.i)
				GeoUtils.RotateCoordsArray(this.vrtcs[this.i], angle, null, true);

		this.DrawPolygon(x, y, this.vrtcs, colour, lWidth, opcty);
	},
	DrawDiamond(x, y, rds, colour, lWidth, opcty) {
		this.SetOpacity(opcty);
		this.Context.beginPath();
		this.Context.moveTo(x, y-rds);
		this.Context.lineTo(x+rds, y);
		this.Context.lineTo(x, y+rds);
		this.Context.lineTo(x-rds, y);
		this.Context.lineTo(x, y-rds);
		if (lWidth) {
	 this.Context.lineWidth = lWidth;
	 this.Context.strokeStyle = colour;
	 this.Context.stroke();
		} else {
	 this.Context.fillStyle = colour;
	 this.Context.fill();
		}
		this.Context.closePath();
		this.ResetOpacity(opcty);
	},
	DrawSquare(x, y, size, colour, lWidth, opcty) {
		this.DrawRectangle(x, y, size, size, colour, lWidth, opcty);
	},
	DrawRect(rct, colour, lWidth, opcty) {

		this.DrawRectangle(rct.L, rct.T, rct.W, rct.H, colour, lWidth, opcty);
	},
	DrawRectangle(x, y, w, h, colour, lWidth, opcty) {  //NOTE: putting a very basic one in here for now - should use GenieRectangle for style options

		//TODO: either implement angle rotation, or use GenieRectangle exclusively for that

		this.SetOpacity(opcty);
		colour = colour || "black";
		if (lWidth) {
	 this.Context.strokeStyle = colour;
	 this.Context.lineWidth = lWidth;
	 this.Offset = Math.floor(lWidth/2);
	 if (lWidth % 2)
		 this.Offset += 0.5;
	 this.Context.strokeRect(x+this.Offset, y+this.Offset, w-lWidth, h-lWidth);
		} else {
	 this.Context.fillStyle = colour;
	 this.Context.fillRect(x, y, w, h);
		}
		this.ResetOpacity(opcty);
	},
	DrawRoundedRectangle(x, y, w, h, r, fColour, bColour, lWidth) {  //r- radius of arcs, fColour- frame colour, bColour- background colour

		//Adjust coordinates for better graphical display
		x += 0.5;		//UNTESTED!
		y += 0.5;

		//Draw background if colour specified
		if (bColour) {
	 this.Context.fillStyle = bColour || "white";
	 this.Context.beginPath();
	 this.Context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
	 this.Context.lineTo(x+w-r, y);
	 this.Context.arc(x+w-r, y+r, r, 1.5*Math.PI, 0);
	 this.Context.lineTo(x+w, y+h-r);
	 this.Context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
	 this.Context.lineTo(x+r, y+h);
	 this.Context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
	 this.Context.lineTo(x, y+r);
	 this.Context.fill();
	 this.Context.closePath();
	 r -= (lWidth-1);
		}

		//Draw frame if required, starting from top left corner
		if (fColour) {
	 this.Context.strokeStyle = fColour || "black";
	 this.Context.lineWidth = lWidth || 1;
	 this.Context.beginPath();
	 this.Context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
	 this.Context.lineTo(x+w-r, y);
	 this.Context.arc(x+w-r, y+r, r, 1.5*Math.PI, 0);
	 this.Context.lineTo(x+w, y+h-r);
	 this.Context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
	 this.Context.lineTo(x+r, y+h);
	 this.Context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
	 this.Context.lineTo(x, y+r);
	 this.Context.stroke();
	 this.Context.closePath();
		}
	},
	DrawOctagon(x, y, size, colour, lWidth, opcty) {

		for (this.i=0;this.i<SIDES.OCTAGON;++this.i) {
	 this.Vertices[this.i].X = (size/24)*this.Octagon[this.i].X;
	 this.Vertices[this.i].Y = (size/24)*this.Octagon[this.i].Y;
		}
		this.DrawPolygon(x, y, this.Vertices, colour, lWidth, opcty);
	},
	DrawPolygon(x, y, vrtcs, colour, lWidth, opcty) {
		this.SetOpacity(opcty);
		if (lWidth) {
	 colour = colour || "black";
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
		this.ResetOpacity();
	},
	DrawRegularPolygon(x, y, sides, size, colour, lWidth, opcty, angle) {

		angle = angle || 0;
		this.vrtcs = this.CalcPad.GetPolygonVertices(sides, size, true, angle);
		this.DrawPolygon(x, y, this.vrtcs, colour, lWidth, opcty);
	},
	DrawGrid(x, y, specs) {

		//Colour in background if specified
		if (specs.BACKGROUND) {
			this.Context.fillStyle = specs.BACKGROUND;
			this.Context.fillRect(x, y, specs.W, specs.H);
		}

		//Draw frame
		this.DrawRectangle(x, y, specs.W, specs.H, specs.COLOUR || "black", specs.LW.FRAME || 3);

		//Draw rows
		for (this.i=1;this.i<specs.R;++this.i) {
			this.coords.X = x;
			this.coords.Y = y + Math.round((this.i*(specs.H/specs.R)));
			this.DrawHorizontalLine(this.coords, specs.W, specs.COLOUR || "black", specs.LW.PARTITION || 1);
		}

		//Draw columns
		for (this.i=1;this.i<specs.C;++this.i) {
			this.coords.X = x + (this.i*(specs.W/specs.C));
			this.coords.Y = y;
			this.DrawVerticalLine(this.coords, specs.H, specs.COLOUR || "black", specs.LW.PARTITION || 1);
		}
	},
	DrawBasReliefSection(l, t, w, h, wLabel, colour) {

		this.DrawRectangle(l, t, w, h, GREY.MEDIUM, 1);
		this.DrawRectangle(l+1, t+1, w, h, "white", 1);
		if (wLabel)
			this.DrawRectangle(l+6, t-1, wLabel, 3, colour, 0);		//HARD-CODED!
	}
};
