
SolarWordsInfoView.prototype.DisplayCorners = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		if ( i==0 || i==4 || i==12 || i==20 || i==24 ) {
			this.Cells[i].SetColour(this.Specs.LIGHT.GREEN);
			this.Cells[i].SetLetter(this.Cells[i].Solution);
			this.Cells[i].Draw();
		}
};
