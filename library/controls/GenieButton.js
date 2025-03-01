/*
 *  NOTE: this is a dummy class - only TextButton, ImageButton and ComboButton should be used - unless a label-less or image-less button is needed
 *  NOTE: because of ComboButton and lack of multiple inheritance, all methods will be implemented here and called where relevant by derived classes
 *  TODO: should have more button style and outline options
 */
//-------------------------------------------
//---------- GENIE BUTTON -------------------
var GenieButton = function() {
	var EdgeColourLight, EdgeColourDrak;
	var CornersPic;		//for RAISED style

	var w, h, cntxt;
};
GenieButton.prototype = new GenieControl();
GenieButton.prototype.SetEdgeColours = function(lColour, dColour) {

	this.EdgeColourLight = lColour;
	this.EdgeColourDark = dColour;
};
GenieButton.prototype.SetCornersPic = function(pic) {

	this.CornersPic = pic;
};
GenieButton.prototype.Erase = function(colour) {

	if (colour) {
		this.Context.fillStyle = colour;
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	} else {
		if (this.Specs.BACKGROUND) {
			this.Context.fillStyle = this.Specs.BACKGROUND;
			this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		} else
			this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	}
};
GenieButton.prototype.Draw = function(bPressed) {

	if (this.CornersPic) {
		this.cntxt = this.CornersPic.Context;
		this.CornersPic.Context = this.Context;
	}

	switch(this.Specs.STYLE) {
		case BUTTON.STYLE.SHALLOW:
			this.DrawShallow(bPressed);
			break;
		case BUTTON.STYLE.RAISED:
			this.DrawRaised(bPressed);
			break;
		case BUTTON.STYLE.ROUNDED:
			this.DrawRounded(bPressed);
			break;
		case BUTTON.STYLE.KEyPAD:
			this.DrawKeyPadStyle(bPressed);
			break;
		case BUTTON.STYLE.OCTAGONAL:
			this.DrawOctagonal(bPressed);
			break;
		default:
			this.DrawPlain(bPressed);
			break;
	}

	if (this.CornersPic)
		this.CornersPic.Context = this.cntxt;
};
GenieButton.prototype.DrawDisabled = function() {

	this.Context.fillStyle = "white";
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Context.globalAlpha = 0.1;
	this.Draw(!PRESSED);
	this.Context.globalAlpha = 1.0;
};
GenieButton.prototype.DrawPressed = function() {

	this.Draw(PRESSED);
};
GenieButton.prototype.DrawPlain = function(bPressed) {

	this.Erase(null, 2);
	this.Context.lineWidth = 1.0;	//NOTE: cannot assume it will always be 1.0 when app starts
	if (bPressed) {
		this.Context.strokeStyle = this.Specs.COLOUR3 || GREY.MOCHA;
		this.Context.strokeRect(this.Specs.L-1.5, this.Specs.T-1.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR4 || GREY.MEDIUM;
		this.Context.strokeRect(this.Specs.L-0.5, this.Specs.T-0.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR2 || GREY.LIGHT;
		this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR1 || "white";
		this.Context.strokeRect(this.Specs.L+1.5, this.Specs.T+1.5, this.Specs.W, this.Specs.H);
	} else {
		this.Context.strokeStyle = this.Specs.COLOUR1 || "white";
		this.Context.strokeRect(this.Specs.L-1.5, this.Specs.T-1.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR2 || GREY.LIGHT;
		this.Context.strokeRect(this.Specs.L-0.5, this.Specs.T-0.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR3 || GREY.MOCHA;
		this.Context.strokeRect(this.Specs.L+1.5, this.Specs.T+1.5, this.Specs.W, this.Specs.H);
		this.Context.strokeStyle = this.Specs.COLOUR4 || GREY.MEDIUM;
		this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W, this.Specs.H);
	}
};
GenieButton.prototype.DrawShallow = function(bPressed) {  //TODO: ::DrawRaised has the right implementation, so change to that

	this.Erase();
	if (bPressed) {
		this.Context.fillStyle = GREY.DARK;		//TODO: add ability to specify bas-relief colours
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
		this.Context.fillStyle = GREY.LIGHT;
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(2, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(3, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(0, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(3, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	} else {
		this.Context.fillStyle = GREY.LIGHT;		//TODO: add ability to specify bas-relief colours
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
		this.Context.fillStyle = GREY.DARK;
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(1, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(2, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(1, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	}
};
GenieButton.prototype.DrawRaised = function(bPressed) {

	this.Erase();
	if (bPressed) {
		this.Context.fillStyle = this.EdgeColourDark || "black";
		this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));		//left
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);		//top
		this.Context.fillStyle = this.EdgeColourLight || "white";
		this.Context.fillRect(this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));	//right
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);	//bottom
		this.CornersPic.DrawPatchNumber(2, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(3, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(0, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(3, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	} else {
		this.Context.fillStyle = this.EdgeColourLight || "white";
		this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.Context.fillStyle = this.EdgeColourDark || "black";
		this.Context.fillRect(this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.CornersPic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(1, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(2, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(1, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	}
};
GenieButton.prototype.DrawRounded = function(bPressed) {

	this.Erase();
	if (bPressed) {
		this.Context.fillStyle = GREY.DARK;		//TODO: add ability to specify bas-relief colours
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillStyle = GREY.LIGHT;
		this.Context.fillRect(this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.CornersPic.DrawPatchNumber(4, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(5, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(6, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(7, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	} else {
		this.Context.fillStyle = GREY.LIGHT;		//TODO: add ability to specify bas-relief colours
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillStyle = GREY.DARK;
		this.Context.fillRect(this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);
		this.CornersPic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
		this.CornersPic.DrawPatchNumber(1, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);
		this.CornersPic.DrawPatchNumber(2, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);
		this.CornersPic.DrawPatchNumber(3, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);
	}
};
GenieButton.prototype.DrawKeyPadStyle = function(bPressed) {

	this.Erase();
	if (bPressed)
		this.CornersPic.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	else
		this.CornersPic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
};
GenieButton.prototype.DrawOctagonal = function(bPressed) {

	//UNLOGGED

};
GenieButton.prototype.MouseDown = function() {
	GenieControl.prototype.MouseDown.call(this);

	this.Clicked = true;
	this.DrawPressed();
	setTimeout(this.Reset.bind(this), 60);
};
/* is now REDUNDANT
GenieButton.prototype.MouseUp = function() {
	GenieControl.prototype.MouseUp.call(this);

	this.Draw();
};
*/
GenieButton.prototype.ClickedOn = function() {  //NOTE: dummy function to over-ride default behaviour
};
GenieButton.prototype.WriteLabel = function(offset) {

	if (!this.Enabled) {
		this.Context.clearRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.H-(2*this.Specs.LW));
		this.Context.globalAlpha = 0.25;
	}

	//Colour
	this.Context.fillStyle = this.Specs.COLOUR || "lightgrey";		//NOTE: "lightgrey" is "rgb(211,211,211)
	this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.H-(2*this.Specs.LW));

	//Centre horizontally (unless otherwise specified via 'offset')
	this.x = this.Specs.L;
	if (offset)
		this.x += offset;
	else
		this.x += Math.round((this.Specs.W-this.Context.measureText(this.Specs.LABEL).width)/2);

	//Centre vertically
	this.y = parseInt(this.Context.font.split(' ')[0].replace('px', ''));		//get height of font
	this.y += Math.round((this.Specs.H-this.y)/2);					//add padding
	this.y += this.Specs.T;
	this.y -= 1;										//this appears to be necessary because of how JS writes text
	if (StringUtils.CheckDescending(this.Specs.LABEL))
		this.y -= 2;

	//Write
	this.TextWriter.cntxt = this.TextWriter.Context;
	this.TextWriter.Context = this.Context;
	this.TextWriter.Write(this.Specs.LABEL, this.x, this.y, this.Specs.TEXT);
	this.TextWriter.RestoreContext(this.TextWriter.cntxt);

	if (!this.Enabled)
		this.Context.globalAlpha = 1.0;
};
GenieButton.prototype.DrawImage = function() {

	if (this.Specs.O) {
		if (!this.Enabled)
			this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		this.Context.fillStyle = this.Specs.COLOUR || "lightgrey";		//NOTE: "lightgrey" is "rgb(211,211,211)
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
		this.Context.drawImage(this.Pic, this.Specs.SX, this.Specs.SY, this.Specs.W+this.Specs.O.W, this.Specs.H+this.Specs.O.H, this.Specs.L+this.Specs.O.X, this.Specs.T+this.Specs.O.Y, this.Specs.W+this.Specs.O.W, this.Specs.H+this.Specs.O.H);
	} else {
		if (!this.Enabled)
			this.Context.clearRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.H-(2*this.Specs.LW));
		this.w = this.Specs.W - (2*this.Specs.LW);
		this.h = this.Specs.H - (2*this.Specs.LW);
		this.Context.drawImage(this.Pic, this.Specs.SX, this.Specs.SY, this.w, this.h, this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.w, this.h);
	}

	if (!this.Enabled)
		this.Context.globalAlpha = 1.0;
};
/*
GenieButton.prototype.MouseOver = function() {
	this.Context.clearRect(this.Specs.L, this.Specs.Y, this.Specs.W, this.Specs.H);
	this.Context.globalAlpha = 0.9;
	this.Context.drawImage(this.ImageSheet, this.Specs.SX, this.Specs.SY, this.Specs.W, this.Specs.H, this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Context.globalAlpha = 1.0;
};
*/
GenieButton.prototype.Reset = function() {

	if (this.CheckEnabled() && this.CheckActivated())
		this.Draw();
};
