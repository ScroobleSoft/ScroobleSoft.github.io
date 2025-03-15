/*
 *  one element that can be added to get a basic game going is playing 1-2s, between RM-RCM and LM-LCM, maybe even FB's bombing forward
 *  and combining with wide midfielders; similarly, same thing can be done with wingers and strikers, the next step being triangles of
 *  the RM-LCM-RM variety
 */
var POSSESSION = { NEITHER: 0, HOME: 1, AWAY: 2 };
var TempPlayers = [ ArsenalPlayers, BournemouthPlayers, BrightonPlayers, BurnleyPlayers, EvertonPlayers ];

//--------------------------------------------------------
//---------- FOOTBALL MATCH SIDE VIEW --------------------
var FootballMatchSideView = function() {
   var Screen;
   var GraphicsTool, Randomizer;
   var AnimationFrameHandle;
   var ScreenRect;

   var Pitch;
   var Match;

   var GameStarted;  //TEMP
   var Possession;  //TEMP
   var PossessionPlayerIndex;  //TEMP
   var Goal;	//TEMP

   var i, x, player;  //TEMP
};
FootballMatchSideView.prototype = {
   Set(cntxt, gTool, rGenerator, match) {  //TODO: match will be non-graphical simulation of the contest
      var i;

      this.Screen = cntxt;
      this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
      this.ScreenRect = new GenieRect();
      this.ScreenRect.Set(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

//      this.Pitch = new BufferedSideViewFootballPitch();
//      this.Pitch.Set(this.Screen, this.GraphicsTool);
      this.Pitch = SideViewPitch;

      this.x = 0;
      this.ScreenRect.L = 0;
      this.ScreenRect.T = 0;

      HomeGoalkeeper.ScreenRect = this.ScreenRect;
      AwayGoalkeeper.ScreenRect = this.ScreenRect;
      HomeGoalkeeper.Quality = this.Randomizer.GetInRange(9);
      AwayGoalkeeper.Quality = this.Randomizer.GetInRange(9);
      HomeGoalkeeper.Name = this.GetLastName();
      AwayGoalkeeper.Name = this.GetLastName();
      for (i=0;i<PLAYERS.OUTFIELD;++i) {
	 HomeOutfieldPlayers[i].ScreenRect = this.ScreenRect;
	 AwayOutfieldPlayers[i].ScreenRect = this.ScreenRect;
	 HomeOutfieldPlayers[i].Quality = this.Randomizer.GetInRange(15);
	 HomeOutfieldPlayers[i].Name = this.GetLastName();
	 AwayOutfieldPlayers[i].Quality = this.Randomizer.GetInRange(15);
	 AwayOutfieldPlayers[i].Name = this.GetLastName();
      }
/* NOTE: commented out below since player positions are not set as yet
      //TEMP - randomly select a player to start in possession
      this.PossessionPlayerIndex = Utilities.GetRandomNumber(PLAYERS.OUTFIELD-2, STARtAtZERO);  //NOTE: anyone but strikers
      if (Utilities.GetRandomNumber(2)==2) {
	 Football.Position.X = HomeOutfieldPlayers[this.PossessionPlayerIndex].Position.X + LeftFootballerSprite.Width;
	 Football.Position.Y = HomeOutfieldPlayers[this.PossessionPlayerIndex].Position.Y;
	 this.Possession = POSSESSION.HOME;
      } else {
	 Football.Position.X = AwayOutfieldPlayers[this.PossessionPlayerIndex].Position.X;
	 Football.Position.Y = AwayOutfieldPlayers[this.PossessionPlayerIndex].Position.Y;
	 this.Possession = POSSESSION.AWAY;
      }
*/
      Football.ScreenRect = this.ScreenRect;
   },
   SetMatch(match) {

      //UNLOGGED

      this.Match = match;
   },
   GetLastName() {  //TEMP
      var i;

      i = this.Randomizer.GetIndex(TempPlayers.length);
      return (TempPlayers[i][this.Randomizer.GetIndex(TempPlayers[i].length)][0][1]);
//      i = Utilities.GetRandomNumber(TempPlayers.length, STARtAtZERO);
//      return (TempPlayers[i][Utilities.GetRandomNumber(TempPlayers[i].length, STARtAtZERO)][0][1]);
   },
   Operate() {

//      this.AnimationFrameHandle = requestAnimationFrame(this.Operate.bind(this));

      //move buffered image side to side - later, track ball so that it is always in centre of screen

      //Centre screen on the ball
      this.x = Math.round(Football.Position.X-(SCREEN.WIDTH/2));
      if (this.x<0)
	 this.x = 0;
      if (this.x>SIDeVIEwFOOTBALlPITCH.WIDTH-SCREEN.WIDTH)
	 this.x = SIDeVIEwFOOTBALlPITCH.WIDTH-SCREEN.WIDTH;

      this.Pitch.Draw();
return;
      //Draw goalkeeper and outfield players
      this.ScreenRect.L = this.x;
      if (SpaceUtils.CheckPointInBox(HomeGoalkeeper.Position, this.ScreenRect))
	 HomeGoalkeeper.Draw();
      if (SpaceUtils.CheckPointInBox(AwayGoalkeeper.Position, this.ScreenRect))
	 AwayGoalkeeper.Draw();
      for (this.i=0;this.i<PLAYERS.OUTFIELD;++this.i) {
	 if (SpaceUtils.CheckPointInBox(HomeOutfieldPlayers[this.i].Position, this.ScreenRect))
	    HomeOutfieldPlayers[this.i].Draw();
	 if (SpaceUtils.CheckPointInBox(AwayOutfieldPlayers[this.i].Position, this.ScreenRect))
	    AwayOutfieldPlayers[this.i].Draw();
      }

      Football.Draw();

      FootieController.CheckControls();
      if (FootieController.Left)  --this.x;
      if (FootieController.Right) ++this.x;
      if (this.x<0)
	 this.x = 0;
      if (this.x>SIDeVIEwFOOTBALlPITCH.WIDTH-SCREEN.WIDTH)
	 this.x = SIDeVIEwFOOTBALlPITCH.WIDTH-SCREEN.WIDTH;
      if (FootieController.Up)
	 cancelAnimationFrame(this.AnimationFrameHandle);

      if (Mouse.CheckLeftClicked())
	 if (!this.GameStarted) {
	    this.PassBall();
	    this.GameStarted = true;
	 }

      //Update ball
      if (this.GameStarted)
	 if (Football.CheckAtDestination())
	    this.PassBall();  //actually pass or shoot
	 else
	    Football.Move();
   },
   PassBall() {  //actually pass or shoot
      if (this.PossessionPlayerIndex==(PLAYERS.OUTFIELD-1) || this.PossessionPlayerIndex==(PLAYERS.OUTFIELD-2)) {
//	 if (Utilities.GetRandomNumber(5)==5) {  //20% chance of being clear
	    this.Shoot();
	    return;
	 }

      this.player = this.Randomizer.GetIndex(PLAYERS.OUTFIELD);
      if (this.player!=this.PossessionPlayerIndex) {
	 if (this.Possession==POSSESSION.HOME)
	    Football.SetDestination(HomeOutfieldPlayers[this.player].Position);
	 else
	    Football.SetDestination(AwayOutfieldPlayers[this.player].Position);  //TODO: adjust x for sprite width
	 this.PossessionPlayerIndex = this.player;
      }

      //NOTE: pass speed has to increase to 2.0 for pass between banks, and 3.0 for long balls, and maybe 4.0 for shots
   },
   Shoot() {
      var striker;
      var keeper;

      if (this.Possession==POSSESSION.HOME) {
	 striker = this.Randomizer.GetNumber(HomeOutfieldPlayers[this.PossessionPlayerIndex].Quality+15);
	 keeper = this.Randomizer.GetNumber(AwayGoalkeeper.Quality+15);
	 if (striker<keeper) {  //check if it's a goal
	    Football.SetDestination( { X: 1492, Y: 180 } );
	    this.Goal = true;
	 } else {
	    Football.SetDestination( { X: AwayGoalkeeper.Position.X, Y: (AwayGoalkeeper.Position.Y-(AwayGoalkeeper.Sprite.Height/2)) } );
	    this.PossessionPlayerIndex = -1;
	 }
	 this.Possession = POSSESSION.AWAY;
      } else {
	 striker = this.Randomizer.GetNumber(AwayOutfieldPlayers[this.PossessionPlayerIndex].Quality+15);
	 keeper = this.Randomizer.GetNumber(HomeGoalkeeper.Quality+15);
	 if (striker<keeper) {  //check if it's a goal
	    Football.SetDestination( { X: 108, Y: 180 } );
	    this.Goal = true;
	 } else {
	    Football.SetDestination( { X: (HomeGoalkeeper.Position.X+HomeGoalkeeper.Sprite.Width), Y: (HomeGoalkeeper.Position.Y - (HomeGoalkeeper.Sprite.Height/2)) } );
	    this.PossessionPlayerIndex = -1;
	 }
	 this.Possession = POSSESSION.HOME;
      }
   },
   MapCoords(agnt) {
   }
};
