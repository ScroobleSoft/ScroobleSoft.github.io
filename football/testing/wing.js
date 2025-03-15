/*
 *	at a 15px differential between RW and LB, it is possible to get a cross away
 *	at 30px, there is total room to measure accuracy of cross (accuracy will be proportional to differential)
 *	differential can be 0-30; grade differentials can be anywhere between -29 to +29
 *	A+ should beat B+ > 50% of the time, J- 90% of the time
 *	conversely, maybe should allow J- to beat A+ 10% of the time
 *	formula for achiveing this then is: first determine winner (::GetWinner) - if winger loses, they are tackled and ball is turned over
 *					    turn time is rand(1, (LB-RW)+30)
 */

var WingFormations = [ { CBs: 3, Fs: 1 },	//F541
		       { CBs: 3, Fs: 2 },	//F532
		       { CBs: 2, Fs: 2 },	//F442
		       { CBs: 2, Fs: 1 },	//F4141
		       { CBs: 2, Fs: 1 },	//F451
		       { CBs: 3, Fs: 2 },	//F4312
		       { CBs: 3, Fs: 1 }  ];	//F4231
var WINgPHASE = { STOPPED: 0, TACKLED: 1, DRIBBLING: 2, CROSSING: 3, HEADING: 4, GOAlBOUND: 5, CLEARED: 6, SAVING: 7, GOAL: 8, WAIT: 9, BATTLE: 10 };

FootballTesting.prototype.SetWingPlaySim = function() {
   var iOpponent;

   TeamViewTabs.Enabled = false;	//just a HACK
   this.ScreenRect.Set(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Select teams to play
   this.HomeTeam = Teams[6];		//Everton
   iOpponent = this.Randomizer.GetInRange(0, LEAGUE.TEAMS-2);
   if (iOpponent==6)
      iOpponent = LEAGUE.TEAMS - 1;
   this.AwayTeam = Teams[iOpponent];
   this.InfoBox.fillStyle = "rgb(223,223,223)";
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
   this.TextWriter.SwitchContext(CANVAS.ZOOM);
   this.TextWriter.Write("Home: "+ClubNames[this.HomeTeam.Index]+" Away: "+ClubNames[this.AwayTeam.Index], 5, 40);
   this.TextWriter.RestoreContext();

   //Select formation and create, set players
//   this.HomeFormation = Teams[6].Formation || FORMATION.F442;	//TEMP
   this.HomeFormation = FORMATION.F442;	//TEMP
//   this.AwayFormation = this.Randomizer.GetInRange(1, FORMATION.TYPES) - 1;
   this.AwayFormation = FORMATION.F442;				//TEMP
   this.HomePlayers = new Array(11);
   this.AwayPlayers = new Array(11);
   this.GeneratePlayers(iOpponent);		//visual players
   this.SelectTeams();				//players, that is, since teams have already been determined
   this.WinningTeam = this.HomePlayers;		//temporary assignments
   this.LosingTeam = this.AwayPlayers;
   this.AssignPlayers();

   this.DisplayOppositionRatings();

   //Create and initialize football
   this.Ball = new GenieAgent();
   this.Ball.Set( { SPEED: 0.5 }, FootballSprite);
   this.Ball.SetPosition(this.RightWinger.Position);
   this.Ball.SetDirection(DIRECTION.W);
   this.Ball.GraphicsTool = this.GraphicsTool;

   //Initialize stats
   this.Plays = 0;
   this.HomeGoals = 0;
   this.AwayGoals = 0;
   this.HomeBattlesWon = 0;
   this.AwayBattlesWon = 0;
   this.HomeAttempts = 0;
   this.AwayAttempts = 0;

   /***** TEMP *****/
   this.SideViewPitch = new BufferedSideViewFootballPitch();
   this.SideViewPitch.Set(this.Screen, this.GraphicsTool);
   this.SideViewPitch.Generate();
   /***** TEMP *****/

   this.Frames = 0;
   this.PlayState = WINgPHASE.STOPPED;
};
FootballTesting.prototype.DisplayOppositionRatings = function() {
   this.TextWriter.SwitchContext(CANVAS.ZOOM);
   this.TextWriter.Write("G: "+Utilities.NumberToGrade(this.AwayPlayers[0].Quality), 5, 60);
   strng = Utilities.NumberToGrade(this.AwayPlayers[1].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[2].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[3].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[4].Quality);
   this.TextWriter.Write("D: "+strng, 5, 80);
   strng = Utilities.NumberToGrade(this.AwayPlayers[5].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[6].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[7].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[8].Quality);
   this.TextWriter.Write("M: "+strng, 5, 100);
   strng = Utilities.NumberToGrade(this.AwayPlayers[9].Quality);
   strng += ".." + Utilities.NumberToGrade(this.AwayPlayers[10].Quality);
   this.TextWriter.Write("F: "+strng, 5, 120);
   this.TextWriter.RestoreContext();
};
FootballTesting.prototype.GeneratePlayers = function(iTeam) {
   var nPlayers;

   //Goalkeeper
   this.Goalkeeper = new FootballMatchKeeper();
   this.Goalkeeper.Set( { SPEED: 1.0 }, LeftKeeperSprite);
   this.Goalkeeper.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.Goalkeeper.SetPosition( { X: 145, Y: 200} );
   this.Goalkeeper.SetDirection(DIRECTION.E);

   //Right wing
   this.RightWinger = new FootballMatchPlayer();
   this.RightWinger.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.RightWinger.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.RightWinger.SetPosition( { X: 365, Y: 75 } );
   this.RightWinger.SetDirection(DIRECTION.W);
   this.RightWinger.Team = Teams[6];
   this.RightWinger.Home = true;
   this.LeftBack = new FootballMatchPlayer();
   this.LeftBack.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.LeftBack.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.LeftBack.SetPosition( { X: 350, Y: 90 } );
   this.LeftBack.SetDirection(DIRECTION.E);
   this.LeftBack.Team = Teams[iTeam];

   //Centre
   this.Forwards = new AgentArray();
   nPlayers = WingFormations[this.HomeFormation].Fs;
   this.Forwards.Set(nPlayers, FootballMatchPlayer, null, SIDeOnPLAYER, LeftFootballerSprite);
   this.Forwards.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.Forwards.SetVisible();
   if (nPlayers==1) {
      this.Forwards[0].SetPosition( { X: 315, Y: 203 } );
      this.Forwards[0].SetDirection(DIRECTION.W);
      this.Forwards[0].Team = Teams[6];
   } else
      for (indx=0;indx<nPlayers;++indx) {
	 this.Forwards[indx].SetPosition( { X: 330-(30*indx), Y: 170+(65*indx) } );
	 this.Forwards[indx].SetDirection(DIRECTION.W);
	 this.Forwards[indx].Team = Teams[6];
	 this.Forwards[indx].Home = true;
      }
   this.CentreBacks = new AgentArray();
   nPlayers = WingFormations[this.AwayFormation].CBs;
   this.CentreBacks.Set(nPlayers, FootballMatchPlayer, null, SIDeOnPLAYER, LeftFootballerSprite);
   this.CentreBacks.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.CentreBacks.SetVisible();
   if (nPlayers==1) {
      this.CentreBacks[0].SetPosition( { X: 300, Y: 218 } );
      this.CentreBacks[0].SetDirection(DIRECTION.E);
      this.CentreBacks[0].Team = Teams[iTeam];
   } else
      for (indx=0;indx<nPlayers;++indx) {
	 this.CentreBacks[indx].SetPosition( { X: 315-(30*indx), Y: 185+(65*indx) } );
	 this.CentreBacks[indx].SetDirection(DIRECTION.E);
	 this.CentreBacks[indx].Team = Teams[iTeam];
      }

   //Left wing
   this.LeftWinger = new FootballMatchPlayer();
   this.LeftWinger.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.LeftWinger.Team = Teams[6];
   this.LeftWinger.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.LeftWinger.SetPosition( { X: 240, Y: 360 } );
   this.LeftWinger.SetDirection(DIRECTION.W);
   this.LeftWinger.Home = true;
   this.RightBack = new FootballMatchPlayer();
   this.RightBack.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.RightBack.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.RightBack.SetPosition( { X: 230, Y: 345 } );
   this.RightBack.SetDirection(DIRECTION.E);
   this.RightBack.Team = Teams[iTeam];
};
FootballTesting.prototype.SelectTeams = function(team) {
/*
   //Keeper
   this.SelectKeeper(this.AwayTeam, Teams[iOpponent].Squad);
   this.Goalkeeper.Unit = this.AwayTeam[0];

   //RightWinger
   if (Teams[6].Squad.Players[20].Quality>Teams[6].Squad.Players[12].Quality)
      this.RightWinger.Unit = Teams[6].Squad.Players[12];
   else
      this.RightWinger.Unit = Teams[6].Squad.Players[20];

   //LeftBack
   if (Teams[iOpponent].Squad.Players[9].Quality>Teams[iOpponent].Squad.Players[10].Quality)
      this.LeftBack.Unit = Teams[6].Squad.Players[10];
   else
      this.LeftBack.Unit = Teams[6].Squad.Players[9];

   this.SelectCentralPlayers(iOpponent);

   //LeftWinger
   if (Teams[6].Squad.Players[24].Quality>Teams[6].Squad.Players[19].Quality)
      this.LeftWinger.Unit = Teams[6].Squad.Players[19];
   else
      this.LeftWinger.Unit = Teams[6].Squad.Players[24];

   //RightBack
   if (Teams[iOpponent].Squad.Players[3].Quality>Teams[iOpponent].Squad.Players[4].Quality)
      this.RightBack.Unit = Teams[6].Squad.Players[4];
   else
      this.RightBack.Unit = Teams[6].Squad.Players[3];

   //Set rating
   this.AttackRating = this.RightWinger.Unit.Quality + this.Forwards[0].Unit.Quality + this.Forwards[1].Unit.Quality + this.LeftWinger.Unit.Quality;
   this.DefenceRating = this.LeftBack.Unit.Quality + this.CentreBacks[0].Unit.Quality + this.CentreBacks[1].Unit.Quality + this.RightBack.Unit.Quality;
*/
   this.SelectKeeper(this.HomePlayers, this.HomeTeam.Squad);
   this.SelectDefence(this.HomePlayers, this.HomeTeam.Squad);
   this.SelectMidfield(this.HomePlayers, this.HomeTeam.Squad);
   this.SelectForwards(this.HomePlayers, this.HomeTeam.Squad);
   this.SelectKeeper(this.AwayPlayers, this.AwayTeam.Squad);
   this.SelectDefence(this.AwayPlayers, this.AwayTeam.Squad);
   this.SelectMidfield(this.AwayPlayers, this.AwayTeam.Squad);
   this.SelectForwards(this.AwayPlayers, this.AwayTeam.Squad);
};
FootballTesting.prototype.SelectCentralPlayers = function(iOpponent) {

   //LOGGED

   //NOTE: only handling 4-4-2 and 5-4-1 cases right now (actually, only 4-4-2)

   //Select centre-backs
   if (Teams[iOpponent].Squad.Players[5].Quality<Teams[iOpponent].Squad.Players[6].Quality)	//RCB
      this.CentreBacks[0].Unit = Teams[iOpponent].Squad.Players[5];
   else
      this.CentreBacks[0].Unit = Teams[iOpponent].Squad.Players[6];
   if (Teams[iOpponent].Squad.Players[8].Quality<Teams[iOpponent].Squad.Players[7].Quality)	//LCB
      this.CentreBacks[1].Unit = Teams[iOpponent].Squad.Players[8];
   else
      this.CentreBacks[1].Unit = Teams[iOpponent].Squad.Players[7];

   //Select forwards
   if (Teams[6].Squad.Players[20].Quality<Teams[6].Squad.Players[21].Quality)	//S
      this.Forwards[0].Unit = Teams[6].Squad.Players[20];
   else
      this.Forwards[0].Unit = Teams[6].Squad.Players[21];
   if (Teams[6].Squad.Players[22].Quality<Teams[6].Squad.Players[23].Quality)	//RF
      this.Forwards[1].Unit = Teams[6].Squad.Players[22];
   else
      this.Forwards[1].Unit = Teams[6].Squad.Players[23];
};
FootballTesting.prototype.PlayWingPlaySim = function() {

   //UNLOGGED

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayWingPlaySim.bind(this));

   this.Screen.drawImage(this.SideViewPitch.Buffer.Canvas, 0, 0);
   this.DrawPlayers();
   this.UpdatePlayState();
   this.UpdatePlayers();

//   if (this.PlayStarted)
/*
   if (Mouse.CheckLeftClicked()) {
      this.RightWinger.State.Motion = STATE.MOTION.ADVANCING;
      this.RightWinger.Animation.State = this.Animation.Sequence[0];
      this.Ball.State.Motion = STATE.MOTION.ADVANCING;
      if (this.Randomizer.GetWinner(this.RightWinger.Unit.Quality, this.LeftBack.Unit.Quality, INVERTED)==0) {  //check if RW wins
	 this.Delay = this.Randomizer.GetInRange(1, 60);
	 this.PlayStarted = true;
      } else {
	 coords.X = this.LeftBack.Position.X + this.LeftBack.Sprite.Specs.W;
	 coords.Y = this.LeftBack.Position.Y;
	 this.Ball.SetPosition(coords);
      }
   }
*/
};
FootballTesting.prototype.DrawPlayers = function() {
   this.Goalkeeper.Draw();
   this.RightWinger.Draw();
   this.Ball.Draw();
   this.LeftBack.Draw();
   this.Forwards.Draw();
   this.CentreBacks.Draw();
   this.RightBack.Draw();
   this.LeftWinger.Draw();

   this.DrawDummies();
};
FootballTesting.prototype.DrawDummies = function() {

   //Defending team
   if (this.LosingTeam===this.HomePlayers)
      colour = TeamColours[this.HomeTeam.Index][0];
   else
      colour = TeamColours[this.AwayTeam.Index][1];
   LeftFootballerSprite.Draw(557, 89);
   this.TextWriter.Write(this.LosingTeam[8].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[8].Quality), 557, 49, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.Draw(520, 184);
   this.TextWriter.Write(this.LosingTeam[7].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[7].Quality), 520, 144, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.Draw(492, 249);
   this.TextWriter.Write(this.LosingTeam[6].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[6].Quality), 492, 209, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.Draw(465, 344);
   this.TextWriter.Write(this.LosingTeam[5].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[5].Quality), 465, 304, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.Draw(741, 152);
   this.TextWriter.Write(this.LosingTeam[10].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[10].Quality), 741, 112, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.Draw(738, 313);
   this.TextWriter.Write(this.LosingTeam[9].Name.Last+" "+Utilities.NumberToGrade(this.LosingTeam[9].Quality), 738, 273, { FONT: "10px Arial", COLOUR: colour });

   //Attacking team
   if (this.WinningTeam===this.HomePlayers)
      colour = TeamColours[this.HomeTeam.Index][0];
   else
      colour = TeamColours[this.AwayTeam.Index][1];
   LeftFootballerSprite.DrawFlipped(556, 170, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[6].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[6].Quality), 556, 130, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.DrawFlipped(541, 235, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[7].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[7].Quality), 541, 195, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.DrawFlipped(651, 75, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[1].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[1].Quality), 651, 35, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.DrawFlipped(774, 131, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[2].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[2].Quality), 774, 91, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.DrawFlipped(772, 296, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[3].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[3].Quality), 774, 256, { FONT: "10px Arial", COLOUR: colour });
   LeftFootballerSprite.DrawFlipped(583, 360, FLIPPED.HORIZONTAL);
   this.TextWriter.Write(this.WinningTeam[4].Name.Last+" "+Utilities.NumberToGrade(this.WinningTeam[4].Quality), 583, 320, { FONT: "10px Arial", COLOUR: colour });
};
FootballTesting.prototype.CalculateRatings = function() {
   this.AttackMidRating = this.WinningTeam[5].Quality + this.WinningTeam[6].Quality + this.WinningTeam[7].Quality + this.WinningTeam[8].Quality;
   this.DefenceMidRating = this.LosingTeam[5].Quality + this.LosingTeam[6].Quality + this.LosingTeam[7].Quality + this.LosingTeam[8].Quality;
   this.AttackRating = Math.round((this.WinningTeam[9].Quality+this.WinningTeam[10].Quality)/2);
   this.DefenceRating =  Math.round((this.LosingTeam[1].Quality+this.LosingTeam[2].Quality+this.LosingTeam[3].Quality+this.LosingTeam[4].Quality)/4);
};
FootballTesting.prototype.UpdatePlayers = function() {
   this.Goalkeeper.Update();
   this.RightWinger.Update();
   this.Ball.Update();
   this.LeftBack.Update();
   this.Forwards.Update();
   this.CentreBacks.Update();
   this.RightBack.Update();
   this.LeftWinger.Update();
/*
   this.Ball.Move();
   this.RightWinger.Move();
   ++this.Frames;
   if (this.Frames==this.Delay) {
      this.LeftBack.TurnAround();
      this.LeftBack.State.Motion = STATE.MOTION.ADVANCING;
   } else if (this.Frames>this.Delay)
      this.LeftBack.Move();
   if (this.Frames==60)
      this.PlayStarted = false;
*/
};
FootballTesting.prototype.UpdatePlayState = function() {

   //LOGGED - attack has to win twice

   switch (this.PlayState) {
      case WINgPHASE.STOPPED:
	 if (Mouse.CheckLeftClicked()) {
	    this.InfoBox.fillStyle = "rgb(223,223,223)";
	    this.InfoBox.fillRect(0, 120, INFoBOX.WIDTH, 25);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    if (this.Randomizer.GetWinner(this.AttackMidRating, this.DefenceMidRating, INVERTED)) {
	       this.WinningTeam = this.HomePlayers;
	       this.LosingTeam = this.AwayPlayers;
	       this.TextWriter.Write("Possession: "+ClubNames[this.HomeTeam.Index], 5, 140);
	       ++this.HomeBattlesWon;
	    } else {
	       this.WinningTeam = this.AwayPlayers;
	       this.LosingTeam = this.HomePlayers;
	       this.TextWriter.Write("Possession: "+ClubNames[this.AwayTeam.Index], 5, 140);
	       ++this.AwayBattlesWon;
	    }
	    this.TextWriter.RestoreContext();
	    this.CalculateRatings();
	    this.AssignPlayers();
	    this.PlayState = WINgPHASE.BATTLE;
	    ++this.Plays;
	    this.DisplayScoreboard();
	 }
	 break;
      case WINgPHASE.BATTLE:	//actually, this is more like a 'post-battle state' since battle has already been determined
	 if (Mouse.CheckLeftClicked()) {
//	    if (this.Randomizer.GetWinner(this.RightWinger.Unit.Quality+1, this.LeftBack.Unit.Quality+1)==0) {  //check if RW wins
	    if (this.Randomizer.GetWinner(this.AttackRating, this.DefenceRating, INVERTED)==0) {  //check if attack wins
	       this.RightWinger.State.Motion = STATE.MOTION.ADVANCING;
	       this.RightWinger.Animation.State = this.RightWinger.Animation.Sequence[0];
	       this.Ball.State.Motion = STATE.MOTION.ADVANCING;
	       this.Delay = this.Randomizer.GetInRange(30, 60);
	       this.CentreBacks[0].TurnAround();
	       this.CentreBacks[1].TurnAround();
	       this.Forwards[0].State.Motion = STATE.MOTION.ADVANCING;
	       this.Forwards[1].State.Motion = STATE.MOTION.ADVANCING;
	       this.Forwards[0].Animation.State = this.Forwards[0].Animation.Sequence[0];
	       this.Forwards[1].Animation.State = this.Forwards[1].Animation.Sequence[0];
	       this.CentreBacks[0].State.Motion = STATE.MOTION.ADVANCING;
	       this.CentreBacks[1].State.Motion = STATE.MOTION.ADVANCING;
	       this.CentreBacks[0].Animation.State = this.CentreBacks[0].Animation.Sequence[0];
	       this.CentreBacks[1].Animation.State = this.CentreBacks[1].Animation.Sequence[0];
	       this.PlayState = WINgPHASE.DRIBBLING;
	    } else {
	       coords.X = this.LeftBack.Position.X + this.LeftBack.Sprite.Specs.W;
	       coords.Y = this.LeftBack.Position.Y;
	       this.Ball.SetPosition(coords);
	       this.PlayState = WINgPHASE.TACKLED;
	    }
	 }
 
	 break;
      case WINgPHASE.TACKLED:
	 if (Mouse.CheckLeftClicked()) {
	    this.Ball.SetPosition(this.RightWinger.Position);
	    this.PlayState = WINgPHASE.STOPPED;
	 }
	 break;
      case WINgPHASE.DRIBBLING:
	 ++this.Frames;
	 if (this.Frames==this.Delay) {
	    this.LeftBack.TurnAround();
	    this.LeftBack.State.Motion = STATE.MOTION.ADVANCING;
	    this.LeftBack.Animation.State = this.LeftBack.Animation.Sequence[0];
	 }
	 if (this.Frames==60) {
	    this.RightWinger.State.Motion = STATE.MOTION.STATIONARY;
	    this.RightWinger.Animation.State = 4;
	    this.Outcome = this.GetBallDestination();
	    switch (this.Outcome) {
	       case 0:		//RF
		  this.Ball.SetDestination( { X: 243, Y: 137 } );
		  break;
	       case 1:		//LCB
		  this.Ball.SetDestination( { X: 229, Y: 151 } );
		  break;
	       case 2:		//LF
		  this.Ball.SetDestination( { X: 213, Y: 203 } );
		  break;
	       case 3:		//RCB
		  this.Ball.SetDestination( { X: 200, Y: 215 } );
		  break;
	    }
	    this.Ball.ChangeSpeed(0.8);
	    this.Ball.SetParabolicPath(200);
	    this.LeftBack.State.Motion = STATE.MOTION.STATIONARY;
	    this.LeftBack.Animation.State = 0;
	    this.PlayState = WINgPHASE.CROSSING;
	 }
	 break;
      case WINgPHASE.CROSSING:
	 ++this.Frames;
	 if (this.Frames==75)  //end winger's kicking motion
	    this.RightWinger.Animation.State = 0;
	 if (this.Frames==180) {  //RF and LCB react to ball
	    this.Forwards[0].State.Motion = STATE.MOTION.STATIONARY;
	    this.CentreBacks[0].State.Motion = STATE.MOTION.STATIONARY;
	    this.Forwards[1].State.Motion = STATE.MOTION.STATIONARY;		//stop LF
	    this.CentreBacks[1].State.Motion = STATE.MOTION.STATIONARY;	//stop RCB
	    this.Forwards[1].Animation.State = 0;
	    this.CentreBacks[1].Animation.State = 0;
	    if (this.Outcome<=1) {	//jump RF-LCB
	       coords.X = this.Forwards[0].Position.X;				//jump RF
	       coords.Y = this.Forwards[0].Position.Y - 6;
	       this.Forwards[0].SetPosition(coords);
	       this.Forwards[0].Animation.State = 5;
	       coords.X = this.CentreBacks[0].Position.X;			//jump LCB
	       coords.Y = this.CentreBacks[0].Position.Y - 6;
	       this.CentreBacks[0].SetPosition(coords);
	       this.CentreBacks[0].Animation.State = 5;
	    } else {
	       this.Forwards[0].Animation.State = 0;
	       this.CentreBacks[0].Animation.State = 0;
	    }
	 }

	 if (this.Frames==240) {  //LF and RCB react to ball
	    if (this.Outcome>=2) {	//jump LF-RCB
	       coords.X = this.Forwards[1].Position.X;
	       coords.Y = this.Forwards[1].Position.Y - 6;
	       this.Forwards[1].SetPosition(coords);
	       this.Forwards[1].Animation.State = 5;
	       this.Forwards[1].State.Motion = STATE.MOTION.STATIONARY;
	       coords.X = this.CentreBacks[1].Position.X;
	       coords.Y = this.CentreBacks[1].Position.Y - 6;
	       this.CentreBacks[1].SetPosition(coords);
	       this.CentreBacks[1].Animation.State = 5;
	       this.CentreBacks[1].State.Motion = STATE.MOTION.STATIONARY;
	    } else {			//drop RF-LCB to pitch
	       coords.X = this.Forwards[0].Position.X;
	       coords.Y = this.Forwards[0].Position.Y + 6;
	       this.Forwards[0].SetPosition(coords);
	       this.Forwards[0].Animation.State = 0;
	       coords.X = this.CentreBacks[0].Position.X;
	       coords.Y = this.CentreBacks[0].Position.Y + 6;
	       this.CentreBacks[0].SetPosition(coords);
	       this.CentreBacks[0].Animation.State = 0;
	    }
	 }

	 if (this.Frames==300) {  //drop LF and RCB if in the air
	    if (this.Outcome>=2) {
	       coords.X = this.Forwards[1].Position.X;
	       coords.Y = this.Forwards[1].Position.Y + 6;
	       this.Forwards[1].SetPosition(coords);
	       this.Forwards[1].Animation.State = 0;
	       coords.X = this.CentreBacks[1].Position.X;
	       coords.Y = this.CentreBacks[1].Position.Y + 6;
	       this.CentreBacks[1].SetPosition(coords);
	       this.CentreBacks[1].Animation.State = 0;
	    }
	 }

	 if (this.Ball.CheckAtDestination() || this.Ball.X<this.Ball.Destination.X || this.Ball.Y>this.Ball.Destination.Y) {
//	 if (this.Ball.CheckAtDestination()) {
	    switch (this.Outcome) {
	       case 0:
		  this.Ball.SetDestination( { X: 143, Y: 125 } );
		  this.PlayState = WINgPHASE.GOAlBOUND;
		  break;
	       case 1:
		  this.Ball.SetDestination( { X: 429, Y: 151 } );
		  this.PlayState = WINgPHASE.CLEARED;
		  break;
	       case 2:
		  this.Ball.SetDestination( { X: 110, Y: 180 } );
		  this.PlayState = WINgPHASE.GOAlBOUND;
		  break;
	       case 3:
		  this.Ball.SetDestination( { X: 400, Y: 215 } );
		  this.PlayState = WINgPHASE.CLEARED;
		  break;
	    }
	    this.Ball.OnParabolicPath = false;
	 }
	 break;
      case WINgPHASE.HEADING:  //currently REDUNDANT
	 break;
      case WINgPHASE.GOAlBOUND:
	 //Keepers: A's save 90%, B's 80%, C's 70%	90-(3*rating)
//	 if (this.Randomizer.GetWinner(this.AttackRating, this.DefenceRating)==0)  //Determine if save is made
	 if (this.Randomizer.CheckUnderOdds(90-(3*this.Goalkeeper.Unit.Quality), 100)) {  //Determine if save is made
	    this.Ball.SetDestination( { X: 158, Y: 185 } );
	    this.PlayState = WINgPHASE.SAVING;
	 } else {
	    this.PlayState = WINgPHASE.GOAL;
	 }
	 break;
      case WINgPHASE.CLEARED:
	 if (this.Ball.Position.X>400)
	    this.ResetPlay();
	 break;
      case WINgPHASE.SAVING:
	 if (this.Ball.CheckAtDestination()) {
	    this.Ball.State.Motion = STATE.MOTION.STATIONARY;
	    this.Frames = 0;
	    this.PlayState = WINgPHASE.WAIT;
	    if (this.WinningTeam===this.HomePlayers)
	       ++this.HomeAttempts;
	    else
	       ++this.AwayAttempts;
	 }
	 break;
      case WINgPHASE.GOAL:
	 if (this.Ball.CheckAtDestination()) {
	    this.Ball.State.Motion = STATE.MOTION.STATIONARY;
	    this.Frames = 0;
	    this.PlayState = WINgPHASE.WAIT;
	    if (this.WinningTeam===this.HomePlayers)
	       ++this.HomeGoals;
	    else
	       ++this.AwayGoals;
	 }
	 break;
      case WINgPHASE.WAIT:
	 ++this.Frames;
	 if (this.Frames==120)
	    this.ResetPlay();
	 break;
   }
};
FootballTesting.prototype.GetBallDestination = function() {
/*
   //Determine which forward is intended
   if (this.Randomizer.CheckBoolean()) {	//RF
      if (this.Randomizer.GetWinner(this.Forwards[0].Unit.Quality+1, this.CentreBacks[1].Unit.Quality+1, INVERTED)==0)	//RF wins
	 return (0);
      else													//LCB wins
	 return (1);
   } else {					//LF
      if (this.Randomizer.GetWinner(this.Forwards[1].Unit.Quality+1, this.CentreBacks[0].Unit.Quality+1, INVERTED)==0)	//LF wins
	 return (2);
      else													//RCB wins
	 return (3);
   }
*/
   if (this.Randomizer.GetWinner(this.AttackRating, this.DefenceRating, INVERTED)==0) {  //check if attack wins again
      if (this.Randomizer.CheckBoolean())	//RF
	 return (0);
      else					//LF
	 return (2);
   } else {
      if (this.Randomizer.CheckBoolean())	//LCB
	 return (1);
      else					//RCB
	 return (3);
   }
};
FootballTesting.prototype.ResetPlay = function() {

   this.Ball.State.Motion = STATE.MOTION.STATIONARY;
   this.Ball.SetPosition( { X: 365, Y: 75 } );
   this.Ball.ChangeSpeed(0.5);
   this.Ball.SetDirection(DIRECTION.W);

   this.RightWinger.SetPosition( { X: 365, Y: 75 } );
   this.RightWinger.State.Motion = STATE.MOTION.STATIONARY;
   this.RightWinger.Animation.State = 0;
   this.LeftBack.SetPosition( { X: 350, Y: 90 } );
   this.LeftBack.State.Motion = STATE.MOTION.STATIONARY;
   this.LeftBack.Animation.State = 0;
   if (this.LeftBack.Direction==DIRECTION.W)
      this.LeftBack.TurnAround();

   this.Forwards[0].SetPosition( { X: 330, Y: 170 } );
   this.Forwards[0].State.Motion = STATE.MOTION.STATIONARY;
   this.Forwards[0].Animation.State = 0;
   this.Forwards[1].SetPosition( { X: 300, Y: 235 } );
   this.Forwards[1].State.Motion = STATE.MOTION.STATIONARY;
   this.Forwards[1].Animation.State = 0;

   this.CentreBacks[0].SetPosition( { X: 315, Y: 185 } );
   this.CentreBacks[0].State.Motion = STATE.MOTION.STATIONARY;
   this.CentreBacks[0].Animation.State = 0;
   this.CentreBacks[0].TurnAround();
   this.CentreBacks[1].SetPosition( { X: 285, Y: 250 } );
   this.CentreBacks[1].State.Motion = STATE.MOTION.STATIONARY;
   this.CentreBacks[1].Animation.State = 0;
   this.CentreBacks[1].TurnAround();

   this.LeftWinger.SetPosition( { X: 240, Y: 360 } );
   this.LeftWinger.State.Motion = STATE.MOTION.STATIONARY;
   this.LeftWinger.Animation.State = 0;
   this.RightBack.SetPosition( { X: 230, Y: 345 } );
   this.RightBack.State.Motion = STATE.MOTION.STATIONARY;
   this.RightBack.Animation.State = 0;

   this.Frames = 0;
   this.PlayState = WINgPHASE.STOPPED;
};
FootballTesting.prototype.SelectKeeper = function(team, sqd) {
   var val;
   var iKeeper;

   iKeeper = 0;
   val = sqd.Goalkeepers[iKeeper].Quality;
   for (indx=1;indx<sqd.Goalkeepers.length;++indx)
      if (sqd.Goalkeepers[indx].Quality<val) {
	 val = sqd.Goalkeepers[indx].Quality;
	 iKeeper = indx;
      }
   team[0] = sqd.Goalkeepers[iKeeper];
};
FootballTesting.prototype.SelectDefence = function(team, squad) {
   var pairs;

   //RB
   if (squad.Players[4].Quality<squad.Players[3].Quality)	//if equal, pick regulation RB
      team[1] = squad.Players[4];
   else
      team[1] = squad.Players[3];

   //CBs - pick from best combo of RCB-LCB, RCB-CB, RCB-ACB, CB-ACB, CB-LCB and ACB-LCB
   pairs = new GenieArray();
   pairs.Set(6);
   pairs[0] = squad.Players[5].Quality + squad.Players[8].Quality;	//RCB-LCB
   pairs[1] = squad.Players[5].Quality + squad.Players[6].Quality;	//RCB-CB
   pairs[2] = squad.Players[5].Quality + squad.Players[7].Quality;	//RCB-ACB
   pairs[3] = squad.Players[6].Quality + squad.Players[7].Quality;	//CB-ACB
   pairs[4] = squad.Players[6].Quality + squad.Players[8].Quality;	//CB-LCB
   pairs[5] = squad.Players[7].Quality + squad.Players[8].Quality;	//ACB-LCB
   indx = pairs.GetMinIndex();
   switch (indx) {
      case 0:					//RCB-LCB
	 team[2] = squad.Players[5];
	 team[3] = squad.Players[8];
	 break;
      case 1:					//RCB-CB
	 team[2] = squad.Players[5];
	 team[3] = squad.Players[6];
	 break;
      case 2:					//RCB-ACB
	 team[2] = squad.Players[5];
	 team[3] = squad.Players[7];
	 break;
      case 3:					//CB-ACB
	 team[2] = squad.Players[6];
	 team[3] = squad.Players[7];
	 break;
      case 4:					//CB-LCB
	 team[2] = squad.Players[6];
	 team[3] = squad.Players[8];
	 break;
      case 5:					//ACB-LCB
	 team[2] = squad.Players[7];
	 team[3] = squad.Players[8];
	 break;
   }

   //LB
   if (squad.Players[10].Quality<squad.Players[9].Quality)	//if equal, pick regulation LB
      team[4] = squad.Players[10];
   else
      team[4] = squad.Players[9];
};
FootballTesting.prototype.SelectMidfield = function(team, squad) {
   var pairs;

   //RM
   if (squad.Players[12].Quality<squad.Players[11].Quality)	//if equal, pick regulation RM
      team[5] = squad.Players[12];
   else
      team[5] = squad.Players[11];

   //CMs - pick from best combo of RCM-LCM, RCM-DM, RCM-CM, RCM-AM, DM-CM, DM-AM, CM-AM, DM-LCM, CM-LCM and AM-LCM
   pairs = new GenieArray();
   pairs.Set(10);
   pairs[0] = squad.Players[13].Quality + squad.Players[17].Quality;	//RCM-LCM
   pairs[1] = squad.Players[13].Quality + squad.Players[14].Quality;	//RCM-DM
   pairs[2] = squad.Players[13].Quality + squad.Players[15].Quality;	//RCM-CM
   pairs[3] = squad.Players[13].Quality + squad.Players[16].Quality;	//RCM-AM
   pairs[4] = squad.Players[14].Quality + squad.Players[15].Quality;	//DM-CM
   pairs[5] = squad.Players[14].Quality + squad.Players[16].Quality;	//DM-AM
   pairs[6] = squad.Players[15].Quality + squad.Players[16].Quality;	//CM-AM
   pairs[7] = squad.Players[14].Quality + squad.Players[17].Quality;	//DM-LCM
   pairs[8] = squad.Players[15].Quality + squad.Players[17].Quality;	//CM-LCM
   pairs[9] = squad.Players[16].Quality + squad.Players[17].Quality;	//AM-LCM
   indx = pairs.GetMinIndex();
   switch (indx) {
      case 0:					//RCM-LCM
	 team[6] = squad.Players[13];
	 team[7] = squad.Players[17];
	 break;
      case 1:					//RCM-DM
	 team[6] = squad.Players[13];
	 team[7] = squad.Players[14];
	 break;
      case 2:					//RCM-CM
	 team[6] = squad.Players[13];
	 team[7] = squad.Players[15];
	 break;
      case 3:					//RCM-AM
	 team[6] = squad.Players[13];
	 team[7] = squad.Players[16];
	 break;
      case 4:					//DM-CM
	 team[6] = squad.Players[14];
	 team[7] = squad.Players[15];
	 break;
      case 5:					//DM-AM
	 team[6] = squad.Players[14];
	 team[7] = squad.Players[16];
	 break;
      case 6:					//CM-AM
	 team[6] = squad.Players[15];
	 team[7] = squad.Players[16];
	 break;
      case 7:					//DM-LCM
	 team[6] = squad.Players[14];
	 team[7] = squad.Players[17];
	 break;
      case 8:					//CM-LCM
	 team[6] = squad.Players[15];
	 team[7] = squad.Players[17];
	 break;
      case 9:					//AM-LCM
	 team[6] = squad.Players[16];
	 team[7] = squad.Players[17];
	 break;
   }

   //LM
   if (squad.Players[19].Quality<squad.Players[18].Quality)	//if equal, pick regulation LM
      team[8] = squad.Players[19];
   else
      team[8] = squad.Players[18];
};
FootballTesting.prototype.SelectForwards = function(team, squad) {
   var pairs;

   //Pick from best combo of RF-LF, RF-S, RF-LW, RW-S, RW-LW, S-LW, RW-LF and S-LF
   pairs = new GenieArray();
   pairs.Set(8);
   pairs[0] = squad.Players[21].Quality + squad.Players[23].Quality;	//RF-LF
   pairs[1] = squad.Players[21].Quality + squad.Players[22].Quality;	//RF-S
   pairs[2] = squad.Players[21].Quality + squad.Players[24].Quality;	//RF-LW
   pairs[3] = squad.Players[20].Quality + squad.Players[22].Quality;	//RW-S
   pairs[4] = squad.Players[20].Quality + squad.Players[24].Quality;	//RW-LW
   pairs[5] = squad.Players[22].Quality + squad.Players[24].Quality;	//S-LW
   pairs[6] = squad.Players[20].Quality + squad.Players[23].Quality;	//RW-LF
   pairs[7] = squad.Players[22].Quality + squad.Players[23].Quality;	//S-LF
   indx = pairs.GetMinIndex();
   switch (indx) {
      case 0:					//RF-LF
	 team[9] = squad.Players[21];
	 team[10] = squad.Players[23];
	 break;
      case 1:					//RF-S
	 team[9] = squad.Players[21];
	 team[10] = squad.Players[22];
	 break;
      case 2:					//RF-LW
	 team[9] = squad.Players[21];
	 team[10] = squad.Players[24];
	 break;
      case 3:					//RW-S
	 team[9] = squad.Players[20];
	 team[10] = squad.Players[22];
	 break;
      case 4:					//RW-LW
	 team[9] = squad.Players[20];
	 team[10] = squad.Players[24];
	 break;
      case 5:					//S-LW
	 team[9] = squad.Players[22];
	 team[10] = squad.Players[24];
	 break;
      case 6:					//RW-LF
	 team[9] = squad.Players[20];
	 team[10] = squad.Players[23];
	 break;
      case 7:					//S-LF
	 team[9] = squad.Players[22];
	 team[10] = squad.Players[23];
	 break;
   }
};
FootballTesting.prototype.AssignPlayers = function() {

   //Goalkeeper
   this.Goalkeeper.Unit = this.LosingTeam[0];
   if (this.WinningTeam===this.HomePlayers) {
      this.Goalkeeper.Home = false;
      this.Goalkeeper.Team = this.AwayTeam;
   } else {
      this.Goalkeeper.Home = true;
      this.Goalkeeper.Team = this.HomeTeam;
   }

   //Right wing
   this.RightWinger.Unit = this.WinningTeam[5];
   if (this.WinningTeam===this.HomePlayers) {
      this.RightWinger.Home = true;
      this.RightWinger.Team = this.HomeTeam;
   } else {
      this.RightWinger.Home = false;
      this.RightWinger.Team = this.AwayTeam;
   }
   this.LeftBack.Unit = this.LosingTeam[4];
   if (this.WinningTeam===this.HomePlayers) {
      this.LeftBack.Home = false;
      this.LeftBack.Team = this.AwayTeam;
   } else {
      this.LeftBack.Home = true;
      this.LeftBack.Team = this.HomeTeam;
   }

   //Centre
   this.Forwards[0].Unit = this.WinningTeam[9];
   this.Forwards[1].Unit = this.WinningTeam[10];
   if (this.WinningTeam===this.HomePlayers) {
      this.Forwards[0].Home = true;
      this.Forwards[0].Team = this.HomeTeam;
      this.Forwards[1].Home = true;
      this.Forwards[1].Team = this.HomeTeam;
   } else {
      this.Forwards[0].Home = false;
      this.Forwards[0].Team = this.AwayTeam;
      this.Forwards[1].Home = false;
      this.Forwards[1].Team = this.AwayTeam;
   }
   this.CentreBacks[0].Unit = this.LosingTeam[3];
   this.CentreBacks[1].Unit = this.LosingTeam[2];
   if (this.WinningTeam===this.HomePlayers) {
      this.CentreBacks[0].Home = false;
      this.CentreBacks[0].Team = this.AwayTeam;
      this.CentreBacks[1].Home = false;
      this.CentreBacks[1].Team = this.AwayTeam;
   } else {
      this.CentreBacks[0].Home = true;
      this.CentreBacks[0].Team = this.HomeTeam;
      this.CentreBacks[1].Home = true;
      this.CentreBacks[1].Team = this.HomeTeam;
   }

   //Left wing
   this.LeftWinger.Unit = this.WinningTeam[8];
   if (this.WinningTeam===this.HomePlayers) {
      this.LeftWinger.Home = true;
      this.LeftWinger.Team = this.HomeTeam;
   } else {
      this.LeftWinger.Home = false;
      this.LeftWinger.Team = this.AwayTeam;
   }
   this.RightBack.Unit = this.LosingTeam[1];
   if (this.WinningTeam===this.HomePlayers) {
      this.RightBack.Home = false;
      this.RightBack.Team = this.AwayTeam;
   } else {
      this.RightBack.Home = true;
      this.RightBack.Team = this.HomeTeam;
   }
};
FootballTesting.prototype.DisplayScoreboard = function() {

   this.InfoBox.fillStyle = "rgb(223,223,223)";
   this.InfoBox.fillRect(0, 145, INFoBOX.WIDTH, 95);
   this.TextWriter.SwitchContext(CANVAS.ZOOM);
   this.TextWriter.Write("Goals: "+this.HomeGoals+" "+this.AwayGoals, 5, 160);
   this.TextWriter.Write("Battles won: "+this.HomeBattlesWon+" "+this.AwayBattlesWon, 5, 180);
   this.TextWriter.Write("Attempts: "+this.HomeAttempts+" "+this.AwayAttempts, 5, 200);
   this.TextWriter.Write("Plays: "+this.Plays, 5, 220);
   this.TextWriter.RestoreContext();
};
