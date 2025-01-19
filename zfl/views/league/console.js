
//------------------------------------------------------------
//---------- GRIDIRON LEAGUE CONSOLE VIEW --------------------
var GridironLeagueConsoleView = function() {
	var LeagueTouchBar, DifficultyTouchBar;
	var GameRadioOptions;

	var StarterRatings, OffRatings, DefRatings, TotalRatings;
};
GridironLeagueConsoleView.prototype = new GenieSubView();
GridironLeagueConsoleView.prototype.Set = function(cnvs, specs, mView, gTool, tWriter, rGenerator) {

	this.SetLinks(gTool, tWriter, rGenerator);

	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);
};
GridironLeagueConsoleView.prototype.SetControls = function() {

	this.LeagueTouchBar = new GenieTouchBar();
	this.LeagueTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.LEAGUE, this.Specs.TOUChBAR.LEAGUE.IMAGE);
	this.Controls.push(this.LeagueTouchBar);
	this.GameRadioOptions = new GenieRadioControls();
	this.GameRadioOptions.Set(this.Canvas, this.Specs.RADIO.GAMeOPTIONs, RadioOptionImage);
	this.GameRadioOptions.SetLinks(null, this.TextWriter);
	this.Controls.push(this.GameRadioOptions);
	this.DifficultyTouchBar = new GenieTouchBar();
	this.DifficultyTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.DIFFICULTY, this.Specs.TOUChBAR.DIFFICULTY.IMAGE);
	this.Controls.push(this.DifficultyTouchBar);
};
GridironLeagueConsoleView.prototype.ShowControls = function() {

	if (Game.Type==ZFL.TYPE.RANDOM)
		GenieSubView.prototype.ShowControls.call(this);
};
GridironLeagueConsoleView.prototype.Draw = function() {

	if (Game.Type==ZFL.TYPE.RANDOM) {
		this.DisplayControlLabels();
		this.DisplayLeagueInfo();
	} else {
		this.DisplayStarterThumbnails();
		this.DisplayRatings();
	}
};
GridironLeagueConsoleView.prototype.Update = function() {
/*
	if (this.GalleriesButton.CheckClicked())
		this.MainView.ReturnToGalleries();
*/
	//Check League touch bar
	if (this.LeagueTouchBar.CheckKeyChanged()) {
		this.LeagueTouchBar.Draw();
		this.DisplayLeagueInfo();
	}

	//Check Difficulty touch bar
	if (this.DifficultyTouchBar.CheckKeyChanged())
		this.DifficultyTouchBar.Draw();
};
GridironLeagueConsoleView.prototype.DisplayControlLabels = function() {

	//Box
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawBasReliefSection(60, 85, 230, 155, 80, this.Specs.COLOUR);
	this.GraphicsTool.RestoreContext();

	this.TextWriter.SetContext(this.Context);

	//Control labels
	this.TextWriter.Write("League type:", 5, 20);
	this.TextWriter.Write("Roster composition:", 110, 20);
	this.TextWriter.Write("Difficulty:", 60, 265);
	this.TextWriter.Write("Easiest", 60, 310, { FONT: "12px Arial" } );
	this.TextWriter.Write("Hardest", 210, 310, { FONT: "12px Arial" } );

	//Info labels
	this.TextWriter.Write("League Info", 70, 90);
	this.TextWriter.Write("Offense:", 65, 115, { FONT: "bold 14px Arial" } );
	this.TextWriter.Write("Style", 85, 135, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Key", 85, 155, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Defense:", 65, 185, { FONT: "bold 14px Arial" } );
	this.TextWriter.Write("Style", 85, 205, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Key", 85, 225, { FONT: "12px Arial", STYLE: FONT.STYLE.UNDERLINED } );

	this.TextWriter.RestoreContext();
};
GridironLeagueConsoleView.prototype.DisplayLeagueInfo = function() {
	var i;

	//Erase old info
	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(125, 100, 160, 65);
	this.Context.fillRect(125, 170, 160, 65);

	//Write new info
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write(Systems[0][this.LeagueTouchBar.SelectedKey], 130, 115);
	this.TextWriter.Write(Systems[1][this.LeagueTouchBar.SelectedKey], 130, 185);
	for (i=0;i<SystemDescriptions[0][this.LeagueTouchBar.SelectedKey].length;++i)
		this.TextWriter.Write(SystemDescriptions[0][this.LeagueTouchBar.SelectedKey][i], 130, 135+(20*i)+1, { FONT: "12px Arial" } );
	for (i=0;i<SystemDescriptions[1][this.LeagueTouchBar.SelectedKey].length;++i)
		this.TextWriter.Write(SystemDescriptions[1][this.LeagueTouchBar.SelectedKey][i], 130, 205+(20*i)+1, { FONT: "12px Arial" } );
	this.TextWriter.RestoreContext();
};
GridironLeagueConsoleView.prototype.DisplayStarterThumbnails = function() {
	var i;
	var intls, qlty;
	var off, def;
	var grddr;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(BLUE.INDIGO);

	//Titles
	this.TextWriter.Write("Roster Snapshot", 97, 20, { FONT: "14px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("OFF", 48, 45, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("DEF", 198, 45, { STYLE: FONT.STYLE.UNDERLINED } );

	function ShowHalfThumbnails(aGrddrs, aPairs, tWrtr, offst) {
		var i;
		var grddr;

		for (i=0;i<aPairs.length;++i) {
			grddr = aGrddrs[aPairs[i][0]][aPairs[i][1]];
			if (aPairs[i][1]<Teams[0].Roster.Gridders[aPairs[i][0]].length) {
				tWrtr.Write(Positions[grddr.Position], 10+offst, (15*i)+65);						//position
				tWrtr.Write(grddr.Name.First[0]+grddr.Name.Last[0], 35+offst, (15*i)+65);	//initials
				if (grddr.Experience<10)
					tWrtr.Write(grddr.Experience, 68+offst, (15*i)+65);
				else
					tWrtr.Write(grddr.Experience, 60+offst, (15*i)+65);								//experience
				tWrtr.Write(Utils.NumberToGrade(grddr.Quality), 85+offst, (15*i)+65);			//quality
				tWrtr.Write(Math.abs(grddr.Potential), 118+offst, (15*i)+65);
				if (grddr.Potential>0)
					tWrtr.Write("+", 110+offst, (15*i)+65);
				if (grddr.Potential<0)
					tWrtr.Write("-", 110+offst, (15*i)+65);												//potential
			}
		}
	};

	ShowHalfThumbnails(Teams[0].Roster.Gridders, OffPairs[0], this.TextWriter, 0);		//TEMP - could it remain 0 (default system)?
	ShowHalfThumbnails(Teams[0].Roster.Gridders, DefPairs[0], this.TextWriter, 160);

	this.TextWriter.RestoreContext();
	this.TextWriter.RestoreColour();
};
GridironLeagueConsoleView.prototype.DisplayRatings = function() {
	var i, j;
	var rtng;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(BLUE.INDIGO);

	this.DisplayTitlesAndLabels();
	this.DisplayQuality();
	this.DisplayRankings();
	this.DisplayDraftPosition();

	this.TextWriter.RestoreContext();
	this.TextWriter.RestoreColour();
};
GridironLeagueConsoleView.prototype.DisplayTitlesAndLabels = function() {

	this.TextWriter.Write("Quality Snapshot", 97, 240, { FONT: "14px Arial", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Starters:", 5, 260);
	this.TextWriter.Write("Offense:", 5, 275);
	this.TextWriter.Write("Defense:", 5, 290);
	this.TextWriter.Write("Total Roster:", 5, 305);
};
GridironLeagueConsoleView.prototype.DisplayQuality = function() {
	var rtng;

	//Starters
	rtng = Teams[0].Roster.GetStarterQuality();
	rtng = Utils.NumberToGrade(Math.round(rtng));
	this.TextWriter.Write(rtng, 110, 260);

	//Off starters
	rtng = Teams[0].Roster.GetOffStarterQuality();
	rtng = Utils.NumberToGrade(Math.round(rtng));
	this.TextWriter.Write(rtng, 110, 275);

	//Def starters
	rtng = Teams[0].Roster.GetDefStarterQuality();
	rtng = Utils.NumberToGrade(Math.round(rtng));
	this.TextWriter.Write(rtng, 110, 290);

	//Total roster
	rtng = Teams[0].Roster.GetTotalQuality();
	rtng = Utils.NumberToGrade(Math.round(rtng));
	this.TextWriter.Write(rtng, 110, 305);
};
GridironLeagueConsoleView.prototype.DisplayRankings = function() {
	var i;

	this.DetermineRankings();

	//Starters
	for (i=0;i<LEAGUE.TEAMS;++i)
		if (this.StarterRatings[i].Index==0)
			break;
	this.TextWriter.Write(i, 150, 260);

	//Off
	for (i=0;i<LEAGUE.TEAMS;++i)
		if (this.OffRatings[i].Index==0)
			break;
	this.TextWriter.Write(i, 150, 275);

	//Def
	for (i=0;i<LEAGUE.TEAMS;++i)
		if (this.DefRatings[i].Index==0)
			break;
	this.TextWriter.Write(i, 150, 290);

	//Total roster
	for (i=0;i<LEAGUE.TEAMS;++i)
		if (this.TotalRatings[i].Index==0)
			break;
	this.TextWriter.Write(i, 150, 305);
};
GridironLeagueConsoleView.prototype.DetermineRankings = function() {

	//Create arrays
	this.StarterRatings = new Array(LEAGUE.TEAMS);
	this.OffRatings = new Array(LEAGUE.TEAMS);
	this.DefRatings = new Array(LEAGUE.TEAMS);
	this.TotalRatings = new Array(LEAGUE.TEAMS);
	for (i=0;i<LEAGUE.TEAMS;++i) {
		rtng = Teams[i].Roster.GetStarterQuality();
		this.StarterRatings[i] = { Index: i, Rating: rtng };
		rtng = Teams[i].Roster.GetOffStarterQuality();
		this.OffRatings[i] = { Index: i, Rating: rtng };
		rtng = Teams[i].Roster.GetDefStarterQuality();
		this.DefRatings[i] = { Index: i, Rating: rtng };
		rtng = Teams[i].Roster.GetTotalQuality();
		this.TotalRatings[i] = { Index: i, Rating: rtng };
	}

	//Sort arrays
	this.StarterRatings.sort(function(a,b) {return (a.Rating-b.Rating);});
	this.OffRatings.sort(function(a,b) {return (a.Rating-b.Rating);});
	this.DefRatings.sort(function(a,b) {return (a.Rating-b.Rating);});
	this.TotalRatings.sort(function(a,b) {return (a.Rating-b.Rating);});
};
GridironLeagueConsoleView.prototype.DisplayDraftPosition = function() {
	var i;
	var qlty;
	var aQlty;

	aQlty = new Array(LEAGUE.TEAMS);

	for (i=0;i<LEAGUE.TEAMS;++i) {
		qlty = (2*Teams[i].Record.W) + Teams[i].Record.T;
		qlty += 1 - (Teams[i].Roster.GetCumulativeQuality()/2000);
		aQlty[i] = { Quality: qlty, Index: i };
	}
	aQlty.sort(function(a,b) {return (a.Quality-b.Quality);});
	ProjectDialogView.SetSelectionOrder(aQlty);

	//Set draft position
	for (i=0;i<LEAGUE.TEAMS;++i)
		Teams[aQlty[i].Index].DraftPosition = i;

	//Display
	this.TextWriter.Write("Draft", 200, 265);
	this.TextWriter.Write("Position: "+(Teams[0].DraftPosition+1), 200, 280);
};
