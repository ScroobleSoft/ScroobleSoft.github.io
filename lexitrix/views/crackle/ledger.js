
//---------------------------------------------------
//---------- CRACKLE WORD LEDGER --------------------
var CrackleWordLedger = function() {
	var Screen;
	var Specs, SectionSpecs;
	var SectionImage, LetterImages;
	var Entries, EntryIndex;
	var Word;
	var X, Y;
};
CrackleWordLedger.prototype = {
	Set(cntxt, specs) {
		this.Screen = cntxt;
		this.Specs = specs;
		this.EntryIndex = 0;
		this.Entries = new Array();
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
		this.X = this.Specs.X - Math.round((this.Word.length-5)*(this.SectionSpecs.FRAME.W/2));
		this.Y = this.Specs.Y;
	},
	Draw() {  //Frame and background
		var i, j;
		var x, y;

		this.Screen.fillStyle = this.SectionSpecs.COLOUR;
		this.Screen.fillRect(this.X, this.Y, this.Word.length*(this.SectionSpecs.FRAME.W-2), this.Word.length*(this.SectionSpecs.FRAME.H-2));
		for (i=0;i<this.Word.length;++i)
			for (j=0;j<this.Word.length;++j) {
				x = this.X + (j*(this.SectionSpecs.W+2));
				y = this.Y + (i*(this.SectionSpecs.H+2));
				this.SectionImage.Draw(x, y);
			}
	},
	DrawEntry(iEntry) {
		var i;
		var x, y;

		for (i=0;i<this.Word.length;++i) {

			//Coords
			x = this.X + (i*(this.SectionSpecs.FRAME.W-2));
			y = this.Y + (iEntry*(this.SectionSpecs.FRAME.W-2));
			if (this.Entries.length>this.Word.length)
				 y -= (this.Entries.length-this.Word.length)*(this.SectionSpecs.FRAME.W-2);

			//Section colour
			if (this.Entries[iEntry][i]==this.Word[i])
				this.Screen.fillStyle = this.Specs.COLOUR.CORRECT;
			else if (this.Word.includes(this.Entries[iEntry][i]))
				this.Screen.fillStyle = this.Specs.COLOUR.CLOSE;
			else
				this.Screen.fillStyle = this.Specs.COLOUR.WRONG;
			this.Screen.fillRect(x+2, y+2, this.SectionSpecs.W, this.SectionSpecs.H);

			//Letter
			this.LetterImages.DrawPatchNumber(Alphabet.indexOf(this.Entries[iEntry][i]), x+10, y+6);
		}
	},
	DrawEntries() {
		var i;

		if (this.Entries.length>this.Word.length)
			for (i=this.Word.length;i>0;--i)
				this.DrawEntry(this.Entries.length-i);
		else
			for (i=0;i<this.Entries.length;++i)
				this.DrawEntry(i);
	},
	Update(letters) {
		var i;
		var aLetters;

		aLetters = new Array(this.Word.length);
		for (i=0;i<this.Word.length;++i)
			aLetters[i] = letters[i];
		this.Entries.push(aLetters);
		this.DrawEntries();
	},
	Clear() {

		this.EntryIndex = 0;
		this.Entries.length = 0;
		this.Screen.fillStyle = this.Specs.COLOUR.BACKGROUND;
		if (this.Word)
			this.Screen.fillRect(this.X, this.Y, this.Word.length*this.SectionSpecs.FRAME.W, this.Word.length*this.SectionSpecs.FRAME.H);
	}
};
