
//-----------------------------------------
//---------- TOLL UNIT --------------------	TODO: this is more like BattleAgent - TollUnit should be used for stack contents
var TollUnit = function() {
   var Type;
   var Clan;
   var Tile;
   var Ammo;
   var Charge;
   var Shield;
   var TileGrid;	//probably REDUNDANT

   //TEMP - should eventually be in GenieAgent
   var BoundingShapes, BoundingPolygon;
};
TollUnit.prototype = new GenieAgent();
TollUnit.prototype.Set = function(specs, sprite, drctn) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.Tile = new Coordinate2D();
   this.Shield = UNIT.SHIELD;
   this.Charge = UNIT.CHARGE;
   this.Direction = drctn;

   //TEMP - should eventually be in GenieAgent
   if (this.Specs)
      if (this.Specs.BP)
	 this.BoundingPolygon = Utilities.CreateArray(this.Specs.BP.length, Coordinate2D);
};
TollUnit.prototype.SetLinks = function(gTool) {
   this.GraphicsTool = gTool;
};
TollUnit.prototype.SetExtraLinks = function(tGrid) {  //t- tile . . . to be REDUNDANT
   this.TileGrid = tGrid;
};
TollUnit.prototype.SetClan = function(cln) {
   this.Clan = cln;
};
TollUnit.prototype.SetTile = function(tile) {

   //UNLOGGED - will most likely replace ::SetPosition

//   offst = Math.round((40-this.Sprite.Width)/2);
   coords.X = tile.X + SpriteOffsets[this.Type];
   coords.Y = tile.Y + BATTLeFIELD.TILE.H - 2;
   this.SetPosition(coords);
   tile.Unit = this;						//point tile occupied to agent
   this.Tile.Unit = null;					//make sure previous tile is now empty
   this.Tile = tile;
};
/*
TollUnit.prototype.SetPosition = function(x, y) {
   this.Tile.Set(x, y);
   offst = Math.round((40-this.Sprite.Width)/2);
   if (y % 2)
      offst += 20;

   //TODO: have to take .B (breadth) into account

   GenieAgent.prototype.SetPosition.call(this, { X: 12+(40*x)+offst, Y: 38+(16*y) } );
};
*/
TollUnit.prototype.SetDestination = function(x, y) {
   this.Tile.Set(x, y);
   offst = Math.round((40-this.Sprite.Width)/2);
   if (y % 2)
      offst += 20;

   GenieAgent.prototype.SetDestination.call(this, { X: 12+(40*x)+offst, Y: 38+(16*y) } );
};
TollUnit.prototype.SetMove = function(tile) {
   this.Tile.Set(x, y);
   offst = Math.round((40-this.Sprite.Width)/2);
   if (y % 2)
      offst += 20;

   GenieAgent.prototype.SetDestination.call(this, { X: 12+(40*x)+offst, Y: 38+(16*y) } );
};
TollUnit.prototype.ScanTarget = function() {

   //UNLOGGED - TODO: for this to work, each tile will have to point to agent on it

   for (this.i=1;this.i<=6;++this.i) {
      if (this.Direction==DIRECTION.E)
	 this.x = this.Tile.X + this.i;
      else
	 this.x = this.Tile.X - this.i;
      if (this.x<0 || this.x>13)
	 return;
      if ((this.Tile.Y % 2) && this.x>12)
	 return;
      if (this.TileGrid[this.x][this.Tile.Y].Agent)
	 if (this.Clan.Index!=this.TileGrid[this.x][this.Tile.Y].Agent.Clan.Index) {
	    this.Target = this.TileGrid[this.x][this.Tile.Y];
	    return;
	 }
   }
};
TollUnit.prototype.CheckTileAdjacent = function(tile) {
   if (this.Tile.X==tile.X && this.Tile.Y==tile.Y)	//check if same tile is clicked
      return (false);
   if (Math.abs(this.Tile.X-tile.X)<=1 && Math.abs(this.Tile.Y-tile.Y)<=1) {
      if (tile.Y % 2) {
	 if (this.Tile.X-tile.X==-1 && (Math.abs(this.Tile.X-tile.X==1)))
	    return (false);
      } else {
	 if (this.Tile.X-tile.X==1 && (Math.abs(this.Tile.X-tile.X==1)))
	    return (false);
      }
      return (true);
   }
   return (false);
};
TollUnit.prototype.MoveUp = function() {

   if (this.Direction==DIRECTION.E) {
      if (this.Tile.Y % 2)
	 this.SetDestination(this.Tile.X+1, this.Tile.Y-1);
      else
	 this.SetDestination(this.Tile.X, this.Tile.Y-1);
   } else {
      if (this.Tile.Y % 2)
	 this.SetDestination(this.Tile.X, this.Tile.Y-1);
      else
	 this.SetDestination(this.Tile.X-1, this.Tile.Y-1);
   }
};
TollUnit.prototype.MoveForward = function() {
   if (this.Direction==DIRECTION.E)
      this.SetDestination(this.Tile.X+1, this.Tile.Y);
   else
      this.SetDestination(this.Tile.X-1, this.Tile.Y);
};
TollUnit.prototype.MoveDown = function() {
   if (this.Direction==DIRECTION.E) {
      if (this.Tile.Y % 2)
	 this.SetDestination(this.Tile.X+1, this.Tile.Y+1);
      else
	 this.SetDestination(this.Tile.X, this.Tile.Y+1);
   } else {
      if (this.Tile.Y % 2)
	 this.SetDestination(this.Tile.X, this.Tile.Y+1);
      else
	 this.SetDestination(this.Tile.X-1, this.Tile.Y+1);
   }
};
TollUnit.prototype.TurnAround = function() {

   //UNLOGGED

};
TollUnit.prototype.DrawShield = function() {  //NOTE: drawn only when stationary
/*
   if (this.Tile.Y % 2)
      this.GraphicsTool.DrawRectangle((40*this.Tile.X)+30, (16*this.Tile.Y)+26, 38, 14, ClanColours[this.Clan.Index][0], 0, this.Shield/16);
   else
      this.GraphicsTool.DrawRectangle((40*this.Tile.X)+14, (16*this.Tile.Y)+26, 38, 14, ClanColours[this.Clan.Index][0], 0, this.Shield/16);
*/

   this.GraphicsTool.DrawRectangle(this.Tile.X+1, this.Tile.Y+1, BATTLeFIELD.TILE.W-1, BATTLeFIELD.TILE.H-1, ClanColours[this.Clan.Index][0], 0, this.Shield/16);

   //Draw selection indicator if applicable
   if (this.CheckSelected())
      this.GraphicsTool.DrawRectangle(this.Tile.X+1, this.Tile.Y+1, BATTLeFIELD.TILE.W-1, BATTLeFIELD.TILE.H-1, "red", 1);
};
TollUnit.prototype.DisplayStatus = function() {  //REDUNDANT

   //Determine display location
   this.x = 20 + (40*this.Tile.X);
   if (this.Tile.Y % 2)
      this.x += 20;
   this.y = 368 + (14*this.Tile.Y);

   //Draw charge indicator
   for (this.i=0;this.i<3;++this.i)
      this.GraphicsTool.DrawRectangle(this.x+9+(7*this.i), this.y, 8, 8, "black", 1);
   for (this.i=0;this.i<this.Charge;++this.i)
      this.GraphicsTool.DrawRectangle(this.x+10+(7*this.i), this.y+1, 6, 6, "red", 0);

   //Draw shield status . . . NOT: this gives a clearer indicator of its condition
   this.GraphicsTool.DrawRectangle(this.x+3, this.y+9, 34, 4, "black", 1);
   for (this.i=0;this.i<this.Shield;++this.i)
      if (this.i % 2)
	 this.GraphicsTool.DrawRectangle(this.x+4+(2*this.i), this.y+10, 2, 2, GREY.MEDIUM, 1);
      else
	 this.GraphicsTool.DrawRectangle(this.x+4+(2*this.i), this.y+10, 2, 2, GREY.SILVER, 1);
};
TollUnit.prototype.Draw = function() {
   if (this.State.Motion==STATE.MOTION.STATIONARY) {
      this.Position.X = Math.round(this.Position.X);
      this.Position.Y = Math.round(this.Position.Y);
   }
   this.ScreenCoords.Set(this.Position.X, this.Position.Y);
   if (this.Direction==DIRECTION.W)
      this.Sprite.DrawFlipped(this.Position.X, this.Position.Y, FLIPPED.HORIZONTAL, (3*this.Clan.Index)+this.Animation.State);
   else
      this.Sprite.Draw(this.Position.X, this.Position.Y, (3*this.Clan.Index)+this.Animation.State);
   if (this.Selected)
      this.DrawSelectionIndicator();
};
TollUnit.prototype.UpdateBoundingPolygon = function() {  //NOTE: this is obviously screen oriented since .ScreenCoordinates are being used
   for (this.i=0;this.i<this.BoundingPolygon.length;++this.i) {
      this.BoundingPolygon[this.i].X = this.ScreenCoords.X + this.Specs.BP[this.i][0];
      this.BoundingPolygon[this.i].Y = this.ScreenCoords.Y + this.Specs.BP[this.i][1];
   }
};
TollUnit.prototype.CheckClicked = function() {

   //LOGGED - trying this here, though it ultimately belongs in GenieAgent

   if (this.BoundingPolygon) {
      this.UpdateBoundingPolygon();
      return (SpaceUtils.CheckPointInPolygon(Mouse.GetClickCoordinates(), this.BoundingPolygon));
   } else if (this.Specs.BS) {
      for (this.i=0;this.i<this.Specs.BS.length;++this.i)
	 switch (this.Specs.BS[this.i][0]) {
	    case SHAPE.CIRCLE:
	       coords.X = this.Position.X + this.Specs.BS[this.i][1][0];
	       coords.Y = this.Position.Y + this.Specs.BS[this.i][1][1];
	       if (Utilities.CheckPointInCircle(Mouse.GetClickCoordinates(), coords, this.Specs.BS[this.i][1][2]))
		  return (true);
	       break;
	    case SHAPE.RECTANGLE:
	       rect.L = this.Position.X + this.Specs.BS[this.i][1][0];
	       rect.T = this.Position.Y + this.Specs.BS[this.i][1][1];
	       rect.W = this.Specs.BS[this.i][1][2];
	       rect.H = this.Specs.BS[this.i][1][3];
	       if (Utilities.CheckPointInBox(Mouse.GetClickCoordinates(), rect))
		  return (true);
	       break;
	 }
   } else
      return (GenieAgent.prototype.CheckClicked.call(this));
   return (false);
};
