
SolarTesting.prototype.SetOrbTest = function() {

	this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.SetOrbComponents();
	this.SetTestOrb();
	this.DisplayOrbsInfo();
	Starfield.Generate();
};
SolarTesting.prototype.DisplayOrbsInfo = function() {

	this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.TextWriter.SetContext(this.InfoBox);

	this.TextWriter.Write("A visual test to see", 5, 20);
	this.TextWriter.Write("how orbs look travelling", 5, 35);
	this.TextWriter.Write("towards the cockpit.", 5, 50);

	this.TextWriter.Write("Note that a buffer is", 5, 70);
	this.TextWriter.Write("used.", 5, 85);

	this.TextWriter.RestoreContext();
};
SolarTesting.prototype.PlayOrbTest = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayOrbTest.bind(this));

	Starfield.Draw();
	this.DisplayBufferedOrb();
	Cockpit.Draw();

	Starfield.Update();
	this.UpdateTestOrb();
};
SolarTesting.prototype.SetOrbComponents = function() {

	this.OrbBuffer = new GenieBuffer();
	this.OrbBuffer.Set( { WIDTH: 120, HEIGHT: 120 } );
	this.OrbCoords = new Coordinate2D();
};
SolarTesting.prototype.SetTestOrb = function() {

	this.OrbDistance = 50;
	do {
		this.OrbCoords.X = (SCREEN.WIDTH/2) - this.Randomizer.GetIndex(SCREEN.WIDTH);
		this.OrbCoords.Y = (SCREEN.HEIGHT/2) - this.Randomizer.GetIndex(SCREEN.HEIGHT);
	} while (this.OrbCoords.X>-10 && this.OrbCoords.X<10 && this.OrbCoords.Y>-10 && this.OrbCoords.Y<10);
	this.OrbColour = RainbowColours[this.Randomizer.GetIndex(RainbowColours.length)];
	this.BufferOrb(this.OrbColour);
	this.Frames = 180;
};
SolarTesting.prototype.BufferOrb = function(colour) {
	var i;
	var rds, iRds, oRds;
	var grdnt;

	this.OrbBuffer.Context.clearRect(0, 0, this.OrbBuffer.Canvas.width, this.OrbBuffer.Canvas.height);
	this.GraphicsTool.SwitchContext(this.OrbBuffer.Context);
	rds = 50;
	iRds = 0;
	oRds = 50;
	grdnt = this.OrbBuffer.Context.createRadialGradient(60, 60, iRds, 60, 60, oRds);
	grdnt.addColorStop(0, 'white');
	grdnt.addColorStop(1, colour);		//black for radiating light effect
	this.OrbBuffer.Context.arc(60, 60, rds, 0, 2*Math.PI);
	this.OrbBuffer.Context.fillStyle = grdnt;
	this.OrbBuffer.Context.fill();
	this.GraphicsTool.RestoreContext();
};
SolarTesting.prototype.DisplayBufferedOrb = function() {

	this.OrbScale = 1 / this.OrbDistance;
	this.x = 200 + ((1-this.OrbScale)*60);
	this.y = 200 + ((1-this.OrbScale)*60);
	this.Screen.drawImage(this.OrbBuffer.Canvas, 0, 0, 120, 120, this.x, this.y, this.OrbScale*120, this.OrbScale*120);
};
SolarTesting.prototype.UpdateTestOrb = function() {

	this.OrbDistance -= 0.1;
	if (this.OrbDistance<=1) {
		--this.Frames;
		this.OrbDistance = 1;
		if (!this.Frames)
			this.SetTestOrb();
	}
};
