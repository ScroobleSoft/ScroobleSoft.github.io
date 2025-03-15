
var RESEtSTATE = { PAUSED: 0, D: 1, DtoM: 2, M: 3, MtoS: 4, S: 5, StoG: 6 };
var RESEtTEAM = { BLUE: 0, RED: 1 };

//-----------------------------------------------
//---------- RESET MINI GAME --------------------
var ResetMiniGame = function() {
   var Screen;
   var GraphicsTool;
   var TextWriter;
   var Randomizer;
/*
   var TeamSelected, Opponent;
   var SelectedPlayer;
*/
   var State;
   var Possession;
   var Frames;
   var BlueTeam, RedTeam;
   var AttackingTeam, DefendingTeam;
   var Ball;
   var BallVelocity;
   var Player;
   var PlayerIndex1, PlayerIndex2;
   var BlueGoals, RedGoals;

   var i, shot;
};
ResetMiniGame.prototype = {
   Set(cntxt, gTool, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;

      this.Frames = 0;
      this.State = RESEtSTATE.PAUSED;
      this.Possession = this.Randomizer.GetIndex(2);
      this.Ball = new Coordinate2D();
      this.BlueTeam = new GenieArray();
      this.BlueTeam.Set(MATCH.PLAYERS);
      this.RedTeam = new GenieArray();
      this.RedTeam.Set(MATCH.PLAYERS);
      this.BallVelocity = new Coordinate2D();
      this.Ball.X = 180;
      this.Ball.Y = 270;
      this.BlueGoals = 0;
      this.RedGoals = 0;
      this.GeneratePlayers();
      this.SetScreen();
   },
   GeneratePlayers() {
      var i;

      this.BlueTeam[0] = "B";
      this.RedTeam[0] = "B";
      for (i=1;i<MATCH.PLAYERS;++i) {
	 this.BlueTeam[i] = Utils.NumberToGrade(this.Randomizer.GetIndex(12));
	 this.RedTeam[i] = Utils.NumberToGrade(this.Randomizer.GetIndex(12));
      }
   },
   DrawPlayers() {
      for (this.i=0;this.i<MATCH.PLAYERS;++this.i) {
	 BlueFootballerSprite.Draw(BluePlayerPositions[this.i][0], BluePlayerPositions[this.i][1]);
	 RedFootballerSprite.Draw(RedPlayerPositions[this.i][0], RedPlayerPositions[this.i][1]);
	 this.TextWriter.Write(this.BlueTeam[this.i], BluePlayerPositions[this.i][0], BluePlayerPositions[this.i][1]+10, {COLOUR: "yellow"});
	 this.TextWriter.Write(this.RedTeam[this.i], RedPlayerPositions[this.i][0], RedPlayerPositions[this.i][1]+10, { COLOUR: "yellow" } );
      }
   },
   UpdateBall() {

      switch (this.State) {
	 case RESEtSTATE.PAUSED:
	    if (this.Frames==120) {
	       this.Player = this.Randomizer.GetInRange(5, 8);		//RM-RCM-LCM-LM
	       this.PlaceBall();
	       this.State = RESEtSTATE.M;
	       this.Frames = 0;
	    }
	    break;
	 case RESEtSTATE.D:
	    if (this.Frames==60) {

	       //Check if tackled by opposite midfielder - if so switch possession
	       if (this.GetWinner()) {  //pass to selected striker
		  this.Player = this.Randomizer.GetInRange(5, 8);		//RM-RCM-LCM-LM
		  if (this.Possession==RESEtTEAM.BLUE) {
		     this.BallVelocity.X = (BluePlayerPositions[this.Player][0]-this.Ball.X)/180;
		     this.BallVelocity.Y = (BluePlayerPositions[this.Player][1]-this.Ball.Y)/180;
		  } else {
		     this.BallVelocity.X = (RedPlayerPositions[this.Player][0]-this.Ball.X)/180;
		     this.BallVelocity.Y = (RedPlayerPositions[this.Player][1]-this.Ball.Y)/180;
		  }
		  this.State = RESEtSTATE.DtoM;
	       } else { //turn ball over to opposite midfielder
		  this.SwitchPossession();
		  if (this.Player>8)
		     this.State = RESEtSTATE.S;
		  else
		     this.State = RESEtSTATE.M;
	       }
	       this.Frames = 0;
	    }
	    break;
	 case RESEtSTATE.DtoM:
	    if (this.Frames==180) {
	       this.State = RESEtSTATE.M;
	       this.Frames = 0;
	    } else {
	       this.Ball.X += this.BallVelocity.X;
	       this.Ball.Y += this.BallVelocity.Y;
	    }
	    break;
	 case RESEtSTATE.M:
	    if (this.Frames==60) {

	       //Check if tackled by opposite midfielder - if so switch possession
	       if (this.GetWinner()) {  //pass to selected striker
		  this.Player = this.Randomizer.GetInRange(9, 10);		//RS-LS
		  if (this.Possession==RESEtTEAM.BLUE) {
		     this.BallVelocity.X = (BluePlayerPositions[this.Player][0]-this.Ball.X)/180;
		     this.BallVelocity.Y = (BluePlayerPositions[this.Player][1]-this.Ball.Y)/180;
		  } else {
		     this.BallVelocity.X = (RedPlayerPositions[this.Player][0]-this.Ball.X)/180;
		     this.BallVelocity.Y = (RedPlayerPositions[this.Player][1]-this.Ball.Y)/180;
		  }
		  this.State = RESEtSTATE.MtoS;
	       } else {  //turn ball over to opposite midfielder
		  this.SwitchPossession();
		  if (this.Player<5)
		     this.State = RESEtSTATE.D;
	       }

	       this.Frames = 0;
	    }
	    break;
	 case RESEtSTATE.MtoS:
	    if (this.Frames==180) {
	       this.State = RESEtSTATE.S;
	       this.Frames = 0;
	    } else {
	       this.Ball.X += this.BallVelocity.X;
	       this.Ball.Y += this.BallVelocity.Y;
	    }
	    break;
	 case RESEtSTATE.S:
	    if (this.Frames==60) {
	       //Check if tackled by opposite defender - if so switch possession
	       if (this.GetWinner()) {  //shoot
		  this.Shoot();
		  this.State = RESEtSTATE.StoG;
	       } else {  //turn ball over to opposite defender
		  this.SwitchPossession();
		  this.State = RESEtSTATE.D;
	       }
	       this.Frames = 0;
	    }
	    break;
	 case RESEtSTATE.StoG:
	    if (this.Frames==140) {
	       this.State = RESEtSTATE.PAUSED;
	       this.Frames = 0;
	       this.Ball.X = 180;
	       this.Ball.Y = 270;
	       if (this.shot==3 || this.shot==5) {
		  if (this.Possession==RESEtTEAM.BLUE)
		     ++this.BlueGoals;
		  else
		     ++this.RedGoals;
		  this.UpdateScoreBoard();
	       }
	       this.Possession = !this.Possession;
	    } else {
	       this.Ball.X += this.BallVelocity.X;
	       this.Ball.Y += this.BallVelocity.Y;
	    }
	    break;
      }
   },
   PlaceBall() {
      if (this.Possession==RESEtTEAM.BLUE) {
	 this.Ball.X = BluePlayerPositions[this.Player][0];
	 this.Ball.Y = BluePlayerPositions[this.Player][1];
      } else {
	 this.Ball.X = RedPlayerPositions[this.Player][0];
	 this.Ball.Y = RedPlayerPositions[this.Player][1];
      }
   },
   GetWinner() {
      var aRating, dRating;  //a- attacker, d- defender

      if (this.Possession==RESEtTEAM.BLUE) {
	 aRating = Utils.GradeToNumber(this.BlueTeam[this.Player]);
	 dRating = Utils.GradeToNumber(this.RedTeam[MatchUps[this.Player]]);
      } else {
	 aRating = Utils.GradeToNumber(this.RedTeam[this.Player]);
	 dRating = Utils.GradeToNumber(this.BlueTeam[MatchUps[this.Player]]);
      }
      return (this.Randomizer.GetWinner(aRating, dRating, INVERTED)==MATChUP.ATTACKER);
   },
   SetBallVelocity() {

      //UNLOGGED

   },
   Shoot() {
      var x;

      this.shot = this.Randomizer.GetInRange(1, 7);
      switch (this.shot) {
	 case 1:
	    x = 135;
	    break;
	 case 2:
	    x = 147;
	    break;
	 case 3:
	    x = 158;
	    break;
	 case 4:
	    x = 179;
	    break;
	 case 5:
	    x = 200;
	    break;
	 case 6:
	    x = 212;
	    break;
	 case 7:
	    x = 223;
	    break;
      }
      this.BallVelocity.X = ((x-this.Ball.X)+this.Player)/140;
      if (this.Possession==RESEtTEAM.BLUE)
	 this.BallVelocity.Y = (540-this.Ball.Y)/140;
      else
	 this.BallVelocity.Y = (0-this.Ball.Y)/140;
   },
   DrawBall() {
      this.GraphicsTool.DrawCircle(this.Ball.X, this.Ball.Y, 5, "white", 0);
      this.GraphicsTool.DrawCircle(this.Ball.X, this.Ball.Y, 5, "black", 1);
   },
   SetScreen() {
      var i;

      this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      //Write player grades
      for (i=0;i<MATCH.PLAYERS;++i) {
	 this.TextWriter.Write(this.BlueTeam[i], BluePlayerPositions[i][0]+360, BluePlayerPositions[i][1]);
	 this.TextWriter.Write(this.RedTeam[i], RedPlayerPositions[i][0]+360, RedPlayerPositions[i][1]);
      }
   },
   GetPlayerClicked() {  //returns index
      var i;
      var l, t, w, h;

      w = BlueFootballerSprite.Width;
      h = BlueFootballerSprite.Height;
      for (i=1;i<MATCH.PLAYERS;++i) {
	 l = BluePlayerPositions[i][0];
	 t = BluePlayerPositions[i][1] - BlueFootballerSprite.Height;
	 if (SpaceUtils.CheckPointInBox(Mouse.GetClickCoordinates(), { L: l, T: t, W: w, H: h } ))
	    return (i);
      }
   },
   ExchangePlayers() {

      this.AnimationFrameHandle = requestAnimationFrame(this.ExchangePlayers.bind(this));

      if (Mouse.CheckLeftClicked()) {
	 this.PlayerIndex2 = this.GetPlayerClicked();
	 if (this.PlayerIndex2) {
	    cancelAnimationFrame(this.AnimationFrameHandle);
	    this.BlueTeam.Swap(this.PlayerIndex1, this.PlayerIndex2);
	    this.Play();
	 }
      }
   },
   SwitchPossession() {
      this.Player = MatchUps[this.Player];
      if (this.Possession==RESEtTEAM.BLUE) {
	  this.Ball.X = RedPlayerPositions[this.Player][0];
	  this.Ball.Y = RedPlayerPositions[this.Player][1];
	  this.Possession = RESEtTEAM.RED;
      } else {
	  this.Ball.X = BluePlayerPositions[this.Player][0];
	  this.Ball.Y = BluePlayerPositions[this.Player][1];
	  this.Possession = RESEtTEAM.BLUE;
      }
   },
   UpdateScoreBoard() {

      this.Screen.clearRect(360, 0, 100, 50);
      this.TextWriter.Write("Blue Team", 370, 20);
      this.TextWriter.Write(this.BlueGoals, 440, 20);
      this.TextWriter.Write("Red Team", 370, 40);
      this.TextWriter.Write(this.RedGoals, 440, 40);
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      PitchImage.Draw();
      this.DrawPlayers();
      this.DrawBall();
      this.UpdateBall();

      if (Mouse.CheckLeftClicked())
	 if (this.State==RESEtSTATE.PAUSED) {
	    this.PlayerIndex1 = this.GetPlayerClicked();
	    if (this.PlayerIndex1) {
	       cancelAnimationFrame(this.AnimationFrameHandle);
	       this.ExchangePlayers();
	    }
	 }

      ++this.Frames;
   }
};

var BluePlayerPositions = [ [170,20], [50,115],[130,115],[210,115],[290,115], [25,250],[120,250],[220,250],[315,250], [100,400],[240,400] ];
var RedPlayerPositions = [ [170,520], [290,425],[210,425],[130,425],[50,425], [315,290],[220,290],[120,290],[25,290], [240,140],[100,140] ];
var MatchUps = [0, 8, 10, 9, 5, 4, 7, 6, 1, 3, 2];
var MATChUP = { ATTACKER: 0, DEFENDER: 1 };
