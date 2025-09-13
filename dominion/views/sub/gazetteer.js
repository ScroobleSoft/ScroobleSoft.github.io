
//------------------------------------------------------------
//---------- DOMINION GAZETTEER INFO VIEW --------------------
var DominionGazetteerInfoView = function() {
	var Nation;
	var SpeedSettingImage, SpeedSettingPanel, SpeedSelectionImage;		//??
	var SpeedLabelImage;																//??
	var SurplusChart;
	var PlusImage, MinusImage;
	var Offsets, PlusBoxes, MinusBoxes;

	var i, info, colour;
};
DominionGazetteerInfoView.prototype = new GenieSubView();
DominionGazetteerInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Id = VIEW.GLOBAL.INFO.GAZETTEER;
	this.SetData();
};
DominionGazetteerInfoView.prototype.SetData = function() {  //UNLOGGED
	var i;

	this.Offsets = [ 20, 28, 26, 29, 28, 30, 27, 20 ];
	this.PlusBoxes = ArrayUtils.Create(MINISTRY.PORTFOLIOS, GenieRect);
	this.MinusBoxes = ArrayUtils.Create(MINISTRY.PORTFOLIOS, GenieRect);
	for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
		this.PlusBoxes[i].Set(140, 115+(15*i), this.Specs.IMAGE.PLUS.W, this.Specs.IMAGE.PLUS.H);
		this.MinusBoxes[i].Set(216, 115+(15*i), this.Specs.IMAGE.PLUS.W, this.Specs.IMAGE.PLUS.H);
	}
};
DominionGazetteerInfoView.prototype.SetImages = function() {

	this.PlusImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PLUS);
	this.MinusImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.MINUS);
};
DominionGazetteerInfoView.prototype.SetControls = function() {

	//UNLOGGED

	this.SurplusChart = new GeniePieChart();
	this.SurplusChart.Set(this.Canvas, { SLICES: 8, X: 70, Y: 175, RADIUS: 60, COLOURS: MinistryColours } );
	this.SurplusChart.SetLinks(this.GraphicsTool);

	this.SpeedSettingImage = new GenieImage();
	this.SpeedSettingImage.Set(this.Canvas, ImageManager.Pics[IMAGeINDEX.CONTROLS], SPEEdSETTINgIMAGE);
//		SpeedSettingPanel
//		SpeedSettingPanel
//	this.Controls.push(this.SpeedSettingPanel);
	this.SpeedSelectionImage = new GenieImage();
	this.SpeedSelectionImage.Set(this.Canvas, ImageManager.Pics[IMAGeINDEX.CONTROLS], SPEEdSELECTIOnIMAGE);
};
DominionGazetteerInfoView.prototype.SetComponents = function() {

	this.SpeedLabelImage = new GenieImage();
	this.SpeedLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], SPEEdLABElIMAGE);
//	this.AdvisorLabelImage = new GenieImage();
//	this.AdvisorLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], ADVISOrLABElIMAGE);
//	this.OfficeLabelImage = new GenieImage();
//	this.OfficeLabelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], OFFICeLABElIMAGE);
};
DominionGazetteerInfoView.prototype.Open = function() {

	this.Nation = Powers[POWER.TOMCAT];

	GenieSubView.prototype.Open.call(this);

	//UNLOGGED

	//TODO: probably should open with Tomcat as default
	//this.Nation = Powers[POWER.TOMCAT]; . . . place before call to base class ::Open

//	this.Context.fillStyle = GREY.SILVER;
//	this.Context.fillRect(0, 285, CONTROlPANEL.WIDTH, 75);
};
DominionGazetteerInfoView.prototype.UpdateClick = function() {  //UNLOGGED

	for (this.i=0;this.i<MINISTRY.PORTFOLIOS;++this.i) {
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.PlusBoxes[this.i])) {
			this.Cabinet.IncreaseBudget(this.i);
			return;
		}
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.MinusBoxes[this.i])) {
			this.Cabinet.DecreaseBudget(this.i);
			return;
		}
	}
/*
	if (this.OfficeButton.CheckClicked()) {
		//-launch Office View . . . this.MainView.OpenOfficeView()
		GlobalView.Close();		//TEMP
		OfficeView.SetNation(PlayerPower);		//TEMP
		OfficeView.Open();		//TEMP
	}
*/
};
DominionGazetteerInfoView.prototype.SetNation = function(nation) {

	this.Nation = nation;
	this.DisplayNationInfo();
};
DominionGazetteerInfoView.prototype.Draw = function() {

	this.DisplayNationInfo();
	this.DisplayLabels();
};
DominionGazetteerInfoView.prototype.DisplayNationInfo = function() {

	switch (this.Nation.Type) {
		case NATION.POWER:
			this.DisplayPowerProfile();
			break;
		case NATION.ALLIED:
			this.DisplayAlliedProfile();
			break;
		case NATION.CITySTATE:
			this.DisplayCityStateProfile();
			break;
	}
};
DominionGazetteerInfoView.prototype.DisplayLabels = function() {  //REDUNDANT? only making 1 function call

	this.SpeedLabelImage.Draw();
//	this.AdvisorLabelImage.Draw();
//	this.OfficeLabelImage.Draw();
};
DominionGazetteerInfoView.prototype.DisplayPowerProfile = function() {

	this.Context.fillStyle = PowerColours[this.Nation.Index][0];
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	//Set up writing
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("bold 14px Arial");
	this.TextWriter.SetColour(PowerColours[this.Nation.Index][1]);

	//Name
	this.TextWriter.Write("Power:", 4, 15);
	this.TextWriter.Write(PowerNames[this.Nation.Index], 120, 15);

	//Population
	this.pop = Powers[this.Nation.Index].Population;
	this.info = Math.floor(this.pop/1000000) + ",";
	this.info += Utils.GetPaddedAmount(Math.floor(this.pop/1000) % 1000);
	this.info += ",";
	this.info += Utils.GetPaddedAmount(this.pop % 1000);
	this.TextWriter.Write("Population:", 4, 30);
	this.TextWriter.Write(this.info, 120, 30);

	//Other info
	this.TextWriter.Write("GDP:", 4, 45);
	this.TextWriter.Write(DominionUtils.GetFormattedAmount(this.Nation.GDP), 120, 45);
	this.TextWriter.Write("Government:", 4, 60);
	this.TextWriter.Write(Government[this.Nation.Government.Type], 120, 60);
	if (this.Nation.HeadOfState.Name[this.Nation.HeadOfState.Name.indexOf(" ")-1]=="a")			//account for gender
		this.TextWriter.Write(HeadOfState[1][this.Nation.Government.Type]+":", 4, 75);
	else
		this.TextWriter.Write(HeadOfState[0][this.Nation.Government.Type]+":", 4, 75);
	this.TextWriter.Write(this.Nation.HeadOfState.Name, 120, 75);
	this.TextWriter.Write("Posture:", 4, 90);
	this.TextWriter.Write(Belligerence[PowerProfiles[this.Nation.Index][2]], 120, 90);
	this.TextWriter.Write("Alliances:", 4, 105);
	this.TextWriter.Write(this.Nation.Alliances.length, 120, 105);
//	this.TextWriter.Write("Treasury: " + DominionUtils.GetFormattedAmount(this.Nation.Treasury), 4, 120, this.FontSpecs);
	this.TextWriter.Write("Tech: "+PowerProfiles[this.Nation.Index][3], 170, 105);

	this.SurplusChart.SetSlices(this.Nation.Cabinet.SurplusPercentages);
	this.SurplusChart.Show();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();

	//Legend
	this.GraphicsTool.SetContext(this.Context);
	for (this.i=0;this.i<MINISTRY.PORTFOLIOS;++this.i) {
		this.GraphicsTool.DrawRectangle(140, 115+(15*this.i), 90, 15, MinistryColours[this.i], 0);
		this.TextWriter.Write(Ministries[this.i], 140+this.Offsets[this.i], 125+(15*this.i), { COLOUR: "white", FONT: "10px Arial" } );
		if (this.Nation==PlayerPower) {
			this.PlusImage.Draw(140, 115+(15*this.i));
			this.MinusImage.Draw(216, 115+(15*this.i));
		}
	}

	this.GraphicsTool.RestoreContext();
	this.TextWriter.ResetContext();
};
DominionGazetteerInfoView.prototype.DisplayAlliedProfile = function() {  //UNLOGGED

	this.Context.fillStyle = this.Nation.PrimaryColour;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	//Set up writing
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("bold 14px Arial");
	this.TextWriter.SetColour("white");

	//Name
	this.TextWriter.Write("Allied State:", 4, 15);
	this.TextWriter.Write(AlliedNames[this.Nation.NameIndex], 120, 15);

	//Population
	if (this.Nation.Population>=10000000)
		this.info = "1," + Utils.GetPaddedAmount(Math.floor(this.Nation.Population/1000) % 1000) + ",";
	else
		this.info = (Math.floor(this.Nation.Population/1000) % 1000) + ",";
	this.info += Utils.GetPaddedAmount(this.Nation.Population % 1000);
	this.TextWriter.Write("Population:", 4, 30);
	this.TextWriter.Write(this.info, 120, 30);

	//Other info
	this.TextWriter.Write("GDP:", 4, 45);
	this.TextWriter.Write(DominionUtils.GetFormattedAmount(this.Nation.GDP), 120, 45);
	this.TextWriter.Write("Preference:", 4, 60);
	this.TextWriter.Write(Commodity[PowerProfiles[this.Nation.AssociatedIndex][3]], 120, 60);
	this.TextWriter.Write("Government:", 4, 75);
	this.TextWriter.Write(Government[this.Nation.Government.Type], 120, 75);
	this.TextWriter.Write("Affiliaion:", 4, 90);
	this.TextWriter.Write(PowerNames[this.Nation.AssociatedIndex], 120, 90);
	if (this.Nation.HeadOfState.Name[this.Nation.HeadOfState.Name.indexOf(" ")-1]=="a")
		this.TextWriter.Write(HeadOfState[1][this.Nation.Government.Type] + ":", 4, 105);
	else
		this.TextWriter.Write(HeadOfState[0][this.Nation.Government.Type] + ":", 4, 105);
	this.TextWriter.Write(this.Nation.HeadOfState.Name, 120, 105);
	this.TextWriter.Write("Alliance:", 4, 120);
	if (this.Nation.Alliance)
		this.TextWriter.Write(PowerNames[this.Nation.Alliance.Power.Index], 120, 120);
	else
		this.TextWriter.Write("None", 120, 120);
	this.TextWriter.Write("Tech Level:", 4, 135);
	this.TextWriter.Write(PowerProfiles[this.Nation.AssociatedIndex][3], 120, 135);

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
	this.TextWriter.ResetContext();

	this.DisplayBarChart();
};
DominionGazetteerInfoView.prototype.DisplayCityStateProfile = function() {

	//UNLOGGED

	this.Context.fillStyle = CityStateColours[this.Nation.Index];
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	//Set up writing
	this.TextWriter.SetContext(this.Context);
//	this.FontSpecs = { FONT: "bold 14px Arial", COLOUR: "rgb(000,031,239)" };
	this.TextWriter.SetFont("bold 14px Arial");
	this.colour = Colourizer.GetInvertedColour(CityStateColours[this.Nation.Index]);
	this.TextWriter.SetColour(this.colour);

	//Name
	this.TextWriter.Write("City-State:", 4, 15);
	this.TextWriter.Write(CityStateNames[this.Nation.Index], 120, 15);

	//Population
	this.info = (Math.floor(this.Nation.Population/1000) % 1000) + ",";
	this.info += Utils.GetPaddedAmount(this.Nation.Population % 1000);
	this.TextWriter.Write("Population:", 4, 30);
	this.TextWriter.Write(this.info, 120, 30);

	//Other info
	this.TextWriter.Write("GDP:", 4, 45);
	this.TextWriter.Write(Math.round(this.Nation.GDP/1000) + "M", 120, 45);
	this.TextWriter.Write("C.E.O.:", 4, 60);
	this.TextWriter.Write(this.Nation.HeadOfState.Name, 120, 60);
	this.TextWriter.Write("Stock price:", 4, 75);
	this.TextWriter.Write(this.Nation.StockPrice, 120, 75);
//	this.TextWriter.Write("Treasury: " + DominionUtils.GetFormattedAmount(this.Nation.Treasury), 4, 90, this.FontSpecs);

	this.TextWriter.ResetContext();
/*
	//-votes/purchase chart (horizontal bar chart in power colours with names of powers written on bars)
	for (this.i=0;this.i<POWER.COUNT;++this.i)
		if (this.Nation.Purchases[this.i])
			this.GraphicsTool.DrawRectangle(5, 200, this.Nation.Purchases[this.i], 12, PowerColours[this.i][0], 0);
*/
};
DominionGazetteerInfoView.prototype.DisplayBarChart = function(alld) {

	//UNLOGGED

	this.GraphicsTool.SwitchContext(this.Context);

	//TEMP - all below . . . a 3D bar chart in Control Panel will show commodities granted
	var lngth = 20;
	var colour1 = CommodityColours[0][0];
	var colour2 = CommodityColours[0][1];
	var colour3 = CommodityColours[0][2];
	var TopDiamond = [ { X: 12, Y: 0 }, { X: 24, Y: 6 }, { X: 12, Y: 12 }, { X: 0, Y: 6 } ];
	var LeftParallelogram = [ { X: 0, Y: 6 }, { X: 12, Y: 12 }, { X: 12, Y: 12 }, { X: 0, Y: 6 } ];
	LeftParallelogram[2].Y += lngth;
	LeftParallelogram[3].Y += lngth;
	var RightParallelogram = [ { X: 12, Y: 12 }, { X: 24, Y: 6 }, { X: 24, Y: 6 }, { X: 12, Y: 12 } ];
	RightParallelogram[2].Y += lngth;
	RightParallelogram[3].Y += lngth;
	this.GraphicsTool.DrawPolygon(5, 200, RightParallelogram, colour3, 0);
	this.GraphicsTool.DrawPolygon(5, 200, TopDiamond, colour2, 0);
	this.GraphicsTool.DrawPolygon(5, 200, LeftParallelogram, colour1, 0);

	this.GraphicsTool.RestoreContext();
};
