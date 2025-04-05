
//--------------------------------------------------------------
//---------- FOOTBALL TRANSFER CONSOLE VIEW --------------------
var FootballTransferConsoleView = function() {
	var PositionTouchBar, UnitTouchBar, GradeTouchBar, TouchBars;		//for Mobile game
	var PriceIconPanel;												//mobile
	var ExitButton;													//mobile
	var BuyButton, SellButton;		//UNLOGGED . . . REDUNDANT?
	var PositionFlag;													//mobile

	var i, j;
};
FootballTransferConsoleView.prototype = new GenieSubView();
FootballTransferConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.PositionFlag = false;
};
FootballTransferConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {

		//Touch bars
		this.Specs.TOUChBAR.POSITION = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.POSITION);
		this.PositionTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.POSITION, this.Specs.TOUChBAR.POSITION.IMAGE, ImageManager.Pics[IMAGeINDEX.MOBILE]);
		this.Specs.TOUChBAR.UNIT = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.UNIT);
		this.UnitTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.UNIT, this.Specs.TOUChBAR.UNIT.IMAGE, ImageManager.Pics[IMAGeINDEX.MOBILE]);
		this.Specs.TOUChBAR.GRADE = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.GRADE);
		this.GradeTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.GRADE, this.Specs.TOUChBAR.GRADE.IMAGE, ImageManager.Pics[IMAGeINDEX.MOBILE]);
		this.TouchBars = [ this.PositionTouchBar, this.UnitTouchBar, this.GradeTouchBar ];

		this.PriceIconPanel = this.SetBevelledIconPanel(this.Specs.ICOnPANEL.PRICE, this.Specs.ICOnPANEL.PRICE.IMAGE, this.Specs.ICOnPANEL.PRICE.BEVEL);

		this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	} else {
		this.BuyButton = new ImageButton();
		this.BuyButton.Set(this.Canvas, this.Specs.BUTTON.BUY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.BuyButton.SetCornersPic(ShallowCornerImages);
		this.Controls.push(this.BuyButton);
		this.SellButton = new ImageButton();
		this.SellButton.Set(this.Canvas, this.Specs.BUTTON.SELL, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.SellButton.SetCornersPic(ShallowCornerImages);
		this.Controls.push(this.SellButton);
	}
};
FootballTransferConsoleView.prototype.Update = function() {

	this.UpdateTouchBars();
	if (this.PriceIconPanel.CheckIconChanged()) {
		this.MainView.UpdateTransferList();
		this.MainView.RefreshPagination();
	}
	if (this.ExitButton.CheckClicked())
		this.MainView.CloseAll();
};
FootballTransferConsoleView.prototype.UpdateTouchBars = function() {

	if (this.PositionTouchBar.CheckKeyChanged()) {
		if (!this.PositionFlag) {
			this.UnitTouchBar.ChangeKey(-1);
			this.PositionFlag = true;
		}
		this.MainView.ResetPagination();
	}
	if (this.UnitTouchBar.CheckKeyChanged()) {
		if (this.PositionFlag) {
			this.PositionTouchBar.ChangeKey(-1);
			this.PositionFlag = false;
		}
		this.MainView.ResetPagination();
	}
	if (this.GradeTouchBar.CheckKeyChanged())
		this.MainView.ResetPagination();
return;
	for (this.i=0;this.i<this.TouchBars.length;++this.i)
		if (this.TouchBars[this.i].CheckKeyChanged()) {
			if (this.i!=this.TouchBarState) {		//handle a touch bar switch
				this.TouchBarState = this.i;
				for (this.j=0;this.j<this.TouchBars.length;++this.j)
					if (this.i!=this.j)
						this.TouchBars[this.i].ChangeKey(-1);
			}
			this.MainView.ResetPagination();
		}
return;
	if (this.PositionTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUChBAR.STATE.POSITION;
		this.MainView.MobilePagination.SelectionChangeFlag = true;		//NOTE: set so that Pagination control is refreshed
		this.UnitTouchBar.ChangeKey(-1);
		this.GradeTouchBar.ChangeKey(-1);
	}
	if (this.UnitTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUChBAR.STATE.UNIT;
		this.MainView.MobilePagination.SelectionChangeFlag = true;
		this.PositionTouchBar.ChangeKey(-1);
		this.GradeTouchBar.ChangeKey(-1);
	}
	if (this.GradeTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUChBAR.STATE.GRADE;
		this.MainView.MobilePagination.SelectionChangeFlag = true;
		this.PositionTouchBar.ChangeKey(-1);
		this.UnitTouchBar.ChangeKey(-1);
	}
};
/*
FootballTransferConsoleView.prototype.UpdateKeyChange = function() {  //UNLOGGED

	switch (this.TouchBarState) {
		case this.Specs.TOUChBAR.STATE.POSITION:
			if (this.PositionTouchBar.CheckKeyChanged()) {
				this.MainView.UpdateTransferList();
				this.MainView.DisplayTargets();
			}
			break;
		case this.Specs.TOUChBAR.STATE.UNIT:
			if (this.UnitTouchBar.CheckKeyChanged())
				this.MainView.UpdateTransferList();
				this.MainView.DisplayTargets();
			break;
		case this.Specs.TOUChBAR.STATE.GRADE:
			if (this.GradeTouchBar.CheckKeyChanged())
				this.MainView.UpdateTransferList();
				this.MainView.DisplayTargets();
			break;
	}
};
*/
