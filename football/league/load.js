
FootballLeague.prototype.LoadLeague = function() {
   var i;
   var aTeams, aClubs, aFixtures;

   //Read league data from 1st text area
   this.League = ArrayUtils.Create2D(1, 4);
   aTeams = ArrayUtils.Create2D(LEAGUE.TEAMS, 8);
   aClubs = ArrayUtils.Create2D(1, LEAGUE.TEAMS);
   aFixtures = ArrayUtils.Create2D(1, LEAGUE.WEEKS/2);
   LeagueDataArea.LoadArrays(this.League, aTeams, aClubs, aFixtures);
   League.Season = this.League[0][0];
   League.Week = this.League[0][1];
   TeamSelected = Teams[this.League[0][2]];

   //Create teams data
   this.SquadPlayers = 0;
   this.YouthPlayers = 0;
   this.SquadSizes = new Array(LEAGUE.TEAMS);
   this.YouthTeamSizes = new Array(LEAGUE.TEAMS);
   for (i=0;i<LEAGUE.TEAMS;++i) {
      Teams[i].Record.W  = aTeams[i][0];
      Teams[i].Record.L  = aTeams[i][1];
      Teams[i].Record.T  = aTeams[i][2];
      Teams[i].Budget    = aTeams[i][3];
      Teams[i].SetFormation(aTeams[i][4]);
      this.SquadSizes[i] = aTeams[i][5];
      this.YouthTeamSizes[i]  = aTeams[i][6];
      Teams[i].Injuries  = aTeams[i][7];
      this.SquadPlayers += this.SquadSizes[i];
      this.YouthPlayers += this.YouthTeamSizes[i];
   }

   //Fixtures
   for (i=0;i<aClubs.length;++i)
      League.FixtureList[i] = aClubs[0][i];
   for (i=0;i<aFixtures.length;++i)
      League.HomeAwayArray[i] = aFixtures[0][i] ? true : false;
};
FootballLeague.prototype.LoadSquads = function() {
   var i, j;
   var nSquadPlayers;
   var plyr;
   var aSquads;

   //Read squad data from 2nd text area
   aSquads = ArrayUtils.Create2D(this.SquadPlayers, 17);
   SquadDataArea.LoadArrays(aSquads);

	//Roster squads
	nSquadPlayers = 0;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		for (j=0;j<this.SquadSizes[i];++j) {
			plyr = this.LoadPlayer(i, nSquadPlayers, j);
		 /*
	    player = new FootballPlayer();
	    player.Set(this.Randomizer, Teams[i]);
	    player.Position    = aSquads[nSquadPlayers+j][0];
	    player.Designation = aSquads[nSquadPlayers+j][1];
	    player.Type	       = aSquads[nSquadPlayers+j][2];
	    player.Name.First  = aSquads[nSquadPlayers+j][3];
	    player.Name.Last   = aSquads[nSquadPlayers+j][4];
	    player.Age	       = aSquads[nSquadPlayers+j][5];
	    player.BirthWeek	       = aSquads[nSquadPlayers+j][6];
	    player.Quality     = aSquads[nSquadPlayers+j][7];
	    player.Potential   = aSquads[nSquadPlayers+j][8];
	    player.Appearance  = aSquads[nSquadPlayers+j][9];
	    player.Attributes  = aSquads[nSquadPlayers+j][10];
	    player.Status      = aSquads[nSquadPlayers+j][11];
	    player.Wage	       = aSquads[nSquadPlayers+j][12];
	    player.Stats       = aSquads[nSquadPlayers+j][13];
	    player.History     = aSquads[nSquadPlayers+j][14];
	    player.Team        = i;
		 */
			Teams[i].Squad.AddPlayer(plyr);
		}
		nSquadPlayers += this.SquadSizes[i];
	}

	Teams.forEach(function(team){team.Squad.Sort();});
};
FootballLeague.prototype.LoadYouth = function() {
	var i, j;
	var nYouthPlayers;
	var plyr;
	var aYouths;

	aYouths = ArrayUtils.Create2D(this.YouthPlayers, 17);
	YouthDataArea.LoadArrays(aYouths);

	//Practice squads
	nYouthPlayers = 0;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		for (j=0;j<this.YouthTeamSizes[i];++j) {
			plyr = this.LoadPlayer(i, nYouthPlayers, j);
			/*
	    player = new FootballPlayer();
	    player.Set(this.Randomizer, Teams[i]);
	    player.Position    = aYouths[nYouthPlayers+j][0];
	    player.Designation = aYouths[nYouthPlayers+j][1];
	    player.Type	       = aYouths[nYouthPlayers+j][2];
	    player.Name.First  = aYouths[nYouthPlayers+j][3];
	    player.Name.Last   = aYouths[nYouthPlayers+j][4];
	    player.Age	       = aYouths[nYouthPlayers+j][5];
	    player.BirthWeek	       = aYouths[nYouthPlayers+j][6];
	    player.Quality     = aYouths[nYouthPlayers+j][7];
	    player.Potential   = aYouths[nYouthPlayers+j][8];
	    player.Appearance  = aYouths[nYouthPlayers+j][9];
	    player.Attributes  = aYouths[nYouthPlayers+j][10];
	    player.Status      = aYouths[nYouthPlayers+j][11];
	    player.Wage	       = aYouths[nYouthPlayers+j][12];
	    player.Stats       = aYouths[nYouthPlayers+j][13];
	    player.History     = aYouths[nYouthPlayers+j][14];
	    player.Team        = i;
		 */
			Teams[i].YouthTeam.AddPlayer(plyr);
		}
		nYouthPlayers += this.YouthTeamSizes[i];
	}
};
FootballLeague.prototype.LoadTargets = function() {
   var i;
   var aTrgts;
   var player;

   //Load pool of players available for transfer
   aTrgts = ArrayUtils.Create2D(TRANSFERS.POOL.FRINGE, 178);
   ExtraDataArea.LoadArrays(aTrgts);
   if (!TransferPool.Players[0])
      TransferPool.FillLists();

   //Fill out main list
   for (i=0;i<TRANSFERS.POOL.FRINGE;++i) {
		TransferPool.Players[i].Position		= aTrgts[i][0];
		TransferPool.Players[i].Designation = aTrgts[i][1];
		TransferPool.Players[i].Type			= aTrgts[i][2];
		TransferPool.Players[i].Name.First	= aTrgts[i][3];
		TransferPool.Players[i].Name.Last	= aTrgts[i][4];
		TransferPool.Players[i].Age			= aTrgts[i][5];
		TransferPool.Players[i].BirthWeek	= aTrgts[i][6];
		TransferPool.Players[i].Quality		= aTrgts[i][7];
		TransferPool.Players[i].Potential	= aTrgts[i][8];
		TransferPool.Players[i].Variation	= aTrgts[i][9];
		TransferPool.Players[i].Appearance	= aTrgts[i][10];
		TransferPool.Players[i].Attributes	= aTrgts[i][11];
		TransferPool.Players[i].Status		= aTrgts[i][12];
		TransferPool.Players[i].Wage			= aTrgts[i][13];
		TransferPool.Players[i].Stats			= aTrgts[i][14];
		TransferPool.Players[i].History		= aTrgts[i][15];
		TransferPool.Players[i].Team			= aTrgts[i][16];
   }

	TransferPool.PlayerIndex = i;
	TransferPool.AddLeaguePlayers();
   TransferPool.Sort();
};
FootballLeague.prototype.LoadPlayer = function(iTeam, nPlayers, iPlayer) {
	var plyr;

	plyr = new FootballPlayer();
	plyr.Set(this.Randomizer, Teams[iTeam]);
	plyr.Position	  = aSquads[nPlayers+iPlayer][0];
	plyr.Designation = aSquads[nPlayers+iPlayer][1];
	plyr.Type		  = aSquads[nPlayers+iPlayer][2];
	plyr.Name.First  = aSquads[nPlayers+iPlayer][3];
	plyr.Name.Last	  = aSquads[nPlayers+iPlayer][4];
	plyr.Age			  = aSquads[nPlayers+iPlayer][5];
	plyr.BirthWeek	  = aSquads[nPlayers+iPlayer][6];
	plyr.Quality	  = aSquads[nPlayers+iPlayer][7];
	plyr.Potential	  = aSquads[nPlayers+iPlayer][8];
	plyr.Variation	  = aSquads[nPlayers+iPlayer][9];
	plyr.Appearance  = aSquads[nPlayers+iPlayer][10];
	plyr.Attributes  = aSquads[nPlayers+iPlayer][11];
	plyr.Status		  = aSquads[nPlayers+iPlayer][12];
	plyr.Wage		  = aSquads[nPlayers+iPlayer][13];
	plyr.Stats		  = aSquads[nPlayers+iPlayer][14];
	plyr.History	  = aSquads[nPlayers+iPlayer][15];
	plyr.Team		  = iTeam;

	return (plyr);
};
