
//---------------------------------------------------------------
//---------- GRIDIRON TRADE DOWN OPTION VIEW --------------------
var GridironTradeDownOptionView = function() {
	var NextPick, Pick1, Pick2;
	var Offer;

	var i;
};
GridironTradeDownOptionView.prototype = new GenieOptionsView();
GridironTradeDownOptionView.prototype.Set = function(cnvs, specs, pView) {
	GenieOptionsView.prototype.Set.call(this, cnvs, specs, pView);

};
GridironTradeDownOptionView.prototype.SetControls = function() {

//	this.Buttons[0] = new TextButton();																//Cancel
//	this.Buttons[0].Set(this.Canvas, this.Specs.BUTTON.CANCEL, this.TextWriter);
//	this.Buttons[0].SetCornersPic(RaisedCornerImages);
//	this.Controls.push(this.Buttons[0]);
	this.Buttons[0] = this.SetTextButton(this.Specs.BUTTON.CANCEL, RaisedCornerImages, Text);				//Cancel
//	this.Buttons[1] = new TextButton();																//Ok
//	this.Buttons[1].Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
//	this.Buttons[1].SetCornersPic(RaisedCornerImages);
//	this.Controls.push(this.Buttons[1]);
	this.Buttons[1] = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, Text);					//Ok
};
GridironTradeDownOptionView.prototype.Close = function() {

	if (this.ParentView.Option==1)
		this.ParentView.Draft.TradeDown(this.NextPick, this.Pick1, this.Pick2);

	GenieOptionsView.prototype.Close.call(this);
};
GridironTradeDownOptionView.prototype.Draw = function() {
	var info;
	var offer;

	this.TextWriter.Write("Offer available:", this.Specs.L+50, this.Specs.T+25, { FONT: "14px Arial", STYLE: FONT.STYLE.BOLD+FONT.STYLE.UNDERLINED } );

	this.Offer = this.DetermineOffer();
	if (this.Offer) {
		info = TeamAbbreviations[this.ParentView.Draft.SelectionOrder[this.Pick1]] + " has offered";
		this.TextWriter.Write(info, this.Specs.L+50, this.Specs.T+50);
		info = (Math.floor((this.Pick1)/LEAGUE.TEAMS)+1) + "." + ((this.Pick1 % LEAGUE.TEAMS)+1) + " and ";
		info += (Math.floor((this.Pick2)/LEAGUE.TEAMS)+1) + "." + ((this.Pick2 % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, this.Specs.L+55, this.Specs.T+65);
		info = "for " + (Math.floor((this.NextPick)/LEAGUE.TEAMS)+1) + "." + ((this.NextPick % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, this.Specs.L+55, this.Specs.T+80);
	} else 
		this.TextWriter.Write("No offer was made.", this.Specs.L+50, this.Specs.T+50);
};
GridironTradeDownOptionView.prototype.DetermineOffer = function() {

	//Get next unused pick
	for (this.i=this.ParentView.Draft.CurrentPick;this.i<this.ParentView.Draft.SelectionOrder.length;++this.i)
		if (this.ParentView.Draft.SelectionOrder[this.i]==PlayerTeam.Index)
			break;
	if (this.i==this.ParentView.Draft.SelectionOrder.length || this.NextPick>=128)		//check if no picks left
		return (CANCEL);
	else
		this.NextPick = this.i;

	//Get pick combos
	if (this.NextPick<10)
		this.Pick1 = this.NextPick + 5;
	else
		this.Pick1 = Math.round(1.5*this.NextPick);
	this.Pick2 = this.Pick1 + 32;

	//Make sure both picks come from the same team
	while (this.ParentView.Draft.SelectionOrder[this.Pick1]!=this.ParentView.Draft.SelectionOrder[this.Pick2]) {
		++this.Pick1;
		if (this.Pick1==(6*LEAGUE.TEAMS))
			return (ERROR);
		this.Pick1 = Math.round(1.5*this.NextPick);
		this.Pick2 = this.Pick1 + 32;
	}

	if (this.Pick2>=224)
		return (CANCEL);
	else
		return (OK);
};
