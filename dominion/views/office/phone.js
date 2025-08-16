
//--------------------------------------------
//---------- OFFICE PHONE --------------------  UNLOGGED
var OfficePhone = function() {
	var Specs;
	var Pic;
};
OfficePhone.prototype = {
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
