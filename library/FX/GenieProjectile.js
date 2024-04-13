/* GenieProjectile derived from GenieAgent
   rocket, missile, pellet, pulse, disc - but maybe not drones - will be derived from projectiles rather than GenieAgent because of added method(s) for
   informing firing agent of outcome and explosion/expiry behaviour
   an added feature of this class is making projectile movement easier, both vertically and horizontally
*/
//------------------------------------------------
//---------- GENIE PROJECTILE --------------------
var GenieProjectile = function() {
   var Agent;
   var Parabolic;
   var SpriteState;
   var FizzleSprite, FizzleState;
};
GenieProjectile.prototype = new GenieAgent();
GenieProjectile.prototype.Set = function(specs, sprite, sSprite) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   if (this.Specs.E)
      this.Elevation = this.Specs.E;
   this.FizzleSprite = sSprite;
   this.Parabolic = new GenieParabolicPath();	//TODO: this should only be executed if .PARABOLIC is in specs
   this.Parabolic.Set();
};
GenieProjectile.prototype.SetLinks = function(gTool, sRect) {

   this.GraphicsTool = gTool;
   this.ScreenRect = sRect;
};
GenieProjectile.prototype.SetParabolic = function() {

   this.Parabolic.Distance = SpaceUtils.GetDistance(this.Position, this.Destination);
   this.Parabolic.DistanceCovered = 0;
};
GenieProjectile.prototype.SetHParabolic = function(mBreadth, drctn) {  //m- max
   var xDev, yDev;

   this.SetParabolic();
   this.SetHFactors(mBreadth, drctn);
   this.State.Motion = STATE.MOTION.HPARABOLIC;
};
GenieProjectile.prototype.SetHFactors = function(mBreadth, drctn) {

   this.Parabolic.BasePosition.Set(this.Position.X, this.Position.Y);
   if (drctn==DIRECTION.CLOCKWISE) {
      xDev = this.Destination.Y - this.Position.Y;
      yDev = this.Position.X - this.Destination.X;
   } else {
      xDev = this.Position.Y - this.Destination.Y;
      yDev = this.Destination.X - this.Position.X;
   }
   this.Parabolic.MaxBreadth = mBreadth;
   this.Parabolic.MaxX = xDev*(mBreadth/this.Parabolic.Distance);
   this.Parabolic.MaxY = yDev*(mBreadth/this.Parabolic.Distance);
};
GenieProjectile.prototype.SetVParabolic = function(mHeight, dHeight) {  //m- max, d- destination

   this.SetParabolic();
   this.SetVFactors(mHeight, dHeight);
   this.State.Motion = STATE.MOTION.VPARABOLIC;
};
GenieProjectile.prototype.SetVFactors = function(mHeight, dHeight) {

   this.Parabolic.StartElevation = this.Elevation;
   this.Parabolic.DestinationElevation = dHeight;
   if (dHeight!==undefined)
      this.Parabolic.ElevationIncrement = (this.Parabolic.DestinationElevation-this.Parabolic.StartElevation)/(this.Parabolic.Distance/this.Speed);
   else
      this.Parabolic.ElevationIncrement = 0;
   this.Parabolic.MaxHeight = mHeight;
};
GenieProjectile.prototype.SetHVParabolic = function(mBreadth, drctn, mHeight, dHeight) {

   this.SetParabolic();
   this.SetHFactors(mBreadth, drctn);
   this.SetVFactors(mHeight, dHeight);
   this.State.Motion = STATE.MOTION.HVPARABOLIC;
};
GenieProjectile.prototype.Update = function() {
   GenieAgent.prototype.Update.call(this);

   if (this.CheckAtDestination()) {
      this.State.Motion = STATE.MOTION.FIZZLING;
      this.FizzleState = 0;
      this.Frames = 10;
   }
};
GenieProjectile.prototype.Activate = function(pos, dstntn, grdnt, state, agnt) {

   this.SetPosition(pos);
   this.SetDestination(dstntn);
   this.Gradient = grdnt;
   this.State.Motion = STATE.MOTION.ADVANCING;
   this.SpriteState = state;
   this.SetExtant();
   this.SetVisible();
   this.Agent = agnt;
};
GenieProjectile.prototype.Move = function() {
   GenieAgent.prototype.Move.call(this);

   if (this.State.Motion==STATE.MOTION.HPARABOLIC || this.State.Motion==STATE.MOTION.HVPARABOLIC) {
      this.Position.Set(this.Parabolic.BasePosition.X, this.Parabolic.BasePosition.Y);
      GenieAgent.prototype.Move.call(this);
      this.Parabolic.BasePosition.Set(this.Position.X, this.Position.Y);
      this.MoveH();
   }
   if (this.State.Motion==STATE.MOTION.VPARABOLIC || this.State.Motion==STATE.MOTION.HVPARABOLIC) {
      if (this.State.Motion==STATE.MOTION.VPARABOLIC)
	 GenieAgent.prototype.Move.call(this);
      this.MoveV();
   }
   this.Parabolic.DistanceCovered += this.Speed;
};
GenieProjectile.prototype.MoveH = function() {

   this.Position.X += Math.sin(Math.PI*(this.Parabolic.DistanceCovered/this.Parabolic.Distance))*this.Parabolic.MaxX;
   this.Position.Y += Math.sin(Math.PI*(this.Parabolic.DistanceCovered/this.Parabolic.Distance))*this.Parabolic.MaxY;
};
GenieProjectile.prototype.MoveV = function() {

   this.Elevation = this.Parabolic.StartElevation;
   if (this.ElevationIncrement)
      this.Elevation += this.Parabolic.ElevationIncrement;
   this.Elevation += Math.sin(Math.PI*(this.Parabolic.DistanceCovered/this.Parabolic.Distance))*this.Parabolic.MaxHeight;
};
GenieProjectile.prototype.Draw = function() {

   if (this.State.Motion==STATE.MOTION.FIZZLING)
      this.DrawFizzle();
   else
      GenieAgent.prototype.Draw.call(this, this.SpriteState);
};
GenieProjectile.prototype.DrawShadow = function() {

   if (this.ScreenRect)
      this.GraphicsTool.DrawCircle(this.Parabolic.BasePosition.X-this.ScreenRect.L, this.Parabolic.BasePosition.Y-this.ScreenRect.T, this.Sprite.W/2, "black", 0, 0.5);
   else
      this.GraphicsTool.DrawCircle(this.Parabolic.BasePosition.X, this.Parabolic.BasePosition.Y, this.Sprite.W/2, "black", 0, 0.5);
};
GenieProjectile.prototype.DrawFizzle = function() {

   --this.Frames;
   if (!this.Frames) {
      ++this.FizzleState;
      if (this.FizzleState==5) {
	 this.UnsetExtant();
	 this.UnsetVisible();
      } else
	 this.Frames = 10;
   }

   this.DetermineScreenCoords();
   switch (this.FizzleState) {
      case 0:
      case 4:
	 if (this.FizzleSprite)
	    this.FizzleSprite.DrawCentred(this.ScreenCoords.X, this.ScreenCoords.Y, 0);
	 else
	    this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, 3, "yellow", 0);
	 break;
      case 1:
      case 3:
	 if (this.FizzleSprite)
	    this.FizzleSprite.DrawCentred(this.ScreenCoords.X, this.ScreenCoords.Y, 1);
	 else
	    this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, 3, "orange", 0);
	 break;
      case 2:
	 if (this.FizzleSprite)
	    this.FizzleSprite.DrawCentred(this.ScreenCoords.X, this.ScreenCoords.Y, 2);
	 else
	    this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, 3, "red", 0);
	 break;
   }
};
