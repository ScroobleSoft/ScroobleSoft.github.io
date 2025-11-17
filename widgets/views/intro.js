
//-------------------------------------------------
//---------- WIDGET INTRO VIEW --------------------
var WidgetIntroView = function() {
/*
	var DailyButton, FreeFormButton, MultiChoiceButton, SurvivalButton, PlayButton, GuideButton, InfoButton;										//open page
	var PickMaleButton, ModifyMaleButton, PickFemaleButton, ModifyFemaleButton, ShortButton, MediumButton, LongButton, PastButton;		//start page
	var GameRadioOption, FemaleFirstFlag, LeaderPickedFlag, PastGamesFlag, MaleX, FemaleX, DailyDate, GameInfo;									//start page
	var OkButton, CancelButton;																																			//character page
	var GenderRadioOptions, MonthsTouchBar, CellImage, SelectionImage, DeselectionImage, GenderFlag;												//past page
	var PastGameDate, SelectedSlot, StartingSlot, EndingSlot, PastGameIndex, FirstDayIndex;															//past page
	var MaleName, FemaleName, MaleProfile, FemaleProfile, SelectedName, SelectedProfile;																//open page
	var InfoCount;																																								//info page
*/
	//TEMP
	var FacilityLocations, FacilityRow, RivalCombos;
	var ComboColours;
	var Location1, Location2;
	var MinDistance, Distance;
	var OptimalCombos;
	var i;
};
WidgetIntroView.prototype = new GenieView();
WidgetIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);
/*
	this.State = this.Specs.STATE.OPEN;
	this.InfoCount = 0;
	this.GenderFlag = GENDER.FEMALE;
*/
	//TEMP
	this.FacilityLocations = new Array(64);
	this.FacilityRow = new Array(8);
	this.Randomizer.GetUniqueIndices(this.FacilityLocations, 64, 64);
	this.SetRivalConfiguration();
	this.OptimalCombos = new Array(64);
	this.ComboColours = [ "rgb(159,079,159)", "rgb(063,079,207)", "rgb(000,159,239)", "rgb(031,175,079)",
								 "rgb(255,239,000)", "rgb(255,127,047)", PAINT.RED, PAINT.PINK  ];
	this.Location1 = new Coordinate2D();
	this.Location2 = new Coordinate2D();
};
WidgetIntroView.prototype.SetImages = function() {
/*
	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
	this.DeselectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DESELECTION);
*/
};
WidgetIntroView.prototype.SetControls = function() {
/*
	//Choice
	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.FreeFormButton = this.SetTextButton(this.Specs.BUTTON.FREeFORM, RaisedCornerImages, this.TextWriter);
	this.MultiChoiceButton = this.SetTextButton(this.Specs.BUTTON.MULTiCHOICE, RaisedCornerImages, this.TextWriter);
	this.SurvivalButton = this.SetTextButton(this.Specs.BUTTON.SURVIVAL, RaisedCornerImages, this.TextWriter);
	this.PlayButton = this.SetTextButton(this.Specs.BUTTON.PLAY, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
	this.InfoButton = this.SetTextButton(this.Specs.BUTTON.INFO, RaisedCornerImages, this.TextWriter);

	//Head of state
	this.PickMaleButton = this.SetTextButton(this.Specs.BUTTON.PICkMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyMaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyMALE, RaisedCornerImages, this.TextWriter);
	this.PickFemaleButton = this.SetTextButton(this.Specs.BUTTON.PICkFEMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyFemaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyFEMALE, RaisedCornerImages, this.TextWriter);

	//Game Options
	this.ShortButton = this.SetTextButton(this.Specs.BUTTON.SHORT, RaisedCornerImages, this.TextWriter);
	this.MediumButton = this.SetTextButton(this.Specs.BUTTON.MEDIUM, RaisedCornerImages, this.TextWriter);
	this.LongButton = this.SetTextButton(this.Specs.BUTTON.LONG, RaisedCornerImages, this.TextWriter);
	this.PastButton = this.SetTextButton(this.Specs.BUTTON.PAST, RaisedCornerImages, this.TextWriter);

	//Profile
	this.OkButton = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, this.TextWriter);
	this.CancelButton = this.SetTextButton(this.Specs.BUTTON.CANCEL, RaisedCornerImages, this.TextWriter);

	//Radio Options
	this.GameRadioOptions = this.SetRadioControls(this.Specs.RADIO.GAME, RadioOptionImage, this.TextWriter)
	this.GenderRadioOptions = this.SetRadioControls(this.Specs.RADIO.GENDER, RadioOptionImage, this.TextWriter)

	//Touch bar
	this.MonthsTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.MONTHS, this.Specs.TOUChBAR.MONTHS.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
*/
};
WidgetIntroView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);
/*
	if (this.State==this.Specs.STATE.OPEN) {
		this.DailyDate = new Date();
		this.DailyDate.getTime();
		this.GameInfo = this.DailyDate.toDateString();
	}
*/
};
WidgetIntroView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.DrawExperiment();
		this.UpdateExperiment();
	}
};
WidgetIntroView.prototype.UpdateExperiment = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.UpdateExperiment.bind(this));

	this.MinDistance = 200;
	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.StoreCombo();
		for (i=0;i<100;++i) {
			this.RearrangeFacilities();
			this.Distance = this.CalculateDistance(this.RivalCombos);
			if (this.Distance<this.MinDistance) {
				this.StoreCombo();
				this.MinDistance = this.Distance;
			}
		}
		this.Context.fillStyle = GREY.LIGHT;
		this.Context.fillRect(0, 200, 160, 160);
		this.Context.fillRect(160, 200, 60, 40);
		this.TextWriter.Write(this.MinDistance, 175, 220);
		this.ShowZones(this.OptimalCombos);
	}
/*
	this.UpdatePlayButtons();
	if (this.State!=VIEW.INTRO.STATE.CHARACTER)
		this.UpdateInfoButton();
	if (this.State==VIEW.INTRO.STATE.START) {
		this.UpdateProfileButtons();
		this.UpdatePastButton();
		this.UpdateTurnButtons();
		this.UpdateRadioControl();
	}
	if (this.State==VIEW.INTRO.STATE.CHARACTER)
		this.UpdateCharacterControls();
	if (this.State==VIEW.INTRO.STATE.PAST)
		this.UpdatePastControls();
*/
};
WidgetIntroView.prototype.Draw = function() {  //UNLOGGED - all TEMP
	var MainImage, InfoImage, ConsoleImage1, ConsoleImage2;

	MainImage = new GenieImage();
	MainImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 281, T: 0, W: 400, H: 400 } );
	InfoImage = new GenieImage();
	InfoImage.Set(GalleryScape.InfoBox, ImageManager.Pics[IMAGeINDEX.FACILITY], { L: 802, T: 0, W: 240, H: 240 } );
	ConsoleImage1 = new GenieImage();
	ConsoleImage1.Set(GalleryScape.ControlPanel, ImageManager.Pics[IMAGeINDEX.FACILITY], { L: 259, T: 408, W: 132, H: 119 } );
	ConsoleImage2 = new GenieImage();
	ConsoleImage2.Set(GalleryScape.ControlPanel, ImageManager.Pics[IMAGeINDEX.FACILITY], { L: 50, T: 598, W: 128, H: 109 } );

	GalleryScape.ControlPanel.fillStyle = GREY.LIGHT;
	GalleryScape.ControlPanel.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	MainImage.Draw(0, 0);
	InfoImage.Draw(0, 0);
	ConsoleImage1.Draw(12, 5);
	ConsoleImage2.Draw(14, 130);
};
WidgetIntroView.prototype.DrawExperiment = function() {  //UNLOGGED - all TEMP
	var i;
	var x, y;

	this.ColourScape();

	for (i=0;i<this.FacilityLocations.length;++i) {
		x = 5 + (20*(i % 8));
		y = 20 + (20*Math.floor(i/8));
		this.TextWriter.Write(this.FacilityLocations[i] % 8, x, y);
	}

	this.TextWriter.Write("Click to see combos.", 5, 185);

	this.SetRivalConfiguration();
	this.MinDistance = this.CalculateDistance(this.RivalCombos);
	this.TextWriter.Write(this.MinDistance, 175, 220);
	this.ShowZones(this.RivalCombos);
};
WidgetIntroView.prototype.SetRivalConfiguration = function() {  //UNLOGGED - all TEMP
	var i, j;
	var iFclty;

	this.RivalCombos = new Array(64);
	iFclty = 0;
	for (i=0;i<8;++i)
		for (j=0;j<64;++j)
			if (this.FacilityLocations[j] % 8==i) {
				this.RivalCombos[iFclty] = j;
				++iFclty;
			}
};
WidgetIntroView.prototype.CalculateDistance = function(aCombos) {  //UNLOGGED - all TEMP
	var i, j;
	var dstnc;

	dstnc = 0;
	for (i=0;i<8;++i)
		for (j=1;j<8;++j) {
			this.Location1.Set(aCombos[(8*(j-1))+i] % 8, Math.floor(aCombos[(8*(j-1))+i]/8));
			this.Location2.Set(aCombos[(8*j)+i] % 8, Math.floor(aCombos[(8*j)+i]/8));
			dstnc += SpaceUtils.GetDistance(this.Location1, this.Location2);
		}

	return (Math.round(dstnc));
};
WidgetIntroView.prototype.ShowZones = function(aCombos) {  //UNLOGGED - all TEMP
	var i;
	var x, y;

	for (i=0;i<64;++i) {
		x = 20*(aCombos[i] % 8);
		y = 200 + (20*Math.floor(aCombos[i]/8));
		this.GraphicsTool.DrawRectangle(x, y, 20, 20, this.ComboColours[i % 8], 5);
		x = 20 * (i % 8);
		y = 200 + (20*Math.floor(i/8));
		this.TextWriter.Write(this.FacilityLocations[i] % 8, x+5, y+15);
	}
};
WidgetIntroView.prototype.RearrangeFacilities = function() {  //UNLOGGED - all TEMP
	var i, j;

	for (i=0;i<8;++i) {
		for (j=0;j<8;++j)
			this.FacilityRow[j] = this.RivalCombos[(8*i)+j];
		this.Randomizer.Shuffle(this.FacilityRow);
		for (j=0;j<8;++j)
			this.RivalCombos[(8*i)+j] = this.FacilityRow[j];
	}
};
WidgetIntroView.prototype.StoreCombo = function() {  //UNLOGGED - probably REDUNDANT
	var i;
	for (i=0;i<64;++i)
		this.OptimalCombos[i] = this.RivalCombos[i];
};
WidgetIntroView.prototype.OpenGlobalView = function() {  //UNLOGGED - probably REDUNDANT

	GlobalView.SetNation(PlayerPower);
	GlobalView.Open();
	GlobalView.Update();
};
WidgetIntroView.prototype.OpenAssetsView = function() {

	++Game.Phase;
	AssetsView.SetNation(PlayerPower);
	WorldMap.SelectNation(PlayerPower);
	AssetsView.Open();
	AssetsView.Update();
};
WidgetIntroView.prototype.OpenSolicitationView = function() {

	SolicitationView.Open();
	SolicitationView.Update();
};
WidgetIntroView.prototype.OpenOfficeView = function() {

	OfficeView.SetNation(PlayerPower);
	OfficeView.Open();
};
WidgetIntroView.prototype.OpenGuideView = function() {

	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
};
WidgetIntroView.prototype.OpenChoiceView = function() {  //UNLOGGED

	ChoiceView.SetNation(PlayerPower);
	ChoiceView.Open();
	ChoiceView.Update();
};
