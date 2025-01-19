
ZFLTesting.prototype.SetRosterProgression = function() {

   this.ProgressionTeams = new GenieArray();
   this.ProgressionTeams.Set(LEAGUE.TEAMS, GridironTeam, INDEXED, this.Randomizer);
   this.ProgressionRatings = ArrayUtils.Create2D(LEAGUE.TEAMS, 12);
   this.ProgressionGrades = new Array(10);
   this.ProgressionPrefixes = ["","/","!","*","$","+","^","v"];
   this.ConstructProgressionRosters();
   this.DisplayProgressionRosters();
   this.DisplayProgressionText();
};
ZFLTesting.prototype.DisplayProgressionText = function() {

   Intro.HideButtons();
   this.InfoBox.fillStyle = PAINT.SKY;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.Write("This is a test to see how overall", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("roster quality changes over", 5, 55, null, CANVAS.ZOOM);
   this.TextWriter.Write("successive seasons and drafts - ", 5, 70, null, CANVAS.ZOOM);
   this.TextWriter.Write("surprisingly, it remains constant", 5, 85, null, CANVAS.ZOOM);
   this.TextWriter.Write("(only last six columns are relevant),", 5, 100, null, CANVAS.ZOOM);
   this.TextWriter.Write("but it is too top heavy (A's are", 5, 115, null, CANVAS.ZOOM);
   this.TextWriter.Write("too numerous).", 5, 130, null, CANVAS.ZOOM);

   this.TextWriter.Write("Click screen to see roster, click", 5, 150, null, CANVAS.ZOOM);
   this.TextWriter.Write("again to see roster grade", 5, 165, null, CANVAS.ZOOM);
   this.TextWriter.Write("distribution.", 5, 180, null, CANVAS.ZOOM);

   this.TextWriter.Write("Click again to see grade distribution.", 5, 200, null, CANVAS.ZOOM);
};
ZFLTesting.prototype.PlayRosterProgression = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayRosterProgression.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      RosterSubView.SetRoster(this.ProgressionTeams[0].Roster);
      RosterSubView.Open();
      this.PollProgressionClick();

      //TEMP - random numbers might be biased high, but this test suggests they are not
      var i;
      var aNums;
      aNums = new Array(15);
      aNums.fill(0);
      for (i=0;i<1000;++i)
	 ++aNums[this.Randomizer.GetInRange(1,15)-1];

      //TEMP - checking if slot distribution is as intended (seems right)
      aNums.fill(0);
      for (i=0;i<1200;++i)
	 ++aNums[this.Randomizer.GetSlot(DraftValueDistribution)];
      i = 0;
   }
};
ZFLTesting.prototype.ConstructProgressionRosters = function() {
   var i, j, k;

   for (i=0;i<12;++i) {
      for (j=0;j<LEAGUE.TEAMS;++j) {
	 this.DraftProgressionNormals(this.ProgressionTeams[j].Roster);
	 this.DraftProgressionOthers(this.ProgressionTeams[j].Roster);
	 this.TrainProgressionRoster(this.ProgressionTeams[j].Roster);
	 this.ProgressionRatings[j][i] = this.GetProgressionRating(this.ProgressionTeams[j].Roster);
      }
   }

   for (i=0;i<LEAGUE.TEAMS;++i)
      this.TrimProgressionRoster(this.ProgressionTeams[i].Roster);

   //Ammend ages
   for (i=0;i<LEAGUE.TEAMS;++i)
      for (j=0;j<this.ProgressionTeams[i].Roster.Gridders.length;++j)
	 for (k=0;k<this.ProgressionTeams[i].Roster.Gridders[j].length;++k)
	    --this.ProgressionTeams[i].Roster.Gridders[j][k].Experience;
};
ZFLTesting.prototype.DraftProgressionNormals = function(roster) {
   var i;
   var prospect;

   for (i=0;i<4;++i) {
      prospect = GridironUtils.CreateGridder(this.Randomizer.GetSlot(PositionDistribution));
      prospect.History = new Array();
      Draft.SetNormal(prospect);
      if (prospect.Value<6)
	 prospect.Drafted = 1;
      else if (prospect.Value<9)
	 prospect.Drafted = 2;
      else if (prospect.Value<12)
	 prospect.Drafted = 3;
      else if (prospect.Value<15)
	 prospect.Drafted = 4;
      prospect.History.push(Utils.NumberToGrade(prospect.Quality));
      prospect.History.push(prospect.Potential);
      roster.AddGridder(prospect);
   }
};
ZFLTesting.prototype.DraftProgressionOthers = function(roster) {
   var i;
   var prospect;

   for (i=0;i<3;++i) {
      prospect = GridironUtils.CreateGridder(this.Randomizer.GetSlot(PositionDistribution));
      prospect.History = new Array();
      switch (this.Randomizer.GetIndex(8)) {
	 case 0:
	 case 1:
	 case 2:
	    Draft.SetFringe(prospect);
	    break;
	 case 3:
	 case 4:
	 case 5:
	 case 6:
	    prospect.SetAlternate();
	    break;
	 case 7:
	    Draft.SetDimensional(prospect);
	    break;
      }
      prospect.Drafted = 5 + i;
      prospect.History.push(Utils.NumberToGrade(prospect.Quality));
      prospect.History.push(prospect.Potential);
      roster.AddGridder(prospect);
   }
};
ZFLTesting.prototype.TrimProgressionRoster = function(roster) {
   var i, j;
   var val;
   var nGridders;

   //Count the number of gridders on the roster
   nGridders = 0;
   for (i=0;i<roster.Gridders.length;++i)
      for (j=0;j<roster.Gridders[i].length;++j)
	 ++nGridders;

   //Remove lowest value players from roster
   val = 29;
   while (nGridders>ROSTER.SLOTS) {
	 for (i=0;i<roster.Gridders.length;++i)
	    for (j=0;j<roster.Gridders[i].length;++j)
	       if (roster.Gridders[i][j].Value>=val) {
		  roster.RemoveGridder(roster.Gridders[i][j]);
		  --nGridders;
		  --j;							//HACK!
		  if (nGridders==ROSTER.SLOTS)				//NOTE: have to exit here since there are 2 loops, so can't use 'break'
		     return;
	       }
	 --val;
   }
};
ZFLTesting.prototype.TrainProgressionRoster = function(roster) {
   var i, j;

   for (i=0;i<roster.Gridders.length;++i)
      for (j=0;j<roster.Gridders[i].length;++j) {
			roster.Gridders[i][j].Train();
			roster.Gridders[i][j].History.push(Utils.NumberToGrade(roster.Gridders[i][j].Quality));
			++roster.Gridders[i][j].Experience;
      }
};
ZFLTesting.prototype.DisplayProgressionRosters = function() {
   var i, j;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Diplay yearly ratings
   for (i=0;i<LEAGUE.TEAMS;++i) {
      this.TextWriter.Write(TeamNames[i][0], 5, (15*i)+40);
      for (j=0;j<12;++j)
	 this.TextWriter.Write(Utils.NumberToGrade(this.ProgressionRatings[i][j]), 200+(25*j), (15*i)+40);
   }

   //Diplay final trimmed ratings
   this.TextWriter.Write("Trimmed", 495, 20);
   for (i=0;i<LEAGUE.TEAMS;++i)
      this.TextWriter.Write(Utils.NumberToGrade(this.GetProgressionRating(this.ProgressionTeams[i].Roster)), 220+(25*j), (15*i)+40);
};
ZFLTesting.prototype.GetProgressionRating = function(roster) {
   var i, j;
   var nGridders;
   var quality;

   nGridders = 0;
   quality = 0;
   for (i=0;i<POSITION.COUNT;++i)
      for (j=0;j<roster.Gridders[i].length;++j) {
	 quality += roster.Gridders[i][j].Quality;
	 ++nGridders;
      }

   return (Math.round(quality/nGridders));
};
ZFLTesting.prototype.PollProgressionClick = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PollProgressionClick.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      this.DisplayProgressionGrades();
   }
};
ZFLTesting.prototype.DisplayProgressionGrades = function() {
   var i, j, k;
   var aGrades;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Diplay final grades
   aGrades = new Array(10);
   aGrades.fill(0);
   for (i=0;i<LEAGUE.TEAMS;++i) {
      this.TextWriter.Write(TeamNames[i][0], 5, (15*i)+20);
      this.ProgressionGrades.fill(0);
      for (j=0;j<POSITION.COUNT;++j)
	 for (k=0;k<this.ProgressionTeams[i].Roster.Gridders[j].length;++k) {
	    ++this.ProgressionGrades[Math.floor(this.ProgressionTeams[i].Roster.Gridders[j][k].Quality/3)];
	    ++aGrades[Math.floor(this.ProgressionTeams[i].Roster.Gridders[j][k].Quality/3)];
	 }
      for (j=0;j<10;++j)
	 this.TextWriter.Write(this.ProgressionGrades[j], 200+(25*j), (15*i)+20);
   }

   //Display average grades
   for (j=0;j<10;++j)
      this.TextWriter.Write(Math.round(aGrades[j]/LEAGUE.TEAMS), 200+(25*j), (15*i)+20);

   this.PollProgressionDraftees();
};
ZFLTesting.prototype.PollProgressionDraftees = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PollProgressionDraftees.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      this.DisplayProgressionDraftees();
   }
};
ZFLTesting.prototype.DisplayProgressionDraftees = function() {
   var i, j, k;
   var roster;
   var nGridders;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   roster = this.ProgressionTeams[0].Roster;
   nGridders = 0;
   for (i=0;i<POSITION.COUNT/2;++i) {
      this.TextWriter.Write(Positions[i], 5, 40+(20*nGridders), { FONT: "10px Arial" } );
      for (j=0;j<roster.Gridders[i].length;++j) {
	 info = this.ProgressionPrefixes[roster.Gridders[i][j].Type] + roster.Gridders[i][j].Name.First[0] + roster.Gridders[i][j].Name.Last[0];
	 this.TextWriter.Write(info, 30, 40+(20*nGridders), { FONT: "10px Arial" } );
	 this.TextWriter.Write(roster.Gridders[i][j].Drafted, 60, 40+(20*nGridders), { FONT: "10px Arial" } );
	 for (k=0;k<roster.Gridders[i][j].History.length;++k)
	    this.TextWriter.Write(roster.Gridders[i][j].History[k], 75+(15*k), 40+(20*nGridders), { FONT: "10px Arial" } );
	 ++nGridders;
      }
   }

   nGridders = 0;
   for (i=POSITION.COUNT/2;i<POSITION.COUNT;++i) {
      this.TextWriter.Write(Positions[i], 285, 40+(20*nGridders), { FONT: "10px Arial" } );
      for (j=0;j<roster.Gridders[i].length;++j) {
	 info = this.ProgressionPrefixes[roster.Gridders[i][j].Type] + roster.Gridders[i][j].Name.First[0] + roster.Gridders[i][j].Name.Last[0];
	 this.TextWriter.Write(info, 310, 40+(20*nGridders), { FONT: "10px Arial" } );
	 this.TextWriter.Write(roster.Gridders[i][j].Drafted, 340, 40+(20*nGridders), { FONT: "10px Arial" } );
	 for (k=0;k<roster.Gridders[i][j].History.length;++k)
	    this.TextWriter.Write(roster.Gridders[i][j].History[k], 365+(15*k), 40+(20*nGridders), { FONT: "10px Arial" } );
	 ++nGridders;
      }
   }
};
