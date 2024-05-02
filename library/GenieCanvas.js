/*
 *  NOTE: tool-tip, tesselation, text and Z-order code removed
 */
//--------------------------------------------
//---------- GENIE CANVAS --------------------
var GenieCanvas = function () {
	var Id;
	var Element, Context;
	var View;
	var Controls, MouseDownControl;
	var FrameRate, StartTime, Iterations;
	var MousePresentFlag, InputFlag, TrackPadFlag;
	var Scale;														//floating point

	var i, j, nElements;
};
GenieCanvas.prototype = {
	Set(cnvs, id, font) {
		this.Element = document.getElementById(cnvs);
		this.Context = this.Element.getContext("2d");
		this.Id = id;
		this.Controls = new Array();
		this.MousePresentFlag = false;
		this.Context.font = font ? font : FONT.DEFAULT;
		this.InputFlag = true;
		this.Scale = 1.0;

		this.RegisterEvents();
	},
	RegisterEvents() {

		this.Element.addEventListener("mousemove", this.TrackMouse.bind(this));
		this.Element.addEventListener("mouseover", this.MousePresent.bind(this));
		this.Element.addEventListener("mouseout", this.MouseAbsent.bind(this));
		this.Element.addEventListener("click", this.MouseClicked.bind(this));
		this.Element.addEventListener("dblclick", this.MouseDoubleClicked.bind(this));
		this.Element.addEventListener("mousedown", this.MouseDown.bind(this));
		this.Element.addEventListener("mouseup", this.MouseUp.bind(this));
		this.Element.addEventListener("touchstart", this.TouchStart.bind(this));
		this.Element.addEventListener("touchmove", this.TouchMove.bind(this));
		this.Element.addEventListener("touchend", this.TouchEnd.bind(this));
		this.Element.addEventListener("touchcancel", this.TouchCancel.bind(this));
	},
	SetFrameRateMeasurement() {

		this.Iterations = 0;
		this.StartTime = performance.now();
	},
	UpdateFrameRateMeasurement() {

		++this.Iterations;
		this.FrameRate = 1000 / ((performance.now()-this.StartTime)/this.Iterations);
	},
	SetAntiAliasing() {

		this.Context.imageSmoothingEnabled = true;
	},
	ResetAntiAliasing() {

		this.Context.imageSmoothingEnabled = false;
	},
	SetScale(scale) {

		this.Scale = scale;
	},
	ResetScale() {

		this.Scale = 1.0;
	},
	DisableRightClickMenu() {
		var cnvs = this;

		var DisableMenu = function(event) {
			event.preventDefault();
			cnvs.MouseClicked(event);		//NOTE: this works, but causes continuous fire (does it? - TODO)
		}

		this.Element.addEventListener("contextmenu", DisableMenu);
	},
	SuspendInput() {

		this.InputFlag = false;
	},
	ResumeInput() {

		this.InputFlag = true;
	},
	CheckMousePresent() {

		return (this.MousePresentFlag);
	},
	Clear() {

		this.Context.clearRect(0, 0, this.Element.width, this.Element.height);
	},
	RegisterControl(cntrl) {

		this.Controls.push(cntrl);
	},
	DisplayControls() {  
		var i;

		for (i=0;i<this.Controls.length;++i)
			this.Controls[i].Show();
	},
	TrackMouse(event) {

		Mouse.X = event.offsetX / this.Scale; 
		Mouse.Y = event.offsetY / this.Scale;
		Mouse.CanvasId = this.Id;
		Mouse.Moved = true;
	},
	MouseClicked(event) {

		if (!this.InputFlag)
			return;

		//Register a click only if 'Mouse Down' has not been checked
		if (!Mouse.Downed)
			return;

		Mouse.Click.Set(event.offsetX/this.Scale, event.offsetY/this.Scale);
		Mouse.CanvasId = this.Id;

		//Check controls to see if any of them were clicked
		if (this.View) {
			if (this.View.Controls)

				for (this.i=0;this.i<this.View.Controls.length;++this.i)
					if (this.View.Controls[this.i].Enabled && !this.View.Controls[this.i].DeActivated) {
						if (this.View.Controls[this.i].CheckClickedOn()) {
							this.View.Controls[this.i].ClickedOn();
							return;
						}
					}

				if (this.View.NestedView)
					for (this.i=0;this.i<this.View.NestedView.Controls.length;++this.i)
						if (this.View.NestedView.Controls[this.i].Enabled && !this.View.NestedView.Controls[this.i].DeActivated) {
							if (this.View.NestedView.Controls[this.i].CheckClickedOn()) {
								this.View.NestedView.Controls[this.i].ClickedOn();
								return;
							}
						}
		} else {
			if (this.Controls)
				for (this.i=0;this.i<this.Controls.length;++this.i)
					if (this.Controls[this.i].Enabled && !this.Controls[this.i].DeActivated) {
						if (this.Controls[this.i].CheckClickedOn()) {
							this.Controls[this.i].ClickedOn();
							return;
						}
					}
		}

		switch(event.button) {
			case MOUSE.LEFtBUTTON:
				Mouse.LeftClicked = true;
				break;
			case MOUSE.RIGHtBUTTON:
				Mouse.RightClicked = true;
				break;
		}
	},
	MouseDoubleClicked(event) {  //NOTE: not passing message to controls

		//LOGGED - UNTESTED

		switch(event.button) {
			case MOUSE.LEFtBUTTON:
				Mouse.LeftDoubleClicked = true;
				break;
			case MOUSE.RIGHtBUTTON:
				Mouse.RightDoubleClicked = true;
				break;
		}

		Mouse.Click.X = event.offsetX / this.Scale;
		Mouse.Click.Y = event.offsetY / this.Scale;
		Mouse.CanvasId = this.Id;
	},
	MouseDown(event) {  //NOTE: only used for right clicks

		if (!this.InputFlag)
			return;

		Mouse.Down.Set(event.offsetX/this.Scale, event.offsetY/this.Scale);
		Mouse.CanvasId = this.Id;

		//Check if mouse button is pressed down over a control
		if (this.View) {
			if (this.View.Controls)
				for (this.i=0;this.i<this.View.Controls.length;++this.i)
					if (this.View.Controls[this.i].Enabled && !this.View.Controls[this.i].DeActivated)
						if (SpaceUtils.CheckPointInBox(Mouse.Down, this.View.Controls[this.i].Specs)) {
							this.View.Controls[this.i].MouseDown();
							return;
						}
		} else {
			if (this.Controls)
				for (this.i=0;this.i<this.Controls.length;++this.i)
					if (this.Controls[this.i].Enabled && !this.Controls[this.i].DeActivated)
						if (SpaceUtils.CheckPointInBox(Mouse.Down, this.Controls[this.i].Specs)) {
							this.Controls[this.i].MouseDown();
							return;
						}
		}

		Mouse.Downed = true;
	},
	MouseUp(event) {

		if (!this.InputFlag)
			return;

		Mouse.Up.Set(event.offsetX/this.Scale, event.offsetY/this.Scale);
		Mouse.CanvasId = this.Id;

		//Check if mouse is over a control
		if (this.View) {
			if (this.View.Controls)
				for (this.i=0;this.i<this.View.Controls.length;++this.i)
					if (this.View.Controls[this.i].Enabled && !this.View.Controls[this.i].DeActivated)
						if (SpaceUtils.CheckPointInBox( { X: event.offsetX, Y: event.offsetY }, this.View.Controls[this.i].Specs)) {
							this.View.Controls[this.i].MouseUp();
							return;
						}
		} else {
			if (this.Controls)
				for (this.i=0;this.i<this.Controls.length;++this.i)
					if (this.Controls[this.i].Enabled && !this.Controls[this.i].DeActivated)
						if (SpaceUtils.CheckPointInBox( { X: event.offsetX, Y: event.offsetY }, this.Controls[this.i].Specs)) {
							this.Controls[this.i].MouseUp();
							return;
						}
		}

		Mouse.Upped = true;
/*
		if (event.button==MOUSE.RIGHTBUTTON)
	 Mouse.RightClicked = true;
*/
	},
	MousePresent(event) {

		this.MouseWithin = true;
		Mouse.CanvasId = this.Id;
	},
	MouseAbsent(event) {

		this.MousePresentFlag = false;
		Mouse.X = event.offsetX / this.Scale; 
		Mouse.Y = event.offsetY / this.Scale;
		Mouse.CanvasId = CANVAS.NONE;
		this.MouseDownControl = null;
	},
	TouchStart(event) {

		++TouchScreen.Touches;

		if (!this.InputFlag)
			return;

		//Cancel everything if a screen is touched more than once simultaneously (won't allow this) - except if a TrackPad is functioning
		if (TouchScreen.Touches>1) {
			if (this.TrackPadFlag && TrackPad.Context==this.Context) {
				TrackPad.Click.X = event.touches[TouchScreen.Touches-1].clientX - this.Element.parentNode.offsetLeft;
				TrackPad.Click.Y = event.touches[TouchScreen.Touches-1].clientY - this.Element.parentNode.offsetLeft;
				TrackPad.UpdateClick();													//NOTE: all touches will be interpreted as potential clicks
			}
			TouchScreen.ClearAll();
			TouchScreen.Cancelled = true;
		} else {

			//Touch Screen
			TouchScreen.Touched = true;
			TouchScreen.Start.X = event.touches[0].clientX - this.Element.parentNode.offsetLeft;
			TouchScreen.Start.Y = event.touches[0].clientY - this.Element.parentNode.offsetTop;
			TouchScreen.X = TouchScreen.Start.X;
			TouchScreen.Y = TouchScreen.Start.Y;
			TouchScreen.CanvasId = this.Id;

			//Track Pad
			if (this.TrackPadFlag && TrackPad.Context==this.Context)
				TrackPad.UpdateTouch();
		}
	},
	TouchMove(event) {

		TouchScreen.Moved = true;
		TouchScreen.X = event.changedTouches[0].clientX - this.Element.parentNode.offsetLeft;
		TouchScreen.Y = event.changedTouches[0].clientY - this.Element.parentNode.offsetTop;
		TouchScreen.CanvasId = this.Id;

		if (this.TrackPadFlag) {
			if (TrackPad.Context!=this.Context)
				return;
			TrackPad.UpdateMove();
		}
	},
	TouchEnd(event) {

		--TouchScreen.Touches;

		TouchScreen.Lifted = true;
		TouchScreen.End.X = event.changedTouches[0].clientX - this.Element.parentNode.offsetLeft;
		TouchScreen.End.Y = event.changedTouches[0].clientY - this.Element.parentNode.offsetTop;
		TouchScreen.CanvasId = this.Id;
	},
	TouchCancel(event) {

		TouchScreen.Cancelled = true;
	},
	ActivateTrackPad() {

		this.TrackPadFlag = true;
	},
	DeactivateTrackPad() {

		this.TrackPadFlag = false;
	}
};
