
//----------------------------------------------
//---------- STEALTH ROBOTS --------------------
var StealthRobots = function () {
	var CalcPad;
	var ScreenRect, ScreenQuad;

	//TEMP - demos
	var MechBots;
	var IonBlaster;
	var Percutter;
};
StealthRobots.prototype = new GenieGame();
StealthRobots.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
	this.ScreenQuad = ArrayUtils.Create(4, Coordinate2D);
	this.Components = new GalleryComponents();
};
StealthRobots.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
};
StealthRobots.prototype.Start = function() {

	if (Game.CheckMobile()) {
		IntroView.Open();
		IntroView.Update();
	} else {
		this.PlayDemo();

		//Set Info Box
		this.InfoBox.fillStyle = "rgb(47,159,255)";
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
		NewGameButton.Show();
		TutorialButton.Show();
		DemoButton.Show();
		MiniGamesButton.Show();

		//Set Control Panel
		this.ControlPanel.fillStyle = "rgb(47,159,255)";
		this.ControlPanel.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);

		this.PollButtons();
	}
};
StealthRobots.prototype.PollButtons = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollButtons.bind(this));

		if (NewGameButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.HideButtons();
	 this.Play();
		}

		if (TutorialButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
		}

		if (DemoButton.CheckClicked()) {
	 this.HideButtons();
	 Demo.Start();
	 cancelAnimationFrame(this.AnimationFrameHandle);
		}

		if (MiniGamesButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.HideButtons();
	 MiniGames.Start();
		}
};
StealthRobots.prototype.HideButtons = function() {

		NewGameButton.Hide();
		TutorialButton.Hide();
		DemoButton.Hide();
		MiniGamesButton.Hide();
};
StealthRobots.prototype.DrawTrack = function(drctn) {

		switch (drctn) {
	 case DIRECTION.N:
		 this.GraphicsTool.DrawRectangle(0, 18, SCREEN.WIDTH,  2, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(0, 20, SCREEN.WIDTH, 40, GREY.LIGHT, 0);
		 this.GraphicsTool.DrawRectangle(0, 60, SCREEN.WIDTH,  2, GREY.MOCHA, 1);
		 break;
	 case DIRECTION.E:
		 this.GraphicsTool.DrawRectangle(SCREEN.WIDTH-62, 0,  2, SCREEN.HEIGHT, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(SCREEN.WIDTH-60, 0, 40, SCREEN.HEIGHT, GREY.LIGHT, 0);
		 this.GraphicsTool.DrawRectangle(SCREEN.WIDTH-20, 0,  2, SCREEN.HEIGHT, GREY.MOCHA, 1);
		 break;
	 case DIRECTION.S:
		 this.GraphicsTool.DrawRectangle(0, SCREEN.HEIGHT-62, SCREEN.WIDTH,  2, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(0, SCREEN.HEIGHT-60, SCREEN.WIDTH, 40, GREY.LIGHT, 0);
		 this.GraphicsTool.DrawRectangle(0, SCREEN.HEIGHT-20, SCREEN.WIDTH,  2, GREY.MOCHA, 1);
		 break;
	 case DIRECTION.W:
		 this.GraphicsTool.DrawRectangle(18, 0,  2, 18, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(20, 0, 40, 18, GREY.LIGHT, 0);
		 this.GraphicsTool.DrawRectangle(60, 0,  2, 18, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(18, 62,  2, SCREEN.HEIGHT-62, GREY.MOCHA, 1);
		 this.GraphicsTool.DrawRectangle(20, 62, 40, SCREEN.HEIGHT-62, GREY.LIGHT, 0);
		 this.GraphicsTool.DrawRectangle(60, 62,  2, SCREEN.HEIGHT-62, GREY.MOCHA, 1);
		 break;
		}
};
StealthRobots.prototype.PlayDemo = function() {

		//UNLOGGED

		this.Screen.fillStyle = GREY.MEDIUM;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.DrawTrack(DIRECTION.N);
		this.DrawTrack(DIRECTION.E);
		this.DrawTrack(DIRECTION.S);
		this.DrawTrack(DIRECTION.W);
		RobotSprite.Draw(22, 100);
		RobotSprite.DrawFlipped(300, 300, FLIPPED.HORIZONTAL);
};
StealthRobots.prototype.Play = function() {
		var i;

//		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		this.SetIonBlasterDemo();
		this.PlayIonBlasterDemo();

		if (this.Reset==true) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Reset = false;
		}
};
StealthRobots.prototype.SetIonBlasterDemo = function() {
		var i;
		var x, y;

		this.MechBots = new AgentArray();
		this.MechBots.Set(5, GenieAgent, INDEXED, null, null, null, { SPEED: 0.5, EXPLOSION: FXlISTs.EXPLOSIONS }, RobotSprite);
		this.MechBots.forEach(function(mbot){mbot.Extant=true;});
		this.MechBots[0].SetPosition( { X: 300, Y: 550 } );
		this.MechBots[0].SetDirection(DIRECTION.N);
		this.IonBlaster = new GalleryIonBlaster();
		this.IonBlaster.Set( { SPEED: 1.0 }, IonOrbSprite);
		this.IonBlaster.SetLinks(this.Randomizer);
		this.IonBlaster.SetPosition( { X: 308, Y: 550 } );
		this.IonBlaster.SetTargets(this.MechBots.GetSubArray(1, 4));

		for (i=0;i<4;++i) {
	 x = 100 + (300*(i % 2)) + this.Randomizer.GetNumberWithinRange(0, 180);
	 y = 50 + (Math.floor(i/2)*100) + this.Randomizer.GetNumberWithinRange(0, 80);
	 this.MechBots[i+1].SetPosition( { X: x, Y: y } );
	 this.MechBots[i+1].SetDirection(DIRECTION.S);
		}
};
StealthRobots.prototype.PlayIonBlasterDemo = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PlayIonBlasterDemo.bind(this));

		this.Screen.fillStyle = "chartreuse";
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		if (this.IonBlaster.Extant) {
	 this.IonBlaster.Draw();
	 this.IonBlaster.Update();
		}
		this.MechBots.forEach(function(mbot){if (mbot.Extant) mbot.Draw();});

		if (this.IonBlaster.CurrentTargetIndex==4) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.TextWriter.Write("Click on screen for Percutter Demo", 200, 400);
	 this.SetPercutterDemo();
		}
};
StealthRobots.prototype.SetPercutterDemo = function() {
		var i;
		var x, y;

		for (i=1;i<=4;++i) {
	 x = 100 + (400*((i-1) % 2));
	 y = 100 + (200*Math.floor((i-1)/2));
	 this.MechBots[i].SetPosition( { X: x, Y: y } );
		}

		this.Percutter = new GalleryPercutter();
		this.Percutter.Set( { SPEED: 0.5 }, PercutterSprite);
		this.Percutter.SetLinks(this.Randomizer);
		this.Percutter.SetPosition( { X: 311, Y: 380 } );

		this.AwaitPercutterPrompt();
};
StealthRobots.prototype.AwaitPercutterPrompt = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.AwaitPercutterPrompt.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Percutter.Fire(this.Percutter.Position);
	 this.PlayPercutterDemo();
		}
};
StealthRobots.prototype.PlayPercutterDemo = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PlayPercutterDemo.bind(this));

		this.Screen.fillStyle = "chartreuse";
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		this.Percutter.Discs.forEach(function(disc){if (disc.Extant) disc.Draw();});
		this.Percutter.Discs.forEach(function(disc){disc.Update();});
		this.MechBots.forEach(function(mbot){if (mbot.Extant) mbot.Draw();});
		this.Percutter.Draw();
		this.Percutter.Update();

		if (this.Percutter.CheckDiscsOffScreen()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.TextWriter.Write("Demo finished", 200, 400);
		}
};
