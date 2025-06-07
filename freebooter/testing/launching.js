/*
 *  NOTE: docking will have the reverse sequence, so will start with an octagon too big for the screen, contract it till it fits snugly, then reverse rotate it
 *	  the sawtooth pattern will be left on the screen
 */
SolarTesting.prototype.SetLaunchDemo = function() {
   this.Opening = this.CalcPad.GetPolygonVertices(8, SCREEN.WIDTH);
   for (indx=0;indx<this.Opening.length;++indx)
      this.Opening[indx].Y = -this.Opening[indx].Y;
   this.Opening.push(this.Opening[0]);
   this.Corners = [ { X: 300, Y: 0 },   { X: 600, Y: 0 }, { X: 600, Y: 300 }, { X: 600, Y: 600 },
		    { X: 300, Y: 600 }, { X: 0, Y: 600 }, { X: 0, Y: 300 },   { X: 0, Y: 0 }      ] ;
   this.Corners.push(this.Corners[0]);
   this.Faces = Utilities.Create2DArray(8, 4, Coordinate2D);
   this.ScaledVertices = Utilities.CreateArray(9, Coordinate2D);
   this.ConvexFaces = Utilities.Create2DArray(4, 4, Coordinate2D);
   this.Frames = 5;
   this.State = 0;
	Starfield.Generate();
};
SolarTesting.prototype.PlayLaunchDemo = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayLaunchDemo.bind(this));

   this.UpdateShutters();

   Starfield.Draw();
   this.DrawShutters();

   if (this.Frames==300)
      ++this.State;
   else if (this.ScaledVertices[0].X>SCREEN.WIDTH)
      cancelAnimationFrame(this.AnimationFrameHandle);
};
SolarTesting.prototype.DrawShutters = function() {
   if (!this.State)
      for (indx=0;indx<8;++indx) {
	 this.GraphicsTool.DrawPolygonFromVertices(0, 0, this.Faces[indx], GREY.MEDIUM, 0);
	 this.GraphicsTool.DrawLine(this.ScaledVertices[indx], this.Corners[indx], GREY.MOCHA, 1);
      }
   else
      for (indx=0;indx<4;++indx)
	 this.GraphicsTool.DrawPolygonFromVertices(0, 0, this.ConvexFaces[indx], GREY.MEDIUM, 0);
};
SolarTesting.prototype.UpdateShutters = function() {
   if (!this.State)
      this.UpdateSawtoothShutters();
   else
      this.RetractShutters();
};
SolarTesting.prototype.UpdateSawtoothShutters = function() {
   GeoUtils.RotateCoordsArray(this.Opening, 45/300);
   GeoUtils.Rotate(this.Opening[0], -45/300);		//NOTE: compensation for the fact that it is rotated twice
   for (indx=0;indx<this.Opening.length;++indx) {
      this.ScaledVertices[indx].X = ((this.Frames/300)*this.Opening[indx].X) + (SCREEN.WIDTH/2);
      this.ScaledVertices[indx].Y = ((this.Frames/300)*this.Opening[indx].Y) + (SCREEN.HEIGHT/2);
   }
   for (indx=0;indx<this.Faces.length;++indx) {
      this.Faces[indx][0].X = this.ScaledVertices[indx].X;
      this.Faces[indx][0].Y = -this.ScaledVertices[indx].Y;
      this.Faces[indx][1].X = this.ScaledVertices[indx+1].X;
      this.Faces[indx][1].Y = -this.ScaledVertices[indx+1].Y;
      this.Faces[indx][2].X = this.Corners[indx+1].X;
      this.Faces[indx][2].Y = -this.Corners[indx+1].Y;
      this.Faces[indx][3].X = this.Corners[indx].X;
      this.Faces[indx][3].Y = -this.Corners[indx].Y;
   }
   ++this.Frames;
};
SolarTesting.prototype.RetractShutters = function() {
   for (indx=0;indx<this.ConvexFaces.length;++indx) {
      this.ConvexFaces[indx][0].X = this.Corners[(2*indx)].X;
      this.ConvexFaces[indx][0].Y = -this.Corners[(2*indx)].Y;
      this.ConvexFaces[indx][1].X = this.Corners[(2*indx)+1].X;
      this.ConvexFaces[indx][1].Y = -this.Corners[(2*indx)+1].Y;
      this.ConvexFaces[indx][2].X = this.Corners[(2*indx)+2].X;
      this.ConvexFaces[indx][2].Y = -this.Corners[(2*indx)+2].Y;
      this.ConvexFaces[indx][3].X = this.ScaledVertices[2*indx].X;
      this.ConvexFaces[indx][3].Y = -this.ScaledVertices[2*indx].Y;
   }
   for (indx=0;indx<8;++indx) {
      this.ScaledVertices[indx].X = ((this.Frames/300)*this.Opening[indx].X) + (SCREEN.WIDTH/2);
      this.ScaledVertices[indx].Y = ((this.Frames/300)*this.Opening[indx].Y) + (SCREEN.HEIGHT/2);
   }
   ++this.Frames;
};
