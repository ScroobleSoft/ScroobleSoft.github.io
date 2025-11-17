
var SECTOR = { EMPTY: 0, LIQUEFIER: 1, STATION: 2, PORTAL: 3, SILO: 4, SHED: 5, COUNT: 64 };

GalleryTesting.prototype.SetFacilityDesign = function() {
   this.ScreenCentre = new Coordinate2D();
   this.ScreenCentre.Set(1600, 1600);
   this.InfoQuad = Utilities.CreateArray(4, Coordinate2D);		//Info Box selection diamond
   this.Quad = Utilities.CreateArray(4, Coordinate2D);			//for scratch work
   this.SetQuads();
   this.SetFloor();
   this.CreateIcons();
   this.CreateImages();
   this.GenerateBuildings();
   this.Facility = new GalleryFacility();
   this.Facility.Set(Industrialists[0], this.ScreenCentre);
   this.DrawInfoBox();
   this.PointA = new Coordinate2D();
   this.PointB = new Coordinate2D();
   this.Offset = new Coordinate2D();
};
GalleryTesting.prototype.SetQuads = function() {
   for (indx=0;indx<MappedQuad.length;++indx) {
      this.ScreenQuad[indx].X = this.ScreenCentre.X + MappedQuad[indx].X;
      this.ScreenQuad[indx].Y = this.ScreenCentre.Y + MappedQuad[indx].Y;
      this.InfoQuad[indx].X = MappedQuad[indx].X*(INFoBOX.WIDTH/3200);
      this.InfoQuad[indx].Y = MappedQuad[indx].Y*(INFoBOX.HEIGHT/3200);
   }
};
GalleryTesting.prototype.SetFloor = function() {
   this.PlantPad = [ { X: -100, Y: -100 }, { X: 100, Y: -100 }, { X: 100, Y: 100 }, { X: -100, Y: 100 } ];
   this.InnerRoad = [ { X: -150, Y: -150 }, { X: 150, Y: -150 }, { X: 150, Y: 150 }, { X: -150, Y: 150 } ];
   this.OuterRoad = [ { X: -200, Y: -200 }, { X: 200, Y: -200 }, { X: 200, Y: 200 }, { X: -200, Y: 200 } ];
   for (indx=0;indx<4;++indx) {
      GeoUtils.CartesianToIsometric(this.PlantPad[indx], ANTiCLOCKWISE, MODIFY, { W: 0, H: 0 } );
      GeoUtils.CartesianToIsometric(this.InnerRoad[indx], ANTiCLOCKWISE, MODIFY, { W: 0, H: 0 } );
      GeoUtils.CartesianToIsometric(this.OuterRoad[indx], ANTiCLOCKWISE, MODIFY, { W: 0, H: 0 } );
   }
   this.OuterRoad.push(this.OuterRoad[0]);
};
GalleryTesting.prototype.CreateIcons = function() {
   this.LiquefierIcon = new GenieImage();
   this.LiquefierIcon.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 1, T: 281, W: 30, H: 29 } );
   this.ShedIcon = new GenieImage();
   this.ShedIcon.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 32, T: 281, W: 20, H: 20 } );
   this.StationIcon = new GenieImage();
   this.StationIcon.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 53, T: 281, W: 17, H: 18 } );
   this.PortalIcon = new GenieImage();
   this.PortalIcon.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 71, T: 281, W: 19, H: 10 } );
   this.SiloIcon = new GenieImage();
   this.SiloIcon.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 91, T: 281, W: 8, H: 13 } );
};
GalleryTesting.prototype.CreateImages = function() {
   this.LiquefierImage = new GenieImage();
   this.LiquefierImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 2, T: 315, W: 118, H: 128 } );
   this.ShedImage = new GenieImage();
   this.ShedImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 135, T: 328, W: 78, H: 79 } );
   this.StationImage = new GenieImage();
   this.StationImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 142, T: 415, W: 62, H: 68 } );
   this.PortalImage = new GenieImage();
   this.PortalImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 135, T: 284, W: 78, H: 39 } );
   this.SiloImage = new GenieImage();
   this.SiloImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 4, T: 454, W: 30, H: 45 } );
};
GalleryTesting.prototype.GenerateBuildings = function() {
   var layout

   layout = new Array(SECTOR.COUNT);
   this.Randomizer.GetUniqueNumbers(layout, SECTOR.COUNT, SECTOR.COUNT, STARtAtZERO);
   this.Buildings = Utilities.CreateArray(SECTOR.COUNT, function() {var Location, Type, Size, Height;});
   for (indx=0;indx<SECTOR.COUNT;++indx) {
      this.Buildings[indx].Location = new Coordinate2D();
      this.Buildings[indx].Location.X = (400*(layout[indx] % 8)) + 200;
      this.Buildings[indx].Location.Y = (400*Math.floor(layout[indx]/8)) + 200;
      if (indx<8) {
	 this.Buildings[indx].Type = 1;
	 this.Buildings[indx].Size = 120;
	 this.Buildings[indx].Height = 70;
      } else if (indx<16) {
	 this.Buildings[indx].Type = 2;
	 this.Buildings[indx].Size = 60;
	 this.Buildings[indx].Height = 40;
      } else if (indx<24) {
	 this.Buildings[indx].Type = 3;
	 this.Buildings[indx].Size = 80;
	 this.Buildings[indx].Height = 0;
      } else if (indx<32) {
	 this.Buildings[indx].Type = 4;
	 this.Buildings[indx].Size = 30;
	 this.Buildings[indx].Height = 30;
      } else {
	 this.Buildings[indx].Type = 5;
	 this.Buildings[indx].Size = 80;
	 this.Buildings[indx].Height = 40;
      }
   }
};
GalleryTesting.prototype.PlayFacilityDesign = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayFacilityDesign.bind(this));

   this.DrawScreen();

   this.UpdateMouse();
};
GalleryTesting.prototype.DrawInfoBox = function() {

   //Draw buildings
   this.InfoBox.fillStyle = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
   for (indx=0;indx<SECTOR.COUNT;++indx) {
      coords.X = Math.round(this.Buildings[indx].Location.X*(INFoBOX.WIDTH/3200));
      coords.Y = Math.round(this.Buildings[indx].Location.Y*(INFoBOX.HEIGHT/3200));
      switch (this.Buildings[indx].Type) {
	 case SECTOR.LIQUEFIER:
	    this.LiquefierIcon.Draw(coords.X-15, coords.Y-15);
	    break;
	 case SECTOR.STATION:
	    this.StationIcon.Draw(coords.X-9, coords.Y-9);
	    break;
	 case SECTOR.PORTAL:
	    this.PortalIcon.Draw(coords.X-10, coords.Y-5);
	    break;
	 case SECTOR.SILO:
	    this.SiloIcon.Draw(coords.X-10, coords.Y-10);
	    break;
	 case SECTOR.SHED:
	    this.ShedIcon.Draw(coords.X-10, coords.Y-10);
	    break;
      }
   }

   //Draw selection rect
   coords.X = this.ScreenCentre.X*(INFoBOX.WIDTH/3200);
   coords.Y = this.ScreenCentre.Y*(INFoBOX.HEIGHT/3200);
   this.GraphicsTool.SwitchContext(this.InfoBox);
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.InfoQuad, "red", 1);
   this.GraphicsTool.RestoreContext();
};
GalleryTesting.prototype.DrawScreen = function() {
   this.Screen.fillStyle = GREY.DARK;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, 400);
   for (indx=0;indx<SECTOR.COUNT;++indx) {
      if (this.CheckOnScreen(this.Buildings[indx])) {
	 coords.X = this.Buildings[indx].Location.X - (this.ScreenCentre.X-400);
	 coords.Y = this.Buildings[indx].Location.Y - (this.ScreenCentre.Y-200);
	 GeoUtils.CartesianToIsometric(coords, ANTiCLOCKWISE, MODIFY, { W: 800, H: 400 } );
	 this.DrawFloor(coords);
	 switch (this.Buildings[indx].Type) {
	    case SECTOR.LIQUEFIER:
	       this.LiquefierImage.Draw(coords.X-50, coords.Y-95);
	       break;
	    case SECTOR.STATION:
	       this.StationImage.Draw(coords.X-31, coords.Y-54);
	       break;
	    case SECTOR.PORTAL:
	       this.PortalImage.Draw(coords.X-78, coords.Y-20);
	       break;
	    case SECTOR.SILO:
	       this.SiloImage.Draw(coords.X-15, coords.Y-39);
	       break;
	    case SECTOR.SHED:
	       this.ShedImage.Draw(coords.X-39, coords.Y-60);
	       break;
	 }
      }
   }

//   this.Facility.DrawIntersections();

   this.Screen.clearRect(0, 400, SCREEN.WIDTH, 200);
};
/*
GalleryTesting.prototype.DrawIntersections = function() {

   //UNLOGGED

   fclty.
};
*/
GalleryTesting.prototype.CheckOnScreen = function(fclty) {
   this.Quad[0].Set(fclty.Location.X, fclty.Location.Y-((fclty.Size/4)+fclty.Height));		//N
   this.Quad[1].Set(fclty.Location.X+(fclty.Size/2), fclty.Location.Y);				//E
   this.Quad[2].Set(fclty.Location.X, fclty.Location.Y+(fclty.Size/4));				//S
   this.Quad[3].Set(fclty.Location.X-(fclty.Size/2), fclty.Location.Y);				//W
   if (SpaceUtils.CheckPolygonsIntersecting(this.Quad, this.ScreenQuad))
      return (true);
};
GalleryTesting.prototype.UpdateMouse = function() {
   if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
      this.ScreenCentre.Set(Mouse.ClickX*(3200/INFoBOX.WIDTH), Mouse.ClickY*(3200/INFoBOX.HEIGHT));
      for (indx=0;indx<MappedQuad.length;++indx) {
	 this.ScreenQuad[indx].X = this.ScreenCentre.X + MappedQuad[indx].X;
	 this.ScreenQuad[indx].Y = this.ScreenCentre.Y + MappedQuad[indx].Y;
      }
      this.DrawInfoBox();
   }
};
GalleryTesting.prototype.DrawFloor = function(coords) {
/*
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.InnerRoad, "black", 1);
*/
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.InnerRoad, GREY.ASH, 0);
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.InnerRoad, "black", 1);
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.PlantPad, GREY.MEDIUM, 0);
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.PlantPad, "black", 1);

   //Draw dividers
   for (this.i=0;this.i<4;++this.i) {
      this.Offset.X = (this.OuterRoad[this.i+1].X-this.OuterRoad[this.i].X)/13;
      this.Offset.Y = (this.OuterRoad[this.i+1].Y-this.OuterRoad[this.i].Y)/13;
      this.PointA.Set(coords.X+this.OuterRoad[this.i].X, coords.Y+this.OuterRoad[this.i].Y);
      for (this.j=0;this.j<13;++this.j) {
	 if (this.j % 2) {
	    this.PointB.X = this.PointA.X;
	    this.PointB.Y = this.PointA.Y;
	 }
	 this.PointA.X += this.Offset.X;
	 this.PointA.Y += this.Offset.Y;
	 if (this.j % 2)
	    this.GraphicsTool.DrawLine(this.PointA, this.PointB, "white", 1);
      }
   }
};
