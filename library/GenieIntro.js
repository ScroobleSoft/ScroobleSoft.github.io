
//------------------------------------------
//---------- GENIE INTRO -------------------
var GenieIntro = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var Ticker, Tabloid;
	var GraphicsTool, TextWriter, Randomizer;
	var ScreenRect;
	var State, Frames;
	var AnimationFrameHandle;
};
GenieIntro.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator, sRect) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console.Context;
		this.Ticker = this.Interface.Dashboard.Context;
		this.Tabloid = this.Interface.HelpDeck.Context;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.State = 0;
	},
	SetSupplemental(tckr, tbld) {
		
		this.Ticker = tckr;
		this.Tabloid = tbld;
	},
	Start() {

		this.ShowButtons();
		this.PollButtons();
	},
	ShowButtons() {

		this.InfoBox.fillStyle = "rgb(47,159,255)";
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

		NewGameButton.Show();
		TutorialButton.Show();
		DemoButton.Show();
		MiniGamesButton.Show();
	},
	PollButtons() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollButtons.bind(this));

		if (NewGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			setTimeout(this.StartGame.bind(this), 100);
		}

		if (TutorialButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			setTimeout(this.StartMiniGames.bind(this), 100);
		}

		if (DemoButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			setTimeout(this.StartMiniGames.bind(this), 100);
		}

		if (MiniGamesButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			setTimeout(this.StartMiniGames.bind(this), 100);
		}
	},
	HideButtons() {

		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();
	},
	StartGame() {

		this.ClearInput();
		Game.Start();
	},
	StartTutorial() {

		this.ClearInput();
		Tutorial.Start();
	},
	StartDemo() {

		this.ClearInput();
		Demo.Start();
	},
	StartMiniGames() {

		this.ClearInput();
		MiniGames.Start();
	},
	ClearInput() {

		Mouse.ClearAll();
		if (Game.CheckTouchScreen())
			TouchScreen.ClearAll();
		if (Game.CheckTrackPad())
			TrackPad.ClearAll();
	}
};
