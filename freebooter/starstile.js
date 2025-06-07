
//------------------------------------------------
//---------- SOLAR STAR STILE --------------------
var SolarStarStile = function() {
//   var GraphicsTool;
   var Screen;
   var CalcPad;
   var OpeningVertices;
   var ReverseVertices;
   var ReverseScale;
   var PlanetRotation;
   var WallPolygon;
   var OpeningPolygon;
   var ReversePolygon;
   var Buffer;

   var i;
};
SolarStarStile.prototype = {
   Set(cntxt, cPad) {
//      this.GraphicsTool = gTool;
      this.Screen = cntxt;
      this.CalcPad = cPad;
      this.OpeningVertices = [ { X: 8, Y: -16 }, { X: 16, Y: 0 }, { X: 8, Y: 16 }, { X: -8, Y: 16 }, { X: -16, Y: 0 }, { X: -8, Y: -16 } ];
      this.ReverseVertices = [ { X: 20, Y: -20 }, { X: 20, Y: 20 }, { X: -20, Y: 20 }, { X: -20, Y: -20 } ];
      this.Buffer = new GenieBuffer();
      this.Buffer.Set(SCREEN);
      this.WallPolygon = new GeniePolygon();
//      this.WallPolygon.Set(this.Buffer.Context, this.CalcPad, { COLOUR: GREY.SILVER } );
      this.WallPolygon.Set(this.Buffer.Context, this.CalcPad, { SIDES: 6 } );
      this.OpeningPolygon = new GeniePolygon();
      this.OpeningPolygon.Set(this.Screen, this.CalcPad, { COLOUR: GREY.MEDIUM, SIDES: 6 } );
      this.ReversePolygon = new GeniePolygon();
      this.ReversePolygon.Set(this.Screen, this.CalcPad, { COLOUR: GREY.MEDIUM, SIDES: 4 } );
      this.ReverseScale = 40;
      this.PlanetRotation = 0;
   },
   Update() {

      //UNLOGGED

      for (this.i=0;this.i<this.OpeningVertices.length;++this.i) {
	 if (this.OpeningVertices[this.i].X<0)
	    --this.OpeningVertices[this.i].X;
	 if (this.OpeningVertices[this.i].X>0)
	    ++this.OpeningVertices[this.i].X;
	 if (this.OpeningVertices[this.i].Y<0)
	    --this.OpeningVertices[this.i].Y;
	 if (this.OpeningVertices[this.i].Y>0)
	    ++this.OpeningVertices[this.i].Y;
      }
   },
   BufferStile() {

      this.Buffer.Context.fillStyle = GREY.SILVER;
      this.Buffer.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      this.Buffer.Context.save();
      this.Buffer.Context.beginPath();
      this.Buffer.Context.moveTo((SCREEN.WIDTH/2)+this.OpeningVertices[5].X, (SCREEN.HEIGHT/2)-this.OpeningVertices[5].Y);
      for (this.i=0;this.i<this.OpeningVertices.length;++this.i)
	 this.Buffer.Context.lineTo((SCREEN.WIDTH/2)+this.OpeningVertices[this.i].X, (SCREEN.HEIGHT/2)-this.OpeningVertices[this.i].Y);
      this.Buffer.Context.closePath();
      this.Buffer.Context.clip();
      this.Buffer.Context.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      this.Buffer.Context.restore();
   },
   Draw() {

      //Fill buffer with light grey, cut expanding hexagon out of it, draw to screen
      this.BufferStile();
      this.Screen.drawImage(this.Buffer.Canvas, 0, 0);

      //Draw opening frame
      this.OpeningPolygon.ExecuteDraw(SCREEN.WIDTH/2, SCREEN.HEIGHT/2, this.OpeningVertices, GREY.MEDIUM, 6);

      //One corner of hexagon gets left off, so fill it in here
      this.Screen.fillStyle = GREY.MEDIUM;
      this.Screen.fillRect((SCREEN.WIDTH/2)+this.OpeningVertices[2].X, (SCREEN.HEIGHT/2)+this.OpeningVertices[2].Y, 3, 3);
   },
   UpdateReverseEntry() {

      //LOGGED

      //TODO: identical to ::Update except for array, so should eventually be REDUNDANT

      for (this.i=0;this.i<this.ReverseVertices.length;++this.i) {
	 if (this.ReverseVertices[this.i].X<0)
	    --this.ReverseVertices[this.i].X;
	 if (this.ReverseVertices[this.i].X>0)
	    ++this.ReverseVertices[this.i].X;
	 if (this.ReverseVertices[this.i].Y<0)
	    --this.ReverseVertices[this.i].Y;
	 if (this.ReverseVertices[this.i].Y>0)
	    ++this.ReverseVertices[this.i].Y;
      }

      this.ReverseScale += 2;
      ++this.PlanetRotation;
   },
   DrawReverseEntry() {

      //UNLOGGED

      this.ReversePolygon.ExecuteDraw(SCREEN.WIDTH/2, SCREEN.HEIGHT/2, this.ReverseVertices, GREY.MEDIUM, 6);
      SelectedPlanet.DrawToStarStileBuffer(this.PlanetRotation);
      this.Screen.drawImage(StarStileBuffer.Canvas, 0, 0, 600, 600, 300-(this.ReverseScale/2), 300-(this.ReverseScale/2), this.ReverseScale, this.ReverseScale);
   }
};
