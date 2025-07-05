
//-----------------------------------------------
//---------- SOLAR WORD CELL --------------------
var SolarWordCell = function() {
	var GraphicsTool;
	var Specs;
	var Index;
	var LetterImages;
	var BoundingBox;
	var Letter, Solution;
	var Colour;
};
SolarWordCell.prototype = {
	Set(specs, gTool, indx, img) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Index = indx;
		this.LetterImages = img;
		this.BoundingBox = new GenieRect();
		this.Status = VIEW.WORDS.INFO.CELL.STATE.CLEAR;
	},
	SetLocation(x, y) {

		this.BoundingBox.Set(x, y, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
	},
	SetColour(colour) {

		this.Colour = colour;
	},
	SetLetter(lttr) {

		this.Letter = lttr;
	},
	Draw() {

		this.GraphicsTool.SwitchToInfoBox();
		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+this.Specs.LW, this.BoundingBox.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW),
										this.Specs.H-(2*this.Specs.LW), this.Colour, 0);
		this.GraphicsTool.ResetContext();
		if (this.Letter)
			this.DrawLetter();
	},
	Clear() {

		this.GraphicsTool.SwitchToInfoBox();
		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+this.Specs.LW, this.BoundingBox.T+this.Specs.LW, this.Specs.W-(2*this.Specs.LW),
										this.Specs.H-(2*this.Specs.LW), this.Colour, 0);
		this.GraphicsTool.ResetContext();
	},
	DrawLetter() {
		var a;
		var iLttr;
		var x, y;

		a = "a";
		iLttr = this.Letter.charCodeAt(0) - a.charCodeAt(0);
		x = this.BoundingBox.L + this.Specs.O.X;
		y = this.BoundingBox.T + this.Specs.O.Y;
		this.LetterImages.DrawPatchNumber(iLttr, x, y);
	},
	Reset() {

		this.Solution = "";
		this.Letter = "";
	}
};
