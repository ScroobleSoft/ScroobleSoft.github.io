
//------------------------------------------------------
//---------- CROSSLE WORDS SELECTOR --------------------
var CrossleWordsSelector = function() {
	var Randomizer;
	var FiveSolutions, NineSolutions;
	var FiveLetterWords, NineLetterWords;
	var FiveDistribution, NineDistribution;
	var FiveLetterList, NineLetterList;
	var SolutionIndex;
	var DummyWord;

	var a, i, j, gaps, lttr, wrd, wrds;
};
CrossleWordsSelector.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.FiveSolutions = new Array(16);
		this.NineSolutions = new Array(4);
		this.ElevenSolutions = new Array(4);
		this.SetData();
	},
	SetData() {
      var i;

      //Words
		this.FiveLetterWords = [ Words5a, Words5b, Words5c, Words5d, Words5e, Words5f, Words5g, Words5h, Words5i, Words5j, Words5k, Words5l,
										 Words5m, Words5n, Words5o, Words5p, Words5q, Words5r, Words5s, Words5t, Words5u, Words5v, Words5w, Words5y ];
		this.FiveLetterList = new GenieList();
		this.FiveLetterList.Set(1000);				//NOTE: arbitray number, but reasonable maximum limit
		this.NineLetterWords = [ Words9a, Words9b, Words9c, Words9d, Words9e, Words9f, Words9g, Words9h, Words9i, Words9j, Words9k, Words9l, Words9m,
										 Words9n, Words9o, Words9p, Words9q, Words9r, Words9s, Words9t, Words9u, Words9v, Words9w, Words9y, Words9z ];

		//Distributions
		this.FiveDistribution = new Array(this.FiveLetterWords.length);
		for (i=0;i<this.FiveDistribution.length;++i)
			this.FiveDistribution[i] = this.FiveLetterWords[i].length;
		this.NineDistribution = new Array(this.NineLetterWords.length);
		for (i=0;i<this.NineDistribution.length;++i)
			this.NineDistribution[i] = this.NineLetterWords[i].length;

		this.DummyWord = "00000";
		this.a = "a";
	},
	Select() {
		var i;

		for (i=0;i<this.NineSolutions.length;++i)
			this.NineSolutions[i] = Solutions[this.SolutionIndex][i];
		for (i=0;i<this.FiveSolutions.length;++i)
			this.FiveSolutions[i] = Solutions[this.SolutionIndex][i+4];
	},
	Generate(dffclty) {
		var i;
		var gaps;

		do {
			this.PickNineLetterWords();
			this.PickFiveLetterWords();
			gaps = 0;
			for (i=0;i<this.FiveSolutions.length;++i)
				if (this.FiveSolutions[i]==this.DummyWord)
					++gaps;
		} while (gaps!=dffclty);
	},
	PickNineLetterWords() {
		var i;
		var iLetter, iWord;

		for (i=0;i<4;++i) {
			iLetter = this.Randomizer.GetSlot(this.NineDistribution);
			iWord = this.Randomizer.GetIndex(this.NineLetterWords[iLetter].length);
			this.NineSolutions[i] = this.NineLetterWords[iLetter][iWord];
		}
	},
	PickFiveLetterWords() {
		var i;

		for (i=0;i<4;++i) {
			this.FiveSolutions[i] = this.GetStartingVerticalWord(this.NineSolutions[0][(2*i)+1]);
			this.FiveSolutions[i+4] = this.GetEndingVerticalWord(this.NineSolutions[2][(2*i)+1]);
		}

		this.FiveSolutions[8] = this.GetJoiningHorizontalWord(this.NineSolutions[3][1], this.FiveSolutions[0][2], this.FiveSolutions[1][2]);
		this.FiveSolutions[9] = this.GetJoiningHorizontalWord(this.NineSolutions[3][3], this.FiveSolutions[0][4], this.FiveSolutions[1][4]);
		this.FiveSolutions[10] = this.GetJoiningHorizontalWord(this.FiveSolutions[2][2], this.FiveSolutions[3][2], this.NineSolutions[1][1]);
		this.FiveSolutions[11] = this.GetJoiningHorizontalWord(this.FiveSolutions[2][4], this.FiveSolutions[3][4], this.NineSolutions[1][3]);

		this.FiveSolutions[12] = this.GetJoiningHorizontalWord(this.NineSolutions[3][5], this.FiveSolutions[4][0], this.FiveSolutions[5][0]);
		this.FiveSolutions[13] = this.GetJoiningHorizontalWord(this.NineSolutions[3][7], this.FiveSolutions[4][2], this.FiveSolutions[5][2]);
		this.FiveSolutions[14] = this.GetJoiningHorizontalWord(this.FiveSolutions[6][0], this.FiveSolutions[7][0], this.NineSolutions[1][5]);
		this.FiveSolutions[15] = this.GetJoiningHorizontalWord(this.FiveSolutions[6][2], this.FiveSolutions[7][2], this.NineSolutions[1][7]);
	},
	GetEndingVerticalWord(lttr) {
		var i, j;
		var iWord;

		if (lttr=='q' || lttr=='j')
			return ("00000");

		this.FiveLetterList.Reset();
		for (i=0;i<this.FiveLetterWords.length;++i)
			for (j=0;j<this.FiveLetterWords[i].length;++j)
				if (this.FiveLetterWords[i][j][4]==lttr)
					this.FiveLetterList.Add(this.FiveLetterWords[i][j]);

		iWord = this.Randomizer.GetIndex(this.FiveLetterList.Length);

		return (this.FiveLetterList[iWord]);
	},
	GetStartingVerticalWord(lttr) {
		var iWord, iWords;

		if (lttr=='x' || lttr=='z')
			return ("00000");

		iWords = lttr.charCodeAt(0) - this.a.charCodeAt(0);
		if (iWords==24)  //amend for words starting with 'y'
			--iWords;
		iWord = this.Randomizer.GetIndex(this.FiveLetterWords[iWords].length);

		return (this.FiveLetterWords[iWords][iWord]);
	},
	GetJoiningHorizontalWord(fLttr, mLttr, lLttr) {  //f- first, m- middle, l- last
		var i;
		var iWord, iWords;

		if (fLttr=='x' || fLttr=='z')
			return ("00000");

		iWords = fLttr.charCodeAt(0) - this.a.charCodeAt(0);
		if (iWords==24)  //amend for words starting with 'y'
			--iWords;
		this.FiveLetterList.Reset();
		for (i=0;i<this.FiveLetterWords[iWords].length;++i)
			if ( this.FiveLetterWords[iWords][i][2]== mLttr && this.FiveLetterWords[iWords][i][4]== lLttr )
				this.FiveLetterList.Add(this.FiveLetterWords[iWords][i]);

		//Return "00000" if no match is found (list is empty)
		if (this.FiveLetterList.CheckEmpty())
			return (this.DummyWord);
		else {
			iWord = this.Randomizer.GetIndex(this.FiveLetterList.Length);
			return (this.FiveLetterList[iWord]);
		}
	},
	Mine() {
		//UNLOGGED
		var i;
		var gaps;

		this.MineNineLetterWords();
		do {
			this.PickFiveLetterWords();
			gaps = 0;
			for (i=0;i<this.FiveSolutions.length;++i)
				if (this.FiveSolutions[i]==this.DummyWord)
					++gaps;
		} while (gaps>2);
	},
	MineNineLetterWords() {
		//UNLOGGED
		var i;
		var iLetter, iWord;
		var word;

		function CheckWordInvalid(wrd) {
			//UNLOGGED
			if (wrd[1]=="j" || wrd[1]=="q" || wrd[1]=="u" || wrd[1]=="v" || wrd[1]=="x" || wrd[1]=="z")
				return (true);
			if (wrd[3]=="j" || wrd[3]=="q" || wrd[3]=="u" || wrd[3]=="v" || wrd[3]=="x" || wrd[3]=="z")
				return (true);
			if (wrd[5]=="j" || wrd[5]=="q" || wrd[5]=="u" || wrd[5]=="v" || wrd[5]=="x" || wrd[5]=="z")
				return (true);
			if (wrd[7]=="j" || wrd[7]=="q" || wrd[7]=="u" || wrd[7]=="v" || wrd[7]=="x" || wrd[7]=="z")
				return (true);

			return (false);
		}

		for (i=0;i<2;++i) {

			//Top and left words
			iLetter = this.Randomizer.GetSlot(this.NineDistribution);
			iWord = this.Randomizer.GetIndex(this.NineLetterWords[iLetter].length);
			if (i==0)
				this.NineSolutions[0] = this.NineLetterWords[iLetter][iWord];
			else
				this.NineSolutions[3] = this.NineLetterWords[iLetter][iWord];

			//Right and bottom words
			do {
				iLetter = this.Randomizer.GetSlot(this.NineDistribution);
				iWord = this.Randomizer.GetIndex(this.NineLetterWords[iLetter].length);
				word = this.NineLetterWords[iLetter][iWord];
			} while (CheckWordInvalid(word));
			if (i==0)
				this.NineSolutions[1] = word;
			else
				this.NineSolutions[2] = word;
		}
	}
};
