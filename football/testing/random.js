
FootballTesting.prototype.SetRandomizerTest = function() {

   this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   this.FetchedValues = new Array(1280);
	
   this.DisplayRandomizerInfo();
};
FootballTesting.prototype.DisplayRandomizerInfo = function() {

   this.InfoBox.fillStyle = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.SetContext(this.InfoBox);

   this.TextWriter.Write("This is another Randomizer", 5, 20);
   this.TextWriter.Write("examination, designed as a", 5, 35);
   this.TextWriter.Write("visual perusal of the", 5, 50);
   this.TextWriter.Write("results to see if reasons", 5, 65);
   this.TextWriter.Write("for its hanging can be", 5, 80);
   this.TextWriter.Write("spotted.", 5, 95);

   this.TextWriter.Write("Keep clicking the main", 5, 115);
   this.TextWriter.Write("screen to see fetches.", 5, 130);

   this.TextWriter.Write("Nothing apparent as", 5, 150);
   this.TextWriter.Write("such.", 5, 165);

   this.TextWriter.ResetContext();
};
FootballTesting.prototype.PlayRandomizerTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayRandomizerTest.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.DisplayRandomizerFetches();
   else
      Mouse.ClearClicks();
};
FootballTesting.prototype.DisplayRandomizerFetches = function() {
   var i;
	var x, y;

   this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Fill array
   for (i=0;i<this.FetchedValues.length;++i)
		this.FetchedValues[i] = this.Randomizer.GetIndex(100);

   for (i=0;i<this.FetchedValues.length;++i) {
		x = 5 + (25*Math.floor(i/40));
		y = 15 + (15*Math.floor(i % 40));
		this.TextWriter.Write(this.FetchedValues[i], x, y);
	}
};
