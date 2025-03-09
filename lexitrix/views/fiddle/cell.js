
//-------------------------------------------
//---------- FIDDLE CELL --------------------
var FiddleCell = function() {
	var Specs;
	var Context;
	var Board;
	var BoundingBox;
	var Letter, Solution;
	var Status, State;
	var BumperCells;

	var a, x, y;
};
FiddleCell.prototype = {
	Set(specs, cntxt, brd) {
		this.Specs = specs;
		this.Context = cntxt;
		this.Board = brd;
		this.BumperCells = new Array(this.Specs.BUMPER.NEIGHBOURS);
		this.a = "a";
		this.State = this.Specs.STATE.UNSELECTED;
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(x, y, this.Specs.W, this.Specs.H);
	},
	SetLetter(lttr) {

		this.Letter = lttr;
		this.Draw();
		this.UpdateBumpers();
		if (!this.Board.Fiddle.SolvedFlag)
			if (this.Board.CheckSolved()) {
				this.Board.Fiddle.SolvedFlag = true;
				setTimeout(this.AlertSolved.bind(this), 60);
			}
	},
	Draw() {

		this.DrawBackground();
		if (this.Status==this.Specs.STATUS.LETTER)
			this.DisplayLetter();
	},
	DrawOutline() {

		this.Board.CellOutlineImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
	},
	DrawBackground() {  //UNLOGGED

		if (this.Status==this.Specs.STATUS.LETTER) {
			if (this.Letter==this.Solution)
				this.Board.GreenCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
			else {
				if (this.State==this.Specs.STATE.SELECTED)
					this.Board.CyanCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
				else
					this.Board.WhiteCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
			}
		} else
			switch (this.State) {
				case this.Specs.STATE.GREEN:
					this.Board.GreenCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
					break;
				case this.Specs.STATE.YELLOW:
					this.Board.YellowCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
					break;
				case this.Specs.STATE.RED:
					this.Board.RedCellImage.Draw(this.BoundingBox.L+this.Specs.F.X, this.BoundingBox.T+this.Specs.F.Y);
					break;
			}
	},
	DisplayLetter(x, y) {
		var iLttr;

		iLttr = this.Letter.charCodeAt(0) - this.a.charCodeAt(0);
		if (x)
			this.Board.LetterImage.DrawPatchNumber(iLttr, this.x, this.y);
		else
			this.Board.LetterImage.DrawPatchNumber(iLttr, this.BoundingBox.L+this.Specs.O.X, this.BoundingBox.T+this.Specs.O.Y);
	},
	Select() {

		this.State = this.Specs.STATE.SELECTED;
		this.Draw();
	},
	CheckClicked() {

		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox))
			return (true);
	},
	UpdateBumpers() {
		var i, j;

		//Check each bumper if it borders cell
		for (i=0;i<this.Specs.BUMPERS;++i) {

			//Set indices of bumper's neighbouring cells
			for (j=0;j<this.Specs.BUMPER.NEIGHBOURS;++j)
				this.BumperCells[j] = this.Board.BumperIndices[i] + this.Board.NeighbouringIndices[j];

			//Check if the bumper neighbours the cell
			if (this.BumperCells.includes(this.Index)) {
				this.Board.UpdateBumperState(this.BumperCells[j]);
				this.Board.Cells[this.Board.BumperIndices[i]].Draw();
			}
		}
	},
	CheckSolved() {

		return (this.Letter==this.Solution);
	},
	AlertSolved() {	  //UNLOGGED

		alert("Solved!");
	},
	Reset() {  //UNLOGGED

		if (this.Status==this.Specs.STATUS.LETTER) {
			this.Solution = "";
			this.Letter = "";
		} else
			this.State = this.Specs.STATE.GREEN;
	}
};
