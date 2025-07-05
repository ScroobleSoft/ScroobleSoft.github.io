
SolarWordsInfoView.prototype.SelectRakeSolution = function() {
	var i, j;
	var word;

	//Solution word
	do {
		this.lttr = this.Randomizer.GetSlot(this.FiveDistribution);
		this.wrd = this.Randomizer.GetIndex(this.FiveLetterWords[this.lttr].length);
		this.Solution = this.FiveLetterWords[this.lttr][this.wrd];
	} while (this.Solution.includes('x'));
	for (i=0;i<this.Solution.length;++i)
		this.Cells[5*i].Solution = this.Solution[i];
	
	//Clue words
	for (i=0;i<5;++i) {
		this.lttr = StringUtils.GetLetterIndex(this.Solution[i]);
		if (this.lttr>23)  //amend for words starting with 'y' or 'z'
			--this.lttr;
		this.wrd = this.Randomizer.GetIndex(this.FiveLetterWords[this.lttr].length);
		word = this.FiveLetterWords[this.lttr][this.wrd];
		for (j=1;j<5;++j)
			this.Cells[(5*i)+j].Solution = word[j];
	}
};
SolarWordsInfoView.prototype.SetRakeCellColours = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		if (i % this.Specs.GRID.C==0)
			this.Cells[i].Colour = SOLArCOLOUR.COCKPIT.SEA;
		else
			this.Cells[i].Colour = SOLArCOLOUR.COCKPIT.SKY;
};
SolarWordsInfoView.prototype.DisplayRakeVowels = function() {
	var i;

	for (i=1;i<this.Specs.GRID.CELLS;++i) {
		if (i % this.Specs.GRID.C==0)
			continue;
		if (VowelString.includes(this.Cells[i].Solution)) {
			this.Cells[i].SetColour(this.Specs.LIGHT.GREEN);
			this.Cells[i].SetLetter(this.Cells[i].Solution);
			this.Cells[i].Draw();
		}
	}
};
SolarWordsInfoView.prototype.UpdateRakeKeyClick = function(key) {
	var i;
	var clr;

	//Determine tile colour
	this.SelectedCell.Letter = key.Letter;
	if (this.SelectedCell.Letter==this.SelectedCell.Solution)
		clr = this.Specs.LIGHT.GREEN;
	else
		clr = this.Specs.LIGHT.RED;

	//Draw
	this.SelectedCell.SetColour(clr);
	this.SelectedCell.SetLetter(key.Letter);
	this.SelectedCell.Draw();
	this.SelectCell(this.SelectedCell);

	//Propagate all instances of letter if correct
	if (this.SelectedCell.Letter==this.SelectedCell.Solution)
		for (i=0;i<this.Specs.GRID.CELLS;++i) {
			if (this.Cells[i]===this.SelectedCell)
				continue;
			if (i % this.Specs.GRID.C==0)
				continue;
			if (this.Cells[i].Solution==this.SelectedCell.Letter) {
				this.Cells[i].SetColour(this.Specs.LIGHT.GREEN);
				this.Cells[i].SetLetter(this.SelectedCell.Letter);
				this.Cells[i].Draw();
			}
		}

	//Check if solved
	if (this.CheckRakeSolved()) {
		this.Congratulate();
		return;
	}
};
SolarWordsInfoView.prototype.CheckRakeSolved = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;i+=this.Specs.GRID.C)
		if (this.Cells[i].Letter!=this.Cells[i].Solution)
			return (false);

	return (true);
};
