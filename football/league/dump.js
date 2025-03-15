
FootballLeague.prototype.DumpLeague = function() {
   var i;
   var aLeague, aTeams, aClubs, aFixtures;

	//Create league array
	aLeague = ArrayUtils.Create2D(1, 4);
	aLeague[0][0] = this.Season;
	aLeague[0][1] = this.Week;
	aLeague[0][2] = TeamSelected.Index;
	aLeague[0][3] = TransferPool.Players.length || 0;

	//Create team array
	aTeams = ArrayUtils.Create2D(LEAGUE.TEAMS, 8);
	this.SquadPlayers = 0;
	this.YouthPlayers = 0;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		aTeams[i][0] = Teams[i].Record.W;
		aTeams[i][1] = Teams[i].Record.L;
		aTeams[i][2] = Teams[i].Record.T;
		aTeams[i][3] = Teams[i].Budget;
		aTeams[i][4] = Teams[i].Formation;
		aTeams[i][5] = Teams[i].Squad.Players.length;
		aTeams[i][6] = Teams[i].YouthTeam.Players.length;
		aTeams[i][7] = Teams[i].Injuries;
		this.SquadPlayers += aTeams[i][5];
		this.YouthPlayers += aTeams[i][6];
	}

   //Fixtures
   aClubs = ArrayUtils.Create2D(1, League.FixtureList.length);
   for (i=0;i<aClubs[0].length;++i)
      aClubs[0][i] = League.FixtureList[i];
   aFixtures = ArrayUtils.Create2D(1, League.HomeAwayArray.length);
   for (i=0;i<aFixtures[0].length;++i)
      aFixtures[0][i] = League.HomeAwayArray[i] ? 1 : 0;

   //Dump arrays
   LeagueDataArea.DumpArrays(aLeague, aTeams, aClubs, aFixtures);
};
FootballLeague.prototype.DumpSquads = function() {
	var i;
	var nPlyrs;
	var aSquads;

	//Create squad array
	aSquads = ArrayUtils.Create2D(this.SquadPlayers, 17);
	nPlyrs = 0;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		this.FillArray(aSquads, Teams[i].Squad.Players, Teams[i].Squad.Players.length, nPlyrs);
		nPlyrs += Teams[i].Squad.Players.length;
	}

   //Dump to text area
   SquadDataArea.DumpArrays(aSquads);
};
FootballLeague.prototype.DumpYouth = function() {
	var i;
	var nPlyrs;
	var aYouths;

	//Create academy array
	aYouths = ArrayUtils.Create2D(this.YouthPlayers, 17);
	nPlyrs = 0;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		this.FillArray(aYouths, Teams[i].YouthTeam.Players, Teams[i].YouthTeam.Players.length, nPlyrs);
		nPlyrs += Teams[i].YouthTeam.Players.length;
	 }

	//Dump to text area
	YouthDataArea.DumpArrays(aYouths);
};
FootballLeague.prototype.DumpTargets = function() {	//NOTE: Extras are dumped only if list isn't empty
   var aTargets;

   aTargets = ArrayUtils.Create2D(TRANSFERS.POOL.FRINGE, 17);

   TransferPool.SortByDesignation();  //TODO: sort by position?
   this.FillArray(aTargets, TransferPool.OverseasPlayers, TRANSFERS.POOL.OVERSEAS, 0);
   this.FillArray(aTargets, TransferPool.DomesticPlayers, TRANSFERS.POOL.DOMESTIC, 100);
   this.FillArray(aTargets, TransferPool.PeripheralPlayers, TRANSFERS.POOL.PERIPHERAL, 200);
   this.FillArray(aTargets, TransferPool.YouthPlayers, TRANSFERS.POOL.YOUTH, 300);
   this.FillArray(aTargets, TransferPool.SemiProPlayers, TRANSFERS.POOL.SEMiPRO, 400);
   this.FillArray(aTargets, TransferPool.ProdigyPlayers, TRANSFERS.POOL.PRODIGY, 500);

   ExtraDataArea.DumpArrays(aTargets);
};
FootballLeague.prototype.FillArray = function(aTrgts, aPlyrs, nPlyrs, iPlyrs) {
   var i;

   for (i=0;i<nPlyrs;++i) {
      aTrgts[i+iPlyrs][0]  = aPlyrs[i].Position;
      aTrgts[i+iPlyrs][1]  = aPlyrs[i].Designation;
      aTrgts[i+iPlyrs][2]  = aPlyrs[i].Type;
      aTrgts[i+iPlyrs][3]  = aPlyrs[i].Name.First;
      aTrgts[i+iPlyrs][4]  = aPlyrs[i].Name.Last;
      aTrgts[i+iPlyrs][5]  = aPlyrs[i].Age;
      aTrgts[i+iPlyrs][6]  = aPlyrs[i].BirthWeek;
      aTrgts[i+iPlyrs][7]  = aPlyrs[i].Quality;
      aTrgts[i+iPlyrs][8]  = aPlyrs[i].Potential;
      aTrgts[i+iPlyrs][9]  = aPlyrs[i].Variation;
      aTrgts[i+iPlyrs][10] = aPlyrs[i].Appearance;
      aTrgts[i+iPlyrs][11] = aPlyrs[i].Attributes;
      aTrgts[i+iPlyrs][12] = aPlyrs[i].Status;
      aTrgts[i+iPlyrs][13] = aPlyrs[i].Wage;
      aTrgts[i+iPlyrs][14] = aPlyrs[i].Stats;
      aTrgts[i+iPlyrs][15] = aPlyrs[i].History;
      aTrgts[i+iPlyrs][16] = aPlyrs[i].Team;
   }
};
