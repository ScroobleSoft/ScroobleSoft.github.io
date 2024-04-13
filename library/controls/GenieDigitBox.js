
//----------------------------------------------
//---------- GENIE DIGIT BOX -------------------  Specs: { L: -1, T: -1, W: -1, H: -1, DIGITS: -1, START: XXX };
var GenieDigitBox = function() {
   var Pressed;
   var Digits;
   var DigitsPic;
};
GenieDigitBox.prototype = new GenieControl();
GenieDigitBox.prototype.Set = function(canvas, specs, img) {
   GenieControl.prototype.Set.call(this, canvas, specs, img);

   this.Digits = new Array(this.Specs.DIGITS);
   if (this.Specs.START)
      this.SetDigits(this.Specs.START);
   else
      this.SetDigits(0);
};
GenieDigitBox.prototype.SetExtraLinks = function(dPic) {

    this.DigitsPic = dPic;
};
GenieDigitBox.prototype.SetDigits = function(dgts) {
   var i;
   var nDgts;

   nDgts = Math.log10(dgts);
   for (i=0;i<nDgts;++i) {
      this.Digits[i] = dgts % 10;
      dgts = Math.floor(dgts/10);
   }
};
GenieDigitBox.prototype.Draw = function() {  //ISSUE: all offsets are hard-coded
   var i;

   //UNLOGGED

   this.Erase(this.Specs.BACKGROUND);
   this.GraphicsTool.SwitchContext(this.Context);
   this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T+9, this.Specs.W, this.Specs.H-18, "black", 1);
   for (i=(this.Specs.DIGITS-1);i>=0;--i) {
      if (i)
	 this.GraphicsTool.DrawVerticalLine( { X: this.Specs.L+(11*i), Y: this.Specs.T+10 }, 14, GREY.SILVER, 1);
      this.Pic.DrawPatchNumber(0, this.Specs.L+this.Specs.W-1-(11*(i+1)), this.Specs.T);				//top buttons
      this.Pic.DrawPatchNumber(1, this.Specs.L+this.Specs.W-1-(11*(i+1)), this.Specs.T+24);				//bottom buttons
      this.DigitsPic.DrawPatchNumber(this.Digits[i], this.Specs.L+this.Specs.W+2-(11*(i+1)), 17);			//digits
   }
   this.GraphicsTool.RestoreContext();
};
GenieDigitBox.prototype.DrawDigit = function(iDigit) {

   //UNLOGGED

};
GenieDigitBox.prototype.DrawButton = function(iBtn, bTop) {

   //UNLOGGED

};
GenieDigitBox.prototype.MouseDown = function() {

   this.Pressed = true;
//   this.Draw(PRESSED);
   setTimeout(this.Reset.bind(this), 150);
};

GenieDigitBox.prototype.Reset = function(iBtn, bTop) {

   //UNLOGGED

   this.DrawButton(iBtn, bTop);
};
