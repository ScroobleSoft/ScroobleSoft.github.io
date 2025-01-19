
//---------------------------------------------------
//---------- DOMINION AA MISSILE --------------------
var DominionAAMissile = function() {
   var Colour;
};
DominionAAMissile.prototype = new GenieProjectile();
DominionAAMissile.prototype.Set = function(specs, sprite, agnt) {
   GenieProjectile.prototype.Set.call(this, specs, sprite, agnt);

};
DominionAAMissile.prototype.Set = function(gTool) {

   this.GraphicsTool = gTool;
};
DominionAAMissile.prototype.Activate = function(pos, dstntn, agnt, drctn, colour) {
   GenieProjectile.prototype.Activate.call(this, pos, dstntn, agnt);

   this.Colour = colour;
   this.Direction = drctn;
   this.SetVisible();
};
DominionAAMissile.prototype.Draw = function() {

   //UNLOGGED

   //NOTE: this is only applicable to Air Theatre radar pane
   this.GraphicsTool.DrawCirle(this.Position.X, this.Position.Y, 3, this.Colour, 0);
/*
   if (Air Theatre)
      if (this.CheckInInset())
	 this.DrawInInset();
*/
};
DominionAAMissile.prototype.DrawInInset = function() {

   this.Specs.GS[0].Colour = this.Colour;

   if (this.Direction==DIRECTION.E)
      this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
   else
      this.Sprite.DrawFlipped(this.ScreenCoords.X, this.ScreenCoords.Y, FLIPPED.HORIZONTAL);
};
DominionCounterMeasure.prototype.DetermineScreenCoords = function() {

   //UNLOGGED

};
DominionAAMissile.prototype.CheckInInset = function() {

   //UNLOGGED

   if (this.Direction==DIRECTION.E) {
   } else {
   }
};
DominionAAMissile.prototype.Update = function() {

   //LOGGED - method may be needed to call ::SetVisible if close to target (else UNLOG)
   //	    - need to call DetermineScreenCoords if within inset
   this.Move();
};
