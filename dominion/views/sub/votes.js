/*
 *  PAGE 1: bar chart, clicking a bar goes to Page 2
 *  PAGE 2: list all allies for that power
 *  PAGE 3: clicking on an Allied shows their donations per power, which may also be shown in Gazetteer Page 2 (mobile) or below standard info
 */
//--------------------------------------------------------
//---------- DOMINION VOTES INFO VIEW --------------------
var DominionVotesInfoView = function() {
	var AllianceBarChart;
	var PreviousButton, MainButton;
	var LabelRects, AllianceRects;
	var PowerIndex, Ally;

	var i, max;
};
DominionVotesInfoView.prototype = new GenieSubView();
DominionVotesInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.Specs.STATE.POWERS;
	this.LabelRects = new Array (POWER.COUNT);
};
DominionVotesInfoView.prototype.SetControls = function() {
	var i;

	//Bar chart
	this.AllianceBarChart = new GenieBarChart();
	this.AllianceBarChart.Set(this.Canvas, this.Specs.BArCHART.ALLIANCE);
	this.AllianceBarChart.SetLinks(this.GraphicsTool, this.TextWriter);
	this.AllianceBarChart.Specs.COLOURS = new Array(MINISTRY.PORTFOLIOS);
	for (i=0;i<POWER.COUNT;++i)
		this.AllianceBarChart.Specs.COLOURS[i] = PowerColours[i][0];
	this.Controls.push(this.AllianceBarChart);

	//Buttons
	this.PreviousButton = new TextButton();
	this.PreviousButton.Set(this.Canvas, this.Specs.BUTTON.PREVIOUS, this.TextWriter);
	this.PreviousButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.PreviousButton);
	this.MainButton = new TextButton();
	this.MainButton.Set(this.Canvas, this.Specs.BUTTON.MAIN, this.TextWriter);
	this.MainButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.MainButton);
};
DominionVotesInfoView.prototype.ShowControls = function() {
	GenieSubView.prototype.ShowControls.call(this);

	if (this.State==this.Specs.STATE.POWERS) {
		this.MainButton.Disable();
		this.PreviousButton.Disable();
	}
/*
	switch (this.State) {
		case this.Specs.STATE.POWERS:
			this.AllianceBarChart.Show();
			break;
		case this.Specs.STATE.ALLIANCES:
			this.PreviousButton.Show();
			break;
		case this.Specs.STATE.ALLY:
			this.AllianceBarChart.Show();
			this.MainButton.Show();
			this.PreviousButton.Show();
			break;
	}
*/
};
DominionVotesInfoView.prototype.Update = function() {

	switch (this.State) {
		case this.Specs.STATE.POWERS:
			this.UpdatePowers();
			break;
		case this.Specs.STATE.ALLIANCES:
			this.UpdateAlliances();
			break;
		case this.Specs.STATE.ALLY:
			this.UpdateAlly();
			break;
	}
};
DominionVotesInfoView.prototype.UpdatePowers = function() {

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		for (this.i=0;this.i<POWER.COUNT;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Click, this.LabelRects[this.i])) {
				this.PowerIndex = this.i;
				this.State = this.Specs.STATE.ALLIANCES;
				this.Draw();
				return;
			}
};
DominionVotesInfoView.prototype.UpdateAlliances = function() {

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		for (this.i=0;this.i<Powers[this.PowerIndex].Alliances.length;++this.i)
			if (SpaceUtils.CheckPointInBox(Mouse.Click, this.AllianceRects[this.i])) {
				this.Ally = Powers[this.PowerIndex].Alliances[this.i];
				this.State = this.Specs.STATE.ALLY;
				this.Draw();
				return;
			}

	if (this.PreviousButton.CheckClicked()) {
		this.State = this.Specs.STATE.POWERS;
		this.Draw();
		this.AllianceBarChart.Show();
	}
};
DominionVotesInfoView.prototype.UpdateAlly = function() {

	if (this.PreviousButton.CheckClicked()) {
		this.State = this.Specs.STATE.ALLIANCES;
		this.Draw();
		return;
	}

	if (this.MainButton.CheckClicked()) {
		this.State = this.Specs.STATE.POWERS;
		this.Draw();
		this.AllianceBarChart.Show();
	}
};
DominionVotesInfoView.prototype.Draw = function() {

	this.Context.fillStyle = this.Specs.COLOUR;
	this.Context.fillRect(0, 0, SCREEN.WIDTH, 210);
	switch (this.State) {
		case this.Specs.STATE.POWERS:
			this.DrawPowers();
			break;
		case this.Specs.STATE.ALLIANCES:
			this.DrawAlliances();
			break;
		case this.Specs.STATE.ALLY:
			this.DrawAlly();
			break;
	}
};
DominionVotesInfoView.prototype.DrawPowers = function() {
	var i;
	var x, y;

	this.TextWriter.SetContext(this.Context);
	for (i=0;i<POWER.COUNT;++i) {
		y = this.Specs.BArCHART.ALLIANCE.T + ((i+1)*this.Specs.BArCHART.ALLIANCE.GAP) + (i*this.Specs.BArCHART.ALLIANCE.BAR.H) + 3;
		PowerLabelImages.DrawPatchNumber(i, 2, y);
		this.LabelRects[i] = { L: 2, T: y, W: this.Specs.IMAGE.LABELS.W, H: this.Specs.IMAGE.LABELS.PATCH.H };
		this.AllianceBarChart.Update(i, 2*(Powers[i].Alliances.length+1));
//		x = this.Specs.BArCHART.ALLIANCE.L + (3*(Powers[i].Alliances.length+1)) + 3;
		this.TextWriter.Write(Powers[i].Alliances.length+1, 222, y+12, { COLOUR: PowerColours[i][0] } );
	}
	this.TextWriter.ResetContext();

	this.MainButton.Disable();
	this.PreviousButton.Disable();
};
DominionVotesInfoView.prototype.DrawAlliances = function() {
	var i;
	var x, y;

	this.ColourScape();
	this.TextWriter.SetContext(this.Context);
	this.AllianceRects = new Array(Powers[this.PowerIndex].Alliances.length);
	for (i=0;i<Powers[this.PowerIndex].Alliances.length;++i) {
		x = 5 + Math.floor(i/15);
		y = 20 + Math.floor(i % 15);
		switch (Powers[PowerIndex].Alliances[i].Type) {
			case NATION.POWER:
				this.TextWriter.Write(PowerNames[i], x, y);
				this.AllianceRects[i].Set(x, y-10, StringUtils.GetTextWidth(PowerNames[i], null, this.Context), 15);
				break;
			case NATION.ALLIED:
				this.TextWriter.Write(AlliedNames[i], x, y);
				this.AllianceRects[i].Set(x, y-10, StringUtils.GetTextWidth(AlliedNames[i], null, this.Context), 15);
				break;
			case NATION.CITySTATE:
				this.TextWriter.Write(CityStateNames[i], x, y);
				this.AllianceRects[i].Set(x, y-10, StringUtils.GetTextWidth(CityStateNames[i], null, this.Context), 15);
				break;
		}
	}
	this.TextWriter.ResetContext();

	this.MainButton.Disable();
	this.PreviousButton.Enable();
};
DominionVotesInfoView.prototype.DrawAlly = function() {  //UNLOGGED - can't be TESTED until alliances are made
	var i;
	var max;

	//List donations or investments
	if (this.Ally==NATION.ALLIED) {
		max = ArrayUtils.GetMaxValue(this.Ally.Donations);
		for (i=0;i<POWER.COUNT;++i)
			this.AllianceBarChart.Update(i, (this.Ally.Donations[i]/max)*100);
	} else {
		max = ArrayUtils.GetMaxValue(this.Ally.Investments);
		for (i=0;i<POWER.COUNT;++i)
			this.AllianceBarChart.Update(i, (this.Ally.Investments[i]/max)*100);
	}

	this.MainButton.Enable();
	this.PreviousButton.Enable();
};
