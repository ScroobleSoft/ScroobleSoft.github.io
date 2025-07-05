
SolarWordsInfoView.prototype.SelectCell = function(cell) {

	this.SelectedCell = cell;
	this.SelectionImage.Draw(this.SelectedCell.BoundingBox.L+this.Specs.CELL.LW, this.SelectedCell.BoundingBox.T+this.Specs.CELL.LW);
};
SolarWordsInfoView.prototype.ClearSelection = function(cell) {

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(cell.BoundingBox.L+this.Specs.CELL.LW, cell.BoundingBox.T+this.Specs.CELL.LW, cell.BoundingBox.W-this.Specs.CELL.LW,
									cell.BoundingBox.H-this.Specs.CELL.LW, cell.Colour, 2);
	this.GraphicsTool.ResetContext();
};
SolarWordsInfoView.prototype.ClearCell = function(cell) {

	this.Context.fillStyle = this.GetCellColour(cell);
	this.Context.fillRect(cell.BoundingBox.L+this.Specs.CELL.LW, cell.BoundingBox.T+this.Specs.CELL.LW, cell.BoundingBox.W-this.Specs.CELL.LW,
									cell.BoundingBox.H-this.Specs.CELL.LW);
	cell.Letter = "";
};
SolarWordsInfoView.prototype.DrawCell = function(cell) {
	var a;
	var iLttr;
	var x, y;

	a = "a";
	iLttr = cell.Letter.charCodeAt(0) - a.charCodeAt(0);
	x = cell.BoundingBox.L + this.Specs.CELL.O.X;
	y = cell.BoundingBox.T + this.Specs.CELL.O.Y;
	this.LetterImages.DrawPatchNumber(iLttr, x, y);
};
SolarWordsInfoView.prototype.GetCellColour = function(cell) {

	switch (this.GameType) {
		case this.Specs.TYPE.LEDGER:
			return (this.Specs.COLOURS[Math.floor(cell.Index/this.Specs.GRID.C)]);
		case this.Specs.TYPE.VOWELS:
		case this.Specs.TYPE.CORNERS:
			return (SOLArCOLOUR.COCKPIT.SKY);
		case this.Specs.TYPE.RAKE:
			if (cell.Index % this.Specs.GRID.C==0)
				return (SOLArCOLOUR.COCKPIT.SEA);
			else
				return (SOLArCOLOUR.COCKPIT.SKY);
	}
};
SolarWordsInfoView.prototype.GetCellClicked = function() {
	var c, r;
	var iCll;

	//Check if clicked outside the grid
	if ( Mouse.Click.X<this.Specs.GRID.L || Mouse.Click.X>(this.Specs.GRID.L+this.Specs.GRID.W))
		return;
	if ( Mouse.Click.Y<this.Specs.GRID.T || Mouse.Click.Y>(this.Specs.GRID.T+this.Specs.GRID.H))
		return;

	//Determine clicked cell
	c = Math.floor((Mouse.Click.X-this.Specs.GRID.L)/(this.Specs.CELL.W-this.Specs.CELL.LW));
	r = Math.floor((Mouse.Click.Y-this.Specs.GRID.T)/(this.Specs.CELL.H-this.Specs.CELL.LW));
	iCll = (this.Specs.GRID.C*r) + c;

	return (this.Cells[iCll]);
};
