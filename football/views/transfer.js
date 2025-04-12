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
FootballTransferSubView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

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
};
FootballTransferSubView.prototype.SetMobileControls = function() {

	//Pagination
	this.MobilePaginationImage = new GenieImage();
	this.MobilePaginationImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PAGINATION.MOBILE.IMAGE);
	this.MobilePagination = new GeniePagination();
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

	if (Game.CheckMobile()) {
		this.InfoView.SetFootballer(this.ParentView.Team.Squad.Players[this.FootballerIndex]);
		this.InfoView.Open();
		this.ConsoleView.Open();
		TransferPool.SortByCost();
		this.UpdateTransferList();
		this.MobilePagination.SetItems(this.FootballerList);
		this.DisplayTargets();
		this.UpdateMobile();
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

	this.Update();
};
FootballTransferSubView.prototype.UpdateMobile = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateMobile.bind(this));

	this.UpdateMouseClick();
	this.UpdateButtons();
	this.UpdatePagination();
	this.InfoView.Update();
	this.ConsoleView.Update();
};
FootballTransferSubView.prototype.Update = function() {	//UNLOGGED

	this.UpdateSpinControls();
};
FootballTransferSubView.prototype.Draw = function() {  //NOTE: expected to call only once, unless Info Dialogs are added

	this.ParentView.Team.Squad.Players.forEach(function(plyr) {plyr.SetPrice();});
	this.DisplaySquad();
	this.TextWriter.Write("Budget: "+MoneyUtils.GetCommaFormat(this.ParentView.Team.Budget), 2, 395, { COLOUR: "rgb(159,031,159)" } );
};
FootballTransferSubView.prototype.UpdateMouseClick = function() {

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		if ( Mouse.Click.X>(this.Specs.FRAME.L+this.Specs.FRAME.LW) && Mouse.Click.Y>(this.Specs.FRAME.T+this.Specs.FRAME.LW) )
			if ( Mouse.Click.X<(this.Specs.FRAME.W-this.Specs.FRAME.L) && Mouse.Click.Y<(this.Specs.FRAME.H-this.Specs.FRAME.T) ) {
				this.FootballerIndex = Math.floor((Mouse.Click.Y-(this.Specs.FRAME.L+this.Specs.FRAME.LW))/14);
				this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.COLOUR, 0);
				this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.COLOUR,
																																											this.Specs.FRAME.LW);
				this.DisplaySquad();
				this.InfoView.SetFootballer(this.ParentView.Team.Squad.Players[this.FootballerIndex]);
				this.InfoView.ColourBackground();
				this.InfoView.DisplayPlayerInfo();
			}
	}
};
FootballTransferSubView.prototype.UpdateButtons = function() {

	//Sell
	if (this.SellButton.CheckClicked()) {
		if (this.ParentView.Team.Squad.Players.length==SQUAD.MIN) {
			alert("Cannot sell any more players.");
			return;
		}
		this.Footballer = this.ParentView.Team.Squad.Players[this.FootballerIndex];
		this.ParentView.Team.Budget += this.Footballer.Price;
		this.ParentView.Team.Squad.SubtractPlayer(this.Footballer);
		TransferPool.AddPlayer(this.Footballer);
		this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.COLOUR, 0);
		this.DisplayBudget();
		this.DisplaySquad();
		this.ResetPagination();
	}

	//Buy
	if (this.BuyButton.CheckClicked()) {
		if (this.ParentView.Team.Squad.Players.length==SQUAD.SIZE) {
			alert("No room in the squad.");
			return;
		} else {
			if (this.MobilePagination.SelectedItem.Price<this.ParentView.Team.Budget) {
				alert("Not enough money.");
				return;
			}
			this.num = (this.MobilePagination.SelectedPage*this.MobilePagination.Specs.ITEM.COUNT) + this.SelectedItemIndex;
			this.Footballer = this.FootballerList.Extract(this.num);
			this.ParentView.Team.Squad.AddPlayer(this.Footballer);
			this.ParentView.Team.Budget -= this.Footballer.Price;
			this.DisplayBudget();
			this.DisplaySquad();
			this.RefreshPagination();
		}
	}
};
FootballTransferSubView.prototype.UpdatePagination = function() {

	if (this.MobilePagination.CheckPageChanged())
		this.RefreshPagination();
	if (this.MobilePagination.CheckSelectionChanged())
		this.RefreshPagination();
};
FootballTransferSubView.prototype.RefreshPagination = function() {

	this.DisplayTargets();
	if (this.MobilePagination.SelectedItem)
		this.InfoView.SetFootballer(this.MobilePagination.SelectedItem);
	else
		this.InfoView.SetFootballer(this.ParentView.Team.Squad.Players[this.FootballerIndex]);
	this.InfoView.Draw();
};
FootballTransferSubView.prototype.ResetPagination = function() {

	this.UpdateTransferList();
	this.MobilePagination.SetItems(this.FootballerList);
	this.MobilePagination.Reset();
	this.RefreshPagination();
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
FootballTransferSubView.prototype.DisplayBudget = function() {

	this.GraphicsTool.DrawRectangle(50, 380, 60, 20, this.Specs.COLOUR, 0);
	this.TextWriter.Write(MoneyUtils.GetCommaFormat(this.ParentView.Team.Budget), 55, 395, { COLOUR: "rgb(159,031,159)" } );
};
FootballTransferSubView.prototype.DisplaySquad = function() {
	var i;
	var y;

	//Draw selection band
	this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L+this.Specs.FRAME.LW, this.Specs.FRAME.T+this.Specs.FRAME.LW+(14*this.FootballerIndex),
											  this.Specs.FRAME.W-(2*this.Specs.FRAME.LW), 13, this.Specs.SELECTION, 0);

	//Player details
	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);
	this.ParentView.Team.Squad.SortByPosition();
	for (i=0;i<this.ParentView.Team.Squad.Players.length;++i) {
		y = (14*i) + this.Specs.OFFSET;
		this.TextWriter.Write(Positions[this.ParentView.Team.Squad.Players[i].Position], 3, y, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(this.ParentView.Team.Squad.Players[i].Name.Last, 38, y, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(this.ParentView.Team.Squad.Players[i].Age, 113, y, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(Utils.NumberToGrade(this.ParentView.Team.Squad.Players[i].Quality), 133, y, { STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(Utils.FormatMoney(this.ParentView.Team.Squad.Players[i].Price), 153, y, { STYLE: FONT.STYLE.BOLD } );
	}
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();

	//Frame
	this.GraphicsTool.DrawRectangle(this.Specs.FRAME.L, this.Specs.FRAME.T, this.Specs.FRAME.W, this.Specs.FRAME.H, this.Specs.TEXT, this.Specs.FRAME.LW);
};
FootballTransferSubView.prototype.DisplayTargets = function() {

	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);

	//Write info to page
	this.MobilePagination.DrawPage();
	this.num = this.MobilePagination.SelectedPage * this.MobilePagination.Specs.ITEM.COUNT;
	this.y = this.MobilePagination.Specs.T + this.MobilePagination.Specs.ITEM.H - 2;
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
		if (this.Footballer.Type)
			TypeSymbolImages.DrawPatchNumber(this.Footballer.Type-1, this.MobilePagination.Specs.L+155, this.y-11);
		if (this.Footballer.Designation)
			DesignationSymbolImages.DrawPatchNumber(this.Footballer.Designation-1, this.MobilePagination.Specs.L+170, this.y-11);

		this.y += this.MobilePagination.Specs.ITEM.H;
	}

	this.MobilePagination.DrawStrip();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
FootballTransferSubView.prototype.UpdateTransferList = function() {
	var i;

	this.FootballerList.Reset();
	for (i=0;i<TransferPool.Players.length;++i) {
		if (this.CheckGradeValid(TransferPool.Players[i])) {
			if (this.ConsoleView.PositionFlag) {
				if (TransferPool.Players[i].Position==this.ConsoleView.PositionTouchBar.SelectedKey)
						this.FootballerList.Add(TransferPool.Players[i]);
			} else
				this.AddByUnit(TransferPool.Players[i]);
		}
		if (this.FootballerList.Length==this.Specs.PAGINATION.MOBILE.ITEM.MAX)
			return;
	}
};
FootballTransferSubView.prototype.AddByUnit = function(plyr) {

	if (this.ConsoleView.UnitTouchBar.SelectedKey==0)
		this.FootballerList.Add(plyr);
	else {
		switch (this.ConsoleView.UnitTouchBar.SelectedKey-1) {
			case SQUAD.CATEGORY.G:
				if (plyr.Position==POSITION.GK)
					this.FootballerList.Add(plyr);
				break;
			case SQUAD.CATEGORY.D:
				if ( plyr.Position>=POSITION.RB && plyr.Position<=POSITION.LWB )
					this.FootballerList.Add(plyr);
				break;
			case SQUAD.CATEGORY.M:
				if ( plyr.Position>=POSITION.RM && plyr.Position<=POSITION.LAM )
					this.FootballerList.Add(plyr);
				break;
			case SQUAD.CATEGORY.A:
				if ( plyr.Position>=POSITION.RF)
					this.FootballerList.Add(plyr);
				break;
		}
	}
};
FootballTransferSubView.prototype.CheckGradeValid = function(plyr) {  //UNLOGGED

	switch (this.ConsoleView.GradeTouchBar.SelectedKey) {
		case 0:
			return (true);
		case (GRADE.BAND.A+1):
			if ( plyr.Quality>=GRADE.Aplus && plyr.Quality<=GRADE.Aminus )
				return (true);
		   break;
		case (GRADE.BAND.B+1):
			if ( plyr.Quality>=GRADE.Bplus && plyr.Quality<=GRADE.Bminus )
				return (true);
		   break;
		case (GRADE.BAND.C+1):
			if ( plyr.Quality>=GRADE.Cplus && plyr.Quality<=GRADE.Cminus )
				return (true);
		   break;
		case (GRADE.BAND.D+1):
			if ( plyr.Quality>=GRADE.Dplus && plyr.Quality<=GRADE.Dminus )
				return (true);
		   break;
		case (GRADE.BAND.E+1):
			if ( plyr.Quality>=GRADE.Eplus && plyr.Quality<=GRADE.Eminus )
				return (true);
		   break;
	}
};
FootballTransferSubView.prototype.AddByGrade = function(plyr) {  //REDUNDANT

	switch (this.ConsoleView.GradeTouchBar.SelectedKey) {
		case 0:
			this.FootballerList.Add(plyr);
			break;
		case (GRADE.BAND.A+1):
			if ( plyr.Quality>=GRADE.APlus && plyr.Quality<=GRADE.AMinus )
				this.FootballerList.Add(plyr);
		   break;
		case (GRADE.BAND.B+1):
			if ( plyr.Quality>=GRADE.BPlus && plyr.Quality<=GRADE.BMinus )
				this.FootballerList.Add(plyr);
		   break;
		case (GRADE.BAND.C+1):
			if ( plyr.Quality>=GRADE.CPlus && plyr.Quality<=GRADE.CMinus )
				this.FootballerList.Add(plyr);
		   break;
		case (GRADE.BAND.D+1):
			if ( plyr.Quality>=GRADE.DPlus && plyr.Quality<=GRADE.DMinus )
				this.FootballerList.Add(plyr);
		   break;
		case (GRADE.BAND.E+1):
			if ( plyr.Quality>=GRADE.EPlus && plyr.Quality<=GRADE.EMinus )
				this.FootballerList.Add(plyr);
		   break;
	}
};
FootballTransferSubView.prototype.CloseAll = function() {  //Mobile only

	GenieView.prototype.Close.call(this, this.OpenSquadView.bind(this), 100);
};
FootballTransferSubView.prototype.OpenSquadView = function() {  //Mobile only

	SquadView.Open();
};
FootballTransferSubView.prototype.OpenTeamView = function() {

	TeamView.Open();
	TeamView.Update();
};
