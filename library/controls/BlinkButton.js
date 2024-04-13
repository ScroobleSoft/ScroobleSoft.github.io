
//-------------------------------------------
//---------- BLINK BUTTON -------------------
var BlinkButton = function() {
   var Opacity;
   var FadingFlag;
};
BlinkButton.prototype = new ImageButton();
BlinkButton.prototype.Set = function(canvas, specs, img) {
   ImageButton.prototype.Set(this, canvas, specs, img);

   this.Opacity = 1.0;
   this.FadingFlag = true;
};
BlinkButton.prototype.Draw = function(bPressed) {
   GenieButton.prototype.Draw.call(this, bPressed);

   this.Context.globalAlpha = this.Opacity;
   this.DrawImage();
   this.Context.globalAlpha = 1.0;
};
BlinkButton.prototype.Update = function() {

   if (this.FadingFlag) {
      this.Opacity -= 0.005;
      if (this.Opacity<=0.5)
	 this.FadingFlag = !this.FadingFlag;
   } else {
      this.Opacity += 0.005;
      if (this.Opacity>=1.0)
	 this.FadingFlag = !this.FadingFlag;
   }
};
