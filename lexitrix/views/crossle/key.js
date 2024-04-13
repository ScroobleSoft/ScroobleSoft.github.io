
//-------------------------------------------
//---------- CROSSLE KEY --------------------
var CrossleKey = function() {
	var Specs;
	var Index;
	var Keyboard;
	var BoundingBox, Clicked;
	var Letter, LetterIndex;
	var State, Frames;
	var ButtonImages, LetterImages, PressedImages;
};
CrossleKey.prototype = {
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
	SetImages(iBtn, iLttr, iPrssd) {

		this.ButtonImages = iBtn;
		this.LetterImages = iLttr;
		this.PressedImages = iPrssd;
	},
	SetLocation(x, y) {

		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(x, y, this.Specs.W, this.Specs.H);
	},
	Draw() {

		this.ButtonImages.DrawPatchNumber(0, this.BoundingBox.L, this.BoundingBox.T);
		this.LetterImages.DrawPatchNumber(this.LetterIndex, this.BoundingBox.L+this.Specs.LW+5, this.BoundingBox.T+this.Specs.LW+2);
	},
	DrawPressed() {

		this.ButtonImages.DrawPatchNumber(1, this.BoundingBox.L, this.BoundingBox.T);
		this.PressedImages.DrawPatchNumber(this.LetterIndex, this.BoundingBox.L+this.Specs.LW+8, this.BoundingBox.T+this.Specs.LW+6);
	},
	Update() {

		switch (this.State) {
			case this.Specs.STATE.UnPRESSED:
				if (this.CheckClick()) {
					this.Keyboard.Board.SelectedCell.PlaceLetter(this.Letter);
					this.State = this.Specs.STATE.CLICKED;
					this.Frames = 60;
					this.DrawPressed();
					setTimeout(this.Draw.bind(this), 60);
				}
				break;
			case this.Specs.STATE.CLICKED:
				if (this.CheckClick()) {
					this.Keyboard.Board.SelectedCell.Clear();
					this.State = this.Specs.STATE.DOUBLeCLICKED;
				} else {
					--this.Frames;
					if (!this.Frames)
						this.State = this.Specs.STATE.SINGLeCLICKED;
				}
				break;
			case this.Specs.STATE.SINGLeCLICKED:
				if (this.Keyboard.Board.SelectedCell.Solution==this.Letter) {
					this.Keyboard.Board.FillLetter(this.Letter);
					this.Press();
				} else {
					this.Keyboard.Board.SelectedCell.SetLetter(this.Letter);
					this.Keyboard.Crossle.IncrementLetterCount();
					this.State = this.Specs.STATE.UnPRESSED;
				}
				this.Keyboard.ClickedKey = null;
				break;
			case this.Specs.STATE.DOUBLeCLICKED:
				this.Keyboard.Board.FillLetter(this.Letter);
				this.Keyboard.Crossle.IncrementKeyCount();
				this.Keyboard.ClickedKey = null;
				this.Press();
				break;
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
