
//------------------------------------------------------
//---------- INTERSECTION UTILITIES --------------------
var IntersectionUtilities = function() {
	var Coords, Rectangle;
	var Vector1, Vector2;				//for ::PointInPolygon
	var CrossProduct, Polarity;		//for ::PointInPolygon

	var i, j, dstnc;
};
IntersectionUtilities.prototype = {
	Set() {

		this.Coords = new Coordinate2D();
		this.Rectangle = new GenieRect();
		this.Vector1 = new Coordinate2D();
		this.Vector2 = new Coordinate2D();
	},
	CheckPointCircle(pnt, cCenter, cRadius) {  //c- circle

		//First do a basic check to save calculation time - NOTE: this cuts down duration to roughly half
		if (Math.abs(pnt.X-cCenter.X)>cRadius)
			return (false);
		if (Math.abs(pnt.Y-cCenter.Y)>cRadius)
			return (false);

		return (GeoUtils.GetDistance(pnt, cCenter)<=cRadius);
	},
	CheckPointBox(pnt, rect, border) {

		//Check if rect's top-left coords are given as X/Y
		if (!(rect.X==undefined)) {
			this.Rectangle.L = rect.X;
			this.Rectangle.T = rect.Y;
		} else {
			this.Rectangle.L = rect.L;
			this.Rectangle.T = rect.T;
		}

		this.Rectangle.W = rect.W;
		this.Rectangle.H = rect.H;

		//Expand rect if there is a border
		if (border) {
			this.Rectangle.L -= border;
			this.Rectangle.T -= border;
			this.Rectangle.W += (2 * border);
			this.Rectangle.H += (2 * border);
		}
	 
		return ((pnt.X>=this.Rectangle.L) && (pnt.X<=this.Rectangle.L+this.Rectangle.W) && (pnt.Y>=this.Rectangle.T) && (pnt.Y<=this.Rectangle.T+this.Rectangle.H));
	},
	CheckBoxBox(rct1, rct2) {

		if ( (rct1.L<(rct2.L+rct2.W)) && ((rct1.L+rct1.W)>rct2.L) && (rct1.T<(rct2.T+rct2.H)) && ((rct1.T+rct1.H)>rct2.T) )
			return (true);
		else
			return (false);
	},
	CheckPointNETriangle(pnt, trngl) {		//points: 0 - top-left, 1 - top-right, 2 - bottom-right

		//Quick check of bounding box
		this.Rectangle.Set(trngl[0].X, trngl[0].Y, trngl[1].X-trngl[0].X, trngl[2].Y-trngl[0].Y);
		if (!this.CheckPointBox(pnt, this.Rectangle))
			return (false);

		if ( (pnt.X-trngl[0].X)<(pnt.Y-trngl[0].Y) )
			return (false);

		return (true);
	},
	CheckPointSETriangle(pnt, trngl) {		//points: 0 - top-right, 1 - bottom-right, 2 - bottom-left

		//Quick check of bounding box
		this.Rectangle.Set(trngl[2].X, trngl[0].Y, trngl[2].X-trngl[0].X, trngl[1].Y-trngl[0].Y);
		if (!this.CheckPointBox(pnt, this.Rectangle))
			return (false);

		if ( (trngl[2].X-pnt.X)<(pnt.Y-trngl[0].Y) )
			return (false);

		return (true);
	},
	CheckPointSWTriangle(pnt, trngl) {		//points: 0 - top-left, 1 - bottom-right, 2 - bottom-left

		//Quick check of bounding box
		this.Rectangle.Set(trngl[0].X, trngl[0].Y, trngl[1].X-trngl[0].X, trngl[1].Y-trngl[0].Y);
		if (!this.CheckPointBox(pnt, this.Rectangle))
			return (false);

		if ( (pnt.X-trngl[0].X)>(pnt.Y-trngl[0].Y) )
			return (false);

		return (true);
	},
	CheckPointPolygon(pnt, plygn) {  //NOTE: only works for convex polygons

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
	}
};

var IntersectUtils = new IntersectionUtilities();
IntersectUtils.Set();
