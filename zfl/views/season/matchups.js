
//-------------------------------------------------------
//---------- GRIDIRON MATCH-UPS VIEW --------------------
var GridironMatchUpsView = function() {
	var TeamImage, PlayerImage, RatingImage, DifferentialImage;
	var SelectionImage, DeSelectionImage;
	var MatchUps;			//list
	var HomeAdvantages, VisitorAdvantages;
	var DefMatchUps;		//integer array
	var SelectedMatchUp;
};
GridironMatchUpsView.prototype = new GenieView();
GridironMatchUpsView.prototype.Set = function(cnvs, specs, pView) {
	GenieView.prototype.Set.call(this, cnvs, specs, pView);

	this.SelectedMatchUp = 0;
	this.SetLists();		//TODO: should be a standard GenieView method
};
GridironMatchUpsView.prototype.SetData = function() {

	this.DefMatchUps = [ 6,10,9,7,1,8,2,0,5,3,4 ];		//DE1-OL1, DE2-OL5, DT1-OL4, DT2-OL2, LB1-HB, LB2-OL3, LB3-FB, S1-QB, S2-TE, CB1-WR1, CB2-WR2
};
GridironMatchUpsView.prototype.SetLists = function() {

	this.MatchUps = ArrayUtils.Create(2*(OFFENSE.PLAYERS+DEFENSE.PLAYERS), function() { var Player,Differential,L,T,W,H; } );
	this.MatchUps.forEach( function(slot) {slot.W=189;slot.H=15;} );
};
GridironMatchUpsView.prototype.SetImages = function() {

	//Headings
	this.TeamImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TEAM);
	this.PlayerImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PLAYER);
	this.RatingImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.RATING);
	this.DifferentialImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIFFERENTIAL);

	//Selection
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
	this.DeSelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DeSELECTION);
};
GridironMatchUpsView.prototype.Open = function() {

	this.SetMatchUps();

	GenieView.prototype.Open.call(this);
};
GridironMatchUpsView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}

	this.InfoView.Update();
	this.ConsoleView.Update();
};
GridironMatchUpsView.prototype.Draw = function() {

	this.DisplayHeadings();

	Text.SetColour("blue");

	this.DisplayPlayers();

	//Legend
	Text.Write("* Free Agent", 7, 393);
	Text.Write("** Retired", 107, 393);

	Text.ResetColour();

	Graphics.DrawRectangle(200, 28, 2, 350, "blue", 1);

	//Selection
	this.DisplaySelection(true);
};
GridironMatchUpsView.prototype.DisplayHeadings = function() {

	//Left
	this.TeamImage.Draw(5, 4);
	this.PlayerImage.Draw(62, 4);
	this.RatingImage.Draw(125, 4);
	this.DifferentialImage.Draw(173, 4);

	//Right
	this.TeamImage.Draw(205, 4);
	this.PlayerImage.Draw(262, 4);
	this.RatingImage.Draw(325, 4);
	this.DifferentialImage.Draw(373, 4);
};
GridironMatchUpsView.prototype.DisplayPlayers = function() {
	var i;
	var x, y;
	var name;

	//2 columns of sorted match-up lists (POS-NAME-RATING-DIFFERENTIAL)
	for (i=0;i<(2*(OFFENSE.PLAYERS+DEFENSE.PLAYERS));++i) {
		x = 5 + (200*Math.floor(i/(OFFENSE.PLAYERS+DEFENSE.PLAYERS)));
		y = 40 + (16*(i % (OFFENSE.PLAYERS+DEFENSE.PLAYERS)));
		this.MatchUps[i].L = x;
		this.MatchUps[i].T = y - 12;
		AbbreviationImages.DrawPatchNumber(this.MatchUps[i].Player.Team.Index, x, y-12);
		Text.Write(Positions[this.MatchUps[i].Player.Position], x+37, y);
		name = this.MatchUps[i].Player.Name.First[0] + " ";
		name += GridironUtils.TruncateName(this.MatchUps[i].Player, 67, this.Context);
		Text.Write(name, x+63, y);
		Text.Write(Utils.NumberToGrade(this.MatchUps[i].Player.Quality), x+148, y);
		Text.Write(-this.MatchUps[i].Differential, x+172, y);
	}
};
GridironMatchUpsView.prototype.SetMatchUps = function() {
	var i;
	var iPlyr;

	iPlyr = 0;
	for (i=0;i<this.MatchUps.length;i+=4) {
		this.MatchUps[i].Player = GameSim.HomeTeam.OffStarters[iPlyr];
		this.MatchUps[i].Differential = GameSim.HomeTeam.OffStarters[iPlyr].Quality - GameSim.VisitorTeam.DefStarters[GameSim.MatchUps[iPlyr]].Quality;
		this.MatchUps[i+1].Player = GameSim.HomeTeam.DefStarters[iPlyr];
		this.MatchUps[i+1].Differential = GameSim.HomeTeam.DefStarters[iPlyr].Quality - GameSim.VisitorTeam.OffStarters[this.DefMatchUps[iPlyr]].Quality;
		this.MatchUps[i+2].Player = GameSim.VisitorTeam.OffStarters[iPlyr];
		this.MatchUps[i+2].Differential = GameSim.VisitorTeam.OffStarters[iPlyr].Quality - GameSim.HomeTeam.DefStarters[GameSim.MatchUps[iPlyr]].Quality;
		this.MatchUps[i+3].Player = GameSim.VisitorTeam.DefStarters[iPlyr];
		this.MatchUps[i+3].Differential = GameSim.VisitorTeam.DefStarters[iPlyr].Quality - GameSim.HomeTeam.OffStarters[this.DefMatchUps[iPlyr]].Quality;
		++iPlyr;
	}

	this.DetermineAdvantages();

	this.MatchUps.sort(function(a, b) {return (a.Differential-b.Differential);});
};
GridironMatchUpsView.prototype.DetermineAdvantages = function() {
	var i;

	this.HomeAdvantages = 0;
	this.VisitorAdvantages = 0;
	for (i=0;i<(OFFENSE.PLAYERS+DEFENSE.PLAYERS);++i)
		if (this.MatchUps[i].Differential<0)
			++this.HomeAdvantages;
		else if (this.MatchUps[i].Differential>0)
			++this.VisitorAdvantages;
};
GridironMatchUpsView.prototype.DisplaySelection = function(bSlctn) {
	var x, y;

	x = 3 + (200*Math.floor(this.SelectedMatchUp/(OFFENSE.PLAYERS+DEFENSE.PLAYERS)));
	y = 27 + (16*(this.SelectedMatchUp % (OFFENSE.PLAYERS+DEFENSE.PLAYERS)))
	if (bSlctn)
		this.SelectionImage.Draw(x, y);
	else
		this.DeSelectionImage.Draw(x, y);
};
GridironMatchUpsView.prototype.UpdateClick = function() {
	var i;

	for (i=0;i<this.MatchUps.length;++i)
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.MatchUps[i]))
			break;

	if (i!=this.MatchUps.length) {
		this.DisplaySelection(false);
		this.SelectedMatchUp = i;
		this.DisplaySelection(true);
		this.InfoView.UpdateSlot(this.MatchUps[i].Player);
	}
};
GridironMatchUpsView.prototype.UpdateMatchUp = function() {
	var i;
	var plyr;

	this.DisplaySelection(false);
	plyr = this.InfoView.GetPlayer(this.InfoView.SelectedGridder);
	for (i=0;i<this.MatchUps.length;++i)
		if (this.MatchUps[i].Player===plyr)
			break;
	this.SelectedMatchUp = i;
	this.DisplaySelection(true);
};
GridironMatchUpsView.prototype.OpenSeasonView = function() {

	this.Close(this.LaunchSeasonView.bind(this), 100);
};
GridironMatchUpsView.prototype.LaunchSeasonView = function() {

	SeasonView.SetInfoView(SeasonInfoView);
	SeasonView.Open();
	SeasonView.Update();
};
