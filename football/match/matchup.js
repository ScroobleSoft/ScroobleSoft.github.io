/*
 *  Attacking/Balanced/Defensive will correspond to 2-6 match-up calculations rolls
 *  the number depends on the stance picked by the teams, 1/2/3 the rolls for the respective styles
 */
//-------------------------------------------------
//----------- MATCH UP SIMULATION ----------------------
var MatchUpSimulation = function() {
	var GoalScorer;
	var ScoringWeights;
	var DefensiveMatchUps;								//used to splice in GK sporadically
	var AttackingPotency, DefensiveResilience;

	var i;
};
MatchUpSimulation.prototype = new FootballMatchSimulation();
MatchUpSimulation.prototype.Set = function(rGenerator) {
   FootballMatchSimulation.prototype.Set.call(this, rGenerator);

   this.ScoringWeights = new Array(MATCH.PLAYERS);
	this.DefensiveMatchUps = new Array(4);
};
MatchUpSimulation.prototype.SetLists = function() {

	this.HomeTeam.MatchUps = ArrayUtils.Create2D(MATCH.PLAYERS, 3);
	this.AwayTeam.MatchUps = ArrayUtils.Create2D(MATCH.PLAYERS, 3);

	//TEMP HACK below
	this.HomeTeam.Formation = 0;
	this.AwayTeam.Formation = 0;
};
MatchUpSimulation.prototype.GenerateMatchUps = function() {
   var aMatches;

	aMatches = ArrayUtils.Create(MATCH.PLAYERS-1, function() { var Index, Distance; } );

   function SetMatchUps(aAttckrs, aDfndrs, aMtchUps, aMtchs) { 
		var i, j;

		//Home
		for (i=1;i<MATCH.PLAYERS;++i) {

			//Get distance to each opposing player
			for (j=1;j<MATCH.PLAYERS;++j) {
				aMtchs[i].Index = j;
				aMtchs[i].Distance = SpaceUtils.GetDistance(aAttckrs[i].Location, aDfndrs[j].Location);
			}

			//Pick 3 closest opponents
			aMtchs.sort(function(a, b) {a.Distance-b.Distance;} );
			for (j=0;j<3;++j)
				aMtchUps[i][j] = aDfndrs[aMtchs[j].Index];
		}
	}

	SetMatchUps(this.HomeTeam.Players, this.AwayTeam.Players, this.HomeTeam.MatchUps, aMatches);
	SetMatchUps(this.AwayTeam.Players, this.HomeTeam.Players, this.AwayTeam.MatchUps, aMatches);
};
MatchUpSimulation.prototype.GenerateRatings = function() {

	//UNLOGGED

};
MatchUpSimulation.prototype.Simulate = function() {
	var rslt, goal;

	//UNLOGGED

	rslt = this.ProgressBall();
	goal = 0;
	switch (rslt) {
		case 0:
			//-D loses ball
			break;
		case 1:
			//-M loses ball
			break;
		case 2:
			//-A loses ball
			break;
		case 3:
			//-attempt on goal
			goal = this.AttemptGoal();
			break;
	}

	if (goal)
		switch (goal) {
			case 1:
				//-missed
				break;
			case 2:
				//-saved (or hits post/bar)
				break;
			case 3:
				//-goal
				break;
		}
};
MatchUpSimulation.prototype.ProgressBall = function() {
	var i, j;
	var iPlyr;
	var bWin;
	var nPrgrs;

	//UNLOGGED

	//D and M
   nPrgrs = 0;
   for (i=0;i<2;++i) {
		iPlyr = this.Randomizer.GetIndex(FormationUnits[this.HomeTeam.Formation][i].length);
		bWin = false;
		for (j=0;j<3;++j)
			if (this.Randomizer.GetWinner(this.HomeTeam.Players[FormationUnits[i][iPlyr]].Rating, this.HomeTeam.MatchUps[iPlyr][j].Rating))
				bWin = true;
		if (!bWin)
			return (nPrgrs);
		++nPrgrs;
	}

   //A
	iPlyr = this.Randomizer.GetIndex(FormationUnits[this.HomeTeam.Formation][2].length);
	for (i=0;i<this.DefensiveMatchUps.length;++i)
		this.DefensiveMatchUps[i] = i;
	this.DefensiveMatchUps.Shuffle();
	bWin = false;
	for (i=0;i<3;++i)
		if (this.DefensiveMatchUps[i]<3) {
			if (this.Randomizer.GetWinner(this.HomeTeam.Players[FormationUnits[2][iPlyr]].Rating, this.HomeTeam.MatchUps[iPlyr][i].Rating)==0)
				bWin = true;
		} else {
			if (this.Randomizer.GetWinner(this.HomeTeam.Players[FormationUnits[2][iPlyr]].Rating, this.DefensivePlayers[0].Rating)==0)
				bWin = true;
		}
	if (!bWin)
		return (nPrgrs);
	++nPrgrs;

	return (nPrgrs);
};
MatchUpSimulation.prototype.AttemptGoal = function() {
	var i;
	var nSuccess;

	//UNLOGGED

	nSuccess = 0;
   for (i=0;i<3;++i)
		if (this.Randomizer.GetWinner(this.AttackingPotency, this.DefensiveResilience)==0)
			++nSuccess;

	switch (nSuccess) {
		case 0:
			//-miss
			break;
		case 1:
			//-save
			break;
		case 2:
			//-goal
			break;
	}
};
MatchUpSimulation.prototype.DetermineGoalScorer = function() {

   this.GenerateScorerList();
	this.GoalScorer = this.AttackingPlayers[this.Randomizer.GetSlot(this.ScoringWeights)];
};
MatchUpSimulation.prototype.GenerateScorerList = function() {
	var i;

	//UNLOGGED

   //Determine weights
   for (i=1;i<MATCH.PLAYERS;++i)
		switch (this.HomeTeam.Players[i].Position) {
			case POSITION.RB:												//FBs
			case POSITION.LB:
				this.ScoringWeights[i] = PositionGoals[0];
				break;
			case POSITION.RCB:											//CHs
			case POSITION.CB:
			case POSITION.LCB:
				this.ScoringWeights[i] = PositionGoals[1];
				break;
			case POSITION.RWB:											//ABs
			case POSITION.ACB:
			case POSITION.LWB:
				this.ScoringWeights[i] = PositionGoals[2];
				break;
			case POSITION.DM:												//DM
				this.ScoringWeights[i] = PositionGoals[3];
				break;
			case POSITION.RM:												//MFs
			case POSITION.RCM:
			case POSITION.CM:
			case POSITION.LCM:
			case POSITION.LM:
				this.ScoringWeights[i] = PositionGoals[4];
				break;
			case POSITION.RAM:											//OMs
			case POSITION.AM:
			case POSITION.CAM:
			case POSITION.LAM:
				this.ScoringWeights[i] = PositionGoals[5];
				break;
			case POSITION.RW:												//Ws
			case POSITION.LW:
				this.ScoringWeights[i] = PositionGoals[6];
				break;
			case POSITION.RF:												//Fs
			case POSITION.CF:
			case POSITION.LF:
				this.ScoringWeights[i] = PositionGoals[7];
				break;
			case POSITION.S:												//S
				this.ScoringWeights[i] = PositionGoals[8];
				break;
		}

	//Multiply by Quality, invert and multiply by 1000
   for (i=1;i<MATCH.PLAYERS;++i) {
		this.ScoringWeights[i] *= this.HomeTeam.Players[i].Rating;
		this.ScoringWeights[i] = this.ScoringWeights[i] ? 1 : this.ScoringWeights[i];
		this.ScoringWeights[i] = Math.round(1000/this.ScoringWeights[i]);
	}

	//Use weighted array to pick scorer
	return (this.Randomizer.GetSlot(this.ScoringWeights));
};
MatchUpSimulation.prototype.GetAttackingPotency = function() {

	this.AttackingPotency = 0;
   for (this.i=1;this.i<MATCH.PLAYERS;++this.i)
		this.AttackingPotency += PositionZones[this.AttackingPlayers[i].Position][0][0] + 1;
};
MatchUpSimulation.prototype.GetDefensiveResilience = function() {

	this.DefensiveResilience = 0;
   for (i=1;i<MATCH.PLAYERS;++i)
		this.DefensiveResilience += 7 - PositionZones[aPlyrs[i].Position][0][0];
};
