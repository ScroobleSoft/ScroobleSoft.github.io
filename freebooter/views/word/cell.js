
//-----------------------------------------------
//---------- SOLAR WORD CELL --------------------
var SolarWordCell = function() {
	var Specs;
	var GraphicsTool;
	var BoundingBox;
	var Letter, Solution;
	var Status;
};
SolarWordCell.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.BoundingBox = new GenieRect();
		this.Status = VIEW.WORDS.CELL.STATE.CLEAR;
	},
	SetLocation(x, y) {

		this.BoundingBox.Set(x, y, this.Specs.W-this.Specs.LW, this.Specs.H-this.Specs.LW);
	},
	SetLetter(lttr, bSolved) {  //UNLOGGED

		this.Letter = lttr;
		this.Draw();
	},
	Draw() {  //UNLOGGED

		this.Clear();
		if (this.Letter)
			this.DisplayLetter();
	},
	DrawSelectionSquare() {  //UNLOGGED

		this.Board.SelectedImage.Draw(this.BoundingBox.L+1, this.BoundingBox.T+1);
	},
	ClearSelectionSquare() {  //UNLOGGED

		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+1, this.BoundingBox.T+1, this.Specs.W-1, this.Specs.H-1, "white", 2);
	},
	Clear() {  //UNLOGGED

			this.GraphicsTool.DrawRectangle(this.BoundingBox.L+3, this.BoundingBox.T+3, this.Specs.W-5, this.Specs.H-5, "white", 0);
	},
	DisplayLetter() {  //UNLOGGED

		//TODO: RAKE will be different since first column will have a unique colour

		//Draw 'incorrect' background if necessary
		if (this.Letter!=this.Solution)
			this.GraphicsTool.DrawRectangle(this.BoundingBox.L+3, this.BoundingBox.T+3, this.Specs.W-5, this.Specs.H-5, "red", 0);

		this.DrawLetter();
	},
	DrawLetter() {  //UNLOGGED
		var a;
		var iLttr;
		var x, y;

		a = "a";
		iLttr = this.Letter.charCodeAt(0) - a.charCodeAt(0);
		x = this.BoundingBox.L + this.Specs.OFFSET.X;
		y = this.BoundingBox.T + this.Specs.OFFSET.Y;
		UpperCaseLetterImages.DrawPatchNumber(iLttr, x, y);
	},
	CheckClicked() {  //UNLOGGED

		return (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox));
	},
	CheckClear() {  //UNLOGGED

		return (!this.Letter);
	},
	Reset() {  //UNLOGGED

		this.Solution = "";
		this.Letter = "";
	}
};
