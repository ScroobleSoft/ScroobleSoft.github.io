/*
FootballLeague.prototype.Generate = function(gType, bdgt) {  //g- game
		var i;

		//Determine team players, budgets
		for (i=0;i<LEAGUE.TEAMS;++i) {

	 //Squad
	 Teams[i].Squad.Generate();
	 Teams[i].Squad.SetIdentities();
	 switch (gType) {
		 case GAMeTYPE.PReSET: 
			 Teams[i].Squad.AssignBalancedPositions();
			 Teams[i].Squad.GenerateWeightedRatings();
			 break;
		 case GAMeTYPE.RANDOM:
			 Teams[i].Squad.AssignRandomPositions();
			 Teams[i].Squad.GenerateRandomRatings();
			 break;
		 case GAMeTYPE.PRECISE:
			 Teams[i].Squad.AssignPrecisePositions();
			 Teams[i].Squad.GenerateRandomRatings();
			 break;
	 }

	 Teams[i].YouthTeam.Generate();
	 Teams[i].GenerateFormations();
	 Teams[i].SelectBestFormation();

	 //Budget
	 if (i==TeamSelected.Index)
		 continue;
	 switch (bdgt) {
		 case BUDGET.ZERO: 
			 Teams[i].Budget = 0;
			 break;
		 case BUDGET.RANDOM:
			 Teams[i].Budget = this.Randomizer.GetInRange(1, 20);	//HARD-CODED
			 break;
		 case BUDGET.ATTENDANCE:
			 Teams[i].Budget = 5 + Math.round(TeamData[i][1]*0.2);		//NOTE: range is 5 to 20
			 break;
	 }
		}

		//Fixtures
		this.GenerateFixtureLists();

		League.Dump();
};
*/
FootballLeague.prototype.GeneratePlayers = function(gType) {
	var i;

	for (i=0;i<LEAGUE.TEAMS;++i) {
		Teams[i].Squad.Generate();
		Teams[i].Squad.SetIdentities();
		switch (gType) {
	 case GAMeTYPE.PReSET: 
		 Teams[i].Squad.AssignBalancedPositions();
		 Teams[i].Squad.GenerateWeightedRatings();
		 break;
	 case GAMeTYPE.RANDOM:
		 Teams[i].Squad.AssignRandomPositions();
		 Teams[i].Squad.GenerateRandomRatings();
		 break;
	 case GAMeTYPE.PRECISE:
		 Teams[i].Squad.AssignPrecisePositions();
		 Teams[i].Squad.GenerateRandomRatings();
		 break;
		}
	}
};
FootballLeague.prototype.GenerateBudgets = function(bdgt) {
	var i;

	for (i=0;i<LEAGUE.TEAMS;++i) {
//		if (i==TeamSelected.Index)
//	 continue;
		switch (bdgt) {
	 case BUDGET.ZERO: 
		 Teams[i].Budget = 0;
		 break;
	 case BUDGET.RANDOM:
		 Teams[i].Budget = this.Randomizer.GetInRange(1, 20);		//HARD-CODED
		 break;
	 case BUDGET.ATTENDANCE:
		 Teams[i].Budget = 5 + Math.round(TeamData[i][1]*0.2);		//NOTE: range is 5 to 20
		 break;
		}
	}
};
FootballLeague.prototype.GenerateFixtureLists = function() {
	var i;
	var nHome, nAway;
	var iMatch;

	//Generate team indices
	this.FixtureList.fill(-1);
	this.Randomizer.GetUniqueIndices(this.FixtureList, LEAGUE.TEAMS, LEAGUE.TEAMS);

	//Generate home and away sequence . . . TODO: home/away matches will be interleaved unlike EPL
	this.HomeAwayArray.fill(false);
	for (i=0;i<this.HomeAwayArray.length/2;++i)	//fill half the array with 'true'
		this.HomeAwayArray[i] = true;
	this.Randomizer.Shuffle(this.HomeAwayArray);
};
FootballLeague.prototype.GenerateSeasonFixtures = function() {
	var i;

	this.GenerateFixtureLists();
	for (i=0;i<LEAGUE.WEEKS;++i)
		this.GenerateFixtures(i);
};
FootballLeague.prototype.GenerateFixtures = function(iWeek) {  //NOTE: only generates fixtures for one week
	var i;
	var aTeams;
	var hTeam, aTeam;		//h- home, a- away
//		var iSwap;

	//Create array to rotate for match-ups
	aTeams = new GenieArray();
	aTeams.Set(LEAGUE.TEAMS);
	for (i=0;i<aTeams.length;++i)
		aTeams[i] = i;

	iWeek = iWeek || this.Week;
	for (i=0;i<iWeek;++i) {
		aTeams.RotateRight(1);
		aTeams.Swap(0, 1);
	}

	//Generate match-ups
	for (i=0;i<LEAGUE.FIXTURES;++i) {

		if (i % 2) {
			hTeam = aTeams[(aTeams.length-1)-i];
			aTeam = aTeams[i];
		} else {
			hTeam = aTeams[i];
			aTeam = aTeams[(aTeams.length-1)-i];
		}
	/* TODO: undecided if Home/Away will alternate, or be occasionally clumped like in EPL
		 //Swap teams if an away game
		 if (!this.HomeAwayArray[this.Week % (LEAGUE.WEEKS/2)]) {
			 iSwap = hTeam;
			 hTeam = aTeam;
			 aTeam = iSwap;
		 }

		 //Swap teams if second half of season
		 if (this.Week>=(LEAGUE.WEEKS/2)) {
			 iSwap = hTeam;
			 hTeam = aTeam;
			 aTeam = iSwap;
		 }
	*/
		//Set teams
		if (iWeek<LEAGUE.WEEKS/2) {
			this.Fixtures[iWeek][i].Home = this.FixtureList[hTeam];
			this.Fixtures[iWeek][i].Away = this.FixtureList[aTeam];
		} else {
			this.Fixtures[iWeek][i].Home = this.FixtureList[aTeam];
			this.Fixtures[iWeek][i].Away = this.FixtureList[hTeam];
		}
	}

	this.Randomizer.Shuffle(this.Fixtures[iWeek]);
};
