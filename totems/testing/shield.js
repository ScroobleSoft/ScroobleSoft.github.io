
TollTesting.prototype.SetShieldDepletion = function() {
   this.Opacities = new Array(16);
   for (indx=1;indx<=16;++indx)
      this.Opacities[indx-1] = indx/16;
   this.Frames = 0;
   this.AverageFrames = 0;
   this.FramesArray = new Array(1000);
};
TollTesting.prototype.PlayShieldDepletion = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayShieldDepletion.bind(this));

   this.Screen.fillStyle = BATTLeFIELD.COLOUR;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   //EXPERIMENT - check to see if altering opacity affects speed (RESULT: doesn't seem to, except for one anomaly
   this.t1 = performance.now();

   for (indx=0;indx<12;++indx)
      for (indx2=0;indx2<16;++indx2)
	 this.GraphicsTool.DrawRectangle(20+(30*indx2), 20+(40*indx), 30, 30, ClanColours[6][0], 0, this.Opacities[indx2]);
//	 this.GraphicsTool.DrawRectangle(20+(30*indx2), 20+(40*indx), 30, 30, ClanColours[6][0], 0);

   this.t2 = performance.now();

   ++this.Frames;
   this.FramesArray[this.Frames] = this.t2 - this.t1;
   this.AverageFrames += this.FramesArray[this.Frames];
   if (this.Frames==1000) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      this.AverageFrames /= 1000;
   }
};
