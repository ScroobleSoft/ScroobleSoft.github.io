
//--------------------------------------------------------
//---------- DOMINION COUNTER MEASURE --------------------
var DominionCounterMeasure = function() {
   var Opacity;
};
DominionCounterMeasure.prototype = new GenieProjectile();
DominionCounterMeasure.prototype.Set = function(specs, sprite) {
   GenieProjectile.prototype.Set.call(this, specs, sprite);

   this.State.Opacity = false;
};
DominionCounterMeasure.prototype.Activate = function(pos, dstntn) {
   GenieProjectile.prototype.Activate.call(this, pos, dstntn);

   this.Angle = 0;
   this.Opacity = 1.0;
   this.Frames = 150;
   this.State.Opacity = false;
   this.SetVisible();
};
DominionCounterMeasure.prototype.Draw = function() {

   if (this.State.Motion==STATE.MOTION.STATIONARY)
      this.Sprite.Context.globalAlpha = this.Opacity;

   this.Sprite.DrawRotated(this.Position.X, this.Position.Y, this.Angle);

   if (this.State.Motion==STATE.MOTION.STATIONARY)
      this.Sprite.Context.globalAlpha = 1.0;
};
DominionCounterMeasure.prototype.Update = function() {

   this.Angle += 0.5;

   if (this.State.Motion==STATE.MOTION.ADVANCING) {
      this.Move();
      if (this.CheckAtDestination())
	 this.State.Motion = STATE.MOTION.STATIONARY;
   } else {
      --this.Frames;
      if (!this.Frames)
	 this.UnsetExtant();
   } 
};
