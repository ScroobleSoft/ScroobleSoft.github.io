
FootballTesting.prototype.SetAnimationDemo = function() {

   this.Striker = new FootballMatchPlayer();
   this.Striker.Set( { X: 600, Y: 200 }, null, DIRECTION.W, SIDeOnPLAYER, LeftFootballerSprite);
   this.Striker.State.Motion = STATE.MOTION.ADVANCING;
/*
   this.FullBack = new FootballMatchPlayer();
   this.FullBack.Set( { X: 350, Y: 90 }, null, DIRECTION.W, SIDeOnPLAYER, RedSideOnSprite);
   this.FullBack.State.Motion = STATE.MOTION.ADVANCING;
*/
   /***** TEMP *****/
   this.SideViewPitch = new BufferedSideViewFootballPitch();
   this.SideViewPitch.Set(this.Screen, this.GraphicsTool);
   this.SideViewPitch.Generate();
   /***** TEMP *****/
};
FootballTesting.prototype.PlayAnimationDemo = function() {

   //UNLOGGED

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayAnimationDemo.bind(this));

   this.Screen.drawImage(this.SideViewPitch.Buffer.Canvas, 0, 0);
   this.Striker.Draw();
   this.Striker.Update();
   if (this.Striker.Position.X<100)
      this.Striker.SetDirection(DIRECTION.E);
/*
   if (this.Winger.Direction==DIRECTION.W) {
      this.GraphicsTool.DrawCircle(this.Winger.Position.X, this.Winger.Position.Y, 3, "white", 0);
      this.GraphicsTool.DrawCircle(this.Winger.Position.X, this.Winger.Position.Y, 3, "black", 1);
      this.Winger.Position.X -= 0.5;
      this.FullBack.Position.X -= 0.5;
   } else {
      this.GraphicsTool.DrawCircle(this.Winger.Position.X+this.Winger.Sprite.Specs.W, this.Winger.Position.Y, 3, "white", 0);
      this.GraphicsTool.DrawCircle(this.Winger.Position.X+this.Winger.Sprite.Specs.W, this.Winger.Position.Y, 3, "black", 1);
      this.Winger.Position.X += 0.5;
      this.FullBack.Position.X += 0.5;
   }
   this.FullBack.Draw();

   //Update direction
   if (this.Winger.Position.X<=350) {
      this.Winger.SetDirection(DIRECTION.E);
      this.FullBack.SetDirection(DIRECTION.E);
   }
   if (this.Winger.Position.X>=400) {
      this.Winger.SetDirection(DIRECTION.W);
      this.FullBack.SetDirection(DIRECTION.W);
   }
*/
};
