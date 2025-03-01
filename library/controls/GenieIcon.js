
//-----------------------------------------
//---------- GENIE ICON -------------------	specs: { L: -1, T: -1, W: -1, H: -1, LW: -1, BACKGROUND: "", COLOUR: { MAIN: "", LIGHT: "", DARK: "" } }
var GenieIcon = function() {
	var CornersPic;
	var Pressed;
	var MouseDownFlag;	//TODO: probably REDUNDANT
	var Colour, LightColour, DarkColour;
	var ToolTip;		//???
};
GenieIcon.prototype = new GenieControl();
GenieIcon.prototype.Set = function(cnvs, specs, pic) {
	GenieControl.prototype.Set.call(this, cnvs, specs, pic);

	this.SetColours();
	this.Pressed = false;
	this.MouseDownFlag = false;

	//TODO: set up tool-tip if specified
};
GenieIcon.prototype.SetCornersPic = function(pic) {

	this.CornersPic = pic;
};
GenieIcon.prototype.SetColours = function(pic) {

	if (this.Specs.COLOUR) {
		this.Colour = this.Specs.COLOUR.MAIN || ICON.COLOUR.MAIN;
		this.LightColour = this.Specs.COLOUR.LIGHT || ICON.COLOUR.LIGHT;
		this.DarkColour = this.Specs.COLOUR.DARK || ICON.COLOUR.DARK;
	} else {
		this.Colour = ICON.COLOUR.MAIN;
		this.LightColour = ICON.COLOUR.LIGHT;
		this.DarkColour = ICON.COLOUR.DARK;
	}
};
GenieIcon.prototype.Draw = function(bPressed) {
	var num;
	var colour1, colour2;

	//Set correct corners and colours for drawing
	if (bPressed) {
		num = 4;
		colour1 = this.DarkColour;
		colour2 = this.LightColour;
	} else {
		num = 0;
		colour1 = this.LightColour;
		colour2 = this.DarkColour;
	}

	//Draw shadows
	this.Context.fillStyle = colour1;
	this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);	//top shadow
	this.Context.fillStyle = colour2;
	this.Context.fillRect(this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));	//right shadow
	this.Context.fillStyle = colour2;
	this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.LW);	//bottom shadow
	this.Context.fillStyle = colour1;
	this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.LW, this.Specs.LW, this.Specs.H-(2*this.Specs.LW));	//left shadow

	//Draw either a pic or a colour
	if (this.Pic)
		this.Pic.Draw(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW);
	else {
		this.Context.fillStyle = this.Colour;
		this.Context.fillRect(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW), this.Specs.H-(2*this.Specs.LW));
	}

	//Draw corners
	this.CornersPic.DrawPatchNumber(num,	this.Specs.L, this.Specs.T);																				//top-left corner
	this.CornersPic.DrawPatchNumber(num+1, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T);											//top-right
	this.CornersPic.DrawPatchNumber(num+2, this.Specs.L+this.Specs.W-this.Specs.LW, this.Specs.T+this.Specs.H-this.Specs.LW);		//bottom-right
	this.CornersPic.DrawPatchNumber(num+3, this.Specs.L, this.Specs.T+this.Specs.H-this.Specs.LW);											//bottom-left
};
GenieIcon.prototype.MouseDown = function() {

	this.MouseDownFlag = true;
	this.Pressed = !this.Pressed;

	//Erase
	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	} else
		this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

	this.Draw(this.Pressed);
};
GenieIcon.prototype.CheckMouseDown = function() {  //TODO: is this being used anywhere? REDUNDANT?

	if (!this.MouseDownFlag)
		return (false);
	this.MouseDownFlag = false;
	return (true);
};
GenieIcon.prototype.CheckPressed = function() {

	return (this.Pressed);
};
GenieIcon.prototype.UnPress = function() {

	if (!this.Pressed)
		return;
	this.Pressed = false;
	if (this.Specs.COLOUR) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	} else
		this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.Draw();
};
GenieIcon.prototype.Reset = function() {

	this.Pressed = false;
};
