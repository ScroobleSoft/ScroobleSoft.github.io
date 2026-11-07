
//-------------------------------------------------
//---------- GENIE PUSH BUTTON --------------------
var GeniePushButton = function() {
	var EdgePics;
	var Pressed;
	var SinglePushFlag;		//once pressed, stays pressed permanently
};
GeniePushButton.prototype = new GenieControl();
GeniePushButton.prototype.Set = function(canvas, specs, iBtn) {
	GenieControl.prototype.Set.call(this, canvas, specs, iBtn);

	this.Pressed = false;
	if (this.Specs.SINGLE)
		this.SetSinglePush();
};
GeniePushButton.prototype.SetEdgePics = function(iEdges) {

	this.EdgePics = iEdges;
};
GeniePushButton.prototype.SetSinglePush = function() {

	this.SinglePushFlag = true;
};
GeniePushButton.prototype.Draw = function(bPressed) {

	this.Erase(this.Specs.BACKGROUND);

	//Draw edges
	if (bPressed)
		this.EdgePics.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	else
		this.EdgePics.DrawPatchNumber(0, this.Specs.L, this.Specs.T);

	//Draw button image
	if (this.Pic.Specs.PATCH)
		this.Pic.DrawPatchNumber(this.Specs.Index, this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW);
	else
		this.Pic.Draw(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW);
};
GeniePushButton.prototype.MouseDown = function() {

	this.Draw(PRESSED);
	this.Pressed = true;

	if (!this.SinglePushFlag)
		setTimeout(this.Reset.bind(this), 60);
};
GeniePushButton.prototype.CheckPressed = function() {

	if (this.Pressed) {
		this.Pressed = false;
		return (true);
	} else
		return (false);
};
GeniePushButton.prototype.Reset = function() {

	this.Draw();
};
