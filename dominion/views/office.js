/*
	UNLOGGED

	** on the wall - approval chart, budget chart (both expandable)
*/
//NOTE: Monitor banks switching back and forth between ministry status and satellite surveillance?
//----------------------------------------------------
//---------- DOMINION OFFICE VIEW --------------------
var DominionOfficeView = function() {
	var Nation;
	var PrimaryColour, SecondaryColour;

	//Accessories
	var Clock, Calendar;
	var Cabinet, Chart;		//.Chart is Popularity Chart
	var Folders;
	var MonitorBank;
	//-newspaper, budget pie chart

	var i, x, y;  //scratch variables
};
DominionOfficeView.prototype = new GenieView();
DominionOfficeView.prototype.Set = function(cnvs, specs, gTool, tWriter) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(this.GraphicsTool, this.TextWriter);
	this.Nation = Powers[POWER.TOMCAT];
};
DominionOfficeView.prototype.SetControls = function() {

	//UNLOGGED

	//-calendar, cabinet, monitors, phone, maybe PC
};
DominionOfficeView.prototype.Open = function() {
//	GenieView.prototype.Open.call(this);

	//UNLOGGED

	this.Context.fillStyle = PowerColours[this.Nation.Index][1];
	this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
};
DominionOfficeView.prototype.SetComponents = function() {

	//UNLOGGED

	return;

	this.Clock = new OfficeClock();
	this.Clock.Set();
	this.Calendar = new OfficeCalendar();
	this.Calendar.Set();
	this.Cabinet = new OfficeCabinet();
	this.Cabinet.Set();
	this.Folders = new OfficeFolders();
	this.Folders.Set();
	this.MonitorBank = new OfficeMonitorBank();
	this.MonitorBank.Set();
};
DominionOfficeView.prototype.SetNation = function(nation) {

	this.Nation = nation;
	this.PrimaryColour = DominionUtils.GetPrimaryColour(this.Nation);
	this.SecondaryColour = DominionUtils.GetSecondaryColour(this.Nation);
	if (this.PrimaryColour==this.SecondaryColour)
		this.SecondaryColour = "rgb(175,175,255)";
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
DominionOfficeView.prototype.SetMonitorBank = function() {
		var i;
		var x, y, oy, oy;

		//Caclulate location of monitor bank
		x = (SCREEN.WIDTH - (2*OFFICE.COLUMnW) - ((4*MONITOR.W)+(3*MONITOR.O)))/2;
		x += OFFICE.COLUMnW;
		y = OFFICE.MONITOrBANkT;

		//Create and set monitors
		for (i=0;i<this.MonitorBank.length;++i) {
	 ox = (MONITOR.W+MONITOR.O)*(i % (this.MonitorBank.length/MONITOR.R));
	 oy = Math.floor(i/(this.MonitorBank.length/MONITOR.R));
	 this.MonitorBank[i].Set(Screen, GraphicsTool, x+ox, y+oy, MONITOR);
		}
};
DominionOfficeView.prototype.DrawRoom = function() {
/*
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 375, this.PrimaryColour, 0);		//wall
	this.GraphicsTool.DrawRectangle(0, 375, SCREEN.WIDTH, 225, this.SecondaryColour, 0);		//carpet
*/
	//Background
	this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 400, this.PrimaryColour, 0);		//wall
	this.GraphicsTool.DrawRectangle(0, 400, SCREEN.WIDTH, 240, this.SecondaryColour, 0);		//carpet

	//Door
	this.GraphicsTool.DrawRectangle(582, 122, 131, 253, DESK.COLOUR.EDGE, 3);
	this.GraphicsTool.DrawRectangle(585, 125, 125, 250, DESK.COLOUR.WOOD, 0);
	this.GraphicsTool.DrawRoundedRectangle(600, 150, 90, 65, 20, DESK.COLOUR.EDGE, GREY.SILVER, 1);
	this.GraphicsTool.DrawCircle(600, 260, 10, DESK.COLOUR.EDGE, 0);					//knob
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
DominionOfficeView.prototype.DrawRedundant = function() {  //obviously, will go away eventually
		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.DrawBackground();
		this.DrawMiniScreens();
		this.DrawMonitorBank();
		DeskImage.Draw();
		MissionsImage.Draw();
		TextGameImage.Draw();
		OfficeRoundButton.Display();
/*
		var minister = new ScreenMinister();
		minister.Set(this.Screen, this.GraphicsTool);
		minister.Draw(0, 0, "green", null, 0, "black");

		this.DrawState(30);
*/
};
DominionOfficeView.prototype.Draw = function() {
		var i, j;

	this.DrawRoom();
//	this.Clock.Draw();
		//Filing cabinet
		//TODO: going to tack on a darker trapezoid on top [(165,165),(280,165),(260,145),(185,145)]
		CabinetSprite.Draw(165, 395);
//	this.Cabinet.Draw();
	this.MonitorBank.Draw();

	this.DrawDesk();
	this.DrawDeskContents();
};
DominionOfficeView.prototype.DrawDesk = function() {

	//UNLOGGED

		this.GraphicsTool.DrawRectangle(150, 580, 600, 20, DESK.COLOUR.WOOD, 0);
		DeskTrapezoid.Colour = DESK.COLOUR.WOOD;
		DeskTrapezoid.LineWidth = 0;
		DeskTrapezoid.QuickDraw();
		DeskTrapezoid.Colour = DESK.COLOUR.EDGE;
		DeskTrapezoid.LineWidth = 3;
		DeskTrapezoid.QuickDraw();
};
DominionOfficeView.prototype.DrawDeskContents = function() {

	//UNLOGGED

		ComputerImage.Draw();
/*
		for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
	 FolderImage.Draw(FOLDErIMAGE.X+(i*FOLDErIMAGE.GAP), FOLDErIMAGE.Y);
	 for (j=0;j<FolderLetters[i].length;++j)
		 SidewaysLettersImage.DrawPatchNumber(FolderLetters[i][j]-1, FOLDErIMAGE.X+(i*FOLDErIMAGE.GAP)+3, FOLDErIMAGE.Y+75-(6*j));
		}
*/
	Folders.Draw();
		PhoneSprite.Draw(670, 570);
		NewspaperImage.Draw();
		//globe - to get map, which itself will have multiple depths and office wide/full screen optional modes
		GlobeImage.Draw();
		HP100Image.Draw();
		CalculatorImage.Draw();	//accounting calculator which opens budget view
		//calendar - first 3 letters of each Day entry can be exculpated to give necessary abbreviation for month

		//power columns (can be switched to ally columns - most relevant ones will be shown)
		//monitor bank
		//chair - ministers enter via door, sit in chair (or maybe chief minister/adviser does when situation critical)
		//popularity rating chart, type depending on government type
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