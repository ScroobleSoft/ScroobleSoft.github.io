
FootballTesting.prototype.SetPossessionTest = function() {

	this.SetPossessionData();
	this.SetPossessionLists();
	this.SetPossessionTeams();

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.TextWriter.Write("Click screen to begin.", 20, 20);

	this.DisplayPossessionText();
};
FootballTesting.prototype.DisplayPossessionText = function() {

	this.InfoBox.fillStyle = GREY.LIGHT;
	this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	this.TextWriter.SetContext(this.InfoBox);

	this.TextWriter.Write("This started as a test to see", 5, 20);
	this.TextWriter.Write("if possession stats are an", 5, 35);
	this.TextWriter.Write("accurate reflection of team", 5, 50);
	this.TextWriter.Write("ratings, and turned into a full", 5, 65);
	this.TextWriter.Write("game simulation.", 5, 80);

	this.TextWriter.Write("Click screen to start game,", 5, 100);
	this.TextWriter.Write("keep clicking to sim minute by", 5, 115);
	this.TextWriter.Write("minute, click Control Panel to", 5, 130);
	this.TextWriter.Write("complete game sim.", 5, 145);

	this.TextWriter.Write("Note: this sim is 442 only.", 5, 162);

	this.TextWriter.Write("Follow instructions below for", 5, 180);
	this.TextWriter.Write("more sim options.", 5, 195);

	this.TextWriter.ResetContext();
};
FootballTesting.prototype.PlayPossessionTest = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayPossessionTest.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.RunPossessionCycle();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		while (this.PossessionMinutes<90)
	 this.RunPossessionCycle();
		this.TextWriter.Write("Click screen for a zone-based", 5, 20, null, CANVAS.CONSOLE);
		this.TextWriter.Write("sim.", 5, 35, null, CANVAS.CONSOLE);
		this.PlayZonalPossession();
	} else
		Mouse.ClearClicks();
};
FootballTesting.prototype.SetPossessionData = function() {

	this.PossessionMinutes = 0;
	this.HomePossession = 0;
	this.AwayPossession = 0;
	this.HomePossessionShots = 0;
	this.HomePossessionGoals = 0;
	this.AwayPossessionShots = 0;
	this.AwayPossessionGoals = 0;
};
FootballTesting.prototype.SetPossessionLists = function() {

	this.PossessionHomeTeam = new Array(11);
	this.PossessionAwayTeam = new Array(11);
	this.PossessionMatchUps = [ [10,8,4],[10,9,7],[9,10,6],[9,5,1], [4,7,8],[7,6,3],[6,7,2],[1,5,6], [3,2,4],[2,3,1] ];
	this.PossessionPositions = [ "GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "S", "S" ];
};
FootballTesting.prototype.SetPossessionTeams = function() {
	var i;

	//Set team ratings
	this.PossessionHomeRating = 0;
	this.PossessionAwayRating = 0;
	for (i=0;i<MATCH.PLAYERS;++i) {
		this.PossessionHomeTeam[i] = this.Randomizer.GetIndex(12);		//A+ to D-
		this.PossessionHomeRating += this.PossessionHomeTeam[i];
		this.PossessionAwayTeam[i] = this.Randomizer.GetIndex(12);
		this.PossessionAwayRating += this.PossessionAwayTeam[i];
	}

	//Set unit ratings
	this.PossessionHomeG = this.PossessionHomeTeam[0];
	this.PossessionHomeD = this.PossessionHomeTeam[1] + this.PossessionHomeTeam[2] + this.PossessionHomeTeam[3] + this.PossessionHomeTeam[4];
	this.PossessionHomeM = this.PossessionHomeTeam[5] + this.PossessionHomeTeam[6] + this.PossessionHomeTeam[7] + this.PossessionHomeTeam[8];
	this.PossessionHomeA = this.PossessionHomeTeam[9] + this.PossessionHomeTeam[10];
	this.PossessionAwayG = this.PossessionAwayTeam[0];
	this.PossessionAwayD = this.PossessionAwayTeam[1] + this.PossessionAwayTeam[2] + this.PossessionAwayTeam[3] + this.PossessionAwayTeam[4];
	this.PossessionAwayM = this.PossessionAwayTeam[5] + this.PossessionAwayTeam[6] + this.PossessionAwayTeam[7] + this.PossessionAwayTeam[8];
	this.PossessionAwayA = this.PossessionAwayTeam[9] + this.PossessionAwayTeam[10];

	//Set zonal ratings
	this.PossessionHomeR = this.PossessionHomeTeam[1] + this.PossessionHomeTeam[5];
	this.PossessionHomeC = this.PossessionHomeTeam[2] + this.PossessionHomeTeam[3] + this.PossessionHomeTeam[6] + this.PossessionHomeTeam[7] +
			  this.PossessionHomeTeam[9] + this.PossessionHomeTeam[10];
	this.PossessionHomeL = this.PossessionHomeTeam[4] + this.PossessionHomeTeam[8];
	this.PossessionAwayR = this.PossessionAwayTeam[1] + this.PossessionAwayTeam[5];
	this.PossessionAwayC = this.PossessionAwayTeam[2] + this.PossessionAwayTeam[3] + this.PossessionAwayTeam[6] + this.PossessionAwayTeam[7] +
			  this.PossessionAwayTeam[9] + this.PossessionAwayTeam[10];
	this.PossessionAwayL = this.PossessionAwayTeam[4] + this.PossessionAwayTeam[8];
};
FootballTesting.prototype.RunPossessionCycle = function() {

	this.UpdatePossessionStats();
	this.DisplayPossessionStats();
	this.DisplayPossessionResult(true);
	++this.PossessionMinutes;
};
FootballTesting.prototype.UpdatePossessionStats = function() {

	if (this.Randomizer.GetWinner(this.PossessionHomeRating, this.PossessionAwayRating, INVERTED)==0) {
		++this.HomePossession;
		this.ToggleFlag = true;
	} else {
		++this.AwayPossession;
		this.ToggleFlag = false;
	}
};
FootballTesting.prototype.DisplayPossessionStats = function() {

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, 50);

	this.TextWriter.Write("Minutes: "+this.PossessionMinutes, 20, 15);

	//Possession
	if (this.PossessionMinutes) {
		this.num = 400 * (this.HomePossession/(this.HomePossession+this.AwayPossession));
		this.GraphicsTool.DrawRectangle(20, 20, this.num, 20, "blue", 0);
		this.GraphicsTool.DrawRectangle(20+this.num, 20, 400*(this.AwayPossession/(this.HomePossession+this.AwayPossession)), 20, "red", 0);
	} else {
		this.GraphicsTool.DrawRectangle(20, 20, 200, 20, "blue", 0);
		this.GraphicsTool.DrawRectangle(220, 20, 200, 20, "red", 0);
		this.TextWriter.Write("Home:", 20, 65);
		this.TextWriter.Write("Away:", 20, 80);
		for (this.i=0;this.i<MATCH.PLAYERS;++this.i) {
	 this.TextWriter.Write(this.PossessionPositions[this.i]+" "+Utils.NumberToGrade(this.PossessionHomeTeam[this.i]), 70+(50*this.i), 65);
	 this.TextWriter.Write(this.PossessionPositions[this.i]+" "+Utils.NumberToGrade(this.PossessionAwayTeam[this.i]), 70+(50*this.i), 80);
		}
		this.TextWriter.Write("Overall: "+this.PossessionHomeRating, 700, 65);
		this.TextWriter.Write("Overall: "+this.PossessionAwayRating, 700, 80);
	}
	this.TextWriter.Write("Home: "+Math.round(100*(this.HomePossession/(this.HomePossession+this.AwayPossession)))+"%", 25, 35, { COLOUR: "white" } );
	this.TextWriter.Write("Away: "+Math.round(100*(this.AwayPossession/(this.HomePossession+this.AwayPossession)))+"%", 350, 35);

	//Shots-Goals
	this.TextWriter.Write("Home Goals: "+this.HomePossessionGoals, 450, 15);
	this.TextWriter.Write("Home Shots: "+this.HomePossessionShots, 600, 15);
	this.TextWriter.Write("Away Goals: "+this.AwayPossessionGoals, 450, 30);
	this.TextWriter.Write("Away Shots: "+this.AwayPossessionShots, 600, 30);
};
FootballTesting.prototype.DisplayPossessionResult = function(bPrnt) {

	if (this.ToggleFlag) {
		if (this.Randomizer.GetWinner(this.PossessionHomeD, this.PossessionAwayA, INVERTED)==0) {
	 if (this.Randomizer.GetWinner(this.PossessionHomeM, this.PossessionAwayM, INVERTED)==0) {
		 if (this.Randomizer.GetWinner(this.PossessionHomeA, this.PossessionAwayD, INVERTED)==0) {
			 if (this.Randomizer.CheckUnderOdds(6, 24-this.PossessionAwayG)) {
		  ++this.HomePossessionGoals;
		  if (bPrnt)
			  this.TextWriter.Write("Home Goal!", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
			 } else {
		  ++this.HomePossessionShots;
		  if (bPrnt)
			  this.TextWriter.Write("Shot saved by Away goalkeeper", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
			 }
		 } else {
			 if (bPrnt)
		  this.TextWriter.Write("Home attackers lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
		 }
	 } else {
		 if (bPrnt)
			 this.TextWriter.Write("Home midfield lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
	 }
		} else {
	 if (bPrnt)
		 this.TextWriter.Write("Home defense lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
		}
	} else {
		if (this.Randomizer.GetWinner(this.PossessionAwayD, this.PossessionHomeA, INVERTED)==0) {
	 if (this.Randomizer.GetWinner(this.PossessionAwayM, this.PossessionHomeM, INVERTED)==0) {
		 if (this.Randomizer.GetWinner(this.PossessionAwayA, this.PossessionHomeD, INVERTED)==0) {
			 if (this.Randomizer.CheckUnderOdds(6, 24-this.PossessionHomeG)) {
		  ++this.AwayPossessionGoals;
		  if (bPrnt)
			  this.TextWriter.Write("Away Goal!", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
			 } else {
		  ++this.AwayPossessionShots;
		  if (bPrnt)
			  this.TextWriter.Write("Shot saved by Home goalkeeper", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
			 }
		 } else {
			 if (bPrnt)
		  this.TextWriter.Write("Away attackers lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
		 }
	 } else {
		 if (bPrnt)
			 this.TextWriter.Write("Away midfield lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
	 }
		} else {
	 if (bPrnt)
		 this.TextWriter.Write("Away defense lost possession", 20+(240*Math.floor(this.PossessionMinutes/30)), 120+(15*(this.PossessionMinutes % 30)));
		}
	}
};
FootballTesting.prototype.PlayZonalPossession = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayZonalPossession.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.RunTriStepPossession(true);
		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(0, 100, SCREEN.WIDTH, 500);
		this.DisplayPossessionStats();
		this.TextWriter.Write("Click screen for a matchup", 5, 55, null, CANVAS.CONSOLE);
		this.TextWriter.Write("based sim.", 5, 70, null, CANVAS.CONSOLE);
		this.PlayMatchUpPossession();
	} else
		Mouse.ClearClicks();
}
FootballTesting.prototype.RunTriStepPossession = function(bZonal) {
	var i;

	this.SetPossessionData();
	for (i=0;i<90;++i) {
		this.UpdatePossessionStats();
		if (bZonal)
	 this.num = this.ContestZonalPossession();
		else
	 this.num = this.ContestMatchUpPossession();
		if (this.num==3)
	 if (this.ToggleFlag) {
		 if (this.Randomizer.CheckUnderOdds(6, 24-this.PossessionAwayG))
			 ++this.HomePossessionGoals;
		 else
			 ++this.HomePossessionShots;
	 } else {
		 if (this.Randomizer.CheckUnderOdds(6, 24-this.PossessionHomeG))
			 ++this.AwayPossessionGoals;
		 else
			 ++this.AwayPossessionShots;
	 }
		++this.PossessionMinutes;
	}
};
FootballTesting.prototype.ContestZonalPossession = function() {
	var i;

	//Select one of the 3 zonal match-ups
	this.num = this.Randomizer.GetIndex(5);
	switch (true) {
		case (this.num==0):
	 this.PossessionHomeBloc = this.PossessionHomeR;
	 this.PossessionAwayBloc = this.PossessionAwayL;
	 break;
		case (this.num==4):
	 this.PossessionHomeBloc = this.PossessionHomeL;
	 this.PossessionAwayBloc = this.PossessionAwayR;
	 break;
		default:
	 this.PossessionHomeBloc = this.PossessionHomeC;
	 this.PossessionAwayBloc = this.PossessionAwayC;
	 break;
	}

	//Play them against each other 3 times
	this.PossessionWins = 0;
	for (i=0;i<3;++i)
		if (this.ToggleFlag) {
	 if (this.Randomizer.GetWinner(this.PossessionHomeBloc, this.PossessionAwayBloc, INVERTED)==0)
		 ++this.PossessionWins;
		} else {
	 if (this.Randomizer.GetWinner(this.PossessionHomeBloc, this.PossessionAwayBloc, INVERTED)==1)
		 ++this.PossessionWins;
		}

	return (this.PossessionWins);
};
FootballTesting.prototype.PlayMatchUpPossession = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayMatchUpPossession.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.RunTriStepPossession();
		this.DisplayPossessionStats();
		this.TextWriter.Write("Click screen to run each of the", 5, 90, null, CANVAS.CONSOLE);
		this.TextWriter.Write("3 sim types 30 times.", 5, 105, null, CANVAS.CONSOLE);
		this.PlayCumulativePossession();
	} else
		Mouse.ClearClicks();
};
FootballTesting.prototype.ContestMatchUpPossession = function() {

	//Pick a player at random, see how many match-ups they win
	this.num = this.Randomizer.GetIndex(MATCH.PLAYERS-1);
	this.PossessionWins = 0;
	if (this.ToggleFlag) {
		for (this.i=0;this.i<3;++this.i)
	 if (this.Randomizer.GetWinner(this.PossessionHomeTeam[this.num+1], this.PossessionAwayTeam[this.PossessionMatchUps[this.num][this.i]])==0)
		 ++this.PossessionWins;
	} else {
		for (this.i=0;this.i<3;++this.i)
	 if (this.Randomizer.GetWinner(this.PossessionAwayTeam[this.num+1], this.PossessionHomeTeam[this.PossessionMatchUps[this.num][this.i]])==0)
		 ++this.PossessionWins;
	}

	return (this.PossessionWins);
};
FootballTesting.prototype.PlayCumulativePossession = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayCumulativePossession.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.RunCumulativePossession();
		this.TextWriter.Write("Keep clicking screen to", 5, 125, null, CANVAS.CONSOLE);
		this.TextWriter.Write("repeat 3 sims 30 times.", 5, 140, null, CANVAS.CONSOLE);
		this.PlayNewPossession();
	} else
		Mouse.ClearClicks();
};
FootballTesting.prototype.RunCumulativePossession = function() {
	var i;
	var hGoals, aGoals;

	hGoals = 0;
	aGoals = 0;
	for (i=0;i<30;++i) {
		this.SetPossessionData();
		for (j=0;j<90;++j) {
	 this.UpdatePossessionStats();
	 this.DisplayPossessionResult();
		}
		this.TextWriter.Write("Home: "+this.HomePossessionGoals+" Away: "+this.AwayPossessionGoals, 20, 100+(15*i));
		hGoals += this.HomePossessionGoals;
		aGoals += this.AwayPossessionGoals;
	}
	this.TextWriter.Write("Home: "+Math.round(hGoals/30)+" Away: "+Math.round(aGoals/30), 20, 580);

	this.SetPossessionData();
	hGoals = 0;
	aGoals = 0;
	for (i=0;i<30;++i) {
		this.RunTriStepPossession(true);
		this.TextWriter.Write("Home: "+this.HomePossessionGoals+" Away: "+this.AwayPossessionGoals, 220, 100+(15*i));
		hGoals += this.HomePossessionGoals;
		aGoals += this.AwayPossessionGoals;
	}
	this.TextWriter.Write("Home: "+Math.round(hGoals/30)+" Away: "+Math.round(aGoals/30), 220, 580);

	this.SetPossessionData();
	hGoals = 0;
	aGoals = 0;
	for (i=0;i<30;++i) {
		this.RunTriStepPossession();
		this.TextWriter.Write("Home: "+this.HomePossessionGoals+" Away: "+this.AwayPossessionGoals, 420, 100+(15*i));
		hGoals += this.HomePossessionGoals;
		aGoals += this.AwayPossessionGoals;
	}
	this.TextWriter.Write("Home: "+Math.round(hGoals/30)+" Away: "+Math.round(aGoals/30), 420, 580);
};
FootballTesting.prototype.PlayNewPossession = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayNewPossession.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.RunNewPossession();
	} else
		Mouse.ClearClicks();
};
FootballTesting.prototype.RunNewPossession = function() {
	var i;

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 50, SCREEN.WIDTH, 550);
	this.SetPossessionTeams();
	this.TextWriter.Write("Home:", 20, 65);
	this.TextWriter.Write("Away:", 20, 80);
	for (i=0;i<MATCH.PLAYERS;++i) {
		this.TextWriter.Write(this.PossessionPositions[i]+" "+Utils.NumberToGrade(this.PossessionHomeTeam[i]), 70+(50*i), 65);
		this.TextWriter.Write(this.PossessionPositions[i]+" "+Utils.NumberToGrade(this.PossessionAwayTeam[i]), 70+(50*i), 80);
	}
	this.TextWriter.Write("Overall: "+this.PossessionHomeRating, 700, 65);
	this.TextWriter.Write("Overall: "+this.PossessionAwayRating, 700, 80);
	this.RunCumulativePossession();
};
