
//------------------------------------------------
//---------- CROSSLE KEYBOARD --------------------
var CrossleKeyboard = function() {
	var Crossle, Board;
	var Specs;
	var Screen;
	var BackgroundColour;
	var Keys, ClickedKey;
	var KeyButtonImages, KeyLetterImages, PressedLetterImages;

	var i;
};
CrossleKeyboard.prototype = {
	Set(specs, cntxt, colour, brd, crsl) {
		this.Specs = specs;
		this.Screen = cntxt;
		this.BackgroundColour = colour;
		this.Board = brd;
		this.Crossle = crsl;
		this.SetImages();
		this.SetKeys();
	},
	SetImages() {

		this.KeyButtonImages = new GenieImage();
		this.KeyButtonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.BUTTONS);
		this.KeyLetterImages = new GenieImage();
		this.KeyLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.LETTERS);
		this.PressedLetterImages = new GenieImage();
		this.PressedLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.PRESSED);
	},
	SetKeys() {
		var i;
		var x, y;
		var row;
		var lttrs;

		this.Keys = ArrayUtils.Create(this.Specs.KEY.COUNT, CrossleKey);
		lttrs = "qwertyuiopasdfghjklzxcvbnm";
		for (i=0;i<this.Specs.KEY.COUNT;++i) {

			this.Keys[i].Set(this.Specs.KEY, lttrs[i], i, this);

			//Determine row
			if (i>=this.Specs.ROWS[0]) {
				if (i>=(this.Specs.ROWS[0]+this.Specs.ROWS[1]))
					row = 2;
				else
					row = 1;
			} else
				row = 0;

			//Determine location
			x = this.Specs.X + this.Specs.OFFSETS[row] + ((this.Specs.KEY.W+this.Specs.KEY.GAP)*(i % this.Specs.ROWS[row]));
			y = this.Specs.Y + ((this.Specs.KEY.H+this.Specs.KEY.GAP)*row);
			this.Keys[i].SetLocation(x, y);

			this.Keys[i].SetImages(this.KeyButtonImages, this.KeyLetterImages, this.PressedLetterImages);
		}
	},
	UpdateKeys() {

		if (this.ClickedKey)
			this.ClickedKey.Update();
	},
	Draw() {

		this.Keys.forEach(function(key){key.Draw();});
	},
	UpdateClick() {

		for (this.i=0;this.i<this.Specs.KEY.COUNT;++this.i)
//			if (this.Keys[this.i].State!=this.Specs.KEY.STATE.PRESSED)
			if (!this.Keys[this.i].CheckPressed())
				if (this.Keys[this.i].CheckClicked()) {
					if (this.ClickedKey) {  //process 'mouse down' events only for one key
						if (this.Keys[this.i]!==this.ClickedKey)
							return;
					} else
						this.ClickedKey = this.Keys[this.i];
					this.ClickedKey.Click();
					break;
				}
	},
	Reset() {

		this.Keys.forEach(function(key) { key.Reset(); });
		this.ClickedKey = null;
	}
};
