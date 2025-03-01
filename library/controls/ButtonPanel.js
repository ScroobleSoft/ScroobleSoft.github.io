/*
 *		** need a 'spacing out' Option for gaps between buttons
 */
//--------------------------------------------------	Specs: { L: -1, T: -1, W: -1, H: -1, C: -1, R: -1, LW: -1,
//---------- GENIE BUTTON PANEL --------------------				BUTTON: { W: -1, H: -1 }, OFFSETS: { X: -1, Y: -1 } };
var GenieButtonPanel = function() {
	var ButtonPics;
	var Pressed;			//NOTE: this is activated when the button is down, not clicked
	var ButtonPressed;	//index 
};
GenieButtonPanel.prototype = new GenieControl();
GenieButtonPanel.prototype.Set = function(canvas, specs, img) {
	GenieControl.prototype.Set.call(this, canvas, specs, img);

	this.ButtonPressed = -1;
};
GenieButtonPanel.prototype.SetExtraLinks = function(bPics) {  //REDUNDANT - use next function

	this.ButtonPics = bPics;
};
GenieButtonPanel.prototype.SetButtonPics = function(bPics) {

	this.ButtonPics = bPics;
};
GenieButtonPanel.prototype.Draw = function() {  //TODO: patch from .ButtonPics will be drawn with X: +1, Y: +1 if button is pressed (in different method)
	var iBtn;
	var c, r;

	iBtn = 0;
	for (r=0;r<this.Specs.R;++r)
		for (c=0;c<this.Specs.C;++c) {
/*
	 this.Pic.DrawPatchNumber(0, this.Specs.L+(c*this.Specs.BUTTON.W), this.Specs.T+(r*this.Specs.BUTTON.H));
	 this.ButtonPics.DrawPatchNumber(iBtn, this.Specs.L+(c*this.Specs.BUTTON.W)+this.Specs.OFFSETS.X, this.Specs.T+(r*this.Specs.BUTTON.H)+this.Specs.OFFSETS.Y);
*/
	 this.DrawButton(c, r);
	 ++iBtn;			//TODO: this is REDUNDANT if everything works Ok
		}
};
GenieButtonPanel.prototype.DrawButton = function(c, r, bPressed) {
	var x, y;

	if (this.Specs.LW) {
		x = this.Specs.L + (c*this.Specs.BUTTON.W) + this.Specs.LW;
		y = this.Specs.T + (r*this.Specs.BUTTON.H) + this.Specs.LW;
	} else {
		x = this.Specs.L + (c*this.Specs.BUTTON.W) + this.Specs.OFFSETS.X;
		y = this.Specs.T + (r*this.Specs.BUTTON.H) + this.Specs.OFFSETS.Y;
	}
	if (bPressed) {
		this.Pic.DrawPatchNumber(1, this.Specs.L+(c*this.Specs.BUTTON.W), this.Specs.T+(r*this.Specs.BUTTON.H));
		++x;
		++y;
	} else
		this.Pic.DrawPatchNumber(0, this.Specs.L+(c*this.Specs.BUTTON.W), this.Specs.T+(r*this.Specs.BUTTON.H));
	this.ButtonPics.DrawPatchNumber((r*this.Specs.C)+c, x, y);
};
GenieButtonPanel.prototype.MouseDown = function() {
	var c, r;
	var x, y;

	this.Pressed = true;
	c = Math.floor((Mouse.Down.X-this.Specs.L)/this.Specs.BUTTON.W);
	r = Math.floor((Mouse.Down.Y-this.Specs.T)/this.Specs.BUTTON.H);
	this.ButtonPressed = (r*this.Specs.C) + c;
	this.DrawButton(c, r, PRESSED);

	setTimeout(this.ResetButton.bind(this), 150);
};
GenieButtonPanel.prototype.CheckButtonPressed = function() {

	if (this.Pressed) {
		this.Pressed = false;
		return (true);
	} else
		return (false);
};
GenieButtonPanel.prototype.ResetButton = function() {

	if (this.CheckEnabled() && this.CheckActivated())
		this.DrawButton(this.ButtonPressed % this.Specs.C, Math.floor(this.ButtonPressed/this.Specs.C), !PRESSED);
};
