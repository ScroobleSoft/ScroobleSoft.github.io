
//-----------------------------------------------------
//---------- FIDDLE WORDS SELECTOR --------------------
var FiddleWordsSelector = function() {
	var Randomizer;
	var Fiddle;
	var FiddleWords;
	var Grids;
	var WordList;
	var Solutions, SolutionIndex, StashIndices;
	var DummyWord, Errors;

	var lttr, wrd;
};
FiddleWordsSelector.prototype = {
	Set(rGenerator, fddl) {
		this.Randomizer = rGenerator;
		this.Fiddle = fddl;
		this.SelectedWords = new Array(6);
		this.SetData();
		this.DummyWord = "00000";
		this.Errors = 0;
	},
	SetData() {
		var i;

		//Words
		this.FiddleWords = new Array(FiveLetterWords.length);
		for (i=0;i<this.FiddleWords.length;++i)
			this.FiddleWords[i] = FiveLetterWords[i].concat(SupplementaryWords5a[i]);

		this.Solutions = FiddleSolutions100.concat(FiddleSolutions200, FiddleSolutions300, FiddleSolutions400, FiddleSolutions500, FiddleSolutions600);
		this.SetStashIndices();

		//Lists
		this.WordList = new GenieList();
		this.WordList.Set(1000);				//NOTE: arbitray number, but reasonable maximum limit

		this.Grids = ArrayUtils.Create2D(4,6);
	},
	SetStashIndices() {
		var i, j;
		var aIndcs;

		this.StashIndices = ArrayUtils.Create2D(1000, 4);

		//Set linear indices
		for (k=0;k<4;++k)
			for (i=0;i<25;++i)
				for (j=0;j<4;++j) {
					this.StashIndices[i+(25*k)][j] = (4*i) + j + k;
					if (this.StashIndices[i+(25*k)][j]>=100)					//TODO: adjust here
						this.StashIndices[i+(25*k)][j] -= 100;					//TODO: adjust here
				}
	},
	Generate(iSqr) {
		var nTries;

		nTries = 0;
		do {
			this.Errors = 0;
			this.SelectSquareWords(iSqr);
			++nTries;
			if (nTries==100)
				break;
		} while (this.Errors);
	},
	SelectDaily() {
		var i;
		var ms;

		ms = this.Fiddle.DailyDate.getTime();
		this.SolutionIndex = Math.floor((ms-this.Fiddle.Specs.MILLISECONDS)/(24*60*60*1000)) % this.Solutions.length;
		for (i=0;i<this.Fiddle.Specs.BOARD.SQUARES;++i)
			this.Grids[i] = this.Solutions[(4*this.SolutionIndex)+i];
	},
	SelectStash(iStsh) {
		var i;

		for (i=0;i<this.Fiddle.Specs.BOARD.SQUARES;++i)
			this.Grids[i] = this.Solutions[this.StashIndices[iStsh][i]];
	},
	SelectRandom() {
		var i;
		var num;

		for (i=0;i<this.Fiddle.Specs.BOARD.SQUARES;++i) {
			this.Generate(i);
			if (this.Errors) {  //if a set of words couldn't be generated, pick one from pre-existing stash
				num = this.Randomizer.GetIndex(this.Solutions.length);
				this.Grids[i] = this.Solutions[num];
			}
		}
	},
	SelectSquareWords(iGrd) {  //TODO: duplicates still an issue

		this.lttr = this.Randomizer.GetSlot(FiveDistribution);
		this.wrd = this.Randomizer.GetIndex(FiveLetterWords[this.lttr].length);
		this.Grids[iGrd][0] = FiveLetterWords[this.lttr][this.wrd];
		this.lttr = StringUtils.GetLetterIndex(this.Grids[iGrd][0][0]);
		if (this.lttr>23)  //amend for words starting with 'y' or 'z'
			--this.lttr;
		this.wrd = this.Randomizer.GetIndex(FiveLetterWords[this.lttr].length);
		this.Grids[iGrd][1] = FiveLetterWords[this.lttr][this.wrd];
		this.lttr = StringUtils.GetLetterIndex(this.Grids[iGrd][0][2]);
		if (this.lttr>23)
			--this.lttr;
		this.wrd = this.Randomizer.GetIndex(FiveLetterWords[this.lttr].length);
		this.Grids[iGrd][2] = FiveLetterWords[this.lttr][this.wrd];
		this.lttr = StringUtils.GetLetterIndex(this.Grids[iGrd][0][4]);
		if (this.lttr>23)
			--this.lttr;
		this.wrd = this.Randomizer.GetIndex(FiveLetterWords[this.lttr].length);
		this.Grids[iGrd][3] = FiveLetterWords[this.lttr][this.wrd];
		this.Grids[iGrd][4] = this.GetJoiningHorizontalWord(this.Grids[iGrd][1][2], this.Grids[iGrd][2][2], this.Grids[iGrd][3][2]);
		if (this.Grids[iGrd][4]==this.DummyWord)
			++this.Errors;
		this.Grids[iGrd][5] = this.GetJoiningHorizontalWord(this.Grids[iGrd][1][4], this.Grids[iGrd][2][4], this.Grids[iGrd][3][4]);
		if (this.Grids[iGrd][5]==this.DummyWord)
			++this.Errors;
	},
	GetJoiningHorizontalWord(fLttr, mLttr, lLttr) {  //f- first, m- middle, l- last
		var i;
		var iWord, iWords;

		if (fLttr=='x' || fLttr=='0')
			return (this.DummyWord);

		iWords = StringUtils.GetLetterIndex(fLttr);
		if (iWords>23)  //amend for words starting with 'y' or 'z'
			--iWords;
		this.WordList.Reset();
		for (i=0;i<this.FiddleWords[iWords].length;++i)
			if ( this.FiddleWords[iWords][i][2]== mLttr && this.FiddleWords[iWords][i][4]== lLttr )
				this.WordList.Add(this.FiddleWords[iWords][i]);

		//Return "00000" if no match is found (list is empty)
		if (this.WordList.CheckEmpty())
			return (this.DummyWord);
		else {
			iWord = this.Randomizer.GetIndex(this.WordList.Length);
			return (this.WordList[iWord]);
		}
	}
};
