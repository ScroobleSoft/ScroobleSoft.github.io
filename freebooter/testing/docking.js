
SolarTesting.prototype.SetDockingDemo = function() {
   this.ShipPosition = { X: 300, Y: 300 };
   this.State = 0;
   this.Frames = 120;
	Starfield.Generate();
};
SolarTesting.prototype.PlayDockingDemo = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayDockingDemo.bind(this));

   Starfield.Draw();
   this.DrawStationChannels();
   if (this.State)
      this.DrawTractorBeam();
   TouristSprite.DrawCentred(this.ShipPosition.X, this.ShipPosition.Y);
   this.DrawStationChutes();
   this.UpdateDocking();

   if (this.State==2)
      cancelAnimationFrame(this.AnimationFrameHandle);
};
SolarTesting.prototype.DrawStationChannels = function() {

   //Draw platform
   coords.X = SCREEN.WIDTH/2;
   coords.Y = (2.5*SCREEN.HEIGHT) - 100;
	    this.Screen.fillStyle = "lightgray";
   this.Screen.beginPath();
   this.Screen.moveTo(0, SCREEN.HEIGHT);
   this.Screen.lineTo(0, 552);
	    this.Screen.arc(coords.X, coords.Y, 1.5*SCREEN.HEIGHT, 1.35*Math.PI, 1.65*Math.PI);
   this.Screen.lineTo(SCREEN.WIDTH, SCREEN.HEIGHT);
	    this.Screen.fill();
   this.Screen.closePath();

   //Draw channels
   for (indx=0;indx<ChannelLengths.length;++indx) {
      coords.X = 29 + (60*indx);
      coords.Y = ChannelLengths[indx];
      coords2.X = coords.X;
      coords2.Y = SCREEN.HEIGHT - 1;
      this.GraphicsTool.DrawLine(coords, coords2, GREY.MEDIUM, 1);
      ++coords.X;
      ++coords2.X;
      this.GraphicsTool.DrawLine(coords, coords2, "white", 1);		//left side
      coords.X = SCREEN.WIDTH - coords.X;
      coords2.X = SCREEN.WIDTH - coords2.X;
      this.GraphicsTool.DrawLine(coords, coords2, GREY.MEDIUM, 1);
      ++coords.X;
      ++coords2.X;
      this.GraphicsTool.DrawLine(coords, coords2, "white", 1);		//right side
   }
};
SolarTesting.prototype.DrawStationChutes = function() {

   //Draw chutes
   for (indx=0;indx<ChannelLengths.length;++indx) {
      coords.X = 30 + (60*indx);
      coords.Y = ChannelLengths[indx];
      StationChuteImage.DrawPatch(coords.X+1, coords.Y+1, 0, 0, 58, SCREEN.HEIGHT-ChannelLengths[indx]);		//left side
      coords.X = SCREEN.WIDTH - coords.X;
      coords.X += 2;
      if (indx<(ChannelLengths.length-1))
	 StationChuteImage.DrawPatch(coords.X-59, coords.Y+1, 0, 0, 58, SCREEN.HEIGHT-ChannelLengths[indx]);		//right side
   }

   //Draw bookend chutes
   StationChuteImage.DrawPatch(0, 558, 29, 0, 29, 42);
   StationChuteImage.DrawPatch(572, 558, 0, 0, 29, 42);
};
SolarTesting.prototype.UpdateDocking = function() {
   switch (this.State) {
      case 0:
	 --this.Frames;
	 if (!this.Frames)
	    ++this.State;
	 break;
      case 1:
	 ++this.ShipPosition.Y;
	 if (this.ShipPosition.Y==575)
	    ++this.State;
	 break;
   }
};
SolarTesting.prototype.DrawTractorBeam = function() {  //NOTE: the circle-rectangle overlap is too noticable, so may need to use an image instead
   this.GraphicsTool.DrawCircle(this.ShipPosition.X, this.ShipPosition.Y, 30, "yellow", 0, null, null, 0.5);
   this.GraphicsTool.DrawRectangle(290, this.ShipPosition.Y, 20, SCREEN.HEIGHT-this.ShipPosition.Y, "yellow", 0, null, null, 0.5);
};
