
//------------------------------------------------------
//---------- SPINDLE WORDS SELECTOR --------------------
var SpindleWordsSelector = function() {
	var Randomizer;
	var Spindle;
	var LeftLedgerEntries, SpineWord, RightLedgerEntries;
	var FiveLetterWords, SevenLetterWords, NineLetterWords;
	var SevenDistribution, NineDistribution;
	var FiveLetterList;
	var WordIndex;
	var MinuteSeed;

	var a;
};
SpindleWordsSelector.prototype = {
	Set(rGenerator, spndl) {
		this.Randomizer = rGenerator;
		this.Spindle = spndl;
		this.LeftLedgerEntries = new Array(11);
		this.RightLedgerEntries = new Array(11);
		this.SetData();
	},
	SetData() {
      var i;

      //Words
		this.FiveLetterWords = [ Words5a, Words5b, Words5c, Words5d, Words5e, Words5f, Words5g, Words5h, Words5i, Words5j, Words5k, Words5l, Words5m,
										 Words5n, Words5o, Words5p, Words5q, Words5r, Words5s, Words5t, Words5u, Words5v, Words5w, Words5y, Words5z ];
		this.FiveLetterList = new GenieList();
		this.FiveLetterList.Set(1000);				//NOTE: arbitray number, but reasonable maximum limit
		this.SevenLetterWords = [ Words7a, Words7b, Words7c, Words7d, Words7e, Words7f, Words7g, Words7h, Words7i, Words7j, Words7k, Words7l, Words7m,
										  Words7n, Words7o, Words7p, Words7q, Words7r, Words7s, Words7t, Words7u, Words7v, Words7w, Words7y, Words7z ];
		this.NineLetterWords = [ Words9a, Words9b, Words9c, Words9d, Words9e, Words9f, Words9g, Words9h, Words9i, Words9j, Words9k, Words9l, Words9m,
										 Words9n, Words9o, Words9p, Words9q, Words9r, Words9s, Words9t, Words9u, Words9v, Words9w, Words9y, Words9z ];

		//Distributions
		this.SevenDistribution = new Array(this.SevenLetterWords.length);
		for (i=0;i<this.SevenDistribution.length;++i)
			this.SevenDistribution[i] = this.SevenLetterWords[i].length;
		this.NineDistribution = new Array(this.NineLetterWords.length);
		for (i=0;i<this.NineDistribution.length;++i)
			this.NineDistribution[i] = this.NineLetterWords[i].length;

		this.a = "a";
	},
	SelectWords(num) {
		var i;

		this.SelectSpineWord();
		this.LeftLedgerEntries = new Array(this.SpineWord.length);
		this.RightLedgerEntries = new Array(this.SpineWord.length);
		if (this.Spindle.GameType==this.Spindle.Specs.TYPE.MINUTE) {
			this.Randomizer.SaveSeeds();
			this.Randomizer.SetSeeds(this.MinuteSeed, this.MinuteSeed+1);
			for (i=0;i<this.SpineWord.length;++i) {
				this.LeftLedgerEntries[i] = this.GetEndingWord(this.SpineWord[i]);
				this.RightLedgerEntries[i] = this.GetStartingWord(this.SpineWord[i]);
			}
			this.Randomizer.RestoreSeeds();
		} else
			for (i=0;i<this.SpineWord.length;++i) {
				this.LeftLedgerEntries[i] = this.GetEndingWord(this.SpineWord[i]);
				this.RightLedgerEntries[i] = this.GetStartingWord(this.SpineWord[i]);
			}

		this.Spindle.Ledger.SetSolution();
	},
	SelectSpineWord() {
		var ms;
		var seed;

		switch (this.Spindle.GameType) {
			case this.Spindle.Specs.TYPE.DAILY:
				this.Spindle.DailyDate = new Date();
				ms = this.Spindle.DailyDate.getTime();
				this.WordIndex = Math.floor((ms-this.Spindle.Specs.MILLISECONDS)/(24*60*60*1000));
				this.SpineWord = SpindleWords[this.WordIndex];
				break;
			case this.Spindle.Specs.TYPE.ELEVEN:
				this.SpineWord = Words11[this.Randomizer.GetIndex(Words11.length)];
				break;
			case this.Spindle.Specs.TYPE.NINE:
				this.SpineWord = this.SelectCentralWord(this.NineDistribution, this.NineLetterWords);
				break;
			case this.Spindle.Specs.TYPE.SEVEN:
				this.SpineWord = this.SelectCentralWord(this.SevenDistribution, this.SevenLetterWords);
				break;
			case this.Spindle.Specs.TYPE.MINUTE:
				this.Spindle.DailyDate = new Date();
				ms = this.Spindle.DailyDate.getTime();
				this.MinuteSeed = Math.floor((ms-this.Spindle.Specs.MILLISECONDS)/(60*1000));
				this.Randomizer.SaveSeeds();
				this.Randomizer.SetSeeds(this.MinuteSeed, this.MinuteSeed+1);
				this.SpineWord = Words11[this.Randomizer.GetIndex(Words11.length)];
				this.Randomizer.RestoreSeeds();
				break;
		}
	},
	SelectCentralWord(aDstrbtn, aWrds) {
		var iLttr, iWord;

		iLttr = this.Randomizer.GetSlot(aDstrbtn);
		iWrd = this.Randomizer.GetIndex(aWrds[iLttr].length);

		return (aWrds[iLttr][iWrd]);
	},
	GetEndingWord(lttr) {
		var i, j;
		var iWrd;

		this.FiveLetterList.Reset();
		for (i=0;i<this.FiveLetterWords.length;++i)
			for (j=0;j<this.FiveLetterWords[i].length;++j)
				if (this.FiveLetterWords[i][j][4]==lttr)
					this.FiveLetterList.Add(this.FiveLetterWords[i][j]);

		iWrd = this.Randomizer.GetIndex(this.FiveLetterList.Length);

		return (this.FiveLetterList[iWrd]);
	},
	GetStartingWord(lttr) {
		var iLttr, iWrd;

		iLttr = lttr.charCodeAt(0) - this.a.charCodeAt(0);
		if (iLttr>23)  //amend for words starting with 'y' or 'z'
			--iLttr;
		iWrd = this.Randomizer.GetIndex(this.FiveLetterWords[iLttr].length);

		return (this.FiveLetterWords[iLttr][iWrd]);
	}
};
