
FootballTesting.prototype.SetFixtureTest = function() {

	this.Screen.fillStyle = GREY.SILVER;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.Schedule = ArrayUtils.Create2D(LEAGUE.TEAMS, LEAGUE.TEAMS);
	League.Week = 0;
	League.Fixtures = ArrayUtils.Create(LEAGUE.FIXTURES, function() {var Home, Away;});		//NOTE: re-defined because 1-dim array is expected here
	League.GenerateFixtureLists();
	this.GenerateWeeklyFixtures();
	this.DisplayFixturesInfo();
};
FootballTesting.prototype.DisplayFixturesInfo = function() {

	this.TextWriter.SwitchContext(CANVAS.CONSOLE);

	this.TextWriter.Write("This is a demo of the fixture", 5, 20);
	this.TextWriter.Write("generation formula, the", 5, 35);
	this.TextWriter.Write("schedule 'flipping over' at the", 5, 50);
	this.TextWriter.Write("halfway stage; on this evidence,", 5, 65);
	this.TextWriter.Write("it works.", 5, 80);

	this.TextWriter.Write("Click main screen for next", 5, 105);
	this.TextWriter.Write("page - 4 in all, so only weeks", 5, 120);
	this.TextWriter.Write("1-36 are shown.", 5, 135);

	this.TextWriter.Write("NOTE: A league must be", 5, 155);
	this.TextWriter.Write("created first.", 5, 170);

	this.TextWriter.Write("A final test fills up a", 5, 190);
	this.TextWriter.Write("matrix to see if all fixtures", 5, 205);
	this.TextWriter.Write("are distinct. The last click", 5, 220);
	this.TextWriter.Write("displays the matrix.", 5, 235);

	this.TextWriter.RestoreContext();
};
FootballTesting.prototype.PlayFixtureTest = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayFixtureTest.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.Screen.fillStyle = GREY.SILVER;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.GenerateWeeklyFixtures();
		if (League.Week>27) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.DisplayFixturesMatrix();
		}
	}
};
FootballTesting.prototype.GenerateWeeklyFixtures = function() {
	var i, j;

	for (i=0;i<9;++i) {
		this.GenerateLeagueFixtures();
		++League.Week;
		for (j=0;j<10;++j)
			++this.Schedule[League.Fixtures[j].Home][League.Fixtures[j].Away];
		this.DisplayWeeklyFixtures(i);
	}
};
FootballTesting.prototype.GenerateLeagueFixtures = function() {
	var i;
	var aTeams;
	var hTeam, aTeam;		//h- home, a- away

	//Create array to rotate for match-ups
	aTeams = new GenieArray();
	aTeams.Set(LEAGUE.TEAMS);
	for (i=0;i<aTeams.length;++i)
		aTeams[i] = i;

	for (i=0;i<League.Week;++i) {
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

		//Set teams
		League.Fixtures[i].Home = League.FixtureList[hTeam];
		League.Fixtures[i].Away = League.FixtureList[aTeam];
	}

	this.Randomizer.Shuffle(League.Fixtures);
};
FootballTesting.prototype.DisplayWeeklyFixtures = function(iWeek) {
	var i;
	var x, y;

	for (i=0;i<10;++i) {
		x = (250*(iWeek % 3)) + 20;
		y = (200*Math.floor(iWeek/3)) + (15*i) + 30;
		this.TextWriter.Write(ClubNames[League.Fixtures[i].Home], x, y);
		this.TextWriter.Write("vs "+ClubNames[League.Fixtures[i].Away], x+105, y);
	}
};
FootballTesting.prototype.DisplayFixturesMatrix = function() {
	var i, j;

	this.Screen.fillStyle = GREY.SILVER;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	for (i=0;i<LEAGUE.TEAMS;++i)
		for (j=0;j<LEAGUE.TEAMS;++j)
	 this.TextWriter.Write(this.Schedule[i][j], 20*(i+1), 20*(j+1));
};
