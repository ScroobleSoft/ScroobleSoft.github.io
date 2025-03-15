
//----------------------------------------------
//---------- FOOTBALL TESTING ---------------------
var FootballTesting = function() {
	var Screen, InfoBox;
	var GraphicsTool, TextWriter;
//	var CalcPad;
	var Randomizer;
	var ScreenRect;
	var States, Frames;

	//ISOMETRIC

	//BIRD'S EYE MATCH
	var BirdsEyeMatch;

	//STRIKER
	var StrikerDemo;

	//DRIBBLING
	var Winger, FullBack;
	var SideViewPitch;

	//ANIMATION
	var Striker;

	//WING
	var HomeTeam, AwayTeam;
	var HomePlayers, AwayPlayers;
	var Goalkeeper;
	var RightWinger, LeftWinger, Forwards;
	var LeftBack, RightBack, CentreBacks;
	var HomeFormation, AwayFormation;
	var AttackRating, DefenceRating;
	var AttackMidRating, DefenceMidRating;
	var WinningTeam, LosingTeam;			//winning midfield battle per play, that is
	var Delay;					//in reaction of full-back to winger's move
	var Ball;
	var PlayState;
	var Outcome;
	var HomeGoals, AwayGoals, HomeBattlesWon, AwayBattlesWon, HomeAttempts, AwayAttempts, Plays;

	//PITCH

	//GEOMETRIC
	var ScreenQuad;
	var Stanchion1, Stanchion2;

	//SMUDGING
	var LMPosition, RMPosition;
	var LMSpeed, RMSpeed;
	var AnimationState;
	var SkipFlag, RoundFlag, FPS30Flag;

	//PARABOLIC
	var Crosser;

	//FORMATIONS
	var RightFormation, LeftFormation;
	var RightPosition, LeftPosition;

	//FIXTURES
	var Schedule;

	//KITS

	//POSSESSION
	var PossessionMinutes;
	var HomePossession, HomePossessionShots, HomePossessionGoals;
	var AwayPossession, AwayPossessionShots, AwayPossessionGoals;
	var PossessionHomeTeam, PossessionAwayTeam;
	var PossessionHomeRating, PossessionAwayRating;
	var PossessionHomeG, PossessionHomeD, PossessionHomeM, PossessionHomeA;
	var PossessionAwayG, PossessionAwayD, PossessionAwayM, PossessionAwayA;
	var PossessionWins;
	var PossessionHomeBloc, PossessionAwayBloc;
	var PossessionMatchUps;
	var PossessionPositions;

	//CONFORMANCE
	var LeftConformanceFormation, RightConformanceFormation;
	var LeftConformancePosition, RightConformancePosition;
	var LeftGoalDiagram, RightGoalDiagram;
	var LineUpPriority, ConformanceDistances, ConformanceCandidates, ConformedPlayers;

	//DIRECTIONAL
	var DirectionalPlayer;
	var DirectionalDestination;

	//NAMES
	var NameDuplicates, NameIndex;

	//RANDOMIZER
	var FetchedValues;

	var t1, t2, i, x, y, num;
};
FootballTesting.prototype = {
	Set(cntxt, iBox, gTool, tWriter, rGenerator, sRect) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.GraphicsTool = gTool;
//		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
	},
	Start() {
		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		TestingImage.Draw();
		this.Play();
	},
	Play() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		 if (TestingImage.CheckClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.i = TestingImage.GetMapEntry(CLICKED);
			switch (this.i) {
				case TEST.ISOMETRIC:
					this.SetIsometricPitchDisplay();
					this.PlayIsometricPitchDisplay();
					break;
				case TEST.BIRDsEYE:
					this.SetBirdsEyeMatch();
					this.PlayBirdsEyeMatch();
					break;
				case TEST.STRIKER:
				  this.SetStrikerMiniGame();
				  this.PlayStrikerMiniGame();
				  break;
				case TEST.DRIBBLING:
					this.SetDribblingDemo();
					this.PlayDribblingDemo();
					break;
				case TEST.ANIMATION:
					this.SetAnimationDemo();
					this.PlayAnimationDemo();
					break;
				case TEST.WING:
					this.SetWingPlaySim();
					this.PlayWingPlaySim();
					break;
				case TEST.PITCH:
					this.SetSideViewPitchTest();
					this.PlaySideViewPitchTest();
					break;
				case TEST.GEOMETRIC:
					this.SetGeometricPitch();
					this.PlayGeometricPitch();
					break;
				case TEST.SMUDGING:
					this.SetSmudgingTest();
					this.PlaySmudgingTest();
					break;
				case TEST.PARABOLIC:
					this.SetParabolicTest();
					this.PlayParabolicTest();
					break;
				case TEST.FORMATIONS:
					this.SetFormationsDisplay();
					this.PlayFormationsDisplay();
					break;
				case TEST.FIXTURES:
					this.SetFixtureTest();
					this.PlayFixtureTest();
					break;
				case TEST.MATChUPS:
					this.SetMatchUpsTest();
					this.PlayMatchUpsTest();
					break;
				case TEST.SPRITES:
					this.SetSpriteCheck();
					this.PlaySpriteCheck();
					break;
				case TEST.KITS:
					this.SetKitClash();
					this.PlayKitClash();
					break;
				case TEST.POSSESSION:
					this.SetPossessionTest();
					this.PlayPossessionTest();
					break;
				case TEST.CONFORMANCE:
					this.SetFormationConformance();
					this.PlayFormationConformance();
					break;
				case TEST.DIRECTIONAL:
					this.SetDirectionalMovement();
					this.PlayDirectionalMovement();
					break;
				case TEST.NAMES:
					this.SetDuplicateNameTest();
					this.PlayDuplicateNameTest();
					break;
				case TEST.RANDOM:
					this.SetRandomizerTest();
					this.PlayRandomizerTest();
					break;
		 }
	 }
		} else {
	 this.i = TestingImage.GetMapEntry();
	 if (this.i!=-1) {
		 this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
		 this.TextWriter.SwitchContext(CANVAS.ZOOM);
		 this.TextWriter.Write(TestingDescriptions[this.i], 5, 20);
		 this.TextWriter.RestoreContext();
	 }
		}
	},
	SetIsometricPitchDisplay() {
	},
	PlayIsometricPitchDisplay() {

//		this.AnimationFrameHandle = requestAnimationFrame(this.PlayIsometricPitchDisplay.bind(this));

		FootieScape.PrimeScape.Context.fillStyle = "rgb(0,207,0)";
		Match.StartMatch();

		if (Match.Reset)
	 cancelAnimationFrame(this.AnimationFrameHandle);
	},
	ResetIsometricPitchDisplay() {

		//UNLOGGED
/*
		ChaffList.DeActivate();
		Crafts[0].Sparrows[0].SetPosition(Crafts[0].Position);
		Crafts[0].Sparrows[0].Extant = true;
		this.TestChaff();
*/
	},
	SetBirdsEyeMatch() {
		this.BirdsEyeMatch = new ResetMiniGame();
		this.BirdsEyeMatch.Set(this.Screen, this.GraphicsTool, this.TextWriter, this.Randomizer);
	},
	PlayBirdsEyeMatch() {

//		this.AnimationFrameHandle = requestAnimationFrame(this.PlayBirdsEyeMatch.bind(this));

		this.BirdsEyeMatch.Play();
	},
	ResetBirdsEyeMatch() {

		//UNLOGGED

	},
	SetStrikerMiniGame() {
		this.StrikerDemo = new StrikerMiniGame();
		this.StrikerDemo.Set(this.Screen, this.GraphicsTool);
	},
	PlayStrikerMiniGame() {

//		this.AnimationFrameHandle = requestAnimationFrame(this.PlayStrikerMiniGame.bind(this));

		this.StrikerDemo.Play();
	}
};
