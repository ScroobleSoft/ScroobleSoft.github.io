
//---------------------------------------------
//---------- OFFICE LAPTOP --------------------
var OfficeLaptop = function() {
	var Specs;
	var Pic;
};
OfficeLaptop.prototype = {
	Set(specs, pic) {
		this.Specs = specs;
		this.Pic = pic;
	},
	Draw() {  //UNLOGGED - screen might pop up, or still display things if not

		if (Game.CheckMobile())
			this.Pic.Draw(this.Specs.MOBILE.X, this.Specs.MOBILE.Y);
		else
			this.Pic.Draw(this.Specs.X, this.Specs.Y);
	}
};
