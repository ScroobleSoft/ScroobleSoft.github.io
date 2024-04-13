
//-------------------------------------------
//---------- GENIE MOUSE --------------------
var GenieMouse = function () {
	var X, Y;
	var Click, Down, Up;									//coords
	var Downed, Moved, Upped;							//flags
	var LeftClicked, RightClicked;					//flags
	var LeftDoubleClicked, RightDoubleClicked;	//flags
	var CanvasId;
};
GenieMouse.prototype = {
	Set() {
		this.Click = new Coordinate2D();
		this.Down = new Coordinate2D();
		this.Up = new Coordinate2D();
	},
	GetCoordinates(coords) {

		if (coords)
			coords.Set(this.X, this.Y);
		else
			return ( { X: this.X, Y: this.Y } );
	},
	GetClickCoordinates(coords) {

		if (coords)
			coords.Set(this.Click.X, this.Click.Y);
		else
			return ( { X: this.Click.X, Y: this.Click.Y } );
	},
	CheckClicked(id) {  //NOTE: just check if canvas is clicked without clearing anything

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.LeftClicked) {
			this.LeftClicked = false;
			return (true);
		}

		if (this.RightClicked) {
			this.RightClicked = false;
			return (true);
		}

		return (false);
	},
	CheckLeftClicked(id) {

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.LeftClicked) {
			this.LeftClicked = false;
			return (true);
		} else
			return (false);
	},
	CheckRightClicked(id) {

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.RightClicked) {
			this.RightClicked = false;
			return (true);
		} else
			return (false);
	},
	CheckLeftDoubleClicked(id) {

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.LeftDoubleClicked) {
			this.LeftDoubleClicked = false;
			return (true);
		} else
			return (false);
	},
	CheckDowned(id) {

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.Downed) {
			this.Downed = false;
			return (true);
		} else
			return (false);
	},
	CheckMoved(id) {

		if (id)
	 if (this.CanvasId!=id)
		 return(false);

		if (this.Moved) {
	 this.Moved = false;
	 return (true);
		} else
	 return (false);
	},
	CheckUpped(id) {

		if (id)
			if (this.CanvasId!=id)
				return(false);

		if (this.Upped) {
			this.Upped = false;
			return (true);
		} else
			return (false);
	},
	CheckBoxClicked(rct) {

		return (Utilities.PointInBox( { X: this.Click.X, Y: this.Click.Y }, rct ));
	},
	CheckOverCircle(cCentre, cRadius, cnvs) {

		if (this.CanvasId==cnvs)
	 return (Utilities.CheckPointInCircle(this, cCentre, cRadius));
		else
	 return (false);
	},
	ClearClicks() {

		this.LeftClicked = false;
		this.RightClicked = false;
		this.LeftDoubleClicked = false;
		this.RightDoubleClicked = false;
	},
	ClearLeftClick() {

		this.LeftClicked = false;
	},
	ClearRightClick() {

		this.RightClicked = false;
	},
	ClearDownings() {

		this.Downed = false;
	},
	ClearMoves() {

		this.Moved = false;
	},
	ClearUppings() {

		this.Upped = false;
	},
	ClearAll() {

		this.ClearMoves();
		this.ClearClicks();
		this.ClearDownings();
		this.ClearUppings();
	}
};
Mouse = new GenieMouse();
Mouse.Set();
