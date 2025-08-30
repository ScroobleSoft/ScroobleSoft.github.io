
//---------------------------------------------------
//---------- DOMINION BONDS VIEW --------------------
var DominionBondsView = function() {
	var Nation;
	var BuyButtons;		//UNLOGGED
	var AssetsButton;		//UNLOGGED
};
DominionBondsView.prototype = new GenieView();
DominionBondsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionBondsView.prototype.SetNation = function(nation) {  //UNLOGGED

	this.Nation = nation;
};
DominionBondsView.prototype.SetControls = function() {  //UNLOGGED
	var i;
	var t;
	var specs;
/*
	//Buy buttons
	this.BuyButtons = new Array(BONDS.TYPES);
	for (i=0;i<COMMODITY.TYPES;++i) {
		t = this.Specs.BUTTON.BUY.T + (i*this.Specs.BUTTON.BUY.GAP);
		if (i==COMMODITY.BONDS)
			specs = { L: this.Specs.BUTTON.BUY.L, T: t, W: this.Specs.BUTTON.BUY.W, H: this.Specs.BUTTON.BUY.H, LW: this.Specs.BUTTON.BUY.LW,
												SX: this.Specs.BUTTON.CASH.SX, SY: this.Specs.BUTTON.CASH.SY, STYLE: this.Specs.BUTTON.BUY.STYLE };
		else
			specs = { L: this.Specs.BUTTON.BUY.L, T: t, W: this.Specs.BUTTON.BUY.W, H: this.Specs.BUTTON.BUY.H, LW: this.Specs.BUTTON.BUY.LW,
												SX: this.Specs.BUTTON.BUY.SX, SY: this.Specs.BUTTON.BUY.SY, STYLE: this.Specs.BUTTON.BUY.STYLE };
		this.BuyButtons[i] = this.SetImageButton(specs, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	}
*/
//	this.AssetsButton = this.SetTextButton(this.Specs.BUTTON.ASSETS, RaisedCornerImages, this.TextWriter);	//TODO: no specs as of yet in views.js
};
DominionBondsView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//-buy buttons: disable once purchased

	if (this.AssetsView.CheckClicked())
		this.Close(this.OpenAssetsView.bind(this), 100);
};
DominionBondsView.prototype.Draw = function() {  //UNLOGGED
	var i;

	//-display treasury, and maybe fortnightly allocation

	//Headings
	this.TextWriter.Write("% Yield", 5, 40, { STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("Maturity (fortnights)", 125, 40, { STYLE: FONT.STYLE.UNDERLINED } );

	//Bond options
	for (i=0;i<BONDS.TYPES;++i) {
		this.TextWriter.Write((i+1)**2, 15, 60+(15*i));
		this.TextWriter.Write(2*(i+1), 165, 60+(15*i));
	}

	//-list of quantity of each already bought, clicking on which shows the different ones bought and the maturity date, maybe on same canvas
	//	since there can be up to 10 (selection indicator needed)
};
DominionBondsView.prototype.OpenAssetsView = function() {  //UNLOGGED

	AssetsView.Open();
};
