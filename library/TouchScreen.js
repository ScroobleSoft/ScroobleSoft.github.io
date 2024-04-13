
//--------------------------------------------------
//---------- GENIE TOUCH SCREEN --------------------
var GenieTouchScreen = function () {
	var X, Y;
	var Start, End;									//coords
	var Touched, Moved, Lifted, Cancelled;		//flags
	var Touches;										//number of fingers presently making contact
	var CanvasId;
};
GenieTouchScreen.prototype = {
	Set() {
		this.Touches = 0;
		this.SetCoords();
	},
	SetCoords() {

		this.Start = new Coordinate2D();
		this.End = new Coordinate2D();
		this.ReticlePoint = new Coordinate2D();
	},
	CheckTouched(cnvs) {

		if (cnvs)
			if (this.CanvasId!=cnvs)
				return(false);

		if (this.Touched) {
			this.Touched = false;
			return (true);
		}

		return (false);
	},
	CheckMoved(cnvs) {

		if (cnvs)
			if (this.CanvasId!=cnvs)
				return(false);

		if (this.Moved) {
			this.Moved = false;
				return (true);
		}

		return (false);
	},
	CheckLifted(cnvs) {

		if (cnvs)
			if (this.CanvasId!=cnvs)
				return(false);

		if (this.Lifted) {
			this.Lifted = false;
			return (true);
		}

		return (false);
	},
	CheckCancelled() {

		if (this.Cancelled) {
			this.Cancelled = false;
			return (true);
		}

		return (false);
	},
	CheckBoxTouched(rct, cnvs) {

		if (cnvs)
			if (this.CanvasId!=cnvs)
				return(false);

		return (SpaceUtils.CheckPointInBox(this.Start, rct));
	},
	CheckCircleTouched(cCentre, cRadius, cnvs) {

		if (cnvs)
			if (this.CanvasId!=cnvs)
				return(false);

		return (SpaceUtils.CheckPointInCircle(this, cCentre, cRadius));
	},
	ClearAll() {

		this.Touched = false;
		this.Moved = false;
		this.Lifted = false;
		this.ButtonFired = false;
	}
};
TouchScreen = new GenieTouchScreen();
TouchScreen.Set();
