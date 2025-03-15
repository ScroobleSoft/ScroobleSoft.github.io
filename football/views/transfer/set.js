
FootballTransferSubView.prototype.SetSpinControls = function() {
	var i;
	var l;
	var specs;

	this.SpinControlButtonImages = new GenieImage();
	this.SpinControlPadImage = new GenieImage();
	this.SpinControls = new Array(this.Specs.SPInCONTROL.COUNT);
	this.SpinControlButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.SPInCONTROL.IMAGE.BUTTON);
	this.SpinControlPadImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.SPInCONTROL.IMAGE.PAD);
	for (i=0;i<this.Specs.SPInCONTROL.COUNT;++i) {
		this.SpinControls[i] = new GenieSpinControl();
		l = this.Specs.SPInCONTROL.L + (this.Specs.SPInCONTROL.O*i);
		specs = { L: l, T: this.Specs.SPInCONTROL.T, W: this.Specs.SPInCONTROL.W, H: this.Specs.SPInCONTROL.H };
		this.SpinControls[i].Set(this.Canvas, specs, this.SpinControlButtonImages, this.SpinControlPadImage);
		this.Controls.push(this.SpinControls[i]);
	}
};
FootballTransferSubView.prototype.SetPaginations = function() {

	//Create listboxes
	this.AllPaginationImage = new GenieImage();
	this.PositionPaginationImage = new GenieImage();
	this.AllPagination = new GeniePagination();
	this.GPagination = new GeniePagination();
	this.DPagination = new GeniePagination();
	this.MPagination = new GeniePagination();
	this.APagination = new GeniePagination();

	//Set listboxes
	this.AllPaginationImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PAGINATION.IMAGE.ALL);
	this.PositionPaginationImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PAGINATION.IMAGE.POSITION);
	this.Specs.PAGINATION.ALL = Utils.CombineSpecs(this.Specs.PAGINATION.ALL, this.Specs.PAGINATION.SPECS);
	this.Specs.PAGINATION.G = Utils.CombineSpecs(this.Specs.PAGINATION.G, this.Specs.PAGINATION.SPECS);
	this.Specs.PAGINATION.D = Utils.CombineSpecs(this.Specs.PAGINATION.D, this.Specs.PAGINATION.SPECS);
	this.Specs.PAGINATION.M = Utils.CombineSpecs(this.Specs.PAGINATION.M, this.Specs.PAGINATION.SPECS);
	this.Specs.PAGINATION.A = Utils.CombineSpecs(this.Specs.PAGINATION.A, this.Specs.PAGINATION.SPECS);
	this.AllPagination.Set(this.Canvas, this.Specs.PAGINATION.ALL, this.AllPaginationImage);
	this.GPagination.Set(this.Canvas, this.Specs.PAGINATION.G, this.PositionPaginationImage);
	this.DPagination.Set(this.Canvas, this.Specs.PAGINATION.D, this.PositionPaginationImage);
	this.MPagination.Set(this.Canvas, this.Specs.PAGINATION.M, this.PositionPaginationImage);
	this.APagination.Set(this.Canvas, this.Specs.PAGINATION.A, this.PositionPaginationImage);

	//Attach to view
	this.Controls.push(this.AllPagination);
	this.Controls.push(this.GPagination);
	this.Controls.push(this.DPagination);
	this.Controls.push(this.MPagination);
	this.Controls.push(this.APagination);
};
FootballTransferSubView.prototype.SetAllTouchBars = function() {

	//Designation
	this.DesignationTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.DESIGNATION = Utils.CombineSpecs(this.Specs.TOUChBAR.DESIGNATION, this.Specs.TOUChBAR.SPECS);
	this.DesignationTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.DESIGNATION, this.Specs.TOUChBAR.DESIGNATION.IMAGE);
	this.Controls.push(this.DesignationTouchBar);

	//All
	this.AllTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.ALL = Utils.CombineSpecs(this.Specs.TOUChBAR.ALL, this.Specs.TOUChBAR.SPECS);
	this.AllTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.ALL, this.Specs.TOUChBAR.ALL.IMAGE);
	this.Controls.push(this.AllTouchBar);

	//Group
	this.AllGroupsTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.ALlGROUP = Utils.CombineSpecs(this.Specs.TOUChBAR.ALlGROUP, this.Specs.TOUChBAR.SPECS);
	this.AllGroupsTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.ALlGROUP, this.Specs.TOUChBAR.ALlGROUP.IMAGE);
	this.Controls.push(this.AllGroupsTouchBar);
};
FootballTransferSubView.prototype.SetDTouchBars = function() {

	//Main
	this.DTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.D = Utils.CombineSpecs(this.Specs.TOUChBAR.D, this.Specs.TOUChBAR.SPECS);
	this.DTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.D, this.Specs.TOUChBAR.D.IMAGE);
	this.Controls.push(this.DTouchBar);

	//Area
	this.DAreaTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.AREaD = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaD, this.Specs.TOUChBAR.SPECS);
	this.Specs.TOUChBAR.AREaD = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaD, this.Specs.TOUChBAR.AREA);
	this.DAreaTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.AREaD, this.Specs.TOUChBAR.AREaD.IMAGE);
	this.Controls.push(this.DAreaTouchBar);
};
FootballTransferSubView.prototype.SetMTouchBars = function() {

	//Main
	this.MTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.M = Utils.CombineSpecs(this.Specs.TOUChBAR.M, this.Specs.TOUChBAR.SPECS);
	this.MTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.M, this.Specs.TOUChBAR.M.IMAGE);
	this.Controls.push(this.MTouchBar);

	//Area
	this.MAreaTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.AREaM = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaM, this.Specs.TOUChBAR.SPECS);
	this.Specs.TOUChBAR.AREaM = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaM, this.Specs.TOUChBAR.AREA);
	this.MAreaTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.AREaM, this.Specs.TOUChBAR.AREaM.IMAGE);
	this.Controls.push(this.MAreaTouchBar);
};
FootballTransferSubView.prototype.SetATouchBars = function() {

	//Main
	this.ATouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.A = Utils.CombineSpecs(this.Specs.TOUChBAR.A, this.Specs.TOUChBAR.SPECS);
	this.ATouchBar.Set(this.Canvas, this.Specs.TOUChBAR.A, this.Specs.TOUChBAR.A.IMAGE);
	this.Controls.push(this.ATouchBar);

	//Area
	this.AAreaTouchBar = new GenieTouchBar();
	this.Specs.TOUChBAR.AREaA = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaA, this.Specs.TOUChBAR.SPECS);
	this.Specs.TOUChBAR.AREaA = Utils.CombineSpecs(this.Specs.TOUChBAR.AREaA, this.Specs.TOUChBAR.AREA);
	this.AAreaTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.AREaA, this.Specs.TOUChBAR.AREaA.IMAGE);
	this.Controls.push(this.AAreaTouchBar);
};
