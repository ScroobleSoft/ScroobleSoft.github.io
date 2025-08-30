
//---------------------------------------------------------------
//---------- DOMINION ACTION CONSOLE VIEW -----------------------
var DominionActionConsoleView = function() {
	var InfoBevelImage, InfoIconPanel;
	var ExpansionButtonImages, ExpansionBevelImages, ExpansionButtonPanel;

	var TurnImage, TurnDigitImages;
	var AdvisorIconImage, AdvisorIcon, MapIconImage, MapIcon, OfficeIconImage, OfficeIcon;
	var TurnButton;

	var i, x, y, digit;
};
DominionActionConsoleView.prototype = new GenieSubView();
DominionActionConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionActionConsoleView.prototype.SetControls = function() {

	this.SetPanels();
	this.SetIcons();

	//Turn button
	this.TurnButton = new ImageButton();
	if (Game.CheckMobile())
		this.TurnButton.Set(this.Canvas, this.Specs.MOBILE.BUTTON.TURN, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	else
		this.TurnButton.Set(this.Canvas, this.Specs.BUTTON.TURN, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.TurnButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.TurnButton);
};
DominionActionConsoleView.prototype.SetImages = function() {

	this.TurnImage = new GenieImage();
	this.TurnImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURN);
	this.TurnDigitImages = new GenieImage();
	this.TurnDigitImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURnDIGITs);
};
DominionActionConsoleView.prototype.SetPanels = function() {

	//Info icon panel
	this.InfoBevelImage = new GenieImage();
	this.InfoBevelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.BEVEL.INFO);
	this.InfoIconPanel = new GenieIconPanel();
	if (Game.CheckMobile())
		this.InfoIconPanel.Set(this.Canvas, this.Specs.MOBILE.ICOnPANEL.INFO, this.Specs.IMAGE.INFoICONs);
	else
		this.InfoIconPanel.Set(this.Canvas, this.Specs.ICOnPANEL.INFO, this.Specs.IMAGE.INFoICONs);
	this.InfoIconPanel.SetLinks(this.GraphicsTool);
	this.InfoIconPanel.SetBevelPic(this.InfoBevelImage);
	this.Controls.push(this.InfoIconPanel);

	//Action button panel
	this.ExpansionBevelImages = new GenieImage();
	this.ExpansionBevelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.BEVEL.EXPANSION);
	this.ExpansionButtonImages = new GenieImage();
	this.ExpansionButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.EXPANSIOnBUTTONs);
	this.ExpansionButtonPanel = new GenieButtonPanel();
	if (Game.CheckMobile())
		this.ExpansionButtonPanel.Set(this.Canvas, this.Specs.MOBILE.BUTTOnPANEL.EXPANSION, this.ExpansionBevelImages);
	else
		this.ExpansionButtonPanel.Set(this.Canvas, this.Specs.BUTTOnPANEL.EXPANSION, this.ExpansionBevelImages);
	this.ExpansionButtonPanel.SetButtonPics(this.ExpansionButtonImages);
	this.Controls.push(this.ExpansionButtonPanel);
};
DominionActionConsoleView.prototype.SetIcons = function() {

	//Advisor
	this.AdvisorIconImage = new GenieImage();
	this.AdvisorIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.ADVISOR.IMAGE);
	this.AdvisorIcon = new GenieIcon();
	if (Game.CheckMobile())
		this.AdvisorIcon.Set(this.Canvas, this.Specs.MOBILE.ICON.ADVISOR, this.AdvisorIconImage);
	else
		this.AdvisorIcon.Set(this.Canvas, this.Specs.ICON.ADVISOR, this.AdvisorIconImage);
	this.AdvisorIcon.SetCornersPic(IconCornerImages);
	this.Controls.push(this.AdvisorIcon);

	//Map
	this.MapIconImage = new GenieImage();
	this.MapIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.MAP.IMAGE);
	this.MapIcon = new GenieIcon();
	if (Game.CheckMobile())
		this.MapIcon.Set(this.Canvas, this.Specs.MOBILE.ICON.MAP, this.MapIconImage);
	else
		this.MapIcon.Set(this.Canvas, this.Specs.ICON.MAP, this.MapIconImage);
	this.MapIcon.SetCornersPic(IconCornerImages);
	this.Controls.push(this.MapIcon);

	//Office
	this.OfficeIconImage = new GenieImage();
	this.OfficeIconImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.ICON.OFFICE.IMAGE);
	this.OfficeIcon = new GenieIcon();
	if (Game.CheckMobile())
		this.OfficeIcon.Set(this.Canvas, this.Specs.MOBILE.ICON.OFFICE, this.OfficeIconImage);
	else
		this.OfficeIcon.Set(this.Canvas, this.Specs.ICON.OFFICE, this.OfficeIconImage);
	this.OfficeIcon.SetCornersPic(IconCornerImages);
	this.Controls.push(this.OfficeIcon);
};
/*
DominionActionConsoleView.prototype.SetComponents = function() {

	this.SpeedLabelImage = new GenieImage();
	this.SpeedLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], SPEEdLABElIMAGE);
	this.AdvisorLabelImage = new GenieImage();
	this.AdvisorLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], ADVISOrLABElIMAGE);
	this.OfficeLabelImage = new GenieImage();
	this.OfficeLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], OFFICeLABElIMAGE);
};
*/
DominionActionConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.InfoIconPanel.CheckIconChanged())
		this.MainView.OpenInfoView(this.MainView.InfoViews[this.InfoIconPanel.DepressedIcon]);

	this.UpdateButtonPanel();
	if (this.ExpansionButtonPanel.ButtonPressed!=-1)
		return;

	if (this.OfficeIcon.CheckPressed())
		this.MainView.Close(this.MainView.OpenOfficeView.bind(this), 100);
};
DominionActionConsoleView.prototype.Draw = function() {
	GenieSubView.prototype.Draw.call(this);

	if (Game.CheckMobile()) {
		this.TurnImage.Draw(this.TurnImage.Specs.MOBILE.X, this.TurnImage.Specs.MOBILE.Y);
		for (this.i=2;this.i>=0;--this.i) {
			this.digit = Math.floor(Game.Turn/Math.pow(10,this.i)) % 10;
			this.x = this.TurnImage.Specs.MOBILE.X + 33 + (7*(2-this.i));
			this.TurnDigitImages.DrawPatchNumber(this.digit, this.x, this.TurnImage.Specs.MOBILE.Y);
		}
	} else {
		for (this.i=0;this.i<4;++this.i) {  //image
			this.y = this.TurnImage.Specs.Y + (10*this.i);
			this.TurnImage.DrawPatchNumber(this.i, this.TurnImage.Specs.X, this.y);
		}
		for (this.i=0;this.i<3;++this.i) {  //digits
			this.digit = Math.floor(Game.Turn/Math.pow(10,this.i)) % 10;
			this.y = this.TurnDigitImages.Specs.Y + (10*(2-this.i));
			this.TurnDigitImages.DrawPatchNumber(this.digit, this.TurnDigitImages.Specs.X, this.y);
		}
	}
};
DominionActionConsoleView.prototype.UpdateButtonPanel = function() {  //UNLOGGED

	if (this.ExpansionButtonPanel.CheckButtonPressed()) {

		if (!PlayerPower.CheckAnnexable(this.MainView.SelectedNation)) {
			alert("Cannot annex that nation.");
			return;
		}
		switch (this.ExpansionButtonPanel.ButtonPressed) {
			case EXPANSION.FUNDING:
				InvestmentView.SetNations(PlayerPower, this.MainView.SelectedNation);	//TODO: will change to AidView, if one is needed (could list recipients)
				break;
			case EXPANSION.BENEFICENCE:
				GrantView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.NEGOTIATION:
				TreatyView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.AGREEMENT:
				PactView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.UNDERTAKING:
				MissionView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.SUBVERSION:
				IntrigueView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.BUYING:
				PurchaseView.SetNations(PlayerPower, this.MainView.SelectedNation);
				break;
			case EXPANSION.CONQUEST:
				ConquestView.SetCombatants(PlayerPower, this.MainView.SelectedNation);
				break;
		}

		this.MainView.Close(this.MainView.OpenExpansionView.bind(this), 100);
	}
};
DominionActionConsoleView.prototype.UpdateButtons = function() {  //UNLOGGED

	//-take allied, maybe show units vs units
	//-if a Power is clicked, that can also be possible
	//-a loop then processes other Powers' actions, Allieds are inactive at the moment
	//-turn then ends
};
