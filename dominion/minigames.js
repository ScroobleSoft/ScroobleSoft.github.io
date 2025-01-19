
//---------------------------------------------------
//---------- DOMINION MINI GAMES --------------------
var DominionMiniGames = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var ScreenRect;
	var State, Frames;
	var ToggleFlag, StatusFlag;

	//STRIKE
	var StrikeInterdictorSprite, StrikeInterdictor;
	var TargetImage, TargetLocation;
	var InterdictorLocations, InterdictorWingOffsets;
	var Pulses;

	//ALLIANCES
	var AllianceTurns;
	var ALLIANCeTURnBUTTON, AllianceTurnButton;	//UNLOGGED

	var i, j, x, y, pos, num;
	var t1, t2, t3, t4;
};
DominionMiniGames.prototype = {
	Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
//		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.State = 0;
		this.Frames = 15;
		this.ToggleFlag = true;
		this.StatusFlag = false;

		this.pos = new Coordinate2D();
	},
	Start() {
		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		MiniGamesImage.Draw();
		this.Play();
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		if (Mouse.CheckLeftClicked()) {
			if (MiniGamesImage.CheckClicked()) {
				cancelAnimationFrame(this.AnimationFrameHandle);
				indx = MiniGamesImage.GetMapEntry(CLICKED);
				switch (indx) {
					case MINiGAME.INTERDICTION:
						this.SetInterdictionStrike();
						this.PlayInterdictionStrike();
						break;
					case MINiGAME.ALLIANCES:
						this.SetBasicAlliances();
						this.PlayBasicAlliances();
						break;
				}
			}
		} else {
	 indx = MiniGamesImage.GetMapEntry();
	 if (indx!=-1) {
		 this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
		 this.TextWriter.SwitchContext(CANVAS.ZOOM);
		 this.TextWriter.Write(MiniGameDescriptions[indx], 5, 20);
		 this.TextWriter.RestoreContext();
	 }
		}
	}
};
