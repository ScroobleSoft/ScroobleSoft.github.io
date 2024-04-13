
//-separate objects for homing and guided? actually, guided is fire and forget, so an actual (mouse/key) guided can also be implemented

//--------------------------------------------
//---------- GENIE MISSILE -------------------
var GenieMissile = function() {
//   var Fuel;			//ISSUE: could set this to -1 for unlimited fuel . . . going to use .Extant for this
   var Launcher;
   var Explosion;		//only when neutralized by ECM's, creating more of a puff than an explosion
   var ExplosionList;
};
GenieMissile.prototype = new GenieAgent();
/*
GenieMissile.prototype.Set = function() {
   //TODO: if this is needed at all, it would be to activate tracking if necessary, and to set fuel dynamics
   //TODO: another BEHAVIOUR that can be set is what happens once target is missed, and what if no target is clicked
};
*/
GenieMissile.prototype.SetLinks = function(eList) {
   this.ExplosionList = eList;
};
GenieMissile.prototype.Launch = function(trgt) {
   //-todo
};
GenieMissile.prototype.Update = function() {  //NOTE: this is an over-ride since limited functionality is needed
   --this.Extant;
   if (!this.Extant) {
      //TODO: check fuel exhaustion possibility if there is a fuel limit - a small, spark-like, explosion would be suitable
      //      to show missile 'burning-up', or missile enters a second state where it drops to the ground with some momentum
   }

   //TODO: main interest in creating this is to initiate explosion when target is reached
   //TODO: which method should be called in Target - .Explode or .Hit?
   if (this.CheckTargetReached()) {
      this.Explode();
      this.Target.Hit(this);	//?? - not sure...might just call .Explode
   }

   //TODO: decide what to do if target missed

   this.Move();
};
GenieMissile.prototype.Explode = function() {
   this.Extant = false;
   this.Explosion = this.ExplosionList.GetOpen();
   this.Explosion.Activate(this.GetCentreSpot());
};


GenieAgent.prototype.DrawMissileLock = function() {
   var accuracy;

   //LOGGED

   this.distance = Utilities.GetDistance(this.Target.Position, this.Position);
   if (this.distance<=this.Specs.MISSILE.MAX && this.distance>=this.Specs.MISSILE.MIN) {
      accuracy = ((this.distance-this.Specs.MISSILE.MIN)/(this.Specs.MISSILE.MAX-this.Specs.MISSILE.MIN))*100;
      this.GraphicsTool.DrawDiamond(this.Target.Position.X, this.Target.Position.Y, Math.ceil(this.Target.Sprite.Width/2)+2, this.Missile.LockColour.GetIntermediateColour(accuracy), 2);
   }
};
