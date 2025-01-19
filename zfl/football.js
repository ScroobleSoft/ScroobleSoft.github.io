
//--------------------------------------------
//---------- ZFL FOOTBALL --------------------	NOTE: centre aligned
var ZFLFootball = function() {
   var Perspective;	// { TOpDOWN: 0, SIDE: 1, INFoBOX: 2 }
};
ZFLFootball.prototype = new GenieProjectile();
ZFLFootball.prototype.Set = function(specs, sprite) {
   GenieProjectile.prototype.Set.call(this, specs, sprite);

   //NOTE: not initializing Perspective

   this.State.Animation.State = ORIENTATION.HORIZONTAL;			//TODO: this might be TEMP
};
ZFLFootball.prototype.Draw = function() {

   //UNLOGGED

   //TEMP
   if (this.State.Animation.State==ORIENTATION.HORIZONTAL) {
      this.GraphicsTool.DrawEllipse(this.ScreenCoords.X, this.ScreenCoords.Y, 4, 7, "brown", 0);
      this.GraphicsTool.DrawEllipse(this.ScreenCoords.X, this.ScreenCoords.Y, 4, 7, "black", 1);
   } else {
      this.GraphicsTool.DrawEllipse(this.ScreenCoords.X, this.ScreenCoords.Y, 7, 4, "brown", 0);
      this.GraphicsTool.DrawEllipse(this.ScreenCoords.X, this.ScreenCoords.Y, 7, 4, "black", 1);
   }
   return;

   GenieProjectile.prototype.Draw.call(this);	//TEMP (actually, might work for side-view, which is pretty much top-down)

   switch(this.Perspective) {
/*
      case ACTION.TOpDOWN:
	 break;
      case ACTION.SIDE:
	 this.GraphicsTool.DrawEllipse(this.Position.X, this.Position.Y, 7, 4, "brown", 0);	//HARD-CODED
	 this.GraphicsTool.DrawEllipse(this.Position.X, this.Position.Y, 7, 4, "black", 1);
	 break;
      case ACTION.INFoBOX:
	 this.GraphicsTool.SwitchContext(this.InfoBox);
	 GenieAgent.prototype.Draw.call(this);	//draw sprite
	 this.GraphicsTool.RestoreContext();
	 break;
*/
   }
};
