
//---------------------------------------------------------
//---------- GRIDIRON SEASON INFO VIEW --------------------
var GridironSeasonInfoView = function() {
	var SelectionImage;
	var SelectedGridder, MatchUpGridder;
	var GridderBoxes;
};
GridironSeasonInfoView.prototype = new GenieSubView();
GridironSeasonInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.MatchUpGridder = GameSim.MatchUps[this.SelectedGridder] + ((2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS);
};
GridironSeasonInfoView.prototype.SetData = function() {
	var i;
	var t;

	this.GridderBoxes = ArrayUtils.Create(2*(OFFENSE.PLAYERS+DEFENSE.PLAYERS), GenieRect);
	for (i=0;i<OFFENSE.PLAYERS;++i) {
		t = 22 + (15*i);
		this.GridderBoxes[i].Set(2, t, 49, 15);
		this.GridderBoxes[i+OFFENSE.PLAYERS].Set(51, t, 49, 15);
		this.GridderBoxes[i+(OFFENSE.PLAYERS+DEFENSE.PLAYERS)].Set(102, t, 49, 15);
		this.GridderBoxes[i+((2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS)].Set(151, t, 49, 15);
	}
};
GridironSeasonInfoView.prototype.SetImages = function() {

	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
};
GridironSeasonInfoView.prototype.Draw = function() {

	Text.SetContext(this.Context);
	Text.SetColour("white");
	Graphics.SetContext(this.Context);

	this.DisplayHeading();
	this.DisplayPlayers();
	this.DisplayDividers();
	this.DisplayRatings();
	if (this.MainView===MatchUpsView)
		this.UpdateSlot(this.MainView.MatchUps[this.MainView.SelectedMatchUp].Player);

	Graphics.ResetContext();
	Text.ResetColour();
	Text.ResetContext();
};
GridironSeasonInfoView.prototype.DisplayHeading = function() {
	var cntxt;

	//Home
	Graphics.DrawRectangle(2, 3, 95, 16, InterfaceColours[0], 0);
	cntxt = AbbreviationImages.Context;
	AbbreviationImages.SetContext(this.Context);
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 3, 4);
	Text.Write(GameSim.HomeTeam.Record.W+"-"+GameSim.HomeTeam.Record.L, 55, 15);

	//Visitors
	Graphics.DrawRectangle(104, 3, 93, 16, InterfaceColours[0], 0);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 105, 4);
	AbbreviationImages.SetContext(cntxt);
	Text.Write(GameSim.VisitorTeam.Record.W+"-"+GameSim.VisitorTeam.Record.L, 155, 15);
};
GridironSeasonInfoView.prototype.DisplayPlayers = function() {
	var i;
	var y;

	for (i=0;i<OFFENSE.PLAYERS;++i) {
		y = 35 + (15*i);
		this.DisplayPlayer(GameSim.HomeTeam.OffStarters[i], 5, y);
		this.DisplayPlayer(GameSim.HomeTeam.DefStarters[i], 54, y);
		this.DisplayPlayer(GameSim.VisitorTeam.OffStarters[i], 105, y);
		this.DisplayPlayer(GameSim.VisitorTeam.DefStarters[i], 154, y);
	}
};
GridironSeasonInfoView.prototype.DisplayPlayer = function(plyr, x, y) {

	Text.Write(Positions[plyr.Position], x, y);
	Text.Write(Utils.NumberToGrade(plyr.Quality), x+25, y);
};
GridironSeasonInfoView.prototype.DisplayDividers = function() {

	Graphics.DrawRectangle(5, 190, 90, 2, "white", 1);			//horizontal
	Graphics.DrawRectangle(105, 190, 90, 2, "white", 1);
	Graphics.DrawRectangle(100, 5, 2, 230, "white", 1);		//vertical
};
GridironSeasonInfoView.prototype.DisplayRatings = function() {

	//Offense and defense
	Text.Write("OFF", 5, 210, { FONT: "10px Arial" } );
	this.DisplayRating(GameSim.HomeTeam.OffStarters, null, OFFENSE.PLAYERS, 30, 210);
	Text.Write("DEF", 55, 210, { FONT: "10px Arial" } );
	this.DisplayRating(GameSim.HomeTeam.DefStarters, null, DEFENSE.PLAYERS, 80, 210);
	Text.Write("OFF", 105, 210, { FONT: "10px Arial" } );
	this.DisplayRating(GameSim.VisitorTeam.OffStarters, null, OFFENSE.PLAYERS, 130, 210);
	Text.Write("DEF", 155, 210, { FONT: "10px Arial" } );
	this.DisplayRating(GameSim.VisitorTeam.DefStarters, null, DEFENSE.PLAYERS, 180, 210);

	//Starters
	Text.Write("Overall: ", 5, 230);
	this.DisplayRating(GameSim.HomeTeam.OffStarters, GameSim.HomeTeam.DefStarters, OFFENSE.PLAYERS+DEFENSE.PLAYERS, 60, 230);
	Text.Write("Overall: ", 105, 230);
	this.DisplayRating(GameSim.VisitorTeam.OffStarters, GameSim.VisitorTeam.DefStarters, OFFENSE.PLAYERS+DEFENSE.PLAYERS, 160, 230);
};
GridironSeasonInfoView.prototype.DisplayRating = function(aStrtrs1, aStrtrs2, nStrtrs, x, y) {
	var rtng;

	rtng = 0;
	aStrtrs1.forEach( function(strtr) {rtng+=strtr.Quality} );
	if (aStrtrs2)
		aStrtrs2.forEach( function(strtr) {rtng+=strtr.Quality} );
	rtng = Utils.NumberToGrade(Math.round(rtng/nStrtrs));
	Text.Write(rtng, x, y);
};
GridironSeasonInfoView.prototype.UpdateClick = function() {
	var i;

	//Check all boxes for clicks
	for (i=0;i<this.GridderBoxes.length;++i)
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.GridderBoxes[i]))
			break;

	//Check which team's gridder is clicked on (if any)
	if (i!=this.GridderBoxes.length) {

		//Make sure gridder clicked isn't already selected
		if (i==this.SelectedGridder)
			return;
		else
			this.SelectedGridder = i;

		this.DetermineMatchUp();
	}

	//Re-draw lists
	this.UpdateSelectors();
	this.MainView.UpdateMatchUp();
};
GridironSeasonInfoView.prototype.DisplaySelectors = function() {

	this.DisplaySelector(this.SelectedGridder);
	this.DisplaySelector(this.MatchUpGridder);
};
GridironSeasonInfoView.prototype.DisplaySelector = function(iPlyr) {
	var x, y;

	x = 2 + (49*Math.floor(iPlyr/OFFENSE.PLAYERS));
	if (iPlyr>=(OFFENSE.PLAYERS+DEFENSE.PLAYERS))
		x += 2;
	y = 22 + (15*(iPlyr % OFFENSE.PLAYERS));
	this.SelectionImage.Draw(x, y);
};
GridironSeasonInfoView.prototype.GetPlayer = function(iSlot) {

	if (iSlot<(OFFENSE.PLAYERS+DEFENSE.PLAYERS)) {
		if (iSlot<OFFENSE.PLAYERS)
			return (GameSim.HomeTeam.OffStarters[iSlot]);
		else
			return (GameSim.HomeTeam.DefStarters[iSlot-OFFENSE.PLAYERS]);
	} else {
		iSlot -= OFFENSE.PLAYERS + DEFENSE.PLAYERS;
		if (iSlot<OFFENSE.PLAYERS)
			return (GameSim.VisitorTeam.OffStarters[iSlot]);
		else
			return (GameSim.VisitorTeam.DefStarters[iSlot-OFFENSE.PLAYERS]);
	}
};
GridironSeasonInfoView.prototype.DetermineMatchUp = function() {

	if (this.SelectedGridder<(OFFENSE.PLAYERS+DEFENSE.PLAYERS)) {
		if (this.SelectedGridder<OFFENSE.PLAYERS)
			this.MatchUpGridder = GameSim.MatchUps[this.SelectedGridder] + ((2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS);
		else
			this.MatchUpGridder = MatchUpsView.DefMatchUps[this.SelectedGridder-OFFENSE.PLAYERS] + (OFFENSE.PLAYERS+DEFENSE.PLAYERS);
	} else {
		if (this.SelectedGridder<(2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS)
			this.MatchUpGridder = GameSim.MatchUps[this.SelectedGridder-(OFFENSE.PLAYERS+DEFENSE.PLAYERS)] + OFFENSE.PLAYERS;
		else
			this.MatchUpGridder = MatchUpsView.DefMatchUps[this.SelectedGridder-((2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS)];
	}
};
GridironSeasonInfoView.prototype.UpdateSlot = function(plyr) {
	var i;

	for (i=0;i<OFFENSE.PLAYERS;++i) {

		if (GameSim.HomeTeam.OffStarters[i]===plyr) {
			this.SelectedGridder = i;
			break;
		}
		if (GameSim.HomeTeam.DefStarters[i]===plyr) {
			this.SelectedGridder = OFFENSE.PLAYERS + i;
			break;
		}
		if (GameSim.VisitorTeam.OffStarters[i]===plyr) {
			this.SelectedGridder = (OFFENSE.PLAYERS+DEFENSE.PLAYERS) + i;
			break;
		}
		if (GameSim.VisitorTeam.DefStarters[i]===plyr) {
			this.SelectedGridder = ((2*OFFENSE.PLAYERS)+DEFENSE.PLAYERS) + i;
			break;
		}
	}

	this.DetermineMatchUp();
	this.UpdateSelectors();
};
GridironSeasonInfoView.prototype.UpdateSelectors = function() {

	Text.SetContext(this.Context);
	Text.SetColour("white");
	Graphics.SetContext(this.Context);

	Graphics.DrawRectangle(2, 22, 98, 166, this.Specs.COLOUR, 0)
	Graphics.DrawRectangle(102, 22, 98, 166, this.Specs.COLOUR, 0)
	this.DisplayPlayers();
	this.DisplaySelectors();

	Graphics.ResetContext();
	Text.ResetColour();
	Text.ResetContext();
};
