
//-----------------------------------------------------
//---------- TURTLE WORDS SELECTOR --------------------
var TurtleWordsSelector = function() {
	var Randomizer;
	var Turtle;
	var FiveSolutions, SixSolution, NineSolution;
	var WordsList;
	var Solutions, SolutionIndex;
	var DummyWord;

	var a;
};
TurtleWordsSelector.prototype = {
	Set(rGenerator, trtl) {
		this.Randomizer = rGenerator;
		this.Turtle = trtl;
		this.FiveSolutions = new Array(4);
		this.SetData();
	},
	SetData() {
      var i;

      //Lists
		this.WordsList = new GenieList();
		this.WordsList.Set(1000);				//NOTE: arbitray number, but reasonable maximum limit

//		this.Solutions = TurtleSolutions100.concat(TurtleSolutions200, TurtleSolutions300, TurtleSolutions400);
		this.Solutions = TurtleSolutions100;

		this.DummyWord = "00000";
		this.a = "a";
	},
	SelectDaily() {
		var i;
		var ms;
		var iSltn;

		ms = this.Turtle.DailyDate.getTime();
		iSltn = Math.floor((ms-this.Turtle.Specs.MILLISECONDS)/(24*60*60*1000));
		this.NineSolution = this.Solutions[iSltn][0];
		this.SixSolution = this.Solutions[iSltn][1];
		for (i=0;i<this.FiveSolutions.length;++i)
			this.FiveSolutions[i] = this.Solutions[iSltn][i+2];
	},
	SelectStash(iSltn) {
		var i;

		this.NineSolution = this.Solutions[iSltn][0];
		this.SixSolution = this.Solutions[iSltn][1];
		for (i=0;i<this.FiveSolutions.length;++i)
			this.FiveSolutions[i] = this.Solutions[iSltn][i+2];
	},
	Generate(dffclty) {
		var i;
		var gaps;
		var nTries;

		nTries = 0;
		do {
			this.PickNineLetterWord();
			this.PickSixLetterWord(this.NineSolution[4]);
			this.PickFiveLetterWords();
			gaps = 0;
			for (i=0;i<this.FiveSolutions.length;++i)
				if (this.FiveSolutions[i]==this.DummyWord)
					++gaps;
			++nTries;
		} while (gaps!=dffclty);
	},
	PickNineLetterWord() {
		var i;
		var iLetter, iWord;

		iLetter = this.Randomizer.GetSlot(NineDistribution);
		iWord = this.Randomizer.GetIndex(NineLetterWords[iLetter].length);
		this.NineSolution = NineLetterWords[iLetter][iWord];
	},
	PickSixLetterWord(lttr) {  //TODO: error check in case no words found
		var i, j;
		var iWord;

		this.WordsList.Reset();
		for (i=0;i<SixLetterWords.length;++i)
			for (j=0;j<SixLetterWords[i].length;++j)
				if (SixLetterWords[i][j][3]==lttr)
					this.WordsList.Add(SixLetterWords[i][j]);
		iWord = this.Randomizer.GetIndex(this.WordsList.Length);
		this.SixSolution = this.WordsList[iWord];
	},
	PickFiveLetterWords() {

		this.FiveSolutions[0] = this.GetHorizontalWord(this.SixSolution[1]);
		this.FiveSolutions[1] = this.GetHorizontalWord(this.SixSolution[5]);
		this.FiveSolutions[2] = this.GetVerticalWord(this.FiveSolutions[0][0], this.NineSolution[2], this.FiveSolutions[1][0]);
		this.FiveSolutions[3] = this.GetVerticalWord(this.FiveSolutions[0][4], this.NineSolution[6], this.FiveSolutions[1][4]);
	},
	GetHorizontalWord(lttr) {
		var i, j;
		var iWord;

		this.WordsList.Reset();
		for (i=0;i<FiveLetterWords.length;++i)
			for (j=0;j<FiveLetterWords[i].length;++j)
				if (FiveLetterWords[i][j][2]==lttr)
					this.WordsList.Add(FiveLetterWords[i][j]);
		iWord = this.Randomizer.GetIndex(this.WordsList.Length);

		return (this.WordsList[iWord]);
	},
	GetVerticalWord(fLttr, mLttr, lLttr) {  //f- first, m- middle, l- last
		var i;
		var iWord, iWords;

		if (fLttr=='x' || fLttr=='0')
			return ("00000");

		iWords = fLttr.charCodeAt(0) - this.a.charCodeAt(0);
		if (iWords>23)  //amend for words starting with 'y' or 'z'
			--iWords;
		this.WordsList.Reset();
		for (i=0;i<FiveLetterWords[iWords].length;++i)
			if (FiveLetterWords[iWords][i][2]== mLttr && FiveLetterWords[iWords][i][4]== lLttr)
				this.WordsList.Add(FiveLetterWords[iWords][i]);

		//Return "00000" if no match is found (list is empty)
		if (this.WordsList.CheckEmpty())
			return (this.DummyWord);
		else {
			iWord = this.Randomizer.GetIndex(this.WordsList.Length);
			return (this.WordsList[iWord]);
		}
	}
};
