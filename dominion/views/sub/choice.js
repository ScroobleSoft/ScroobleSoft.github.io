
//---------------------------------------------------------
//---------- DOMINION CHOICE INFO VIEW --------------------
var DominionChoiceInfoView = function() {
	var Nation, Partner;
	var AcceptButton, DeclineButton, OtherButton, YesButton, NoButton;		//.OtherButton, .YesButton, .NoButton UNLOGGED
	var ProposeButton, InvestButton, PurchaseButton, PassButton;		//UNLOGGED
	var ProsImage, ConsImage;
	var OpenMethods, AcceptMethods;
	var Pros, Cons;																		//arrays of strings
	var ProsFlag;		//REDUNDANT
	var Situation;		//REDUNDANT?
};
DominionChoiceInfoView.prototype = new GenieSubView();
DominionChoiceInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.ProsFlag = true;
	this.Pros = new Array();
	this.Cons = new Array();
};
DominionChoiceInfoView.prototype.SetData = function() {  //UNLOGGED

	this.OpenMethods = [
 /* cmmn */  this.OpenOfferScreen.bind(this), this.OpenProposalScreen.bind(this), this.OpenInvestmentScreen.bind(this), this.OpenBondsScreen.bind(this),
				 this.OpenAidScreen.bind(this), this.OpenConquestScreen.bind(this), this.OpenPeacekeepingScreen.bind(this), this.OpenDisasterScreen.bind(this),
 /* ocsnl */ this.OpenIntrigueScreen.bind(this), this.OpenPactScreen.bind(this), this.OpenPurchaseScreen.bind(this), this.OpenTreatyScreen.bind(this),
				 this.OpenSovereignityScreen.bind(this), this.OpenAuctionScreen.bind(this), this.OpenDraftScreen.bind(this), this.OpenSatelliteScreen.bind(this),
 /* unsl */	 this.OpenBlockadeScreen.bind(this), this.OpenChampionsScreen.bind(this), this.OpenDogfightScreen.bind(this), this.OpenHuntingScreen.bind(this),
				 this.OpenICBMScreen.bind(this), this.OpenInterdictionScreen.bind(this), this.OpenSabotageScreen.bind(this), this.OpenStrikeScreen.bind(this),
 /* rare */  this.OpenOilScreen.bind(this), this.OpenCultScreen.bind(this), this.OpenInterventionScreen.bind(this), this.OpenSplinteringScreen.bind(this),
				 this.OpenSecessionScreen.bind(this), this.OpenAccessionScreen.bind(this), this.OpenDissidentScreen.bind(this), this.OpenCoupScreen.bind(this)
	];
	this.AcceptMethods = [
	 this.AcceptOfferScreen.bind(this), this.AcceptProposalScreen.bind(this), this.AcceptInvestmentScreen.bind(this), this.AcceptBondsScreen.bind(this),
	 this.AcceptAidScreen.bind(this), this.AcceptConquestScreen.bind(this), this.AcceptPeacekeepingScreen.bind(this), this.AcceptDisasterScreen.bind(this),
	 this.AcceptIntrigueScreen.bind(this), this.AcceptPactScreen.bind(this), this.AcceptPurchaseScreen.bind(this), this.AcceptTreatyScreen.bind(this),
	 this.AcceptSovereignityScreen.bind(this), this.AcceptAuctionScreen.bind(this), this.AcceptDraftScreen.bind(this), this.AcceptSatelliteScreen.bind(this),
	 this.AcceptBlockadeScreen.bind(this), this.AcceptChampionsScreen.bind(this), this.AcceptDogfightScreen.bind(this), this.AcceptHuntingScreen.bind(this),
	 this.AcceptICBMScreen.bind(this), this.AcceptInterdictionScreen.bind(this), this.AcceptSabotageScreen.bind(this), this.AcceptStrikeScreen.bind(this),
	 this.AcceptOilScreen.bind(this), this.AcceptCultScreen.bind(this), this.AcceptInterventionScreen.bind(this), this.AcceptSplinteringScreen.bind(this),
	 this.AcceptSecessionScreen.bind(this), this.AcceptAccessionScreen.bind(this), this.AcceptDissidentScreen.bind(this), this.AcceptCoupScreen.bind(this)
	];
};
DominionChoiceInfoView.prototype.SetImages = function(nation) {

	this.ProsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PROS);
	this.ConsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CONS);
};
DominionChoiceInfoView.prototype.SetControls = function() {  //UNLOGGED

	this.AcceptButton = this.SetTextButton(this.Specs.BUTTON.ACCEPT, RaisedCornerImages, this.TextWriter);
	this.DeclineButton = this.SetTextButton(this.Specs.BUTTON.DECLINE, RaisedCornerImages, this.TextWriter);
	this.OtherButton = this.SetTextButton(this.Specs.BUTTON.OTHER, RaisedCornerImages, this.TextWriter);
	this.YesButton = this.SetTextButton(this.Specs.BUTTON.YES, RaisedCornerImages, this.TextWriter);
	this.NoButton = this.SetTextButton(this.Specs.BUTTON.NO, RaisedCornerImages, this.TextWriter);

	this.ProposeButton = this.SetTextButton(this.Specs.BUTTON.PROPOSE, RaisedCornerImages, this.TextWriter);
	this.InvestButton = this.SetTextButton(this.Specs.BUTTON.INVEST, RaisedCornerImages, this.TextWriter);
	this.PurchaseButton = this.SetTextButton(this.Specs.BUTTON.PURCHASE, RaisedCornerImages, this.TextWriter);
	this.PassButton = this.SetTextButton(this.Specs.BUTTON.PASS, RaisedCornerImages, this.TextWriter);
};
DominionChoiceInfoView.prototype.ShowControls = function() {  //UNLOGGED
/*
	switch (this.Nation.Situation) {
		case SITUATION.OFFER:
			this.AcceptButton.Show();
			this.DeclineButton.Show();
			break;
		case SITUATION.PROPOSAL:
			this.ProposeButton.Show();
			this.PassButton.Show();
			break;
		case SITUATION.INVESTMENT:
			this.InvestButton.Show();
			this.PassButton.Show();
			break;
		case SITUATION.BONDS:
			this.PurchaseButton.Show();
			this.PassButton.Show();
			break;
		case SITUATION.INTRIGUE:
			//-depends on activity (another switch?)
			break;
		case SITUATION.OIL:
			break;						
		case SITUATION.BLOCKADE:
			//-lift (military response), condemn (demand immediate removal), ignore
			break;
		case SITUATION.INVASION:
			//attack, condemn (demand retreat), ignore
			break;
	}
*/
//	switch (this.Nation.Situation) {
	switch (this.MainView.Nation.Situation) {
		case SITUATION.INTRIGUE:			//TODO: this could be ditched with a default
			this.AcceptButton.Show();
			this.DeclineButton.Show();
			break;
		default:
			if (this.MainView.State==this.MainView.Specs.STATE.SUGGESTION) { 
				this.AcceptButton.Show();
				this.DeclineButton.Show();
			} else
				this.OkButtonShow();
			break;
	}
};
DominionChoiceInfoView.prototype.SetNation = function(nation) {

	this.Nation = nation;
};
DominionChoiceInfoView.prototype.Draw = function() {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);

	this.TextWriter.Write("Click the 'See offer' button to", 5, 20);
	this.TextWriter.Write("start.", 5, 35);
/*
	switch (this.Nation.Situation) {
		case SITUATION.OFFER:
			//-in turn view, draw foreign minister
			this.TextWriter.Write("An Allied has made an offer.", 5, 20);
			break;
		case SITUATION.PROPOSAL:
			//-in turn view, draw foreign minister
			this.TextWriter.Write("Propose to an Allied.", 5, 20);
			break;
		case SITUATION.INVESTMENT:
			//-in turn view, draw industry minister
			this.TextWriter.Write("Invest in City-State.", 5, 20);
			break;
		case SITUATION.BONDS:
			//-in turn view, draw industry minister
			this.TextWriter.Write("Buy a 5% bond.", 5, 20);
			break;
		case SITUATION.INTRIGUE:
			//-in turn view, draw information minister
			this.TextWriter.Write("An Allied has a pretender.", 5, 20);  //or, a Power is suspected/caught causing intrigue
			break;
		case SITUATION.MISSION:
			//-in turn view, draw energy minister
			this.TextWriter.Write("Mission for and against", 5, 20);
			break;
		case SITUATION.BLOCKADE:
			//-in turn view, draw defence minister
			this.TextWriter.Write("An Allied has been blockaded.", 5, 20);
			break;
		case SITUATION.INVASION:
			//-in turn view, draw defence minister
			this.TextWriter.Write("An Allied has been invaded.", 5, 20);
			break;
	}
*/
	this.TextWriter.ResetContext();
};
DominionChoiceInfoView.prototype.Update = function() {  //UNLOGGED
/*
	switch (this.Nation.Situation) {
		case SITUATION.OFFER:
			break;
		case SITUATION.PROPOSAL:
			break;
		case SITUATION.INVESTMENT:
			break;
		case SITUATION.BOND:
			break;
		case SITUATION.INTRIGUE:
			break;
		case SITUATION.OIL:
			break;
		case SITUATION.BLOCKADE:
			break;
		case SITUATION.INVASION:
			break;
	}
*/
	if (this.AcceptButton.CheckClicked()) {
//	setTimeout(this.AcceptMethods[this.MainView.Nation.Situation]);
		this.Nation.ForgeAlliance(this.Partner, this.MainView.Nation.Situation);
		/*
		switch (this.MainView.Nation.Situation) {
			case SITUATION.OFFER:
				break;
			case SITUATION.PROPOSAL:
				break;
			case SITUATION.INVESTMENT:
				break;
		}
		*/
	}
};
DominionChoiceInfoView.prototype.UpdateClick = function() {  //UNLOGGED

	return;  //looking REDUNDANT

	if (this.ProsImage.CheckClicked()) {
		if (!this.ProsFlag) {
			this.GraphicsTool.SetContext(this.Context);
			this.GraphicsTool.DrawRectangle(0, 135, 48, 58, this.Specs.COLOUR, 0);
			this.GraphicsTool.ResetContext();
			this.ProsImage.Draw(this.Specs.IMAGE.PROS.X, this.Specs.IMAGE.PROS.Y);
			this.ConsImage.Draw(this.Specs.IMAGE.CONS.X, this.Specs.IMAGE.CONS.Y);
			this.SelectionImage.Draw();
			this.ProsFlag = true;
		}
	}

	if (this.ConsImage.CheckClicked()) {
		if (this.ProsFlag) {
			this.GraphicsTool.SetContext(this.Context);
			this.GraphicsTool.DrawRectangle(0, 135, 48, 58, this.Specs.COLOUR, 0);
			this.GraphicsTool.ResetContext();
			this.ProsImage.Draw(this.Specs.IMAGE.CONS.X, this.Specs.IMAGE.CONS.Y);
			this.ConsImage.Draw(this.Specs.IMAGE.PROS.X, this.Specs.IMAGE.PROS.Y);
			this.ProsFlag = false;
		}
	}

	//a switch here will call methods for each relevant situation, if there are any
};
DominionChoiceInfoView.prototype.OpenChoiceScreen = function() {
	var i;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
/* */
	//TEMP
	setTimeout(this.OpenMethods[this.MainView.Nation.Situation]);
//			this.OpenIntrigueScreen();
	this.ProsImage.Draw();
	this.ConsImage.Draw();

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT.COLOUR);

	for (i=0;i<this.Pros.length;++i)
		this.TextWriter.Write(this.Pros[i], 50, this.ProsImage.Specs.Y+12+(15*i));
	for (i=0;i<this.Cons.length;++i)
		this.TextWriter.Write(this.Cons[i], 50, this.ConsImage.Specs.Y+12+(15*i));

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
	this.TextWriter.ResetContext();

	this.ShowControls();
//			this.AcceptButton.Show();
//			this.DeclineButton.Show();
			return;
	//TEMP
/* */
	switch (true) {
		case (this.MainView.Nation.Situation<SITUATION.BAND.COMMON):
			this.OpenCommonSituationScreen();
			break;
		case (this.MainView.Nation.Situation<SITUATION.BAND.OCCASIONAL):
			this.OpenOccasionalSituationScreen();
			break;
		case (this.MainView.Nation.Situation<SITUATION.BAND.UNUSUAL):
			this.OpenUnusualSituationScreen();
			break;
		case (this.MainView.Nation.Situation<SITUATION.BAND.RARE):
			this.OpenRareSituationScreen();
			break;
	}

	this.ProsImage.Draw();
	this.ConsImage.Draw();
};
DominionChoiceInfoView.prototype.OpenCommonSituationScreen = function() {

	switch (this.MainView.Nation.Situation) {
		case SITUATION.OFFER:
			this.OpenOfferScreen();
			break;
		case SITUATION.PROPOSAL:
			this.OpenProposalScreen();
			break;
		case SITUATION.INVESTMENT:
			this.OpenInvestmentScreen();
			break;
		case SITUATION.BONDS:
			this.OpenBondsScreen();
			break;
		case SITUATION.AID:
			this.OpenAidScreen();
			break;
		case SITUATION.CONQUEST:
			this.OpenConquestScreen();
			break;
		case SITUATION.PEACEKEEPING:
			this.OpenPeacekeepingScreen();
			break;
		case SITUATION.DISASTER:
			this.OpenDisasterScreen();
			break;
	}

	this.ShowControls();
};
DominionChoiceInfoView.prototype.OpenOccasionalSituationScreen = function() {

	switch (this.MainView.Nation.Situation) {
		case SITUATION.INTRIGUE:
			this.OpenIntrigueScreen();
			break;
		case SITUATION.PACT:
			this.OpenPactScreen();
			break;
		case SITUATION.PURCHASE:
			this.OpenPurchaseScreen();
			break;
		case SITUATION.TREATY:
			this.OpenTreatyScreen();
			break;
		case SITUATION.SOVEREIGNITY:
			this.OpenSovereignityScreen();
			break;
		case SITUATION.AUCTION:
			this.OpenAuctionScreen();
			break;
		case SITUATION.DRAFT:
			this.OpenDraftScreen();
			break;
		case SITUATION.SATELLITE:
			this.OpenSatelliteScreen();
			break;
	}
};
DominionChoiceInfoView.prototype.OpenUnusualSituationScreen = function() {

	switch (this.MainView.Nation.Situation) {
		case SITUATION.BLOCKADE:
			this.OpenBlockadeScreen();
			break;
		case SITUATION.CHAMPIONS:
			this.OpenChampionsScreen();
			break;
		case SITUATION.DOGFIGHT:
			this.OpenDogfightScreen();
			break;
		case SITUATION.HUNTING:
			this.OpenHuntingScreen();
			break;
		case SITUATION.ICBM:
			this.OpenICBMScreen();
			break;
		case SITUATION.INTERDICTION:
			this.OpenInterdictionScreen();
			break;
		case SITUATION.SABOTAGE:
			this.OpenSabotageScreen();
			break;
		case SITUATION.STRIKE:
			this.OpenStrikeScreen();
			break;
	}
};
DominionChoiceInfoView.prototype.OpenRareSituationScreen = function() {

	switch (this.MainView.Nation.Situation) {
		case SITUATION.OIL:
			this.OpenOilScreen();
			break;
		case SITUATION.CULT:
			this.OpenCultScreen();
			break;
		case SITUATION.INTERVENTION:
			this.OpenInterventionScreen();
			break;
		case SITUATION.SPLINTERING:
			this.OpenSplinteringScreen();
			break;
		case SITUATION.SECESSION:
			this.OpenSecessionScreen();
			break;
		case SITUATION.ACCESSION:
			this.OpenAccessionScreen();
			break;
		case SITUATION.DISSIDENT:
			this.OpenDissidentScreen();
			break;
		case SITUATION.COUP:
			this.OpenCoupScreen();
			break;
	}
};
