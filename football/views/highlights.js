/*
 *  NOTE: all calculations of the outcome are the same, no matter which players are involved
 *  moves-
 *	right wing cross
 *	left wing cross
 *	right wing dribble and pass (RW to RF)
 *	left wing dribble and pass (LW to LF)
 *	right wing dribble and shoot (cutting inside)
 *	left wing dribble and shoot (cutting inside)
 *	RCM dribble and through pass
 *	LCM dribble and through pass
 *	RW to RCM short pass and long range shot
 *	LW to LCM short pass and long range shot
 *	RW to RCM to LF triangle and shot
 *	LW to LCM to RF triangle and shot
 */
//-----------------------------------------------------
//---------- MATCH HIGHLIGHTS VIEW --------------------
var MatchHighlightsView = function() {
	var Goals;
	var PenaltyAreaImage, MarkImage;
	var MinutesL;
	var Frames;

	var hPos, aPos;
};
MatchHighlightsView.prototype = new GenieView();
MatchHighlightsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.Goals = { Home: 0, Away: 0 };
	this.MinutesL = [ 83,130,180,230,279,329,379 ];
	this.Frames = 0;
};
MatchHighlightsView.prototype.SetImages = function(pTeam, iWeek) {

	this.PenaltyAreaImage = new GenieImage();
	this.PenaltyAreaImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PENALTY);
	this.MarkImage = new GenieImage();
	this.MarkImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MARK);
};
MatchHighlightsView.prototype.SetFixture = function(pTeam, iWeek) {  //p-player
	var i;

	for (i=0;i<League.Fixtures[iWeek].length;++i) {
		if (League.Fixtures[iWeek][i].Home==pTeam.Index) {
			this.SetTeams(pTeam, Teams[League.Fixtures[iWeek][i].Away]);
			return;
		}
		if (League.Fixtures[iWeek][i].Away==pTeam.Index) {
			this.SetTeams(Teams[League.Fixtures[iWeek][i].Home], pTeam);
			return;
		}
	}
};
MatchHighlightsView.prototype.SetTeams = function(hTeam, aTeam) {  //h-home, a-away

	QuickSim.SetTeams(hTeam, aTeam);
};
MatchHighlightsView.prototype.Open = function() {

	//Re-size sub-canvases  . . . TODO: could use a FirstOpenFlag here
	FootieScape.ZoomScape.Element.width = 326;
	document.getElementById("ConsoleDiv").style.left = "338px";
	FootieScape.Console.Element.width = 70;

	GenieView.prototype.Open.call(this);

	this.Update();
};
MatchHighlightsView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Skip 5 frames each time - draw only on every 6th
	++this.Frames;
	if (this.Frames % 6)
		return;

	QuickSim.SimMinute();
	this.UpdateGoals();
	this.UpdateMinutes();
	this.UpdatePossession();
	this.UpdateShots();	
	if (QuickSim.Minutes==MATCH.MINUTES) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.InfoView.DisplayWins();
		return;
		this.Context.fillStyle = GREY.LIGHT;
		this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.TextWriter.Write("Home Rating: " + Utils.NumberToGrade(Math.round(QuickSim.HomeRating/MATCH.PLAYERS)), 5, 35);
		this.TextWriter.Write("Away Rating: " + Utils.NumberToGrade(Math.round(QuickSim.AwayRating/MATCH.PLAYERS)), 205, 35);
		this.TextWriter.Write("Home Possession: " + QuickSim.HomePossession, 5, 50);
		this.TextWriter.Write("Away Possession: " + QuickSim.AwayPossession, 205, 50);
		this.TextWriter.Write("Home Goals: " + QuickSim.HomeGoals, 5, 65);
		this.TextWriter.Write("Away Goals: " + QuickSim.AwayGoals, 205, 65);
		this.TextWriter.Write("Home Shots: " + QuickSim.HomeShots, 5, 80);
		this.TextWriter.Write("Away Shots: " + QuickSim.AwayShots, 205, 80);
		this.TextWriter.Write("Home Formation: " + FormationNames[QuickSim.HomeTeam.Formation], 5, 95);
		this.TextWriter.Write("Away Formation: " + FormationNames[QuickSim.AwayTeam.Formation], 205, 95);

		//Player of the match
		var hPlyr, aPlyr;
		hPlyr = ArrayUtils.GetHighestIndex(QuickSim.HomePlayerWins);
		aPlyr = ArrayUtils.GetHighestIndex(QuickSim.AwayPlayerWins);
		if (QuickSim.HomePlayerWins[hPlyr]>QuickSim.AwayPlayerWins[aPlyr]) {
			this.TextWriter.Write("Player of the Match: "+QuickSim.HomeTeam.Starters[hPlyr].Name.Last, 5, 110);
			this.TextWriter.Write(Utils.NumberToGrade(QuickSim.HomeTeam.Starters[hPlyr].Rating), 190, 110);
			this.TextWriter.Write(QuickSim.HomePlayerWins[hPlyr], 220, 110);
		} else {
			this.TextWriter.Write("Player of the Match: "+QuickSim.AwayTeam.Starters[aPlyr].Name.Last, 5, 110);
			this.TextWriter.Write(Utils.NumberToGrade(QuickSim.AwayTeam.Starters[aPlyr].Rating), 190, 110);
			this.TextWriter.Write(QuickSim.AwayPlayerWins[aPlyr], 220, 110);
		}

		//Teams
		var i;
		var initials;
		for (i=0;i<MATCH.PLAYERS;++i) {

			//Home
			this.TextWriter.Write(Positions[QuickSim.HomeTeam.Starters[i].Position], 5+(35*i), 125);
			initials = QuickSim.HomeTeam.Starters[i].Name.First[0] + QuickSim.HomeTeam.Starters[i].Name.Last[0];
			this.TextWriter.Write(initials, 5+(35*i), 140);
			this.TextWriter.Write(Utils.NumberToGrade(QuickSim.HomeTeam.Starters[i].Rating), 5+(35*i), 155);
			this.TextWriter.Write(QuickSim.HomePlayerWins[i], 5+(35*i), 170);

			//Away
			this.TextWriter.Write(Positions[QuickSim.AwayTeam.Starters[i].Position], 5+(35*i), 185);
			initials = QuickSim.AwayTeam.Starters[i].Name.First[0] + QuickSim.AwayTeam.Starters[i].Name.Last[0];
			this.TextWriter.Write(initials, 5+(35*i), 200);
			this.TextWriter.Write(Utils.NumberToGrade(QuickSim.AwayTeam.Starters[i].Rating), 5+(35*i), 215);
			this.TextWriter.Write(QuickSim.AwayPlayerWins[i], 5+(35*i), 230);
		}
	}
};
MatchHighlightsView.prototype.Draw = function() {

	this.DisplayTeamNames();
	this.UpdateGoals();
	this.PenaltyAreaImage.Draw();
	this.DisplayMeters();
	this.TextWriter.Write("Formation:", 5, 355);
	this.UpdateFormations();
	this.TextWriter.Write("Rating:", 5, 375);
	this.UpdateRatings();
	this.TextWriter.Write("Shots:", 5, 395);
	this.UpdateShots();
};
MatchHighlightsView.prototype.DisplayTeamNames = function() {

	this.GraphicsTool.DrawRectangle(0, 0, 400, 28, TeamColours[QuickSim.HomeTeam.Index][0], 3);

	//Home team
	this.TextWriter.SetFont("18px Arial");
	this.TextWriter.SetColour(TeamColours[QuickSim.HomeTeam.Index][0]);
	this.TextWriter.Write(ClubNames[QuickSim.HomeTeam.Index] + " FC", 5, 20);
	this.TextWriter.ResetColour();

	//Away team
	this.TextWriter.SetColour(TeamColours[QuickSim.AwayTeam.Index][0]);
	this.TextWriter.Write("vs " + ClubNames[QuickSim.AwayTeam.Index] + " FC", 185, 20);
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
MatchHighlightsView.prototype.DisplayMeters = function() {
	var i;
	var w;

	//Minutes
	this.TextWriter.Write("Minutes:", 5, 295);
	this.TextWriter.SetFont("10px Arial");
	for (i=0;i<=6;++i) {
		this.TextWriter.Write(15*i, this.MinutesL[i], 275);
		this.MarkImage.Draw(85+Math.round((i/6)*299), 276);
	}
	this.TextWriter.ResetFont();
	this.UpdateMinutes();

	//Possession
	this.TextWriter.Write("Possession:", 5, 335);
	this.TextWriter.SetFont("10px Arial");
	this.TextWriter.Write(ClubNames[QuickSim.HomeTeam.Index] + " FC", 85, 315);
	w = StringUtils.GetTextWidth(ClubNames[QuickSim.AwayTeam.Index] + " FC", null, this.Context);
	this.TextWriter.Write(ClubNames[QuickSim.AwayTeam.Index] + " FC", 385-w, 315);
	this.TextWriter.ResetFont();
	this.UpdatePossession();
};
MatchHighlightsView.prototype.UpdateGoals = function() {

	//Home team
	this.GraphicsTool.DrawRectangle(145, 5, 35, 20, this.Specs.COLOUR, 0);
	this.TextWriter.SetFont("18px Arial");
	this.TextWriter.SetColour(TeamColours[QuickSim.HomeTeam.Index][0]);
	if (QuickSim.HomeGoals<10)
		this.TextWriter.Write(QuickSim.HomeGoals, 165, 20);
	else
		this.TextWriter.Write(QuickSim.HomeGoals, 153, 20);
	this.TextWriter.ResetColour();

	//Away team
	this.GraphicsTool.DrawRectangle(355, 5, 35, 20, this.Specs.COLOUR, 0);
	this.TextWriter.SetColour(TeamColours[QuickSim.AwayTeam.Index][0]);
	if (QuickSim.AwayGoals<10)
		this.TextWriter.Write(QuickSim.AwayGoals, 375, 20);
	else
		this.TextWriter.Write(QuickSim.AwayGoals, 363, 20);
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
MatchHighlightsView.prototype.UpdateMinutes = function() {

	this.GraphicsTool.DrawRectangle(85, 280, 300, 20, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(85, 280, 300*(QuickSim.Minutes/MATCH.MINUTES), 20, "red", 0);
	this.GraphicsTool.DrawRectangle(85, 280, 300, 20, "black", 1);
};
MatchHighlightsView.prototype.UpdatePossession = function() {

	if (QuickSim.Minutes==0) {
		this.GraphicsTool.DrawRectangle(85, 317, 150, 20, TeamColours[QuickSim.HomeTeam.Index][0], 0);
		this.GraphicsTool.DrawRectangle(235, 317, 150, 20, TeamColours[QuickSim.AwayTeam.Index][0], 0);
	} else {
		this.hPos = QuickSim.HomePossession / (QuickSim.HomePossession+QuickSim.AwayPossession);
		this.GraphicsTool.DrawRectangle(85, 317, 300*this.hPos, 20, TeamColours[QuickSim.HomeTeam.Index][0], 0);
		this.TextWriter.Write(90, 330, Math.round(this.hPos*100)+"%", TeamColours[QuickSim.HomeTeam.Index][1], 0);
		this.aPos = QuickSim.AwayPossession / (QuickSim.HomePossession+QuickSim.AwayPossession);
		this.GraphicsTool.DrawRectangle(85+(300*this.hPos), 317, 300*this.aPos, 20, TeamColours[QuickSim.AwayTeam.Index][0], 0);
		this.TextWriter.Write(90+(300*this.hPos), 330, Math.round(this.aPos*100)+"%", TeamColours[QuickSim.HomeTeam.Index][1], 0);
	}
};
MatchHighlightsView.prototype.UpdateShots = function() {

	this.GraphicsTool.DrawRectangle(80, 380, 320, 20, this.Specs.COLOUR, 0);
	this.TextWriter.Write(QuickSim.HomeShots, 85, 395);
	this.TextWriter.Write(QuickSim.AwayShots, 340, 395);
};
MatchHighlightsView.prototype.UpdateFormations = function() {

	this.GraphicsTool.DrawRectangle(80, 345, 320, 15, this.Specs.COLOUR, 0);
	this.TextWriter.Write(FormationNames[QuickSim.HomeTeam.Formation], 85, 355);
	this.TextWriter.Write(FormationNames[QuickSim.AwayTeam.Formation], 340, 355);
};
MatchHighlightsView.prototype.UpdateRatings = function() {

	this.GraphicsTool.DrawRectangle(80, 365, 320, 15, this.Specs.COLOUR, 0);
	this.TextWriter.Write(Utils.NumberToGrade(Math.round(QuickSim.HomeRating/MATCH.PLAYERS)), 85, 375);
	this.TextWriter.Write(Utils.NumberToGrade(Math.round(QuickSim.AwayRating/MATCH.PLAYERS)), 340, 375);
};
MatchHighlightsView.prototype.OpenTableView = function() {  //UNLOGGED - this will happen after results for the week are displayed

	//Return canvases to original size
	FootieScape.ZoomScape.Element.width = INFoBOX.MOBILE.W;
	document.getElementById("ConsoleDiv").style.left = "252px";
	FootieScape.Console.Element.width = CONTROlPANEL.MOBILE.W;

//	GenieView.prototype.Open.call(this);
};
