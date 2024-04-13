
//--------------------------------------------------
//----------- GENIE IMAGE PANEL --------------------  specs = { L: -1, T: -1, W: -1, H: -1, C: -1, R: -1, PANEL: { W: -1, H: -1 } }
var GenieImagePanel = function() {
	var PanelSelected, PanelHovered;

	var c, r;
};
GenieImagePanel.prototype = new GenieControl();
GenieImagePanel.prototype.Set = function(canvas, specs, pic) {
	GenieControl.prototype.Set.call(this, canvas, specs, pic);

	this.PanelSelected = -1;
	this.PanelHovered = -1;
};
GenieImagePanel.prototype.MouseOver = function() {

	this.c = Math.floor(Mouse.X/this.Specs.PANEL.W);
	this.r = Math.floor(Mouse.Y/this.Specs.PANEL.H);
	this.PanelHovered = (this.r*this.Specs.R) + this.c;
};
GenieImagePanel.prototype.MouseDown = function() {
	GenieControl.prototype.MouseDown.call(this);

	this.c = Math.floor(Mouse.Down.X/this.Specs.PANEL.W);
	this.r = Math.floor(Mouse.Down.Y/this.Specs.PANEL.H);
	this.PanelSelected = (this.r*this.Specs.R) + this.c;
};
