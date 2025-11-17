
GalleryTesting.prototype.SetNavigationTest = function() {
   this.SetWimp();
   this.SetSurface();
   this.TextWriter.Write("use arrow keys to", 5, 40);
   this.TextWriter.Write("move unit isometrically", 5, 60);
};
GalleryTesting.prototype.SetWimp = function() {
   this.Wimp = new GalleryWimp();
   this.Wimp.Set(Industrialists[0]);
   this.Wimp.SetPosition( { X: 300, Y: 200 } );
   this.Wimp.Direction = DIRECTION.N;
};
GalleryTesting.prototype.SetSurface = function() {
   this.PlantPad = [ { X: 200, Y: 200 }, { X: 400, Y: 200 }, { X: 400, Y: 400 }, { X: 200, Y: 400 } ];
   this.InnerRoad = [ { X: 150, Y: 150 }, { X: 450, Y: 150 }, { X: 450, Y: 450 }, { X: 150, Y: 450 } ];
   this.OuterRoad = [ { X: 100, Y: 100 }, { X: 500, Y: 100 }, { X: 500, Y: 500 }, { X: 100, Y: 500 } ];
   for (indx=0;indx<4;++indx) {
      GeoUtils.CartesianToIsometric(this.PlantPad[indx], ANTiCLOCKWISE, MODIFY);
      GeoUtils.CartesianToIsometric(this.InnerRoad[indx], ANTiCLOCKWISE, MODIFY);
      GeoUtils.CartesianToIsometric(this.OuterRoad[indx], ANTiCLOCKWISE, MODIFY);
   }
};
GalleryTesting.prototype.PlayNavigationTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayNavigationTest.bind(this));

   this.Screen.fillStyle = GREY.SILVER;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.DrawPlantBase();
   this.Wimp.Draw();
   this.UpdateWimp();
};
GalleryTesting.prototype.DrawPlantBase = function() {
   this.GraphicsTool.DrawPolygon(0, 0, this.OuterRoad, GREY.ASH, 0);
   this.GraphicsTool.DrawPolygon(0, 0, this.OuterRoad, "black", 1);
   this.GraphicsTool.DrawPolygon(0, 0, this.InnerRoad, "black", 1);
   this.GraphicsTool.DrawPolygon(0, 0, this.PlantPad, GREY.MEDIUM, 0);
   this.GraphicsTool.DrawPolygon(0, 0, this.PlantPad, "black", 1);
};
GalleryTesting.prototype.UpdateWimp = function() {
   Controller.CheckControls();
   if (Controller.Right) ++this.Wimp.Direction;
   if (Controller.Left)  --this.Wimp.Direction;
   if (this.Wimp.Direction<0)
      this.Wimp.Direction += 8;
   if (this.Wimp.Direction==8)
      this.Wimp.Direction -= 8;
   if (Controller.Up || Controller.Down) {
      this.Wimp.UpdateAnimation();
      this.MoveWimp();
   }
};
GalleryTesting.prototype.MoveWimp = function() {
   if (Controller.Up)
      this.Speed = 1.0;
   else
      this.Speed = -0.5;
   switch (this.Wimp.Direction) {
      case DIRECTION.N:
	 this.Wimp.Position.X -= this.Speed;
	 this.Wimp.Position.Y -= this.Speed/2;
	 break;
      case DIRECTION.E:
	 this.Wimp.Position.X += this.Speed;
	 this.Wimp.Position.Y -= this.Speed/2;
	 break;
      case DIRECTION.S:
	 this.Wimp.Position.X += this.Speed;
	 this.Wimp.Position.Y += this.Speed/2;
	 break;
      case DIRECTION.W:
	 this.Wimp.Position.X -= this.Speed;
	 this.Wimp.Position.Y += this.Speed/2;
	 break;
   }
};
