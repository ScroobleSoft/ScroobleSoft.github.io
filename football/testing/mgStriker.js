
//-------------------------------------------------
//---------- STRIKER MINI GAME --------------------
var StrikerMiniGame = function() {
   var Screen;
   var GraphicsTool;
   var Winger, FullBack, Striker, Defender, GoalKeeper;
   var Ball, BallVelocity;

   var CentreForward, CentreBack;

   /***** TEMP *****/
   var SideViewPitch;
   /***** TEMP *****/
};
StrikerMiniGame.prototype = {
   Set(cntxt, gTool) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;

      this.Winger = new TopDownPlayer();
      this.FullBack = new TopDownPlayer();
      this.Striker = new TopDownPlayer();
      this.Defender = new TopDownPlayer();
      this.GoalKeeper = new TopDownPlayer();

      this.Winger.Set( { SPEED: 0.5 }, FrontFootballerSprite, "blue");
      this.Winger.SetLinks(null, null, this.GraphicsTool);
      this.Winger.SetPosition( { X: 300, Y: 40 } );
      this.Winger.SetDirection(DIRECTION.L);
      this.FullBack.Set( { SPEED: 0.5 }, FrontFootballerSprite, "red");
      this.FullBack.SetLinks(null, null, this.GraphicsTool);
      this.FullBack.SetPosition( { X: 260, Y: 40 } );
      this.FullBack.SetDirection(DIRECTION.L);
      this.Striker.Set( { SPEED: 0.5 }, FrontFootballerSprite, "blue");
      this.Striker.SetLinks(null, null, this.GraphicsTool);
      this.Striker.SetPosition( { X: 200, Y: 300 } );
      this.Striker.SetDirection(DIRECTION.L);
      this.Defender.Set( { SPEED: 0.5 }, FrontFootballerSprite, "red");
      this.Defender.SetLinks(null, null, this.GraphicsTool);
      this.Defender.SetPosition( { X: 160, Y: 300 } );
      this.Defender.SetDirection(DIRECTION.L);
      this.GoalKeeper.Set( { SPEED: 0.5 }, FrontFootballerSprite, "yellow");
      this.GoalKeeper.SetLinks(null, null, this.GraphicsTool);
      this.GoalKeeper.SetPosition( { X: 50, Y: 300 } );
      this.GoalKeeper.SetDirection(DIRECTION.L);

      this.Ball = { X: 100, Y: 20 };
      this.BallVelocity = { X: 0, Y: 2 };

      this.CentreForward = new FootballMatchPlayer();
      this.CentreForward.Set(null, BlueSideOnSprite);
      this.CentreForward.SetPosition( { X: 860, Y: 200 } );
      this.CentreForward.SetDirection(DIRECTION.W);
      this.CentreForward.State.Motion = STATE.MOTION.ADVANCING;
      this.CentreBack = new FootballMatchPlayer();
      this.CentreBack.Set(null, RedSideOnSprite);
      this.CentreBack.SetPosition( { X: 820, Y: 200 } );
      this.CentreBack.SetDirection(DIRECTION.W);
      this.CentreBack.State.Motion = STATE.MOTION.ADVANCING;

      /***** TEMP *****/
      this.SideViewPitch = new BufferedSideViewFootballPitch();
      this.SideViewPitch.Set(this.Screen, this.GraphicsTool);
      this.SideViewPitch.Generate();
      /***** TEMP *****/
   },
   DrawPitch() {
      this.Screen.fillStyle = "rgb(0,207,0)";
      this.Screen.fillRect(0, 0, 400, SCREEN.HEIGHT);

      this.GraphicsTool.DrawRectangle(31, 1, 400, 598, "white", 3);
      this.GraphicsTool.DrawRectangle(31, 114, 166, 370, "white", 3);
      this.GraphicsTool.DrawRectangle(1, 242, 33, 116, "white", 3);

      /***** TEMP *****/
      this.Screen.drawImage(this.SideViewPitch.Buffer.Canvas, 0, 0, 500, 400, 400, 0, 500, 400);
      BlueSideOnSprite.Draw(600, 100);
      RedSideOnSprite.Draw(550, 100);
      /***** TEMP *****/
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      this.DrawPitch();

      this.Winger.Draw();
      this.FullBack.Draw();
      this.Striker.Draw();
      this.Defender.Draw();
      this.GoalKeeper.Draw();
/* TEMP */
      this.GraphicsTool.DrawCircle(307, 407, 2, "aqua", 0);
      this.GraphicsTool.DrawCircle(293, 393, 2, "aqua", 0);
      this.GraphicsTool.DrawCircle(300, 400, 10, "aqua", 0);
      this.GraphicsTool.DrawCircle(307, 457, 3, "aqua", 0);
      this.GraphicsTool.DrawCircle(293, 443, 3, "aqua", 0);
      this.GraphicsTool.DrawCircle(300, 450, 10, "aqua", 0);
      this.GraphicsTool.DrawCircle(307, 507, 4, "aqua", 0);
      this.GraphicsTool.DrawCircle(293, 493, 4, "aqua", 0);
      this.GraphicsTool.DrawCircle(300, 500, 10, "aqua", 0);
/* TEMP */
      if (this.Ball.Y<600) {
	 this.Ball.X += this.BallVelocity.X;
	 this.Ball.Y += this.BallVelocity.Y;
      }
      this.GraphicsTool.DrawCircle(this.Ball.X, this.Ball.Y, 3, "white", 0);

      this.CentreForward.Draw();
      this.GraphicsTool.DrawCircle(this.CentreForward.Position.X, this.CentreForward.Position.Y, 3, "white", 0);
      this.GraphicsTool.DrawCircle(this.CentreForward.Position.X, this.CentreForward.Position.Y, 3, "black", 1);
      this.CentreBack.Draw();
      this.CentreForward.Position.X -= 0.5;
      this.CentreBack.Position.X -= 0.5;

      FootieController.CheckControls();
      if (FootieController.Left)  --this.Striker.Position.X;
      if (FootieController.Right)  ++this.Striker.Position.X;
      if (FootieController.LeftClick) {
	 //closer to striker (but within circumference is mis-kick or header), greater the power
	 //atan to see which direction ball goes in, ball having to be on outside half of striker
	 if (Utilities.GetDistance(this.Ball, this.Striker.Position)<20) {
	    this.BallVelocity.X = -2;
	    this.BallVelocity.Y = 0;
	 }
      }
   }
};

//-----------------------------------------------
//---------- TOP DOWN PLAYER --------------------
var TopDownPlayer = function() {
   var Colour;
};
TopDownPlayer.prototype = new GenieAgent();
TopDownPlayer.prototype.Set = function(specs, sprite, unit) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.Colour = unit;
};
TopDownPlayer.prototype.Draw = function() {
   this.GraphicsTool.DrawCircle(this.Position.X, this.Position.Y, 10, this.Colour, 0);
};
