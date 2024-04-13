/*
 *		specs: { L: -1, T: -1, W: -1, H: -1, TRACK: { BOX: { L: -1, T: -1, W: -1, H: -1 }, COLOUR: { BACKGROUND: "", BORDER: "" }, LW: -1 },
 *					BUTTON: { A: { BOXES: { [ L: -1, T: -1, W: -1, H: -1 ],... }, COLOUR: { BACKGROUND: "", BORDER: "" }, LW: -1 } },
 *							  { B: { BOXES: { [ L: -1, T: -1, W: -1, H: -1 ],... }, COLOUR: { BACKGROUND: "", BORDER: "" }, LW: -1 } },
					RETICLE: { R: -1, BOX: { L: -1, T: -1, W: -1, H: -1 }, RATIO: -1 }
 */
//-----------------------------------------------
//---------- GENIE TRACK PAD --------------------				
var GenieTrackPad = function() {
	var Context;
	var GraphicsTool;
	var Specs;
	var TrackBox, ReticleBox, LeftClickBoxes, RightClickBoxes;
	var AButtonPressed, BButtonPressed;
	var ReticleImage, ReticleStart, ReticlePoint, Click;
	var X, Y;
	var State;

	var i;  //scratch variables
};
GenieTrackPad.prototype = {
	Set(cntxt, gTool, specs, img) {
		this.Context = cntxt;
		this.GraphicsTool = gTool;
		this.Specs = specs;
		this.ReticleImage = img;

		this.SetBoxes();
		if (this.Specs.RETICLE)
			this.SetReticle();
	},
	SetReticle() {

		this.ReticleStart = new Coordinate2D();
		this.ReticlePoint = new Coordinate2D();
		this.ReticlePoint.Set(this.Specs.RETICLE.BOX.L+(this.Specs.RETICLE.BOX.W/2), this.Specs.RETICLE.BOX.T+(this.Specs.RETICLE.BOX.H/2));
		this.Click = new Coordinate2D();
	},
	SetBoxes() {
		var i;

		//Tracking
		this.TrackBox = new GenieRect();
		this.TrackBox.SetRect(this.Specs.TRACK.BOX);
		this.ReticleBox = new GenieRect();
		this.ReticleBox.SetRect(this.Specs.RETICLE.BOX);

		//Clicking
		if (this.Specs.BUTTON) {

			//Left
			if (this.Specs.BUTTON.A) {
				this.LeftClickBoxes = ArrayUtils.Create(this.Specs.BUTTON.A.BOXES.length, GenieRect);
				for (i=0;i<this.Specs.BUTTON.A.BOXES.length;++i)
					this.LeftClickBoxes[i].SetRect(this.Specs.BUTTON.A.BOXES[i]);
			}

			//Right
			if (this.Specs.BUTTON.B) {
				this.RightClickBoxes = ArrayUtils.Create(this.Specs.BUTTON.B.BOXES.length, GenieRect);
				for (i=0;i<this.Specs.BUTTON.B.BOXES.length;++i)
					this.RightClickBoxes[i].SetRect(this.Specs.BUTTON.B.BOXES[i]);
			}
		}
	},
	Draw() {
		var i;

		//Track box
		this.GraphicsTool.DrawRect(this.TrackBox, this.Specs.TRACK.COLOUR.BACKGROUND, 0);
		if (this.Specs.TRACK.LW)
			this.GraphicsTool.DrawRect(this.TrackBox, this.Specs.TRACK.COLOUR.BORDER, this.Specs.TRACK.LW);

		//Buttons
		if (this.Specs.BUTTON) {
			if (this.Specs.BUTTON.A)
				for (i=0;i<this.LeftClickBoxes.length;++i) {
					this.GraphicsTool.DrawRect(this.LeftClickBoxes[i], this.Specs.BUTTON.A.COLOUR.BACKGROUND, 0);
					if (this.Specs.BUTTON.A.LW)
						this.GraphicsTool.DrawRect(this.LeftClickBoxes[i], this.Specs.BUTTON.A.COLOUR.BORDER, this.Specs.BUTTON.A.LW);
				}
			if (this.Specs.BUTTON.B)
				for (i=0;i<this.RightClickBoxes.length;++i) {
					this.GraphicsTool.DrawRect(this.RightClickBoxes[i], this.Specs.BUTTON.B.COLOUR.BACKGROUND, 0);
					if (this.Specs.BUTTON.B.LW)
						this.GraphicsTool.DrawRect(this.RightClickBoxes[i], this.Specs.BUTTON.B.COLOUR.BORDER, this.Specs.BUTTON.B.LW);
				}
		}
	},
	DrawReticle() {

		this.ReticleImage.Draw(this.ReticlePoint.X-this.Specs.RETICLE.R, this.ReticlePoint.Y-this.Specs.RETICLE.R);
	},
	UpdateTouch() {

		this.ReticleStart.X = this.ReticlePoint.X;
		this.ReticleStart.Y = this.ReticlePoint.Y;
	},
	UpdateClick() {

		if (this.Specs.BUTTON) {
			if (this.Specs.BUTTON.A)
				for (this.i=0;this.i<this.LeftClickBoxes.length;++this.i)
					if (SpaceUtils.CheckPointInBox(this.Click, this.LeftClickBoxes[this.i]))
						this.AButtonPressed = true;
			if (this.Specs.BUTTON.B)
				for (this.i=0;this.i<this.RightClickBoxes.length;++this.i)
					if (SpaceUtils.CheckPointInBox(this.Click, this.RightClickBoxes[this.i]))
						this.BButtonPressed = true;
		}
	},
	UpdateMove() {

		if (!SpaceUtils.CheckPointInBox(TouchScreen, this.TrackBox))
			return;

		this.ReticlePoint.X = this.ReticleStart.X + Math.round((TouchScreen.X-TouchScreen.Start.X)*this.Specs.RETICLE.RATIO);
		this.ReticlePoint.Y = this.ReticleStart.Y + Math.round((TouchScreen.Y-TouchScreen.Start.Y)*this.Specs.RETICLE.RATIO);

		if (this.ReticlePoint.X<this.ReticleBox.L)
			this.ReticlePoint.X = this.ReticleBox.L;
		if (this.ReticlePoint.X>=(this.ReticleBox.L+this.ReticleBox.W))
			this.ReticlePoint.X = this.ReticleBox.L + this.ReticleBox.W;
		if (this.ReticlePoint.Y<this.ReticleBox.T)
			this.ReticlePoint.Y = this.ReticleBox.T;
		if (this.ReticlePoint.Y>=(this.ReticleBox.T+this.ReticleBox.H))
			this.ReticlePoint.Y = this.ReticleBox.T + this.ReticleBox.H;
	},
	ClearAll() {

		this.AButtonPressed = false;
		this.BButtonPressed = false;
	},
	CheckAPressed() {

		if (this.AButtonPressed) {
			this.AButtonPressed = false;
			return (true);
		} else
			return (false);
	},
	CheckBPressed() {

		if (this.BButtonPressed) {
			this.BButtonPressed = false;
			return (true);
		} else
			return (false);
	}
};
