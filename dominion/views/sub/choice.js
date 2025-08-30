
//---------------------------------------------------------
//---------- DOMINION CHOICE INFO VIEW --------------------
var DominionChoiceInfoView = function() {
	var Nation;
	var AcceptButton, DeclineButton, OtherButton, YesButton, NoButton;		//UNLOGGED
	var ProposeButton, InvestButton, PurchaseButton, PassButton;		//UNLOGGED
	var Situation;
};
DominionChoiceInfoView.prototype = new GenieSubView();
DominionChoiceInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionChoiceInfoView.prototype.SetNation = function(nation) {  //UNLOGGED

	this.Nation = nation;
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
		case SITUATION.BOND:
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
};
DominionChoiceInfoView.prototype.Draw = function() {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);

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
		case SITUATION.BOND:
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

	this.TextWriter.ResetContext();
};
DominionChoiceInfoView.prototype.Update = function() {  //UNLOGGED

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
};
