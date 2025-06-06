
//---------------------------------------------
//---------- TOLL PRESIDIO --------------------
var TollPresidio = function() {
   var GraphicsTool;
   var ScreenRect;
   var Location;
   var Unit;		//type manufactured - also has a flag indicating port (0x20)
   var Direction;	//REDUNDANT?
   var Clan;		//null means neutral
   var Garrison;	//can have 1-3 stacks, partly based on geography
};
TollPresidio.prototype = {
   Set(gTool, sRect) {
      this.GraphicsTool = gTool;
      this.ScreenRect = sRect;
      this.Location = new Coordinate2D();
/*
      this.Unit = this.Randomizer.GetInRange(0, UNIT.COUNT-2);  //TODO: actually this will be done elsewhere
      if (this.Unit==UNIT.BAYONETTER)
	 this.Unit = UNIT.BOMBER;
*/
   },
   CheckPort(tiles) {  //tiles- tile grid from Map
      if (tiles[this.Location.X][this.Location.Y-1].Type==TILE.CANAL || tiles[this.Location.X+1][this.Location.Y-1].Type==TILE.CANAL)	//N
	 this.Unit |= PRESIDIO.PORT;
      if (tiles[this.Location.X+2][this.Location.Y].Type==TILE.CANAL || tiles[this.Location.X+2][this.Location.Y+1].Type==TILE.CANAL)	//W
	 this.Unit |= PRESIDIO.PORT;
      if (tiles[this.Location.X][this.Location.Y+2].Type==TILE.CANAL || tiles[this.Location.X+1][this.Location.Y+2].Type==TILE.CANAL)	//S
	 this.Unit |= PRESIDIO.PORT;
      if (tiles[this.Location.X-1][this.Location.Y].Type==TILE.CANAL || tiles[this.Location.X-1][this.Location.Y+1].Type==TILE.CANAL)	//E
	 this.Unit |= PRESIDIO.PORT;
      if (tiles[this.Location.X-1][this.Location.Y-1].Type==TILE.CANAL || tiles[this.Location.X+2][this.Location.Y-1].Type==TILE.CANAL)	//NW-NE
	 this.Unit |= PRESIDIO.PORT;
      if (tiles[this.Location.X+2][this.Location.Y+2].Type==TILE.CANAL || tiles[this.Location.X-1][this.Location.Y+2].Type==TILE.CANAL)	//SE-SW
	 this.Unit |= PRESIDIO.PORT;
      return (this.Unit & PRESIDIO.PORT);
   },
   SetWaterfront() {  //ASSUMPTION: is already designated as a port
      this.Unit -= PRESIDIO.PORT;
      this.Unit |= PRESIDIO.WATERFRONT;
   },
   Draw() {  //-will have to have a separate TollPresidoImage class for drawing the 4 bi-colour pentagon shapes (depending on direction)
      if (this.Clan)
	 indx = this.Clan.Index;
      else
	 indx = CLAN.COUNT;
      coords.X = ((this.Location.X+1)*MAP.TILE.W) - this.ScreenRect.L;
      coords.Y = ((this.Location.Y+1)*MAP.TILE.H) - this.ScreenRect.T;
      this.GraphicsTool.DrawPolygon(coords.X, coords.Y, PresidioInnerPentagon, ClanColours[indx][0], 0);	//inner pentagon
      this.GraphicsTool.DrawPolygon(coords.X, coords.Y, PresidioInnerPentagon, MedianColours[indx], 5);		//wall shadow
      for (indx2=0;indx2<PresidioOuterPentagon.length;++indx2)
	 this.GraphicsTool.DrawCircle(coords.X+PresidioInnerPentagon[indx2].X, coords.Y+PresidioInnerPentagon[indx2].Y, 11, MedianColours[indx], 0);  //tower shadow
      this.GraphicsTool.DrawPolygon(coords.X, coords.Y, PresidioOuterPentagon, ClanColours[indx][1], 5);	//wall
      for (indx2=0;indx2<PresidioOuterPentagon.length;++indx2) {
	 this.GraphicsTool.DrawCircle(coords.X+PresidioOuterPentagon[indx2].X, coords.Y+PresidioOuterPentagon[indx2].Y, 12, ClanColours[indx][0], 0);  //tower wall
	 this.GraphicsTool.DrawCircle(coords.X+PresidioOuterPentagon[indx2].X, coords.Y+PresidioOuterPentagon[indx2].Y, 10, ClanColours[indx][1], 5);  //tower floor
      }
   },
   CheckOnScreen() {
      rect.Set((this.ScreenRect.L/MAP.TILE.W)-1, (this.ScreenRect.T/MAP.TILE.H)-1, SCREEN.TILE.C, SCREEN.TILE.R);
      return (SpaceUtils.CheckPointInBox(this.Location, rect));
   }
};
