
FootballTesting.prototype.SetGeometricPitch = function() {

   this.ScreenRect.L = (PITCH.SIDeVIEW.W-SCREEN.WIDTH)/2;
   this.ScreenRect.T = 0;
   this.ScreenRect.W = SCREEN.WIDTH;
   this.ScreenRect.H = PITCH.SIDeVIEW.H;
   this.ScreenQuad = ArrayUtils.Create(4, Coordinate2D);
   this.Stanchion1 = new Coordinate2D();
   this.Stanchion2 = new Coordinate2D();
   PerspectiveUtils.SetPerspective(PERSPECTIVE.BIRDsEYE, this.ScreenRect, this.ScreenQuad, 231/361);	//REDUNDANT?

   this.DisplayGeometricText();
};
FootballTesting.prototype.DisplayGeometricText = function() {

   this.TextWriter.Write("Use Arrow Keys to scroll pitch", 5, 40, null, CANVAS.ZOOM);
};
FootballTesting.prototype.PlayGeometricPitch = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayGeometricPitch.bind(this));

   this.Screen.fillStyle = GREEN.TWO;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, PITCH.SIDeVIEW.H);
   this.DrawMarkings();

   this.UpdateKeys();
};
FootballTesting.prototype.DrawMarkings = function() {

   this.DrawHalfwayLine();
   this.DrawCentreCircle();	//includes centre spot
   this.DrawTouchLines();
   this.DrawPenaltyBoxes();
   this.DrawGoalBoxes();
   this.DrawGoalposts();
   this.DrawCornerFlags();
};
FootballTesting.prototype.DrawHalfwayLine = function() {

   if (SpaceUtils.CheckPointInBox(SVhALFWAyLINE, this.ScreenRect)) {
      coords.X = SVhALFWAyLINE.X - this.ScreenRect.L;
      coords.Y = SVhALFWAyLINE.Y;
      this.GraphicsTool.DrawVerticalLine(coords, 360, "white", 3);
   }
};
FootballTesting.prototype.DrawCentreCircle = function() {

   if (SpaceUtils.CheckPointInBox(SVcENTReSPOT, this.ScreenRect, 82)) {
      this.x = SVcENTReSPOT.X - this.ScreenRect.L;
      this.GraphicsTool.DrawEllipse(this.x, SVcENTReSPOT.Y, 82, 41, "white", 3);
      this.GraphicsTool.DrawCircle(this.x, SVcENTReSPOT.Y, 3, "white", 0);
   }
};
FootballTesting.prototype.DrawTouchLines = function() {

   //Far touch-line and goal-lines
   if (SpaceUtils.CheckPointInBox(SVfArTOUChLINE.L, this.ScreenRect)) {			//check if top-left pitch corner is visible
      coords.X = SVfArTOUChLINE.L.X - this.ScreenRect.L;
      coords.Y = SVfArTOUChLINE.L.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, SCREEN.WIDTH-coords.X, "white", 3);
      coords2.X = SVnEArTOUChLINE.L.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
      coords2.Y = SVnEArTOUChLINE.L.Y;							//	avoidable via calculations
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   } else if (SpaceUtils.CheckPointInBox(SVfArTOUChLINE.R, this.ScreenRect)) {		//check if top-right pitch corner is visible
      coords.X = SVfArTOUChLINE.R.X - this.ScreenRect.L;
      coords.Y = SVfArTOUChLINE.R.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, -coords.X, "white", 3);
      coords2.X = SVnEArTOUChLINE.R.X - this.ScreenRect.L;
      coords2.Y = SVnEArTOUChLINE.R.Y;
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   } else {										//draw line across top of screen
      coords.X = 0;
      coords.Y = SVfArTOUChLINE.L.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, SCREEN.WIDTH, "white", 3);
   }

   //Near touch-line
   if (SpaceUtils.CheckPointInBox(SVnEArTOUChLINE.L, this.ScreenRect)) {			//check if bottom-left pitch corner is visible
      coords.X = SVnEArTOUChLINE.L.X - this.ScreenRect.L;
      coords.Y = SVnEArTOUChLINE.L.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, SCREEN.WIDTH-coords.X, "white", 3);
   } else if (SpaceUtils.CheckPointInBox(SVnEArTOUChLINE.R, this.ScreenRect)) {		//check if bottom-right pitch corner is visible
      coords.X = SVnEArTOUChLINE.R.X - this.ScreenRect.L;
      coords.Y = SVnEArTOUChLINE.R.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, -coords.X, "white", 3);
   } else {										//draw line across bottom of screen
      coords.X = 0;
      coords.Y = SVnEArTOUChLINE.L.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, SCREEN.WIDTH, "white", 3);
   }
};
FootballTesting.prototype.DrawPenaltyBoxes = function() {

   //Left penalty box
   if (SpaceUtils.CheckPointInBox(SVpENALTyBOX.L.TOP, this.ScreenRect)) {		//check if top-right corner is visible
      coords.X = SVpENALTyBOX.L.TOP.X - this.ScreenRect.L;
      coords.Y = SVpENALTyBOX.L.TOP.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, -207, "white", 3);
      coords2.X = SVpENALTyBOX.L.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
      coords2.Y = SVpENALTyBOX.L.BOTTOM.Y;						//	avoidable via calculations
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   }
   if (SpaceUtils.CheckPointInBox(SVpENALTyBOX.L.BOTTOM, this.ScreenRect)) {		//check if bottom-right corner is visible
      coords.X = SVpENALTyBOX.L.BOTTOM.X - this.ScreenRect.L;
      coords.Y = SVpENALTyBOX.L.BOTTOM.Y - 1;						//subtracting 1 for better corner look
      this.GraphicsTool.DrawHorizontalLine(coords, -254, "white", 3);
   }

   //Right penalty box
   if (SpaceUtils.CheckPointInBox(SVpENALTyBOX.R.TOP, this.ScreenRect)) {		//check if top-left corner is visible
      coords.X = SVpENALTyBOX.R.TOP.X - this.ScreenRect.L;
      coords.Y = SVpENALTyBOX.R.TOP.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, 207, "white", 3);
      coords2.X = SVpENALTyBOX.R.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
      coords2.Y = SVpENALTyBOX.R.BOTTOM.Y;						//	avoidable via calculations
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   }
   if (SpaceUtils.CheckPointInBox(SVpENALTyBOX.R.BOTTOM, this.ScreenRect)) {		//check if bottom-left corner is visible
      coords.X = SVpENALTyBOX.R.BOTTOM.X - this.ScreenRect.L;
      coords.Y = SVpENALTyBOX.R.BOTTOM.Y - 1;						//subtracting 1 for better corner look
      this.GraphicsTool.DrawHorizontalLine(coords, 254, "white", 3);
   }

   //Penalty spots
   if (SpaceUtils.CheckPointInBox(SVpENALTySPOT.L, this.ScreenRect))						//left
      this.GraphicsTool.DrawCircle(SVpENALTySPOT.L.X-this.ScreenRect.L, SVpENALTySPOT.L.Y, 3, "white", 0);
   if (SpaceUtils.CheckPointInBox(SVpENALTySPOT.R, this.ScreenRect))						//right
      this.GraphicsTool.DrawCircle(SVpENALTySPOT.R.X-this.ScreenRect.L, SVpENALTySPOT.R.Y, 3, "white", 0);
};
FootballTesting.prototype.DrawGoalBoxes = function() {

   //Left goal area
   if (SpaceUtils.CheckPointInBox(SVgOAlBOX.L.TOP, this.ScreenRect)) {		//check if top-right corner is visible
      coords.X = SVgOAlBOX.L.TOP.X - this.ScreenRect.L;
      coords.Y = SVgOAlBOX.L.TOP.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, -70, "white", 3);
      coords2.X = SVgOAlBOX.L.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
      coords2.Y = SVgOAlBOX.L.BOTTOM.Y;							//	avoidable via calculations
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   }
   if (SpaceUtils.CheckPointInBox(SVgOAlBOX.L.BOTTOM, this.ScreenRect)) {		//check if bottom-right corner is visible
      coords.X = SVgOAlBOX.L.BOTTOM.X - this.ScreenRect.L;
      coords.Y = SVgOAlBOX.L.BOTTOM.Y - 1;
      this.GraphicsTool.DrawHorizontalLine(coords, -75, "white", 3);
   }

   //Right goal area
   if (SpaceUtils.CheckPointInBox(SVgOAlBOX.R.TOP, this.ScreenRect)) {			//check if top-left corner is visible
      coords.X = SVgOAlBOX.R.TOP.X - this.ScreenRect.L;
      coords.Y = SVgOAlBOX.R.TOP.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, 70, "white", 3);
      coords2.X = SVgOAlBOX.R.BOTTOM.X - this.ScreenRect.L;				//TODO: plenty of off-screen drawing,
      coords2.Y = SVgOAlBOX.R.BOTTOM.Y - 1;							//	avoidable via calculations
      this.GraphicsTool.DrawLine(coords, coords2, "white", 3);
   }
   if (SpaceUtils.CheckPointInBox(SVgOAlBOX.R.BOTTOM, this.ScreenRect)) {		//check if bottom-left corner is visible
      coords.X = SVgOAlBOX.R.BOTTOM.X - this.ScreenRect.L;
      coords.Y = SVgOAlBOX.R.BOTTOM.Y;
      this.GraphicsTool.DrawHorizontalLine(coords, 75, "white", 3);
   }
};
FootballTesting.prototype.DrawGoalposts = function() {

   //Left goal
/*
   if (PerspectiveUtils.CheckOnScreen(SVgOAlFRAME.NEAR.L[0], this.ScreenQuad))
      this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.NEAR.L, "white", 3);
*/
   if (this.ScreenRect.L<SVgOAlFRAME.FAR.L[0].X) {
      this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.FAR.L, "white", 3);
      DrawLine(SVgOAlFRAME.FAR.L[0], SVgOAlFRAME.NEAR.L[0], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//crossbar
      DrawLine(SVgOAlFRAME.FAR.L[3], SVgOAlFRAME.NEAR.L[3], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back bar
      DrawLine(SVgOAlFRAME.FAR.L[2], SVgOAlFRAME.NEAR.L[2], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back line
   }
   if (this.ScreenRect.L<SVgOAlFRAME.NEAR.L[0].X)
      this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.NEAR.L, "white", 3);

   //Right goal
   if (this.ScreenRect.L+SCREEN.WIDTH>=SVgOAlFRAME.FAR.R[0].X) {
      this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.FAR.R, "white", 3);
      DrawLine(SVgOAlFRAME.FAR.R[0], SVgOAlFRAME.NEAR.R[0], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//crossbar
      DrawLine(SVgOAlFRAME.FAR.R[3], SVgOAlFRAME.NEAR.R[3], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back bar
      DrawLine(SVgOAlFRAME.FAR.R[2], SVgOAlFRAME.NEAR.R[2], this.Stanchion1, this.Stanchion2, this.GraphicsTool, this.ScreenRect);	//back line
   }
   if (this.ScreenRect.L+SCREEN.WIDTH>=SVgOAlFRAME.NEAR.R[0].X)
      this.GraphicsTool.DrawPolygon(-this.ScreenRect.L, 0, SVgOAlFRAME.NEAR.R, "white", 3);

   function DrawLine(pnt1, pnt2, stnchn1, stnchn2, gTool, sRect) {

      stnchn1.X = pnt1.X - sRect.L;
      stnchn1.Y = pnt1.Y;
      stnchn2.X = pnt2.X - sRect.L;
      stnchn2.Y = pnt2.Y;
      gTool.DrawLine(stnchn1, stnchn2, "white", 3);
   }

   //TODO: semi-circles
};
FootballTesting.prototype.DrawCornerFlags = function() {

   //UNLOGGED

};
FootballTesting.prototype.UpdateKeys = function() {

   Controller.CheckControls();
   if (Controller.Left)  --this.ScreenRect.L;
   if (Controller.Right) ++this.ScreenRect.L;

   //Normalize
   if (this.ScreenRect.L<0)
      this.ScreenRect.L = 0;
   if (this.ScreenRect.L>PITCH.SIDeVIEW.W-(SCREEN.WIDTH+1))
      this.ScreenRect.L = PITCH.SIDeVIEW.W - (SCREEN.WIDTH+1);

   //Set screen quad
   PerspectiveUtils.DetermineQuad(this.ScreenRect.L, 800, this.ScreenQuad);
};
