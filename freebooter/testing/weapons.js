
SolarTesting.prototype.SetWeaponsTest = function() {
   this.PulseCoords = new Coordinate2D();
   this.PulseCoords.Set(500, 500);
   this.PulseRadius = 30;
   this.State = 0;
	Starfield.Generate();
};
SolarTesting.prototype.PlayWeaponsTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayWeaponsTest.bind(this));

   Starfield.Draw();
   this.DrawPulse();
   if (this.PulseRadius<15)
      cancelAnimationFrame(this.AnimationFrameHandle);
   Cockpit.Draw();
};
SolarTesting.prototype.DrawPulse = function() {
   for (indx=1;indx<=10;++indx)
      this.GraphicsTool.DrawCircle(this.PulseCoords.X, this.PulseCoords.Y, this.PulseRadius*((11-indx)/10), "red", 0, null, null, 0.1*indx);
   this.PulseRadius -= 0.05;
   --this.PulseCoords.X;
   --this.PulseCoords.Y;
};
