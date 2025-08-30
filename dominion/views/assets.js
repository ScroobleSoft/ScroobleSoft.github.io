
//----------------------------------------------------
//---------- DOMINION ASSETS VIEW --------------------
var DominionAssetsView = function() {
	var Nation;
	var SellButtons;
	var AlwaysCheckBoxes;
	var ForcesButton, InvestmentsButton, BondsButton, CloseButton;

	var i;
};
DominionAssetsView.prototype = new GenieView();
DominionAssetsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionAssetsView.prototype.SetControls = function(nation) {
	var i;
	var t;
	var specs;

	//Sell buttons
	this.SellButtons = new Array(COMMODITY.TYPES);
	for (i=0;i<COMMODITY.TYPES;++i) {
		t = this.Specs.BUTTON.SELL.T + (i*this.Specs.BUTTON.SELL.GAP);
		if (i==COMMODITY.BONDS)
			specs = { L: this.Specs.BUTTON.SELL.L, T: t, W: this.Specs.BUTTON.SELL.W, H: this.Specs.BUTTON.SELL.H, LW: this.Specs.BUTTON.SELL.LW,
												SX: this.Specs.BUTTON.CASH.SX, SY: this.Specs.BUTTON.CASH.SY, STYLE: this.Specs.BUTTON.SELL.STYLE };
		else
			specs = { L: this.Specs.BUTTON.SELL.L, T: t, W: this.Specs.BUTTON.SELL.W, H: this.Specs.BUTTON.SELL.H, LW: this.Specs.BUTTON.SELL.LW,
												SX: this.Specs.BUTTON.SELL.SX, SY: this.Specs.BUTTON.SELL.SY, STYLE: this.Specs.BUTTON.SELL.STYLE };
		this.SellButtons[i] = this.SetImageButton(specs, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}

	//Checkboxes
	this.AlwaysCheckBoxes = new Array(COMMODITY.TYPES);
	for (i=0;i<COMMODITY.TYPES;++i) {
		specs = { L: this.Specs.CHECkBOX.ALWAYS.L, T: this.Specs.CHECkBOX.ALWAYS.T+(i*this.Specs.CHECkBOX.ALWAYS.GAP), W: this.Specs.CHECkBOX.ALWAYS.W, 
																					H: this.Specs.CHECkBOX.ALWAYS.H, LABEL: "", BACKGROUND: DOMINION.COLOUR.CITySTATE };
		this.AlwaysCheckBoxes[i] = this.SetCheckBox(specs, CheckBoxImages, this.TextWriter)
	}

	//Buttons
	this.ForcesButton = this.SetTextButton(this.Specs.BUTTON.FORCES, RaisedCornerImages, this.TextWriter);
	this.InvestmentsButton = this.SetTextButton(this.Specs.BUTTON.INVESTMENTS, RaisedCornerImages, this.TextWriter);
	this.BondsButton = this.SetTextButton(this.Specs.BUTTON.BONDS, RaisedCornerImages, this.TextWriter);
	this.CloseButton = this.SetTextButton(this.Specs.BUTTON.CLOSE, RaisedCornerImages, this.TextWriter);
};
DominionAssetsView.prototype.SetNation = function(nation) {  //UNLOGGED

	this.Nation = nation;
};
DominionAssetsView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	//-disable sell buttons if corresponding checkbox is clicked

	this.Update();
};
DominionAssetsView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Sell buttons
	for (this.i=0;this.i<COMMODITY.TYPES;++this.i)
		if (this.SellButtons[this.i].CheckClicked()) {
			this.SellCommodity(this.i);
			return;
		}

	//Always check boxes
	for (this.i=0;this.i<COMMODITY.TYPES;++this.i) {
		//-
	}

	this.UpdateViewButtons();
};
DominionAssetsView.prototype.Draw = function() {  //UNLOGGED
	var i;
	var invstmnt;

	this.TextWriter.SetColour(this.Specs.TEXT.COLOUR);

	//Treasury and investments
	this.TextWriter.Write("Treasury: "+this.Nation.Treasury, 5, 20);
	this.TextWriter.Write("Invested: "+this.Nation.GetInvestedAmount(), 135, 20);
	this.TextWriter.Write("Bonds: "+this.Nation.GetBondsAmount(), 265, 20);

	//Headings
	this.TextWriter.Write("Commodities", 5, 40, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Income", 150, 40, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Investments", 285, 40, { STYLE: FONT.STYLE.UNDERLINED } );

	//Commodities inventory and income
	for (i=0;i<COMMODITY.TYPES;++i) {
		this.TextWriter.Write(Commodity[i], 5, 65+(20*i));
		this.TextWriter.Write(this.Nation.Cabinet.Ministries[i].Inventory, 100, 65+(20*i));
		this.TextWriter.Write(this.Nation.Cabinet.Ministries[i].GetIncome(), 225, 65+(20*i));
	}

	//Investments
	invstmnt = 0;
	for (i=0;i<CITySTATE.COUNT;++i)
		if (this.Nation.Investments[i].Amount) {
			this.TextWriter.Write(CityStateNames[i], 265, 65+(20*invstmnt));
			this.TextWriter.Write(this.Nation.Investments[i].Amount, 345, 65+(20*invstmnt));
			++invstmnt;
		}

	//Units and fleets
	this.TextWriter.Write("Military units:", 5, 255, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write(this.Nation.Units, 95, 255);
	this.TextWriter.Write("Fleets:", 150, 255, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write(this.Nation.Fleets.length, 200, 255);
	this.TextWriter.Write("^^", 200, 219);
	this.TextWriter.Write("(always sell)", 173, 228);

	this.TextWriter.ResetColour();
};
DominionAssetsView.prototype.UpdateViewButtons = function() {  //UNLOGGED

	if (this.ForcesButton.CheckClicked())
		this.Close(this.OpenForcesView.bind(this), 100);

	if (this.InvestmentsButton.CheckClicked())
		this.Close(this.OpenInvestmentsView.bind(this), 100);

	if (this.BondsButton.CheckClicked())
		this.Close(this.OpenBondsView.bind(this), 100);

	if (this.CloseButton.CheckClicked()) {
		if (Game.Type==DOMINION.GAME.DAILY)
			this.Close(this.OpenSolicitationView.bind(this), 100);
		else if (Game.Type==DOMINION.GAME.MULTiCHOICE)
			this.Close(this.OpenGlobalView.bind(this), 100);
	}
};
DominionAssetsView.prototype.SellCommodity = function(iCommodity) {  //UNLOGGED - selling all now, partial option needed via dialog

	this.Nation.Treasury += this.Ministries[iCommodity].Inventory;
	this.Ministries[iCommodity].Inventory = 0;
};
DominionAssetsView.prototype.OpenForcesView = function() {  //UNLOGGED

	ForcesView.SetNation(this.Nation);
	ForcesView.Open();
};
DominionAssetsView.prototype.OpenInvestmentsView = function() {  //UNLOGGED

	InvestmentView.SetNation(this.Nation);
	InvestmentView.Open();
};
DominionAssetsView.prototype.OpenBondsView = function() {  //UNLOGGED

	BondsView.SetNation(this.Nation);
	BondsView.Open();
};
DominionAssetsView.prototype.OpenGlobalView = function() {

	GlobalView.Open();
};
DominionAssetsView.prototype.OpenSolicitationView = function() {

	SolicitationView.Open();
	SolicitationView.Update();
};
