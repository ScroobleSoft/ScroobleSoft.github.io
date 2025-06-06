
TollTesting.prototype.SetWaterwayGeneration = function() {

   //UNLOGGED

};
TollTesting.prototype.PlayWaterwayGeneration = function() {

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlayWaterwayGeneration.bind(this));

   this.Screen.fillStyle = MAP.COLOUR;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.DrawWaterways();
};
TollTesting.prototype.DrawWaterways = function() {
   for (indx=0;indx<36;++indx) {		//NOTE: picking 36 points to start with
      coords.X = 18*((indx%6)+1);
      coords.Y = 18*(Math.floor(indx/6)+1);
      for (indx2=0;indx2<4;++indx2)		//canals are spawned in all 4 directions
	 this.DrawWaterway(coords.X, coords.Y, indx2);
   }
};
TollTesting.prototype.DrawWaterway = function(x, y, direction) {
   this.Length = this.Randomizer.GetInRange(1, 18);
   this.Tiles = 0;
   while (this.Tiles<this.Length && x>=0 && x<120 && y>=0 && y<120) {
      this.GraphicsTool.DrawRectangle(5*x, 5*y, 5, 5, PAINT.SEA, 0);
      switch (direction) {
	 case 0:
	    --y;
	    break;
	 case 1:
	    --x;
	    break;
	 case 2:
	    ++y;
	    break;
	 case 3:
	    --x;
	    break;
      }
      ++this.Tiles;
   }
};
