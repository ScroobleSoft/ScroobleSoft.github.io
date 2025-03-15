/*
 *		TODO: a good idea to have an ALL CheckBox, checking which will disable all the other controls
 */
//----------------------------------------------------------
//---------- FOOTBALL TRANSFER SUB VIEW --------------------
var FootballTransferSubView = function() {
	var FootballerList;
	var GoalkeeperList, DefenderList, MidfielderList, AttackerList;
	var Fee;
	var SpinControlButtonImages, SpinControlPadImage, SpinControls;
	var AllPaginationImage, PositionPaginationImage;
	var AllPagination, GPagination, DPagination, MPagination, APagination;
	var DesignationTouchBar, AllTouchBar, DTouchBar, MTouchBar, ATouchBar;
	var AllGroupsTouchBar, DAreaTouchBar, MAreaTouchBar, AAreaTouchBar;
	var SellButton, BuyButton;
};
FootballTransferSubView.prototype = new GenieNestedView();
FootballTransferSubView.prototype.Set = function(cnvs, specs, tView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, tView);

	this.SetLists();
	this.Fee = 0;
};
FootballTransferSubView.prototype.SetLists = function() {

	this.FootballerList = new GenieList();
	this.GoalkeeperList = new GenieList();
	this.DefenderList = new GenieList();
	this.MidfielderList = new GenieList();
	this.AttackerList = new GenieList();

	this.FootballerList.Set(300);
	this.GoalkeeperList.Set(40);
	this.DefenderList.Set(80);
	this.MidfielderList.Set(90);
	this.AttackerList.Set(60);
};
FootballTransferSubView.prototype.SetControls = function() {

	this.SetSpinControls();
	this.SetPaginations();
	this.SetAllTouchBars();
	this.SetDTouchBars();
	this.SetMTouchBars();
	this.SetATouchBars();

	//-execute transfer button
};
FootballTransferSubView.prototype.Open = function() {

	//UNLOGGED

	//TEMP
	var i;
	for (i=0;i<TransferPool.OverseasPlayers.length;++i) {
		TransferPool.AllList.Add(TransferPool.OverseasPlayers[i]);
		TransferPool.AllList.Add(TransferPool.DomesticPlayers[i]);
		TransferPool.AllList.Add(TransferPool.PeripheralPlayers[i]);
		TransferPool.AllList.Add(TransferPool.YouthPlayers[i]);
		TransferPool.AllList.Add(TransferPool.SemiProPlayers[i]);
		TransferPool.AllList.Add(TransferPool.ProdigyPlayers[i]);
	}
	this.AllPagination.SetItems(TransferPool.AllList);
	TransferPool.AllList.sort(function(a, b) {return (a.Quality-b.Quality);});;
	//TEMP

	GenieNestedView.prototype.Open.call(this);

	//TEMP
	var info;
	for (i=0;i<30;++i) {
		this.TextWriter.Write(Positions[TransferPool.AllList[i].Position], 415, 103+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		info = TransferPool.AllList[i].Name.First[0] + TransferPool.AllList[i].Name.Last[0];
		this.TextWriter.Write(info, 450, 103+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		this.TextWriter.Write(TransferPool.AllList[i].Age, 475, 103+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		info = Utils.NumberToGrade(TransferPool.AllList[i].Quality);
		this.TextWriter.Write(info, 500, 103+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		info = Utils.FormatMoney(TransferPool.AllList[i].GetPrice());
		this.TextWriter.Write(info, 520, 103+(15*i), { FONT: "12px Arial", COLOUR: "white" } );
		//wage+type+designation . . . maybe not wage . . . or maybe all this in Info Box
	}
	//TEMP

	this.DisplayFee();
	this.TextWriter.Write("Thousand", 501, 45, { COLOUR: "rgb(159,031,159)" } );
};
FootballTransferSubView.prototype.Update = function() {

	//UNLOGGED

	this.UpdateSpinControls();
};
FootballTransferSubView.prototype.DisplayFee = function() {
	var i;
	var digit;

	//UNLOGGED

	FeeDisplayImage.Draw();
	for (i=0;i<this.Specs.SPInCONTROL.COUNT;++i) {
		digit = Math.floor(this.Fee/(Math.pow(10,i))) % Math.pow(10,i+1);
		FeeDigitImages.DrawPatchNumber(digit, 417+(17*i), 36);
	}
};
FootballTransferSubView.prototype.UpdateSpinControls = function() {

	//UNLOGGED

	for (this.i=0;this.i<this.Specs.SPInCONTROL.COUNT;++this.i) {
		if (this.SpinControls[this.i].CheckClickedUp()) {
			this.Fee += Math.pow(10, this.i);
			if (this.Fee>Math.pow(10, this.Specs.SPInCONTROL.COUNT))
				this.Fee -= Math.pow(10, this.i);
		}
		if (this.SpinControls[this.i].CheckClickedDown()) {
			this.Fee -= Math.pow(10, this.i);
			if (this.Fee<0)
				this.Fee -= Math.pow(10, this.i);
		}
	}
};
