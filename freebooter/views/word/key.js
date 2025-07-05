
//----------------------------------------------
//---------- SOLAR WORD KEY --------------------
var SolarWordKey = function() {
	var Specs;
	var Index;
	var BoundingBox, Clicked;
	var Letter;
};
SolarWordKey.prototype = {
	Set(specs, indx) {
		this.Specs = specs;
		this.Index = indx;
		this.SetLetter();
	},
	SetLetter() {
		var a;

		this.Letter = Alphabet[this.Index];
		this.SetLocation();
	},
	SetLocation() {
		var c, r;

		c = this.Index % this.Specs.C;
		r = Math.floor(this.Index/this.Specs.C);
		this.BoundingBox = new GenieRect();
		this.BoundingBox.Set(this.Specs.W*c, this.Specs.H*r, this.Specs.W, this.Specs.H);
	},
	CheckClicked() {

		return (SpaceUtils.CheckPointInBox(Mouse.Down, this.BoundingBox));
	}
};
