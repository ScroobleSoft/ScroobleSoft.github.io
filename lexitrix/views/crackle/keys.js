
//------------------------------------------------------
//---------- CRACKLE INPUT KEYBOARD --------------------
var CrackleInputKeyboard = function() {
	var Screen;
	var Specs;
	var SubmissionBox;
	var KeyButtonImages, KeyLetterImages;
	var KeyRows;
	var KeyBox;
	var KeyIndex;
	var SuspendedFlag;
};
CrackleInputKeyboard.prototype = {
	Set(cntxt, specs) {
		this.Screen = cntxt;
		this.Specs = specs;
		this.KeyRows = [ "qwertyuiop", "asdfghjkl", "zxcvbnm" ];
		this.KeyBox = new GenieRect();
		this.SetImages();
	},
	SetLinks(sBox) {

		this.SubmissionBox = sBox;
	},
	SetImages(pKeys, pLetters) {

		this.KeyButtonImages = pKeys;
		this.KeyLetterImages = pLetters;
	},
	Draw() {
		var i, j;

		for (i=0;i<this.Specs.ROWS;++i)
			for (j=0;j<this.KeyRows[i].length;++j)
				this.DrawKey(i, j, !PRESSED);
	},
	DrawKey(row, col, bPressed) {
		var x, y;
		var iLetter;

		x = this.Specs.X + ((this.Specs.KEY.W/2)*row) + (this.Specs.KEY.W*col);
		y = this.Specs.Y + (this.Specs.KEY.H*row);
		iLetter = Alphabet.indexOf(this.KeyRows[row][col]);
		if (bPressed) {
			this.KeyButtonImages.DrawPatchNumber(1, x, y);
			this.KeyLetterImages.DrawPatchNumber(iLetter, x+9, y+7);
		} else {
			this.KeyButtonImages.DrawPatchNumber(0, x, y);
			this.KeyLetterImages.DrawPatchNumber(iLetter, x+8, y+6);
		}
	},
	UpdateClick() {
		var i;
		var l, t, w;

		if (this.SuspendedFlag)
			return;

		for (i=0;i<this.Specs.ROWS;++i) {
			l = this.Specs.X + ((this.Specs.KEY.W/2)*i);
			t = this.Specs.Y + (this.Specs.KEY.H*i);
			w = this.KeyRows[i].length * this.Specs.KEY.W;
			this.KeyBox.Set(l, t, w, this.Specs.KEY.H);
			if (SpaceUtils.CheckPointInBox(Mouse.Click, this.KeyBox)) {
				this.KeyIndex = Math.floor((Mouse.Click.X-l)/this.Specs.KEY.W);
				this.DrawKey(i, this.KeyIndex, PRESSED);
				setTimeout(this.DrawKey.bind(this, i, this.KeyIndex, !PRESSED), 100);
				this.SubmissionBox.Update(Alphabet.indexOf(this.KeyRows[i][this.KeyIndex]));
				return;
			}
		}
	},
	Suspend() {
		
		this.SuspendedFlag = true;
	},
	Activate() {
		
		this.SuspendedFlag = false;
	}
};
