
//-------------------------------------------
//---------- GENIE SPARK --------------------
var GenieSpark = function() {
};
GenieSpark.prototype = new GenieFX();
GenieSpark.prototype.Set = function(specs, sprite) {
   GenieFX.prototype.Set.call(this, specs, sprite);

//   this.States = this.Specs ? this.Specs.S : SPARK.S;
//   this.Frames = this.Specs ? this.Specs.F : SPARK.F;
//   this.State = 0;
};
GenieSpark.prototype.SetLinks = function(sRect) {

	this.ScreenRect = sRect;
};
GenieSpark.prototype.Clone = function(spark) {
   this.Set(spark.Sprite, spark.Duration, spark.Frames);
};
/*
GenieSpark.prototype.Activate = function(laser) {
   var mgntd;

//   GenieFX.prototype.Activate.call(this, laser.X, laser.Y); 
   GenieFX.prototype.Activate.call(this, pos); 

   //NOTE: FUTURE IMPLEMENTATION could have size of spark matching laser thickness
   mgntd = Utilities.GetMagnitude( { X: laser.XE-laser.X, Y: laser.YE-laser.Y } );
   this.X += Math.round((laser.XE-laser.X)*((mgntd+5)/mgntd));		//ISSUE: hard-coded value!
   this.Y += Math.round((laser.YE-laser.Y)*((mgntd+5)/mgntd));		//ISSUE: hard-coded value!

   //TODO: going to change this from drawing at 105% of laser origin to destination itself
};
*/
/*
GenieSpark.prototype.Activate = function(pos) {
   GenieFX.prototype.Activate.call(this, pos); 

   this.State = 0;
   this.Frames = this.Specs ? this.Specs.F : SPARK.F;
};
*/
GenieSpark.prototype.Draw = function() {

   this.DetermineScreenCoords();
   switch (this.State) {
      case 0:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 0);
	 break;
      case 1:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 1);
	 break;
      case 2:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 2);
	 break;
      case 3:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 2);
	 break;
      case 4:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 1);
	 break;
      case 5:
	 this.Sprite.DrawCentred(this.ScreenPosition.X, this.ScreenPosition.Y, 0);
	 break;
   }
};
