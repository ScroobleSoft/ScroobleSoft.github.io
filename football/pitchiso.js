
//pitch rendering
//one array for pitch corners (4 entries)
//several arrays for markings
//store midpoint of screen; store which point of pitch that depicts
//don't need to store coordinates of half-way line since these can be computed
//will try to do the same for 18 yard box, 6 yard box, and maybe even center circle and the two D's; also 3 dots and 4
// corners
//Now do computation, repeat for every frame (perhaps only if key is pressed)
//Above is not entirely accurate, since marking dimensions are little smaller than the actual pitch, and the green polygon // will have to be calculated differently; could use the same procedure for this as field markings, except to keep a
// record if point is not found on screen
//don't scroll off screen!

//TODO: this should be extensible to ZOOMing in and out by storing ISOPITCH dimensions in an attribute array
//TODO: ZOOMing also should increase thickness of markings, in steps, up to a maximum
//TODO: see if simply drawing pitch w/o truncation may actually be more efficient
//TODO: conversely, could clean markings implementation by not drawing what's off-screen

var FootballPitch = function() {
   var Screen;
   var ScreenWidth;
   var ScreenHeight;
   var LeftHalf, RightHalf;
   var LeftPenaltyBox, RightPenaltyBox;
   var LeftGoalBox, RightGoalBox;

   var OnScreen;	//rectangle showing what part of pitch is currently on screen
};
FootballPitch.prototype = {
   Set(interface) {
      this.Screen = interface.PrimeScape.Context;
      this.ScreenWidth = interface.PrimeScape.Element.width;
      this.ScreenHeight = interface.PrimeScape.Element.height;

      this.OnScreen = new GenieRect();
      this.AlignScreenPitchCentres();
      this.SetMarkings();
   },
   SetMarkings() {
      var x, y;

      //Left half markings
      this.LeftHalf = new Array();
      this.LeftHalf.push( {X: ISOPITCH.LX+10, Y:ISOPITCH.LY} );
      this.LeftHalf.push( {X: (ISOPITCH.TX-ISOPITCH.LX)/2, Y: ((ISOPITCH.LY-ISOPITCH.TY)/2)+6} );
      this.LeftHalf.push( {X: ISOPITCH.BX+((ISOPITCH.RX-ISOPITCH.BX)/2), Y: ISOPITCH.BY-6-((ISOPITCH.BY-ISOPITCH.RY)/2)} );
      this.LeftHalf.push( {X: ISOPITCH.BX, Y: ISOPITCH.BY-6} );

      //Right half markings
      this.RightHalf = new Array();
      this.RightHalf.push( {X: (ISOPITCH.TX-ISOPITCH.LX)/2, Y: ((ISOPITCH.LY-ISOPITCH.TY)/2)+6} );
      this.RightHalf.push( {X: ISOPITCH.TX, Y:ISOPITCH.TY+6} );
      this.RightHalf.push( {X: ISOPITCH.RX-10, Y: ISOPITCH.RY} );
      this.RightHalf.push( {X: ISOPITCH.BX+((ISOPITCH.RX-ISOPITCH.BX)/2), Y: ISOPITCH.BY-6-((ISOPITCH.BY-ISOPITCH.RY)/2)});

      //Left penalty box markings
      this.LeftPenaltyBox = new Array();
      x = ISOPITCH.LX + ((ISOPITCH.BX-ISOPITCH.LX)*ISOPITCH.PBOXRATIOV);  //PBOXRATIOV is actually distance to touch-line
      y = ISOPITCH.LY + ((ISOPITCH.BY-ISOPITCH.LY)*ISOPITCH.PBOXRATIOV);
      this.LeftPenaltyBox.push( {X: x+10, Y: y} );
      x += (((ISOPITCH.TX-ISOPITCH.LX)/2)*ISOPITCH.PBOXRATIOH);
      y -= ((ISOPITCH.LY-ISOPITCH.TY)/2)*ISOPITCH.PBOXRATIOH;
      this.LeftPenaltyBox.push( {X: x+10, Y: y} );
      x = ISOPITCH.BX - (ISOPITCH.BX-ISOPITCH.LX)*ISOPITCH.PBOXRATIOV;
      y = ISOPITCH.BY - (ISOPITCH.BY-ISOPITCH.LY)*ISOPITCH.PBOXRATIOV;
      this.LeftPenaltyBox.push( {X: x+10, Y: y} );
      x += (((ISOPITCH.TX-ISOPITCH.LX)/2)*ISOPITCH.PBOXRATIOH);
      y -= ((ISOPITCH.LY-ISOPITCH.TY)/2)*ISOPITCH.PBOXRATIOH;
      this.LeftPenaltyBox.splice(2, 0, {X: x+10, Y: y} );

      //Right penalty box markings
      this.RightPenaltyBox = new Array();
      x = ISOPITCH.TX + ((ISOPITCH.RX-ISOPITCH.TX)*ISOPITCH.PBOXRATIOV);
      y = ISOPITCH.TY + ((ISOPITCH.RY-ISOPITCH.TY)*ISOPITCH.PBOXRATIOV);
      this.RightPenaltyBox.push( {X: x-10, Y: y} );
      x -= (((ISOPITCH.TX-ISOPITCH.LX)/2)*ISOPITCH.PBOXRATIOH);
      y += ((ISOPITCH.LY-ISOPITCH.TY)/2)*ISOPITCH.PBOXRATIOH;
      this.RightPenaltyBox.push( {X: x-10, Y: y} );
      x = ISOPITCH.RX - (ISOPITCH.RX-ISOPITCH.TX)*ISOPITCH.PBOXRATIOV;
      y = ISOPITCH.RY - (ISOPITCH.RY-ISOPITCH.TY)*ISOPITCH.PBOXRATIOV;
      this.RightPenaltyBox.push( {X: x-10, Y: y} );
      x -= (((ISOPITCH.TX-ISOPITCH.LX)/2)*ISOPITCH.PBOXRATIOH);
      y += ((ISOPITCH.LY-ISOPITCH.TY)/2)*ISOPITCH.PBOXRATIOH;
      this.RightPenaltyBox.splice(2, 0, {X: x-10, Y: y} );

      //Left goal box markings
      this.LeftGoalBox = new Array();
      x = ISOPITCH.LX + ((ISOPITCH.BX-ISOPITCH.LX)*(1-ISOPITCH.GBOXRATIOV))/2;
      y = ISOPITCH.LY + ((ISOPITCH.BY-ISOPITCH.LY)*(1-ISOPITCH.GBOXRATIOV))/2;
      this.LeftGoalBox.push( {X: x+10, Y: y} );
      x += ((ISOPITCH.TX-ISOPITCH.LX)/2)*(ISOPITCH.GBOXRATIOH);
      y -= ((ISOPITCH.LY-ISOPITCH.TY)/2)*(ISOPITCH.GBOXRATIOH);
      this.LeftGoalBox.push( {X: x+10, Y: y} );
      x = ISOPITCH.BX - ((ISOPITCH.BX-ISOPITCH.LX)*(1-ISOPITCH.GBOXRATIOV))/2;
      y = ISOPITCH.BY - ((ISOPITCH.BY-ISOPITCH.LY)*(1-ISOPITCH.GBOXRATIOV))/2;
      this.LeftGoalBox.push( {X: x+10, Y: y} );
//      x += (((ISOPITCH.TX-ISOPITCH.LX)/2)*ISOPITCH.GBOXRATIOH);
//      y -= (ISOPITCH.BY-ISOPITCH.LY)*ISOPITCH.GBOXRATIOV;
      x += ((ISOPITCH.TX-ISOPITCH.LX)/2)*(ISOPITCH.GBOXRATIOH);
      y -= ((ISOPITCH.LY-ISOPITCH.TY)/2)*(ISOPITCH.GBOXRATIOH);
      this.LeftGoalBox.splice(2, 0, {X: x+10, Y: y} );

      //Right goal box markings
      this.RightGoalBox = new Array();
      x = ISOPITCH.TX + ((ISOPITCH.BX-ISOPITCH.LX)*(1-ISOPITCH.GBOXRATIOV))/2;
      y = ISOPITCH.TY + ((ISOPITCH.BY-ISOPITCH.LY)*(1-ISOPITCH.GBOXRATIOV))/2;
      this.RightGoalBox.push( {X: x-10, Y: y} );
      x -= ((ISOPITCH.TX-ISOPITCH.LX)/2)*(ISOPITCH.GBOXRATIOH);
      y += ((ISOPITCH.LY-ISOPITCH.TY)/2)*(ISOPITCH.GBOXRATIOH);
      this.RightGoalBox.push( {X: x-10, Y: y} );
      x = ISOPITCH.RX - ((ISOPITCH.RX-ISOPITCH.TX)*(1-ISOPITCH.GBOXRATIOV))/2;
      y = ISOPITCH.RY - ((ISOPITCH.RY-ISOPITCH.TY)*(1-ISOPITCH.GBOXRATIOV))/2;
      this.RightGoalBox.push( {X: x+10, Y: y} );
      x -= ((ISOPITCH.TX-ISOPITCH.LX)/2)*(ISOPITCH.GBOXRATIOH);
      y += ((ISOPITCH.LY-ISOPITCH.TY)/2)*(ISOPITCH.GBOXRATIOH);
      this.RightGoalBox.splice(2, 0, {X: x+10, Y: y} );
   },
   AlignScreenPitchCentres() {
      var left, top;

      //Calibrate centre spot w/ screen centre
      left = ((ISOPITCH.RX-ISOPITCH.LX) - this.ScreenWidth)/2;
      top = ((ISOPITCH.BY-ISOPITCH.TY) - this.ScreenHeight)/2;
      this.OnScreen.Set(left, top, this.ScreenWidth, this.ScreenHeight);
   },
   Draw() {
      var x, y;
      var grassPolygon;

      this.Screen.clearRect(0, 0, this.ScreenWidth, this.ScreenHeight);

      //Draw grass
      grassPolygon = new Array();
      x = ISOPITCH.LX;
      y = ISOPITCH.LY;
      while(!this.OnScreen.CheckPointInside(x, y)) {  //check how much of top-left portion is visible
	 ++x;
	 y -= (ISOPITCH.LY-ISOPITCH.TY)/(ISOPITCH.TX-ISOPITCH.LX);
	 if (y<this.OnScreen.T) {
	    x = this.OnScreen.L;
	    y = this.OnScreen.T;
	    break;
	 }
      }
      grassPolygon.push(this.PitchToScreen(x, y));
      if (!(x==this.OnScreen.L && y==this.OnScreen.T)) {  //get second point on same line if needed
	 x = ISOPITCH.TX;
	 y = ISOPITCH.TY;
	 while(!this.OnScreen.CheckPointInside(x, y)) {
	    --x;
	    y += (ISOPITCH.LY-ISOPITCH.TY)/(ISOPITCH.TX-ISOPITCH.LX);
	 }
	 grassPolygon.push(this.PitchToScreen(x, y));
      }
      x = ISOPITCH.TX;
      y = ISOPITCH.TY;
      while(!this.OnScreen.CheckPointInside(x, y)) {  //check how much of top-right portion is visible
	 ++x;
	 y += (ISOPITCH.RY-ISOPITCH.TY)/(ISOPITCH.RX-ISOPITCH.TX);
	 if (x>(this.OnScreen.L+this.OnScreen.W)) {
	    x = this.OnScreen.L+this.OnScreen.W;
	    y = this.OnScreen.T;
	    break;
	 }
      }
      grassPolygon.push(this.PitchToScreen(x, y));
      if (!((x==this.OnScreen.L+this.OnScreen.W) && y==this.OnScreen.T)) {  //get second point on same line if needed
	 x = ISOPITCH.RX;
	 y = ISOPITCH.RY;
	 while(!this.OnScreen.CheckPointInside(x, y)) {
	    --x;
	    y -= (ISOPITCH.RY-ISOPITCH.TY)/(ISOPITCH.RX-ISOPITCH.TX);
	 }
	 grassPolygon.push(this.PitchToScreen(x, y));
      }
      x = ISOPITCH.RX;
      y = ISOPITCH.RY;
      while(!this.OnScreen.CheckPointInside(x, y)) {  //check how much of bottom-right portion is visible
	 --x;
	 y += (ISOPITCH.BY-ISOPITCH.RY)/(ISOPITCH.RX-ISOPITCH.BX);
	 if (y>(this.OnScreen.T+this.OnScreen.H)) {
	    x = this.OnScreen.L+this.OnScreen.W;
	    y = this.OnScreen.T+this.OnScreen.H;
	    break;
	 }
      }
      grassPolygon.push(this.PitchToScreen(x, y));
      if (!((x==this.OnScreen.L+this.OnScreen.W) && (y==this.OnScreen.T+this.OnScreen.H))) {  //get second point if needed
	 x = ISOPITCH.BX;
	 y = ISOPITCH.BY;
	 while(!this.OnScreen.CheckPointInside(x, y)) {
	    ++x;
	    y -= (ISOPITCH.BY-ISOPITCH.RY)/(ISOPITCH.RX-ISOPITCH.BX);
	 }
	 grassPolygon.push(this.PitchToScreen(x, y));
      }
      x = ISOPITCH.BX;
      y = ISOPITCH.BY;
      while(!this.OnScreen.CheckPointInside(x, y)) {  //check how much of bottom-left portion is visible
	 --x;
	 y -= (ISOPITCH.BY-ISOPITCH.LY)/(ISOPITCH.BX-ISOPITCH.LX);
	 if (x<this.OnScreen.L) {
	    x = this.OnScreen.L;
	    y = this.OnScreen.T+this.OnScreen.H;
	    break;
	 }
      }
      grassPolygon.push(this.PitchToScreen(x, y));
      if (!(x==this.OnScreen.L && (y==this.OnScreen.T+this.OnScreen.H))) {  //get second point on same line if needed
	 x = ISOPITCH.LX;
	 y = ISOPITCH.LY;
	 while(!this.OnScreen.CheckPointInside(x, y)) {
	    ++x;
	    y += (ISOPITCH.BY-ISOPITCH.LY)/(ISOPITCH.BX-ISOPITCH.LX);
	 }
	 grassPolygon.push(this.PitchToScreen(x, y));
      }
      FootieGraphics.DrawPolygon(0, 0, grassPolygon, ISOPITCH.COLOUR, 0);

      this.DrawMarkings(this.LeftHalf);
      this.DrawMarkings(this.RightHalf);
      this.DrawMarkings(this.LeftPenaltyBox);
      this.DrawMarkings(this.RightPenaltyBox);
      this.DrawMarkings(this.LeftGoalBox);
//      this.DrawRightGoalBox();
//      this.DrawCenterCircle();
//      this.DrawPenaltyArcs();
//      this.DrawPenaltySpots();
//      this.DrawCornerArcs();
   },
   PitchToScreen(x, y) {
      var screenX, screenY;

      screenX = x- this.OnScreen.L;
      screenY = y - this.OnScreen.T;

      return({X: screenX, Y: screenY});
   },
   DrawMarkings(diamond) {
      var i;
      var screenCoords;

      this.Screen.beginPath();
      this.Screen.strokeStyle = "white";
      this.Screen.lineWidth = 3;
	 screenCoords = this.PitchToScreen(diamond[0].X, diamond[0].Y);
      this.Screen.moveTo(screenCoords.X, screenCoords.Y);
      for (i=1;i<diamond.length;++i) {
	 screenCoords = this.PitchToScreen(diamond[i].X, diamond[i].Y);
	 this.Screen.lineTo(screenCoords.X, screenCoords.Y);
      }
	 screenCoords = this.PitchToScreen(diamond[0].X, diamond[0].Y);
      this.Screen.lineTo(screenCoords.X, screenCoords.Y);
      this.Screen.stroke();
   }
};
