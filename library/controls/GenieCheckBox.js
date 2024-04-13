
//-----------------------------------------------
//---------- GENIE CHECK BOX --------------------
var GenieCheckBox = function() {
   var Checked;
};
GenieCheckBox.prototype = new GenieControl();
GenieCheckBox.prototype.Set = function(canvas, specs, img) {
   GenieControl.prototype.Set.call(this, canvas, specs, img);

   this.Checked = false;
};
GenieCheckBox.prototype.Draw = function() {
   this.DrawBox();
   this.TextWriter.Write(this.Specs.LABEL, this.Specs.L+this.Specs.W+3, this.Specs.T+this.Specs.H);
};
GenieCheckBox.prototype.DrawBox = function() {
   this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   if (this.Checked)
      this.Pic.DrawPatchNumber(1, this.Specs.L, this.Specs.T);
   else
      this.Pic.DrawPatchNumber(0, this.Specs.L, this.Specs.T);
};
GenieCheckBox.prototype.ClickedOn = function() {
   GenieControl.prototype.ClickedOn.call(this);

   this.Checked = !this.Checked;
   this.DrawBox();
};
