/*
 *  fires 4 discs that go straight for a certain distance, then cut left or right
 *  TODO: will emerge slowly from under the mech (technically, it's coming out of the mech's chassis (chest))
 *  ISSUE: has to be a GenieAgent?
 */
//-------------------------------------------------
//---------- GALLERY PERCUTTER --------------------
var GalleryPercutter = function() {
   var Discs;
   var Distance;

   var i;
};
GalleryPercutter.prototype = new GenieAgent();
GalleryPercutter.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, null, null, null, specs, sprite);

   this.SetDiscs();
   this.Distance = 0;
};
GalleryPercutter.prototype.SetLinks = function(rGenerator) {
   GenieAgent.prototype.SetLinks.call(this, null, null, null, null, null, null, null, null, null, null, rGenerator);
};
GalleryPercutter.prototype.SetDiscs = function() {
   var i;

   this.Discs = new Array(4);
   for (i=0;i<this.Discs.length;++i) {
      this.Discs[i] = new PercutterDisc();
      this.Discs[i].Set( { SPEED: 2.0 }, PercutterDiscSprite);
   }
};
GalleryPercutter.prototype.ResetDiscs = function() {
};
GalleryPercutter.prototype.Fire = function(pos) {
   var i;
   var distance;

   for (i=0;i<this.Discs.length;++i) {
      this.Discs[i].SetPosition( { X: pos.X+10, Y: pos.Y+(15*i) } );
      distance = this.Randomizer.GetNumberWithinRange(200, 550);
      this.Discs[i].SetDestination( { X: this.Position.X, Y: distance } );
   }
};
/*
GalleryPercutter.prototype.Update = function() {

   //UNLOGGED

   if (this.CurrentTargetIndex==-1) {
      ++this.CurrentTargetIndex;
      this.Target = this.Targets[this.CurrentTargetIndex];
      this.SetDestination(this.Target.Position);
   }

   if (this.CheckCollision()) {
      this.Target.Explode();
      ++this.CurrentTargetIndex;
      if (this.CurrentTargetIndex % 2)
	 this.Angle = 360;
      else
	 this.Angle = 0;
      if (this.CurrentTargetIndex<this.Targets.length) {
	 this.Target = this.Targets[this.CurrentTargetIndex];
	 this.SetDestination(this.Target.Position);
      }
   }

   if (this.Extant)
      this.Extant -= 0.2;

   if (this.CurrentTargetIndex % 2) {
      --this.Angle;
      if (this.Angle==0)
	 this.Angle = 360;
   } else {
      ++this.Angle;
      if (this.Angle==360)
	 this.Angle = 0;
   }

   this.Move();
};
GalleryPercutter.prototype.Draw = function() {

   //UNLOGGED

   this.Sprite.Context.globalAlpha = this.Extant/256;
   this.Sprite.DrawRotated(this.Position.X, this.Position.Y, this.Angle);
   this.Sprite.Context.globalAlpha = 1.0;
};
GalleryPercutter.prototype.CheckCollision = function() {
   this.Target.DetermineBoundingBox();
   return (Utilities.CheckBoxCircleIntersection(this.Target.BoundingBox, this.Position, 10));
};
*/
GalleryPercutter.prototype.CheckDiscsOffScreen = function() {

   for (this.i=0;this.i<this.Discs.length;++this.i)
      if (this.Discs[this.i].Position.X<0 || this.Discs[this.i].Position.X>600)
	 return (true);
};
