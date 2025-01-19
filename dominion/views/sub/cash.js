/*
 *	  Page 1: Cash reserves per Power
 *	  Page 2: Investments with power touchbar
 *	  Page 3: Power credits with City-State touchbar
 */
//-------------------------------------------------------
//---------- DOMINION CASH INFO VIEW --------------------
var DominionCashInfoView = function() {
	var CashBarChart, InvestmentsBarChart, CreditBarChart;
	var PowersTouchBar, CityStatesTouchBar;
	var CashButton, InvestmentsButton, CreditButton;
	var CityStateLabelImages;
	var InvestmentsMatrix, CreditMatrix;
};
DominionCashInfoView.prototype = new GenieSubView();
DominionCashInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.Specs.STATE.CASH;
};
DominionCashInfoView.prototype.SetControls = function() {

	this.SetCharts();
	this.SetTouchBars();
	this.SetButtons();
};
DominionCashInfoView.prototype.SetImages = function() {

	this.CityStateLabelImages = new GenieImage();
	this.CityStateLabelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABELS);
};
DominionCashInfoView.prototype.SetCharts = function() {
	var i;

	this.CashBarChart = new GenieBarChart();
	this.CashBarChart.Set(this.Canvas, this.Specs.BArCHART.CASH);
	this.CashBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.CashBarChart.Specs.COLOURS = new Array(POWER.COUNT);
	for (i=0;i<POWER.COUNT;++i)
		this.CashBarChart.Specs.COLOURS[i] = PowerColours[i][0];
	this.Controls.push(this.CashBarChart);

	this.InvestmentsBarChart = new GenieBarChart();
	this.InvestmentsBarChart.Set(this.Canvas, this.Specs.BArCHART.INVESTMENTS);
	this.InvestmentsBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.Controls.push(this.InvestmentsBarChart);

	this.CreditBarChart = new GenieBarChart();
	this.CreditBarChart.Set(this.Canvas, this.Specs.BArCHART.CREDIT);
	this.CreditBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.CreditBarChart.Specs.COLOURS = new Array(POWER.COUNT);
	for (i=0;i<POWER.COUNT;++i)
		this.CreditBarChart.Specs.COLOURS[i] = PowerColours[i][0];
	this.Controls.push(this.CreditBarChart);
};
DominionCashInfoView.prototype.SetTouchBars = function() {

	this.PowersTouchBar = new GenieTouchBar();
	this.PowersTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.POWERS, this.Specs.TOUChBAR.POWERS.IMAGE);
	this.Controls.push(this.PowersTouchBar);
	this.CityStatesTouchBar = new GenieTouchBar();
	this.CityStatesTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.CITySTATES, this.Specs.TOUChBAR.CITySTATES.IMAGE);
	this.Controls.push(this.CityStatesTouchBar);
};
DominionCashInfoView.prototype.SetButtons = function() {

	this.CashButton = new TextButton();
	this.CashButton.Set(this.Canvas, this.Specs.BUTTON.CASH, this.TextWriter);
	this.CashButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CashButton);

	this.InvestmentsButton = new TextButton();
	this.InvestmentsButton.Set(this.Canvas, this.Specs.BUTTON.INVESTMENTS, this.TextWriter);
	this.InvestmentsButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.InvestmentsButton);

	this.CreditButton = new TextButton();
	this.CreditButton.Set(this.Canvas, this.Specs.BUTTON.CREDIT, this.TextWriter);
	this.CreditButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CreditButton);
};
DominionCashInfoView.prototype.SetUpCharts = function() {
	var i, j;
	var max;
	var aCsh;

	//Cash
	aCsh = new Array(POWER.COUNT);
	for (i=0;i<POWER.COUNT;++i)
		aCsh[i] = Powers[i].Cash;
	max = ArrayUtils.GetMaxValue(aCsh);
	for (i=0;i<POWER.COUNT;++i)
		this.CashBarChart.Update(i, (aCsh[i]/max)*100);

	//Investments
	this.InvestmentsMatrix = ArrayUtils.Create2D(POWER.COUNT, CITySTATE.COUNT);
	for (i=0;i<POWER.COUNT;++i)
		for (j=0;j<CITySTATE.COUNT;++j)
			this.InvestmentsMatrix[i][j] = Powers[i].Investments[j];
	this.UpdateInvestmentsChart();

	//Credit
	this.CreditMatrix = ArrayUtils.Create2D(CITySTATE.COUNT, POWER.COUNT);
	for (i=0;i<CITySTATE.COUNT;++i)
		for (j=0;j<POWER.COUNT;++j)
			this.CreditMatrix[i][j] = CityStates[i].Credit[j];
	this.UpdateCreditChart();
};
DominionCashInfoView.prototype.ShowControls = function() {

	this.CashButton.Show();
	this.InvestmentsButton.Show();
	this.CreditButton.Show();
	switch (this.State) {
		case this.Specs.STATE.CASH:
			this.CashButton.Disable();
			this.CashBarChart.Show();
			this.InvestmentsBarChart.DeActivate();
			this.CreditBarChart.DeActivate();
			this.PowersTouchBar.DeActivate();
			this.CityStatesTouchBar.DeActivate();
			break;
		case this.Specs.STATE.INVESTMENTS:
			this.InvestmentsButton.Disable();
			this.InvestmentsBarChart.Show();
			this.PowersTouchBar.Show();
			this.CashBarChart.DeActivate();
			this.CreditBarChart.DeActivate();
			this.CityStatesTouchBar.DeActivate();
			break;
		case this.Specs.STATE.CREDIT:
			this.CreditButton.Disable();
			this.CreditBarChart.Show();
			this.CityStatesTouchBar.Show();
			this.CashBarChart.DeActivate();
			this.InvestmentsBarChart.DeActivate();
			this.PowersTouchBar.DeActivate();
			break;
	}
};
DominionCashInfoView.prototype.Open = function() {

	this.SetUpCharts();

	GenieSubView.prototype.Open.call(this);
};
DominionCashInfoView.prototype.Update = function() {

	if (this.CashButton.CheckClicked()) {
		this.State = this.Specs.STATE.CASH;
		this.Draw();
		this.ShowControls();
	}

	if (this.InvestmentsButton.CheckClicked()) {
		this.State = this.Specs.STATE.INVESTMENTS;
		this.Draw();
		this.ShowControls();
	}

	if (this.CreditButton.CheckClicked()) {
		this.State = this.Specs.STATE.CREDIT;
		this.Draw();
		this.ShowControls();
	}

	if (this.PowersTouchBar.CheckKeyChanged()) {
		this.UpdateInvestmentsChart();
		this.InvestmentsBarChart.Draw();
		this.DisplayInvestmentAmounts();
	}

	if (this.CityStatesTouchBar.CheckKeyChanged()) {
		this.UpdateCreditChart();
		this.CreditBarChart.Draw();
		this.DisplayCreditAmounts();
	}
};
DominionCashInfoView.prototype.Draw = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, SCREEN.WIDTH, 220);
	switch (this.State) {
		case this.Specs.STATE.CASH:
			this.DrawPowerLabels(this.Specs.BArCHART.CASH);
			break;
		case this.Specs.STATE.INVESTMENTS:
			this.CityStateLabelImages.Draw();
			this.DisplayInvestmentAmounts();
			break;
		case this.Specs.STATE.CREDIT:
			this.DrawPowerLabels(this.Specs.BArCHART.CREDIT);
			this.DisplayCreditAmounts();
			break;
	}
};
DominionCashInfoView.prototype.DrawPowerLabels = function(cSpecs) {
	var i;
	var y;

	this.TextWriter.SetContext(this.Context);
	for (i=0;i<POWER.COUNT;++i) {
		y = cSpecs.T + ((i+1)*cSpecs.GAP) + (i*cSpecs.BAR.H);
		PowerLabelImages.DrawPatchNumber(i, 2, y+3);
		if (Powers[i].Cash<1000)
			this.TextWriter.Write(Powers[i].Cash, 212, y+15, { COLOUR: "white" } );
		else
			this.TextWriter.Write(Math.round(Powers[i].Cash/1000)+"K", 212, y+15, { COLOUR: "white" } );
	}
	this.TextWriter.ResetContext();
};
DominionCashInfoView.prototype.UpdateInvestmentsChart = function() {
	var i;
	var max;

	max = ArrayUtils.GetKeyMaxValue(this.InvestmentsMatrix, this.CityStatesTouchBar.SelectedKey);
	for (i=0;i<POWER.COUNT;++i)
		this.InvestmentsBarChart.Update(i, (this.InvestmentsMatrix[i][this.CityStatesTouchBar.SelectedKey]/max)*100);
};
DominionCashInfoView.prototype.UpdateCreditChart = function() {
	var i;
	var max;

	max = ArrayUtils.GetKeyMaxValue(this.CreditMatrix, this.PowersTouchBar.SelectedKey);
	for (i=0;i<POWER.COUNT;++i)
		this.CreditBarChart.Update(i, (this.CreditMatrix[i][this.PowersTouchBar.SelectedKey]/max)*100);
};
DominionCashInfoView.prototype.DisplayInvestmentAmounts = function() {
	var i;
	var y;
	var info;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(210, 0, 30, 170);
	this.TextWriter.SetContext(this.Context);
	for (i=0;i<CITySTATE.COUNT;++i) {
		y = this.Specs.BArCHART.INVESTMENTS.T + ((i+1)*this.Specs.BArCHART.INVESTMENTS.GAP) + (i*this.Specs.BArCHART.INVESTMENTS.BAR.H) + 6;
		if (Powers[this.CityStatesTouchBar.SelectedKey].Investments[i]<1000)
			this.TextWriter.Write(Powers[this.CityStatesTouchBar.SelectedKey].Investments[i], 217, y, { FONT: "10px Arial", COLOUR: "white" } );
		else {
			info = Math.round(Powers[this.CityStatesTouchBar.SelectedKey].Investments[i]/1000) + "K";
			this.TextWriter.Write(info, 217, y, { FONT: "10px Arial", COLOUR: "white" } );
		}
	}
	this.TextWriter.ResetContext();
};
DominionCashInfoView.prototype.DisplayCreditAmounts = function() {
	var i;
	var y;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(210, 0, 30, 150);
	this.TextWriter.SetContext(this.Context);
	for (i=0;i<POWER.COUNT;++i) {
		y = this.Specs.BArCHART.CREDIT.T + ((i+1)*this.Specs.BArCHART.CREDIT.GAP) + (i*this.Specs.BArCHART.CREDIT.BAR.H) + 14;
		if (CityStates[this.PowersTouchBar.SelectedKey].Credit[i]<1000)
			this.TextWriter.Write(CityStates[this.PowersTouchBar.SelectedKey].Credit[i], 212, y, { FONT: "12px Arial", COLOUR: "white" } );
		else
			this.TextWriter.Write(Math.round(CityStates[this.PowersTouchBar.SelectedKey].Credit[i]/1000)+"K", 212, y, { FONT: "12px Arial", COLOUR: "white" } );
	}
	this.TextWriter.ResetContext();
};
