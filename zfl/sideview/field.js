
//-------------------------------------------------------
//---------- GRIDIRON SIDEVIEW FIELD --------------------  NOTE: yardage is numbered left to right
var GridironSideViewField = function() {
   var Screen;
   var GraphicsTool, TextWriter;

   var LineOfScrimmage;		//yards
   var Direction;
   var LeftEdge, RightEdge;
   var HomePrimaryColour, HomeSecondaryColour;

   var i, pnt;
};
GridironSideViewField.prototype = {
   Set(cntxt, gTool, tWriter) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;

      this.LineOfScrimmage = 50;
      this.LeftEdge = 35;
      this.RightEdge = 65;
      this.Direction = DIRECTION.RIGHT;		//NOTE: chosen arbitrarily

      this.pnt = new Coordinate2D();
   },
   SetHomeTeam(team) {  //NOTE: this is needed for end zone colours and 50 yard line logo

      //UNLOGGED

      //-set home team colour
      this.HomePrimaryColour = "green";		//TEMP HACK!
      this.HomeSecondaryColour = "yellow";	//TEMP HACK!
   },
   Draw() {

      //Surface
      this.Screen.fillStyle = GREEN.TWO;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, 450);

      //Markings
      this.GraphicsTool.DrawRectangle(0, 30, SCREEN.WIDTH, 10, "white", 0);
      this.GraphicsTool.DrawRectangle(0, 440, SCREEN.WIDTH, 10, "white", 0);
      this.DrawLeftYardLines();
      this.Draw50YardLine();
      this.DrawRightYardLines();

      //End zones
      if (this.LeftEdge<0)
	 this.DrawLeftEndZone();
      if (this.RightEdge>100)
	 this.DrawRightEndZone();
   },
   Update(los) {

      this.LineOfScrimmage = los;

      //Set window edges
      if (this.Direction==DIRECTION.RIGHT) {
	 this.LeftEdge = this.LineOfScrimmage - 10;
	 this.RightEdge = this.LineOfScrimmage + 20;
      } else {
	 this.LeftEdge = this.LineOfScrimmage - 20;
	 this.RightEdge = this.LineOfScrimmage + 10;
      }

      //Overflow correction
      if (this.LeftEdge<10)
	 this.LeftEdge = 10;
      if (this.RightEdge>110)
	 this.RightEdge = 110;
   },
   DrawLeftEndZone() {

      this.Screen.fillStyle = this.HomePrimaryColour;
      this.Screen.fillRect(0, 0, -this.LeftEdge, 450);
      this.GraphicsTool.DrawRectangle(-this.LeftEdge, 40, 4, 400, "white", 0);
   },
   DrawLeftYardLines() {

      for (this.i=5;this.i<50;this.i+=5)
	 if ( (this.i>(this.LeftEdge-1)) && (this.i<(this.RightEdge+1)) ) {

	    //Line
	    this.pnt.X = 20*(this.i-this.LeftEdge);
	    this.pnt.Y = 40;
	    if (this.i % 10)
	       this.GraphicsTool.DrawVerticalLine(this.pnt, 400, "white", 1);
	    else {
	       this.GraphicsTool.DrawVerticalLine(this.pnt, 400, "white", 2);

	       //Yardage
	       this.TextWriter.Write(parseInt(this.i/10), this.pnt.X-10, 75, { COLOUR: "white" } );
	       this.TextWriter.Write("0", this.pnt.X+4, 75, { COLOUR: "white" } );
	       this.TextWriter.Write(parseInt(this.i/10), this.pnt.X-10, 415, { COLOUR: "white" } );
	       this.TextWriter.Write("0", this.pnt.X+4, 415, { COLOUR: "white" } );
	    }
	 }
   },
   Draw50YardLine() {

      if ( (50>(this.LeftEdge-1)) && (50<(this.RightEdge+1)) ) {

	 //Line
	 this.pnt.X = 20*(50-this.LeftEdge);
	 this.pnt.Y = 40;
	 this.GraphicsTool.DrawVerticalLine(this.pnt, 170, "white", 3);
	 this.pnt.Y = 270;
	 this.GraphicsTool.DrawVerticalLine(this.pnt, 170, "white", 3);

	 //Logo
	 this.GraphicsTool.DrawArc(this.pnt.X, 240, 30, 180, 90, this.HomePrimaryColour, 0);
	 this.GraphicsTool.DrawCircle(this.pnt.X-10, 230, 10, this.HomeSecondaryColour, 0);
      }
   },
   DrawRightYardLines() {

      for (this.i=55;this.i<100;this.i+=5)
	 if ( (this.i>(this.LeftEdge-1)) && (this.i<(this.RightEdge+1)) ) {

	    //Line
	    this.pnt.X = 20*(this.i-this.LeftEdge);
	    this.pnt.Y = 40;
	    if (this.i % 10)
	       this.GraphicsTool.DrawVerticalLine(this.pnt, 400, "white", 1);
	    else {
	       this.GraphicsTool.DrawVerticalLine(this.pnt, 400, "white", 2);

	       //Yardage
	       this.TextWriter.Write(parseInt((100-this.i)/10), this.pnt.X-10, 75, { COLOUR: "white" } );
	       this.TextWriter.Write("0", this.pnt.X+4, 75, { COLOUR: "white" } );
	       this.TextWriter.Write(parseInt((100-this.i)/10), this.pnt.X-10, 415, { COLOUR: "white" } );
	       this.TextWriter.Write("0", this.pnt.X+4, 415, { COLOUR: "white" } );
	    }
	 }
   },
   DrawRightEndZone() {

      this.Screen.fillStyle = this.HomePrimaryColour;
      this.Screen.fillRect(SCREEN.WIDTH-this.RightEdge, 0, this.RightEdge, 450);
      this.GraphicsTool.DrawRectangle(SCREEN.WIDTH-this.RightEdge, 40, 4, 400, "white", 0);
   }
};
