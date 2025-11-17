
//--------------------------------------------
//---------- GALLERY WIMP --------------------
var GalleryWimp = function() {
   var Industrialist;
   var Weapons;			//TODO: change to .Weapons
};
GalleryWimp.prototype = new GenieAgent();
GalleryWimp.prototype.Set = function(indstrlst) {
   GenieAgent.prototype.Set.call(this, null, null, null, WIMP, WIMPSprite);

   this.Industrialist = indstrlst;
};
GalleryWimp.prototype.Explode = function() {

   //UNLOGGED

   this.Extant = false;
};
GalleryWimp.prototype.Draw = function() {
   this.DetermineScreenCoords();
   this.DrawCastors();
   switch (this.Animation.State) {
      case 0:
	 this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, (8*this.Industrialist.Index)+this.Direction);
	 break;
      case 1:
	 this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y+1, (8*this.Industrialist.Index)+this.Direction);
	 break;
      case 2:
	 this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y+2, (8*this.Industrialist.Index)+this.Direction);
	 break;
   }
};
GalleryWimp.prototype.DrawCastors = function() {
   switch (this.Direction) {
      case DIRECTION.N:
      case DIRECTION.E:
      case DIRECTION.S:
      case DIRECTION.W:
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+2 , this.ScreenCoords.Y  , this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+6 , this.ScreenCoords.Y+2, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+10, this.ScreenCoords.Y+4, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+26, this.ScreenCoords.Y  , this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+22, this.ScreenCoords.Y+2, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+18, this.ScreenCoords.Y+4, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+14, this.ScreenCoords.Y+6, this.Industrialist.Index);	//middle corner
	 break;
      default:
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+5 , this.ScreenCoords.Y+4, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+11, this.ScreenCoords.Y+4, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+17, this.ScreenCoords.Y+4, this.Industrialist.Index);
	 WIMPCastorSprite.Draw(this.ScreenCoords.X+23, this.ScreenCoords.Y+4, this.Industrialist.Index);
	 break;
   }
};
/*
GalleryWimp.prototype.Update = function() {

   //UNLOGGED

   this.UpdateAnimation();
};
*/