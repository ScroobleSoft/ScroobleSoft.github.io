
//--------------------------------------------------------------
//---------- FOOTBALL TRANSFER CONSOLE VIEW --------------------
var FootballTransferConsoleView = function() {
	var PositionTouchBar, UnitTouchBar, GradeTouchBar;		//for Mobile game
	var PriceIconPanel;
	var BuyButton, SellButton;		//UNLOGGED . . . REDUNDANT?
	var TouchBarState;												//for Mobile game
};
FootballTransferConsoleView.prototype = new GenieSubView();
FootballTransferConsoleView.prototype.Set = function(cnvs, specs) {
	GenieSubView.prototype.Set.call(this, cnvs, specs);

	this.TouchBarState = this.Specs.TOUCHBAR.STATE.UNIT;
};
FootballTransferConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {

		//Touch bars
		this.PositionTouchBar = new GenieTouchBar();
		this.Specs.TOUChBAR.POSITION = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.POSITION);
		this.PositionTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.POSITION, this.Specs.TOUChBAR.POSITION.IMAGE);
		this.Controls.push(this.PositionTouchBar);
		/*
		this.UnitTouchBar = new GenieTouchBar();
		this.Specs.TOUChBAR.UNIT = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.UNIT);
		this.UnitTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.UNIT, this.Specs.TOUChBAR.UNIT.IMAGE);
		this.Controls.push(this.UnitTouchBar);
		*/
		this.Specs.TOUChBAR.UNIT = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.UNIT);
		this.UnitTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.UNIT, this.Specs.TOUChBAR.UNIT.IMAGE);
		this.Specs.TOUChBAR.GRADE = Utils.CombineSpecs(VIEW.TRANSFERS.TOUChBAR.SPECS, this.Specs.TOUChBAR.GRADE);
		this.GradeTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.GRADE, this.Specs.TOUChBAR.GRADE.IMAGE);

		this.SetBevelledIconPanel(this.Specs.ICOnPANEL.PRICE, this.Specs.ICOnPANEL.PRICE.IMAGE, this.Specs.ICOnPANEL.PRICE.BEVEL);
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
FootballTransferConsoleView.prototype.Update = function() {  //UNLOGGED

	//Check if a touch bar was switched
	if (this.PositionTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUCHBAR.STATE.POSITION;
		this.MainView.MobilePagination.SelectionChangeFlag = true;
		this.UnitTouchBar.ChangeKey(-1);
		this.GradeTouchBar.ChangeKey(-1);
	}
	if (this.UnitTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUCHBAR.STATE.UNIT;
		this.MainView.MobilePagination.SelectionChangeFlag = true;
		this.PositionTouchBar.ChangeKey(-1);
		this.GradeTouchBar.ChangeKey(-1);
	}
	if (this.GradeTouchBar.CheckClicked()) {
		this.TouchBarState = this.Specs.TOUCHBAR.STATE.GRADE;
		this.MainView.MobilePagination.SelectionChangeFlag = true;
		this.PositionTouchBar.ChangeKey(-1);
		this.UnitTouchBar.ChangeKey(-1);
	}

	//Update if a key was changed
	switch (this.TouchBarState) {
		case this.Specs.TOUCHBAR.STATE.POSITION:
			if (this.PositionTouchBar.CheckKeyChanged())
				this.MainView.DisplayTargets();
			break;
		case this.Specs.TOUCHBAR.STATE.UNIT:
			if (this.UnitTouchBar.CheckKeyChanged())
				this.MainView.DisplayTargets();
			break;
		case this.Specs.TOUCHBAR.STATE.GRADE:
			if (this.GradeTouchBar.CheckKeyChanged())
				this.MainView.DisplayTargets();
			break;
	}
};
