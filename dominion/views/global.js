/*
 *  TODO: this has replaced BoardView, but now AllianceButton and TurnButton are not being used
 *			 also, BoardView::PerformVoteAction could be cannibalized, particularly display of Air Theatre
 */
//----------------------------------------------------
//---------- DOMINION GLOBAL VIEW --------------------
var DominionGlobalView = function() {
	var DiplomacySpectrum;
	var MapOptionImages, MapOptionControls;
	var Nation;
	var Alliance;
	var InfoViews;
	var SelectedNation;

	var i, c, r;
};
DominionGlobalView.prototype = new GenieView();
DominionGlobalView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetInfoSubView();
   this.SetSpectrum();
	this.SelectedNation = Tomcat;
	WorldMap.SelectNation(PlayerPower);
};
DominionGlobalView.prototype.SetSpectrum = function() {
	var i;
	var cSpctrm, hSpctrm;	//c- cool, h- hot

	//Generate colours
	cSpctrm = new GenieSpectrum();
	cSpctrm.Set("rgb(000,223,000)", "rgb(255,255,000)", 4);
	hSpctrm = new GenieSpectrum();
	hSpctrm.Set("rgb(255,255,000)", "rgb(223,000,000)", 5);

	//Assign selected colours
	this.DiplomacySpectrum = new Array(POWER.COUNT);
	for (i=0;i<BELLIGERENCE.TYPES/2;++i) {
		this.DiplomacySpectrum[i] = cSpctrm.Colours[i];
		this.DiplomacySpectrum[(BELLIGERENCE.TYPES/2)+i] = hSpctrm.Colours[i+1];
	}
};
DominionGlobalView.prototype.SetControls = function() {

	//REDUNDANT
	this.MapOptionImages = new GenieImage();
	this.MapOptionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.MApCONTROlIMAGEs);
	this.MapOptionControls = new DominionMapControls();
	this.MapOptionControls.Set(this.Canvas, this.Specs.MApOPTIOnCONTROLs, this.MapOptionImages);
	this.Controls.push(this.MapOptionControls);
};
DominionGlobalView.prototype.SetInfoSubView = function() {

	this.InfoViews = new Array(this.Specs.INFO.TYPES);
	this.InfoViews[0] = GazetteerInfoView;
	this.InfoViews[1] = VotesInfoView;
	this.InfoViews[2] = BudgetInfoView;
	this.InfoViews[3] = ReservesInfoView;
	this.InfoViews[4] = DiplomacyInfoView;
	this.InfoViews[5] = CashInfoView;
	this.InfoViews[6] = ArmsInfoView;
	this.InfoViews[7] = EventsInfoView;
};
DominionGlobalView.prototype.SetNation = function(ntn) {

	this.Nation = ntn;
};
DominionGlobalView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	//UNLOGGED

//	this.InfoView.Draw();
//	TurnButton.Specs.LABEL = TurnButton.Specs.LABEL.replace("0", "1");		//TODO: label should show correct turn number, not just '1'
//	TurnButton.Show();
//	if (Game.CheckMobile())
//		this.UpdateMobile();
//	else
		this.Update();
};
DominionGlobalView.prototype.Update = function() {

	//UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//-one click gives nation info, maybe even switching icons to that view

	//-update frames
	//-tooltips/right-click for pop-up info dialogs?

	if (Mouse.CheckLeftDoubleClicked(CANVAS.PRIME)) {  //TEST
		var tmp = 0;
	}

	if (this.MapOptionControls.CheckClicked()) {
		//-draw relevant map
		this.MapOptionControls.Draw();
	}
//	this.UpdateMouseMove();
	this.UpdateMouseClick();

	GenieView.prototype.Update.call(this);
};
DominionGlobalView.prototype.UpdateMobile = function() {  //maybe REDUNDANT

	//UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateMobile.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		//-if info view is open, show that
	}
};
DominionGlobalView.prototype.Draw = function() {  //UNLOGGED

	WorldMap.Draw();
};
DominionGlobalView.prototype.UpdateMouseClick = function() {  //UNLOGGED

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {

		for (this.i=0;this.i<POWER.COUNT;++this.i)
			if (SpaceUtils.CheckPointInCircle(Mouse, Powers[this.i].Location, MAP.SIZE.POWER/2)) {
//				if (this.InfoView.Id==this.Specs.INFO.GAZETTEER || this.InfoView.Id==this.Specs.INFO.RESERVES		TODO: what's going on here?
//																				|| this.InfoView.Id==this.Specs.INFO.BUDGET || this.InfoView.Id==this.Specs.INFO.RATING)
			   this.SelectedNation = Powers[this.i];
				WorldMap.SelectNation(this.SelectedNation);
				WorldMap.Draw();
				this.InfoView.SetNation(this.SelectedNation);
				this.InfoView.DisplayNationInfo();
				return;
			}

		for (this.i=0;this.i<ALLIED.COUNT;++this.i)
			if (SpaceUtils.CheckPointInCircle(Mouse, AlliedStates[this.i].Location, MAP.SIZE.ALLIED/2)) {
				this.SelectedNation = AlliedStates[this.i]
				WorldMap.SelectNation(this.SelectedNation);
				WorldMap.Draw();
				this.InfoView.SetNation(this.SelectedNation);
				this.InfoView.DisplayNationInfo();
				return;
			}

		this.r = MAP.SIZE.CITySTATE / 2;
		if (Game.CheckMobile())
			this.r += 5;
		for (this.i=0;this.i<CITySTATE.COUNT;++this.i) {
			if (SpaceUtils.CheckPointInCircle(Mouse, CityStates[this.i].Location, this.r)) {
				this.SelectedNation = CityStates[this.i];
				WorldMap.SelectNation(this.SelectedNation);
				WorldMap.Draw();
				this.InfoView.SetNation(this.SelectedNation);
				this.InfoView.DisplayNationInfo();
				return;
			}
		}
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.Update();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}
};
/*
DominionGlobalView.prototype.UpdateMouseClick = function() {

	//UNLOGGED

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {

//		this.State = VIEW.MAP.STATE.SELECTED;
//		AddVoteButton.Show();

//		AllianceButton.Show();
		for (this.i=0;this.i<ALLIED.COUNT;++this.i)
			if (AlliedStates[this.i].CheckClicked()) {
				if (AlliedStates[this.i].Alliance)
					return;
				else {
					if (this.ConsoleView.AdvisorIcon.CheckPressed()) {
						this.Alliance = new DominionGrantAlliance();
						this.Alliance.Set();
						this.Alliance.Forge(PlayerPower, AlliedStates[this.i]);
						for (this.j=0;this.j<POWER.COUNT;++this.j) {
							if (this.j==POWER.TOMCAT)
								continue;
							Powers[this.j].Update();
						}
						WorldMap.Draw();
					} else {
						this.Close();
						AllianceView.Open();
						AllianceView.Update();
					}
				}
			}
	} else
		Mouse.ClearClicks();
};
*/
DominionGlobalView.prototype.OpenAllianceView = function() {

	//UNLOGGED - actually, REDUNDANT

	this.Close();
};
DominionGlobalView.prototype.OpenPurchaseView = function() {  //UNLOGGED

	PurchaseView.Open();
};
DominionGlobalView.prototype.OpenGrantView = function() {  //UNLOGGED

	GrantView.Open();
};
DominionGlobalView.prototype.OpenInvestmentView = function() {  //UNLOGGED

	InvestmentView.Open();
};
DominionGlobalView.prototype.OpenPactView = function() {  //UNLOGGED

	PactView.Open();
};
DominionGlobalView.prototype.OpenTreatyView = function() {  //UNLOGGED

	TreatyView.Open();
};
DominionGlobalView.prototype.OpenIntrigueView = function() {  //UNLOGGED

	IntrigueView.Open();
};
DominionGlobalView.prototype.OpenExpansionView = function() {  //UNLOGGED

	switch (this.ExpansionButtonPanel.ButtonPressed) {
		case EXPANSION.PURCHASE:
				alert("Purchase option not available.");
			break;
		case EXPANSION.BENEFICENCE:
				alert("Grant option not available.");
			break;
		case EXPANSION.INVESTING:
				alert("Investment option not available.");
			break;
		case EXPANSION.PACT:
				alert("Pact option not available.");
			break;
		case EXPANSION.SUBVERSION:
				alert("Intrigue option not available.");
			break;
		case EXPANSION.TREATY:
				alert("Treaty option not available.");
			break;
		case EXPANSION.MISSION:
			MissionView.Open();
			break;
		case EXPANSION.CONQUEST:
			ConquestView.Open();
			break;
	}
};
DominionGlobalView.prototype.OpenOfficeView = function() {

	OfficeView.SetNation(PlayerPower);
	OfficeView.Open();
	OfficeView.Update();
};
