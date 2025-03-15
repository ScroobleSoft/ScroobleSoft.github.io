
FootballFixturesSubView.prototype.DisplaySeasonFixtures = function() {
	var i, j;
	var start, end;
	var clr;

	if (Game.CheckMobile()) {
		if (this.ToggleIconPanel.DepressedIcon==0) {
			start = 0;
			end = LEAGUE.WEEKS / 2;
		} else {
			start = LEAGUE.WEEKS / 2;
			end = LEAGUE.WEEKS;
		}
	} else {
		start = 0;
		end = LEAGUE.WEEKS;
	}

	for (i=start;i<end;++i) {

		League.GenerateFixtures(i);

		//Select correct colour
		if (i==League.Week)
			clr = this.Specs.HIGHLIGHT;
		else
			clr = this.Specs.TEXT;

		this.DisplaySeasonWeek(i, clr, start);
		for (j=0;j<LEAGUE.FIXTURES;++j)
			if (League.Fixtures[j].Home==TeamSelected.Index || League.Fixtures[j].Away==TeamSelected.Index)
				break;
		this.DisplaySeasonTeams(i, j, clr, start);
		this.DisplaySeasonResult(i, j, clr, start);
	}
};
FootballFixturesSubView.prototype.DisplaySeasonWeek = function(iWeek, colour, strt) {

	if (iWeek==League.Week)
		this.GraphicsTool.DrawRectangle(this.Indent+3, (40+(15*(iWeek-strt)))-13, 330, 16, this.Specs.TEXT, 0);
	this.info = "Week " + (iWeek+1) + ":";
	this.TextWriter.Write(this.info, this.Indent+5, 40+(15*(iWeek-strt)), { COLOUR: colour } );
};
FootballFixturesSubView.prototype.DisplaySeasonTeams = function(iWeek, iFixture, colour, strt) {

	if (iWeek>=(LEAGUE.WEEKS/2)) {
		this.TextWriter.Write(ClubNames[League.Fixtures[iFixture].Home], this.Indent+75, 40+(15*(iWeek-strt)), { COLOUR: colour } );
		this.TextWriter.Write(ClubNames[League.Fixtures[iFixture].Away], this.Indent+220, 40+(15*(iWeek-strt)), { COLOUR: colour } );
	} else {
		this.TextWriter.Write(ClubNames[League.Fixtures[iFixture].Away], this.Indent+75, 40+(15*(iWeek-strt)), { COLOUR: colour } );
		this.TextWriter.Write(ClubNames[League.Fixtures[iFixture].Home], this.Indent+220, 40+(15*(iWeek-strt)), { COLOUR: colour } );
	}
};
FootballFixturesSubView.prototype.DisplaySeasonResult = function(iWeek, iFixture, colour, strt) {
	var info;

	if (iWeek<League.Weeks) {
		info = League.ResultsMatrix[League.Fixtures[iFixture].Home][League.Fixtures[iFixture].Away].Home + "-";
		info += League.ResultsMatrix[League.Fixtures[iFixture].Home][League.Fixtures[iFixture].Away].Away;
	} else
		info = " vs";
	this.TextWriter.Write(info, this.Indent+190, 40+(15*(iWeek-strt)), { COLOUR: colour } );
};
