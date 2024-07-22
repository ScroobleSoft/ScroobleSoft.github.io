
//-------------------------------------------
//---------- SPINDLE KEY --------------------
var SpindleKey = function() {
	var Specs;
	var Index;
	var Keyboard;
	var BoundingBox, Clicked;
	var Letter, LetterIndex;
	var State, Frames;
};
SpindleKey.prototype = {
	Set(specs, lttr, i, kBrd) {
		this.Specs = specs;
		this.Index = i;
		this.Keyboard = kBrd;
		this.State = this.Specs.STATE.UnPRESSED;
		this.SetLetter(lttr);
	},
	SetLetter(lttr) {
		var a;

		a = "a";
		this.Letter = lttr;
		this.LetterIndex = this.Letter.charCodeAt(0) - a.charCodeAt(0);
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(x, y, this.Specs.W, this.Specs.H);
	},
	Draw() {

		this.Keyboard.KeyButtonImages.DrawPatchNumber(0, this.BoundingBox.L, this.BoundingBox.T);
		KeyLetterImages.DrawPatchNumber(this.LetterIndex, this.BoundingBox.L+this.Specs.LW+5, this.BoundingBox.T+this.Specs.LW+2);
	},
	DrawPressed() {

		this.Keyboard.KeyButtonImages.DrawPatchNumber(1, this.BoundingBox.L, this.BoundingBox.T);
		PressedLetterImages.DrawPatchNumber(this.LetterIndex, this.BoundingBox.L+this.Specs.LW+8, this.BoundingBox.T+this.Specs.LW+6);
	},
	Update() {

		switch (this.State) {
			case this.Specs.STATE.UnPRESSED:
				if (this.CheckClickRegistered()) {
					this.Keyboard.Ledger.SelectedCell.SetLetter(this.Letter);
					this.State = this.Specs.STATE.CLICKED;
					this.DrawPressed();
				}
				break;
			case this.Specs.STATE.CLICKED:
				if (this.Keyboard.Ledger.SelectedCell.Letter==this.Keyboard.Ledger.SelectedCell.Solution)
					this.State = this.Specs.STATE.PRESSED;
				else {
					setTimeout(this.Raise.bind(this), 60);
					this.Keyboard.ClickedKey = null;
				}
				break;
			case this.Specs.STATE.PRESSED:
				break;
		}
	},
	CheckClicked() {

		return (SpaceUtils.CheckPointInBox(Mouse.Down, this.BoundingBox));
	},
	RegisterClick() {

		this.Clicked = true;
	},
	CheckClickRegistered() {

		if (this.Clicked) {
			this.Clicked = false;
			return (true);
		}
	},
	Press() {

		this.State = this.Specs.STATE.PRESSED;
		this.DrawPressed();
	},
	CheckUnpressed() {

		return (this.State==this.Specs.STATE.UnPRESSED);
	},
	Raise() {

		this.State = this.Specs.STATE.UnPRESSED;
		this.Draw();
	},
	Reset() {

		this.State = this.Specs.STATE.UnPRESSED;
		this.Draw();
	}
};
