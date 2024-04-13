
//--------------------------------------------
//---------- CROSSLE CELL --------------------
var CrossleCell = function() {
	var Specs;
	var GraphicsTool;
	var Board;
	var BoundingBox;
	var Letter, Solution;
};
CrossleCell.prototype = {
	Set(specs, gTool, brd) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Board = brd;
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(x, y, this.Specs.W, this.Specs.H);
	},
	PlaceLetter(lttr) {

		this.Letter = lttr;
		this.Clear();
		this.GraphicsTool.Context.globalAlpha = 0.25;
		this.DrawLetter();
		this.GraphicsTool.Context.globalAlpha = 1.0;
	},
	SetLetter(lttr, bSolved) {  //TODO: passing bSolved REDUNDANT?

		this.Letter = lttr;
		this.Draw();
	},
	Draw(bSolved) {

		this.Clear(bSolved);
		if (this.Letter)
			this.DisplayLetter();
	},
	DrawSelectionSquare() {

		this.Board.SelectedImage.Draw(this.BoundingBox.L+1, this.BoundingBox.T+1);
	},
	ClearSelectionSquare() {

		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+1, this.BoundingBox.T+1, this.Specs.W-1, this.Specs.H-1, "white", 2);
	},
	Clear(bSolved) {

		if (bSolved)
			this.GraphicsTool.DrawRectangle(this.BoundingBox.L+3, this.BoundingBox.T+3, this.Specs.W-5, this.Specs.H-5, "rgb(175,223,095)", 0);
		else
			this.GraphicsTool.DrawRectangle(this.BoundingBox.L+3, this.BoundingBox.T+3, this.Specs.W-5, this.Specs.H-5, "white", 0);
	},
	DisplayLetter() {

		//Draw 'incorrect' background if necessary
		if (this.Letter!=this.Solution)
			this.GraphicsTool.DrawRectangle(this.BoundingBox.L+3, this.BoundingBox.T+3, this.Specs.W-5, this.Specs.H-5, "red", 0);

		this.DrawLetter();
	},
	DrawLetter() {
		var a;
		var iLttr;
		var x, y;

		a = "a";
		iLttr = this.Letter.charCodeAt(0) - a.charCodeAt(0);
		x = this.BoundingBox.L + this.Specs.OFFSET.X;
		y = this.BoundingBox.T + this.Specs.OFFSET.Y;
		UpperCaseLetterImages.DrawPatchNumber(iLttr, x, y);
	},
	CheckClicked() {

		return (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox));
	},
	CheckClear() {

		return (!this.Letter);
	},
	Reset() {

		this.Solution = "";
		this.Letter = "";
	}
};
