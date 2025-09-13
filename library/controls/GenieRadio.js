/*
 *  TODO (MAJOR): don't need to have separate specs for radio controls - instead could list options in specs
 *  actually, on second thoughts, remembered that implemented it this way to allow for irregular spacing between options
 *  so, will keep this, and provide default horizontal and vertical options via main Specs ( { OPTIONS: [ "label", "label" ] } )
 *  will also need to specify GAP in specs, and some calculations will have to be made with font and length of title
 *
 *  TODO: this could do with some cleanup and removal of redundancies (such as not using ::DrawControl in ::Draw)
 *  TODO: there is an inconsistency between using i and this.i
 */
//----------------------------------------------------
//---------- GENIE RADIO CONTROLS --------------------  Specs: { L: -1, T: -1, W: -1, H: -1, GAP: -1, ORIENT: -1, OPTIONS: ["",""], SELECT: -1 };
var GenieRadioControls = function() {
	var Selected;				//index
	var DisabledOptions;
	var OptionRects;

	var optn;
};
GenieRadioControls.prototype = new GenieControl();
GenieRadioControls.prototype.Set = function(cnvs, specs, img) {
	GenieControl.prototype.Set.call(this, cnvs, specs, img);

	this.Selected = this.Specs.SELECT;
	this.rct = new GenieRect();
	this.DisabledOptions = new Array(this.Specs.OPTIONS.length);
	this.SetBoxes();
};
GenieRadioControls.prototype.SetBoxes = function() {
	var i;
	var w;

	//Set individual option specs (clickable boxes)
	this.OptionRects = ArrayUtils.Create(this.Specs.OPTIONS.length, GenieRect);
	w = 0;
	for (i=0;i<this.Specs.OPTIONS.length;++i) {
		if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
			this.OptionRects[i].L = this.Specs.L + ((this.Specs.GAP+this.Pic.Specs.PATCH.W)*i);
			if (i!=0)
				this.OptionRects[i].L += 2 + this.Context.measureText(this.Specs.OPTIONS[i-1]).width;
			this.OptionRects[i].T = this.Specs.T;
		} else {
			this.OptionRects[i].L = this.Specs.L;
			this.OptionRects[i].T = this.Specs.T + ((this.Specs.GAP+this.Pic.Specs.PATCH.H)*i);
		}
		this.OptionRects[i].W = this.Pic.Specs.PATCH.W + 2 + Math.round(this.Context.measureText(this.Specs.OPTIONS[i]).width);
		this.OptionRects[i].H = this.Pic.Specs.PATCH.H;
		w = Math.max(w, this.OptionRects[i].W);
	}

	//Re-set control specs
	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
		this.Specs.W = this.OptionRects[this.Specs.OPTIONS.length-2].L + this.OptionRects[this.Specs.OPTIONS.length-2].W;
		this.Specs.H = this.Pic.Specs.PATCH.H;
	} else {
		this.Specs.W = w;
		this.Specs.H = (this.Specs.OPTIONS.length*this.Pic.Specs.PATCH.H) + ((this.Specs.OPTIONS.length-1)*this.Specs.GAP);
	}
};
GenieRadioControls.prototype.Draw = function() {
	var i;
	var x, y;

	this.TextWriter.SetContext(this.Context);
	this.Pic.Context = this.Context;			//NOTE: won't be re-setting this

	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {

		x = this.Specs.L;
		for (i=0;i<this.Specs.OPTIONS.length;++i) {
			if (this.DisabledOptions[i])
				this.Context.globalAlpha = 0.5;
			if (i==this.Selected)
				this.Pic.DrawPatchNumber(1, x, this.Specs.T);
			else
				this.Pic.DrawPatchNumber(0, x, this.Specs.T);
			this.TextWriter.Write(this.Specs.OPTIONS[i], x+this.Pic.Specs.PATCH.W+2, this.Specs.T+10);
			this.Context.globalAlpha = 1.0;
			x += this.Specs.GAP + this.Pic.Specs.PATCH.W;
		}
	} else {

		y = this.Specs.T;
		for (i=0;i<this.Specs.OPTIONS.length;++i) {
			 if (this.DisabledOptions[i])
				 this.Context.globalAlpha = 0.5;
			 if (i==this.Selected)
				 this.Pic.DrawPatchNumber(1, this.Specs.L, y);
			 else
				 this.Pic.DrawPatchNumber(0, this.Specs.L, y);
			 this.TextWriter.Write(this.Specs.OPTIONS[i], this.Specs.L+this.Pic.Specs.PATCH.W+2, y+10);
			 this.Context.globalAlpha = 1.0;
			 y += this.Specs.GAP + this.Pic.Specs.PATCH.H;
		}
	}
	this.TextWriter.RestoreContext();
};
GenieRadioControls.prototype.DrawControl = function(iCntrl, bSlctd) {

	if (this.Specs.ORIENT==ORIENTATION.HORIZONTAL) {
		this.x = this.Specs.L + ((this.Pic.Specs.PATCH.W+this.Specs.GAP)*iCntrl);
		this.y = this.Specs.T;
	} else {
		this.x = this.Specs.L;
		this.y = this.Specs.T + ((this.Pic.Specs.PATCH.H+this.Specs.GAP)*iCntrl);
	}
	this.Context.fillStyle = this.Specs.BACKGROUND || CONTROL.BACKGROUND;
	this.Context.fillRect(this.x, this.y, this.Pic.Specs.PATCH.W, this.Pic.Specs.PATCH.H);
	this.Pic.Context = this.Context;
	this.Pic.DrawPatchNumber((bSlctd ? 1 : 0), this.x, this.y);
};
GenieRadioControls.prototype.MouseDown = function() {
	GenieControl.prototype.MouseDown.call(this);

	//Get radio control clicked
	for (this.i=0;this.i<this.Specs.OPTIONS.length;++this.i) {
		if (SpaceUtils.CheckPointInBox(Mouse.Down, this.OptionRects[this.i]))
			break;
	}

	//Check if a radio control was clicked at all, select it, deselect previous one
	if (this.i!=this.Specs.OPTIONS.length) {
		if (this.DisabledOptions[this.i])
			return;
		if (this.Selected!=null)
			this.DrawControl(this.Selected, false);
		this.DrawControl(this.i, true);
		this.Selected = this.i;
		this.ClickedOn();
	}
};
GenieRadioControls.prototype.DisableOptions = function(aOptions, bDraw) {  //NOTE: copying rather than assigning entire array to avoid garbage collection

	//TODO: instead of re-drawing the entire control, do re-draw relevant options (bDraw option will be REDUNDANT, not being used anywhere)
	//ISSUE: this may be enabling already disabled options (something that may not be desired)

	for (this.i=0;this.i<this.DisabledOptions.length;++this.i)
		if (aOptions.includes(this.i))
			this.DisabledOptions[this.i] = true;
		else
			this.DisabledOptions[this.i] = false;

	if (bDraw)
		this.Draw();
};
GenieRadioControls.prototype.DisableOption = function(iOption, bDraw) {

	this.DisabledOptions[iOption] = true;
	if (bDraw)
		this.DrawControl(iOption);
};
GenieRadioControls.prototype.EnableOptions = function(aOptions) {

	for (this.i=0;this.i<this.DisabledOptions.length;++this.i)
		if (aOptions.includes(this.i)) {
			this.optn = this.DisabledOptions[this.i];
			this.DisabledOptions[this.i] = false;
			if (bDraw)
				if (this.optn)
					this.DrawControl(this.i);
		}
};
GenieRadioControls.prototype.EnableOptionsExclusively = function(aOptions, bDraw) {

	for (this.i=0;this.i<this.DisabledOptions.length;++this.i)
		if (aOptions.includes(this.i))
			this.DisabledOptions[this.i] = false;
		else
			this.DisabledOptions[this.i] = true;

	if (bDraw)
		this.Draw();
};
GenieRadioControls.prototype.SelectOption = function() {
};
