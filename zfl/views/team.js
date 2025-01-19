
//--------------------------------------------------
//---------- GRIDIRON TEAM VIEW --------------------
var GridironTeamView = function() {
	var Team;
	var Trades;		//list of strings with trade info
	var Info;

	var i;
};
GridironTeamView.prototype = new GenieView();
GridironTeamView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.NestedView = RosterNestedView;
};
GridironTeamView.prototype.SetTeam = function(team) {

	this.Team = team;
	RosterNestedView.SetRoster(this.Team.Roster);
	PracticeSquadNestedView.SetSquad(this.Team.PracticeSquad);
	RetirementDialogView.SetRoster(this.Team.Roster);
	DraftView.SetRoster(this.Team.Roster);
};
GridironTeamView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.NestedView.Open();
	switch (this.NestedView.Id) {
		case this.Specs.SUB.INFO:
			break;
		case this.Specs.SUB.ROSTER:
			if (this.NestedView.SelectedSlot)
				GridderNestedView.SetGridder(this.NestedView.SelectedSlot.Player);
			else
				GridderNestedView.SetGridder(PracticeSquadNestedView.SelectedSlot.Player);
			GridderNestedView.Open();
			PracticeSquadNestedView.Open();
			break;
		case this.Specs.SUB.TRANSACTIONS:
			break;
		case this.Specs.SUB.PLAYBOOK:
			break;
		case this.Specs.SUB.OPPONENT:
			break;
		case this.Specs.SUB.LEAGUE:
			break;
	}
	Game.Interface.ResumeInput();

	this.Update();
};
GridironTeamView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.NestedView.Update();
	switch (this.NestedView.Id) {
		case this.Specs.SUB.INFO:
			this.UpdateInfo();
			break;
		case this.Specs.SUB.ROSTER:
			this.UpdateRoster();
			break;
		case this.Specs.SUB.TRANSACTIONS:
			this.UpdateTransactions();
			break;
		case this.Specs.SUB.PLAYBOOK:
			this.UpdatePlaybook();
			break;
		case this.Specs.SUB.OPPONENT:
			this.UpdateOpponent();
			break;
		case this.Specs.SUB.LEAGUE:
			this.UpdateLeague();
			break;
	}
};
GridironTeamView.prototype.UpdateOld = function() {

		//TODO: check only icon panel here and pass everything on to nested view

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.ConsoleView.StartSeasonButton.CheckClicked()) {
//			cancelAnimationFrame(this.AnimationFrameHandle);
		Teams.forEach(function(team) {team.StartNewSeason();});
		League.GamesPlayed = SEASON.STATE.START;
		this.InfoView.Disable();
		this.ConsoleView.Disable();
		RetirementView.Open();
	}

		if (this.NestedView) {
			this.NestedView.Update();
			switch (this.NestedView.Id) {
				case this.Specs.SUB.INFO:
					this.UpdateInfo();
					break;
				case this.Specs.SUB.ROSTER:
					GridderNestedView.Update();
//					PracticeSquadNestedView.Update();
					break;
				case this.Specs.SUB.TRANSACTIONS:
					this.UpdateTransactions();
					break;
				case this.Specs.SUB.PLAYBOOK:
					this.UpdatePlaybook();
					break;
				case this.Specs.SUB.OPPONENT:
					this.UpdateOpponent();
					break;
				case this.Specs.SUB.LEAGUE:
					this.UpdateLeague();
					break;
			}
		}

		return;

		/***** all below is copied over - a lot may be REDUNDANT *****/

		//-check icon panel for any change
		this.NestedView.Update();

		if (DraftPreviewButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
//	 DraftButton.Hide();
	 DraftPreviewButton.Hide();
	 RosterNestedView.Close();
	 this.IconPanel.Hide();
	 this.Randomizer.Seed1 = League.Seed1;
	 this.Randomizer.Seed2 = League.Seed2;
	 Draft.Generate();
	 DraftPreview.SetDraft(Draft);
	 DraftPreview.Open();
	 DraftPreview.Update();
		}

		if (this.PendingFAsButton.CheckClicked()) {
	 this.Close();
	 PendingFAsView.Open();
		}

		return;		//TEMP

		if (this.StartSeasonButton.CheckClicked()) {
	 this.StartSeasonButton.Hide();
	 Teams.forEach(function(team){team.Roster.EraseInjuries();});			//TODO: this is TEMP to grandfather in old games
	 Teams.forEach(function(team){team.StartNewSeason();});
	 RosterNestedView.DisplayRoster();
//	 this.DisplayRetirees();		//TODO: will move this display to TransactionsView
//	 OrganizeButton.Show();			//TODO: button REDUNDANT
	 this.ConsoleScape.Context.fillStyle = NFLcOLOUR.TURQUOISE;
	 this.ConsoleScape.Context.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);
	 PracticeSquadSubSubView.DisplayGridders();
	 League.GamesPlayed = SEASON.STATE;
	 DraftButton.Show();
	 DraftPreviewButton.Show();
	 League.Dump();
	 TradeRadioOptions.Show();		//TODO: already opened in GridderView?
		}
		if (DraftButton.CheckClicked()) {
	 DraftButton.Hide();
	 DraftPreviewButton.Hide();
	 RosterNestedView.Close();
//	 ViewsIconPanel.Hide();
	 Teams.forEach(function(team){team.PracticeSquad.PromoteAll();});
	 Teams.forEach(function(team){team.GenerateDraftProfile();});
	 Teams.forEach(function(team){team.EvaluateNeeds();});
	 Draft.Generate();
	 DraftSubView.SetDraft(Draft);
	 DraftSubView.Open();
	 this.NestedView = DraftSubView;
//	 DraftTabs.Display();
//	 NewDraft.Generate();
//	 Game.RunDraft();
		}

		if (UDFAsButton.CheckClicked()) {
	 UDFAsButton.Hide();
	 SupplementalDraftButton.Show();
		}

		if (SupplementalDraftButton.CheckClicked()) {
	 SupplementalDraftButton.Hide();
	 this.SignProjects();
	 CampButton.Show();
		}
/*
		if (WaiveButton.CheckClicked()) {
	 DraftSubView.ClaimAlternate();			//NOTE: this method no longer exists
		}
*/
		if (CampButton.CheckClicked()) {
	 DraftSubView.Close();
//	 TrainingCampSubView.Open();
	 this.NestedView = TrainingCampSubView;
	 //--- TEMP ---
	 Teams.forEach(function(team){team.Roster.RunTrainingCamp();});
	 FreeAgency.SortGridders();
	 League.GamesPlayed = SEASON.POStCUTS;
	 League.GamesPlayed = 0;			//TODO: putting this in here temporarily
	 League.Dump();
	 RosterNestedView.Open();
	 for (indx=0;indx<PlayerTeam.Transactions.length;++indx)
		 this.TextWriter.Write(PlayerTeam.Transactions[indx], 5, 220+(15*indx), null, CANVAS.CONSOLE);
	 //--- TEMP ---
		}
/* TODO: SeasonsButton now REDUNDANT, has to be removed and DE-LOGGED
		if (SeasonsButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 RosterNestedView.Close();
	 SeasonsButton.Hide(GREY.SILVER);
	 DraftButton.Display();
	 QuickGame.Play();
		}
*/
		if (ScoutButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Close();
	 ScoutView.Open();
	 ScoutView.Update();
		}
/*** TEMP ***/
		if (SignFAsButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 FreeAgencyView.DisplayAgents();
		}
/*** TEMP ***/
		if (SignPlayerButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 RosterNestedView.Close();
	 TradePlayerButton.Hide();
	 SignPlayerButton.Hide();
	 FreeAgentView.Open();
	 FreeAgentView.Update();
		}

		if (HikeButton.CheckClicked()) {
	 this.NestedView.Close();
	 this.Close();
	 var iTeam = this.Randomizer.GetNumberWithinRange(0, 30);	//TEMP
	 if (iTeam==PlayerTeam.Index)					//TEMP
		 ++iTeam;							//TEMP
//	 PlayerTeam.SelectStarters();
//	 Teams[iTeam].SelectStarters();
//	 GameSim.SetTeams(this.Team, Teams[iTeam]);
	 GameSideView.SetTeams(PlayerTeam, Teams[iTeam]);
	 GameSideView.Play();
//	 GameSideView.PlayGame();
//	 GameSideView.RunPassPlaySequence();
//	 GameSideView.RunningAnimation();
		}

		if (SeasonSimButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.SubView.InfoView.Close();
	 this.SubView.Close();
	 SeasonSimView.Open();
	 SeasonSimView.Update();
		}
/*
		if (Mouse.CheckLeftClicked()) {		//TODO: message passed to whichever sub-view is open
	 if (Mouse.CanvasId==CANVAS.PRIME)
		 RosterNestedView.ClickedOn();
	 else {  //zoomscape - OPEN: not anticipating Control Panel clicks just now
	 }
		} else if (Mouse.CanvasId==CANVAS.PRIME)
	 if (TeamTabs.SelectionIndex==TEAmTABS.PLAYERS)
		 RosterNestedView.Update();
*/
//		if (Mouse.CheckLeftClicked())
//	 this.SubView.UpdateClick();
};
/*
GridironTeamView.prototype.Close = function() {

		//UNLOGGED

		cancelAnimationFrame(this.AnimationFrameHandle);

		//-disable all relevant buttons
		ScoutButton.Hide();
		this.StartSeasonButton.Hide();
		TeamTabs.Enabled = false;
//		RosterNestedView.Close();
//		this.SubView.Close();
		this.InfoScape.Context.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
};
*/
GridironTeamView.prototype.ShowControls = function() {

		//UNLOGGED

		return;
/*
		//TEMP
		DraftPreviewButton.Show();
		this.PendingFAsButton.Disable();
		this.PendingFAsButton.Show();
		this.StartSeasonButton.Show();
		return;
*/
/*
		ScoutButton.Display();
		ExecuteButton.Display();
		HikeButton.Display();
		StartGameButton.Display();
		DraftButton.Display();
		SeasonsButton.Show();
*/
		switch (League.GamesPlayed) {  //NOTE: this switch is needed for games just loaded
	 case SEASON.STATE.END:
		 this.StartSeasonButton.Display();
		 break;
	 case SEASON.STATE.START:
		 //-could list retirements here, except if game is just loaded (for former, should write info as players are cut)
		 DraftButton.Show();
		 DraftPreviewButton.Show();
		 break;
	 case SEASON.STATE.PReDRAFT:
		 TeamTabs.SelectTab(TEAmTABS.TRADES);
		 this.DisplayTrades();
		 break;
	 case SEASON.STATE.POStDRAFT:
		 UDFAsButton.Display();
		 break;
	 case SEASON.STATE.POStUFA:
		 CampButton.Display();
		 break;
	 case SEASON.STATE.POStCAMP:
		 SignFAsButton.Display();
		 break;
	 case SEASON.STATE.POStCUTS:
	 default:
		 HikeButton.Show();
		 SeasonSimButton.Show();
//		 TradePlayerButton.Display();
//		 SignPlayerButton.Display();
		 SignFAsButton.Display();
		 break;
		}
/* */
//		TradePlayerButton.Show();
};
GridironTeamView.prototype.DisplayDraftOrder = function() {
		var i;

		this.Context.fillStyle = GREY.LIGHT;
		this.Context.fillRect(400, 0, 200, SCREEN.HEIGHT);
		this.TextWriter.Write("Draft Order:", 405, 15, { FONT: "bold 14px Arial", COLOUR: "black" } );
		for (i=0;i<32;++i) {
	 this.TextWriter.Write((i+1)+".", 400, 14*(i+2), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(TeamNames[NewDraft.SelectionOrder[i]][0], 425, 14*(i+2), { FONT: "12px Arial" } );
		}
};
GridironTeamView.prototype.DisplayRetirees = function() {
		var i;
		var retiree;

		//TODO: put a 'more' button if retiree list will overflow, clicking which would pop up a window with full list

		this.TextWriter.Write("Retiring Players:", 405, 480, { FONT: "bold 14px Arial", COLOUR: "black" } );
		for (i=0;i<this.Team.Roster.RetiredPlayers.length;++i) {
	 retiree = this.Team.Roster.RetiredPlayers[i];
	 this.TextWriter.Write(Positions[retiree.Position], 405, 480+(16*(i+1)), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(retiree.Name.GetFullName(), 430, 480+(16*(i+1)), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(retiree.Quality), 550, 480+(16*(i+1)), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(retiree.Potential, 575, 480+(16*(i+1)), { FONT: "12px Arial", COLOUR: "black" } );
		}
};
GridironTeamView.prototype.DisplayTeamInfo = function() {

		//UNLOGGED

		this.Info = this.Team.Record.W + "-" + this.Team.Record.L + "-" + this.Team.Record.T;
		this.TextWriter.SwitchContext(CANVAS.ZOOM);
		this.TextWriter.Write("Record:", 10, 50);
		this.TextWriter.Write(this.Info, 10, 65);
		this.TextWriter.Write("Schedule:", 160, 50);
		this.TextWriter.RestoreContext();
};
GridironTeamView.prototype.DisplayTrades = function() {
		var i;

		//UNLOGGED

		this.InfoBox.fillStyle = GREY.LIGHT;
		this.InfoBox.fillRect(10, 40, 220, 160);
		this.TextWriter.SwitchContext(CANVAS.ZOOM);
		for (i=0;i<this.Trades.length;++i)
	 this.TextWriter.Write(this.Trades[i], 10, 50+(15*i), { FONT: "12px Arial" } );
		this.TextWriter.RestoreContext();
};
GridironTeamView.prototype.TradePlayerForPick = function() {
		var pick, selection;
		var round;
		var info;
		var gridder;
		var iTeam;

//		this.TextWriter.SwitchContext(CANVAS.ZOOM);

		//Acquire pick
		pick = RosterNestedView.SelectedSlot.Player.GetTradeValue(League.GamesPlayed);
		round = Math.floor(pick/3) + 1;
		pick = 11*(pick % 3) + this.Randomizer.GetNumberWithinRange(1, 10);
		selection = (LEAGUE.TEAMS*(round-1))+(pick-1);
		iTeam = NewDraft.SelectionOrder[selection];
		while (NewDraft.SelectionOrder[selection]==this.Team.Index)  //make sure team doesn't already own the pick
	 ++selection;
		NewDraft.SelectionOrder[selection] = this.Team.Index;

		//Record trade info
		info = Positions[RosterNestedView.SelectedSlot.Player.Position] + " " + RosterNestedView.SelectedSlot.Player.Name.Last;
		info += " for a " + round + "." + pick + " from " + TeamAbbreviations[iTeam];
		this.Trades.push(info);

		//Trade player
		gridder = this.Team.Roster.RemoveGridder(RosterNestedView.SelectedSlot.Player);
		Teams[iTeam].Roster.AddGridder(gridder);

//		this.TextWriter.RestoreContext();
		RosterNestedView.SelectedSlot = null;
		RosterNestedView.DisplayRoster();
};
GridironTeamView.prototype.DisplayInjuredPlayers = function() {
		var i, j;
		var nInjuries;

		TeamTabs.SelectTab(TEAmTABS.SQUAD);
		this.InfoBox.fillStyle = GREY.LIGHT;
		this.InfoBox.fillRect(10, 37, 220, 125);
		this.TextWriter.SwitchContext(CANVAS.ZOOM);
		nInjuries = 0;
		for (i=0;i<POSITION.COUNT;++i)
	 for (j=0;j<this.Team.Roster.Gridders[i].length;++j)
		 if (this.Team.Roster.Gridders[i][j].Injury>0) {
			 this.TextWriter.Write(Positions[this.Team.Roster.Gridders[i][j].Position], 15, 16*(nInjuries+3), { FONT: "12px Arial" } );
			 this.TextWriter.Write(this.Team.Roster.Gridders[i][j].Name.GetFullName(), 40, 16*(nInjuries+3), { FONT: "12px Arial" } );
			 this.TextWriter.Write(this.Team.Roster.Gridders[i][j].Injury, 220, 16*(nInjuries+3), { FONT: "12px Arial" } );
			 ++nInjuries;
		 }
		this.TextWriter.RestoreContext();
};
GridironTeamView.prototype.DisplayRatings = function() {  //REDUNDANT?
		var pos;

		//Headings
		this.TextWriter.Write("Starters", 100, 180, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED, COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write("Roster", 150, 180, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED, COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write("Value", 200, 180, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED, COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write("Rank", 250, 180, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED, COLOUR: "white" }, CANVAS.CONSOLE);  //total, not starters

		//Labels
		this.TextWriter.Write("Offense", 5, 220, null, CANVAS.CONSOLE);
		this.TextWriter.Write("Defense", 5, 240, null, CANVAS.CONSOLE);
		this.TextWriter.Write("Total", 5, 260, null, CANVAS.CONSOLE);

		//Ratings
		this.DisplayStarterRatings();
		this.DisplayRosterRatings();
		this.DisplayValueRatings();
		this.DisplayLeagueRanks();

//		Draft.SetSelectionOrder();
};
GridironTeamView.prototype.DisplayStarterRatings = function() {
		var oRtng, dRtng, tRtng;		//o- offense, d- defense, t- team

		this.Team.SelectStarters();
		oRtng = 0;
		dRtng = 0;
		for (indx=0;indx<11;++indx) {
	 if (this.Team.OffStarters[indx])
		 oRtng += this.Team.OffStarters[indx].Quality;
	 else
		 oRtng += 15;					//assigning an F+ for street free agents
	 if (this.Team.DefStarters[indx])
		 dRtng += this.Team.DefStarters[indx].Quality;
	 else
		 dRtng += 15;
		}
		tRtng = oRtng + dRtng;
		oRtng = Utils.NumberToGrade(Math.round(oRtng/11));
		dRtng = Utils.NumberToGrade(Math.round(dRtng/11));
		this.TextWriter.Write(oRtng, 110, 220, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write(dRtng, 110, 240, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		tRtng = Utils.NumberToGrade(Math.round(tRtng/22));
		this.TextWriter.Write(tRtng, 110, 260, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
};
GridironTeamView.prototype.DisplayRosterRatings = function() {
		var oRtng, dRtng, tRtng;		//o- offense, d- defense, t- team
		var nOffs, nDefs;

		//Total
		oRtng = 0;
		dRtng = 0;
		nOffs = 0;
		nDefs = 0;
		for (indx=0;indx<5;++indx) {
	 for (indx2=0;indx2<this.Team.Roster.Gridders[indx].length;++indx2) {
		 oRtng += this.Team.Roster.Gridders[indx][indx2].Quality;
		 ++nOffs;
	 }
	 for (indx2=0;indx2<this.Team.Roster.Gridders[indx+5].length;++indx2) {
		 dRtng += this.Team.Roster.Gridders[indx+5][indx2].Quality;
		 ++nDefs;
	 }
		}
		tRtng = oRtng + dRtng;
		oRtng = Utilities.NumberToGrade(Math.round(oRtng/nOffs));
		dRtng = Utilities.NumberToGrade(Math.round(dRtng/nDefs));
		this.TextWriter.Write(oRtng, 160, 220, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write(dRtng, 160, 240, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		tRtng = Utilities.NumberToGrade(Math.round(tRtng/51));
		this.TextWriter.Write(tRtng, 160, 260, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
};
GridironTeamView.prototype.DisplayValueRatings = function() {	//NOTE: these are for all players, not just starters
		var oRtng, dRtng, tRtng;		//o- offense, d- defense, t- team
		var nOffs, nDefs;

		oRtng = 0;
		dRtng = 0;
		nOffs = 0;
		nDefs = 0;
		for (indx=0;indx<5;++indx) {
	 for (indx2=0;indx2<this.Team.Roster.Gridders[indx].length;++indx2) {
		 oRtng += this.Team.Roster.Gridders[indx][indx2].Value;
		 ++nOffs;
	 }
	 for (indx2=0;indx2<this.Team.Roster.Gridders[indx+5].length;++indx2) {
		 dRtng += this.Team.Roster.Gridders[indx+5][indx2].Value;
		 ++nDefs;
	 }
		}
		tRtng = oRtng + dRtng;
		oRtng = Utilities.NumberToGrade(Math.round(oRtng/nOffs));
		dRtng = Utilities.NumberToGrade(Math.round(dRtng/nDefs));
		this.TextWriter.Write(oRtng, 210, 220, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write(dRtng, 210, 240, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		tRtng = Utilities.NumberToGrade(Math.round(tRtng/51));
		this.TextWriter.Write(tRtng, 210, 260, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
};
GridironTeamView.prototype.DisplayLeagueRanks = function() {  //NOTE: sorted by all players, not just starters
		var i;
		var aRtngs;

		aRtngs = ArrayUtils.Create(LEAGUE.TEAMS, function() {var Index, Rating;});

		function DisplayRank(aRatings, iTeam, y, tWriter) {
	 var i;

	 aRatings.sort(function(a, b) {return (a.Rating-b.Rating);});
	 for (i=0;i<aRatings.length;++i)
		 if (aRatings[i].Index==iTeam)
			 break;
	 tWriter.Write(i+1, 260, y, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		}

		//Offense
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 aRtngs[i].Index = i;
	 if (i==this.Team.Index)
		 aRtngs[i].Rating = this.Team.Roster.GetOffenseRating();
	 else
		 aRtngs[i].Rating = Teams[i].Roster.GetOffenseRating();
		}
		DisplayRank(aRtngs, this.Team.Index, 220, this.TextWriter);

		//Defense
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 aRtngs[i].Index = i;
	 if (i==this.Team.Index)
		 aRtngs[i].Rating = this.Team.Roster.GetDefenseRating();
	 else
		 aRtngs[i].Rating = Teams[i].Roster.GetDefenseRating();
		}
		DisplayRank(aRtngs, this.Team.Index, 240, this.TextWriter);

		//Team
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 aRtngs[i].Index = i;
	 if (i==this.Team.Index)
		 aRtngs[i].Rating = this.Team.Roster.GetTeamRating();
	 else
		 aRtngs[i].Rating = Teams[i].Roster.GetTeamRating();
		}
		DisplayRank(aRtngs, this.Team.Index, 260, this.TextWriter);
};
GridironTeamView.prototype.GetStartersRank = function() {
		var i;
		var aRtngs;

		//UNLOGGED

		aRtngs = ArrayUtils.Create2D(LEAGUE.TEAMS, function() {var Index; var Rtng;} );
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 aRtngs[i].Index = i;
	 aRtngs[i].Rtng = this.GetStarterRating(i);
		}
};
GridironTeamView.prototype.GetOffenseRating = function(iTeam) {  //NOTE: cumulative, not average
		var i;
		var oRtng;

		//UNLOGGED

		oRtng = 0;
		for (i=0;i<OFFENSE.PLAYERS;++i) {
	 if (Teams[iTeam].OffStarters[i])
		 oRtng += Teams[iTeam].OffStarters[i].Quality;
	 else
		 oRtng += GRADE.Fplus;					//assigning an F+ for street free agents
		}

		return (oRtng);
};
GridironTeamView.prototype.GetDefenseRating = function(iTeam) {  //NOTE: cumulative, not average
		var i;
		var dRtng;

		//UNLOGGED

		dRtng = 0;
		for (i=0;i<DEFENSE.PLAYERS;++i) {
	 if (Teams[iTeam].DefStarters[i])
		 dRtng += Teams[iTeam].DefStarters[i].Quality;
	 else
		 dRtng += GRADE.Fplus;					//assigning an F+ for street free agents
		}

		return (dRtng);
};
GridironTeamView.prototype.GetTeamRating = function(iTeam) {  //NOTE: cumulative, not average

		//UNLOGGED

		return ( this.GetDefenseRating(iTeam) + this.GetOffenseRating(iTeam) );
};
GridironTeamView.prototype.GetStarterRating = function(iTeam) {
		var i;
		var oRtng, dRtng, tRtng;

		//UNLOGGED

		Teams[iTeam].SelectStarters();
		oRtng = 0;
		dRtng = 0;
		for (i=0;i<OFFENSE.PLAYERS;++i) {
	 if (this.Team.OffStarters[i])
		 oRtng += this.Team.OffStarters[i].Quality;
	 else
		 oRtng += GRADE.Fplus;					//assigning an F+ for street free agents
	 if (this.Team.DefStarters[i])
		 dRtng += this.Team.DefStarters[i].Quality;
	 else
		 dRtng += 15;
		}
		tRtng = oRtng + dRtng;
		oRtng = Utils.NumberToGrade(Math.round(oRtng/OFFENSE.PLAYERS));
		dRtng = Utils.NumberToGrade(Math.round(dRtng/DEFENSE.PLAYERS));
		this.TextWriter.Write(oRtng, 110, 220, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		this.TextWriter.Write(dRtng, 110, 240, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
		tRtng = Utils.NumberToGrade(Math.round(tRtng/22));
		this.TextWriter.Write(tRtng, 110, 260, { FONT: "12px Arial", COLOUR: "white" }, CANVAS.CONSOLE);
};
GridironTeamView.prototype.OpenDraftView = function() {

	DraftView.Open();
};
GridironTeamView.prototype.OpenGameView = function() {

	SideViewGame.SetTeams(PlayerTeam, Teams[this.i]);
	SideViewGame.Play();
};
