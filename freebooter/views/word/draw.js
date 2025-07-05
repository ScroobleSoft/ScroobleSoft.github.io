
SolarWordsInfoView.prototype.DrawBackground = function() {
	var i;
	var t;

	switch (this.GameType) {
		case this.Specs.TYPE.LEDGER:
			for (i=0;i<5;++i) {
				this.Context.fillStyle = this.Specs.COLOURS[i];
				t = this.Specs.GRID.T + this.Specs.CELL.LW + ((this.Specs.CELL.H-this.Specs.CELL.LW)*i);
				this.Context.fillRect(this.Specs.GRID.L, t, this.Specs.GRID.W, this.Specs.GRID.CH);
			}
			break;
		case this.Specs.TYPE.VOWELS:
		case this.Specs.TYPE.CORNERS:

			//Colour all tiles
			this.Context.fillStyle = SOLArCOLOUR.COCKPIT.SKY;
			this.Context.fillRect(this.Specs.GRID.L, this.Specs.GRID.T, this.Specs.GRID.W, this.Specs.GRID.H);

			//Block bumper tiles
			this.Context.fillStyle = GREY.DARK;
			this.Context.fillRect( 49, 62,37,37);
			this.Context.fillRect(127, 62,37,37);
			this.Context.fillRect(127,140,37,37);
			this.Context.fillRect( 49,140,37,37);
			break;
		case this.Specs.TYPE.RAKE:
			this.Context.fillStyle = SOLArCOLOUR.COCKPIT.SEA;
			this.Context.fillRect(this.Specs.GRID.L+this.Specs.CELL.LW, this.Specs.GRID.T, this.Specs.GRID.CW, this.Specs.GRID.H);
			this.Context.fillStyle = SOLArCOLOUR.COCKPIT.SKY;
			this.Context.fillRect(this.Specs.GRID.L+this.Specs.CELL.W, this.Specs.GRID.T, this.Specs.GRID.W-this.Specs.CELL.W, this.Specs.GRID.H);
			break;
	}
};
SolarWordsInfoView.prototype.DisplayCells = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		this.CellImage.Draw(this.Cells[i].BoundingBox.L, this.Cells[i].BoundingBox.T);
	if (this.SelectedCell)
		this.SelectionImage.Draw(this.SelectedCell.BoundingBox.L+this.Specs.CELL.LW, this.SelectedCell.BoundingBox.T+this.Specs.CELL.LW);
};
SolarWordsInfoView.prototype.DisplayJourney = function() {

	//Station
	this.cntxt = StationImage.Context;
	StationImage.Context = this.Context;
	StationImage.Draw(211, 2);
	StationImage.Context = this.cntxt;

	//Ship
	this.cntxt = ShipImage.Context;
	ShipImage.Context = this.Context;
	ShipImage.Draw(211, 225);
	ShipImage.Context = this.cntxt;

	//Meter
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(216, 32, 13, 188, "black", 0);
	this.GraphicsTool.DrawRectangle(216, 32, 13, 188, "white", 1);
	this.GraphicsTool.ResetContext();
};
