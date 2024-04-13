/*
 *  LOGGED - relevant methods may only be ::Update to check for collisions, and ::Impact, for sending messages to Owner and Target, and also accounting
 *	     for expanding and shrinking impact radius
 *	     regarding above, there will be a little bit of duplication with GenieShell and GenieMissile (as well as other possible ones like GenieBomb)
 */
//-----------------------------------------------
//----------- GENIE ROCKET ----------------------
var GenieRocket = function() {
   var ScreenManager;
   var Agent;
   var Potency;		//set in specs
   var ExplosionScale;
};
GenieRocket.prototype = new GenieAgent();
GenieRocket.prototype.Set = function(specs, sprite, gTool, sManager) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.GraphicsTool = gTool;
   this.ScreenManager = sManager;
};
GenieRocket.prototype.Release = function(pos, dstn, agnt) {
   this.SetPosition(pos);
   this.SetDestination(dstn);
   this.Agent = agnt;
   this.ExplosionScale = 0.4;
   this.State.Action = ROCKET.STATE.RELEASED;
};
GenieRocket.prototype.Update = function() {

   //UNLOGGED - 3s expanding, 3s IMPLODING

   //-move till destination is reached, then explode in expanding and IMPLODING radius
   switch (this.State.Action) {
      case ROCKET.STATE.RELEASED:
	 this.CheckCollisions();
	 this.Move();
	 break;
      case ROCKET.STATE.EXPLODING:
	 this.CheckCollisions();
	 this.ExplosionScale += 0.01;
	 if (this.ExplosionScale>=1)
	    this.State.Action = ROCKET.STATE.IMPLODING;
	 break;
      case ROCKET.STATE.IMPLODING:
//	 this.CheckCollisions();
	 this.ExplosionScale -= 0.01;
	 if (this.ExplosionScale<=0.4)
	    this.UnsetExtant();
	 break;
   }
};
GenieRocket.prototype.Draw = function() {
   this.ScreenCoords.Set(this.Position.X, this.Position.Y);
   if (this.Specs)
      if (this.Specs.PERSPECTIVE)
	 GeoUtils.PerspectiveAdjust(this.ScreenCoords, this.Specs.PERSPECTIVE);
   switch (this.State.Action) {
      case ROCKET.STATE.RELEASED:
	 this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
	 break;
      case ROCKET.STATE.EXPLODING:
      case ROCKET.STATE.IMPLODING:
	 ExplosionSprite.DrawResized(this.ScreenCoords.X, this.ScreenCoords.Y, this.ExplosionScale);	//TODO: explosion sprite has to be set in specs
	 break;												//	or else GraphicsTool can be used
   }
};
GenieRocket.prototype.CheckCollisions = function() {

   //UNLOGGED

   //-check against all visible objects
   //-on impact, need to update .Damage, maybe even informing agent

   //following is TEMP
   if (this.CheckAtDestination())
      this.State.Action = ROCKET.STATE.EXPLODING;
};
