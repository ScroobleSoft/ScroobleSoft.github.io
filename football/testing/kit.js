
FootballTesting.prototype.SetKitClash = function() {

   this.ScreenRect.Set(0, 0, SCREEN.WIDTH, 400);
   Match.SetTeams(Teams[0], Teams[1]);
   this.SetKitFootballers();
   this.DrawKitAssets();
   OpponentNameImages.Draw(20, 360);
   OpponentNameImages.Draw(220, 360);
   this.DisplayKitInfo();
};
FootballTesting.prototype.DisplayKitInfo = function() {

   this.InfoBox.fillStyle = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.SetContext(this.InfoBox);

   this.TextWriter.Write("This is a check to see if the", 5, 20);
   this.TextWriter.Write("KitMatchUps array resolves", 5, 35);
   this.TextWriter.Write("colour clashes.", 5, 50);

   this.TextWriter.Write("Click on team names to switch kits.", 5, 70);

   this.TextWriter.RestoreContext();
};
FootballTesting.prototype.PlayKitClash = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayKitClash.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.UpdateKitClick();
   else
      Mouse.ClearClicks();

};
FootballTesting.prototype.SetKitFootballers = function() {
   var i;
   var x, y;

   for (i=0;i<MATCH.PLAYERS;++i) {
      x = this.Randomizer.GetInRange(5, 370);
      y = this.Randomizer.GetInRange(40, 340);
      HomeSideViewPlayers[i].ScreenCoords.Set(x, y);
      HomeSideViewPlayers[i].SetMatch(Match);
      HomeSideViewPlayers[i].SetTeam(Teams[0]);
      x = this.Randomizer.GetInRange(405, 770);
      y = this.Randomizer.GetInRange(40, 340);
      AwaySideViewPlayers[i].ScreenCoords.Set(x, y);
      AwaySideViewPlayers[i].SetMatch(Match);
      AwaySideViewPlayers[i].SetTeam(Teams[1]);
   }
};
FootballTesting.prototype.UpdateKitClick = function() {
   var iTeam;

   if (Mouse.CheckBoxClicked( { L: 20, T: 360, W: 106, H: 240 } )) {
      iTeam = Math.floor((Mouse.Click.Y-360)/12);
      Match.HomeTeam = Teams[iTeam];
      HomeSideViewPlayers.forEach(function(plyr) {plyr.SetTeam(Teams[iTeam]);});
      AwaySideViewPlayers.forEach(function(plyr) {plyr.SetColours();});
      this.DrawKitAssets();
   }
   if (Mouse.CheckBoxClicked( { L: 220, T: 360, W: 106, H: 240 } )) {
      iTeam = Math.floor((Mouse.Click.Y-360)/12);
      Match.AwayTeam = Teams[iTeam];
      AwaySideViewPlayers.forEach(function(plyr) {plyr.SetTeam(Teams[iTeam]);});
      this.DrawKitAssets();
   }
};
FootballTesting.prototype.DrawKitAssets = function() {

   this.Screen.fillStyle = PITCH.COLOUR;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, 350);
   HomeSideViewPlayers.forEach(function(ftbllr) {ftbllr.ExecuteDraw();});
   AwaySideViewPlayers.forEach(function(ftbllr) {ftbllr.ExecuteDraw();});
};
