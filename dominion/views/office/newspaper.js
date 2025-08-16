
//--------------------------------------------------
//---------- OFFICE PAPER STASH --------------------
var OfficePaperStash = function() {
	var Specs;
	var Pic;
};
OfficePaperStash.prototype = {
	Set(specs, pic) {
		this.Specs = specs;
		this.Pic = pic;
	},
	Draw() {  //UNLOGGED

		if (Game.CheckMobile())
			this.Pic.Draw(this.Specs.MOBILE.X, this.Specs.MOBILE.Y);
		else
			this.Pic.Draw(this.Specs.X, this.Specs.Y);
	}
};
