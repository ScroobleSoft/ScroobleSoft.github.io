/*
 *  TODO: no buffer use, simply draw green background, and draw appropriate lines in batches depending on screen position
 *	  could turn vertices coordinate sets into widgets (or LineSet, or lattice) where line batches are generated and drawn from
 *	  think 50px segments will be enough, with care taken to also have 'leftover' segments
 *
 *  elements - left touchline, right touchline, left box, right box, left area diagonals, right area diagonals, left arc, right arc, centre circle, centre dot,
 *	       halfway line, corner ellipses (images); segments of far touchline, near touchline, near left area, far left area, near right area, far right area
 *  going to add corner flags which will be composite sprites with cloth colour that of home team
 */
//NOTE: all variables here will become REDUNDANT
var pVertices = [ { X: 1365, Y: -35 }, { X: 1595, Y: -395 }, { X: 5, Y: -395 }, { X: 235, Y: -35 } ];  //p- pitch
var lArea = [ { X: 195, Y: -100 }, { X: 400, Y: -100 }, { X: 300, Y: -325 }, { X: 50, Y: -325 } ];  //l- left
var rArea = [ { X: 1405, Y: -100 }, { X: 1200, Y: -100 }, { X: 1300, Y: -325 }, { X: 1550, Y: -325 } ];  //r- right
var lBox = [ { X: 160, Y: -155 },  { X: 230, Y: -155 }, { X: 170, Y: -255 }, { X: 95, Y: -255 } ];
var rBox = [ { X: 1440, Y: -155 },  { X: 1370, Y: -155 }, { X: 1430, Y: -255 }, { X: 1505, Y: -255 } ];
var lGoalposts = [ { X: 150, Y: -105 }, { X: 150, Y: -165 }, { X: 105, Y: -235 }, { X: 105, Y: -175 } ];
var rGoalposts = [ { X: 1450, Y: -105 }, { X: 1450, Y: -165 }, { X: 1495, Y: -235 }, { X: 1495, Y: -175 } ];

//------------------------------------------------------------------
//----------- BUFFERED SIDE VIEW FOOTBALL PITCH --------------------	DE-LOG
var BufferedSideViewFootballPitch = function() {
   var Screen;
   var GraphicsTool;
   var Buffer;
   var LineSets;
};
BufferedSideViewFootballPitch.prototype = {
   Set(cntxt, gTool) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;

      this.Generate();
   },
   Generate() {

      //UNLOGGED - REDUNDANT now

      this.Buffer = new GenieBuffer();
      this.Buffer.Set(SIDeVIEwFOOTBALlPITCH);

      this.Buffer.Context.fillStyle = GREEN.TWO;
      this.Buffer.Context.fillRect(0, 0, SIDeVIEwFOOTBALlPITCH.WIDTH, SIDeVIEwFOOTBALlPITCH.HEIGHT);

      this.GraphicsTool.SwitchContext(this.Buffer.Context);
//      this.GraphicsTool.DrawPolygonFromVertices(0, 0, lGoalposts, "rgb(185,122,87)", 3);
//      this.GraphicsTool.DrawPolygonFromVertices(0, 0, rGoalposts, "rgb(185,122,87)", 3);
      this.GraphicsTool.DrawPolygon(0, 0, pVertices, "white", 3);
      this.GraphicsTool.DrawPolygon(0, 0, lArea, "white", 3);
      this.GraphicsTool.DrawPolygon(0, 0, rArea, "white", 3);
      this.GraphicsTool.DrawPolygon(0, 0, lBox, "white", 3);
      this.GraphicsTool.DrawPolygon(0, 0, rBox, "white", 3);
      this.GraphicsTool.DrawLine( { X: 800, Y: 35 }, { X: 800, Y: 395 }, "white", 3);
      this.GraphicsTool.DrawCircle(800, 205, 3, "white", 0);
      this.GraphicsTool.DrawEllipse(800, 205, 160, 80, "white", 3);
      GoalSprite.Context = this.Buffer.Context;
      GoalSprite.Draw(68, 238);
      GoalSprite.DrawFlipped(SIDeVIEwFOOTBALlPITCH.WIDTH-(68+GoalSprite.Width), 238, FLIPPED.HORIZONTAL);

      this.GraphicsTool.RestoreContext();
   },
   Draw(x) {

      this.Screen.drawImage(this.Buffer.Canvas, x, 0, SCREEN.WIDTH, SCREEN.HEIGHT, 0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   }
};

//---------------------------------------------------------
//----------- SIDE VIEW FOOTBALL PITCH --------------------
var SideViewFootballPitch = function() {
   var Screen;
   var GraphicsTool;
   var ScreenRect;
   var Stanchion1, Stanchion2;

   var crds, crds2;
};
SideViewFootballPitch.prototype = {
   Set(cntxt, gTool, sRect) {
      this.Screen = cntxt;
      this.ScreenRect = sRect;
      this.GraphicsTool = gTool;

      this.Stanchion1 = new Coordinate2D();
      this.Stanchion2 = new Coordinate2D();

      crds = new Coordinate2D();
      crds2 = new Coordinate2D();
   },
   Draw() {

      this.Screen.fillStyle = PITCH.COLOUR;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, 400);		//HARD-CODED!
      this.DrawHalfwayLine();
      this.DrawCentreCircle();	//includes centre spot
      this.DrawTouchLines();
      this.DrawPenaltyBoxes();
      this.DrawGoalBoxes();
      this.DrawGoalposts();
      this.DrawCornerFlags();
   },
   DrawHalfwayLine() {

      crds.X = SVhALFWAyLINE.X - this.ScreenRect.L;
      crds.Y = SVhALFWAyLINE.Y;
      this.GraphicsTool.DrawVerticalLine(crds, 360, "white", 3);
   },
   DrawCentreCircle() {

      crds.x = SVcENTReSPOT.X - this.ScreenRect.L;
      this.GraphicsTool.DrawEllipse(crds.x, SVcENTReSPOT.Y, 266, 89, "white", 3);
      this.GraphicsTool.DrawCircle(crds.x, SVcENTReSPOT.Y, 3, "white", 0);
   },
   DrawTouchLines() {

      //Far touch-line and goal-lines
      if (SVfArTOUChLINE.L.X>=this.ScreenRect.L) {					//check if top-left pitch corner is visible
	 crds.X = SVfArTOUChLINE.L.X - this.ScreenRect.L;
	 crds.Y = SVfArTOUChLINE.L.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, SCREEN.WIDTH-crds.X, "white", 3);
	 crds2.X = SVnEArTOUChLINE.L.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing, avoidable via calculations
	 crds2.Y = SVnEArTOUChLINE.L.Y;
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      } else if (SVfArTOUChLINE.R.X<(this.ScreenRect.L+this.ScreenRect.W)) {		//check if top-right pitch corner is visible
	 crds.X = SVfArTOUChLINE.R.X - this.ScreenRect.L;
	 crds.Y = SVfArTOUChLINE.R.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, -crds.X, "white", 3);
	 crds2.X = SVnEArTOUChLINE.R.X - this.ScreenRect.L;
	 crds2.Y = SVnEArTOUChLINE.R.Y;
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      } else {										//draw line across top of screen
	 crds.X = 0;
	 crds.Y = SVfArTOUChLINE.L.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, SCREEN.WIDTH, "white", 3);
      }

      //Near touch-line
      if (SVnEArTOUChLINE.L.X>=this.ScreenRect.L) {					//check if bottom-left pitch corner is visible
         crds.X = SVnEArTOUChLINE.L.X - this.ScreenRect.L;
         crds.Y = SVnEArTOUChLINE.L.Y;
         this.GraphicsTool.DrawHorizontalLine(crds, SCREEN.WIDTH-crds.X, "white", 3);
      } else if (SVnEArTOUChLINE.R.X<(this.ScreenRect.L+this.ScreenRect.W)) {		//check if bottom-right pitch corner is visible
	 crds.X = SVnEArTOUChLINE.R.X - this.ScreenRect.L;
	 crds.Y = SVnEArTOUChLINE.R.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, -crds.X, "white", 3);
      } else {										//draw line across bottom of screen
	 crds.X = 0;
	 crds.Y = SVnEArTOUChLINE.L.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, SCREEN.WIDTH, "white", 3);
      }
   },
   DrawPenaltyBoxes() {

      //Left penalty box
      if (SVpENALTyBOX.L.TOP.X>=this.ScreenRect.L) {					//check if top-left corner is visible
	 crds.X = SVpENALTyBOX.L.TOP.X - this.ScreenRect.L;
	 crds.Y = SVpENALTyBOX.L.TOP.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, -207, "white", 3);
	 crds2.X = SVpENALTyBOX.L.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
	 crds2.Y = SVpENALTyBOX.L.BOTTOM.Y;						//	avoidable via calculations
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      }
      if (SVpENALTyBOX.L.BOTTOM.X>=this.ScreenRect.L) {					//check if bottom-left corner is visible
	 crds.X = SVpENALTyBOX.L.BOTTOM.X - this.ScreenRect.L;
	 crds.Y = SVpENALTyBOX.L.BOTTOM.Y - 1;						//subtracting 1 for better corner look
	 this.GraphicsTool.DrawHorizontalLine(crds, -254, "white", 3);
      }

      //Right penalty box
      if (SVpENALTyBOX.R.TOP.X<(this.ScreenRect.L+this.ScreenRect.W)) {			//check if top-left corner is visible
	 crds.X = SVpENALTyBOX.R.TOP.X - this.ScreenRect.L;
	 crds.Y = SVpENALTyBOX.R.TOP.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, 207, "white", 3);
	 crds2.X = SVpENALTyBOX.R.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
	 crds2.Y = SVpENALTyBOX.R.BOTTOM.Y;						//	avoidable via calculations
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      }
      if (SVpENALTyBOX.R.BOTTOM.X<(this.ScreenRect.L+this.ScreenRect.W)) {		//check if bottom-left corner is visible
	 crds.X = SVpENALTyBOX.R.BOTTOM.X - this.ScreenRect.L;
	 crds.Y = SVpENALTyBOX.R.BOTTOM.Y - 1;						//subtracting 1 for better corner look
	 this.GraphicsTool.DrawHorizontalLine(crds, 254, "white", 3);
      }

      //Penalty spots
      if (SVpENALTySPOT.L.X>=this.ScreenRect.L)									//left
	 this.GraphicsTool.DrawCircle(SVpENALTySPOT.L.X-this.ScreenRect.L, SVpENALTySPOT.L.Y, 3, "white", 0);
      if (SVpENALTySPOT.R<(this.ScreenRect.L+this.ScreenRect.W))						//right
	 this.GraphicsTool.DrawCircle(SVpENALTySPOT.R.X-this.ScreenRect.L, SVpENALTySPOT.R.Y, 3, "white", 0);

      //Semi-circles
      //TODO:
   },
   DrawGoalBoxes() {

      //Left goal area
      if (SVgOAlBOX.L.TOP.X>=this.ScreenRect.L) {					//check if top-right corner is visible
	 crds.X = SVgOAlBOX.L.TOP.X - this.ScreenRect.L;
	 crds.Y = SVgOAlBOX.L.TOP.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, -70, "white", 3);
	 crds2.X = SVgOAlBOX.L.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
	 crds2.Y = SVgOAlBOX.L.BOTTOM.Y;						//	avoidable via calculations
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      }
      if (SVgOAlBOX.L.BOTTOM.X<(this.ScreenRect.L+this.ScreenRect.W)) {			//check if bottom-right corner is visible
	 crds.X = SVgOAlBOX.L.BOTTOM.X - this.ScreenRect.L;
	 crds.Y = SVgOAlBOX.L.BOTTOM.Y - 1;
	 this.GraphicsTool.DrawHorizontalLine(crds, -75, "white", 3);
      }

      //Right goal area
      if (SVgOAlBOX.R.TOP.X>=this.ScreenRect.L) {					//check if top-left corner is visible
	 crds.X = SVgOAlBOX.R.TOP.X - this.ScreenRect.L;
	 crds.Y = SVgOAlBOX.R.TOP.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, 70, "white", 3);
	 crds2.X = SVgOAlBOX.R.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
	 crds2.Y = SVgOAlBOX.R.BOTTOM.Y - 1;						//	avoidable via calculations
	 this.GraphicsTool.DrawLine(crds, crds2, "white", 3);
      }
      if (SVgOAlBOX.R.BOTTOM.X<(this.ScreenRect.L+this.ScreenRect.W)) {			//check if bottom-left corner is visible
	 crds.X = SVgOAlBOX.R.BOTTOM.X - this.ScreenRect.L;
	 crds.Y = SVgOAlBOX.R.BOTTOM.Y;
	 this.GraphicsTool.DrawHorizontalLine(crds, 75, "white", 3);
      }
   },
   DrawGoalposts() {

      //Left goal
      if (SVgOAlFRAME.FAR.L[0].X>=this.ScreenRect.L) {
	 this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.FAR.L, "white", 3);
	 DrawLine(SVgOAlFRAME.FAR.L[0], SVgOAlFRAME.NEAR.L[0], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//crossbar
	 DrawLine(SVgOAlFRAME.FAR.L[3], SVgOAlFRAME.NEAR.L[3], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back bar
	 DrawLine(SVgOAlFRAME.FAR.L[2], SVgOAlFRAME.NEAR.L[2], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back line
      }
      if (SVgOAlFRAME.NEAR.L[0].X>=this.ScreenRect.L)
	 this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.NEAR.L, "white", 3);

      //Right goal
      if (SVgOAlFRAME.FAR.R[0].X<(this.ScreenRect.L+this.ScreenRect.W)) {
	 this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.FAR.R, "white", 3);
	 DrawLine(SVgOAlFRAME.FAR.R[0], SVgOAlFRAME.NEAR.R[0], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//crossbar
	 DrawLine(SVgOAlFRAME.FAR.R[3], SVgOAlFRAME.NEAR.R[3], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back bar
	 DrawLine(SVgOAlFRAME.FAR.R[2], SVgOAlFRAME.NEAR.R[2], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back line
      }
      if (SVgOAlFRAME.NEAR.R[0].X<(this.ScreenRect.L+this.ScreenRect.W))
	 this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.NEAR.R, "white", 3);

      function DrawLine(pnt1, pnt2, stnchn1, stnchn2, gTool, sRect) {

	 stnchn1.X = pnt1.X - sRect.L;
	 stnchn1.Y = pnt1.Y;
	 stnchn2.X = pnt2.X - sRect.L;
	 stnchn2.Y = pnt2.Y;
	 gTool.DrawLine(stnchn1, stnchn2, "white", 3);
      }

      //TODO: semi-circles

   },
   DrawCornerFlags() {

      //UNLOGGED

   }
};
