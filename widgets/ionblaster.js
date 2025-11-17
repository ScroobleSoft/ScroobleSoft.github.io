/*
 *  orb bounces around until expiring
 *  would be nice if orb loses opacity as time goes on (and thus potency)
 */
//---------------------------------------------------
//---------- GALLERY ION BLASTER --------------------
var GalleryIonBlaster = function() {
   var Targets;
   var TargetIndices;
   var CurrentTargetIndex;
};
GalleryIonBlaster.prototype = new GenieAgent();
GalleryIonBlaster.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, null, null, null, specs, sprite);

   this.Extant = 256;
   this.Angle = 0;
   this.CurrentTargetIndex = -1;
};
GalleryIonBlaster.prototype.SetLinks = function(rGenerator) {
   GenieAgent.prototype.SetLinks.call(this, null, null, null, null, null, null, null, null, null, null, rGenerator);
};
GalleryIonBlaster.prototype.SetTargets = function(aTargets) {

   this.Targets = aTargets;
   this.TargetIndices = new Array(this.Targets.length);
   this.Randomizer.GetUniqueNumbers(this.TargetIndices, this.Targets.length, this.Targets.length, STARtAtZERO);
};
GalleryIonBlaster.prototype.Update = function() {

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
      this.Angle -= 4;
      if (this.Angle==0)
	 this.Angle = 360;
   } else {
      this.Angle += 4;
      if (this.Angle==360)
	 this.Angle = 0;
   }

   this.Move();
};
GalleryIonBlaster.prototype.Draw = function() {

   this.Sprite.Context.globalAlpha = this.Extant/256;
   this.Sprite.DrawRotated(this.Position.X, this.Position.Y, this.Angle);
   this.Sprite.Context.globalAlpha = 1.0;
};
GalleryIonBlaster.prototype.CheckCollision = function() {

   this.Target.DetermineBoundingBox();
   return (Utilities.CheckBoxCircleIntersection(this.Target.BoundingBox, this.Position, 10));
};
