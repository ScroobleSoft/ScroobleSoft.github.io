
//-------------------------------------------
//---------- TURTLE CELL --------------------
var TurtleCell = function() {
	var Specs;
	var Shell;
	var BoundingBox;
	var Letter, Solution;
	var State;

	var a;
};
TurtleCell.prototype = {
	Set(specs, shll) {
		this.Specs = specs;
		this.Shell = shll;
		this.a = "a";
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(x, y, this.Specs.W, this.Specs.H);
	},
	SetLetter(lttr) {

		this.Letter = lttr;
		if (this===this.Shell.SelectedCell) {
			if (!this.Letter)
				this.State = this.Specs.STATE.SELECTED;
			else if (this.Letter==this.Solution)
				this.State = this.Specs.STATE.SELECTED;
			else {
				this.State = this.Specs.STATE.WRONgCHOICE;
				this.Shell.Turtle.IncrementErrors();
			}
		} else {
			if (!this.Letter)
				this.State = this.Specs.STATE.UNSELECTED;
			else if (this.Letter==this.Solution)
				this.State = this.Specs.STATE.UNSELECTED;
			else {
				this.State = this.Specs.STATE.INCORRECT;
				this.Shell.Turtle.IncrementErrors();
			}
		}
		this.Draw();

		if (this.Shell.Turtle.LettersFlag)
			this.Shell.FillLetter(this.Letter);

		if (!this.Shell.Turtle.SolvedFlag)
			if (this.Shell.CheckSolved()) {
				this.Shell.Turtle.SolvedFlag = true;
				setTimeout(this.AlertSolved.bind(this), 60);
			}
	},
	Draw() {

		this.DrawCell();
		if (this.Letter)
			this.DisplayLetter();
	},
	DrawCell() {

		switch (this.State) {
			case this.Specs.STATE.SELECTED:
				this.Shell.SelectedCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
				break;
			case this.Specs.STATE.UNSELECTED:
				this.Shell.UnselectedCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
				break;
			case this.Specs.STATE.BLOCKED:
				this.Shell.BlockedCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
				break;
			case this.Specs.STATE.INCORRECT:
				this.Shell.IncorrectCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
				break;
			case this.Specs.STATE.WRONgCHOICE:
				this.Shell.WrongCellImage.Draw(this.BoundingBox.L, this.BoundingBox.T);
				break;
		}

		if (this.Letter)
			this.DisplayLetter();
	},
	DisplayLetter() {
		var iLttr;

		iLttr = this.Letter.charCodeAt(0) - this.a.charCodeAt(0);
		if (this.State==this.Specs.STATE.INCORRECT || this.State==this.Specs.STATE.WRONgCHOICE)
			this.Shell.LetterImage.DrawPatchNumber(iLttr+26, this.BoundingBox.L+this.Specs.O.X, this.BoundingBox.T+this.Specs.O.Y);
		else
			this.Shell.LetterImage.DrawPatchNumber(iLttr, this.BoundingBox.L+this.Specs.O.X, this.BoundingBox.T+this.Specs.O.Y);
	},
	Select() {

		if (this.State==this.Specs.STATE.BLOCKED)
			return;

		if (this===this.Shell.SelectedCell)
			return;

		//Set and draw previously selected cell
		if (this.Shell.SelectedCell.Letter) {
			if (this.Shell.SelectedCell.Letter==this.Shell.SelectedCell.Solution)
				this.Shell.SelectedCell.State = this.Specs.STATE.UNSELECTED;
			else 
				this.Shell.SelectedCell.State = this.Specs.STATE.INCORRECT;
		} else
			this.Shell.SelectedCell.State = this.Specs.STATE.UNSELECTED;
		this.Shell.SelectedCell.Draw();

		//Draw newly selected cell
		this.Shell.SelectedCell = this;
		this.SetLetter(this.Letter);
	},
	CheckClicked() {

		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.BoundingBox))
			this.Select();
	},
	AlertSolved() {	

		alert("Solved!");
	},
	Reset() {

		this.Solution = "";
		this.Letter = "";
	}
};
