
//---------------------------------------------------------------
//---------- GRIDIRON TRADE DOWN OPTION VIEW --------------------
var GridironTradeDownOptionView = function() {
	var NextPick, Pick1, Pick2;

	var i;
};
GridironTradeDownOptionView.prototype = new GenieOptionsView();
GridironTradeDownOptionView.prototype.Set = function(cnvs, specs, pView) {
	GenieOptionsView.prototype.Set.call(this, cnvs, specs, pView);

};
GridironTradeDownOptionView.prototype.SetControls = function() {

	this.Buttons[0] = new TextButton();																//Cancel
	this.Buttons[0].Set(this.Canvas, this.Specs.BUTTON.CANCEL, this.TextWriter);
	this.Buttons[0].SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.Buttons[0]);
	this.Buttons[1] = new TextButton();																//Ok
	this.Buttons[1].Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.Buttons[1].SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.Buttons[1]);
};
GridironTradeDownOptionView.prototype.Close = function(iOptn) {

	if (iOptn==1)
		this.ParentView.Draft.TradeDown(this.NextPick, this.Pick1, this.Pick2);

	GenieOptionsView.prototype.Close.call(this, iOptn);
};
GridironTradeDownOptionView.prototype.Draw = function() {
	var info;
	var offer;

	this.TextWriter.Write("Offer available:", 250, 220, { FONT: "14px Arial", STYLE: FONT.STYLE.BOLD+FONT.STYLE.UNDERLINED } );

	offer = this.DetermineOffer();
	if (offer) {
		info = TeamAbbreviations[this.ParentView.Draft.SelectionOrder[this.Pick1]] + " has offered";
		this.TextWriter.Write(info, 250, 245);
		info = (Math.floor((this.Pick1)/LEAGUE.TEAMS)+1) + "." + ((this.Pick1 % LEAGUE.TEAMS)+1) + " and ";
		info += (Math.floor((this.Pick2)/LEAGUE.TEAMS)+1) + "." + ((this.Pick2 % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, 255, 260);
		info = "for " + (Math.floor((this.NextPick)/LEAGUE.TEAMS)+1) + "." + ((this.NextPick % LEAGUE.TEAMS)+1);
		this.TextWriter.Write(info, 255, 275);
	}
};
GridironTradeDownOptionView.prototype.DetermineOffer = function() {

	//Get next unused pick
	for (this.i=this.ParentView.Draft.CurrentPick;this.i<this.ParentView.Draft.SelectionOrder.length;++this.i)
		if (this.ParentView.Draft.SelectionOrder[this.i]==PlayerTeam.Index)
			break;
	if (this.i==this.ParentView.Draft.SelectionOrder.length || this.NextPick>=128)		//check if no picks left
		return (false);
	else
		this.NextPick = this.i;

	//Get pick combos
	this.Pick1 = Math.round(1.5*this.NextPick);
	this.Pick2 = this.Pick1 + 32;
	while (this.ParentView.Draft.SelectionOrder[this.Pick1]!=this.ParentView.Draft.SelectionOrder[this.Pick2]) {
		++this.Pick1;
		if (this.Pick1>=128)
			return;
		this.Pick1 = 1.5 * this.NextPick;
		this.Pick2 = this.Pick1 + 32;
	}

	if (this.Pick2>=224)
		return (false);
	else
		return (true);
};
