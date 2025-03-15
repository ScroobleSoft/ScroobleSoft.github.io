
MatchPlayer.prototype.Draw = function() {

   if (this.Home) {
      this.ReColour( [ "grey", TeamColours[this.Team.Index][0] ] );
      this.ReColour( [ "darkgrey", TeamColours[this.Team.Index][1] ] );
   } else {
      this.ReColour( [ "grey", TeamColours[this.Team.Index][1] ] );
      this.ReColour( [ "darkgrey", TeamColours[this.Team.Index][0] ] );
   }
   GenieAgent.prototype.Draw.call(this);
   if (this.Home) {
      this.ReColour( [ TeamColours[this.Team.Index][0], "grey" ] );
      this.ReColour( [ TeamColours[this.Team.Index][1], "darkgrey" ] );
   } else {
      this.ReColour( [ TeamColours[this.Team.Index][1], "grey" ] );
      this.ReColour( [ TeamColours[this.Team.Index][0], "darkgrey" ] );
   }

   if (this.Unit) {  //check is TEMP
      strng = this.Unit.Name.Last + " " + Utilities.NumberToGrade(this.Unit.Quality);
      if (this.Home)
	 colour = TeamColours[this.Team.Index][0];
      else
	 colour = TeamColours[this.Team.Index][1];
      this.TextWriter.Write(strng, this.ScreenCoords.X, this.ScreenCoords.Y-this.Sprite.Height-3, { FONT: "10px Arial", COLOUR: colour } );
   }
};

//------------------------------------------------

SideViewPlayer.prototype.Draw = function() {

   //UNLOGGED

   if (this.Unit)	//TEMP
      this.ReColour();

   this.DetermineScreenCoords();

   //Flip if necessary
   if (this.Direction==DIRECTION.W) {
      this.Sprite.Context.scale(-1, 1);
      this.ScreenCoords.X += this.Sprite.Specs.W + this.Sprite.Specs.O;
      this.ScreenCoords.X = -this.ScreenCoords.X;
   }
//   MatchPlayer.prototype.Draw.call(this);  //TODO: bypass this to draw in-function flipped if needed

   this.ExecuteDraw();

   //Re-flip if necessary
   if (this.Direction==DIRECTION.W) {
      this.Sprite.Context.scale(-1, 1);
      this.ScreenCoords.X = -this.ScreenCoords.X;
      this.ScreenCoords.X -= this.Sprite.Specs.W + this.Sprite.Specs.O;
   }

   if (this.Unit) {  //check is TEMP
      strng = this.Unit.Name.Last + " " + Utilities.NumberToGrade(this.Unit.Quality);
      if (this.Home)
	 colour = TeamColours[this.Team.Index][0];
      else
	 colour = TeamColours[this.Team.Index][1];
      this.TextWriter.Write(strng, this.ScreenCoords.X, this.ScreenCoords.Y-this.Sprite.Height-3, { FONT: "10px Arial", COLOUR: colour } );
   }
};
SideViewPlayer.prototype.ReColour = function() {  //NOTE: hair colour won't be changed here

   switch (this.Direction) {
      case DIRECTION.N:
      case DIRECTION.S:
	 for (this.i=0;this.i<FrontFootballerSprite.Specs.GS.length;++this.i) {
	    FrontFootballerSprite.Specs.GS[this.i][0][1] = TeamColours[this.Team.Index][0];
	    FrontFootballerSprite.Specs.GS[this.i][1][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][2][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][3][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][4][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][5][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][7][1] = TeamColours[this.Team.Index][1];
	    FrontFootballerSprite.Specs.GS[this.i][6][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][8][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][9][1] = Complexions[this.Unit.Complexion];
	    FrontFootballerSprite.Specs.GS[this.i][10][1] = TeamColours[this.Team.Index][2];
	    FrontFootballerSprite.Specs.GS[this.i][11][1] = TeamColours[this.Team.Index][2];
	 }
	 break;
      case DIRECTION.E:
      case DIRECTION.W:
	 for (this.i=0;this.i<ReColourData.length;++this.i)
	    switch (ReColourData[this.i][2]) {
	       case 0:
		  LeftFootballerSprite.Specs.GS[ReColourData[this.i][0]][ReColourData[this.i][1]][1] = Complexions[this.Complexion];
		  break;
	       case 1:
		  LeftFootballerSprite.Specs.GS[ReColourData[this.i][0]][ReColourData[this.i][1]][1] = TeamColours[this.Team.Index][0];
		  break;
	       case 2:
		  LeftFootballerSprite.Specs.GS[ReColourData[this.i][0]][ReColourData[this.i][1]][1] = TeamColours[this.Team.Index][1];
		  break;
	       case 3:
		  LeftFootballerSprite.Specs.GS[ReColourData[this.i][0]][ReColourData[this.i][1]][1] = TeamColours[this.Team.Index][2];
		  break;
	    }
	 break;
   }
};
