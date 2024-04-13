
//-----------------------------------------------
//----------- GENIE PELLET ----------------------	ISSUE: looking a little REDUNDANT right now - GenieAmmunition may be enough
var GeniePellet = function() {
//   var ScreenManager;
//   var ExplosionScale;
};
GeniePellet.prototype = new GenieAmmunition();
GeniePellet.prototype.Set = function(specs, sprite, sManager) {
   GenieAmmunition.prototype.Set.call(this, specs, sprite);

   this.ScreenManager = sManager;
};
/*
GeniePellet.prototype.Update = function() {

   //UNLOGGED - 3s expanding, 3s contracting

   this.Move();

   //-move till destination is reached, then explode in expanding and contracting radius
   switch (this.State.Motion) {
      case ROCKET.STATE.RELEASED:
	 this.CheckCollisions();
	 this.Move();
	 break;
      case ROCKET.STATE.EXPANDING:
	 this.CheckCollisions();
	 this.ExplosionScale += 0.01;
	 if (this.ExplosionScale>=1)
	    this.State.Motion = ROCKET.STATE.CONTRACTING;
	 break;
      case ROCKET.STATE.CONTRACTING:
//	 this.CheckCollisions();
	 this.ExplosionScale -= 0.01;
	 if (this.ExplosionScale<=0.4)
	    this.UnsetExtant();
	 break;
   }
};
*/
/*
GeniePellet.prototype.Draw = function() {

   //UNLOGGED

   this.ScreenCoords.Set(this.Position.X, this.Position.Y);
   if (this.Specs)
      if (this.Specs.PERSPECTIVE)
	 GeoUtils.PerspectiveAdjust(this.ScreenCoords, this.Specs.PERSPECTIVE);
   switch (this.State.Motion) {
      case ROCKET.STATE.RELEASED:
	 this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
	 break;
      case ROCKET.STATE.EXPANDING:
      case ROCKET.STATE.CONTRACTING:
	 ExplosionSprite.DrawResized(this.ScreenCoords.X, this.ScreenCoords.Y, this.ExplosionScale);	//TODO: explosion sprite has to be set in specs
	 break;												//	or else GraphicsTool can be used
   }
};
*/
GeniePellet.prototype.CheckCollisions = function() {
/*
   //UNLOGGED

   //-check against all visible objects
   //-on impact, need to update .Damage, maybe even informing agent

   //following is TEMP
   if (this.CheckAtDestination())
      this.State.Motion = ROCKET.STATE.EXPANDING;
*/
};
