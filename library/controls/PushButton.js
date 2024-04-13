
//-------------------------------------------------
//---------- GENIE PUSH BUTTON --------------------
var GeniePushButton = function() {
   var EdgePics;
   var Pressed;
};
GeniePushButton.prototype = new GenieControl();
GeniePushButton.prototype.Set = function(canvas, specs, iBtn) {
   GenieControl.prototype.Set.call(this, canvas, specs, iBtn);

   this.Pressed = false;
};
GeniePushButton.prototype.SetEdgePics = function(iEdges) {

   this.EdgePics = iEdges;
};
GeniePushButton.prototype.Draw = function(bPressed) {

   this.Erase(this.Specs.BACKGROUND);

   //Draw edges
	if (bPressed)
		this.EdgePics.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
	else
		this.EdgePics.DrawPatchNumber(0, this.Specs.L, this.Specs.T);

	//Draw button image
	if (this.Specs.PATCH)
		this.Pic.DrawPatchNumber(this.Index, this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW);
	else
		this.Pic.Draw(this.Specs.L+this.Specs.LW, this.Specs.T+this.Specs.LW);
};
GeniePushButton.prototype.MouseDown = function() {

   this.Draw(PRESSED);
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

   this.Pressed = true;
	this.Draw();
};
