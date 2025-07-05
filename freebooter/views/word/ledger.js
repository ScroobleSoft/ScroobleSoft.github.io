
SolarWordsInfoView.prototype.SelectLedgerSolution = function() {
	var c, r;
	var iLttr;
	var iWrd;

	iLttr = this.Randomizer.GetSlot(this.FiveDistribution);
	iWrd = this.Randomizer.GetIndex(this.FiveLetterWords[iLttr].length);
	this.Solution = this.FiveLetterWords[iLttr][iWrd];
	for (r=0;r<this.Specs.GRID.R;++r)
		for (c=0;c<this.Specs.GRID.C;++c)
			this.Cells[(this.Specs.GRID.C*r)+c].Solution = this.Solution[c];
};
SolarWordsInfoView.prototype.SetLedgerCellColours = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		this.Cells[i].Colour = this.Specs.COLOURS[Math.floor(i/this.Specs.GRID.C)];
};
SolarWordsInfoView.prototype.UpdateLedgerKeyClick = function(key) {
	var c;
	var clr;

	//Determine tile colour
	this.SelectedCell.Letter = key.Letter;
	c = this.SelectedCell.Index % this.Specs.GRID.C;
	if (key.Letter==this.Solution[c])
		clr = this.Specs.LIGHT.GREEN;
	else if (this.Solution.includes(key.Letter))
		clr = this.Specs.LIGHT.AMBER;
	else
		clr = this.Specs.LIGHT.RED;

	this.SelectedCell.SetColour(clr);
	this.SelectedCell.SetLetter(key.Letter);
	this.SelectedCell.Draw();

	//Check if solved
	if (((this.SelectedCell.Index+1) % this.Specs.GRID.C)==0)
		if (this.CheckLedgerSolved(Math.floor(this.SelectedCell.Index/this.Specs.GRID.C))) {
			this.Congratulate();
			return;
		}

	//Select next cell
	if (this.SelectedCell.Index==(this.Specs.GRID.CELLS-1))
		this.SelectCell(this.Cells[0]);
	else
		this.SelectCell(this.Cells[this.SelectedCell.Index+1]);

	//Clear row if already used
	if ((this.SelectedCell.Index % this.Specs.GRID.C)==0)
		if (this.SelectedCell.Letter!="") {
			for (c=0;c<this.Specs.GRID.C;++c) {
				this.Cells[this.SelectedCell.Index+c].SetColour(this.Specs.COLOURS[c]);
				this.Cells[this.SelectedCell.Index+c].Clear();
			}
			this.SelectCell(this.Cells[this.SelectedCell.Index]);
		}
};
SolarWordsInfoView.prototype.CheckLedgerSolved = function(iRow) {
	var c;

	for (c=0;c<this.Specs.GRID.C;++c)
		if (this.Cells[(this.Specs.GRID.C*iRow)+c].Letter!=this.Solution[c])
			return (false);

	return (true);
};
