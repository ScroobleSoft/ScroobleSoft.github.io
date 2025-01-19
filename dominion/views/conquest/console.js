/*
 *		could have some stats displayed (like casualties, percentages)
 */
//--------------------------------------------------------------
//---------- DOMINION CONQUEST CONSOLE VIEW --------------------
var DominionConquestConsoleView = function() {
	var AttackButton, DefendButton, SurrenderButton, WithdrawButton, InstantButton;  //2,3 UNLOGGED
	var Waves;
};
DominionConquestConsoleView.prototype = new GenieSubView();
DominionConquestConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Waves = 0;
};
DominionConquestConsoleView.prototype.SetControls = function() {  //UNLOGGED

	this.AttackButton = new TextButton();
	this.AttackButton.Set(this.Canvas, this.Specs.BUTTON.ATTACK, this.TextWriter);
	this.AttackButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.AttackButton);
/*
	this.DefendButton = new TextButton();
	this.DefendButton.Set(this.Canvas, this.Specs.BUTTON.DEFEND, this.TextWriter);
	this.DefendButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.DefendButton);

	this.SurrenderButton = new TextButton();
	this.SurrenderButton.Set(this.Canvas, this.Specs.BUTTON.SURRENDER, this.TextWriter);
	this.SurrenderButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SurrenderButton);
*/
	this.WithdrawButton = new TextButton();
	this.WithdrawButton.Set(this.Canvas, this.Specs.BUTTON.WITHDRAW, this.TextWriter);
	this.WithdrawButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.WithdrawButton);

	this.InstantButton = new TextButton();
	this.InstantButton.Set(this.Canvas, this.Specs.BUTTON.INSTANT, this.TextWriter);
	this.InstantButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.InstantButton);
};
DominionConquestConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.AttackButton.CheckClicked()) {
		this.MainView.UpdateFighters();
		this.MainView.ColourScape();
		this.MainView.Draw();
		++this.Waves;
		//-update scorecard - number of waves (of attacks), kills for both sides
	}

	if (this.InstantButton.CheckClicked()) {
	}
};
