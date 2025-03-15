
FootballTesting.prototype.SetFormationsDisplay = function() {

   this.RightFormation = this.Randomizer.GetIndex(FORMATION.TYPES);
   this.LeftFormation = this.Randomizer.GetIndex(FORMATION.TYPES);
   this.RightPosition = 300;
   this.LeftPosition = 1300;
   this.Stanchion1 = new Coordinate2D();
   this.Stanchion2 = new Coordinate2D();
   this.ScreenRect.Set(200, 0, 800, 400);

   this.SetFormationTeams();
   this.SetFormationUnits();
   this.SetFormationPositions();
   this.DisplayFormationText();
};
FootballTesting.prototype.DisplayFormationText = function() {

   this.TextWriter.Write("Running this test requires", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("loading and creating a league", 5, 55, null, CANVAS.ZOOM);
   this.TextWriter.Write("Home formation: " + FormationNames[this.LeftFormation], 5, 75, null, CANVAS.ZOOM);
   this.TextWriter.Write("Away formation: " + FormationNames[this.RightFormation], 5, 90, null, CANVAS.ZOOM);
};
FootballTesting.prototype.SetFormationTeams = function() {
   var aTeams;

   aTeams = new Array(2);
   this.Randomizer.GetUniqueIndices(aTeams, 2, LEAGUE.TEAMS);
   HomeSideViewPlayers.forEach(function(plyr){plyr.Team=Teams[aTeams[0]];});
   AwaySideViewPlayers.forEach(function(plyr){plyr.Team=Teams[aTeams[1]];});
};
FootballTesting.prototype.SetFormationUnits = function() {
   var player;
   var quality;

   player = new FootballPlayer();
   player.Set(this.Randomizer);
   for (i=0;i<MATCH.PLAYERS;++i) {
	 player.GenerateName();
	 player.GenerateAppearance();
	 quality = this.Randomizer.GetIndex(8);
	 HomeSideViewPlayers[i].SetUnit( { Name: { Last: player.Name.Last }, Appearance: player.Appearance, Quality: quality } );
	 player.GenerateName();
	 player.GenerateAppearance();
	 quality = this.Randomizer.GetIndex(8);
	 AwaySideViewPlayers[i].SetUnit( { Name: { Last: player.Name.Last }, Appearance: player.Appearance, Quality: quality } );
   }
};
FootballTesting.prototype.SetFormationPositions = function() {
   var i;
   var x, y;

   for (i=1;i<PLAYERS.TOTAL;++i) {
      x = (FormationZones[this.RightFormation][i][0]+0.5)*PITCH.SIDeVIEW.ZONE.W;
      x += this.RightPosition;
      y = PITCH.B - PITCH.SIDeVIEW.ZONE.H;
      y -= (FormationZones[this.RightFormation][i][1]+0.5)*PITCH.SIDeVIEW.ZONE.H;
      HomeSideViewPlayers[i].Position.Set(x, y);
      x = this.LeftPosition;
      x -= (FormationZones[this.LeftFormation][i][0]+0.5)*PITCH.SIDeVIEW.ZONE.W;
      y = PITCH.B - PITCH.SIDeVIEW.ZONE.H;
      y -= (FormationZones[this.LeftFormation][i][1]+0.5)*PITCH.SIDeVIEW.ZONE.H;
      AwaySideViewPlayers[i].Position.Set(x, y);
   }
};
FootballTesting.prototype.PlayFormationsDisplay = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayFormationsDisplay.bind(this));

   //Pitch
   this.Screen.fillStyle = GREEN.TWO;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, PITCH.SIDeVIEW.H);
   this.DrawMarkings();

   this.Screen.fillStyle = "yellow";					//TEMP
   this.Screen.fillRect(0, 400, SCREEN.WIDTH, 200);			//TEMP

   this.DrawFormationPlayers();
};
FootballTesting.prototype.DrawFormationPlayers = function() {
/*
   PerspectiveUtils.DetermineQuad(this.ScreenRect.L+(this.ScreenRect.W/2), PITCH.B/2);
   HomeSideViewPlayers.forEach(function(plyr){if (plyr.CheckOnScreen()) plyr.Draw();});
   AwaySideViewPlayers.forEach(function(plyr){if (plyr.CheckOnScreen()) plyr.Draw();});
*/
   HomeSideViewPlayers.forEach(function(plyr){plyr.DetermineScreenCoords();});
   AwaySideViewPlayers.forEach(function(plyr){plyr.DetermineScreenCoords();});
   HomeSideViewPlayers.forEach(function(plyr){plyr.CheckOnScreen();});
   AwaySideViewPlayers.forEach(function(plyr){plyr.CheckOnScreen();});
//   HomeSideViewPlayers.forEach(function(plyr){if (plyr.CheckVisible()) plyr.ExecuteDraw();});
//   AwaySideViewPlayers.forEach(function(plyr){if (plyr.CheckVisible()) plyr.ExecuteDraw();});
   HomeSideViewPlayers.forEach(function(plyr){plyr.ExecuteDraw();});
   AwaySideViewPlayers.forEach(function(plyr){plyr.ExecuteDraw();});
};
