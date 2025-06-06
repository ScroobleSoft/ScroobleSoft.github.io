/*
 *  - might need separate ones for army/navy/airforce (actually for sure this will be the case)
 */
//----------------------------------------------
//----------- TOLL BATTLE ----------------------
var TollBattle = function() {

   var Randomizer;
   var LeftClan, RightClan;
   var LeftStack, RightStack;
   var TileGrid, Tile;
   var Direction;	//for movement - can be up-forward, forward or down-forward
};
TollBattle.prototype = {

   Set(rGenerator) {

      this.Randomizer = rGenerator;
      this.LeftStack = new AgentArray();
      this.RightStack = new AgentArray();
      this.TileGrid = Utilities.Create2DArray(16, 15);  //16 rows, 14-15 columns
      this.Tile = new Coordinate2D();
   },

   SetStacks(lStck, rStck) {

      //UNLOGGED - will replace ::SetPositions
/*
      this.LeftStack = lStck;
      this.RightStack = rStck;
*/
      //Set positions
      for (indx=0;indx<16;++indx) {  //TODO: depending on size of stack, iteration will be other than incremental (in fact, will need an array of indices)
	 this.LeftStack[indx].SetTile(BattleField.BottomGrid[0][indx]);
	 this.RightStack[indx].SetTile(BattleField.BottomGrid[BATTLeFIELD.TILE.C-1][indx]);
      }
   },

   SetPositions() {  //now REDUNDANT

      //Combatant positions
      for (indx=0;indx<16;++indx) {
	 this.LeftStack[indx].SetPosition(0, indx);
	 if (indx % 2)
	    this.RightStack[indx].SetPosition(12, indx);
	 else
	    this.RightStack[indx].SetPosition(13, indx);
/*
	 this.LeftStack[indx].SetPosition(BattleField.BottomGrid[0][indx]);
//	 BattleField.BottomGrid[0][indx].Unit = this.LeftStack[indx];
	 this.RightStack[indx].SetPosition(BattleField.BottomGrid[BATTLeFIELD.TILE.C-1][indx]);
//	 BattleField.BottomGrid[BATTLeFIELD.TILE.C-1][indx].Unit = this.RightStack[indx];
*/
      }

      //Tiles - TODO: instead, entries will be pointers to agents, set by agents themselves
      for (indx=0;indx<16;++indx) {
	 this.TileGrid[indx][0] = 1;
	 if (indx % 2)
	    this.TileGrid[indx][12] = 1;
	 else
	    this.TileGrid[indx][13] = 1;
      }
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));
/*
      if (Mouse.CheckLeftClicked(CANVAS.PRIME))
	 if (!this.LeftStack.UpdateSelection())  //TODO: after this, check if a foe was clicked
	    if (this.GetTileClicked()) {
	       if (!this.TileGrid[this.Tile.X][this.Tile.Y] && this.LeftStack.SelectedAgent)
		  if (this.LeftStack.SelectedAgent.CheckTileAdjacent(this.Tile)) {
		     this.TileGrid[this.Tile.X][this.Tile.Y] = 1;								//mark tile as occupied
		     this.TileGrid[this.LeftStack.SelectedAgent.Tile.X][this.LeftStack.SelectedAgent.Tile.Y] = 0;		//mark tile as clear
		     this.LeftStack.SelectedAgent.SetDestination(this.Tile.X, this.Tile.Y);
		     this.LeftStack.SelectedAgent.State.Motion = STATE.MOTION.ADVANCING;
		     this.MoveFoePiece();
		  }
	    } else
	       NoEntrySprite.Draw(Mouse.ClickX+5, Mouse.ClickY+5);
*/
      if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
	 if (!this.LeftStack.UpdateSelection()) {
	    this.Tile = BattleField.GetTile(Mouse.Click);
	    if (this.Tile) {
	    }
	 } else {  //TODO: after this, check if a foe was clicked
	 }
      }

      BattleField.Draw();
      this.LeftStack.forEach(function(agnt){if (agnt.State.Motion==STATE.MOTION.STATIONARY) agnt.DrawShield()});
      this.RightStack.forEach(function(agnt){if (agnt.State.Motion==STATE.MOTION.STATIONARY) agnt.DrawShield()});
      this.LeftStack.forEach(function(agnt){agnt.Draw()});
      this.RightStack.forEach(function(agnt){agnt.Draw()});
/*
      this.LeftStack.forEach(function(agnt){agnt.DisplayStatus()});
      this.RightStack.forEach(function(agnt){agnt.DisplayStatus()});
*/
      this.LeftStack.forEach(function(agnt){agnt.Update()});
      this.RightStack.forEach(function(agnt){agnt.Update()});
   },
   MoveFoePiece() {

      //UNLOGGED

      //Randomly pick a movable piece and a direction to move
      do {
	 indx = this.Randomizer.GetInRange(0, 15);
	 this.Direction = this.Randomizer.GetInRange(0, 2);
/*
	 switch (this.Direction) {
	    case 0:						//NW
	       if (this.RightStack[indx].Tile.Y % 2)
		  coords.X = this.RightStack[indx].Tile.X;
	       else
		  coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y - 1;
	       break;
	    case 1:						//W
	       coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y;
	       break;
	    case 2:						//SW
	       if (this.RightStack[indx].Tile.Y % 2)
		  coords.X = this.RightStack[indx].Tile.X;
	       else
		  coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y + 1;
	       break;
	 }
*/
	 if (this.Direction==0) {				//NW
	    if (this.RightStack[indx].Tile.Y % 2)
		  coords.X = this.RightStack[indx].Tile.X;
	    else
		  coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y - 1;
	 } else if (this.Direction==1) {			//W
	       coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y;
	 } else if (this.Direction==2) {			//SW
	       if (this.RightStack[indx].Tile.Y % 2)
		  coords.X = this.RightStack[indx].Tile.X;
	       else
		  coords.X = this.RightStack[indx].Tile.X - 1;
	       coords.Y = this.RightStack[indx].Tile.Y + 1;
	 }
      } while (this.TileGrid[coords.X][coords.Y] || !this.CheckValidSpot(coords.X, coords.Y));

      //Move piece
      this.TileGrid[this.RightStack[indx].Tile.X][this.RightStack[indx].Tile.Y] = 0;
      switch (this.Direction) {
	 case 0:
	    this.RightStack[indx].MoveUp();
	    break;
	 case 1:
	    this.RightStack[indx].MoveForward();
	    break;
	 case 2:
	    this.RightStack[indx].MoveDown();
	    break;
      }
      this.TileGrid[this.RightStack[indx].Tile.X][this.RightStack[indx].Tile.Y] = 1;
      this.RightStack[indx].State.Motion = STATE.MOTION.ADVANCING;
   },
   CheckValidSpot(x, y) {
      if (x<0 || x>13)
	 return (false);
      if (y<0 || y>15)
	 return (false);
      if ((y % 2) && x>12)
	 return (false);

      return (true);
   },
   GetTileClicked() {
      if (Mouse.ClickX<20 || Mouse.ClickX>580 || Mouse.ClickY<20 || Mouse.ClickY>340)
	 return (false);
      this.Tile.Y = Math.floor((Mouse.ClickY-20)/20);
      if (this.Tile.Y % 2)
	 this.Tile.X = Math.floor((Mouse.ClickX-40)/40);
      else
	 this.Tile.X = Math.floor((Mouse.ClickX-20)/40);
      if ((this.Tile.Y % 2) && (Mouse.ClickX<40 || Mouse.ClickX>560))
	 return (false);
      return (true);
   }
};
