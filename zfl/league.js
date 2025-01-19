
//-----------------------------------------------
//---------- GRIDIRON LEAGUE --------------------
var GridironLeague = function() {
	var Randomizer;
	var Type;					//index
	var Options;					//TODO: for now, only option is whether or not to play with salary cap, and position distribution
	var Season;
	var GamesPlayed;
	var TeamSelected;				//index
	var Gridder;
	var League;					//array
	var RosterPlayers, PracticeSquadders;	//counters
	var RosterSizes, SquadSizes;			//arrays
	var Rosters, Squads;				//arrays
	var Seed1, Seed2;
};
GridironLeague.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.Type = 0;
		this.Options = 0;
		this.Season = 0;
		this.GamesPlayed = SEASON.STATE.END;	//TODO: could change to -4 if 2 pre-season games are added
	},
	GenerateSchedule() {
		//-each team plays each team in its division home and away, each team from one other division in its conference, 1 team each from 4 non-conf divisions
	},
	CheckInSeason() {

		return (this.GamesPlayed>=0);
	},
	CheckOffSeason() {

		return (this.GamesPlayed<0);
	},
	SimSeason() {
		var i, j;
		var iTeams;

		Teams.forEach(function(team){team.Roster.GenerateInjuries();});
		SideViewGame.QuickSim = true;
		iTeams = new Array(LEAGUE.TEAMS);
		for (i=0;i<SEASON.GAMES;++i) {
			iTeams.fill(-1);
			this.Randomizer.GetUniqueIndices(iTeams, LEAGUE.TEAMS, LEAGUE.TEAMS);
			 for (j=0;j<LEAGUE.TEAMS;j+=2) {
				SideViewGame.SetTeams(Teams[iTeams[j]], Teams[iTeams[j+1]]);
				while (SideViewGame.Plays!=144)
					SideViewGame.Play();
				SideViewGame.Plays = 0;
			/* */
				if (SideViewGame.Score.Home>SideViewGame.Score.Visitors) {	//ISSUE: switching around - an error somewhere (HACK!)
					++Teams[iTeams[j]].Record.W;
					++Teams[iTeams[j+1]].Record.L;
				} else if (SideViewGame.Score.Home==SideViewGame.Score.Visitors) {
					++Teams[iTeams[j]].Record.T;
					++Teams[iTeams[j+1]].Record.T;
				} else {
					++Teams[iTeams[j]].Record.L;
					++Teams[iTeams[j+1]].Record.W;
				}
				Teams[iTeams[j]].Record.Scored += SideViewGame.Score.Home;
				Teams[iTeams[j]].Record.Conceded += SideViewGame.Score.Visitors;
				Teams[iTeams[j+1]].Record.Scored += SideViewGame.Score.Visitors;
				Teams[iTeams[j+1]].Record.Conceded += SideViewGame.Score.Home;
			/* */
				Teams.forEach(function(team){team.UpdatePostMatch();});
				SideViewGame.Reset();
			}
		}

		this.GamesPlayed = SEASON.STATE.END;
	},
	Dump() {

		//TODO: draft picks list not being recorded right now

		this.DumpLeague();
		this.DumpRosters();
		this.DumpSquads();
		this.DumpFAs();
	},
	DumpLeague() {
		var i;
		var aLeague, aTeams, aSeeds;

		//Create league array
		aLeague = ArrayUtils.Create2D(1, 6);
		aLeague[0][0] = this.Type;
		aLeague[0][1] = this.Options;
		aLeague[0][2] = this.Season;
		aLeague[0][3] = this.GamesPlayed;
		if (PlayerTeam)
			aLeague[0][4] = PlayerTeam.Index;
		else
			aLeague[0][4] = -1;
		aLeague[0][5] = FreeAgency.Gridders.length;

		//Create team array
		aTeams = ArrayUtils.Create2D(LEAGUE.TEAMS, 12);
		this.RosterPlayers = 0;
		this.PracticeSquadders = 0;
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 aTeams[i][0]  = Teams[i].OffSystem;
	 aTeams[i][1]  = Teams[i].DefSystem;
	 aTeams[i][2]  = Teams[i].Record.W;
	 aTeams[i][3]  = Teams[i].Record.L;
	 aTeams[i][4]  = Teams[i].Record.T;
	 aTeams[i][5]  = Teams[i].CapSpace;
	 aTeams[i][6]  = Teams[i].Roster.GetSize();
	 aTeams[i][7]  = Teams[i].PracticeSquad.Gridders.length;
	 aTeams[i][8]  = Teams[i].Injuries;
	 aTeams[i][9]  = Teams[i].PreviousRecord.W;
	 aTeams[i][10] = Teams[i].PreviousRecord.L;
	 aTeams[i][11] = Teams[i].PreviousRecord.T;
	 this.RosterPlayers += aTeams[i][6];
	 this.PracticeSquadders += aTeams[i][7];
		}

		aSeeds = [ [ this.Seed1, this.Seed2 ] ];

		//Dump array
		LeagueDataArea.DumpArrays(aLeague, aTeams, aSeeds);
	},
	DumpRosters() {
		var i, j, k;
		var nGridders;

		//NOTE: actually dumping to text area will be in ::DumpSquads (all players dumped together)

		//Create roster array
		this.Rosters = ArrayUtils.Create2D(this.RosterPlayers, 17);
		nGridders = 0;
		for (i=0;i<LEAGUE.TEAMS;++i)
	 for (j=0;j<Teams[i].Roster.Gridders.length;++j)
		 for (k=0;k<Teams[i].Roster.Gridders[j].length;++k) {
			 this.Rosters[nGridders][0]  = Teams[i].Roster.Gridders[j][k].Position;
			 this.Rosters[nGridders][1]  = Teams[i].Roster.Gridders[j][k].SubPosition;
			 this.Rosters[nGridders][2]  = Teams[i].Roster.Gridders[j][k].Type;
			 this.Rosters[nGridders][3]  = Teams[i].Roster.Gridders[j][k].Name.First;
			 this.Rosters[nGridders][4]  = Teams[i].Roster.Gridders[j][k].Name.Last;
			 this.Rosters[nGridders][5]  = Teams[i].Roster.Gridders[j][k].Appearance;
			 this.Rosters[nGridders][6]  = Teams[i].Roster.Gridders[j][k].Experience;
			 this.Rosters[nGridders][7]  = Teams[i].Roster.Gridders[j][k].Quality;
			 this.Rosters[nGridders][8]  = Teams[i].Roster.Gridders[j][k].Potential;
			 this.Rosters[nGridders][9]  = Teams[i].Roster.Gridders[j][k].Target;
			 this.Rosters[nGridders][10] = Teams[i].Roster.Gridders[j][k].Drafted;
			 this.Rosters[nGridders][11] = Teams[i].Roster.Gridders[j][k].History1;
			 this.Rosters[nGridders][12] = Teams[i].Roster.Gridders[j][k].History2;
			 this.Rosters[nGridders][13] = Teams[i].Roster.Gridders[j][k].Injury;
			 this.Rosters[nGridders][14] = Teams[i].Roster.Gridders[j][k].Salary;
			 this.Rosters[nGridders][15] = Teams[i].Roster.Gridders[j][k].Stat1;
			 this.Rosters[nGridders][16] = Teams[i].Roster.Gridders[j][k].Stat2;
			 ++nGridders;
		 }
	},
	DumpSquads() {
		var i, j;
		var nGridders;

		//Create practice squad array
		this.Squads = ArrayUtils.Create2D(this.PracticeSquadders, 17);
		nGridders = 0;
		for (i=0;i<LEAGUE.TEAMS;++i)
	 for (j=0;j<Teams[i].PracticeSquad.Gridders.length;++j) {
		 this.Squads[nGridders][0]  = Teams[i].PracticeSquad.Gridders[j].Position;
		 this.Squads[nGridders][1]  = Teams[i].PracticeSquad.Gridders[j].SubPosition;
		 this.Squads[nGridders][2]  = Teams[i].PracticeSquad.Gridders[j].Type;
		 this.Squads[nGridders][3]  = Teams[i].PracticeSquad.Gridders[j].Name.First;
		 this.Squads[nGridders][4]  = Teams[i].PracticeSquad.Gridders[j].Name.Last;
		 this.Squads[nGridders][5]  = Teams[i].PracticeSquad.Gridders[j].Appearance;
		 this.Squads[nGridders][6]  = Teams[i].PracticeSquad.Gridders[j].Experience;
		 this.Squads[nGridders][7]  = Teams[i].PracticeSquad.Gridders[j].Quality;
		 this.Squads[nGridders][8]  = Teams[i].PracticeSquad.Gridders[j].Potential;
		 this.Squads[nGridders][9]  = Teams[i].PracticeSquad.Gridders[j].Target;
		 this.Squads[nGridders][10] = Teams[i].PracticeSquad.Gridders[j].Drafted;
		 this.Squads[nGridders][11] = Teams[i].PracticeSquad.Gridders[j].History1;
		 this.Squads[nGridders][12] = Teams[i].PracticeSquad.Gridders[j].History2;
		 this.Squads[nGridders][13] = Teams[i].PracticeSquad.Gridders[j].Injury;
		 this.Squads[nGridders][14] = Teams[i].PracticeSquad.Gridders[j].Salary;
		 this.Squads[nGridders][15] = Teams[i].PracticeSquad.Gridders[j].Stat1;
		 this.Squads[nGridders][16] = Teams[i].PracticeSquad.Gridders[j].Stat2;
		 ++nGridders;
	 }

		//Dump to text area . . . NOTE: dumping both rosters and practice squads here
		RosterDataArea.DumpArrays(this.Rosters, this.Squads);
	},
	DumpFAs() {	//NOTE: FAs are dumped only if list isn't empty
		var aFAs;
		var fa;

//		if (this.GamesPlayed>=SEASON.STATE.POStCUTS) {
	 aFAs = new GenieArray();
	 for (i=0;i<FreeAgency.Gridders.length;++i) {
		 fa = new Array(17);
		 fa[0]  = FreeAgency.Gridders[i].Position;
		 fa[1]  = FreeAgency.Gridders[i].SubPosition;
		 fa[2]  = FreeAgency.Gridders[i].Type;
		 fa[3]  = FreeAgency.Gridders[i].Name.First;
		 fa[4]  = FreeAgency.Gridders[i].Name.Last;
		 fa[5]  = FreeAgency.Gridders[i].Appearance;
		 fa[6]  = FreeAgency.Gridders[i].Experience;
		 fa[7]  = FreeAgency.Gridders[i].Quality;
		 fa[8]  = FreeAgency.Gridders[i].Potential;
		 fa[9]  = FreeAgency.Gridders[i].Target;
		 fa[10] = FreeAgency.Gridders[i].Drafted;
		 fa[11] = FreeAgency.Gridders[i].History1;
		 fa[12] = FreeAgency.Gridders[i].History2;
		 fa[13] = FreeAgency.Gridders[i].Injury;
		 fa[14] = FreeAgency.Gridders[i].Salary;
		 fa[15] = FreeAgency.Gridders[i].Stat1;
		 fa[16] = FreeAgency.Gridders[i].Stat2;
		 aFAs.push(fa);
	 }
	 FADataArea.DumpArrays(aFAs);
//		}
	},
	Load() {
		this.LoadLeague();
		this.LoadRosters();
		this.LoadSquads();
		this.LoadFAs();
	},
	LoadLeague() {
		var i;
		var aTeams;
		var aSeeds;

		//Read league data from 1st text area
		this.League = ArrayUtils.Create2D(1, 6);
		aTeams = ArrayUtils.Create2D(LEAGUE.TEAMS, 12);
		aSeeds = ArrayUtils.Create2D(1, 2);
		LeagueDataArea.LoadArrays(this.League, aTeams, aSeeds);

		//Create league data
		this.Type		  = this.League[0][0];
		this.Options	  = this.League[0][1];
		this.Season		= this.League[0][2];
		this.GamesPlayed = this.League[0][3];
		PlayerTeam		 = Teams[this.League[0][4]];

		//Create teams data
		this.RosterPlayers = 0;
		this.PracticeSquadders = 0;
		this.RosterSizes = new Array(LEAGUE.TEAMS);
		this.SquadSizes = new Array(LEAGUE.TEAMS);
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 Teams[i].OffSystem  = aTeams[i][0];
	 Teams[i].DefSystem  = aTeams[i][1];
	 Teams[i].Record.W	= aTeams[i][2];
	 Teams[i].Record.L	= aTeams[i][3];
	 Teams[i].Record.T	= aTeams[i][4];
	 Teams[i].CapSpace	= aTeams[i][5];
	 this.RosterSizes[i] = aTeams[i][6];
	 this.SquadSizes[i]  = aTeams[i][7];
	 Teams[i].Injuries	= aTeams[i][8];
	 Teams[i].PreviousRecord.W = aTeams[i][9];
	 Teams[i].PreviousRecord.L = aTeams[i][10];
	 Teams[i].PreviousRecord.T = aTeams[i][11];
	 this.RosterPlayers += this.RosterSizes[i];
	 this.PracticeSquadders += this.SquadSizes[i];
		}

		//Randomizer seeds
		this.Seed1 = aSeeds[0][0];
		this.Seed2 = aSeeds[0][1];
	},
	LoadRosters() {
		var i, j;
		var nRosterPlayers;
		var gridder;

		//Read roster and practice squad data from 2nd text area
		this.Rosters = ArrayUtils.Create2D(this.RosterPlayers, 17);
		this.Squads = ArrayUtils.Create2D(this.PracticeSquadders, 17);
		RosterDataArea.LoadArrays(this.Rosters, this.Squads);

		//Roster squads
		nRosterPlayers = 0;
		for (i=0;i<LEAGUE.TEAMS;++i) {
	 for (j=0;j<this.RosterSizes[i];++j) {
		 gridder = Teams[i].Roster.CreateGridder(this.Rosters[nRosterPlayers+j][0]);
		 gridder.Set(this.Randomizer, i);
		 gridder.Position	= this.Rosters[nRosterPlayers+j][0];
		 gridder.SubPosition	= this.Rosters[nRosterPlayers+j][1];
		 gridder.Type	= this.Rosters[nRosterPlayers+j][2];
		 gridder.Name.First	= this.Rosters[nRosterPlayers+j][3];
		 gridder.Name.Last	= this.Rosters[nRosterPlayers+j][4];
		 gridder.Appearance	= this.Rosters[nRosterPlayers+j][5];
		 gridder.Experience	= this.Rosters[nRosterPlayers+j][6];
		 gridder.Quality	= this.Rosters[nRosterPlayers+j][7];
		 gridder.Potential	= this.Rosters[nRosterPlayers+j][8];
		 gridder.Target	= this.Rosters[nRosterPlayers+j][9];
		 gridder.Drafted	= this.Rosters[nRosterPlayers+j][10];
		 gridder.History1	= this.Rosters[nRosterPlayers+j][11];
		 gridder.History2	= this.Rosters[nRosterPlayers+j][12];
		 gridder.Injury	= this.Rosters[nRosterPlayers+j][13];
		 gridder.Salary	= this.Rosters[nRosterPlayers+j][14];
		 gridder.Stat1	= this.Rosters[nRosterPlayers+j][15];
		 gridder.Stat2	= this.Rosters[nRosterPlayers+j][16];
		 Teams[i].Roster.AddGridder(gridder);
	 }
	 nRosterPlayers += this.RosterSizes[i];
		}
		Teams.forEach(function(team){team.SetPlayerValues();});
	},
	LoadSquads() {
		var i, j;
		var nPracticeSquadders;
		var gridder;

		//Practice squads
		nPracticeSquadders = 0;
		for (i=0;i<LEAGUE.TEAMS;++i)
	 for (j=0;j<this.SquadSizes[i];++j) {
		 gridder = Teams[i].Roster.CreateGridder(this.Squads[nPracticeSquadders][0]);
		 gridder.Set(this.Randomizer, i);
		 gridder.Position	= this.Squads[nPracticeSquadders][0];
		 gridder.SubPosition	= this.Squads[nPracticeSquadders][1];
		 gridder.Type	= this.Squads[nPracticeSquadders][2];
		 gridder.Name.First	= this.Squads[nPracticeSquadders][3];
		 gridder.Name.Last	= this.Squads[nPracticeSquadders][4];
		 gridder.Appearance	= this.Squads[nPracticeSquadders][5];
		 gridder.Experience	= this.Squads[nPracticeSquadders][6];
		 gridder.Quality	= this.Squads[nPracticeSquadders][7];
		 gridder.Potential	= this.Squads[nPracticeSquadders][8];
		 gridder.Target	= this.Squads[nPracticeSquadders][9];
		 gridder.Drafted	= this.Squads[nPracticeSquadders][10];
		 gridder.History1	= this.Squads[nPracticeSquadders][11];
		 gridder.History2	= this.Squads[nPracticeSquadders][12];
		 gridder.Injury	= this.Squads[nPracticeSquadders][13];
		 gridder.Salary	= this.Squads[nPracticeSquadders][14];
		 gridder.Stat1	= this.Squads[nPracticeSquadders][15];
		 gridder.Stat2	= this.Squads[nPracticeSquadders][16];
		 Teams[i].PracticeSquad.Gridders.push(gridder);
		 ++nPracticeSquadders;
	 }
	},
	LoadFAs() {
		var i;
		var aFAs;
		var gridder;

		//Load and create free agents list
		FreeAgency.Reset();
		aFAs = ArrayUtils.Create2D(this.League[0][5], 17);
		FADataArea.LoadArrays(aFAs);
		for (i=0;i<aFAs.length;++i) {
			gridder = Teams[PlayerTeam.Index].Roster.CreateGridder(aFAs[i][0]);
			gridder.Set(this.Randomizer, -1);
			gridder.Position	= aFAs[i][0];
			gridder.SubPosition	= aFAs[i][1];
			gridder.Type	= aFAs[i][2];
			gridder.Name.First	= aFAs[i][3];
			gridder.Name.Last	= aFAs[i][4];
			gridder.Appearance	= aFAs[i][5];
			gridder.Experience	= aFAs[i][6];
			gridder.Quality	= aFAs[i][7];
			gridder.Potential	= aFAs[i][8];
			gridder.Target	= aFAs[i][9];
			gridder.Drafted	= aFAs[i][10];
			gridder.History1	= aFAs[i][11];
			gridder.History2	= aFAs[i][12];
			gridder.Injury	= aFAs[i][13];
			gridder.Salary	= aFAs[i][14];
			gridder.Stat1	= aFAs[i][15];
			gridder.Stat2	= aFAs[i][16];
			FreeAgency.AddGridder(gridder);
		}
	}
};
