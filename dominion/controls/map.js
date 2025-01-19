/*
	TODO: more options - cities/provinces rather than large solid octagons, continents, octants
*/
//-----------------------------------------------------
//---------- DOMINION MAP CONTROLS --------------------
var DominionMapControls = function() {
	var Slots;
	var SelectedOption;
	var OptionClicked;
};
DominionMapControls.prototype = new GenieControl();
DominionMapControls.prototype.Set = function(cnvs, specs, pic) {
	GenieControl.prototype.Set.call(this, cnvs, specs, pic);

	this.SelectedOption = this.Specs.OPTION;
	this.SetSlots();
};
DominionMapControls.prototype.SetSlots = function() {
	var w, h;

	this.Slots = ArrayUtils.Create(this.Specs.OPTIONS, GenieRect);

	this.Slots[0].L = this.Specs.L;
	this.Slots[0].T = this.Specs.T;
	this.Slots[1].L = this.Specs.L + SCREEN.WIDTH - this.Pic.Specs.PATCH.W;
	this.Slots[1].T = this.Specs.T;
	this.Slots[2].L = this.Specs.L + SCREEN.WIDTH - this.Pic.Specs.PATCH.W;
	this.Slots[2].T = this.Specs.T + SCREEN.HEIGHT - this.Pic.Specs.PATCH.H;
	this.Slots[3].L = this.Specs.L;
	this.Slots[3].T = this.Specs.T + SCREEN.HEIGHT - this.Pic.Specs.PATCH.H;

	for (this.i=0;this.i<this.Slots.length;++this.i) {
		this.Slots[this.i].W = this.Pic.Specs.PATCH.W;
		this.Slots[this.i].H = this.Pic.Specs.PATCH.H;
	}
};
DominionMapControls.prototype.Draw = function() {

	for (this.i=0;this.i<this.Slots.length;++this.i)
		if (this.i==this.SelectedOption)
			this.Pic.DrawPatchNumber(2*this.i, this.Slots[this.i].L, this.Slots[this.i].T);
		else
			this.Pic.DrawPatchNumber((2*this.i)+1, this.Slots[this.i].L, this.Slots[this.i].T);
};
DominionMapControls.prototype.CheckClickedOn = function() {

	for (this.i=0;this.i<this.Slots.length;++this.i)
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.Slots[this.i])) {
			this.SelectedOption = this.i;
			return (true);
		}

	return (false);
};
