
//------------------------------------------
//---------- GENIE GAME --------------------
var GenieGame = function () {
	var Interface;
	var Screen, InfoBox, ControlPanel, Ticker, Tabloid;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var View;
	var Components;
	var Settings, Level, Type;			//NOTE: .Type is mostly for random/scheduled etc.
	var AnimationFrameHandle;
};
GenieGame.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console.Context;
		if ( (Game.Settings & GAME.PLATFORM.TABLET) || (Game.Settings & GAME.PLATFORM.PC) ) {	//TODO: DUBIOUS!! (where are .Settings being set?)
			this.Ticker = this.Interface.Dashboard.Context;
			this.Tabloid = this.Interface.HelpDeck.Context;
		}
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.Settings = 0;
		this.Level = 0;
	},
	CheckImagesLoaded() {

		this.AnimationFrameHandle = requestAnimationFrame(this.CheckImagesLoaded.bind(this));

		if (ImageManager.AllLoaded) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.SetComponents();
			this.Start();
		}
	},
	Start() {

		Intro.Start();
	},
	SetView(view) {

		this.View = view;
	},
	SetDaily(date) {
		var dt;

		dt = new Date();
		this.Randomizer.SetDailySeed(dt);
		Calendar.SetBaseDate(date);
	},
	ShowButtons() {  //REDUNDANT

		this.InfoBox.fillStyle = "rgb(47,159,255)";
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

		NewGameButton.Show();
		TutorialButton.Show();
		DemoButton.Show();
		MiniGamesButton.Show();
	},
	PollButtons() {  //REDUNDANT

		this.AnimationFrameHandle = requestAnimationFrame(this.PollButtons.bind(this));

		if (NewGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			this.Start();
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
	},
	HideButtons() {  //REDUNDANT

		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();
	},
	Pause() {

		this.Settings += GAME.STATE.PAUSED;
	},
	Resume() {

		this.Settings -= GAME.STATE.PAUSED;
	},
	CheckPaused() {

		return (this.Settings & GAME.STATE.PAUSED);
	},
	CheckExpanded() {

		return (this.Settings & GAME.SCREEN.EXPANDED);
	},
	CheckFullScreen() {

		return (this.Settings & GAME.SCREEN.FULL);
	},
	CheckTouchScreen() {

		return (this.Settings & GAME.CONTROLLER.TOUCHSCREEN);
	},
	CheckTrackPad() {

		return (this.Settings & GAME.CONTROLLER.TRACKPAD);
	},
	SwitchFogOfWarOn() {

		this.Settings += GAME.FOgOfWAR;
	},
	SwitchFogOfWarOff() {

		this.Settings -= GAME.FOgOfWAR;
	},
	CheckFogOfWar() {

		return (this.Settings & GAME.FOgOfWAR);
	},
	SetTiled() {

		this.Settings += GAME.TILED;
	},
	CheckTiled() {

		return (this.Settings & GAME.TILED);
	},
	SetMobile() {

		this.Settings = GAME.PLATFORM.PHONE;

		SCREEN.WIDTH = SCREEN.MOBILE.W;
		SCREEN.HEIGHT = SCREEN.MOBILE.H;
		INFoBOX.WIDTH = INFoBOX.MOBILE.W;
		INFoBOX.HEIGHT = INFoBOX.MOBILE.H;
		CONTROlPANEL.WIDTH = CONTROlPANEL.MOBILE.W;
		CONTROlPANEL.HEIGHT = CONTROlPANEL.MOBILE.H;
	},
	CheckMobile() {

		return (this.Settings & GAME.PLATFORM.PHONE);
	},
	CheckPC() {  //UNLOGGED - this could change when approach to tablets is decided (tablets can be called PC's too)

		return (!this.CheckMobile());
	},
	CheckDesktop() {  //UNLOGGED - desktop only, not tablet

		//-
	}
};
