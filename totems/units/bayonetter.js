/*
 *  UNLOGGED - deliberately not deriving from TollUnit because it may not be applicable, and most of that class may be REDUNDANT
 *	     - this is the vault bayonetter, the other one being called BayonetterUnit perhaps
 */
//------------------------------------------------
//---------- VAULT BAYONETTER --------------------
var VaultBayonetter = function() {
   var Clan;
   var Tile;
};
VaultBayonetter.prototype = new GenieAgent();
VaultBayonetter.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.Tile = new Coordinate2D();
};
VaultBayonetter.prototype.SetPosition = function(x, y) {
   this.Tile.Set(x, y);

   GenieAgent.prototype.SetPosition.call(this, { X: (x*VAULT.TILE.W)+5, Y: (y*VAULT.TILE.H)+12 } );
};
VaultBayonetter.prototype.SetDirection = function(x, y) {

   //Set direction for sprite drawing
   switch (true) {
      case (this.Tile.X==x && this.Tile.Y==y+1):
	 this.Direction = DIRECTION.N;
	 break;
      case (this.Tile.X==x-1 && this.Tile.Y==y+1):
	 this.Direction = DIRECTION.NE;
	 break;
      case (this.Tile.X==x-1 && this.Tile.Y==y):
	 this.Direction = DIRECTION.E;
	 break;
      case (this.Tile.X==x-1 && this.Tile.Y==y-1):
	 this.Direction = DIRECTION.SE;
	 break;
      case (this.Tile.X==x && this.Tile.Y==y-1):
	 this.Direction = DIRECTION.S;
	 break;
      case (this.Tile.X==x+1 && this.Tile.Y==y-1):
	 this.Direction = DIRECTION.SW;
	 break;
      case (this.Tile.X==x+1 && this.Tile.Y==y):
	 this.Direction = DIRECTION.W;
	 break;
      case (this.Tile.X==x+1 && this.Tile.Y==y+1):
	 this.Direction = DIRECTION.NW;
	 break;
   }
   this.Tile.Set(x, y);

   //Send in appropriate direction
   GenieAgent.prototype.SetDestination.call(this, { X: (VAULT.TILE.W*x)+5, Y: (VAULT.TILE.H*y)+12 } );
   this.State.Motion = STATE.MOTION.ADVANCING;
};
VaultBayonetter.prototype.Update = function(x, y) {
   GenieAgent.prototype.Update.call(this);

   if (this.CheckAtDestination())
      this.State.Motion = STATE.MOTION.STATIONARY;
};
VaultBayonetter.prototype.Draw = function(x, y) {
   if (this.Direction<DIRECTION.S)
      GenieAgent.prototype.Draw.call(this, (2*this.Clan.Index)+this.Animation.State);
   else
      this.Sprite.DrawFlipped(this.Position.X+5, this.Position.Y, FLIPPED.HORIZONTAL, (2*this.Clan.Index)+this.Animation.State);

   //Bayonette
   switch (this.Direction) {
      case DIRECTION.N:
	 VerticalBayonetteSprite.Draw(this.Position.X+11, this.Position.Y-4);
	 break;
      case DIRECTION.NE:
	 DiagonalBayonetteSprite.Draw(this.Position.X+2, this.Position.Y-4, 0);
	 break;
      case DIRECTION.E:
	 HorizontalBayonetteSprite.Draw(this.Position.X-2, this.Position.Y-12);
	 break;
      case DIRECTION.SE:
	 DiagonalBayonetteSprite.Draw(this.Position.X+5, this.Position.Y-5, 1);
	 break;
      case DIRECTION.S:
	 VerticalBayonetteSprite.DrawFlipped(this.Position.X+3, this.Position.Y-3, FLIPPED.HORIZONTAL | FLIPPED.VERTICAL );
	 break;
      case DIRECTION.SW:
	 DiagonalBayonetteSprite.DrawFlipped(this.Position.X-4, this.Position.Y-3, FLIPPED.HORIZONTAL, 1);
	 break;
      case DIRECTION.W:
	 HorizontalBayonetteSprite.DrawFlipped(this.Position.X-2, this.Position.Y-12, FLIPPED.HORIZONTAL);
	 break;
      case DIRECTION.NW:
	 DiagonalBayonetteSprite.DrawFlipped(this.Position.X, this.Position.Y-4, FLIPPED.HORIZONTAL, 0);
	 break;
   }
};
