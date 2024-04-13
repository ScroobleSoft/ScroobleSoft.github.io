
//--------------------------------------------------------
//---------- CRACKLE SUBMISSION FIELD --------------------
var CrackleSubmissionField = function() {
	var Screen;
	var Randomizer;
	var Specs, SectionSpecs;
	var LetterImages, SectionImage;
	var Word, WordLength;					//TODO: .WordLength is now spurious, and can be dispensed with
	var CurrentIndex;
	var Letters;
	var Hints, HintList;
	var X, Y, W, H;
};
CrackleSubmissionField.prototype = {
	Set(cntxt, rGenerator, specs) {
		this.Screen = cntxt;
		this.Randomizer = rGenerator;
		this.Specs = specs;
		this.CurrentIndex = 0;
		this.Hints = 0;
	},
	SetSectionSpecs(sSpecs) {

		this.SectionSpecs = sSpecs;
	},
	SetImages(sImage, lImages) {

		this.SectionImage = sImage;
		this.LetterImages = lImages;
	},
	SetWord(word) {

		this.Word = word;
		this.SetWordLength(this.Word.length);
		this.HintsArray = new Array(this.Word.length);
		this.Randomizer.Shuffle(this.HintsArray, INITIALIZE);
	},
	SetWordLength(wLength) {

		this.WordLength = wLength;
		this.Letters = new Array(this.WordLength);
		this.Letters.fill("");
		this.X = this.Specs.X - Math.round((this.WordLength-5)*(this.SectionSpecs.FRAME.W/2));
		this.Y = this.Specs.Y;
		this.W = (this.WordLength*(this.SectionSpecs.FRAME.W-2)) + 2;
		this.H = this.SectionSpecs.FRAME.H;
	},
	Draw() {  //frame and background
		var i, x;

		//Make background white
		this.Screen.clearRect(this.X, this.Y, this.WordLength*(this.SectionSpecs.FRAME.W-2), this.SectionSpecs.FRAME.H);

		//Draw frame
		for (i=0;i<this.WordLength;++i) {
			x = this.X + (i*(this.SectionSpecs.FRAME.W-2));
			this.SectionImage.Draw(x, this.Y);
		}

		//Colour current section
		this.Screen.fillStyle = this.Specs.COLOUR.SELECTION;
		x = this.X + (this.CurrentIndex*(this.SectionSpecs.FRAME.W-2)) + 2;
		this.Screen.fillRect(x, this.Y+2, this.SectionSpecs.W, this.SectionSpecs.H);
	},
	Update(iLetter) {
		var x, y;

		this.Letters[this.CurrentIndex] = Alphabet[iLetter];

		//Write letter
		x = this.X + (this.CurrentIndex*(this.SectionSpecs.FRAME.W-2));
		y = this.Y;
		this.Screen.clearRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);
		this.LetterImages.DrawPatchNumber(iLetter, x+10, y+6);

		//Shift section
		++this.CurrentIndex;
		if (this.CurrentIndex==this.WordLength)
			this.CurrentIndex = 0;
		this.SelectSection(this.CurrentIndex);
	},
	DisplayLetters() {
		var i;
		var x, y;

		for (i=0;i<this.WordLength;++i)
			if (this.Letters[i]) {
				x = this.X + (i*(this.SectionSpecs.FRAME.W-2));
				y = this.Y;
				this.Screen.clearRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);
				this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Letters[i]), x+10, y+6);
			}
	},
	SelectSection(iSctn) {
		var x;

		this.Screen.fillStyle = this.Specs.COLOUR.SELECTION;
		x = this.X + (iSctn*(this.SectionSpecs.FRAME.W-2));
		this.Screen.fillRect(x+2, this.Y+2, this.SectionSpecs.W, this.SectionSpecs.H);
		if (this.Letters[iSctn]!="")
			this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Letters[iSctn]), x+10, this.Y+6);
	},
	DeSelectSection(iSctn) {
		var x;

		x = this.X + (iSctn*(this.SectionSpecs.FRAME.W-2));
		this.Screen.clearRect(x+2, this.Y+2, this.SectionSpecs.W, this.SectionSpecs.H);
		if (this.Letters[iSctn]!="")
			this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Letters[iSctn]), x+10, this.Y+6);
	},
	UpdateClick() {
		var x;
		var iSection;

		iSection = Math.floor((Mouse.Click.X-this.X)/(this.SectionSpecs.FRAME.W-2));
		if (iSection!=this.CurrentIndex) {
			this.DeSelectSection(this.CurrentIndex);
			this.CurrentIndex = iSection;
			this.SelectSection(this.CurrentIndex);
		}
	},
	Erase() {

		this.Screen.fillStyle = this.Specs.COLOUR.BACKGROUND;
		this.Screen.fillRect(this.X, this.Y, (this.WordLength*(this.SectionSpecs.FRAME.W-2))+2, this.SectionSpecs.FRAME.H);
	},
	Clear() {

		this.CurrentIndex = 0;
		this.Letters.fill("");
		this.Draw();
	},
	CheckFilled() {

		return (!this.Letters.includes(""));
	},
	CheckPartiallyFilled() {
		var i;

		for (i=0;i<this.WordLength;++i)
			if (this.Letters[i]!="")
				return (true);

		return (false);
	},
	AddHint(word) {
		var x, y;
		var iSctn;

		iSctn = this.HintsArray[this.Hints];
		x = this.X + (iSctn*(this.SectionSpecs.FRAME.W-2));
		y = this.Y;
		this.Screen.clearRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);
		this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Word[iSctn]), x+10, y+6);
		setTimeout(this.ResetHint.bind(this, iSctn), 200);

		//Update hint index
		++this.Hints;
		if (this.Hints==this.Word.length) {  //Check if all hints have been shown, shuffle positions if so
			this.Hints = 0;
			this.Randomizer.Shuffle(this.HintsArray, INITIALIZE);
		}
	},
	ResetHint(iSection) {
		var x, y;

		//Erase or colour section
		x = this.X + (iSection*(this.SectionSpecs.FRAME.W-2));
		y = this.Y;
		if (this.CurrentIndex==iSection) {
			this.Screen.fillStyle = this.Specs.COLOUR.SELECTION;
			this.Screen.fillRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);
		} else
			this.Screen.clearRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);

		//Write letter if necessary
		if (this.Letters[iSection]!="")
			this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Letters[iSection]), x+10, y+6);
	}
};
