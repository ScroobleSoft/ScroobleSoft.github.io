
//-------------------------------------------------------------
//---------- GRIDIRON TRADE UP OPTION VIEW --------------------
var GridironTradeUpOptionView = function() {
	var RadioOptions;
	var PickCombos, NextPick, AvailablePicks;
	var Pick;

	var i, info;
};
GridironTradeUpOptionView.prototype = new GenieOptionsView();
GridironTradeUpOptionView.prototype.Set = function(cnvs, specs, pView) {
	GenieOptionsView.prototype.Set.call(this, cnvs, specs, pView);

	this.PickCombos = new Array();
	this.AvailablePicks = new Array();
};
GridironTradeUpOptionView.prototype.SetControls = function() {

	this.Buttons[0] = new TextButton();																//Cancel
	this.Buttons[0].Set(this.Canvas, this.Specs.BUTTON.CANCEL, this.TextWriter);
	this.Buttons[0].SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.Buttons[0]);
	this.Buttons[1] = new TextButton();																//Ok
	this.Buttons[1].Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.Buttons[1].SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.Buttons[1]);

	this.RadioOptions = new GenieRadioControls();
	this.RadioOptions.Set(this.Canvas, this.Specs.RADIO.PICKS, RadioOptionImage);
	this.RadioOptions.SetLinks(null, this.TextWriter);
	this.Controls.push(this.RadioOptions);
};
GridironTradeUpOptionView.prototype.ShowControls = function() {

	this.Buttons.forEach(function(btn) {btn.Show();});
};
GridironTradeUpOptionView.prototype.Close = function(iOptn) {
	var iCombo;

	if (this.PickCombos.length==0)		//safety check
		return;

	if (iOptn==1) {
		iCombo = this.RadioOptions.Selected;
		this.ParentView.Draft.TradeUp(this.PickCombos[iCombo].Target, this.PickCombos[iCombo].Pick1, this.PickCombos[iCombo].Pick2);
	}

	GenieOptionsView.prototype.Close.call(this, iOptn);
};
GridironTradeUpOptionView.prototype.Draw = function() {

	this.TextWriter.Write("Available Deals", 220, 120, { FONT: "18px Arial", STYLE: FONT.STYLE.BOLD+FONT.STYLE.UNDERLINED } );

	this.DetermineOptions();
	this.RadioOptions.Specs.OPTIONS = [];
	for (this.i=0;this.i<this.PickCombos.length;++this.i) {
		this.info = (Math.floor((this.PickCombos[this.i].Target)/LEAGUE.TEAMS)+1) + "." + ((this.PickCombos[this.i].Target % LEAGUE.TEAMS)+1);
		this.info += " for " + (Math.floor((this.PickCombos[this.i].Pick1)/LEAGUE.TEAMS)+1) + "." + ((this.PickCombos[this.i].Pick1 % LEAGUE.TEAMS)+1);
		this.info += " and " + (Math.floor((this.PickCombos[this.i].Pick2)/LEAGUE.TEAMS)+1) + "." + ((this.PickCombos[this.i].Pick2 % LEAGUE.TEAMS)+1);
		this.RadioOptions.Specs.OPTIONS.push(this.info);
	}
	this.RadioOptions.SetBoxes();
	this.RadioOptions.Show();
};
GridironTradeUpOptionView.prototype.DetermineOptions = function() {

	//Clear lists
	this.PickCombos.length = 0;
	this.AvailablePicks.length = 0;

	//Get next unused pick
	for (this.i=this.ParentView.Draft.CurrentPick;this.i<this.ParentView.Draft.SelectionOrder.length;++this.i)
		if (this.ParentView.Draft.SelectionOrder[this.i]==PlayerTeam.Index)
			break;
	if (this.i==this.ParentView.Draft.SelectionOrder.length)		//check if no picks left
		return;
	else
		this.NextPick = this.i;

	//Get list of all available picks below that
	for (this.i=(this.NextPick+1);this.i<this.ParentView.Draft.SelectionOrder.length;++this.i)
		if (this.ParentView.Draft.SelectionOrder[this.i]==PlayerTeam.Index)
			this.AvailablePicks.push(this.i);
	if (this.AvailablePicks.length==0)		//check if no picks found
		return;

	//Present all the picks that can be moved up to with 2-pick combos - note that these are round specific options being presented
	for (this.i=0;this.i<this.AvailablePicks.length;++this.i) {
		if (this.NextPick==(this.AvailablePicks[this.i]+32))			//for 'symmetrical' picks, i.e. separated by a round
			this.Pick = Math.round(this.NextPick/1.5);
		else {
			this.Pick = (this.NextPick*this.AvailablePicks[this.i]) / (this.NextPick+this.AvailablePicks[this.i]);
			this.Pick = Math.round(1+(Math.sqrt(6*this.Pick)/100));
			while (this.ParentView.Draft.SelectionOrder[this.Pick]==PlayerTeam.Index)
				++this.Pick;
		}
		if (this.Pick>=this.ParentView.Draft.CurrentPick)
			this.PickCombos.push( { Target: this.Pick, Pick1: this.NextPick, Pick2: this.AvailablePicks[this.i] } );
	}
};
