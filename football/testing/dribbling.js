/*
 *  better wingers will have shorter dribbles (changes in direction), while poorer full-backs will have longer changes of direction
 *  there is a probability in each change of direction and run of ball being tackled, so the greater the attempts the greater the chance of turning ball over
 */
FootballTesting.prototype.SetDribblingDemo = function() {

   this.SetDribblingPlayers();
   this.SetDribblingPitch();
};
FootballTesting.prototype.SetDribblingPlayers = function() {

   this.Winger = new FootballMatchPlayer();
   this.Winger.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.Winger.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.Winger.SetPosition( { X: 365, Y: 75 } );
   this.Winger.SetDirection(DIRECTION.W);
   this.Winger.State.Motion = STATE.MOTION.ADVANCING;
   this.Winger.Team = Teams[6];
   this.Winger.SetDirection(DIRECTION.W);

   this.FullBack = new FootballMatchPlayer();
   this.FullBack.Set(SIDeOnPLAYER, LeftFootballerSprite);
   this.FullBack.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
   this.FullBack.SetPosition( { X: 350, Y: 90 } );
   this.FullBack.State.Motion = STATE.MOTION.ADVANCING;
   this.FullBack.Team = Teams[0];
};
FootballTesting.prototype.SetDribblingPitch = function() {

   this.SideViewPitch = new BufferedSideViewFootballPitch();
   this.SideViewPitch.Set(this.Screen, this.GraphicsTool);
   this.SideViewPitch.Generate();
};
FootballTesting.prototype.PlayDribblingDemo = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayDribblingDemo.bind(this));

   //-going to write events like TACKLED! and DRIBBLED! (successfully) right next to where action takes place in 1.5-2X normal font because player's eyes are
   // already there, and doesn't have to be flashed in huge font a la FBPRO96

   this.Screen.drawImage(this.SideViewPitch.Buffer.Canvas, 0, 0);
   this.Winger.Draw();
   this.FullBack.Draw();
   this.UpdateDribblingPlayers();
};
FootballTesting.prototype.UpdateDribblingPlayers = function() {

   this.Winger.Update();
   this.FullBack.Update();
   if (this.Winger.Direction==DIRECTION.W) {
      this.GraphicsTool.DrawCircle(this.Winger.Position.X, this.Winger.Position.Y, 3, "white", 0);
      this.GraphicsTool.DrawCircle(this.Winger.Position.X, this.Winger.Position.Y, 3, "black", 1);
//      this.Winger.Position.X -= 0.5;
//      this.FullBack.Position.X -= 0.5;
   } else {
      this.GraphicsTool.DrawCircle(this.Winger.Position.X+this.Winger.Sprite.Specs.W, this.Winger.Position.Y, 3, "white", 0);
      this.GraphicsTool.DrawCircle(this.Winger.Position.X+this.Winger.Sprite.Specs.W, this.Winger.Position.Y, 3, "black", 1);
//      this.Winger.Position.X += 0.5;
//      this.FullBack.Position.X += 0.5;
   }

   //Update direction
   if (this.Winger.Position.X<=350) {
//      this.Winger.SetDirection(DIRECTION.E);
//      this.FullBack.SetDirection(DIRECTION.E);
      this.Winger.TurnAround();
      this.FullBack.TurnAround();
   }
   if (this.Winger.Position.X>=400) {
//      this.Winger.SetDirection(DIRECTION.W);
//      this.FullBack.SetDirection(DIRECTION.W);
      this.Winger.TurnAround();
      this.FullBack.TurnAround();
   }
};
