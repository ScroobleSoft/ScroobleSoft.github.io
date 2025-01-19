
//------------------------------------------------------------
//---------- DOMINION RELATIONS INFO VIEW --------------------
var DominionRelationsInfoView = function() {
	var DiplomacyPowersImage, DiplomacyHeadingsImage, BelligerenceLegendImage;
	var DiplomacySpectrum;

	var i, c, r;
};
DominionRelationsInfoView.prototype = new GenieSubView();
DominionRelationsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.SetSpectrum();
};
DominionRelationsInfoView.prototype.SetComponents = function() {

	this.DiplomacyPowersImage = new GenieImage();
	this.DiplomacyPowersImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], DIPLOMACyPOWERsIMAGE);
	this.DiplomacyHeadingsImage = new GenieImage();
	this.DiplomacyHeadingsImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], DIPLOMACyHEADINGsIMAGE);
	this.BelligerenceLegendImage = new GenieImage();
	this.BelligerenceLegendImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], BELLIGERENCeLEGENdIMAGE);
};
DominionRelationsInfoView.prototype.SetSpectrum = function() {
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
DominionRelationsInfoView.prototype.Draw = function() {

	this.Context.fillStyle = GREY.SILVER;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	this.TextWriter.Write("Diplomatic Relations", 90, 15, null, CANVAS.ZOOM);

	//Draw table
	this.GraphicsTool.SwitchContext(this.Context);
	for (this.r=0;this.r<POWER.COUNT;++this.r)
		for (this.c=0;this.c<POWER.COUNT;++this.c)  //draw coloured squares
			if (this.c==this.r)
				this.GraphicsTool.DrawRectangle(75+(18*this.r), 40+(18*this.c), 18, 18, "black", 0);
			else
				this.GraphicsTool.DrawRectangle(75+(18*this.r), 40+(18*this.c), 18, 18, this.DiplomacySpectrum[DiplomacyTable.Matrix[this.c][this.r]], 0);
	this.GraphicsTool.DrawGrid(75, 40, { W: 162, H: 162, R: 9, C: 9, LW: { FRAME: 1, PARTITION: 1 } } );  //overlay with grid
	this.GraphicsTool.RestoreContext();

	//Labels and images
	this.DiplomacyPowersImage.Draw(5, 42);
	this.DiplomacyHeadingsImage.Draw(77, 20);
	this.BelligerenceLegendImage.Draw(8, 205);
};
