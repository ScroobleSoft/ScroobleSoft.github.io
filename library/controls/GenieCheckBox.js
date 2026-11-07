
//-----------------------------------------------
//---------- GENIE CHECK BOX --------------------
var GenieCheckBox = function() {
	var Checked;
};
GenieCheckBox.prototype = new GenieControl();
GenieCheckBox.prototype.Set = function(canvas, specs, img) {
	GenieControl.prototype.Set.call(this, canvas, specs, img);

	this.Checked = false;
	if (this.Specs.LABEL)
		this.SetClickBox();
};
GenieCheckBox.prototype.SetClickBox = function() {

	this.Specs.W += 3 + Math.round(this.Context.measureText(this.Specs.LABEL).width);
};
GenieCheckBox.prototype.Draw = function() {

	this.DrawBox();
	this.TextWriter.Context = this.Context;
	this.TextWriter.Write(this.Specs.LABEL, this.Specs.L+this.Pic.Specs.PATCH.W+3, this.Specs.T+this.Specs.H-2);
	this.TextWriter.RestoreContext();
};
GenieCheckBox.prototype.DrawBox = function() {
	var cntxt;

	cntxt = this.Pic.Context;
	this.Pic.Context = this.Context;
	this.Context.clearRect(this.Specs.L, this.Specs.T, this.Pic.Specs.PATCH.W, this.Specs.H);
	if (this.Checked)
		this.Pic.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	else
		this.Pic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
	this.Pic.Context = cntxt;
};
GenieCheckBox.prototype.MouseDown = function() {
	GenieControl.prototype.MouseDown.call(this);

	this.Checked = !this.Checked;
	this.Clicked = true;
	this.DrawBox();
};
GenieCheckBox.prototype.Check = function() {

	this.Checked = true;
	this.DrawBox();
};
GenieCheckBox.prototype.UnCheck = function() {

	this.Checked = false;
	this.DrawBox();
};
GenieCheckBox.prototype.CheckChecked = function() {

	return (this.Checked);
};
