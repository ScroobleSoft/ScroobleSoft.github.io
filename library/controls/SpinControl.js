
//-------------------------------------------------
//---------- GENIE SPIN CONTROL -------------------
var GenieSpinControl = function() {
	var PadPic;
	var UpButtonBox, DownButtonBox;
	var UpButtonClicked, DownButtonClicked;
};
GenieSpinControl.prototype = new GenieControl();
GenieSpinControl.prototype.Set = function(canvas, specs, img, iPad) {
	GenieControl.prototype.Set.call(this, canvas, specs, img);

	this.PadPic = iPad;
	this.SetBoxes();
};
GenieSpinControl.prototype.SetBoxes = function() {

	this.UpButtonBox = new GenieRect();
	this.UpButtonBox.Set(this.Specs.L+2, this.Specs.T+2, this.Pic.Specs.PATCH.W, this.Pic.Specs.PATCH.H);		//HARD-CODED!
	this.DownButtonBox = new GenieRect();
	this.DownButtonBox.Set(this.Specs.L+2, this.Specs.T+13, this.Pic.Specs.PATCH.W, this.Pic.Specs.PATCH.H);		//HARD-CODED!
};
GenieSpinControl.prototype.Draw = function() {

	if (this.PadImage)
		this.PadImage.Draw(this.Specs.L, this.Specs.T);
	this.Pic.DrawPatchNumber(0, this.UpButtonBox.L, this.UpButtonBox.T);
	this.Pic.DrawPatchNumber(1, this.DownButtonBox.L, this.DownButtonBox.T);
};
GenieSpinControl.prototype.MouseDown = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;

	//Top button
	if (SpaceUtils.CheckPointInBox(Mouse.Down, this.UpButtonBox)) {
		this.UpButtonClicked = true;
		this.Context.fillRect(this.UpButtonBox.L, this.UpButtonBox.T, this.UpButtonBox.W, this.UpButtonBox.H);
		this.Pic.DrawPatchNumber(2, this.UpButtonBox.L, this.UpButtonBox.T);
		setTimeout(this.ResetUpButton.bind(this), 100);
	}

	//Bottom button
	if (SpaceUtils.CheckPointInBox(Mouse.Down, this.DownButtonBox)) {
		this.DownButtonClicked = true;
		this.Context.fillRect(this.DownButtonBox.L, this.DownButtonBox.T, this.DownButtonBox.W, this.DownButtonBox.H);
		this.Pic.DrawPatchNumber(3, this.DownButtonBox.L, this.DownButtonBox.T);
		setTimeout(this.ResetDownButton.bind(this), 100);
	}
};
GenieSpinControl.prototype.CheckClickedUp = function() {

	if (this.UpButtonClicked) {
		this.UpButtonClicked = false;
		return (true);
	}
};
GenieSpinControl.prototype.CheckClickedDown = function() {

	if (this.DownButtonClicked) {
		this.DownButtonClicked = false;
		return (true);
	}
};
GenieSpinControl.prototype.ResetUpButton = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;
	this.Context.fillRect(this.UpButtonBox.L, this.UpButtonBox.T, this.UpButtonBox.W, this.UpButtonBox.H);
	this.Pic.DrawPatchNumber(0, this.UpButtonBox.L, this.UpButtonBox.T);
};
GenieSpinControl.prototype.ResetDownButton = function() {

	this.Context.fillStyle = this.Specs.BACKGROUND;
	this.Context.fillRect(this.DownButtonBox.L, this.DownButtonBox.T, this.DownButtonBox.W, this.DownButtonBox.H);
	this.Pic.DrawPatchNumber(1, this.DownButtonBox.L, this.DownButtonBox.T);
};
