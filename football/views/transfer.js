/*
 *		TODO: a good idea to have an ALL CheckBox, checking which will disable all the other controls
 */
//----------------------------------------------------------
//---------- FOOTBALL TRANSFER SUB VIEW --------------------
var FootballTransferSubView = function() {
	var FootballerList, Footballer, FootballerIndex;
	var GoalkeeperList, DefenderList, MidfielderList, AttackerList;
	var Fee;
	var SpinControlButtonImages, SpinControlPadImage, SpinControls;
	var AllPaginationImage, PositionPaginationImage, MobilePaginationImage;
	var AllPagination, GPagination, DPagination, MPagination, APagination, MobilePagination;
	var DesignationTouchBar, AllTouchBar, DTouchBar, MTouchBar, ATouchBar;
	var AllGroupsTouchBar, DAreaTouchBar, MAreaTouchBar, AAreaTouchBar;
	var SellButton, BuyButton;

	var i, y, num, info;
};
FootballTransferSubView.prototype = new GenieNestedView();
FootballTransferSubView.prototype.Set = function(cnvs, specs, tView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, tView);

	this.SetLists();
	this.Fee = 0;
	this.FootballerIndex = 0;
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

	if (Game.CheckMobile())
		this.SetMobileControls();
	else {
		this.SetSpinControls();
		this.SetPaginations();
		this.SetAllTouchBars();
		this.SetDTouchBars();
		this.SetMTouchBars();
		this.SetATouchBars();
	}

	//-execute transfer button
};
FootballTransferSubView.prototype.SetMobileControls = function() {

	//Pagination
	this.MobilePaginationImage = new GenieImage();
	this.MobilePaginationImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PAGINATION.MOBILE.IMAGE);
	this.MobilePagination = new GeniePagination();
//	this.Specs.PAGINATION.MOBILE = Utils.CombineSpecs(this.Specs.PAGINATION.MOBILE, this.Specs.PAGINATION.SPECS);
//	this.MobilePagination.Set(this.Canvas, this.Specs.PAGINATION.MOBILE, this.MobilePaginationImage);
	this.MobilePagination.Set(this.Canvas, this.Specs.PAGINATION.MOBILE, this.Specs.PAGINATION.MOBILE.IMAGE);
	this.Controls.push(this.MobilePagination);

	//Buttons
	this.BuyButton = new ImageButton();
	this.BuyButton.Set(this.Canvas, this.Specs.BUTTON.BUY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.BuyButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.BuyButton);
	this.SellButton = new ImageButton();
	this.SellButton.Set(this.Canvas, this.Specs.BUTTON.SELL, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.SellButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SellButton);
};
FootballTransferSubView.prototype.Open = function() {
	GenieNestedView.prototype.Open.call(this);

	//UNLOGGED

//	this.InfoView.Open();
	this.ConsoleView.Open();

	if (Game.CheckMobile()) {
		TransferPool.SortByQuality();
		this.DisplayTargets();
		return;
	} else {
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
	}

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
FootballTransferSubView.prototype.Update = function() {	//UNLOGGED

	if (Game.CheckMobile()) {

		//Mouse click
		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
			if ( Mouse.Click.X>(this.Specs.FRAME.L+this.Specs.FRAME.LW) && Mouse.Click.Y>(this.Specs.FRAME.T+this.Specs.FRAME.LW) )
				if ( Mouse.Click.X<(this.Specs.FRAME.W-this.Specs.FRAME.L) && Mouse.Click.Y<(this.Specs.FRAME.H-this.Specs.FRAME.T) ) {
					this.FootballerIndex = Math.floor((Mouse.Click.Y-(this.Specs.FRAME.L+this.Specs.FRAME.LW))/14);
					this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.COLOUR,
																																											this.Specs.FRAME.LW);
					this.DisplaySquad();
				}
		}

		//Buttons
		if (this.SellButton.CheckClicked()) {
		}
		if (this.BuyButton.CheckClicked()) {
			if (this.ParentView.Team.Squad.Players.length==SQUAD.SIZE) {
				alert("No room in the squad.");
				return;
			} else {
				this.ParentView.Team.Squad.SubtractPlayer(this.ParentView.Team.Squad.Players[this.FootballerIndex]);
				alert();  //-message show who sold and whom to
				//-add money to the kitty
				this.DisplaySquad();
			}
		}
	} else
		this.UpdateSpinControls();
};
FootballTransferSubView.prototype.Draw = function() {  //UNLOGGED

	this.DisplaySquad();
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
FootballTransferSubView.prototype.DisplaySquad = function() {
	var i;

	//Draw selection band
	this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L+this.Specs.FRAME.LW, this.Specs.FRAME.T+this.Specs.FRAME.LW+(14*this.FootballerIndex),
											  this.Specs.FRAME.W-(2*this.Specs.FRAME.LW), 13, this.Specs.SELECTION, 0);

	//Player details
	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);
	this.ParentView.Team.Squad.SortByPosition();
	for (i=0;i<this.ParentView.Team.Squad.Players.length;++i) {
		this.TextWriter.Write(Positions[this.ParentView.Team.Squad.Players[i].Position], 3, (14*i)+12, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(this.ParentView.Team.Squad.Players[i].Name.Last, 38, (14*i)+12, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(this.ParentView.Team.Squad.Players[i].Age, 113, (14*i)+12, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(Utils.NumberToGrade(this.ParentView.Team.Squad.Players[i].Quality), 133, (14*i)+12, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(Utils.FormatMoney(this.ParentView.Team.Squad.Players[i].GetPrice()), 153, (14*i)+12, { STYLE: FONT.STYLE.BOLD } );
	}
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();

	//Border
	this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.TEXT, this.Specs.FRAME.LW);
};
FootballTransferSubView.prototype.DisplayTargets = function() {

	this.UpdateTransferList();
	this.MobilePagination.SetItems(this.FootballerList);

	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);

	//Write info to page
	this.MobilePagination.DrawPage();
	this.num = this.MobilePagination.SelectedPage * this.MobilePagination.Specs.ITEM.COUNT;
	this.y = this.MobilePagination.Specs.T + this.MobilePagination.Specs.ITEM.H;
	for (this.i=0;this.i<this.MobilePagination.Specs.ITEM.COUNT;++this.i) {

		//Safety checks
		if (this.FootballerList.Length) {  //for GenieLists
			if ((this.num+this.i)==this.FootballerList.Length)
				break;
		} else if ((this.num+this.i)==this.FootballerList.length)
			break;

		//Write position and name
		this.Footballer = this.FootballerList[this.num+this.i];
		this.TextWriter.Write(Positions[this.Footballer.Position], this.MobilePagination.Specs.L+5, this.y);
		this.info = this.Footballer.Name.First[0] + this.Footballer.Name.Last[0];
		this.TextWriter.Write(this.info, this.MobilePagination.Specs.L+35, this.y);

		//Write age, quality and price
		this.TextWriter.Write(this.Footballer.Age, this.MobilePagination.Specs.L+60, this.y );
		this.TextWriter.Write(Utils.NumberToGrade(this.Footballer.Quality), this.MobilePagination.Specs.L+85, this.y);
		this.TextWriter.Write(Utils.FormatMoney(this.Footballer.GetPrice()), this.MobilePagination.Specs.L+110, this.y);

		//Draw symbols
		TypeSymbolImages.DrawPatchNumber(this.Footballer.Type-1, this.MobilePagination.Specs.L+155, this.y-10);
		DesignationSymbolImages.DrawPatchNumber(this.Footballer.Designation-1, this.MobilePagination.Specs.L+170, this.y-10);

		this.y += this.MobilePagination.Specs.ITEM.H;
	}

	this.MobilePagination.DrawStrip();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
FootballTransferSubView.prototype.UpdateTransferList = function() {
	var i;

	this.FootballerList.Reset();
	for (i=0;i<TransferPool.Players.Length;++i) {
		if (this.ConsoleView.UnitTouchBarFlag) {
			if (this.ConsoleView.UnitTouchBar.SelectedKey==0)
				this.FootballerList.Add(TransferPool.Players[i]);
			else {
				switch (this.ConsoleView.UnitTouchBar.SelectedKey-1) {
					case SQUAD.CATEGORY.G:
						if (TransferPool.Players[i].Position==POSITION.GK)
							this.FootballerList.Add(TransferPool.Players[i]);
						break;
					case SQUAD.CATEGORY.D:
						if ( TransferPool.Players[i].Position>=POSITION.RB && TransferPool.Players[i].Position>=POSITION.LWB)
							this.FootballerList.Add(TransferPool.Players[i]);
						break;
					case SQUAD.CATEGORY.M:
						if ( TransferPool.Players[i].Position>=POSITION.RM && TransferPool.Players[i].Position>=POSITION.LAM)
							this.FootballerList.Add(TransferPool.Players[i]);
						break;
					case SQUAD.CATEGORY.A:
						if ( TransferPool.Players[i].Position>=POSITION.RF && TransferPool.Players[i].Position>=POSITION.LW)
							this.FootballerList.Add(TransferPool.Players[i]);
						break;
				}
			}
		} else
			if (TransferPool.Players[i].Position==this.ConsoleView.PositionTouchBar.SelectedKey)
				this.FootballerList.Add(TransferPool.Players[i]);
		if (this.FootballerList.Length==this.Specs.PAGINATION.MOBILE.ITEM.MAX)
			return;
	}
};
