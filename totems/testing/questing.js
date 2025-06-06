
TollTesting.prototype.SetQuestingDemo = function() {
   this.SetTerrain();
   this.SetScout();
   this.UpdateDarkMap(4, 4);
   this.SetPaths();
};
TollTesting.prototype.SetPaths = function() {
   this.PathsMap = Utilities.Create2DArray(10, 10);

   for (indx=0;indx<2;++indx)
      this.GeneratePath(indx);
};
TollTesting.prototype.GeneratePath = function(drctn) {
   var n1, n2;

   if (drctn)
      switch (this.Randomizer.CheckBoolean()) {
	 case false:		//N
	    n1 = this.Randomizer.GetInRange(0, 9);
	    this.PathsMap[n1][0] = 2;
	    n2 = this.Randomizer.GetInRange(0, 9);
	    this.PathsMap[n2][9] = 1;
	    this.PathsMap[n1+Math.round((n2-n1)/3)][3] = 1;
	    this.PathsMap[n1+Math.round(((n2-n1)*2)/3)][6] = 1;
	    break;
	 case true:		//S
	    n1 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[n1][9] = 2;
	    n2 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[n2][0] = 1;
	    this.PathsMap[n1+Math.round((n2-n1)/3)][3] = 1;
	    this.PathsMap[n1+Math.round(((n2-n1)*2)/3)][6] = 1;
	    break;
      }
   else
      switch (this.Randomizer.CheckBoolean()) {
	 case false:		//E
	    n1 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[9][n1] = 2;
	    n2 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[0][n2] = 1;
	    this.PathsMap[3][n1+Math.round((n2-n1)/3)] = 1;
	    this.PathsMap[6][n1+Math.round(((n2-n1)*2)/3)] = 1;
	    break;
	 case true:		//W
	    n1 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[n1][0] = 2;
	    n2 = this.Randomizer.GetInRange(0,9);
	    this.PathsMap[n2][9] = 1;
	    this.PathsMap[3][n1+Math.round((n2-n1)/3)] = 1;
	    this.PathsMap[6][n1+Math.round(((n2-n1)*2)/3)] = 1;
	    break;
      }
};
TollTesting.prototype.PlayQuestingDemo = function() {

   //UNLOGGED

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayQuestingDemo.bind(this));

   this.DrawTerrain();
   this.DrawPaths();
   this.Scout.Draw();

   if (Mouse.CheckLeftClicked())
      this.ProcessMouseClick();
};
TollTesting.prototype.DrawPaths = function() {
   for (coords.X=0;coords.X<10;++coords.X)
      for (coords.Y=0;coords.Y<10;++coords.Y)
	 if (this.PathsMap[coords.X][coords.Y])
	    if (this.DarkMap[coords.X][coords.Y])
	       switch (this.PathsMap[coords.X][coords.Y]) {
		  case 1:
		     this.GraphicsTool.DrawDiamond((coords.X*MAP.TILE.W)+30, (coords.Y*MAP.TILE.H)+30, 20, "red", 0);
		     break;
		  case 2:
		     this.GraphicsTool.DrawCircle((coords.X*MAP.TILE.W)+30, (coords.Y*MAP.TILE.H)+30, 20, "grey", 0);
		     break;
	       }
};
