
//-------------------------------------------------
//---------- OFFICE CALCULATOR --------------------  UNLOGGED
var OfficeCalculator = function() {
	var Specs;
	var Pic;
};
OfficeCalculator.prototype = {
	Set(specs, pic) {
		this.Specs = specs;
		this.Pic = pic;
	},
	Draw() {

		if (Game.CheckMobile())
			this.Pic.Draw(this.Specs.MOBILE.X, this.Specs.MOBILE.Y);
		else
			this.Pic.Draw(this.Specs.X, this.Specs.Y);
	}
};
