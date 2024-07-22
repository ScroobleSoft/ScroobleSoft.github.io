
//--------------------------------------------
//---------- SPINDLE CELL --------------------
var SpindleCell = function() {
	var Specs;
	var GraphicsTool;
	var Ledger;
	var BoundingBox;
	var Letter, Solution;
	var Type, Status;
};
SpindleCell.prototype = {
	Set(specs, gTool, type, ldgr) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Type = type;
		this.Ledger = ldgr;
		this.Status = this.Specs.STATUS.CLEAR;
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		if (this.Type==this.Specs.TYPE.SPINE)
			this.BoundingBox.Set(x, y, this.Specs.SPINE.W, this.Specs.SPINE.H);
		else
			this.BoundingBox.Set(x, y, this.Specs.ROW.W, this.Specs.ROW.H);
	},
	SetLetter(lttr) {

		this.Letter = lttr;
		if (this.Letter==this.Solution) {
			this.Ledger.FillRows(this.Letter);
			this.Ledger.FillSpine(this.Letter);
			this.Status = this.Specs.STATUS.SOLVED;
			if (this.Type==this.Specs.TYPE.SPINE)
				if (this.Ledger.CheckSolved())
					this.Ledger.Spindle.Solved();
		} else {
			this.Status = this.Specs.STATUS.WRONG;
			this.Ledger.Spindle.UpdateErrors();
		}
		this.Draw();
		this.Select();
	},
	Select() {

		this.Ledger.SelectedCell.ClearSelectionSquare();
		this.DrawSelectionSquare();
		this.Ledger.SelectedCell = this;
	},
	Draw() {

		this.DrawBackground();
		if (this.Letter)
			this.DisplayLetter();
	},
	DrawFrame() {

		this.DrawBackground();
		if (this.Type==this.Specs.TYPE.SPINE)
			this.Ledger.LargeCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
		else
			this.Ledger.SmallCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
	},
	DrawBackground() {
		var colour;

		colour = this.DetermineColour();
		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+2, this.BoundingBox.T+2, this.BoundingBox.W-4, this.BoundingBox.H-4, colour, 0);
	},
	Clear() {

		this.Letter = "";
		this.Status = this.Specs.STATUS.CLEAR;
		this.DrawBackground();
		if (this===this.Ledger.SelectedCell)
			this.DrawSelectionSquare();
	},
	DetermineColour() {

		switch (this.Status) {
			case this.Specs.STATUS.CLEAR:
				return (this.Specs.COLOUR);
			case this.Specs.STATUS.WRONG:
				return ("rgb(127,000,000)");
			case this.Specs.STATUS.SOLVED:
				return (PAINT.LIME);
		}
	},
	DrawSelectionSquare() {

		if (this.Type==this.Specs.TYPE.SPINE)
			this.Ledger.LargeSelectionImage.Draw(this.BoundingBox.L+2, this.BoundingBox.T+2);
		else
			this.Ledger.SmallSelectionImage.Draw(this.BoundingBox.L+2, this.BoundingBox.T+2);
	},
	ClearSelectionSquare() {
		var colour;

		colour = this.DetermineColour();
		this.GraphicsTool.DrawRectangle(this.BoundingBox.L+2, this.BoundingBox.T+2, this.BoundingBox.W-4, this.BoundingBox.H-4, colour, 3);
	},
	DisplayLetter() {
		var a;
		var iLttr;
		var x, y;

		a = "a";
		iLttr = this.Letter.charCodeAt(0) - a.charCodeAt(0);
		if (this.Type==this.Specs.TYPE.SPINE) {
			x = this.BoundingBox.L + this.Specs.SPINE.O.X;
			y = this.BoundingBox.T + this.Specs.SPINE.O.Y;
			this.Ledger.LargeLetterImages.DrawPatchNumber(iLttr, x, y);
		} else {
			x = this.BoundingBox.L + this.Specs.ROW.O.X;
			y = this.BoundingBox.T + this.Specs.ROW.O.Y;
			this.Ledger.SmallLetterImages.DrawPatchNumber(iLttr, x, y);
		}
	},
	DisplayHint() {

		this.DisplayLetter();
		setTimeout(this.Clear.bind(this), 500);
	},
	CheckClicked() {

		return (SpaceUtils.CheckPointInBox(Mouse.Down, this.BoundingBox));
	},
	UpdateClick() {

		if (this.Ledger.SelectedCell===this)
			this.Clear();
		else {
			this.Select();
			if (this.Type==this.Specs.TYPE.SPINE)
				this.Ledger.Spindle.Keyboard.RaiseVowelKeys();
			else
				this.Ledger.Spindle.Keyboard.PressVowelKeys();
		}
	},
	CheckInSpine() {

		return (this.Type==this.Specs.TYPE.SPINE);
	},
	Reset() {

		this.Solution = "";
		this.Letter = "";
		this.Status = this.Specs.STATUS.CLEAR;
	}
};
