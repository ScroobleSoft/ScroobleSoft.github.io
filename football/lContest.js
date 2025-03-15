
//----------------------------------------------
//---------- LEAGUE CONTEST --------------------
var LeagueContest = function () {
	var CalcPad;
	var ScreenRect, ScreenQuad;
	var Type;

	var LoadIndex;

	var i;
};
LeagueContest.prototype = new GenieGame();
LeagueContest.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
	this.ScreenRect.Set(SCREEN.WIDTH/2, SCREEN.HEIGHT/2, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.ScreenQuad = ArrayUtils.Create(VERTICES.QUAD, Coordinate2D);
	this.Components = new FootballComponents();
	this.Type = FOOTBALL.TYPE.CUSTOM;

	this.LoadIndex = 0;
};
LeagueContest.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
};
LeagueContest.prototype.Start = function() {

	if (this.Settings & GAME.PLATFORM.PHONE) {
		LeagueView.Open();
		return;
	} else if (this.Settings & GAME.PLATFORM.TABLET) {
		Intro.Start();
		return;
	}
	this.SetPerspective();
/* TEMP
		this.Screen.fillStyle = PAINT.LIME;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		LeftFootballerSprite.Draw( 40, 40, 0);
		LeftFootballerSprite.Draw( 70, 40, 1);
		LeftFootballerSprite.Draw(100, 40, 2);
		LeftFootballerSprite.Draw(130, 40, 3);
		LeftFootballerSprite.Draw(160, 40, 4);
		LeftFootballerSprite.Draw(190, 40, 5);

		FrontFootballerSprite.Draw( 40, 80, 0);
		FrontFootballerSprite.Draw( 70, 80, 1);
		FrontFootballerSprite.Draw(100, 80, 2);
		FrontFootballerSprite.Draw(130, 80, 3);
		FrontFootballerSprite.Draw(160, 80, 4);
		return;
TEMP */
	HomeSideViewPlayers.forEach(function(plyr){plyr.Unit = null;});		//clearing Intro info
	AwaySideViewPlayers.forEach(function(plyr){plyr.Unit = null;});
	this.InfoBox.fillStyle = "rgb(47,159,255)";
	this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	LeagueView.OpenCustom();
	LeagueView.UpdateCustom();

//	this.Play();		//TODO: this can be replaced by a view
};
LeagueContest.prototype.Play = function() {  //REDUNDANT

	this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		if (LoadButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.LoadGame();
	 TeamSelected = Teams[6];  //TODO: right now Everton only
	 this.RemoveControls();
		}

		for (this.i=0;this.i<TeamButtons.length;++this.i)
	 if (TeamButtons[this.i].CheckClicked()) {
		 cancelAnimationFrame(this.AnimationFrameHandle);
		 TeamSelected = Teams[this.i];
		 this.StartNewGame();
	 }
/*
		if (StartMatchButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
		 for (this.i=0;this.i<TeamButtons.length;++this.i)
			 TeamButtons[this.i].Enabled = false;
	 this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	 MatchSideView.Operate();
		}
*/
};
LeagueContest.prototype.SetPerspective = function() {  //NOTE: for IsoPitch, will have separate Perspective Utils object
		var scale;

		scale = { X: (SVfArTOUChLINE.R.X-SVfArTOUChLINE.L.X)/(SVnEArTOUChLINE.R.X-SVnEArTOUChLINE.L.X), Y: (SVnEArTOUChLINE.L.Y-SVfArTOUChLINE.L.Y)/PITCH.B };
		PerspectiveUtils.SetPerspective(PERSPECTIVE.BIRDsEYE, this.ScreenRect, this.ScreenQuad, scale);
};
LeagueContest.prototype.GameOptionsSet = function() {  //REDUNDANT, needs to be UNLOGGED

		LeagueView.Close();
		/***** TEMP *****/
		TeamSelected.Schedule = new SeasonSchedule();
		TeamSelected.Schedule.Set(this.Screen, this.Randomizer);
		TeamSelected.Schedule.Generate();
		/***** TEMP *****/
		TeamView.SetTeam(TeamSelected);
		TeamView.Open();

//		SquadView.SetTeam(TeamSelected);
//		SquadView.Show();
};
LeagueContest.prototype.RemoveControls = function() {
		var i;

		for (i=0;i<TeamButtons.length;++i)
	 TeamButtons[i].Enabled = false;
		LoadButton.Hide();
};
LeagueContest.prototype.LoadGame = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.LoadGame.bind(this));

		//UNLOGGED

		if (LoadButton.CheckClicked()) {
	 if (this.LoadIndex==1)
		 this.LoadSquad();
	 else if (this.LoadIndex==2)
		 this.LoadYouthTeam();
	 else {
		 cancelAnimationFrame(this.AnimationFrameHandle);
		 /***** TEMP *****/
		  //NOTE: later whole league will be retreived, but for now other teams will be created here
		 for (this.i=0;this.i<LEAGUE.TEAMS;++this.i)
			 if (this.i!=TeamSelected.Index) {
		  Teams[this.i].Squad.SetNamesAndAges();
		  Teams[this.i].Squad.AssignPrecisePositions();
		  Teams[this.i].Squad.GenerateRandomRatings();
			 }
		 /***** TEMP *****/
	 setTimeout(this.StartSeason.bind(this), 100);
	 }
	 ++this.LoadIndex
		}
};
LeagueContest.prototype.LoadSquad = function() {
		var i;
		var dArray;  //d- data
		var tArea;

		dArray = Utilities.Create2DArray(SQUAD.SIZE, 5);
		tArea = new GenieTextArea();
		tArea.Set("SquadTextArea");
		tArea.LoadArray(dArray);

		for (i=0;i<SQUAD.SIZE;++i) {
	 TeamSelected.Squad.Players[i].Name.First = dArray[i][0];
	 TeamSelected.Squad.Players[i].Name.Last = dArray[i][1];
	 TeamSelected.Squad.Players[i].Age = dArray[i][2];
	 TeamSelected.Squad.Players[i].Position = dArray[i][3];
	 TeamSelected.Squad.Players[i].Quality = dArray[i][4];
	 //TODO: load stats
		}
};
LeagueContest.prototype.LoadYouthTeam = function() {
};
LeagueContest.prototype.StartNewGame = function() {
		var i;

		//Get team picked, start game based on options selected
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 switch (GameRadioOptions.Selected) {
		 case GAMeTYPE.PReSET: 
		 case GAMeTYPE.RANDOM:
			 alert("Option not implemented");
			 for (i=0;i<TeamButtons.length;++i)
		  TeamButtons[i].Enabled = true;
			 this.Play();
			 return;
		 case GAMeTYPE.PRECISE:
			 this.RemoveControls();
//			 if (i==TeamSelected.Index)
//		  continue;
			 Teams[i].Squad.SetNamesAndAges();
			 Teams[i].Squad.AssignPrecisePositions();
			 Teams[i].Squad.GenerateRandomRatings();
			 break;
	 }

	 //Set budget
	 if (i==TeamSelected.Index)
		 continue;
	 switch (GameRadioOptions.Selected) {
		 case BUDGET.ZERO: 
			 Teams[i].Budget = 0;
			 break;
		 case BUDGET.RANDOM:
			 Teams[i].Budget = this.Randomizer.GetInRange(1,20);	//HARD-CODED
			 break;
		 case BUDGET.ATTENDANCE:
			 Teams[i].Budget = 5 + Math.round(TeamData[i][1]*0.2);		//NOTE: range is 5 to 20
			 break;
	 }
		}

		//Remove game options
		GameRadioOptions.Hide();
		BudgetRadioOptions.Hide();

		SquadView.SetTeam(TeamSelected);
		SquadView.Show();
};
LeagueContest.prototype.StartMatch = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.StartMatch.bind(this));

		this.Interface.ControllerA.CheckControls();
		if (this.Interface.ControllerA.Left) --IsoPitch.OnScreen.L;
		if (this.Interface.ControllerA.Right) ++IsoPitch.OnScreen.L;
		if (this.Interface.ControllerA.Up) --IsoPitch.OnScreen.T;
		if (this.Interface.ControllerA.Down) ++IsoPitch.OnScreen.T;

		IsoPitch.Draw();
};
LeagueContest.prototype.StartSeason = function() {
		var i;

/*
		var season = new BasicMiniGame();
		season.Set(this.Screen, TeamSelected);
		season.Play();
*/
		//Get team picked, start game based on options selected
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 switch (GameRadioOptions.Selected) {
		 case GAMeTYPE.PReSET: 
		 case GAMeTYPE.RANDOM:
/*
			 this.TextWriter.SwitchContext(CANVAS.CONSOLE);
			 this.TextWriter.Write("Option not implemented", 5, 100);
			 this.TextWriter.SwitchContext(CANVAS.PRIME);
*/
	 alert("Option not implemented");
			 for (i=0;i<TeamButtons.length;++i)
		  TeamButtons[i].Enabled = true;
			 this.Play();
			 return;
		 case GAMeTYPE.PRECISE:
	 if (i==TeamSelected.Index)
		 continue;
			 Teams[i].Squad.SetNamesAndAges();
			 Teams[i].Squad.AssignPrecisePositions();
			 Teams[i].Squad.GenerateRandomRatings();
			 break;
	 }

	 //Set budget
	 if (i==TeamSelected.Index)
		 continue;
	 switch (GameRadioOptions.Selected) {
		 case BUDGET.ZERO: 
			 Teams[i].Budget = 0;
			 break;
		 case BUDGET.RANDOM:
			 Teams[i].Budget = this.Randomizer.GetInRange(1,20);	//HARD-CODED
			 break;
		 case BUDGET.ATTENDANCE:
			 Teams[i].Budget = 5 + Math.round(TeamData[i][1]*0.2);		//NOTE: range is 5 to 20
			 break;
	 }
		}

		//Remove game options
		GameRadioOptions.Hide();
		BudgetRadioOptions.Hide();

		SquadView.SetTeam(TeamSelected);
		SquadView.Show();
};
LeagueContest.prototype.PlayStriker = function() {
		var i;

		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		for (i=0;i<TeamButtons.length;++i)
	 TeamButtons[i].Enabled = false;

		var striker = new StrikerMiniGame();
		striker.Set(this.Screen, this.GraphicsTool);
		striker.Play();
};
LeagueContest.prototype.PlayTempReset = function() {

		cancelAnimationFrame(this.AnimationFrameHandle);

		LeagueView.Close();

		var rGame = new ResetMiniGame();
		rGame.Set(this.Screen, this.GraphicsTool, this.TextWriter, this.Randomizer);
		rGame.Play();
};
