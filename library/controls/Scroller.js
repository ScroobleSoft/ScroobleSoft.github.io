
//-----------------------------------------------
//----------- GENIE SCROLLER --------------------
var GenieScroller = function() {
	var UpBox, DownBox, IndexBox, VisibleBox;
	var ScrollUp, ScrollDown, IndexClicked;
	var Index;								//decimal, not percentage
	var ScreenRatio, Granularity;
};
GenieScroller.prototype = new GenieControl();
GenieScroller.prototype.Set = function(canvas, specs, img, gTool) {
	GenieControl.prototype.Set.call(this, canvas, specs, img);

	this.GraphicsTool = gTool;
	if (this.Specs.RATIO)
		this.SetRatio(this.Specs.RATIO);
	if (this.Specs.GRANULARITY)
		this.SetGranularity(this.Specs.GRANULARITY);
	this.SetBoxes();
	this.ScrollUp = false;
	this.ScrollDown = false;
	this.IndexClicked = false;
};
GenieScroller.prototype.SetBoxes = function() {
	var specs;

	this.UpBox = new GenieRect();
	this.DownBox = new GenieRect();
	this.IndexBox = new GenieRect();
	this.VisibleBox = new GenieRect();
	if (this.Specs.CUSTOM)
		specs = this.Specs;
	else
		specs = SCROLLER;
	this.UpBox.Set(specs.L, specs.T, specs.BUTTON.W, specs.BUTTON.H);
	this.DownBox.Set(specs.L, specs.T+specs.GAP, specs.BUTTON.W, specs.BUTTON.H);
	this.IndexBox.Set(specs.L+specs.INDEX.O.X, specs.T+specs.INDEX.O.Y, specs.INDEX.W, specs.INDEX.H);
	this.VisibleBox.L = specs.L + specs.INDEX.LW;
	this.VisibleBox.T = specs.T + specs.INDEX.LW;
	this.VisibleBox.H = specs.INDEX.H - (2*specs.INDEX.LW);
};
GenieScroller.prototype.SetRatio = function(ratio) {

	this.ScreenRatio = ratio;
	if (this.Specs.CUSTOM)
		this.VisibleBox.W = Math.round((this.IndexBox.W-(2*this.Specs.INDEX.LW))*this.ScreenRatio);
	else
		this.VisibleBox.W = Math.round((this.IndexBox.W-(2*SCROLLER.INDEX.LW))*this.ScreenRatio);
};
GenieScroller.prototype.SetGranularity = function(grnlrty) {

	this.Granularity = grnlrty;
};
GenieScroller.prototype.Draw = function() {
	var specs;

	//Buttons
	this.Pic.DrawPatchNumber(0, this.UpBox.L, this.UpBox.T);
	this.Pic.DrawPatchNumber(1, this.DownBox.L, this.DownBox.T);

	//Index rectangle (frame)
	if (this.Specs.CUSTOM)
		specs = this.Specs;
	else
		specs = SCROLLER;
	this.GraphicsTool.DrawRectangle(specs.L+specs.INDEX.O.X, specs.T+specs.INDEX.O.Y, specs.INDEX.W, specs.INDEX.H, specs.INDEX.COLOUR, specs.INDEX.LW);

	//Visible box
	this.GraphicsTool.DrawRect(this.VisibleBox, specs.COLOUR, specs.LW);
};
GenieScroller.prototype.MouseDown = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;

	//Up button
	if (SpaceUtils.CheckPointInBox(Mouse.Down, this.UpBox)) {
		this.ScrollUp = true;
		this.VisibleBox.L -= this.Granularity;
		if (this.VisibleBox.L<(this.IndexBox.L+this.IndexBox.LW))
			this.VisibleBox.L = this.IndexBox.L + this.IndexBox.LW;
		this.Context.fillRect(this.UpBox.L, this.UpBox.T, this.UpBox.W, this.UpBox.H);
		this.Pic.DrawPatchNumber(2, this.UpBox.L, this.UpBox.T);
		setTimeout(this.ResetUpButton.bind(this), 100);
	}

	//Down button
	if (SpaceUtils.CheckPointInBox(Mouse.Down, this.DownBox)) {
		this.ScrollDown = true;
		if ((this.VisibleBox.L+this.VisibleBox.W)>((this.IndexBox.L+this.IndexBox.W)-this.IndexBox.LW))
			this.VisibleBox.L = this.IndexBox.L + this.IndexBox.W - (this.VisibleBox.W+this.IndexBox.LW);
		this.Context.fillRect(this.DownBox.L, this.DownBox.T, this.DownBox.W, this.DownBox.H);
		this.Pic.DrawPatchNumber(3, this.DownBox.L, this.DownBox.T);
		setTimeout(this.ResetDownButton.bind(this), 100);
	}

	//Visible box
	if (SpaceUtils.CheckPointInBox(Mouse.Down, this.IndexBox)) {
		this.Context.fillRect(this.IndexBox.L+this.IndexBox.LW, this.IndexBox.T+this.IndexBox.LW,
									 this.IndexBox.W-(2*+this.IndexBox.LW), this.IndexBox.H-(2*+this.IndexBox.LW));
		this.Index = (Mouse.Down.X-this.IndexBox.L)/(this.IndexBox.W);			//NOTE: not 100% precise, since .LW is not factored in
		this.VisibleBox.L = (this.IndexBox.L+this.IndexBox.LW) + (this.Index*this.IndexBox.W) - (this.VisibleBox.W/2);
		if (this.VisibleBox.L<(this.IndexBox.L+this.IndexBox.LW))
			this.VisibleBox.L = this.IndexBox.L + this.IndexBox.LW;
		if ((this.VisibleBox.L+this.VisibleBox.W)>((this.IndexBox.L+this.IndexBox.W)-this.IndexBox.LW))
			this.VisibleBox.L = this.IndexBox.L + this.IndexBox.W - (this.VisibleBox.W+this.IndexBox.LW);
		this.IndexClicked = true;
	}
};
GenieScroller.prototype.CheckScrollUp = function() {

	if (this.ScrollUp) {
		this.ScrollUp = false;
		return (true);
	} else
		return (false);
};
GenieScroller.prototype.CheckScrollDown = function() {

	if (this.ScrollDown) {
		this.ScrollDown = false;
		return (true);
	} else
		return (false);
};
GenieScroller.prototype.CheckIndexClicked = function() {

	if (this.IndexClicked) {
		this.IndexClicked = false;
		return (true);
	} else
		return (false);
};
GenieScroller.prototype.ResetUpButton = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;
	this.Context.fillRect(this.UpBox.L, this.UpBox.T, this.UpBox.W, this.UpBox.H);
	this.Pic.DrawPatchNumber(0, this.UpBox.L, this.UpBox.T);
};
GenieScroller.prototype.ResetDownButton = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;
	this.Context.fillRect(this.DownButtonBox.L, this.DownButtonBox.T, this.DownButtonBox.W, this.DownButtonBox.H);
	this.Pic.DrawPatchNumber(1, this.DownButtonBox.L, this.DownButtonBox.T);
};
