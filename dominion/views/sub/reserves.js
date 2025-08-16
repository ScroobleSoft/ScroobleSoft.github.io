/*
 *		Page 1: reserves per commodity
 *		Page 2: bar chart labelled with powers plus a touch bar for different commodities
 */
//-----------------------------------------------------------
//---------- DOMINION RESERVES INFO VIEW --------------------
var DominionReservesInfoView = function() {
	var CommoditiesBarChart, InventoryBarChart;
	var CommoditiesTouchBar;
	var InventoryButton, CommoditiesButton;
	var CommodityMatrix;
};
DominionReservesInfoView.prototype = new GenieSubView();
DominionReservesInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.Specs.STATE.INVENTORY;
};
DominionReservesInfoView.prototype.SetControls = function() {

	this.SetCharts();
	this.SetButtons();
	this.CommoditiesTouchBar = new GenieTouchBar();
	this.CommoditiesTouchBar.Set(this.Canvas, this.Specs.TOUChBAR.COMMODITIES, this.Specs.TOUChBAR.COMMODITIES.IMAGE);
	this.Controls.push(this.CommoditiesTouchBar);
};
DominionReservesInfoView.prototype.SetCharts = function() {
	var i;

	this.InventoryBarChart = new GenieBarChart();
	this.InventoryBarChart.Set(this.Canvas, this.Specs.BArCHART.INVENTORY);
	this.InventoryBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.InventoryBarChart.Specs.COLOURS = new Array(COMMODITY.TYPES);
	for (i=0;i<COMMODITY.TYPES;++i)
		this.InventoryBarChart.Specs.COLOURS[i] = MinistryColours[i];
	this.Controls.push(this.InventoryBarChart);

	this.CommoditiesBarChart = new GenieBarChart();
	this.CommoditiesBarChart.Set(this.Canvas, this.Specs.BArCHART.COMMODITIES);
	this.CommoditiesBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.CommoditiesBarChart.Specs.COLOURS = new Array(POWER.COUNT);
	for (i=0;i<POWER.COUNT;++i)
		this.CommoditiesBarChart.Specs.COLOURS[i] = PowerColours[i][0];
	this.Controls.push(this.CommoditiesBarChart);
};
DominionReservesInfoView.prototype.SetButtons = function() {

	this.InventoryButton = new TextButton();
	this.InventoryButton.Set(this.Canvas, this.Specs.BUTTON.INVENTORY, this.TextWriter);
	this.InventoryButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.InventoryButton);

	this.CommoditiesButton = new TextButton();
	this.CommoditiesButton.Set(this.Canvas, this.Specs.BUTTON.COMMODITIES, this.TextWriter);
	this.CommoditiesButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CommoditiesButton);
};
DominionReservesInfoView.prototype.ShowControls = function() {

	this.InventoryButton.Show();
	this.CommoditiesButton.Show();
	if (this.State==this.Specs.STATE.INVENTORY) {
		this.InventoryButton.Disable();
		this.InventoryBarChart.Show();
		this.CommoditiesTouchBar.DeActivate();
		this.CommoditiesBarChart.DeActivate();
	} else {
		this.CommoditiesButton.Disable();
		this.CommoditiesBarChart.Show();
		this.CommoditiesTouchBar.Show();
		this.InventoryBarChart.DeActivate();
	}
};
DominionReservesInfoView.prototype.SetUpCharts = function() {
	var i, j;
	var max;

	//Inventory
	max = ArrayUtils.GetMaxValue(this.MainView.Nation.Reserves);
	for (i=0;i<COMMODITY.TYPES;++i)
		this.InventoryBarChart.Update(i, (this.MainView.Nation.Reserves[i]/max)*100);

	//Commodities
	this.CommodityMatrix = ArrayUtils.Create2D(POWER.COUNT, COMMODITY.TYPES);
	for (i=0;i<POWER.COUNT;++i)
		for (j=0;j<COMMODITY.TYPES;++j)
			this.CommodityMatrix[i][j] = Powers[i].Reserves[j];
	this.UpdateCommodityChart();
};
DominionReservesInfoView.prototype.Open = function() {

	this.SetUpCharts();

	GenieSubView.prototype.Open.call(this);
};
DominionReservesInfoView.prototype.Update = function() {

	if (this.InventoryButton.CheckClicked()) {
		this.State = this.Specs.STATE.INVENTORY;
		this.Draw();
		this.ShowControls();
	}

	if (this.CommoditiesButton.CheckClicked()) {
		this.State = this.Specs.STATE.POWERS;
		this.Draw();
		this.ShowControls();
	}

	if (this.CommoditiesTouchBar.CheckKeyChanged()) {
		this.UpdateCommodityChart();
		this.CommoditiesBarChart.Draw();
		this.DisplayCommodityAmounts();
	}
};
DominionReservesInfoView.prototype.Draw = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, SCREEN.WIDTH, 210);
	switch (this.State) {
		case this.Specs.STATE.INVENTORY:
			this.DrawInventoryLabels();
			break;
		case this.Specs.STATE.POWERS:
			PowerLabelImages.Draw(2, this.Specs.BArCHART.COMMODITIES.T+3);
			this.DisplayCommodityAmounts();
			break;
	}
};
DominionReservesInfoView.prototype.UpdateCommodityChart = function() {
	var i;
	var max;

	max = ArrayUtils.GetKeyMaxValue(this.CommodityMatrix, this.CommoditiesTouchBar.SelectedKey);
	for (i=0;i<POWER.COUNT;++i)
		this.CommoditiesBarChart.Update(i, (this.CommodityMatrix[i][this.CommoditiesTouchBar.SelectedKey]/max)*100);
};
DominionReservesInfoView.prototype.DrawInventoryLabels = function() {
	var i;
	var y;

	//Draw labels and values
	this.GraphicsTool.SetContext(this.Context);
	this.TextWriter.SetContext(this.Context);
	for (i=0;i<COMMODITY.TYPES;++i) {
		y = this.Specs.BArCHART.INVENTORY.T + ((i+1)*this.Specs.BArCHART.INVENTORY.GAP) + (i*this.Specs.BArCHART.INVENTORY.BAR.H) + 12;
		this.GraphicsTool.DrawRectangle(5, y, 60, 16, MinistryColours[i], 0);
		this.TextWriter.Write(Commodity[i], 7, y+11, { COLOUR: "white", FONT: "10px Arial" } );
		this.TextWriter.Write(this.MainView.Nation.Reserves[i], 212, y+13);
	}
	this.TextWriter.ResetContext();
	this.GraphicsTool.ResetContext();
};
DominionReservesInfoView.prototype.DisplayCommodityAmounts = function() {
	var i;
	var y;

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(210, 0, 30, 170);
	this.TextWriter.SetContext(this.Context);
	for (i=0;i<POWER.COUNT;++i) {
		y = this.Specs.BArCHART.COMMODITIES.T + ((i+1)*this.Specs.BArCHART.COMMODITIES.GAP) + (i*this.Specs.BArCHART.COMMODITIES.BAR.H) + 13;
		this.TextWriter.Write(Powers[i].Reserves[this.CommoditiesTouchBar.SelectedKey], 212, y);
	}
	this.TextWriter.ResetContext();
};
