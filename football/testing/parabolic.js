/*
 *  NOTE: dipping (as in over a wall) will not be implemented because it is rather complicated . . . so might need to calculate at source
 *	  how to achieve that
 */
FootballTesting.prototype.SetParabolicTest = function() {

   this.SetParabolicPlayer();
   this.SetParabolicBall();
   this.Stanchion1 = new Coordinate2D();
   this.Stanchion2 = new Coordinate2D();
   this.ScreenRect.L = 400;
   PerspectiveUtils.DetermineQuad(this.ScreenRect.L+(this.ScreenRect.W/2), PITCH.B/2);

   this.DisplayParabolicText();
};
FootballTesting.prototype.DisplayParabolicText = function() {

   this.TextWriter.Write("Left click for clockwise arc", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("Right click for anti-clockwise arc", 5, 55, null, CANVAS.ZOOM);
   this.TextWriter.Write("Ball resets when reaching", 5, 70, null, CANVAS.ZOOM);
   this.TextWriter.Write("destination, can be kicked again", 5, 85, null, CANVAS.ZOOM);
};
FootballTesting.prototype.SetParabolicPlayer = function() {

   this.Crosser = new FootballMatchPlayer();
   this.Crosser.Set(SIDeOnPLAYER, RightFootballerSprite);
   this.Crosser.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer, this.ScreenRect);
   this.Crosser.SetPosition( { X: 1000, Y: 100 } );
   this.Crosser.SetDirection(DIRECTION.W);
   this.Crosser.Team = Teams[6];
   this.Crosser.Home = true;
};
FootballTesting.prototype.SetParabolicBall = function() {

   this.Ball = new GenieProjectile();
   this.Ball.Set( { SPEED: 1.0, PARABOLIC: PARABOLIC.BOTH }, FootballSprite);
   this.Ball.SetLinks(this.ScreenRect);
   this.Ball.SetPosition(this.Crosser.Position);
   this.Ball.Elevation = 0;
};
FootballTesting.prototype.PlayParabolicTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayParabolicTest.bind(this));

   this.DrawSmudgingPitch();
   this.Crosser.Draw();
   this.Ball.Draw();
   this.Ball.Update();

   this.UpdateParabolicClick();
   if (this.Ball.CheckAtDestination()) {
      this.Ball.SetPosition(this.Crosser.Position);
      this.Ball.State.Motion = STATE.MOTION.STATIONARY;
   }
};
FootballTesting.prototype.UpdateParabolicClick = function() {

   if (Mouse.CheckClicked(CANVAS.PRIME)) {
      coords.X = Mouse.Click.X + this.ScreenRect.L;
      coords.Y = Mouse.Click.Y;
      this.Ball.SetDestination(coords);
      if (Mouse.CheckLeftClicked(CANVAS.PRIME))
	 this.Ball.SetHVParabolic(40, DIRECTION.CLOCKWISE, 20);
      else {
	 this.Ball.SetHVParabolic(40, DIRECTION.ANTiCLOCKWISE, 20);
	 Mouse.RightClicked = false;
      }
   } else
      Mouse.ClearClicks();
};
