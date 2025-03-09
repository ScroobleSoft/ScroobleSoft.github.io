
//---------------------------------------------
//---------- LEXI KEYBOARD --------------------
var LexiKeyboard = function() {
	var App;
	var Specs;
	var Screen;
	var X, Y;
	var BackgroundColour;
	var Keys, ClickedKey, VowelKeys;
	var KeyButtonImages, KeyLetterImages, PressedLetterImages;

	var i;
};
LexiKeyboard.prototype = {
	Set(specs, cntxt) {
		this.Specs = specs;
		this.Screen = cntxt;
		this.SetImages();
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

		this.Keys = ArrayUtils.Create(this.Specs.KEY.COUNT, LexiKey);
		lttrs = "qwertyuiopasdfghjklzxcvbnm";
		for (i=0;i<this.Specs.KEY.COUNT;++i) {

			this.Keys[i].Set(this.Specs.KEY, this.Screen, lttrs[i], i, this.BackgroundColour, this);

			//Determine row
			if (i<this.Specs.ROWS[1])
				row = 0;
			else if (i<this.Specs.ROWS[2])
				row = 1;
			else
				row = 2;

			//Determine location
			x = this.X + this.Specs.OFFSETS[row] + ((this.Specs.KEY.W+this.Specs.KEY.GAP)*(i-this.Specs.ROWS[row]));
			y = this.Y + ((this.Specs.KEY.H+this.Specs.KEY.GAP)*row);
			this.Keys[i].SetLocation(x, y);
		}

		this.VowelKeys = [ 2,6,7,8,10 ];
	},
	SetApp(app) {

		this.App = app;
	},
	SetColour(colour) {

		this.BackgroundColour = colour;
	},
	SetLocation(x, y) {

		this.X = x;
		this.Y = y;
		this.SetKeys();
	},
	Update() {

		this.Keys.forEach(function(key) {key.Update();});
	},
/*
	UpdateKeys() {

		if (this.ClickedKey)
			this.ClickedKey.Update();
	},
*/
	Draw() {

		this.Keys.forEach(function(key){key.Draw();});
	},
/*
	UpdateClick() {

		for (this.i=0;this.i<this.Specs.KEY.COUNT;++this.i)
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
*/
	Reset() {

		this.Keys.forEach(function(key) { key.Reset(); });
		this.ClickedKey = null;
	}
};
