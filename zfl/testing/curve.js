
ZFLTesting.prototype.SetBellCurveGrades = function() {

   this.CreateBellCurves();
   this.DisplayCurveGrades();
   this.OutcomeCurve = new Array(30);
   this.DisplayCurveText();
};
ZFLTesting.prototype.DisplayCurveText = function() {

   this.TextWriter.Write("This demo shows how training results end", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("up in 'front loaded' grades.", 5, 55, null, CANVAS.ZOOM);

   this.TextWriter.Write("However, using a bell curve to determine", 5, 75, null, CANVAS.ZOOM);
   this.TextWriter.Write("ultimate grade from 4 years of training", 5, 90, null, CANVAS.ZOOM);
   this.TextWriter.Write("gives a desirable distribution.", 5, 105, null, CANVAS.ZOOM);

   this.TextWriter.Write("Click main screen to see front-loaded", 5, 125, null, CANVAS.ZOOM);
   this.TextWriter.Write("results.", 5, 140, null, CANVAS.ZOOM);

   this.TextWriter.Write("Click Info Box for bell curved grades.", 5, 160, null, CANVAS.ZOOM);
};
ZFLTesting.prototype.PlayBellCurveGrades = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayBellCurveGrades.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.DisplayCurveGrades();
   else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
      this.DisplayCurveOutcomes();
   else
      Mouse.ClearClicks();
};
ZFLTesting.prototype.CreateBellCurves = function() {
      var i, j;
      var start, end;
      var aSlots;

      this.BellCurves = new Array(15);			//potential between 1 and 15
      for (i=1;i<=this.BellCurves.length;++i) {
	 start = 1;
	 end = i;
	 aSlots = new Array(i);
	 aSlots.fill(0);
	 while (start<=end) {
	    for (j=start;j<=end;++j)
	       ++aSlots[j-1];
	    ++start;
	    --end;
	 }
	 this.BellCurves[i-1] = aSlots;
      }
};
ZFLTesting.prototype.DisplayCurveGrades = function() {
   var i;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Heading
   for (i=0;i<22;++i)
      this.TextWriter.Write(Utils.NumberToGrade(i), 50+(25*i), 15);

   this.DisplayCurveChart();
   this.DisplayCurveChart(true);
};
ZFLTesting.prototype.DisplayCurveChart = function(bBell) {
   var i, j, k;
   var grade, potential;
   var aGrades;

   aGrades = new Array(30);
   for (i=0;i<15;++i) {
      if (bBell)
	 this.TextWriter.Write(Utils.NumberToGrade(i+15), 5, 320+((i+1)*15));
      else
	 this.TextWriter.Write(Utils.NumberToGrade(i+15), 5, 20+((i+1)*15));
      aGrades.fill(0);
      for (j=0;j<100;++j) {
	 grade = i + 15;
	 potential = 15;
	 for (k=0;k<4;++k) {
	    if (bBell)
	       potential = this.Randomizer.GetSlot(this.BellCurves[potential-1]) + 1;
	    else
	       potential = this.Randomizer.GetInRange(1, potential);
	    grade -= potential;
	 }
	 if (grade<0)
	    grade = 0;
	 ++aGrades[grade];
      }
      for (j=0;j<30;++j)
	 if (bBell)
	    this.TextWriter.Write(aGrades[j], 50+(25*j), 320+((i+1)*15));
	 else
	    this.TextWriter.Write(aGrades[j], 50+(25*j), 20+((i+1)*15));
   }
};
ZFLTesting.prototype.DisplayCurveOutcomes = function() {
   var i, j;
   var aGrades;
   var outcome;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //Heading
   for (i=0;i<22;++i)
      this.TextWriter.Write(Utils.NumberToGrade(i), 50+(25*i), 15);

   aGrades = Array(30);
   for (i=0;i<15;++i) {
      this.TextWriter.Write(Utils.NumberToGrade(i+15), 5, 20+((i+1)*15));
      this.CreateOutcomeCurve(i+15, 15);
      aGrades.fill(0);
      for (j=0;j<100;++j) {
	 outcome = this.Randomizer.GetSlot(this.OutcomeCurve);
	 ++aGrades[outcome];
      }
      for (j=0;j<22;++j)
	 this.TextWriter.Write(aGrades[j], 50+(25*j), 20+((i+1)*15));
   }
};
ZFLTesting.prototype.CreateOutcomeCurve = function(qlty, ptntl) {
   var i;
   var start, end;

   this.OutcomeCurve.fill(0);
   start = qlty - ptntl;
   end = start;
   while (start>0 || end<qlty) {
      for (i=start;i<=end;++i)
	 ++this.OutcomeCurve[i];
      if (start>0)
	 --start;
      if (end<qlty)
	 ++end;
   }
};
