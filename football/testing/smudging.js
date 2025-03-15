
FootballTesting.prototype.SetSmudgingTest = function() {

   this.ScreenRect.L = (PITCH.SIDeVIEW.W-SCREEN.WIDTH)/2;
   this.ScreenRect.T = 0;
   this.Stanchion1 = new Coordinate2D();
   this.Stanchion2 = new Coordinate2D();
   this.SetSmudgingPositions();

   this.Frames = 15;
   this.States = [1,0,2,0,1,0,3,0];
   this.AnimationState = 0;
   this.FPS30Flag = false;
   this.SkipFlag = false;
   this.RoundFlag = false;

   this.DisplaySmudgingText();
};
FootballTesting.prototype.DisplaySmudgingText = function() {

   this.TextWriter.Write("This checks how bad smudging looks", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("with fractional positions", 5, 55, null, CANVAS.ZOOM);
   this.TextWriter.Write("To that end, clicking Info Box", 5, 70, null, CANVAS.ZOOM);
   this.TextWriter.Write("toggles between rounding or not", 5, 85, null, CANVAS.ZOOM);
   this.TextWriter.Write("Clicking Control Panel flips", 5, 105, null, CANVAS.ZOOM);
   this.TextWriter.Write("between 60 and 30 fps", 5, 120, null, CANVAS.ZOOM);
   this.TextWriter.Write("Conclusions: smudging doesn't", 5, 150, null, CANVAS.ZOOM);
   this.TextWriter.Write("look too bad, rounding just a", 5, 165, null, CANVAS.ZOOM);
   this.TextWriter.Write("bit jarring but also looks like", 5, 180, null, CANVAS.ZOOM);
   this.TextWriter.Write("player exerting himself, while", 5, 195, null, CANVAS.ZOOM);
   this.TextWriter.Write("30fps is too slow; will stay with", 5, 210, null, CANVAS.ZOOM);
   this.TextWriter.Write("floating point speeds in 60fps", 5, 225, null, CANVAS.ZOOM);
};
FootballTesting.prototype.SetSmudgingPositions = function() {

   this.LMPosition = new Coordinate2D();
   this.LMPosition.Set(600, 100);
   this.LMSpeed = 1.0;
   this.RMPosition = new Coordinate2D();
   this.RMPosition.Set(610, 90);
   this.RMSpeed = 1.1;
};
FootballTesting.prototype.PlaySmudgingTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlaySmudgingTest.bind(this));

   if (this.FPS30Flag) {
      this.SkipFlag = !this.SkipFlag;
      if (this.SkipFlag)
	 return;
   }

   this.DrawSmudgingPitch();
   if (this.RoundFlag)
      BlueSideOnSprite.Draw(Math.round(this.RMPosition.X), this.RMPosition.Y, this.States[this.AnimationState]);
   else
      BlueSideOnSprite.Draw(this.RMPosition.X, this.RMPosition.Y, this.States[this.AnimationState]);
   RedSideOnSprite.DrawFlipped(this.LMPosition.X, this.LMPosition.Y, FLIPPED.HORIZONTAL, this.States[this.AnimationState]);
   this.UpdateSmudgingStates();
   this.UpdateSmudgingForm();
};
FootballTesting.prototype.DrawSmudgingPitch = function() {

   this.Screen.fillStyle = GREEN.TWO;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, PITCH.SIDeVIEW.H);
   this.DrawMarkings();
};
FootballTesting.prototype.UpdateSmudgingStates = function() {

   this.LMPosition.X -= this.LMSpeed;
   this.RMPosition.X -= this.RMSpeed;
   --this.Frames;
   if (!this.Frames) {
      ++this.AnimationState;
      if (this.AnimationState==4)
	 this.AnimationState = 0;
      this.Frames = 15;
   }
};
FootballTesting.prototype.UpdateSmudgingForm = function() {

   if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
      this.LMPosition.X = 600;
      this.RMPosition.X = 610;
   } else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
      this.RoundFlag = !this.RoundFlag;
   else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE))
      this.FPS30Flag = !this.FPS30Flag;
};
