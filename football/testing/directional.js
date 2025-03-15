
FootballTesting.prototype.SetDirectionalMovement = function() {

   this.ScreenRect.Set(400, 0, SCREEN.WIDTH, 400);
   this.DirectionalDestination = new Coordinate2D();
   this.SetDirectionalPlayer();
   this.DisplayDirectionalInfo();
};
FootballTesting.prototype.DisplayDirectionalInfo = function() {

   this.InfoBox.fillStlye = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.SetContext(this.InfoBox);

   this.TextWriter.Write("Animation demonstration.", 5, 20);
   this.TextWriter.Write("Click on pitch to move", 5, 40);
   this.TextWriter.Write("player.", 5, 55);

   this.TextWriter.RestoreContext();
};
FootballTesting.prototype.PlayDirectionalMovement = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayDirectionalMovement.bind(this));

   SideViewPitch.Draw();
   this.DirectionalPlayer.Draw();
   this.DirectionalPlayer.Update();

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.UpdateDirectionalClick();
   else
      Mouse.ClearClicks();
};
FootballTesting.prototype.SetDirectionalPlayer = function() {

   this.DirectionalPlayer = new SideViewPlayer();
   this.DirectionalPlayer.Set(SIDeVIEwFOOTBALLER, LeftFootballerSprite);
   this.DirectionalPlayer.SetLinks(this.TextWriter, this.ScreenRect);
   this.DirectionalPlayer.SetPosition( { X: 800, Y: 540 } );
   this.DirectionalPlayer.Direction = DIRECTION.E;
   this.DirectionalPlayer.SetTeam(Teams[0]);
};
FootballTesting.prototype.UpdateDirectionalClick = function() {

   this.DirectionalDestination.Set(Mouse.Click.X, Mouse.Click.Y);
   FootUtils.SideViewToCartesian(this.DirectionalDestination);
   this.DirectionalPlayer.SetDestination(this.DirectionalDestination);
};
