
//----------------------------------------
//---------- LEXI KEY --------------------
var LexiKey = function() {
	var Specs;
	var Context;
	var Index;
	var Keyboard;
	var BackgroundColour;
	var BoundingBox, Clicked;
	var Letter, LetterIndex;
	var State, Frames;
};
LexiKey.prototype = {
	Set(specs, cntxt, lttr, i, bColour, kBrd) {
		this.Specs = specs;
		this.Context = cntxt;
		this.Index = i;
		this.BackgroundColour = bColour;
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
		var x, y;

		this.Keyboard.KeyButtonImages.DrawPatchNumber(0, this.BoundingBox.L, this.BoundingBox.T);
		x = this.BoundingBox.L + this.Specs.O.UnPRESSED.X;
		y = this.BoundingBox.T + this.Specs.O.UnPRESSED.Y;
		this.Keyboard.KeyLetterImages.DrawPatchNumber(this.LetterIndex, x, y);
	},
	DrawPressed() {
		var x, y;

		//Background
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(this.BoundingBox.L, this.BoundingBox.T, this.Specs.W, this.Specs.H);

		this.Keyboard.KeyButtonImages.DrawPatchNumber(1, this.BoundingBox.L, this.BoundingBox.T);
		x = this.BoundingBox.L + this.Specs.O.PRESSED.X;
		y = this.BoundingBox.T + this.Specs.O.PRESSED.Y;
		this.Keyboard.PressedLetterImages.DrawPatchNumber(this.LetterIndex, x, y);
	},
	Update() {

		if (this.CheckClicked()) {
			this.Keyboard.App.Shell.SelectedCell.SetLetter(this.Letter);
			this.DrawPressed();
			setTimeout(this.Draw.bind(this), 60);
		}
	},
	CheckClicked() {

		return (SpaceUtils.CheckPointInBox(Mouse.Down, this.BoundingBox));
	},
	Click() {

		this.Clicked = true;

	},
	CheckClick() {

		if (this.Clicked) {
			this.Clicked = false;
			return (true);
		}
	},
	Press() {

		this.State = this.Specs.STATE.PRESSED;
		this.DrawPressed();
	},
	CheckPressed() {

		return (this.State==this.Specs.STATE.PRESSED);
	},
	Reset() {

		this.Draw();
		this.State = this.Specs.STATE.UnPRESSED;
	}
};
