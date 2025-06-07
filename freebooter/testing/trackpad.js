
var TrackPad;  //HACK! (1 of 2) - added since the app has no Track Pad of its own

SolarTesting.prototype.SetTrackpadTest = function() {

	this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.SetTestTrackpad();
	this.SetTrackpadStars();
	this.TestTrackPad.Draw();
	TrackPad = this.TestTrackPad;
	SolarScape.PrimeScape.ActivateTrackPad();  //HACK!
	this.DisplayTrackpadInfo();
	Soundtrack.Play();
};
SolarTesting.prototype.DisplayTrackpadInfo = function() {

	this.TextWriter.SwitchContext(CANVAS.PRIME);

	this.TextWriter.Write("Simple test to see", 5, 350);
	this.TextWriter.Write("functioning of Track", 5, 365);
	this.TextWriter.Write("Pad with respect to", 5, 380);
	this.TextWriter.Write("moving the reticle and", 5, 395);
	this.TextWriter.Write("triggering the fire", 5, 410);
	this.TextWriter.Write("button.", 5, 425);

	this.TextWriter.Write("Slide finger over red", 5, 445);
	this.TextWriter.Write("part to move reticle.", 5, 460);
	this.TextWriter.Write("Click screen or Track", 5, 475);
	this.TextWriter.Write("Pad to fire. Only sound", 5, 490);
	this.TextWriter.Write("is played.", 5, 505);

	this.TextWriter.RestoreContext();
};
SolarTesting.prototype.PlayTrackpadTest = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayTrackpadTest.bind(this));

	this.DrawTrackpadStars();
	this.TestTrackPad.DrawReticle();
	this.DrawTrackpadFrame();
	this.UpdateTestTrackpad();
};
SolarTesting.prototype.SetTestTrackpad = function() {

	this.RETICLeIMAGE = { L: 304, T: 37, W: 19, H: 19 };
	this.TestReticleImage = new GenieImage();
	this.TestReticleImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.RETICLeIMAGE);
	this.TRACKPAD = { L: 150, T: 330, W: 150, H: 150,
							 TRACK: { BOX: { L: 200, T: 380, W: 100, H: 100 }, COLOUR: { BACKGROUND: "red", BORDER: "white" }, LW: 2 },
							 BUTTON: { A: { BOXES: [ { L: 150, T: 375, W: 50, H: 105 }, { L: 150, T: 330, W: 150, H: 50 } ],
										  COLOUR: { BACKGROUND: "blue", BORDER: "white" }, LW: 2 } },
							 RETICLE: { BOX: { L: 0, T: 0, W: 300, H: 300 }, R: 10, RATIO: 1 }
						 };
	this.TestTrackPad = new GenieTrackPad();
	this.TestTrackPad.Set(this.Screen, this.GraphicsTool, this.TRACKPAD, this.TestReticleImage);
};
SolarTesting.prototype.SetTrackpadStars = function() {
	var i;

	this.TrackPadStars = ArrayUtils.Create(20, function() { var X, Y, R; } );
	for (i=0;i<this.TrackPadStars.length;++i) {
		this.TrackPadStars[i].X = 4 + this.Randomizer.GetIndex(292);
		this.TrackPadStars[i].Y = 4 + this.Randomizer.GetIndex(292);
		this.TrackPadStars[i].R = this.Randomizer.GetInRange(1,4);
	}
};
SolarTesting.prototype.DrawTrackpadStars = function() {
	var i;

	this.GraphicsTool.DrawRectangle(0, 0, 300, 300, "black", 0);
	for (i=0;i<this.TrackPadStars.length;++i)
		this.GraphicsTool.DrawCircle(this.TrackPadStars[i].X, this.TrackPadStars[i].Y, this.TrackPadStars[i].R, "white", 0);
};
SolarTesting.prototype.DrawTrackpadFrame = function() {

	this.GraphicsTool.DrawRectangle(0, 0, 300, 300, "white", 2);
};
SolarTesting.prototype.UpdateTestTrackpad = function() {

	if (TrackPad.CheckAPressed()) {
		this.GraphicsTool.DrawCircle(TrackPad.ReticlePoint.X, TrackPad.ReticlePoint.Y, 7, "yellow", 1);
		LaserSound.PlayRewound();
	}
	if (Mouse.CheckClicked(CANVAS.PRIME)) {
		if (SpaceUtils.CheckPointInBox(Mouse.Click, { L: 0, T: 0, W: 300, H: 300 } )) {
			TrackPad.ReticlePoint.Set(Mouse.Click.X, Mouse.Click.Y);
			TrackPad.ReticleStart.Set(TrackPad.ReticlePoint.X, TrackPad.ReticlePoint.Y);
			this.GraphicsTool.DrawCircle(TrackPad.ReticlePoint.X, TrackPad.ReticlePoint.Y, 7, "yellow", 1);
			LaserSound.PlayRewound();
		}
		if (SpaceUtils.CheckPointInBox(Mouse.Click, { L: 150, T: 330, W: 150, H: 150 } )) {
			this.GraphicsTool.DrawCircle(TrackPad.ReticlePoint.X, TrackPad.ReticlePoint.Y, 7, "yellow", 1);
			LaserSound.PlayRewound();
		}
	} else
		Mouse.ClearAll();
};
