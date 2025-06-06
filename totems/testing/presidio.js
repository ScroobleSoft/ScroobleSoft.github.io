
TollTesting.prototype.SetPresidioDrawing = function() {

   this.OuterPentagon = this.CalcPad.GetPolygonVertices(5, 110);
   this.InnerPentagon = this.CalcPad.GetPolygonVertices(5, 100);
   this.OuterPentagon.forEach(function(vrtx){vrtx.Y=-vrtx.Y;});
   this.InnerPentagon.forEach(function(vrtx){vrtx.Y=-vrtx.Y;});
};
TollTesting.prototype.DisplayPresidioInfo = function() {

   //UNLOGGED

   this.TextWriter.Write("", 5, 40, null, CANVAS.ZOOM);
};
TollTesting.prototype.PlayPresidioDrawing = function() {

   //UNLOGGED

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlayPresidioDrawing.bind(this));

   this.Screen.fillStyle = "chartreuse";
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.DrawPresidio(300, 300);
};
TollTesting.prototype.DrawPresidio = function(x, y) {

   this.GraphicsTool.DrawPolygon(x, y, this.InnerPentagon, GREY.SILVER, 0);
   this.GraphicsTool.DrawPolygon(x, y, this.InnerPentagon, GREY.ASH, 5);
   for (indx=0;indx<this.OuterPentagon.length;++indx)
      this.GraphicsTool.DrawCircle(x+this.InnerPentagon[indx].X, y+this.InnerPentagon[indx].Y, 11, GREY.ASH, 0);
   this.GraphicsTool.DrawPolygon(x, y, this.OuterPentagon, GREY.MEDIUM, 5);
   for (indx=0;indx<this.OuterPentagon.length;++indx) {
      this.GraphicsTool.DrawCircle(x+this.OuterPentagon[indx].X, y+this.OuterPentagon[indx].Y, 12, GREY.SILVER, 0);
      this.GraphicsTool.DrawCircle(x+this.OuterPentagon[indx].X, y+this.OuterPentagon[indx].Y, 10, GREY.MEDIUM, 5);
   }
};
