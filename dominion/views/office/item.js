
//-------------------------------------------
//---------- OFFICE ITEM --------------------
var OfficeItem = function() {
	var Specs;
	var Pic;
};
OfficeItem.prototype = {
	Set(specs, pic) {
		this.Specs = specs;
		this.Pic = pic;
		this.SetPlatform();
	},
	SetPlatform() {

		if (Game.CheckMobile()) {
			if (this.Specs.MOBILE) {
				if (this.Specs.X) {
					this.Specs.X = this.Specs.MOBILE.X;
					this.Specs.Y = this.Specs.MOBILE.Y;
				} else {
					this.Specs.L = this.Specs.MOBILE.L;
					this.Specs.T = this.Specs.MOBILE.T;
				}
			}
		}
	},
	Draw() {

		if (this.Specs.X)
			this.Pic.Draw(this.Specs.X, this.Specs.Y);
		else
			this.Pic.Draw(this.Specs.L, this.Specs.T);
	},
	CheckClicked() {

		return (CheckPointInBox(Mouse.Click, this.Specs));
	}
};
