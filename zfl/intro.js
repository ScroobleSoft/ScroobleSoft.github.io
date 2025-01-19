
//---------------------------------------------
//---------- GRIDIRON INTRO -------------------
var GridironIntro = function() {
	var Interface, Screen;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var ScreenRect;
	var AnimationFrameHandle;
	var State, Frames;
	var Controls;

	//Controls
	var FeaturedIndexButton, DailyGameButton, WeeklyGameButton;

	//QB play
	var DemoQBSprite, DemoQBState, DemoQBX, DemoFootballSprite;	//UNLOGGED
	var DemoWR1, DemoWR2, DemoTE;
	var DemoPassPlay, DemoRunPlay;

	var i, j, x, y;	//scratch variables
};
GridironIntro.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator, sRect) {
		this.Interface = intrfc;
		this.Screen = this.Interface.Screen;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.State = 0;
		this.Frames = 0;
		this.SetControls();
	},
	SetControls() {

		this.Controls = new Array();

		//Standard buttons
		this.Controls.push(NewGameButton);
		this.Controls.push(TutorialButton);
		this.Controls.push(DemoButton);
		this.Controls.push(MiniGamesButton);

		//Scheduled games
		this.FeaturedIndexButton = new ImageButton();
		this.FeaturedIndexButton.Set(this.Interface.Console, INTRO.BUTTON.FEATURED, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.FeaturedIndexButton.SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.FeaturedIndexButton);
		this.DailyGameButton = new ImageButton();
		this.DailyGameButton.Set(this.Interface.Console, INTRO.BUTTON.DAILY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.DailyGameButton.SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.DailyGameButton);
		this.WeeklyGameButton = new ImageButton();
		this.WeeklyGameButton.Set(this.Interface.Console, INTRO.BUTTON.WEEKLY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.WeeklyGameButton.SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.WeeklyGameButton);
	},
	Start() {

		this.SetInfoBox();
		this.SetConsole();

		this.ScreenRect.Set(0, 0, SCREEN.WIDTH, 450);

		this.SetQBPlay();
		this.SetWRs();
		this.SetCBs();
		this.SetOline();
		this.SetDline();

		SideViewField.SetHomeTeam();

//		this.Screen.scale(2, 2);
//		this.Screen.imageSmoothingEnabled = false;

		SideViewField.Draw();
		HomeSideViewWRs.forEach(function(wr) {if (wr.CheckVisible()) wr.DrawRoute();});
		this.DemoQBSprite.Draw(this.DemoQBX, 240, this.DemoQBState);
		HomeSideViewWRs.Draw();
		HomeSideViewOLs.Draw();
		VisitorSideViewDEs.Draw();
		VisitorSideViewDTs.Draw();
		VisitorSideViewCBs.Draw();

		this.PollSnap();
	},
	SetInfoBox() {

		this.Interface.InfoBox.fillStyle = InterfaceColours[1];
		this.Interface.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

		//Adjust button positions
		NEwGAMeBUTTOnIMAGE.L = 36;
		TUTORIAlBUTTOnIMAGE.L = 168;
		DEMoBUTTOnIMAGE.L = 36;
		MINiGAMEsBUTTOnIMAGE.L = 168;

		//Show buttons
		NewGameButton.Show();
		TutorialButton.Show();
		DemoButton.Show();
		MiniGamesButton.Show();

		//TEMP
//		NewGameButton.Disable();
		TutorialButton.Disable();
		DemoButton.Disable();
		MiniGamesButton.Disable();
	},
	SetConsole() {
		//UNLOGGED
		this.Interface.ControlPanel.fillStyle = InterfaceColours[2];
		this.Interface.ControlPanel.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);

		//Controls
		this.FeaturedIndexButton.Show();
		this.DailyGameButton.Show();
		this.WeeklyGameButton.Show();

		//TEMP
		this.DailyGameButton.Disable();
		this.WeeklyGameButton.Disable();

		this.TextWriter.SetContext(this.Interface.ControlPanel);

		//Featured game info
		FeaturedIndex = 0;		//TEMP
		this.TextWriter.Write("Title:", 110, 25);
		this.TextWriter.Write(Daily[FeaturedIndex][1], 170, 25);
		this.TextWriter.Write("Record:", 110, 40);
		this.TextWriter.Write(Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 170, 40);
		this.TextWriter.Write("Pluses:", 110, 55);
		this.TextWriter.Write(Daily[FeaturedIndex][3], 170, 55);
		this.TextWriter.Write("Minuses:", 110, 70);
		this.TextWriter.Write(Daily[FeaturedIndex][4], 170, 70);
		this.TextWriter.Write("Date:", 110, 85);
		this.TextWriter.Write(Daily[FeaturedIndex][5], 170, 85);
		this.TextWriter.Write("Seasons:", 110, 100);
		this.TextWriter.Write(Daily[FeaturedIndex][6][0]+" ("+Daily[FeaturedIndex][6][1]+" attempt(s))", 170, 100);

		//Daily game info
		DailyIndex = 0;		//TEMP
		this.TextWriter.Write("Title: "+Daily[DailyIndex][1], 110, 132);
		this.TextWriter.Write("Record: "+Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 110, 147);
		this.TextWriter.Write("Pluses: "+Daily[DailyIndex][3], 110, 162);
		this.TextWriter.Write("Minuses: "+Daily[DailyIndex][4], 110, 177);
		this.TextWriter.Write("Date: "+Daily[DailyIndex][5], 110, 192);

		//Weekly game info
		WeeklyIndex = 0;		//TEMP
		this.TextWriter.Write("Title: "+Daily[WeeklyIndex][1], 110, 234);
		this.TextWriter.Write("Record: "+Daily[FeaturedIndex][2][0]+"-"+Daily[FeaturedIndex][2][1]+"-"+Daily[FeaturedIndex][2][2], 110, 249);
		this.TextWriter.Write("Pluses: "+Daily[WeeklyIndex][3], 110, 264);
		this.TextWriter.Write("Minuses: "+Daily[WeeklyIndex][4], 110, 279);
		this.TextWriter.Write("Date: "+Daily[WeeklyIndex][4], 110, 294);

		this.TextWriter.ResetContext();
	},
	CheckButtons() {

		if (NewGameButton.CheckClicked()) {
			this.Close();
			Game.Type = ZFL.TYPE.RANDOM;
			setTimeout(this.OpenLeagueView.bind(this), 100);
		}

		if (TutorialButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Tutorial.Start();
		}

		if (DemoButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Demo.Start();
		}

		if (MiniGamesButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			MiniGames.Start();
		}

		if (this.FeaturedIndexButton.CheckClicked()) {
			this.Close();
			Game.Type = ZFL.TYPE.FEATURED;
			setTimeout(this.OpenLeagueView.bind(this), 100);
		}

		if (this.DailyGameButton.CheckClicked()) {
			this.Close();
			Game.Type = ZFL.TYPE.DAILY;
			setTimeout(this.OpenLeagueView.bind(this), 100);
		}

		if (this.WeeklyGameButton.CheckClicked()) {
			this.Close();
			Game.Type = ZFL.TYPE.WEEKLY;
			setTimeout(this.OpenLeagueView.bind(this), 100);
		}
	},
	HideButtons() {

		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();
	},
	SetQBPlay() {

		//UNLOGGED

		this.DemoQBSprite = new AnimatedSprite();
		this.DemoQBSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 1, W: 24, H: 38, O: 2 } );
		this.DemoQBState = 0;
		this.DemoQBX = 140;
		this.DemoFootballSprite = new GenieSprite();
		this.DemoFootballSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 30, T: 93, W: 8, H: 5 } );
		this.Screen.fillStyle = BLUE.POWDER;
		this.Screen.fillRect(0, 450, SCREEN.WIDTH, 150);

		this.TextWriter.Write("Differences from Pro Football", 5, 465, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
		this.TextWriter.Write("1. Injury layoffs capped at 4 games.", 5, 485, { COLOUR: "white" } );
		this.TextWriter.Write("2. Only I-FORM OFF, 4-3 DEF formations.", 5, 500, { COLOUR: "white" } );
		this.TextWriter.Write("3. Categorized draft prospects.", 5, 515, { COLOUR: "white" } );
		this.TextWriter.Write("4. Limits on number of trades.", 5, 530, { COLOUR: "white" } );
		this.TextWriter.Write("5. Trade deadline after 8 weeks.", 5, 545, { COLOUR: "white" } );
		this.TextWriter.Write("6. No signing bonuses.", 5, 560, { COLOUR: "white" } );
		this.TextWriter.Write("7. No guaranteed contracts.", 5, 575, { COLOUR: "white" } );
/*
		this.DemoTE = new ZFLSideViewTE();
		this.DemoTE.Set(TE, this.DemoQBSprite);
		this.DemoTE.Direction = DIRECTION.E;
*/
		//Plays
		this.DemoPassPlay = new ZFLPassPlay();
		this.DemoPassPlay.Set(this.Randomizer);
		this.DemoPassPlay.Generate(0b00111);
//		this.DemoWR1.SetRoute(this.DemoPassPlay.Routes[0]);
/*
		this.DemoRunPlay = new ZFLRunPlay();
		this.DemoRunPlay.Set(this.Randomizer);
		this.DemoRunPlay.Generate(0);
*/
	},
	SetWRs() {

		//UNLOGGED

		HomeSideViewWRs[0].SetVisible();
		HomeSideViewWRs[1].SetVisible();
		HomeSideViewWRs[2].SetVisible();
		HomeSideViewWRs[0].SetExtant();
		HomeSideViewWRs[1].SetExtant();
		HomeSideViewWRs[2].SetExtant();
		HomeSideViewWRs.forEach(function(wr){wr.Direction = DIRECTION.E;});
		HomeSideViewWRs[0].Position.Set(175, 130);
		HomeSideViewWRs[1].Position.Set(161, 305);
		HomeSideViewWRs[2].Position.Set(175, 395);
		HomeSideViewWRs[0].SetRoute( [1,2,1] );
		HomeSideViewWRs[1].SetRoute( [1,1] );
		HomeSideViewWRs[2].SetRoute( [2,1,1,1] );
	},
	SetOline() {
		var i;

		//UNLOGGED

		HomeSideViewOLs.forEach(function(ol){ol.Direction = DIRECTION.E;});
		for (i=0;i<5;++i)
			HomeSideViewOLs[i].Position.Set(165, 220+(10*i));
		HomeSideViewOLs.forEach(function(ol){ol.SetVisible();});
		HomeSideViewOLs.forEach(function(ol){ol.SetExtant();});
	},
	SetDline() {
		var i;

		//UNLOGGED

		VisitorSideViewDEs.forEach(function(de){de.Direction = DIRECTION.W;});
		VisitorSideViewDTs.forEach(function(dt){dt.Direction = DIRECTION.W;});
		VisitorSideViewDEs[0].Position.Set(205, 215);
		VisitorSideViewDEs[1].Position.Set(205, 265);
		VisitorSideViewDTs[0].Position.Set(205, 232);
		VisitorSideViewDTs[1].Position.Set(205, 248);
		VisitorSideViewDEs.forEach(function(de){de.SetVisible();});
		VisitorSideViewDEs.forEach(function(de){de.SetExtant();});
		VisitorSideViewDTs.forEach(function(dt){dt.SetVisible();});
		VisitorSideViewDTs.forEach(function(dt){dt.SetExtant();});
	},
	SetCBs() {

		//UNLOGGED

		VisitorSideViewCBs[0].SetVisible();
		VisitorSideViewCBs[1].SetVisible();
		VisitorSideViewCBs[2].SetVisible();
		VisitorSideViewCBs[0].SetExtant();
		VisitorSideViewCBs[1].SetExtant();
		VisitorSideViewCBs[2].SetExtant();
		VisitorSideViewCBs.forEach(function(cb){cb.Direction = DIRECTION.W;});
		VisitorSideViewCBs[0].SetTarget(HomeSideViewWRs[0]);
		VisitorSideViewCBs[1].SetTarget(HomeSideViewWRs[1]);
		VisitorSideViewCBs[2].SetTarget(HomeSideViewWRs[2]);
	},
	PollSnap() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollSnap.bind(this));

		this.CheckButtons();
		this.UpdateLoad();
		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			HomeSideViewWRs.forEach(function(wr){wr.Snap();});
			this.PlayQBPlay();
		} else
			Mouse.ClearClicks();
	},
	PlayQBPlay() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PlayQBPlay.bind(this));

		this.CheckButtons();

		this.UpdateQBState();
		HomeSideViewWRs.Update();
		HomeSideViewOLs.Update();
		VisitorSideViewDEs.Update();
		VisitorSideViewDTs.Update();
		VisitorSideViewCBs.Update();

		SideViewField.Draw();
		HomeSideViewWRs.forEach(function(wr) {if (wr.CheckVisible()) wr.DrawRoute();});
		this.DemoQBSprite.Draw(this.DemoQBX, 240, this.DemoQBState);
		HomeSideViewWRs.Draw();
		HomeSideViewOLs.Draw();
		VisitorSideViewDEs.Draw();
		VisitorSideViewDTs.Draw();
		VisitorSideViewCBs.Draw();
	},
	UpdateLoad() {

		if (Game.Load) {
			Game.Load = false;
			if (LeagueDataArea.CheckEmpty())
				alert("Please enter data");
			else {
				cancelAnimationFrame(this.AnimationFrameHandle);
				League.Load();
				GridironUtils.SetLeague(League.Type);
				this.Close();
				setTimeout(this.Load.bind(this), 100);
			}
		}
	},
	UpdateQBState() {

		//UNLOGGED

		if (this.State && this.State<12)
	 --this.DemoQBX;

		if (this.Frames) {
	 --this.Frames;
	 return;
		} else {
	 if (this.State<12)
		 this.Frames = 10;
	 else
		 this.Frames = 5;
		}

		switch (this.State) {
	 case 0:
		 this.DemoQBState = 1;
		 HomeSideViewWRs.forEach(function(wr){wr.State.Motion = WR.STATE.RUNNING;});
		 HomeSideViewOLs.forEach(function(ol){ol.State.Motion = OL.STATE.RISING;});
		 VisitorSideViewDEs.forEach(function(de){de.State.Motion = DL.STATE.RISING;});
		 VisitorSideViewDTs.forEach(function(dt){dt.State.Motion = DL.STATE.RISING;});
		 VisitorSideViewCBs.forEach(function(cb){cb.State.Motion = CB.STATE.COVERING;});
		 break;
	 case 1:
		 this.DemoQBState = 2;
		 break;
	 case 2:
		 this.DemoQBState = 1;
		 break;
	 case 3:
		 this.DemoQBState = 0;
		 break;
	 case 4:
		 this.DemoQBState = 3;
		 break;
	 case 5:
		 this.DemoQBState = 4;
		 break;
	 case 6:
		 this.DemoQBState = 3;
		 break;
	 case 7:
		 this.DemoQBState = 0;
		 break;
	 case 8:
		 this.DemoQBState = 1;
		 break;
	 case 9:
		 this.DemoQBState = 2;
		 break;
	 case 10:
		 this.DemoQBState = 1;
		 break;
	 case 11:
		 this.DemoQBState = 0;
		 break;
	 case 12:
		 this.DemoQBState = 5;
		 break;
	 case 13:
		 this.DemoQBState = 6;
		 break;
	 case 14:
		 this.DemoQBState = 7;
		 break;
	 case 15:
		 this.State = -1;
		 this.DemoQBState = 0;
		 this.DemoQBX = 140;
		 break;
		}
		++this.State;
	},
	DrawRoute(route) {

		//UNLOGGED - REDUNDANT

		this.x = 175;
		this.y = 100;
		for (this.i=0;this.i<route.length;++this.i)
	 for (this.j=0;this.j<100;this.j+=20) {
		 this.x += 20*ROUTeVELOCITIES[0][route[this.i]][0];
		 this.y += 20*ROUTeVELOCITIES[0][route[this.i]][1];
		 this.GraphicsTool.DrawCircle(this.x, this.y, 3, "black", 0);
	 }
	},
	Close() {

		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Controls.forEach(function(cntrl) {cntrl.DeActivate();});
		Game.Interface.SuspendInput();
		Mouse.ClearAll();
	},
	OpenLeagueView() {

		LeagueView.Open();
	},
	Load() {	//UNLOGGED

		Teams.forEach(function(team){team.SetFormations(FORMATION.OFF.IfORM, FORMATION.DEF.MM43);});	//TEMP
		TeamView.SetTeam(PlayerTeam);
		TeamView.Open();
		TeamView.Update();
	}
};
