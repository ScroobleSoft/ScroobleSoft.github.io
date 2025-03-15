
//------------------------------------------------------------
//----------- FOOTBALL MATCH SIMULATION ----------------------
var FootballMatchSimulation = function() {
	var HomeMatchUps, AwayMatchUps;
	var HomeG, HomeD, HomeM, HomeA, HomeR, HomeC, HomeL;
	var AwayG, AwayD, AwayM, AwayA, AwayR, AwayC, AwayL;
	var CycleState, MinuteResult;
	var HomeFlag, QuickFlag;
};
FootballMatchSimulation.prototype = new FootballMatch();
FootballMatchSimulation.prototype.Set = function(rGenerator) {
   FootballMatch.prototype.Set.call(this, rGenerator);

	this.CycleState = MATCH.SIM.CYCLE.UNIT;
};
FootballMatchSimulation.prototype.SetTeams = function(hTeam, aTeam) {
	FootballMatch.prototype.SetTeams.call(this, hTeam, aTeam);

	this.GenerateMatchUps(true);
	this.GenerateMatchUps();
};
FootballMatchSimulation.prototype.SetLists = function() {
	FootballMatch.prototype.SetLists.call(this);

	this.HomeMatchUps = ArrayUtils.Create2D(MATCH.PLAYERS-1, 3);
	this.AwayMatchUps = ArrayUtils.Create2D(MATCH.PLAYERS-1, 3);
};
FootballMatchSimulation.prototype.GenerateMatchUps = function(bHome) {
	var i, j;
	var x, y;
	var zone1, zone2;
	var team1, team2;
	var aMtchups;
	var aDffrntls;

	//Select appropriate lists
	if (bHome) {
		team1 = this.HomeTeam;
		team2 = this.AwayTeam;
		aMtchups = this.HomeMatchUps;
	} else {
		team1 = this.AwayTeam;
		team2 = this.HomeTeam;
		aMtchups = this.AwayMatchUps;
	}

	//Check distance between opposing positions
	aDffrntls = new Array(MATCH.PLAYERS-1);
	for (i=1;i<MATCH.PLAYERS;++i) {
		zone1 = FormationZones[team1.Formation][i];
		for (j=1;j<MATCH.PLAYERS;++j) {
			zone2 = FormationZones[team2.Formation][j];
			x = Math.abs(Math.abs(6-zone2[0])-zone1[0]);
			y = Math.abs(Math.abs(6-zone2[1])-zone1[1]);
			aDffrntls[j-1] = { Index: j, Differential: x+y };
		}
		aDffrntls.sort(function(pos1, pos2) {return (pos1.Differential-pos2.Differential);});
		for (j=0;j<3;++j)
			aMtchups[i-1][j] = aDffrntls[j].Index;
	}
};
FootballMatchSimulation.prototype.SetRatings = function() {
	var i;
	var iPlyr;

	FootballMatch.prototype.SetRatings.call(this);

	this.SetUnitRatings();
	this.SetZonalRatings();
};
FootballMatchSimulation.prototype.GetRating = function(iUnit, aPlyrs) {
	var i;
	var rtng;

	rtng = 0;
	for (i=0;i<iUnit.length;++i)
		rtng += aPlyrs[iUnit[i]].Rating;

	return (rtng);
};
FootballMatchSimulation.prototype.SetUnitRatings = function() {

	//Set home unit ratings
	this.HomeG = this.HomeTeam.Starters[0].Rating;
	this.HomeD = this.GetRating(FormationUnits[this.HomeTeam.Formation][0], this.HomeTeam.Starters);
	this.HomeM = this.GetRating(FormationUnits[this.HomeTeam.Formation][1], this.HomeTeam.Starters);
	this.HomeA = this.GetRating(FormationUnits[this.HomeTeam.Formation][2], this.HomeTeam.Starters);

	//Set away unit ratings
	this.AwayG = this.AwayTeam.Starters[0].Rating;
	this.AwayD = this.GetRating(FormationUnits[this.AwayTeam.Formation][0], this.AwayTeam.Starters);
	this.AwayM = this.GetRating(FormationUnits[this.AwayTeam.Formation][1], this.AwayTeam.Starters);
	this.AwayA = this.GetRating(FormationUnits[this.AwayTeam.Formation][2], this.AwayTeam.Starters);
};
FootballMatchSimulation.prototype.SetZonalRatings = function() {

	//Set home zone ratings
	this.HomeR = this.GetRating(ZoneUnits[this.HomeTeam.Formation][0], this.HomeTeam.Starters);
	this.HomeC = this.GetRating(ZoneUnits[this.HomeTeam.Formation][1], this.HomeTeam.Starters);
	this.HomeL = this.GetRating(ZoneUnits[this.HomeTeam.Formation][2], this.HomeTeam.Starters);

	//Set away zone ratings
	this.AwayR = this.GetRating(ZoneUnits[this.AwayTeam.Formation][0], this.AwayTeam.Starters);
	this.AwayC = this.GetRating(ZoneUnits[this.AwayTeam.Formation][1], this.AwayTeam.Starters);
	this.AwayL = this.GetRating(ZoneUnits[this.AwayTeam.Formation][2], this.AwayTeam.Starters);
};
FootballMatchSimulation.prototype.SimMinute = function() {

	//Check who wins possession
	if (this.Randomizer.GetWinner(this.HomeRating, this.AwayRating, INVERTED)==0) {
		++this.HomePossession;
		this.HomeFlag = true;
	} else {
		++this.AwayPossession;
		this.HomeFlag = false;
	}

	switch (this.CycleState) {
		case MATCH.SIM.CYCLE.UNIT:
			this.SimUnit();
			this.CycleState = MATCH.SIM.CYCLE.ZONAL;
			break;
		case MATCH.SIM.CYCLE.ZONAL:
			this.SimZonal();
			this.CycleState = MATCH.SIM.CYCLE. MATChUP;
			break;
		case MATCH.SIM.CYCLE.MATChUP:
			this.SimMatchUp();
			this.CycleState = MATCH.SIM.CYCLE.UNIT;
			break;
	}
	++this.Minutes;
};
FootballMatchSimulation.prototype.SimMatch = function() {
	var i;

	for (i=0;i<MATCH.MINUTES;++i)
		this.SimMinute();
};
FootballMatchSimulation.prototype.UpdateGoals = function() {

	if (this.HomeFlag) {
		++this.HomeGoals;
		++this.HomeShots;
	} else {
		++this.AwayGoals;
		++this.AwayShots;
	}
};
FootballMatchSimulation.prototype.SimShot = function(GK) {

	if (this.Randomizer.CheckUnderOdds(15, 60-GK)) {
		this.MinuteResult = MATCH.SIM.RESULT.GOAL;
		this.UpdateGoals();
	} else {
		this.MinuteResult = MATCH.SIM.RESULT.SAVE;
		if (this.HomeFlag) {
			++this.HomeShots;
			++this.AwayPlayerWins[POSITION.GK];
		} else {
			++this.AwayShots;
			++this.HomePlayerWins[POSITION.GK];
		}
	}
};
FootballMatchSimulation.prototype.SimUnit = function() {
	var AttackD, AttackM, AttackA;
	var DefendG, DefendD, DefendM, DefendA;

	if (this.HomeFlag) {
		AttackD = this.HomeD;
		AttackM = this.HomeM;
		AttackA = this.HomeA;
		DefendG = this.AwayG;
		DefendD = this.AwayD;
		DefendM = this.AwayM;
		DefendA = this.AwayA;
	} else {
		AttackD = this.AwayD;
		AttackM = this.AwayM;
		AttackA = this.AwayA;
		DefendG = this.HomeG;
		DefendD = this.HomeD;
		DefendM = this.HomeM;
		DefendA = this.HomeA;
	}

	if (this.Randomizer.GetWinner(AttackD, DefendA, INVERTED)==0) {
		this.UpdateUnitWins(0, 2);
		if (this.Randomizer.GetWinner(AttackM, DefendM, INVERTED)==0) {
			this.UpdateUnitWins(1, 1);
			if (this.Randomizer.GetWinner(AttackA, DefendD, INVERTED)==0) {
				this.UpdateUnitWins(2, 0);
				this.SimShot(DefendG);
				return;
			} else
				this.UpdateUnitLosses(2, 0);
		} else
			this.UpdateUnitLosses(1, 2);
	} else
		this.UpdateUnitLosses(0, 2);

	this.MinuteResult = MATCH.SIM.RESULT.TURNOVER;
};
FootballMatchSimulation.prototype.SimZonal = function() {
	var i;
	var aZone, dZone;
	var nWins;
	var DefendGK;
	var AttackZone, DefendZone;

	//Determine right GK
	if (this.HomeFlag)
		DefendGK = this.HomeG;
	else
		DefendGK = this.AwayG;

	//Select one of the 3 zonal match-ups
	i = this.Randomizer.GetIndex(5);
	switch (true) {
		case (i==0):
			aZone = 0;
			dZone = 2;
			if (this.HomeFlag) {
				AttackZone = this.HomeR;
				DefendZone = this.AwayL;
			} else {
				AttackZone = this.AwayR;
				DefendZone = this.HomeL;
			}
			break;
		case (i==4):
			aZone = 2;
			dZone = 0;
			if (this.HomeFlag) {
				AttackZone = this.HomeL;
				DefendZone = this.AwayR;
			} else {
				AttackZone = this.AwayL;
				DefendZone = this.HomeR;
			}
			break;
		default:
			aZone = 1;
			dZone = 1;
			if (this.HomeFlag) {
				AttackZone = this.HomeC;
				DefendZone = this.AwayC;
			} else {
				AttackZone = this.AwayC;
				DefendZone = this.HomeC;
			}
			break;
	}

	//Play them against each other 3 times
	nWins = 0;
	for (i=0;i<3;++i)
		if (this.Randomizer.GetWinner(AttackZone, DefendZone, INVERTED)==0) {
			this.UpdateZonalWins(aZone, dZone);
			++nWins;
		} else
			this.UpdateZonalLosses(aZone, dZone);

	if (nWins==3)
		this.SimShot(DefendGK);
	else
		this.MinuteResult = MATCH.SIM.RESULT.TURNOVER;
};
FootballMatchSimulation.prototype.SimMatchUp = function() {
	var i;
	var DefendGK;
	var iPlyr;
	var nWins;

	//Determine right GK
	if (this.HomeFlag)
		DefendGK = this.HomeG;
	else
		DefendGK = this.AwayG;

	//Pick a player at random, see how many match-ups they win
	iPlyr = this.Randomizer.GetInRange(1,MATCH.PLAYERS-1);
	nWins = 0;
	if (this.HomeFlag) {
		for (i=0;i<3;++i)
			if (this.Randomizer.GetWinner(this.HomeTeam.Starters[iPlyr].Rating, this.AwayTeam.Starters[this.HomeMatchUps[iPlyr-1][i]].Rating, INVERTED)==0) {
				++nWins;
				++this.HomePlayerWins[iPlyr];
				--this.AwayPlayerWins[this.HomeMatchUps[iPlyr-1][i]];
			} else {
				--this.HomePlayerWins[iPlyr];
				++this.AwayPlayerWins[this.HomeMatchUps[iPlyr-1][i]];
			}
	} else {
		for (i=0;i<3;++i)
			if (this.Randomizer.GetWinner(this.AwayTeam.Starters[iPlyr].Rating, this.HomeTeam.Starters[this.AwayMatchUps[iPlyr-1][i]].Rating, INVERTED)==0) {
				++nWins;
				++this.AwayPlayerWins[iPlyr];
				--this.HomePlayerWins[this.AwayMatchUps[iPlyr-1][i]];
			} else {
				--this.AwayPlayerWins[iPlyr];
				++this.HomePlayerWins[this.AwayMatchUps[iPlyr-1][i]];
			}
	}

	if (nWins==3)
		this.SimShot(DefendGK);
	else
		this.MinuteResult = MATCH.SIM.RESULT.TURNOVER;
};
FootballMatchSimulation.prototype.UpdateUnitWins = function(aUnit, dUnit) {
	var i;

	if (this.HomeFlag) {
		for (i=0;i<FormationUnits[this.HomeTeam.Formation][aUnit].length;++i)
			++this.HomePlayerWins[FormationUnits[this.HomeTeam.Formation][aUnit][i]];
		for (i=0;i<FormationUnits[this.AwayTeam.Formation][dUnit].length;++i)
			--this.AwayPlayerWins[FormationUnits[this.AwayTeam.Formation][dUnit][i]];
	} else {
		for (i=0;i<FormationUnits[this.HomeTeam.Formation][dUnit].length;++i)
			--this.HomePlayerWins[FormationUnits[this.HomeTeam.Formation][dUnit][i]];
		for (i=0;i<FormationUnits[this.AwayTeam.Formation][aUnit].length;++i)
			++this.AwayPlayerWins[FormationUnits[this.AwayTeam.Formation][aUnit][i]];
	}
};
FootballMatchSimulation.prototype.UpdateUnitLosses = function(aUnit, dUnit) {
	var i;

	if (this.HomeFlag) {
		for (i=0;i<FormationUnits[this.HomeTeam.Formation][aUnit].length;++i)
			--this.HomePlayerWins[FormationUnits[this.HomeTeam.Formation][aUnit][i]];
		for (i=0;i<FormationUnits[this.AwayTeam.Formation][dUnit].length;++i)
			++this.AwayPlayerWins[FormationUnits[this.AwayTeam.Formation][dUnit][i]];
	} else {
		for (i=0;i<FormationUnits[this.HomeTeam.Formation][dUnit].length;++i)
			++this.HomePlayerWins[FormationUnits[this.HomeTeam.Formation][dUnit][i]];
		for (i=0;i<FormationUnits[this.AwayTeam.Formation][aUnit].length;++i)
			--this.AwayPlayerWins[FormationUnits[this.AwayTeam.Formation][aUnit][i]];
	}
};
FootballMatchSimulation.prototype.UpdateZonalWins = function(aZone, dZone) {
	var i;

	if (this.HomeFlag) {
		for (i=0;i<ZoneUnits[this.HomeTeam.Formation][aZone].length;++i)
			++this.HomePlayerWins[ZoneUnits[this.HomeTeam.Formation][aZone][i]];
		for (i=0;i<ZoneUnits[this.AwayTeam.Formation][dZone].length;++i)
			--this.AwayPlayerWins[ZoneUnits[this.AwayTeam.Formation][dZone][i]];
	} else {
		for (i=0;i<ZoneUnits[this.HomeTeam.Formation][dZone].length;++i)
			--this.HomePlayerWins[ZoneUnits[this.HomeTeam.Formation][dZone][i]];
		for (i=0;i<ZoneUnits[this.AwayTeam.Formation][aZone].length;++i)
			++this.AwayPlayerWins[ZoneUnits[this.AwayTeam.Formation][aZone][i]];
	}
};
FootballMatchSimulation.prototype.UpdateZonalLosses = function(aZone, dZone) {
	var i;

	if (this.HomeFlag) {
		for (i=0;i<ZoneUnits[this.HomeTeam.Formation][aZone].length;++i)
			--this.HomePlayerWins[ZoneUnits[this.HomeTeam.Formation][aZone][i]];
		for (i=0;i<ZoneUnits[this.AwayTeam.Formation][dZone].length;++i)
			++this.AwayPlayerWins[ZoneUnits[this.AwayTeam.Formation][dZone][i]];
	} else {
		for (i=0;i<ZoneUnits[this.HomeTeam.Formation][dZone].length;++i)
			++this.HomePlayerWins[ZoneUnits[this.HomeTeam.Formation][dZone][i]];
		for (i=0;i<ZoneUnits[this.AwayTeam.Formation][aZone].length;++i)
			--this.AwayPlayerWins[ZoneUnits[this.AwayTeam.Formation][aZone][i]];
	}
};
