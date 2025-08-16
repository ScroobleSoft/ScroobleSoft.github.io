
//----------------------------------------------------------
//---------- DOMINION ADVISER INFO VIEW --------------------
var DominionSolicitationInfoView = function() {
	var VotesButton, DiplomacyButton, InventoryButton, AcceptButton, DeclineButton, ContinueButton, CloseButton;
	var Allied;
};
DominionSolicitationInfoView.prototype = new GenieSubView();
DominionSolicitationInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.Specs.INFO;
};
DominionSolicitationInfoView.prototype.SetControls = function() {  //UNLOGGED

	this.VotesButton = this.SetTextButton(this.Specs.BUTTON.VOTES, RaisedCornerImages, this.TextWriter);
	this.DiplomacyButton = this.SetTextButton(this.Specs.BUTTON.DIPLOMACY, RaisedCornerImages, this.TextWriter);
	this.InventoryButton = this.SetTextButton(this.Specs.BUTTON.INVENTORY, RaisedCornerImages, this.TextWriter);
	this.AcceptButton = this.SetTextButton(this.Specs.BUTTON.ACCEPT, RaisedCornerImages, this.TextWriter);
	this.DeclineButton = this.SetTextButton(this.Specs.BUTTON.DECLINE, RaisedCornerImages, this.TextWriter);
	this.ContinueButton = this.SetTextButton(this.Specs.BUTTON.CONTINUE, RaisedCornerImages, this.TextWriter);
	this.ContinueButton = this.SetTextButton(this.Specs.BUTTON.CONTINUE, RaisedCornerImages, this.TextWriter);
	this.CloseButton = this.SetTextButton(this.Specs.BUTTON.CLOSE, RaisedCornerImages, this.TextWriter);
};
DominionSolicitationInfoView.prototype.ShowControls = function() {  //UNLOGGED

	switch (this.State) {
		case this.Specs.STATE.INFO:
			this.VotesButton.Show();
			this.DiplomacyButton.Show();
			this.InventoryButton.Show();
			break;
		case this.Specs.STATE.OFFER:
			this.AcceptButton.Show();
			this.DeclineButton.Show();
			break;
		case this.Specs.STATE.ACKNOWLEDGEMENT:
			this.ContinueButton.Show();
			break;
		case this.Specs.STATE.RIVALS:
			this.CloseButton.Show();
			break;
	}
};
DominionSolicitationInfoView.prototype.SetAllied = function(allied) {  //UNLOGGED

	this.Allied = allied;
};
DominionSolicitationInfoView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.VotesButton.CheckClicked()) {
	}

	if (this.DiplomacyButton.CheckClicked()) {
	}

	if (this.InventoryButton.CheckClicked()) {
	}

	if (this.AcceptButton.CheckClicked()) {
		PlayerPower.ForgeAlliance(this.MainView.Alliance);
		this.State = this.Specs.STATE.ACKNOWLEDGEMENT;
		this.DisplayNewAlliance();
	}

	if (this.DeclineButton.CheckClicked()) {
	}

	if (this.ContinueButton.CheckClicked()) {
		this.State = this.Specs.STATE.RIVALS;
		this.DisplayRivalAlliances();
		this.ShowControls();
	}

	if (this.CloseButton.CheckClicked()) {
		//-what is displayed depends on state
	}
};
DominionSolicitationInfoView.prototype.Draw = function() {  //UNLOGGED

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("bold 14px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);

	//Basic data
	this.TextWriter.Write("Allied State:", 4, 15);
	this.TextWriter.Write(AlliedNames[this.Allied.Index], 120, 15);
	this.TextWriter.Write("Affiliaion:", 4, 30);
	this.TextWriter.Write(PowerNames[this.Allied.AssociatedIndex], 120, 30);
	this.TextWriter.Write("Preference:", 4, 45);
	this.TextWriter.Write(Commodity[PowerProfiles[3][this.Allied.AssociatedIndex]], 120, 45);

	this.TextWriter.ResetFont();

	//-leader mugshot, name and title, proposal (only grant to begin with)
	this.DisplayLeader();
	this.DisplayProposal();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
DominionSolicitationInfoView.prototype.DisplayLeader = function() {

	//Background
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(5, 50, 106, 106, this.Specs.MUGSHOT, 0);
	this.GraphicsTool.ResetContext();

	//Mug shot
	CharacterGenerator.SetProfile(this.Allied.HeadOfState.Profile);
	CharacterGenerator.SetNation(this.Allied);
	CharacterGenerator.SetMugShotContext(this.Context);
	CharacterGenerator.Draw(8, 53);
	CharacterGenerator.ResetMugShotContext();

	//Frame
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(5, 50, 106, 106, this.Specs.TEXT, 3);
	this.GraphicsTool.ResetContext();

	//Name
	if (this.Allied.HeadOfState.GetGender()==GENDER.MALE) {
		this.TextWriter.Write(HeadOfState[0][this.Allied.Government.Type], 120, 65);
		this.TextWriter.Write(this.Allied.HeadOfState.Name, 120, 82);
	} else {
		this.TextWriter.Write(HeadOfState[1][this.Allied.Government.Type], 120, 65);
		this.TextWriter.Write(this.Allied.HeadOfState.Name, 120, 82);
	}
};
DominionSolicitationInfoView.prototype.DisplayProposal = function() {  //UNLOGGED

	this.TextWriter.Write("\"We would like to propose an alliance", 5, 171);
	this.TextWriter.Write("in exchange for the following:", 5, 187);
	this.TextWriter.Write(CommodityPreference[PowerProfiles[3][this.Allied.AssociatedIndex]]+"\"", 5, 203);
};
DominionSolicitationInfoView.prototype.DisplayNewAlliance = function() {  //UNLOGGED

	//Remove previous buttons and text
	this.AcceptButton.Hide();
	this.DeclineButton.Hide();
	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, 210);

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.ResetContext();

	this.ShowControls();
};
DominionSolicitationInfoView.prototype.DisplayRivalAlliances = function() {  //UNLOGGED
	var i;
	var allnc;
	var nPwrs;
	var info;

	//Erase the map
	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, SCREEN.WIDTH, 210);

	this.TextWriter.SetContext(this.Context);

	nPwrs = 0;
	for (i=0;i<POWER.COUNT-1;++i) {
		allnc = Powers[i].CourtAlliance();
		if (allnc) {
			info = PowerNames[allnc.Power.Index] + " and " + AlliedNames[allnc.AlliedState.Index];
			info = " have formed an alliance";
			this.TextWriter.Write(info, 5, 20*(nPwrs+1));
			++nPwrs;
		}
	}

	this.TextWriter.ResetContext();
};
