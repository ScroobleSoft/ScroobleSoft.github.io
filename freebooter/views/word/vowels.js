
SolarWordsInfoView.prototype.SelectGridSolution = function() {

	do {
		this.Errors = 0;
		this.SelectGridWords();
	} while (this.Errors);
};
SolarWordsInfoView.prototype.SelectGridWords = function() {
	var i;
	var word;

	//Top horizontal word
	this.lttr = this.Randomizer.GetSlot(this.FiveDistribution);
	this.wrd = this.Randomizer.GetIndex(this.FiveLetterWords[this.lttr].length);
	for (i=0;i<this.Specs.GRID.C;++i)
		this.Cells[i].Solution = this.FiveLetterWords[this.lttr][this.wrd][i];

	//Left vertical word
	word = this.GetVerticalWord(this.Cells[0].Solution);
	for (i=1;i<this.Specs.GRID.R;++i)
		this.Cells[5*i].Solution = this.FiveLetterWords[this.lttr][this.wrd][i];

	//Middle vertical word
	word = this.GetVerticalWord(this.Cells[2].Solution);
	for (i=1;i<this.Specs.GRID.R;++i)
		this.Cells[(5*i)+2].Solution = word[i];

	//Right vertical word
	word = this.GetVerticalWord(this.Cells[4].Solution);
	for (i=1;i<this.Specs.GRID.R;++i)
		this.Cells[(5*i)+4].Solution = word[i];

	//Middle horizontal word
	word = this.GetJoiningHorizontalWord(this.Cells[10].Solution, this.Cells[12].Solution, this.Cells[14].Solution);
	if (word=="00000")
		++this.Errors;
	this.Cells[11].Solution = word[1];
	this.Cells[13].Solution = word[3];

	//Bottom horizontal word
	word = this.GetJoiningHorizontalWord(this.Cells[20].Solution, this.Cells[22].Solution, this.Cells[24].Solution);
	if (word=="00000")
		++this.Errors;
	this.Cells[21].Solution = word[1];
	this.Cells[23].Solution = word[3];
};
SolarWordsInfoView.prototype.GetVerticalWord = function(letter) {

	if (letter=='x')
		return ("00000");

	this.lttr = StringUtils.GetLetterIndex(letter);
	if (this.lttr>23)  //amend for words starting with 'y' or 'z'
		--this.lttr;
	this.wrd = this.Randomizer.GetIndex(this.FiveLetterWords[this.lttr].length);

	return (this.FiveLetterWords[this.lttr][this.wrd]);
};
SolarWordsInfoView.prototype.GetJoiningHorizontalWord = function(fLttr, mLttr, lLttr) {  //f- first, m- middle, l- last
	var i;
	var iWord, iWords;

	if (fLttr=='x' || fLttr=='0')
		return ("00000");

	iWords = StringUtils.GetLetterIndex(fLttr);
	if (iWords>23)  //amend for words starting with 'y' or 'z'
		--iWords;

	this.WordList.Reset();
	for (i=0;i<this.FiveLetterWords[iWords].length;++i)
		if ( this.FiveLetterWords[iWords][i][2]== mLttr && this.FiveLetterWords[iWords][i][4]== lLttr )
			this.WordList.Add(this.FiveLetterWords[iWords][i]);

	//Return "00000" if no match is found (list is empty)
	if (this.WordList.CheckEmpty())
		return ("00000");
	else {
		iWord = this.Randomizer.GetIndex(this.WordList.Length);
		return (this.WordList[iWord]);
	}
};
SolarWordsInfoView.prototype.SetGridCellColours = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		this.Cells[i].Colour = SOLArCOLOUR.COCKPIT.SKY;
};
SolarWordsInfoView.prototype.DisplayVowels = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i) {
		if (this.Cells[i].Solution=="")
			continue;
		if (VowelString.includes(this.Cells[i].Solution)) {
			this.Cells[i].SetColour(this.Specs.LIGHT.GREEN);
			this.Cells[i].SetLetter(this.Cells[i].Solution);
			this.Cells[i].Draw();
		}
	}
};
SolarWordsInfoView.prototype.UpdateGridKeyClick = function(key) {
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
			if (this.Cells[i].Solution==this.SelectedCell.Letter) {
				this.Cells[i].SetColour(this.Specs.LIGHT.GREEN);
				this.Cells[i].SetLetter(this.SelectedCell.Letter);
				this.Cells[i].Draw();
			}
		}

	//Check if solved
	if (this.CheckGridSolved()) {
		this.Congratulate();
		return;
	}
};
SolarWordsInfoView.prototype.CheckGridSolved = function() {
	var i;

	for (i=0;i<this.Specs.GRID.CELLS;++i)
		if (this.Cells[i].Letter!=this.Cells[i].Solution)
			return (false);

	return (true);
};
