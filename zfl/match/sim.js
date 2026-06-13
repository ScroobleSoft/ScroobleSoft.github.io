
//-------------------------------------------------
//---------- GRIDIRON GAME SIM --------------------
var GridironGameSim = function() {
	var Plays, BigPlay, Wins;
	var LineOfScrimmage;
	var HomeFlag, HomeWins, VisitorWins, OffBigPlay, DefBigPlay;
	var HomeOffBigPlays, HomeDefBigPlays, VisitorOffBigPlays, VisitorDefBigPlays;					//arrays for each player
	var HomeOffBurns, HomeDefBurns, VisitorOffBurns, VisitorDefBurns;									//arrays for each player
	var HomeOffRating, HomeDefRating, VisitorOffRating, VisitorDefRating;
	var HomeFGRange, HomeFieldPosition, VisitorFGRange, VisitorFieldPosition;

	var Rating, FieldGoalRange, FieldPosition;
	var BigPlays, Burns;						//gameplay stats

	var PlayOff, PlayDef;
	var OffRating, DefRating, OffPlayerRating, DefPlayerRating;
	var MatchUps, OffMatchUp, DefMatchUp;

	var i, j, num;
};
GridironGameSim.prototype = new GridironMatch();
GridironGameSim.prototype.Set = function() {
//	GridironMatch.prototype.Set.call(this);		uncommenting this will cause problem w/ .Reset being called in base class

	this.SetData();
	this.SetLists();
	this.Reset();
};
GridironGameSim.prototype.Reset = function() {
	GridironMatch.prototype.Reset.call(this);

	this.Plays = 0;
	this.Wins = 0;
	this.HomeOffBigPlays.fill(0);
	this.HomeDefBigPlays.fill(0);
	this.VisitorOffBigPlays.fill(0);
	this.VisitorDefBigPlays.fill(0);
	this.HomeOffBurns.fill(0);
	this.HomeDefBurns.fill(0);
	this.VisitorOffBurns.fill(0);
	this.VisitorDefBurns.fill(0);
};
GridironGameSim.prototype.SetData = function() {
//	GridironMatch.prototype.SetData.call(this);		no .SetData in base class at the moment

	this.MatchUps = [ 7,4,6,9,10,8,0,3,5,2,1 ];		//QB-S1, HB-LB1, FB-LB3, WR1-CB1, WR2-CB2, TE-S2, OL1-DE1, OL2-DT2, OL3-LB2, OL4-DT1, OL5-DE2
};
GridironGameSim.prototype.SetLists = function() {
//	GridironMatch.prototype.SetLists.call(this);		no .SetLists in base class at the moment

	this.HomeOffBigPlays = new Array(OFFENSE.PLAYERS);
	this.HomeDefBigPlays = new Array(DEFENSE.PLAYERS);
	this.VisitorOffBigPlays = new Array(OFFENSE.PLAYERS);
	this.VisitorDefBigPlays = new Array(DEFENSE.PLAYERS);
	this.HomeOffBurns = new Array(OFFENSE.PLAYERS);
	this.HomeDefBurns = new Array(DEFENSE.PLAYERS);
	this.VisitorOffBurns = new Array(OFFENSE.PLAYERS);
	this.VisitorDefBurns = new Array(DEFENSE.PLAYERS);
};
GridironGameSim.prototype.SetTeams = function(hTeam, vTeam) {
	GridironMatch.prototype.SetTeams.call(this, hTeam, vTeam);

	//Set teams and starters
	this.HomeTeam = hTeam;
	this.VisitorTeam = vTeam;
	this.HomeTeam.SelectStarters();
	this.VisitorTeam.SelectStarters();

	//O-line - TEMP fix to introduce C/G/T distinctions
//	this.OrganizeOLine();		//done for home team
//	this.ShuffleOLine();		//done for visitor team

	//Home team gets first possession
	if (this.Plays==0 && League.GamesPlayed % 2) {
		this.PlayOff = this.VisitorTeam.OffStarters;
		this.PlayDef = this.HomeTeam.DefStarters;
		this.HomeFlag = false;
	} else {
		this.PlayOff = this.HomeTeam.OffStarters;
		this.PlayDef = this.VisitorTeam.DefStarters;
		this.HomeFlag = true;
	}

	this.SetTeamRatings();
	this.EvaluateSpecialTeams();
};
GridironGameSim.prototype.OrganizeOLine = function() {
	var i;
	var order;
	var OLine;

	order = [6,7,8,10,9];		//OL: 1-LT,2-LG,3-C,4-RT,5-RG
	OLine = new Array();

	//Remove O-line starters
	for (i=0;i<order.length;++i)
		OLine.unshift(this.HomeTeam.OffStarters.pop());

	//Put them back in the proper order
	for (i=0;i<order.length;++i)
		this.HomeTeam.OffStarters.push(OLine[order[i]-6]);
};
GridironGameSim.prototype.ShuffleOLine = function() {  //NOTE: this is a TEMP method to simulate C/G/T distinctions
	var oLine;

	oLine = ArrayUtils.Split(this.VisitorTeam.OffStarters, 6);
	Randomizer.Shuffle(oLine);
	ArrayUtils.Combine(oLine, this.VisitorTeam.OffStarters);
};
GridironGameSim.prototype.SetTeamRatings = function() {
	var i;
	var differential;

	//Set ratings
	this.HomeOffRating = 0;
	this.HomeDefRating = 0;
	this.VisitorOffRating = 0;
	this.VisitorDefRating = 0;
	for (i=0;i<OFFENSE.PLAYERS;++i) {
		this.HomeOffRating += this.HomeTeam.OffStarters[i].Quality;
		this.HomeDefRating += this.HomeTeam.DefStarters[i].Quality;
		this.VisitorOffRating += this.VisitorTeam.OffStarters[i].Quality
		this.VisitorDefRating += this.VisitorTeam.DefStarters[i].Quality;
	}

	//Adjust ratings to avoid lopsided scores
	this.RealHomeOffRating = this.HomeOffRating;
	this.RealHomeDefRating = this.HomeDefRating;
	this.RealVisitorOffRating = this.VisitorOffRating;
	this.RealVisitorDefRating = this.VisitorDefRating;
/* TODO: skipping this step because it was taken if rating numbers are too close to 0, but will assume for now that won't happen
	if (this.HomeOffRating>this.VisitorDefRating) {
		differential = this.HomeOffRating - this.VisitorDefRating;
		this.VisitorDefRating += differential;
		this.HomeDefRating += differential;
	}
	if (this.VisitorOffRating>this.HomeDefRating) {
		differential = this.VisitorOffRating - this.HomeDefRating;
		this.HomeDefRating += differential;
		this.VisitorDefRating += differential;
	}
*/
/* TODO: skipping this step because it's causing bunching of scores (possibly)
	if (this.VisitorDefRating-this.HomeOffRating>66)
		this.VisitorDefRating = this.HomeOffRating + 66;
	if (this.HomeDefRating-this.VisitorOffRating>66)
		this.HomeDefRating = this.VisitorOffRating + 66;
*/
	this.OffRating = this.HomeOffRating;
	this.DefRating = this.VisitorDefRating;
};
GridironGameSim.prototype.EvaluateSpecialTeams = function() {
	var i, j;
	var hOffSpecials, hDefSpecials, hFGSpecials; 
	var vOffSpecials, vDefSpecials, vFGSpecials;

	//Calculate uninjured special teams aces on each team
	hOffSpecials = 0;
	hDefSpecials = 0;
	vOffSpecials = 0;
	vDefSpecials = 0;
	hFGSpecials = 0;
	vFGSpecials = 0;
	for (i=0;i<POSITION.COUNT;++i) {
		for (j=0;j<this.HomeTeam.Roster.Gridders[i].length;++j)
			if (this.HomeTeam.Roster.Gridders[i][j].Status==GRIDDER.SPECIAL && !this.HomeTeam.Roster.Gridders[i][j].Injury) {
				if (i==POSITION.RB || i==POSITION.WR || i==POSITION.TE)
					++hOffSpecials;
				else if (i==POSITION.LB || i==POSITION.S || i==POSITION.CB)
					++hDefSpecials;
				else if (i==POSITION.QB || i==POSITION.OL)
					++hFGSpecials;
				else if (i==POSITION.DE || i==POSITION.DT)
					--vFGSpecials;
			}
		for (j=0;j<this.VisitorTeam.Roster.Gridders[i].length;++j)
			if (this.VisitorTeam.Roster.Gridders[i][j].Status==GRIDDER.SPECIAL && !this.VisitorTeam.Roster.Gridders[i][j].Injury) {
				if (i==POSITION.RB || i==POSITION.WR || i==POSITION.TE)
					++vOffSpecials;
				else if (i==POSITION.LB || i==POSITION.S || i==POSITION.CB)
					++vDefSpecials;
				else if (i==POSITION.QB || i==POSITION.OL)
					++vFGSpecials;
				else if (i==POSITION.DE || i==POSITION.DT)
					--hFGSpecials;
			}
	}

	this.HomeFGRange = this.DetermineFGRange(hFGSpecials);
	this.VisitorFGRange = this.DetermineFGRange(vFGSpecials);
	this.HomeFieldPosition = this.DetermineFieldPosition(hOffSpecials, vDefSpecials);
	this.VisitorFieldPosition = this.DetermineFieldPosition(vOffSpecials, hDefSpecials);
};
GridironGameSim.prototype.DetermineFGRange = function(spcls) {
	var fRange;

	fRange = 75 - (5*spcls);
	if (fRange<65)
		fRange = 65;
	if (fRange>85)
		fRange = 85;

	return (fRange);
};
GridironGameSim.prototype.DetermineFieldPosition = function(hSpcls, vSpcls) {
	var fPosition;

	fPosition = 20 + 5*(hSpcls-vSpcls);
	if (fPosition<10)
		fPosition = 10;
	if (fPosition>30)
		fPosition = 30;

	return (fPosition);
};
GridironGameSim.prototype.RunMatch = function() {
	var i;

	this.SetPossession();

	for (i=0;i<144;++i) {
		this.ExecutePlay();
		if (this.Plays==71)
			this.ExecuteLastPlay();
		if (this.Plays==143)
			this.ExecuteFinalPlay();
	}

	this.EndMatch();
};
GridironGameSim.prototype.ExecutePlay = function() {  //TODO: only pass plays right now

	if (this.HomeFlag)
		++this.HomePlays;
	else
		++this.VisitorPlays;

	this.FirstDownYards = 10;
	this.Yards = 0;
	if (Random.GetWinner(this.OffRating, 3*this.DefRating, INVERTED)==0) {
		for (this.i=0;this.i<OFFENSE.PLAYERS;++this.i)
			if (Randomizer.GetWinner(this.PlayOff[this.i].Quality, this.PlayDef[this.MatchUps[this.i]].Quality, INVERTED)==0)
				++this.Yards;
		this.BigPlay = this.CheckBigPlay();
		if (this.BigPlay>0)
			this.Yards += this.BigPlay;
	}

	++this.Plays;
	if (this.Plays==36) {
		++this.Quarter;
		this.Time = 0;
	}

	this.UpdateDrive();
};
GridironGameSim.prototype.CheckBigPlay = function() {

	this.CheckOffBigPlay();
	this.CheckDefBigPlay();				//see if big play on offense is cancelled out by a big play on defense
	return (this.AugmentYardage());
};
GridironGameSim.prototype.CheckOffBigPlay = function() {

	this.OffBigPlay = 0;
	this.OffMatchUp = 0;
	for (this.j=0;this.j<OFFENSE.PLAYERS;++this.j) {
		this.Wins = 0;
		this.OffPlayerRating = this.PlayOff[this.j].Quality;
		this.DefPlayerRating = this.PlayDef[this.MatchUps[this.j]].Quality;
		this.num = Math.min(this.OffPlayerRating, this.DefPlayerRating);
		this.OffPlayerRating -= this.num;
		this.DefPlayerRating -= this.num;
		while (Random.GetWinner(this.OffPlayerRating+3, this.DefPlayerRating+3, INVERTED)==0) {
			++this.Wins;
			if (100-this.LineOfScrimmage==this.Wins)
				break;
		}
		if (this.Wins>this.OffBigPlay) {
			this.OffMatchUp = this.j;
			this.OffBigPlay = this.Wins;
		}
	}
};
GridironGameSim.prototype.CheckDefBigPlay = function() {		//see if big play on offense is cancelled out by a big play on defense

	this.DefBigPlay = 0;
	this.DefMatchUp = 0;
	for (this.j=0;this.j<OFFENSE.PLAYERS;++this.j) {
		this.Wins = 0;
		this.OffPlayerRating = this.PlayOff[this.j].Quality;
		this.DefPlayerRating = this.PlayDef[this.MatchUps[this.j]].Quality;
		this.num = Math.min(this.OffPlayerRating, this.DefPlayerRating);
		this.OffPlayerRating -= this.num;
		this.DefPlayerRating -= this.num;
		while (Random.GetWinner(this.OffPlayerRating+3, this.DefPlayerRating+3, INVERTED)==1) {
			++this.Wins;
			if (100-this.LineOfScrimmage==this.Wins)
				break;
		}
		if (this.Wins>this.DefBigPlay) {
			this.DefMatchUp = this.MatchUps[this.j];
			this.DefBigPlay = this.Wins;
		}
	}
};
GridironGameSim.prototype.AugmentYardage = function() {

	if (this.OffBigPlay==this.DefBigPlay)
		return (0);

	if (this.OffBigPlay>this.DefBigPlay) {
		if (this.HomeFlag) {
			++this.HomeOffBigPlays[this.OffMatchUp];
			++this.VisitorDefBurns[this.OffMatchUp];
		} else {
			++this.VisitorOffBigPlays[this.OffMatchUp];
			++this.HomeDefBurns[this.OffMatchUp];
		}

		return (this.OffBigPlay-this.DefBigPlay);
	} else {
		if (this.HomeFlag) {
			++this.VisitorDefBigPlays[this.DefMatchUp];
			++this.HomeOffBurns[this.DefMatchUp];
		} else {
			++this.HomeDefBigPlays[this.DefMatchUp];
			++this.VisitorOffBurns[this.DefMatchUp];
		}

		return (0);
	}
};
GridironGameSim.prototype.UpdateDrive = function() {

	//Update if a TD, FG, or first down
	this.LineOfScrimmage += this.Yards;
	if (this.LineOfScrimmage>=100) {	  					//check if a TD
		this.Yards -= this.LineOfScrimmage - 100;
		Scorecard.UpdateScore(this.HomeFlag, 7);
		this.ChangePossession();
	} else {
		if (this.Yards>=this.FirstDownYards) {			//check if a first down
			this.Down = 1;
			this.Yards = 10;
		} else if (this.Down==4) {							//check if in FG range
			if (this.HomeFlag) {
				if (this.LineOfScrimmage>=this.HomeFGRange) 
					Scorecard.UpdateScore(this.HomeFlag, 3);
			} else
				if (this.LineOfScrimmage>=this.VisitorFGRange) 
					Scorecard.UpdateScore(this.HomeFlag, 3);
			this.ChangePossession();
		}
	}

	//Update yardage
	if (this.HomeFlag)
		this.HomeYards += this.Yards;
	else
		this.VisitorYards += this.Yards;
};
GridironGameSim.prototype.SetPossession = function() {

	this.HomeFlag = true;
	this.SetDrive();
};
GridironGameSim.prototype.ChangePossession = function() {

	this.HomeFlag = !this.HomeFlag;
	this.SetDrive();
};
GridironGameSim.prototype.SetDrive = function() {

	//Set offense, defense, field position
	if (this.HomeFlag) {
		 this.PlayOff = this.HomeTeam.OffStarters;
		 this.PlayDef = this.VisitorTeam.DefStarters;
		 this.OffRating = this.HomeOffRating;
		 this.DefRating = this.VisitorDefRating;
		 this.LineOfScrimmage = this.HomeFieldPosition;
	} else {
		 this.PlayOff = this.VisitorTeam.OffStarters;
		 this.PlayDef = this.HomeTeam.DefStarters;
		 this.OffRating = this.VisitorOffRating;
		 this.DefRating = this.HomeDefRating;
		 this.LineOfScrimmage = this.VisitorFieldPosition;
	}

	this.Down = 1;
	this.Yards = 0;
	this.FirstDownYards = 10;
};
GridironGameSim.prototype.ExecuteLastPlay = function() {  //of Half

	if (this.HomeFlag) {
		if (this.HomeFGRange>=this.LineOfScrimmage) {
			Scorecard.UpdateScore(this.HomeFlag, 3);
			++this.Plays;
		} else
			this.ExecutePlay();
	} else {
		if (this.VisitorFGRange>=this.LineOfScrimmage) {
			Scorecard.UpdateScore(this.HomeFlag, 3);
			++this.Plays;
		} else
			this.ExecutePlay();
	}
};
GridironGameSim.prototype.ExecuteFinalPlay = function() {

	if (this.HomeFlag) {
		if ( Scorecard.Score.Visitor-Scorecard.Score.Home<=3 && Scorecard.Score.Visitor-Scorecard.Score.Home>=0 )
			this.ExecuteLastPlay();
	} else {
		if ( Scorecard.Score.Home-Scorecard.Score.Visitor<=3 && Scorecard.Score.Home-Scorecard.Score.Visitor>=0 )
			this.ExecuteLastPlay();
	}

	if (Scorecard.Score.Home==Scorecard.Score.Visitor)
		this.PlayOverTime();
};
GridironGameSim.prototype.PlayOverTime = function() {

	if (Random.GetWinner(this.HomeYards, this.VisitorYards))
		Scorecard.Score.Home += 3;
	else
		Scorecard.Score.Visitor += 3;
};
GridironGameSim.prototype.EndMatch = function() {

	this.HomeOffRating = this.RealHomeOffRating;
	this.HomeDefRating = this.RealHomeDefRating;
	this.VisitorOffRating = this.RealVisitorOffRating;
	this.VisitorDefRating = this.RealVisitorDefRating;

	this.PostMatchUpdate();
};
GridironGameSim.prototype.PostMatchUpdate = function() {

	//Update record of teams in match
	if (Scorecard.Score.Home>Scorecard.Score.Visitor) {
		++this.HomeTeam.Record.W;
		++this.VisitorTeam.Record.L;
	} else if (Scorecard.Score.Home<Scorecard.Score.Visitor) {
		++this.HomeTeam.Record.L;
		++this.VisitorTeam.Record.W;
	} else {
		++this.HomeTeam.Record.T;
		++this.VisitorTeam.Record.T;
	}

	//Save match score
	this.HomeTeam.Scores[League.GamesPlayed].Scored = Scorecard.Score.Home;
	this.HomeTeam.Scores[League.GamesPlayed].Conceded = Scorecard.Score.Visitor;
	this.VisitorTeam.Scores[League.GamesPlayed].Scored = Scorecard.Score.Visitor;
	this.VisitorTeam.Scores[League.GamesPlayed].Conceded = Scorecard.Score.Home;

	//Points scored
	this.HomeTeam.Record.Scored += Scorecard.Score.Home;
	this.HomeTeam.Record.Conceded += Scorecard.Score.Visitors;
	this.VisitorTeam.Record.Scored += Scorecard.Score.Visitors;
	this.VisitorTeam.Record.Conceded += Scorecard.Score.Home;

	//TODO; update team stats - this could be done in Scorecard
};
GridironGameSim.prototype.SimWeek = function() {
	var i;
	var aTeams;			//indices
	var nHomeQuality, nVisitorsQuality;

	//Generate league match-ups
	aTeams = new Array();
	for (i=0;i<LEAGUE.TEAMS;++i)
		if (i!=this.HomeTeam.Index && i!=this.VisitorTeam.Index)
			aTeams.push(indx);
	Random.Shuffle(aTeams);

	//Simulate games
	for (i=0;i<aTeams.length;i+=2) {
		this.SetTeams(Teams[aTeams[i]], Teams[aTeams[i+1]]);
		this.RunMatch();
	}
/*
	Teams.forEach(function(team){team.UpdatePostMatch();});
	++League.GamesPlayed;
		if (League.GamesPlayed==SEASON.GAMES) {
	 ++League.Season;
	 League.GamesPlayed = GAMeSTATE.ENdSEASON;
	 Teams.forEach(function(team){team.Roster.EraseInjuries();});
		}
*/
};
