
FootballTesting.prototype.SetFormationConformance = function() {

   this.Stanchion1 = new Coordinate2D();
   this.Stanchion2 = new Coordinate2D();
   this.SetConformanceMatch();
   this.SetConformancePositions();
   this.DrawConformanceAssets();
   this.DisplayConsole();
   this.DisplayConformanceInfo();
};
FootballTesting.prototype.DisplayConformanceInfo = function() {

   this.InfoBox.fillStlye = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.SetContext(this.InfoBox);

   this.TextWriter.Write("Click on formation labels", 5, 20);
   this.TextWriter.Write("to switch for home and away", 5, 35);
   this.TextWriter.Write("teams, in conformance with", 5, 50);
   this.TextWriter.Write("player configuration shown", 5, 65);
   this.TextWriter.Write("in bottom left.", 5, 80);

   this.TextWriter.RestoreContext();
};
FootballTesting.prototype.PlayFormationConformance = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayFormationConformance.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.UpdateConformanceClick();
   else
      Mouse.ClearClicks();
};
FootballTesting.prototype.SetConformanceMatch = function() {

   this.ScreenRect.Set(0, 0, 800, 400);
   this.LeftConformanceFormation = FORMATION.F442;
   this.RightConformanceFormation = FORMATION.F442;
   this.LeftConformancePosition = 200;
   this.RightConformancePosition = 1000;
   this.LineUpPriority = [ 5,6,4,7,3,8,2,9,1,10 ];
   this.ConformanceCandidates = new Array(MATCH.PLAYERS-1);
   this.ConformanceDistances = new Array(MATCH.PLAYERS-1);
   this.SortedDistances = new Array(MATCH.PLAYERS-1);
   this.ConformedPlayers = new Array(MATCH.PLAYERS-1);
   Match.SetTeams(Teams[0], Teams[1]);
   HomeSideViewPlayers.forEach(function(plyr){plyr.SetTeam(Teams[0]);});
   AwaySideViewPlayers.forEach(function(plyr){plyr.SetTeam(Teams[1]);});
};
FootballTesting.prototype.SetConformancePositions = function() {
   var i;
   var x, y;

   for (i=1;i<PLAYERS.TOTAL;++i) {
      x = (FormationZones[this.LeftConformanceFormation][i][0]+0.5)*PITCH.SIDeVIEW.ZONE.W;
      x += this.LeftConformancePosition;
      y = PITCH.B - PITCH.SIDeVIEW.ZONE.H;
      y -= (FormationZones[this.LeftConformanceFormation][i][1]+0.5)*PITCH.SIDeVIEW.ZONE.H;
      HomeSideViewPlayers[i].Position.Set(x, y);
      x = this.RightConformancePosition;
      x -= (FormationZones[this.RightConformanceFormation][i][0]+0.5)*PITCH.SIDeVIEW.ZONE.W;
      y = PITCH.B - PITCH.SIDeVIEW.ZONE.H;
      y -= (FormationZones[this.RightConformanceFormation][i][1]+0.5)*PITCH.SIDeVIEW.ZONE.H;
      AwaySideViewPlayers[i].Position.Set(x, y);
   }
};
FootballTesting.prototype.DrawConformanceAssets = function() {

   this.Screen.fillStyle = GREEN.TWO;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, 400);
   this.DrawMarkings();
   HomeSideViewPlayers.forEach(function(plyr){plyr.Draw();});
   AwaySideViewPlayers.forEach(function(plyr){plyr.Draw();});
};
FootballTesting.prototype.DisplayConsole = function() {
   var i;
   var x, y;
   var iIcon;

   iIcon = new GenieImage;
   iIcon.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], { L: 109, T: 61, W: 286, H: 64 } );
   iIcon.Draw(400, 420);
   iIcon.Draw(400, 520);

   this.LeftGoalDiagram = [ [40,514],[444,854],[340,684],[340,528],[340,358],[436,198],[588,702],[586,556],[586,386],[814,640],[810,428] ];
   this.RightGoalDiagram = [ [1560,514],[864,248],[920,426],[920,644],[862,808],[676,356],[674,522],[674,674],[478,244],[400,478],[430,664] ];

   this.Screen.fillStyle = "green";
   this.Screen.fillRect(0, 400, 200, 200);

   for (i=1;i<MATCH.PLAYERS;++i) {
      x = (this.LeftGoalDiagram[i][0]-320)/3.2;
      y = (this.LeftGoalDiagram[i][1]-160)/3.6;
      this.GraphicsTool.DrawCircle(x, 400+y, 4, "red", 0);
      this.GraphicsTool.DrawCircle(x, 400+y, 4, "black", 1);
      x = (this.RightGoalDiagram[i][0]-320)/3.2;
      y = (this.RightGoalDiagram[i][1]-160)/3.6;
      this.GraphicsTool.DrawCircle(x, 400+y, 4, "blue", 0);
      this.GraphicsTool.DrawCircle(x, 400+y, 4, "black", 1);
   }
};
FootballTesting.prototype.UpdateConformanceClick = function() {
   var iFrmtn;

   if (Mouse.CheckBoxClicked( { L: 400, T: 420, W: 286, H: 64 } )) {
      iFrmtn = 4 * Math.floor((Mouse.Click.Y-420)/22);
      iFrmtn += Math.floor((Mouse.Click.X-400)/72);
      this.LeftConformanceFormation = iFrmtn;
      this.ConformPositions(this.LeftGoalDiagram, HomeSideViewPlayers);
      this.DrawConformanceAssets();
   }
   if (Mouse.CheckBoxClicked( { L: 400, T: 520, W: 286, H: 64 } )) {
      iFrmtn = 4 * Math.floor((Mouse.Click.Y-520)/22);
      iFrmtn += Math.floor((Mouse.Click.X-400)/72);
      this.RightConformanceFormation = iFrmtn;
      this.ConformPositions(this.RightGoalDiagram, AwaySideViewPlayers);
      this.DrawConformanceAssets();
   }
};
FootballTesting.prototype.ConformPositions = function(aDiagram, aPlayers) {
   var i, j;

   this.ConformedPlayers.fill(false);
   for (i=0;i<this.LineUpPriority.length;++i) {

      //Create sorted list of distances from selected position
      for (j=0;j<this.ConformanceDistances.length;++j) {
	 this.ConformanceDistances[j] = SpaceUtils.GetDistance(aDiagram[this.LineUpPriority[i]], aPlayers[j+1].Position);
	 this.SortedDistances[j] = this.ConformanceDistances[j];
      }
      this.SortedDistances.sort(function(a, b) {return b.Y-a.Y;});

      //Generate a priority list of candidates for the position
      for (j=0;j<this.ConformanceCandidates.length;++j)
	 this.ConformanceCandidates[j] = this.SortedDistances.indexOf(this.ConformanceDistances[j]);

      //Assign the closest available player to that position
      for (j=0;j<this.ConformedPlayers.length;++j)
	 if (!this.ConformedPlayers[j]) {
	    aPlayers[j+1].SetPosition(aDiagram[this.LineUpPriority[i]]);
	    this.ConformedPlayers[j] = true;
	    break;
	 }
   }
};
