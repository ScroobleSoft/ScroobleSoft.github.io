
//----------------------------------------------  Specs: { L: -1, T: -1, W: -1, H: -1, O: { X: -1, Y: -1 }, F: -1, SEQUENCE: [], S: -1, TOGGLED: null }
//---------- ANIMATED BUTTON -------------------  Image Specs: { L: -1, T: -1, W: -1, H: -1, O: -1, C: -1, R: -1, PATCH: { W: -1, H: -1 } }
var AnimatedButton = function() {
   var Frames;
   var State;
};
AnimatedButton.prototype = new ImageButton();
AnimatedButton.prototype.Set = function(canvas, specs, iSpecs) {
   ImageButton.prototype.Set.call(this, canvas, specs);

   this.Pic = new GenieImage();
   this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], iSpecs);
   this.Frames = this.Specs.F || BUTTON.ANIMATED.F;
   this.State = 0;
};
AnimatedButton.prototype.Update = function() {

   if (this.Specs.TOGGLED)
      this.Frames -= 2;
   else
      --this.Frames;
   if (this.Frames<=0) {
		this.Draw();
      ++this.State;
      if (this.Specs.S) {
			if (this.State==this.Specs.S)
				this.State = 0;
      } else if (this.Specs.SEQUENCE) {
			if (this.State==this.Specs.SEQUENCE.length)
				this.State = 0;
      }
      this.Frames = this.Specs.F || BUTTON.ANIMATED.F;
   }
};
AnimatedButton.prototype.DrawImage = function() {

   this.Context.fillStyle = this.Specs.COLOUR.BACKGROUND;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   this.Pic.DrawPatchNumber(this.State, this.Specs.L+this.Specs.O.X, this.Specs.T+this.Specs.O.Y);
};
