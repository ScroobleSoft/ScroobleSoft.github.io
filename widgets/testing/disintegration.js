
GalleryTesting.prototype.SetDisintegrationDemo = function() {
   this.SetWimp();
   this.SetSurface();
   this.SetBuffer();
   this.DotArray = new Array(18*17);
   this.Randomizer.GetUniqueNumbers(this.DotArray, 18*17, 18*17, STARtAtZERO);
   indx = 0;
   this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
};
GalleryTesting.prototype.SetBuffer = function() {
   this.Buffer = new GenieBuffer();
   this.Buffer.Set();
   this.Wimp.Sprite.Context = this.Buffer.Context;
   this.Wimp.SetPosition( { X: 0, Y: 33 } );
   this.Wimp.Draw();
};
GalleryTesting.prototype.PlayDisintegrationDemo = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayDisintegrationDemo.bind(this));

   this.DrawPlantBase();
   this.Screen.drawImage(this.Buffer.Canvas, 382, 183);

   this.UpdateBuffer();

   ++indx;
   if (indx==(18*17))
      cancelAnimationFrame(this.AnimationFrameHandle);
};
GalleryTesting.prototype.UpdateBuffer = function() {
   coords.X = 2*(this.DotArray[indx] % 18);
   coords.Y = 2*Math.floor(this.DotArray[indx]/18);
   this.Buffer.Context.clearRect(coords.X, coords.Y, 2, 2);
};
