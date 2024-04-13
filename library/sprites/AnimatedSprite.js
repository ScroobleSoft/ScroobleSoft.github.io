
//----------------------------------------------
//----------ANIMATED SPRITE---------------------
var AnimatedSprite = function() {
   var State;
   var ZeroStateLeft, ZeroStateTop;
};
AnimatedSprite.prototype = new GenieSprite();
AnimatedSprite.prototype.Set = function(cntxt, pic, specs) {
   GenieSprite.prototype.Set.call(this, cntxt, pic, specs);

   this.State = 0;
   this.Left = this.Specs.L;
   this.Top = this.Specs.T;
   this.ZeroStateLeft = this.Left;
   this.ZeroStateTop = this.Top;
};
AnimatedSprite.prototype.SetDraw = function(state) {

   //Set correct state
   if (state!=undefined)
      this.State = state;

   //Set starting point for drawing from sprite sheet
   if (this.Specs.C) {
      this.Left = this.ZeroStateLeft + ((this.State % this.Specs.C)*(this.Specs.W+this.Specs.O));
      this.Top = this.ZeroStateTop + (Math.floor(this.State/this.Specs.C)*(this.Specs.H+this.Specs.O));
   } else
      this.Left = this.ZeroStateLeft + (this.State*(this.Specs.W+this.Specs.O));
};
AnimatedSprite.prototype.Draw = function(x, y, state) {

   this.SetDraw(state);

   GenieSprite.prototype.Draw.call(this, x, y);
};
AnimatedSprite.prototype.DrawCentred = function(x, y, state) {

   this.Draw(x-Math.round(this.Specs.W/2), y+Math.round(this.Specs.H/2), state);
};
AnimatedSprite.prototype.DrawResized = function(x, y, scale, state, alignment) {

   this.SetDraw(state);

   GenieSprite.prototype.DrawResized.call(this, x, y, scale, alignment);
};
AnimatedSprite.prototype.DrawFlipped = function(x, y, orntd, state, alignment) {

   this.SetDraw(state);

   GenieSprite.prototype.DrawFlipped.call(this, x, y, orntd, alignment);
};
AnimatedSprite.prototype.DrawRotated = function(x, y, angle, state) {

   this.SetDraw(state);

   GenieSprite.prototype.DrawRotated.call(this, x, y, angle);
};
