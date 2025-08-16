
//--------------------------------------------
//---------- OFFICE GLOBE --------------------  UNLOGGED
var OfficeGlobe = function() {
	var Specs;
	var Pic;
};
OfficeGlobe.prototype = {
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
