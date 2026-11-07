
//-------------------------------------------------------  Specs: { L: -1, T: -1, W: -1, H: -1, R: -1, BACKGROUND: "", SINGLE: false,
//---------- GENIE ROUND PUSH BUTTON -------------------- 			  IMAGE: { L: -1, T: -1, W: -1, H: -1, O: -1, PATCH: { W: -1, H: -1 } } }
var GenieRoundPushButton = function() {
	var MidPoint;
};
GenieRoundPushButton.prototype = new GeniePushButton();
GenieRoundPushButton.prototype.Set = function(canvas, specs, iBtn) {
	GeniePushButton.prototype.Set.call(this, canvas, specs, iBtn);

	this.MidPoint = { X: this.Specs.L+this.Specs.R, Y: this.Specs.T+this.Specs.R };
};
GenieRoundPushButton.prototype.Draw = function(bPressed) {

	this.Erase(this.Specs.BACKGROUND);

	if (bPressed)
		this.Pic.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	else
		this.Pic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
};
GenieRoundPushButton.prototype.MouseDown = function() {

	if (!IntersectUtils.CheckPointCircle(Mouse.Down, this.MidPoint, this.Specs.R))
		return;

	this.Draw(PRESSED);
	this.Pressed = true;

	if (!this.SinglePushFlag)
		setTimeout(this.Reset.bind(this), 60);
};
