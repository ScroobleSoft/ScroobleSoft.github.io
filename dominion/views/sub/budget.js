/*
 *  NOTE: using Tomcat emerald as a background colour, which could become a standard
 */
//---------------------------------------------------------
//---------- DOMINION BUDGET INFO VIEW --------------------
var DominionBudgetInfoView = function() {
	var DigitImages;
	var PushButtonEdgeImages, PlusPushButtonImage, PlusPushButtons, MinusPushButtonImage, MinusPushButtons;
	var Surplus;

	var i;
};
DominionBudgetInfoView.prototype = new GenieSubView();
DominionBudgetInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Surplus = 0;
};
DominionBudgetInfoView.prototype.SetImages = function() {

	this.DigitImages = new GenieImage();
	this.DigitImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
};
DominionBudgetInfoView.prototype.SetControls = function() {
	var i;
	var t;
	var specs;

	//Push button images
	this.PushButtonEdgeImages = new GenieImage();
	this.PushButtonEdgeImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PUShBUTTON.IMAGE);
	this.PlusPushButtonImage = new GenieImage();
	this.PlusPushButtonImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PUShBUTTON.PLUS.IMAGE);
	this.MinusPushButtonImage = new GenieImage();
	this.MinusPushButtonImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PUShBUTTON.MINUS.IMAGE);

	//Push buttons (2x8)
	this.PlusPushButtons = ArrayUtils.Create(this.Specs.PUShBUTTON.COUNT, GeniePushButton);
	this.MinusPushButtons = ArrayUtils.Create(this.Specs.PUShBUTTON.COUNT, GeniePushButton);
	for (i=0;i<this.Specs.PUShBUTTON.COUNT;++i) {
		t = this.Specs.PUShBUTTON.PLUS.T + ((this.Specs.PUShBUTTON.PLUS.H+1)*i);
		specs = { L: this.Specs.PUShBUTTON.PLUS.L, T: t, W: this.Specs.PUShBUTTON.PLUS.W, H: this.Specs.PUShBUTTON.PLUS.H, LW: this.Specs.PUShBUTTON.PLUS.LW };
		this.PlusPushButtons[i].SetEdgePics(this.PushButtonEdgeImages)
		this.PlusPushButtons[i].Set(this.Canvas, specs, this.PlusPushButtonImage);
		this.Controls.push(this.PlusPushButtons[i]);
		specs = { L: this.Specs.PUShBUTTON.MINUS.L, T: t, W: this.Specs.PUShBUTTON.MINUS.W, H: this.Specs.PUShBUTTON.MINUS.H,
					 LW: this.Specs.PUShBUTTON.MINUS.LW };
		this.MinusPushButtons[i].Set(this.Canvas, specs, this.MinusPushButtonImage);
		this.MinusPushButtons[i].SetEdgePics(this.PushButtonEdgeImages)
		this.Controls.push(this.MinusPushButtons[i]);
	}
};
DominionBudgetInfoView.prototype.Update = function() {

	for (this.i=0;this.i<MINISTRY.PORTFOLIOS;++this.i) {

		//Plus buttons
		if (this.PlusPushButtons[this.i].CheckPressed()) {
			if (this.Surplus==0)
				alert("Reduce another allocation first.");
			else {
				++this.MainView.Nation.Cabinet.SurplusPercentages[this.i];
				--this.Surplus;
				this.DrawDigitPair(this.i);
				this.DrawSurplusDigits();
			}
			return;
		}

		//Minus buttons
		if (this.MinusPushButtons[this.i].CheckPressed()) {
			if (this.MainView.Nation.Cabinet.SurplusPercentages[this.i]==0)
				return;
			--this.MainView.Nation.SurplusPercentages[this.i];
			++this.Surplus;
			this.DrawDigitPair(this.i);
			this.DrawSurplusDigits();
			return;
		}
	}
};
DominionBudgetInfoView.prototype.Draw = function() {

	this.Context.fillStyle = GREY.MEDIUM;
	this.Context.fillRect(16, 4, 85, 210);
	this.DrawPanel();
	this.DrawDigits();
	this.DisplaySurplus();
};
DominionBudgetInfoView.prototype.DrawPanel = function() {
	var i;

	this.GraphicsTool.SetContext(this.Context);
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour("white");

	//Ministry panels and allocations
	for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
		this.GraphicsTool.DrawRectangle(18, 6+(26*i), 81, 24, MinistryColours[i], 0);
		this.TextWriter.Write(Ministries[i], 23, 23+(26*i));
	}

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
	this.GraphicsTool.ResetContext();
};
DominionBudgetInfoView.prototype.DrawDigits = function() {
	var i;

	this.GraphicsTool.SetContext(this.Context);
	for (i=0;i<MINISTRY.PORTFOLIOS;++i)
		this.GraphicsTool.DrawRectangle(112, 8+(26*i), 36, 21, GREY.MEDIUM, 0);
	this.GraphicsTool.ResetContext();

	for (i=0;i<MINISTRY.PORTFOLIOS;++i)
		this.DrawDigitPair(i);
};
DominionBudgetInfoView.prototype.DrawDigitPair = function(iPnl) {
	var nPtch;

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(114, 10+(26*iPnl), 32, 17, "white", 0);
	this.GraphicsTool.ResetContext();
	nPtch = Math.floor(this.MainView.Nation.Cabinet.SurplusPercentages[iPnl]/10) % 10;
	this.DigitImages.DrawPatchNumber(nPtch, 121, 12+(26*iPnl));
	nPtch = Math.round(this.MainView.Nation.Cabinet.SurplusPercentages[iPnl]) % 10;
	this.DigitImages.DrawPatchNumber(nPtch, 131, 12+(26*iPnl));
};
DominionBudgetInfoView.prototype.DrawDigitPairs = function() {  //UNLOGGED - REDUNDANT
	var i;

	for (i=0;i<MINISTRY.PORTFOLIOS;++i)
		this.DrawDigitPair(i);
};
DominionBudgetInfoView.prototype.DisplaySurplus = function() {

	//Label
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Surplus:", 50, 230, { COLOUR: "white" } );
	this.TextWriter.ResetContext();

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(112, 215, 36, 21, GREY.MEDIUM, 0);
	this.GraphicsTool.ResetContext();
	this.DrawSurplusDigits();
};
DominionBudgetInfoView.prototype.DrawSurplusDigits = function() {
	var nPtch;

	//Background
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(114, 217, 32, 17, "white", 0);
	this.GraphicsTool.ResetContext();

	//Digits
	nPtch = Math.floor(this.Surplus/10) % 10;
	this.DigitImages.DrawPatchNumber(nPtch, 121, 219);
	nPtch = this.Surplus % 10;
	this.DigitImages.DrawPatchNumber(nPtch, 131, 219);
};
