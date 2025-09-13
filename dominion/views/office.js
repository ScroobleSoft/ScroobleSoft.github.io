/*
		TODO: Monitor banks switching back and forth between ministry status and satellite surveillance?
		Since there isn't any way to access bonds and investments, clicking on ticker might bring those up in Info View
*/
//----------------------------------------------------
//---------- DOMINION OFFICE VIEW --------------------
var DominionOfficeView = function() {
	var Nation;
	var PrimaryColour, SecondaryColour;		//TODO: only useful if Allieds and City-States can be selected for display
	var CalculatorImage, FolderImage, FolderLettersImage, GlobeImage,
		 LaptopImage, NewspapersImage, PDAImage, PhoneImage, RemoteImage;
	var FortnightImage, WeekImage;
	var Cabinet, Calendar, Chart, Clock;																//wall accessories
	var Calculator, Folders, Globe, Laptop, Newspapers, PDA, Phone, RemoteControl;		//desk accessories
	var DeskTrapezoid;

	var i, x, y;  //scratch variables
};
DominionOfficeView.prototype = new GenieView();
DominionOfficeView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	if (Game.CheckMobile())
		this.SetMobileLocations();
};
DominionOfficeView.prototype.SetNation = function(nation) {

	this.Nation = nation;
	this.PrimaryColour = DominionUtils.GetPrimaryColour(this.Nation);
	this.SecondaryColour = DominionUtils.GetSecondaryColour(this.Nation);
	if (this.PrimaryColour==this.SecondaryColour)
		this.SecondaryColour = "rgb(175,175,255)";
};
DominionOfficeView.prototype.SetImages = function() {

	this.DeskTrapezoid = new GenieTrapezoid();
	this.DeskTrapezoid.Set(this.Context, this.Specs.DESK);

	//Desk contents
	this.CalculatorImage = new GenieImage();
	this.CalculatorImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.CALCULATOR.IMAGE);
	this.FolderImage = new GenieImage();
	this.FolderImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.FOLDERS.IMAGE);
	this.FolderLettersImage = new GenieImage();
	this.FolderLettersImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.FOLDERS.IMAGE.LETTERS);
	this.GlobeImage = new GenieImage();
	this.GlobeImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.GLOBE.IMAGE);
	this.LaptopImage = new GenieImage();
	this.LaptopImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.LAPTOP.IMAGE);
	this.NewspapersImage = new GenieImage();
	this.NewspapersImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.NEWSPAPERS.IMAGE);
	this.PDAImage = new GenieImage();
	this.PDAImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.PDA.IMAGE);
	this.PhoneImage = new GenieImage();
	this.PhoneImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.PHONE.IMAGE);
	this.RemoteImage = new GenieImage();
	this.RemoteImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.REMOTE.IMAGE);

	//Calendar headings
	this.FortnightImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.IMAGE.FORTNIGHT);
	this.WeekImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.OFFICE], this.Specs.IMAGE.WEEK);
};
DominionOfficeView.prototype.SetControls = function() {  //UNLOGGED
};
DominionOfficeView.prototype.SetComponents = function() {  //UNLOGGED

	this.Cabinet = new FilingCabinet();
	this.Cabinet.Set(this.Specs.CABINET, this.GraphicsTool);
	this.Calculator = new OfficeCalculator();
	this.Calculator.Set(this.Specs.CALCULATOR, this.CalculatorImage);
	this.Calendar = new OfficeCalendar();
	if (Game.Type==DOMINION.GAME.MULTiCHOICE)
		this.Calendar.Set(this.Specs.CALENDAR, this.WeekImage, this.Specs.CALENDAR.IMAGE, this.GraphicsTool);
	else
		this.Calendar.Set(this.Specs.CALENDAR.MOBILE, this.FortnightImage, this.Specs.CALENDAR.IMAGE, this.GraphicsTool);
	this.Clock = new OfficeClock();
	this.Clock.Set(this.Specs.CLOCK, this.GraphicsTool);
	this.Folders = new OfficeFolders();
	this.Folders.Set(this.Specs.FOLDERS, this.FolderImage, this.FolderLettersImage);
	this.Globe = new OfficePaperStash();
	this.Globe.Set(this.Specs.GLOBE, this.GlobeImage);
	this.Laptop = new OfficeLaptop();
	this.Laptop.Set(this.Specs.LAPTOP, this.LaptopImage);
	this.MonitorBank = new OfficeMonitorBank();
	this.MonitorBank.Set(this.Specs.BANK, this.GraphicsTool);
	this.Newspapers = new OfficePaperStash();
	this.Newspapers.Set(this.Specs.NEWSPAPERS, this.NewspapersImage);
	this.PDA = new OfficePaperStash();
	this.PDA.Set(this.Specs.PDA, this.PDAImage);
	this.Phone = new OfficePhone();
	this.Phone.Set(this.Specs.PHONE, this.PhoneImage);
	this.RemoteControl = new OfficeRemoteControl();
	this.RemoteControl.Set(this.Specs.REMOTE, this.RemoteImage);
	//-newspaper rack? diagonal shelves (wall mount)
};
DominionOfficeView.prototype.SetMobileLocations = function() {

	this.Specs.WALL = this.Specs.WALL.MOBILE;
	this.Specs.CARPET = this.Specs.CARPET.MOBILE;
	this.Specs.DOOR = this.Specs.DOOR.MOBILE;
	this.Specs.DOOrPANEL = this.Specs.DOOrPANEL.MOBILE;
	this.Specs.KNOB = this.Specs.KNOB.MOBILE;
};
DominionOfficeView.prototype.Open = function() {

	this.Specs.COLOUR = PowerColours[this.Nation.Index][1];

	GenieView.prototype.Open.call(this);
};
/* TODO: either use this somewhere or subtract a LOG entry
	SetPowerDisplays() {
		var i;

		for (i=0;i<this.PowerDisplays.length;++i) {
	 this.PowerDisplays[i].Location = new Coordinate2D();
	 this.PowerDisplays[i].Location.X = Math.floor(i/4)*750;
	 this.PowerDisplays[i].Location.Y = 150*(i % 4);
		}
	},
*/
DominionOfficeView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.UpdateClick();
};
DominionOfficeView.prototype.Draw = function() {

	//Wall
	this.DrawRoom();
	this.Clock.Draw();
	this.Cabinet.Draw();
	this.Calendar.Draw();
//	this.Chart.Draw();
	this.MonitorBank.Draw();

	//Desk
	this.DrawDesk();
	this.DrawDeskContents();

	//TEMP ticker
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 28, "red", 0);
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 28, "black", 3);
};
DominionOfficeView.prototype.DrawRoom = function() {

	//Background
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, this.Specs.WALL.H, this.PrimaryColour, 0);		//wall
	this.GraphicsTool.DrawRectangle(0, this.Specs.CARPET.T, SCREEN.WIDTH, this.Specs.CARPET.H, this.SecondaryColour, 0);		//carpet

	//Door
	this.GraphicsTool.DrawRectangle(this.Specs.DOOR.L, this.Specs.DOOR.T, this.Specs.DOOR.W, this.Specs.DOOR.H, DOMINION.COLOUR.OFFICE.EDGE, 3);
	this.GraphicsTool.DrawRectangle(this.Specs.DOOR.L+3, this.Specs.DOOR.T+3, this.Specs.DOOR.W-6, this.Specs.DOOR.H-3, DOMINION.COLOUR.OFFICE.WOOD, 0);
	this.GraphicsTool.DrawRoundedRectangle(this.Specs.DOOrPANEL.L, this.Specs.DOOrPANEL.T, this.Specs.DOOrPANEL.W, this.Specs.DOOrPANEL.H, 
															this.Specs.DOOrPANEL.R, DOMINION.COLOUR.OFFICE.EDGE, DOMINION.COLOUR.OFFICE.DOOR.PANEL, 1);
	this.GraphicsTool.DrawCircle(this.Specs.KNOB.X, this.Specs.KNOB.Y, this.Specs.KNOB.R, DOMINION.COLOUR.OFFICE.EDGE, 0);
};
DominionOfficeView.prototype.DrawCabinet = function() {  //UNLOGGED
/*
var CABINEtSPRITE =  { W: 115, H: 230, GS: [ [SHAPE.RECTANGLE, GREY.SILVER, 0, [0,-230,115,230] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 1, [5,-225,105,70] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 0, [45,-210,25,10] ],
					     [SHAPE.RECTANGLE, "black", 1, [45,-210,25,10] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 1, [5,-150,105,70] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 0, [45,-135,25,10] ],
					     [SHAPE.RECTANGLE, "black", 1, [45,-135,25,10] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 1, [5,-75,105,70] ],
					     [SHAPE.RECTANGLE, GREY.ASH, 0, [45,-60,25,10] ],
					     [SHAPE.RECTANGLE, "black", 1, [45,-60,25,10] ] ]
};  //TODO: add dark top trapezoid
*/
};
DominionOfficeView.prototype.DrawMonitorBank = function() {
		var i;

//		this.MonitorBank.forEach(function(monitor) {monitor.Draw();});
/* */
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
	 if (i<MINISTRY.PORTFOLIOS/2)
		 this.GraphicsTool.DrawRoundedRectangle(183+(130*i), 50, 120, 120, 10, "black", "white", 5);
	 else
		 this.GraphicsTool.DrawRoundedRectangle(183+(130*(i-4)), 180, 120, 120, 10, "black", "white", 5);
/* */

		//NOTE: Scratchpad is used for drawing the monitor contents, and can't be used for any other purpose
};
/* TODO: either use this somewhere or subtract a LOG entry
DominionOfficeView.prototype.DrawMiniScreens = function() {  //1 for each rival mini-power
		var i;

		this.GraphicsTool.DrawRectangle(0, 0, 150, 600, "dodgerblue", 0);
		this.GraphicsTool.DrawRectangle(750, 0, 150, 600, "dodgerblue", 0);
		for (i=0;i<(POWER.COUNT-1)/2;++i) {
	 this.GraphicsTool.DrawRectangle(0, 150*i, 150, 150, "black", 3);
	 this.GraphicsTool.DrawRectangle(750, 150*i, 150, 150, "black", 3);
		}

		//TODO: depending on state, draw sashed octagon/vital stats/current activity
};
*/
DominionOfficeView.prototype.DrawDesk = function() {  //UNLOGGED - adjust for desktop/mobile

	this.GraphicsTool.DrawRectangle(0, 390, SCREEN.WIDTH, 10, DOMINION.COLOUR.OFFICE.WOOD, 0);
	this.DeskTrapezoid.Colour = DOMINION.COLOUR.OFFICE.WOOD;
	this.DeskTrapezoid.LineWidth = 0;
	this.DeskTrapezoid.QuickDraw();
	this.DeskTrapezoid.Colour = DOMINION.COLOUR.OFFICE.EDGE;
	this.DeskTrapezoid.LineWidth = 3;
	this.DeskTrapezoid.QuickDraw();
};
DominionOfficeView.prototype.DrawDeskContents = function() {  //UNLOGGED

	this.Calculator.Draw();	//accounting calculator which opens budget view
	this.Folders.Draw();
	this.Laptop.Draw();
	this.Newspapers.Draw();
	this.Phone.Draw();
	this.Globe.Draw();
	this.PDA.Draw();
	this.RemoteControl.Draw();
		//globe - to get map, which itself will have multiple depths and office wide/full screen optional modes
		//calendar - first 3 letters of each Day entry can be exculpated to give necessary abbreviation for month

		//power columns (can be switched to ally columns - most relevant ones will be shown)
		//monitor bank
		//popularity rating chart, type depending on government type
};
DominionOfficeView.prototype.UpdateClick = function() {  //UNLOGGED

	if (this.Cabinet.CheckClicked()) {
		//-unsure what these contain
	}

	if (this.Calculator.CheckClicked()) {
		//-open budget view in InfoView
	}

	if (this.Calendar.CheckClicked()) {
		//-show fortnights only? a 10x10 grid is easy to display in Info View
	}

	if (this.Clock.CheckClicked()) {
		//-shows fortnight ticking away?
	}

	if (this.Folders.CheckClicked()) {
		switch (this.Folders.FolderClicked) {
			case MINISTRY.NONE:
				return;
			case MINISTRY.AGRICULTURE:
				//-food reserves, aid parcels, research level, social services
				return;
			case MINISTRY.CULTURE:
				//-sports rankings, pop culture popularity ranking planet-wide, internal entertainment satisfaction
				return;
			case MINISTRY.DEFENCE:
				//-unit quantity in summary form, maybe battles won/lost
				return;
			case MINISTRY.ENERGY:
				//-buoys, there locations on a continent map, small world map
				return;
			case MINISTRY.FOREIGN:
				//-open diplomacy table in Info View
				return;
			case MINISTRY.HEALTH:
				//number of hospitals and doctors perhaps
				return;
			case MINISTRY.INDUSTRY:
				//finance focused, with investments and bonds listed?
				return;
			case MINISTRY.INFORMATION:
				//report on rival popularity, internal popularity
				return;
		}
	}

	if (this.Globe.CheckClicked()) {
		//-open global map
	}

	if (this.Laptop.CheckClicked()) {
		//-controls monitor bank?
	}

	if (this.Newspaper.CheckClicked()) {
		//-newspaper view? maybe could open one in Info Box, or could get list of them there
	}

	if (this.PDA.CheckClicked()) {
		//-word games
	}

	if (this.Phone.CheckClicked()) {
		//-contacting adviser/ministers
	}

	if (this.RemoteControl.CheckClicked()) {
		//-monitor bank channels
	}

	//-monitor bank + centre
};
/* all below will either be used elsewhere or simply UNLOGGED
	DrawCityState(size, x, y) {
		var i;
		var octagon;
		var offset;

		octagon = DominionCalcPad.GetOctagonVertices(size);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x, (SCREEN.HEIGHT/2)+y, octagon, "green", 0);
		//NOTE: inner 4 octagons are centred size*sin(45),size*cos(45) NE,SE,SW,NW
		offset = size*Math.sin(Utilities.DegreesToRadians(45));
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x+offset, (SCREEN.HEIGHT/2)+y-offset, octagon, "chartreuse", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x+offset, (SCREEN.HEIGHT/2)+y+offset, octagon, "chartreuse", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x-offset, (SCREEN.HEIGHT/2)+y+offset, octagon, "chartreuse", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x-offset, (SCREEN.HEIGHT/2)+y-offset, octagon, "chartreuse", 0);
		//NOTE: outer 4 octagons are centred (size + size*tan(22.5)) N,S,E,W
		offset = size*(1 + Math.tan(Utilities.DegreesToRadians(22.5)));  //NOTE: this is how to calculate size of square
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x, (SCREEN.HEIGHT/2)+y-offset, octagon, "yellow", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x+offset, (SCREEN.HEIGHT/2)+y, octagon, "yellow", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x, (SCREEN.HEIGHT/2)+y+offset, octagon, "yellow", 0);
		this.GraphicsTool.DrawPolygonFromVertices((SCREEN.WIDTH/2)+x-offset, (SCREEN.HEIGHT/2)+y, octagon, "yellow", 0);
	},
	DrawState(size) {
		var location, location_a, location_b;

		this.Screen.clearRect(150, 0, 600, 600);
		this.DrawCityState(size, 0, 0);
		location = 3*size*Math.sin(Utilities.DegreesToRadians(45));
		this.DrawCityState(size, location, -location);
		this.DrawCityState(size, location, location);
		this.DrawCityState(size, -location, location);
		this.DrawCityState(size, -location, -location);
		location = 3*size*(1 + Math.tan(Utilities.DegreesToRadians(22.5)));
		this.DrawCityState(size, 0, -location);
		this.DrawCityState(size, location, 0);
		this.DrawCityState(size, 0, location);
		this.DrawCityState(size, -location, 0);
		location_a = 2*size*(1 + Math.tan(Utilities.DegreesToRadians(22.5)));
		location_b = 2*location_a;
		this.DrawCityState(size, location_a, -location_b);
		this.DrawCityState(size, location_b, -location_a);
		this.DrawCityState(size, location_b, location_a);
		this.DrawCityState(size, location_a, location_b);
		this.DrawCityState(size, -location_a, location_b);
		this.DrawCityState(size, -location_b, location_a);
		this.DrawCityState(size, -location_b, -location_a);
		this.DrawCityState(size, -location_a, -location_b);
	},
	PlayRound() {
	},
	Play() {
		var tLength;	//t- text

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		//Draw power octagons
		for (this.i=0;this.i<POWER.COUNT-1;++this.i) {
	 this.x = this.PowerDisplays[this.i].Location.X + (150/2);  //ISSUE: 150/2 maybe should become OFFICE.MINiSCREEnHALF
	 this.y = this.PowerDisplays[this.i].Location.Y + (150/2);
	 this.GraphicsTool.DrawCircle(this.x, this.y, (150-10)/2, PowersInfo[this.i][POWErINDEX.COLOUR1], 0);
	 tLength = this.Screen.measureText(PowersInfo[this.i][0]).width;
	 this.TextWriter.Write(PowersInfo[this.i][0], Math.round(this.PowerDisplays[this.i].Location.X+(150/2)-(tLength/2)), this.PowerDisplays[this.i].Location.Y+(150/2));
		}

		//TODO: monitor bank views can be switched between ministry info and satellite surveillance, switch on desk

		if (OfficeRoundButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.PlayRound();
		}

		if (Mouse.CheckLeftClicked()) {
	 if ((Mouse.ClickX>298 && Mouse.ClickX<602) && (Mouse.ClickY>465 && Mouse.ClickY<551))
		 cancelAnimationFrame(this.AnimationFrameHandle);
	 switch (true) {
		 case ((Mouse.ClickX>300 && Mouse.ClickX<396) && (Mouse.ClickY>467 && Mouse.ClickY<486)):
//			 LandTheatre.Set(this.Screen, this.InfoBox, this.GraphicsTool);
//			 LandTheatre.Play();
			 LandTheatre.SetSimpleBattle();
			 LandTheatre.PlaySimpleBattle();
			 break;
		 case ((Mouse.ClickX>300 && Mouse.ClickX<396) && (Mouse.ClickY>488 && Mouse.ClickY<507)):
//			 beachead
			 break;
		 case ((Mouse.ClickX>300 && Mouse.ClickX<396) && (Mouse.ClickY>509 && Mouse.ClickY<528)):
//			 naval theatre
			 break;
		 case ((Mouse.ClickX>300 && Mouse.ClickX<396) && (Mouse.ClickY>530 && Mouse.ClickY<549)):
//			 submarine
			 break;
		 case ((Mouse.ClickX>402 && Mouse.ClickX<498) && (Mouse.ClickY>467 && Mouse.ClickY<486)):
//			 dogfight
			 break;
		 case ((Mouse.ClickX>402 && Mouse.ClickX<498) && (Mouse.ClickY>488 && Mouse.ClickY<507)):
//			 air mission
			 break;
		 case ((Mouse.ClickX>402 && Mouse.ClickX<498) && (Mouse.ClickY>509 && Mouse.ClickY<528)):
//			 champions duel
			 break;
		 case ((Mouse.ClickX>402 && Mouse.ClickX<498) && (Mouse.ClickY>530 && Mouse.ClickY<549)):
//			 interdiction
			 break;
		 case ((Mouse.ClickX>504 && Mouse.ClickX<600) && (Mouse.ClickY>467 && Mouse.ClickY<486)):
//			 air raid
			 break;
		 case ((Mouse.ClickX>504 && Mouse.ClickX<600) && (Mouse.ClickY>488 && Mouse.ClickY<507)):
//			 sea raid
			 break;
		 case ((Mouse.ClickX>504 && Mouse.ClickX<600) && (Mouse.ClickY>509 && Mouse.ClickY<528)):
//			 land raid
			 break;
		 case ((Mouse.ClickX>504 && Mouse.ClickX<600) && (Mouse.ClickY>530 && Mouse.ClickY<549)):
//			 missile base
			 break;
	 }

	 if ((Mouse.ClickX>350 && Mouse.ClickX<550) && (Mouse.ClickY>350 && Mouse.ClickY<410)) {
		 cancelAnimationFrame(this.AnimationFrameHandle);
		 var tGame = new TextMiniGame();
		 tGame.Set(this.Screen, this.GraphicsTool, this.TextWriter);
		 tGame.Play();
	 }
		}
	}
};
*/