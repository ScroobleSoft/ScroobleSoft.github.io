
//------------------------------------------------
//---------- SPINDLE KEYBOARD --------------------
var SpindleKeyboard = function() {
	var Spindle, Ledger;
	var Specs;
	var Screen;
	var Keys, ClickedKey, VowelKeys;
	var KeyButtonImages;

	var i;
};
SpindleKeyboard.prototype = {
	Set(specs, cntxt, ldgr, spndl) {
		this.Specs = specs;
		this.Screen = cntxt;
		this.Ledger = ldgr;
		this.Spindle = spndl;
		this.SetImages();
		this.SetKeys();
	},
	SetImages() {

		this.KeyButtonImages = new GenieImage();
		this.KeyButtonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.KEY.BUTTONS);
	},
	SetKeys() {
		var i;
		var c, r;
		var x, y;
		var row;
		var lttrs;
		var iKys;

		//Properties
		this.Keys = ArrayUtils.Create(this.Specs.KEY.COUNT, SpindleKey);
		lttrs = "aeioubcdfghjklmnpqrstvwxyz";
		for (i=0;i<this.Specs.KEY.COUNT;++i)
			this.Keys[i].Set(this.Specs.KEY, lttrs[i], i, this);

		//Locations
		iKys = 0;
		for (c=0;c<this.Specs.ROW.TOP.KEYS;++c) {
			x = this.Specs.ROW.TOP.X + ((this.Specs.KEY.W+this.Specs.KEY.O.X)*c);
			this.Keys[iKys].SetLocation(x, this.Specs.ROW.TOP.Y);
			++iKys;
		}

		for (r=0;r<this.Specs.ROW.LOWER.COUNT;++r) {
			for (c=0;c<this.Specs.ROW.LOWER.KEYS;++c) {
				x = this.Specs.ROW.LOWER.X + ((this.Specs.KEY.W+this.Specs.KEY.O.X)*c);
				y = this.Specs.ROW.LOWER.Y + ((this.Specs.KEY.H+this.Specs.KEY.O.Y)*r);
				this.Keys[iKys].SetLocation(x, y);
				++iKys;
			}
		}

		this.VowelKeys = [ 0,1,2,3,4 ];
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
			if (this.Keys[this.i].CheckUnpressed())
				if (this.Keys[this.i].CheckClicked()) {
					this.ClickedKey = this.Keys[this.i];
					this.ClickedKey.RegisterClick();
				}
	},
	PressVowelKeys() {
		var i;

		for (i=0;i<this.VowelKeys.length;++i)
			this.Keys[this.VowelKeys[i]].Press();
	},
	RaiseVowelKeys() {
		var i;

		for (i=0;i<this.VowelKeys.length;++i)
			this.Keys[this.VowelKeys[i]].Raise();
	},
	Reset() {

		this.Keys.forEach(function(key) { key.Reset(); });
		this.ClickedKey = null;
	}
};
