
//-------------------------------------------------
//---------- SLIDING DOT TIMER --------------------
var SlidingDotTimer = function() {
	var Specs;
	var Pic, DotPic;
	var DotIndex;
	var Frames;
};
SlidingDotTimer.prototype = {
	Set(specs, pic) {
		this.Specs = specs;
		this.Pic = pic;
		this.DotIndex = 0;
		this.Frames = this.Specs.F;
	},
	SetDotImage(dPic) {

		this.DotPic = dPic;
	},
	Reset() {

		this.Frames = this.Specs.F;
		this.DotIndex = 0;
		this.Pic.Context.fillStyle = this.Specs.BACKGROUND;
		this.Pic.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.IMAGE.W, this.Specs.IMAGE.H);
		this.Draw();
	},
	Draw() {
		var i;

		this.Pic.Draw(this.Specs.L, this.Specs.T);

		for (i=0;i<this.Specs.DOT.COUNT;++i)
			this.DotPic.DrawPatchNumber(0, this.Specs.DOT.L+(i*this.Specs.DOT.GAP), this.Specs.DOT.T);
	},
	Update() {

		--this.Frames;
		if (!this.Frames) {
			if (this.DotIndex==this.Specs.DOT.COUNT)
				this.Reset();
			else {
				this.DotPic.DrawPatchNumber(1, this.Specs.DOT.L+(this.DotIndex*this.Specs.DOT.GAP), this.Specs.DOT.T);
				++this.DotIndex;
			}
			this.Frames = this.Specs.F;
		}
	}
};
