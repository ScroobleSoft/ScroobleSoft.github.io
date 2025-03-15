
//-----------------------------------------------
//---------- SIDeVIEW PLAYER --------------------
var SideViewPlayer = function() {
   var Team;
};
SideViewPlayer.prototype = new MatchPlayer();
SideViewPlayer.prototype.Set = function(specs, sprite) {
   MatchPlayer.prototype.Set.call(this, specs, sprite);

};
SideViewPlayer.prototype.SetDestination = function(dstntn) {
   MatchPlayer.prototype.SetDestination.call(this, dstntn);

   this.Angle = GeoUtils.GetAngle(this.Position, this.Destination);
   switch (true) {
      case (this.Angle>315 && this.Angle<=45):
	 this.Direction = DIRECTION.N;
	 break;
      case (this.Angle>45 && this.Angle<=135):
	 this.Direction = DIRECTION.E;
	 break;
      case (this.Angle>135 && this.Angle<=225):
	 this.Direction = DIRECTION.S;
	 break;
      case (this.Angle>225 && this.Angle<=315):
	 this.Direction = DIRECTION.W;
	 break;
   }
};
SideViewPlayer.prototype.DetermineScreenCoords = function() {

   this.ScreenCoords.X = this.Position.X - (PITCH.SIDeVIEW.W/2);
   this.ScreenCoords.X -= (PITCH.SIDeVIEW.TOUChLINE.FAR.L.X-PITCH.SIDeVIEW.TOUChLINE.NEAR.L.X) * ((PITCH.SIDeVIEW.B-this.Position.Y)/PITCH.SIDeVIEW.B) *
			  (this.ScreenCoords.X/(PITCH.SIDeVIEW.W/2));
   this.ScreenCoords.X += PITCH.SIDeVIEW.W/2;
   this.ScreenCoords.Y = PITCH.SIDeVIEW.T + (this.Position.Y/(PITCH.SIDeVIEW.B/PITCH.SIDeVIEW.H));

   this.ScreenCoords.X -= this.ScreenRect.L;

   if (this.State.Motion==STATE.MOTION.STATIONARY) {
      this.ScreenCoords.X = Math.round(this.ScreenCoords.X);
      this.ScreenCoords.Y = Math.round(this.ScreenCoords.Y);
   }
};
SideViewPlayer.prototype.ExecuteDraw = function() {

   //Recolour and draw sprite
   switch (this.Direction) {
      case DIRECTION.N:
	this.DrawFront();
	break;
      case DIRECTION.E:
	this.DrawLeft();
	break;
      case DIRECTION.S:
	this.DrawBack();
	break;
      case DIRECTION.W:
	this.DrawRight();
	break;
   }

   this.WriteName();	//TODO: an option will be added to switch this on or off
};
SideViewPlayer.prototype.WriteName = function() {  //TODO: teams will switch attacking direction at half-time; also, adjust possible kit colour clashes

   if (this.Unit) {  //check is TEMP
      this.info = this.Unit.Name.Last + " " + Utils.NumberToGrade(this.Unit.Quality);
/*  TODO: line below will be replaced by this -
 *  if (this.Team===this.Match.HomeTeam)
 */ 
      if (this.Home)
	 colour = "white";
      else
	 colour = "black";
      this.TextWriter.Write(this.info, this.ScreenCoords.X, this.ScreenCoords.Y-this.Sprite.Specs.H-7, { FONT: "10px Arial", COLOUR: colour } );
   }
};
SideViewPlayer.prototype.DrawFront = function() {

   //TODO: adjust for gender

   this.RecolourSprite(FrontFootballerSprite);
   FrontFootballerSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Animation.State);
   FrontHairSprite.Draw(this.ScreenCoords.X+this.Specs.HAIR.FRONT.X, this.ScreenCoords.Y+this.Specs.HAIR.FRONT.Y, this.HairColour);
   this.ResetSpriteColour(FrontFootballerSprite);
};
SideViewPlayer.prototype.DrawLeft = function() {

   //TODO: adjust for gender

   this.RecolourSprite(LeftFootballerSprite);
   LeftFootballerSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Animation.State);
   LeftHairSprite.Draw(this.ScreenCoords.X+this.Specs.HAIR.LEFT.X, this.ScreenCoords.Y+this.Specs.HAIR.LEFT.Y, this.HairColour);
   this.ResetSpriteColour(LeftFootballerSprite);
};
SideViewPlayer.prototype.DrawBack = function() {

   //TODO: adjust for gender

   this.RecolourSprite(BackFootballerSprite);
   BackFootballerSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Animation.State);
   BackHairSprite.Draw(this.ScreenCoords.X+this.Specs.HAIR.BACK.X, this.ScreenCoords.Y+this.Specs.HAIR.BACK.Y, this.HairColour);
   this.ResetSpriteColour(BackFootballerSprite);
};
SideViewPlayer.prototype.DrawRight = function() {

   //TODO: adjust for gender

   this.RecolourSprite(RightFootballerSprite);
   RightFootballerSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.Animation.State);
   RightHairSprite.Draw(this.ScreenCoords.X+this.Specs.HAIR.RIGHT.X, this.ScreenCoords.Y+this.Specs.HAIR.RIGHT.Y, this.HairColour);
   this.ResetSpriteColour(RightFootballerSprite);
};
SideViewPlayer.prototype.RecolourSprite = function(sprite) {  //TODO: move to base class

   if (this.Match) {  //TEMP check
   for (this.i=0;this.i<sprite.MultiShapes[this.Animation.State].length;++this.i) {
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="brown")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = Complexions[this.Complexion];
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="grey")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = this.ShirtColour;
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="cyan")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = this.ShortsColour;
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="gold")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = this.BootsColour;
   }
   } else {  //this block will become REDUNDANT
   for (this.i=0;this.i<sprite.MultiShapes[this.Animation.State].length;++this.i) {
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="brown")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = Complexions[this.Complexion];
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="grey")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = TeamColours[this.Team.Index][0];
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="cyan")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = TeamColours[this.Team.Index][1];
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour=="gold")
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = TeamColours[this.Team.Index][2];
   }
   }
};
SideViewPlayer.prototype.ResetSpriteColour = function(sprite) {

   if (this.Match) {  //TEMP check
   for (this.i=0;this.i<sprite.MultiShapes[this.Animation.State].length;++this.i) {
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==Complexions[this.Complexion])
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "brown";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==this.ShirtColour)
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "grey";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==this.ShortsColour)
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "cyan";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==this.BootsColour)
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "gold";
   }
   } else {  //this block will become REDUNDANT
   for (this.i=0;this.i<sprite.MultiShapes[this.Animation.State].length;++this.i) {
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==Complexions[this.Complexion])
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "brown";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==TeamColours[this.Team.Index][0])
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "grey";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==TeamColours[this.Team.Index][1])
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "cyan";
      if (sprite.MultiShapes[this.Animation.State][this.i].Colour==TeamColours[this.Team.Index][2])
	 sprite.MultiShapes[this.Animation.State][this.i].Colour = "gold";
   }
   }
};
