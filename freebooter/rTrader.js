
//--------------------------------------------
//---------- ROGUE TRADER --------------------
var RogueTrader = function () {
	var CalcPad;

	//TEMP
	var EnterStarStile;
	var PlanetRotation;
};
RogueTrader.prototype = new GenieGame();
RogueTrader.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.Components = new SolarComponents();

	//TEMP
	this.EnterStarStile = false;
};
RogueTrader.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer);
};
RogueTrader.prototype.Start = function() {
/*
		Intro.Play();
*/
//		if (Game.CheckMobile()) {
		if (this.Settings & GAME.PLATFORM.PHONE) {
//			Starfield.Generate();
//			this.PlayMobile();
			IntroView.Open();
		} else {
			this.Frames = 0;
			this.PlanetRotation = 0;
			this.DisplayIntroText();
		}
};
RogueTrader.prototype.PlayMobile = function() {  //currently REDUNDANT

		this.AnimationFrameHandle = requestAnimationFrame(this.PlayMobile.bind(this));

		Starfield.Draw();
		Cockpit.Draw();
		Starfield.Update();

		SolarSystem.Draw();
		SolarSystem.Update();
};
RogueTrader.prototype.Play = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

		SolarSystem.Draw();
		SolarSystem.Update();

		if (SolarSystem.SelectedPlanet) {
//	 this.ControlPanel.PlanetName.Write(ElitePlanetNames[EliteSolarSystem.SelectedPlanet.Index], 10, 20);
//	 SolarSystem.SelectedPlanet.Draw(this.Frames/this.PlanetRotationSpeed);
	 Starfield.Draw();
	 SolarSystem.SelectedPlanet.Draw(this.PlanetRotation);
	 ++this.PlanetRotation;
	 if (this.PlanetRotation>=800)
		 this.PlanetRotation = 0;
		}

		if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
	 if (SolarSystem.CheckPlanetClicked())
		 SolarSystem.SelectedPlanet.DrawInBuffer();  //TODO: check if this step is redundant (same planet is clicked on)

		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.Launch();
			Starfield.Generate();
		}
};
RogueTrader.prototype.DisplayIntroText = function() {

		this.TextWriter.SetContext(this.InfoBox);

		this.TextWriter.Write("Click 'Start' to see Solar System in", 5, 20);
		this.TextWriter.Write("Info Box.", 5, 35);

		this.TextWriter.Write("Click on a planet to see it rotating", 5, 60);
		this.TextWriter.Write("on the Main Screen.", 5, 75);

		this.TextWriter.Write("Click the main screen to see launch", 5, 100);
		this.TextWriter.Write("sequence.", 5, 115);

		this.TextWriter.Write("Click again to access StarStile.", 5, 140);

		this.TextWriter.Write("Click 'Load' for mini-game", 5, 165);

		this.TextWriter.RestoreContext();
};
RogueTrader.prototype.Launch = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Launch.bind(this));

		Starfield.Draw();
		StarStile.Draw();
		Cockpit.Draw();
		StarStile.Update();

		++this.Frames;

		//Stop when hexagon size==SCREEN.WIDTH
		if (this.Frames==300) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Journey();
		}
};
RogueTrader.prototype.Journey = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Journey.bind(this));

		Starfield.Draw();
		Cockpit.Draw();
		Starfield.Update();

		if (Mouse.CheckLeftClicked()) {
	 this.EnterStarStile = true;
	 SelectedPlanet = Planets[this.Randomizer.GetNumberWithinRange(0, PLANET.COUNT-1)];
	 SelectedPlanet.Selected = true;
	 SelectedPlanet.DrawInBuffer();
	 this.Frames = 0;
	 this.TextWriter.Write("Click Screen to enter StarStile", 5, 20, null, CANVAS.CONSOLE);
		}

		if (this.EnterStarStile) {
	 StarStile.DrawReverseEntry();
	 StarStile.UpdateReverseEntry();
	 ++this.Frames;
		}

		if (this.Reset || this.Frames==200) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Reset = false;
		}
};
RogueTrader.prototype.SetMobile = function() {
	GenieGame.prototype.SetMobile.call(this);

		//TEMP: this part to be removed after switch to GenieGame derivation
		/*
		this.Settings = GAME.PLATFORM.PHONE;

		SCREEN.WIDTH = SCREEN.MOBILE.W;
		SCREEN.HEIGHT = SCREEN.MOBILE.H;
		INFoBOX.WIDTH = INFoBOX.MOBILE.W;
		INFoBOX.HEIGHT = INFoBOX.MOBILE.H;
		CONTROlPANEL.WIDTH = CONTROlPANEL.MOBILE.W;
		CONTROlPANEL.HEIGHT = CONTROlPANEL.MOBILE.H;
		*/
		//end TEMP

	STARFIELD.W = SCREEN.WIDTH;
	STARFIELD.H = SCREEN.HEIGHT;
	STARFIELD.STARS = 65;

	COCKPIT.W = SCREEN.WIDTH;
	COCKPIT.H = SCREEN.HEIGHT;
};
