
//---------------------------------------------
//---------- FOOTBALL INTRO -------------------
var FootballIntro = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var ScreenRect;
	var AnimationFrameHandle;
	var State;
};
FootballIntro.prototype = {
	Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.State = 0;
	},
	Start() {

		this.ScreenRect.L = (PITCH.SIDeVIEW.W-SCREEN.WIDTH)/2;
		this.ScreenRect.T = 30;
		this.ScreenRect.W = SCREEN.WIDTH;
		this.ScreenRect.H = PITCH.SIDeVIEW.H;
		this.SetSideViewPositions();
		Game.SetPerspective();
		this.SetTeamsAndPlayers();
		this.DrawMatchAssets();
		this.DisplayIntroText();

		this.ShowButtons();
		this.Play();
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		this.CheckButtons();
	},
	ShowButtons() {

		//Info Box
		this.InfoBox.fillStyle = "rgb(47,159,255)";
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
		NewGameButton.Show();
		TutorialButton.Show();
		DemoButton.Show();
		MiniGamesButton.Show();

		//Control Panel
		this.ControlPanel.fillStyle = "rgb(47,159,255)";
		this.ControlPanel.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);
		FeaturedGameButton.Show();
		this.TextWriter.Write("Featured: (F1)", 100, 15, { FONT: "14px Arial", COLOUR: "rgb(000,000,127)" }, CANVAS.CONSOLE);
		DailyGameButton.Show();
		this.TextWriter.Write("Daily: (D1)", 100, 115, { FONT: "14px Arial", COLOUR: "rgb(000,000,127)" }, CANVAS.CONSOLE);
		WeeklyGameButton.Show();
		this.TextWriter.Write("Weekly: (W1)", 100, 215, { FONT: "14px Arial", COLOUR: "rgb(000,000,127)" }, CANVAS.CONSOLE);
		RandomGameButton.Show();
		this.TextWriter.Write("Random", 100, 315, { FONT: "14px Arial", COLOUR: "rgb(000,000,127)" }, CANVAS.CONSOLE);
	},
	CheckButtons() {

		if (NewGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Game.Type = FOOTBALL.TYPE.CUSTOM;
			Game.Start();
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

		if (FeaturedGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Game.Type = FOOTBALL.TYPE.FEATURED;
			this.Randomizer.Seed1 = FOOTBALL.SEEDS.FEATURED.A;
			this.Randomizer.Seed2 = FOOTBALL.SEEDS.FEATURED.B;
			LeagueView.Open();
		}

		if (DailyGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Game.Type = FOOTBALL.TYPE.DAILY;
			this.Randomizer.Seed1 = FOOTBALL.SEEDS.DAILY.A;
			this.Randomizer.Seed2 = FOOTBALL.SEEDS.DAILY.B;
			LeagueView.Open();
		}

		if (WeeklyGameButton.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.HideButtons();
			Game.Type = FOOTBALL.TYPE.WEEKLY;
			this.Randomizer.Seed1 = FOOTBALL.SEEDS.WEEKLY.A;
			this.Randomizer.Seed2 = FOOTBALL.SEEDS.WEEKLY.B;
			LeagueView.Open();
		}

		if (RandomGameButton.CheckClicked()) {
		}
	},
	HideButtons() {

		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();

		FeaturedGameButton.Hide();
		DailyGameButton.Hide();
		WeeklyGameButton.Hide();
		RandomGameButton.Hide();
	},
	DisplayIntroText() {

		//UNLOGGED

		this.Screen.fillStyle = "yellow";
		this.Screen.fillRect(0, 400, SCREEN.WIDTH, 200);

		this.TextWriter.Write("Welcome to Straticade Football.", 200, 440, { FONT: "18px Arial", COLOUR: "blue" } );

		this.TextWriter.Write("Differences from actual football:", 20, 460);
		this.TextWriter.Write("1. Co-ed.", 20, 475);
		this.TextWriter.Write("2. Median match score is 3-3 (6 goals in all on average).", 20, 490);
		this.TextWriter.Write("3. No player injured for more than 2 consecutive matches.", 20, 505);
		this.TextWriter.Write("4. A substitution allowed after every 15 minutes.", 20, 520);
		this.TextWriter.Write("5. Penalty corners.", 20, 535);
		this.TextWriter.Write("6. Transfer fees capped at 10M.", 20, 550);
		this.TextWriter.Write("7. No sendings-off.", 20, 565);

		this.TextWriter.Write("Future enhancements:", 400, 460);
		this.TextWriter.Write("1. Proper game simulation.", 400, 475);
		this.TextWriter.Write("2. Morale management.", 400, 490);
		this.TextWriter.Write("3. Detailed tactics.", 400, 505);
	},
	DrawMatchAssets() {

		this.Screen.fillStyle = GREEN.TWO;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, 400);
		Testing.DrawMarkings();
		PerspectiveUtils.DetermineQuad(this.ScreenRect.L+(this.ScreenRect.W/2), PITCH.B/2);
//		SideViewPitch.Draw();
//		HomeSideViewPlayers.forEach(function(plyr){if (plyr.CheckOnScreen()) plyr.Draw();});
//		AwaySideViewPlayers.forEach(function(plyr){if (plyr.CheckOnScreen()) plyr.Draw();});
		HomeSideViewPlayers.forEach(function(plyr){plyr.Draw();});
		AwaySideViewPlayers.forEach(function(plyr){plyr.Draw();});
	},
	SetSideViewPositions() {
		var i;
		var frmtn;

		HomeSideViewPlayers.forEach(function(plyr){plyr.Direction = DIRECTION.E;});
		AwaySideViewPlayers.forEach(function(plyr){plyr.Direction = DIRECTION.W;});
		coords.Set(18, 540);
		HomeSideViewPlayers[0].SetPosition(coords);
		coords.X = 1982;
		AwaySideViewPlayers[0].SetPosition(coords);
		AwaySideViewPlayers[0].Direction = DIRECTION.W;
		frmtn = this.Randomizer.GetIndex(FORMATION.TYPES);
		for (i=1;i<MATCH.PLAYERS;++i) {
			coords.X = PITCH.SIDeVIEW.ZONE.W * (FormationZones[frmtn][i][0]+3.5);
			coords.X += 40;
			coords.Y = PITCH.SIDeVIEW.ZONE.H * (FormationZones[frmtn][i][1]+1.5);
//			coords.Y += Math.round((SIDeVIEwFOOTBALlPITCH.HEIGHT/PITCH.B)*PITCH.SIDeVIEW.T);		//HACK!!
			HomeSideViewPlayers[i].SetPosition(coords);
			AwaySideViewPlayers[i].Position.X = 1600 - HomeSideViewPlayers[i].Position.X;
			AwaySideViewPlayers[i].Position.Y = HomeSideViewPlayers[i].Position.Y;
		}
	},
	SetTeamsAndPlayers() {
		var i;
		var player;
		var iTeams;
		var quality;

		iTeams = new Array(2);
		this.Randomizer.GetUniqueIndices(iTeams, 2, LEAGUE.TEAMS);
		HomeSideViewPlayers.forEach(function(plyr){plyr.SetTeam(Teams[iTeams[0]]);});
		HomeSideViewPlayers.forEach(function(plyr){plyr.Direction = DIRECTION.E;});
		AwaySideViewPlayers.forEach(function(plyr){plyr.SetTeam(Teams[iTeams[1]]);});
		AwaySideViewPlayers.forEach(function(plyr){plyr.Direction = DIRECTION.W;});
		player = new FootballPlayer();
		player.Set(this.Randomizer);
		for (i=0;i<MATCH.PLAYERS;++i) {
	 player.GenerateName();
	 player.GenerateAppearance();
	 quality = this.Randomizer.GetIndex(8);
	 HomeSideViewPlayers[i].SetUnit( { Name: { Last: player.Name.Last }, Appearance: player.Appearance, Quality: quality } );
	 player.GenerateName();
	 player.GenerateAppearance();
	 quality = this.Randomizer.GetIndex(8);
	 AwaySideViewPlayers[i].SetUnit( { Name: { Last: player.Name.Last }, Appearance: player.Appearance, Quality: quality } );
		}
	}
};
