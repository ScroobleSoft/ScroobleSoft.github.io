
GridironTeamView.prototype.UpdateInfo = function() {
	//UNLOGGED
};
GridironTeamView.prototype.UpdateRoster = function() {
	//UNLOGGED

	//NOTE: putting this here, but everything should be re-written to use GenieView::Update
	if (this.InfoView)
		this.InfoView.Update();

	if (this.ConsoleView.PendingFAsButton.CheckClicked()) {
	}

	if (this.ConsoleView.StartSeasonButton.CheckClicked()) {
//			cancelAnimationFrame(this.AnimationFrameHandle);
		Teams.forEach(function(team) {team.StartNewSeason();});
		League.GamesPlayed = SEASON.STATE.START;
		this.InfoView.Disable();
		this.ConsoleView.Disable();
		RetirementDialogView.Open();
	}

	if (this.ConsoleView.SignFAButton.CheckClicked()) {
	}

	if (this.ConsoleView.DraftButton.CheckClicked()) {
		this.Randomizer.SaveSeeds();
		this.Randomizer.SetSeeds(Daily[0][0], Daily[0][0]+1);
		Draft.Generate();
		DraftConsoleView.ProspectPagination.SetItems(Draft.ValueList);
		this.Randomizer.RestoreSeeds();
		Teams.forEach(function(team) {team.EvaluateNeeds();});

		this.Close(this.OpenDraftView.bind(this), 100);
	}

	if (this.ConsoleView.MatchButton.CheckClicked()) {
		do {
			this.i = this.Randomizer.GetIndex(LEAGUE.TEAMS);
		} while (this.i==PlayerTeam.Index);
		this.Close(this.OpenGameView.bind(this), 100);
//	 PlayerTeam.SelectStarters();
//	 Teams[iTeam].SelectStarters();
//	 GameSim.SetTeams(this.Team, Teams[iTeam]);
//	 GameSideView.PlayGame();
//	 GameSideView.RunPassPlaySequence();
//	 GameSideView.RunningAnimation();
	}

	if (this.ConsoleView.WireButton.CheckClicked()) {
	}
};
GridironTeamView.prototype.UpdateTransactions = function() {
	//UNLOGGED
};
GridironTeamView.prototype.UpdatePlaybook = function() {
	//UNLOGGED
};
GridironTeamView.prototype.UpdateOpponent = function() {
	//UNLOGGED
};
GridironTeamView.prototype.UpdateLeague = function() {
	//UNLOGGED
};
