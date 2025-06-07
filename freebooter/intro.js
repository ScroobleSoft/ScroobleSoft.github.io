
//------------------------------------------
//---------- SOLAR INTRO -------------------
var SolarIntro = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var State;
};
SolarIntro.prototype = {
	Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
//		this.State = 
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		this.CheckButtons();
	},
	CheckButtons() {
		if (NewGameButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.HideButtons();
	 Game.Play();
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
	HideButtons() {
		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();
	}
};
