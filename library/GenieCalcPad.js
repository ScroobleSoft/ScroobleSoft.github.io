
//----------------------------------------------
//---------- GENIE CALC PAD --------------------
var GenieCalcPad = function() {
	var Coords;
	var Line;
	var Rectangle1, Rectangle2;
	var Vector1, Vector2;	//for ::PointInPolygon
	var CrossProduct, Polarity;	//for ::PointInPolygon
	var Cos45;
	var Polygon;
//	var ScreenRect;

	//Scratch variables
//	var i, x1, x2, x, y, inc, distance, angle, iVector, hVector, hvNormal;
	var i;
};
GenieCalcPad.prototype = {
	Set() {
		this.Coords = new Coordinate2D();
		this.Line = new GenieLine();
		this.Rectangle1 = new GenieRect();
		this.Rectangle2 = new GenieRect();
		this.Vector1 = new Coordinate2D();
		this.Vector2 = new Coordinate2D();
	},
	CheckLinesIntersect(sLineA, eLineA, sLineB, eLineB) {  //s- start, e- end . . . TODO: should be in SpaceUtils

		//Step 1: if lines intersect, then their bounding boxes will also intersect
		this.GetVectorBox(this.Rectangle1, sLineA, eLineA);
		this.GetVectorBox(this.Rectangle2, sLineB, eLineB);
		if (!SpaceUtils.CheckBoxBoxIntersection(this.Rectangle1, this.Rectangle2))
	 return (false);

		//Step 2: check if lines are parallel (see denominator in formula below to see why it's done this way)
		if ((sLineA.X==eLineA.X || sLineB.Y==eLineB.Y) && (sLineA.Y==eLineA.Y || sLineB.X==eLineB.X))
	 return (false);  //saves from a divide by zero
		if ((sLineA.X-eLineA.X)/(sLineA.Y-eLineA.Y) == (sLineB.X-eLineB.X)/(sLineB.Y-eLineB.Y))		//same slope means lines are parallel
	 return (false);

		//Step 3: record intersection point of non-parallel lines
		this.Coords.X = ((((sLineA.X*eLineA.Y)-(sLineA.Y*eLineA.X))*(sLineB.X-eLineB.X)) - ((sLineA.X-eLineA.X)*((sLineB.X*eLineB.Y)-(sLineB.Y*eLineB.X))))/(((sLineA.X-eLineA.X)*(sLineB.Y-eLineB.Y))-((sLineA.Y-eLineA.Y)*(sLineB.X-eLineB.X)));
		this.Coords.Y = ((((sLineA.X*eLineA.Y)-(sLineA.Y*eLineA.X))*(sLineB.Y-eLineB.Y)) - ((sLineA.Y-eLineA.Y)*((sLineB.X*eLineB.Y)-(sLineB.Y*eLineB.X))))/(((sLineA.X-eLineA.X)*(sLineB.Y-eLineB.Y))-((sLineA.Y-eLineA.Y)*(sLineB.X-eLineB.X)));

		//Step 4: make sure coords lie on both line segments
		if (SpaceUtils.CheckPointInBox(this.Coords, this.Rectangle1) && SpaceUtils.CheckPointInBox(this.Coords, this.Rectangle2))
	 return (true);
		else
	 return (false);
	},
	CheckLineBoxIntersection(line, rect) {  //TODO: should be in SpaceUtils

		//UNLOGGED

		this.Line.Set(rect.L, rect.T, rect.L+rect.W, rect.T);			//N edge
		if (this.CheckLinesIntersect(line.StartCoords, line.EndCoords, this.Line.StartCoords, this.Line.EndCoords))
			return (true);
		this.Line.Set(rect.L+rect.W, rect.T, rect.L+rect.W, rect.T+rect.H);	//E edge
		if (this.CheckLinesIntersect(line.StartCoords, line.EndCoords, this.Line.StartCoords, this.Line.EndCoords))
			return (true);
		this.Line.Set(rect.L+rect.W, rect.T+rect.H, rect.L, rect.T+rect.H);	//S edge
		if (this.CheckLinesIntersect(line.StartCoords, line.EndCoords, this.Line.StartCoords, this.Line.EndCoords))
			return (true);
		this.Line.Set(rect.L, rect.T, rect.L, rect.T+rect.H);			//W edge
		if (this.CheckLinesIntersect(line.StartCoords, line.EndCoords, this.Line.StartCoords, this.Line.EndCoords))
			return (true);

		return(false);
	},
	GetVectorBox(rect, sCoords, eCoords) {  //returns rect with vector as its diagonal . . . TODO: should be in SpaceUtils
		rect.L = (sCoords.X<eCoords.X) ? sCoords.X : eCoords.X;
		rect.T = (sCoords.Y<eCoords.Y) ? sCoords.Y : eCoords.Y;
		rect.W = Math.abs(sCoords.X-eCoords.X);
		rect.H = Math.abs(sCoords.Y-eCoords.Y);
	},
	CheckPointInPolygon(pnt, plygn) {  //NOTE: only works for convex polygons

		this.Polarity = false;
		for (this.i=0;this.i<plygn.length;++this.i) {
	 this.Vector1.X = pnt.X - plygn[this.i].X;
	 this.Vector1.Y = pnt.Y - plygn[this.i].Y;
	 if (this.i!=plygn.length-1) {
		 this.Vector2.X = plygn[this.i+1].X - plygn[this.i].X;
		 this.Vector2.Y = plygn[this.i+1].Y - plygn[this.i].Y;
	 } else {
		 this.Vector2.X = plygn[0].X - plygn[this.i].X;
		 this.Vector2.Y = plygn[0].Y - plygn[this.i].Y;
	 }
	 this.CrossProduct = (this.Vector1.X*this.Vector2.Y) - (this.Vector1.Y*this.Vector2.X);
	 if (!this.Polarity)
		 this.Polarity = this.CrossProduct>0 ? 2 : 1;
	 else {
		 if (this.Polarity==2 && this.CrossProduct<0)
			 return (false);
		 if (this.Polarity==1 && this.CrossProduct>0)
			 return (false);
	 }
		}

		return (true);
	},
	AdjustCoords(aCoords, x, y) {

		for (this.i=0;this.i<aCoords.length;++this.i) {
	 aCoords[this.i].X += x;
	 aCoords[this.i].Y += y;
		}
	},
	GetPolygonVertices(nSides, size, bAntiClockwise, angle) {

		angle = angle || 0;
		angle = GeoUtils.DegreesToRadians(angle);
		this.Polygon = new Array();
		for (this.i=0;this.i<nSides;++this.i) {
	 this.Coords = new Coordinate2D();
	 if (bAntiClockwise) {  //NOTE: no rounding will be performed here
		 this.Coords.X = (size/2)*Math.sin(angle-(2*Math.PI*(this.i/nSides)));
		 this.Coords.Y = -(size/2)*Math.cos(angle-(2*Math.PI*(this.i/nSides)));
	 } else {
		 this.Coords.X = (size/2)*Math.sin(angle+(2*Math.PI*(this.i/nSides)));
		 this.Coords.Y = -(size/2)*Math.cos(angle+(2*Math.PI*(this.i/nSides)));
	 }
	 this.Polygon.push(this.Coords);
		}
		return (this.Polygon);
	},
	GetHexagonVertices(size, bAntiClockWise, angle) {  //TODO: have to check if size is right

		angle = angle || 0;
		return(this.GetPolygonVertices(VERTICES.HEXAGON, size, bAntiClockWise, ANGLE.RIGHT+angle));
	},
	GetOctagonVertices(size, bAntiClockWise, angle) {

		angle = angle || 0;
		size = size*(1/Math.cos(GeoUtils.DegreesToRadians(ANGLE.SEMiISOMETRIC)));
		return(this.GetPolygonVertices(VERTICES.OCTAGON, size, bAntiClockWise, ANGLE.SEMiISOMETRIC+angle));
	}
};
