
SolarTesting.prototype.SetShipDesigns = function() {
   this.DiamondShip = [ { X: 0, Y: -20 }, { X: 20, Y: 0 }, { X: 0, Y: 20 }, { X: -20, Y: 0 } ];
   this.DiamondShipInset = [ { X: 0, Y: -10 }, { X: 10, Y: 0 }, { X: 0, Y: 10 }, { X: -10, Y: 0 } ];
   this.DiamondShipFaces = Utilities.Create2DArray(this.DiamondShip.length, 3, Coordinate2D);
   this.DiamondShip.push(this.DiamondShip[0]);
   for (indx=0;indx<this.DiamondShip.length-1;++indx) {
      this.DiamondShipFaces[indx][0] = { X: 0, Y: 0 };
      this.DiamondShipFaces[indx][1] = this.DiamondShip[indx];
      this.DiamondShipFaces[indx][2] = this.DiamondShip[indx+1];
   }
	Starfield.Generate();
};
SolarTesting.prototype.PlayShipDesigns = function() {

   //UNLOGGED

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlayShipDesigns.bind(this));

   this.DisplayShips();
};
SolarTesting.prototype.DisplayShips = function() {
   var i, j;

   Starfield.Draw();
   indx2 = this.Randomizer.GetNumberWithinRange(0, PLANET.COUNT-1);
   for (indx=0;indx<this.DiamondShip.length-1;++indx) {
      if (indx % 2)
	 this.ShipColour = Planets[indx2].TerrainColour.GetRGBFormat();
      else
	 this.ShipColour = Planets[indx2].ContinentColour.GetRGBFormat();
      this.GraphicsTool.DrawPolygon(500, 100, this.DiamondShipFaces[indx], this.ShipColour, 0);
   }
   this.GraphicsTool.DrawPolygon(500, 100, this.DiamondShipInset, this.GetMeanColour(Planets[indx2].TerrainColour, Planets[indx2].ContinentColour), 0);

   for (i=0;i<5;++i) {
      indx = this.Randomizer.GetNumberWithinRange(0, PLANET.COUNT-1);
      this.PolygonShip = this.CalcPad.GetPolygonVertices(i+5, 40);
      this.PolygonShipInset = Utilities.CreateArray(this.PolygonShip.length, Coordinate2D);
      for (j=0;j<this.PolygonShip.length;++j) {
	 this.PolygonShipInset[j].X = this.PolygonShip[j].X/2;
	 this.PolygonShipInset[j].Y = this.PolygonShip[j].Y/2;
      }
      this.PolygonShipFaces = Utilities.Create2DArray(this.PolygonShip.length, 3, Coordinate2D);
      this.PolygonShip.push(this.PolygonShip[0]);
      for (j=0;j<this.PolygonShip.length-1;++j) {
	 this.PolygonShipFaces[j][0] = { X: 0, Y: 0 };
	 this.PolygonShipFaces[j][1] = this.PolygonShip[j];
	 this.PolygonShipFaces[j][2] = this.PolygonShip[j+1];
         if (j % 2)
	    this.ShipColour = Planets[indx].TerrainColour.GetRGBFormat();
	 else
	    this.ShipColour = Planets[indx].ContinentColour.GetRGBFormat();
	 this.GraphicsTool.DrawPolygon(100*(i+1), 100*(i+1), this.PolygonShipFaces[j], this.ShipColour, 0);
      }
      this.ShipColour = this.GetMeanColour(Planets[indx].TerrainColour, Planets[indx].ContinentColour);
      this.GraphicsTool.DrawPolygon(100*(i+1), 100*(i+1), this.PolygonShipInset, this.ShipColour, 0);
   }
};
SolarTesting.prototype.GetMeanColour = function(colour1, colour2) {
   return ("rgb("+Math.round((colour1.R+colour2.R)/2)+","+Math.round((colour1.G+colour2.G)/2)+","+Math.round((colour1.B+colour2.B)/2)+")");
};
