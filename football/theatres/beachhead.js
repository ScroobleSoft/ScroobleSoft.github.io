/*
 *  UNLOGGED
 */
//var MICRoINTERDICTOrSPRITE = { L: 3, T: 82, W: 44, H: 55 };
var MICRoINTERDICTOrSPRITE = { L: 84, T: 96, W: 32, H: 27 };
var INTERDICTOrTARGETING = { X: 110, Y: 125 };

var MICRoSTRAFErSPRITE = { W: 42, H: 16, GS: [ [ SHAPE.POLYGON, "darkgrey", 0, [0,0,42,3] ],
					       [ SHAPE.POLYGON, "black",    1, [0,0,42,3] ],
					       [ SHAPE.POLYGON, "grey",     0, [0,0,21,3] ],
					       [ SHAPE.POLYGON, "black",    1, [0,0,21,3] ]  ] };
var TempStraferSprite;

//NOTE: going to use above specs to create polygons that squish from size 42 to 42x16, and half that for wings
/*
   On defending side there will be:
    .strafers
    .helicopters
    .AAGuns-SAMPads-SSMPads-Stilettos
    .usual army units
   On attacking side there will be:
    .landing boats with all army units (up to 20 of them)
    .gun boats
    .missile boats
   To begin with, going to have:
    .strafers+helicopters and LARTs vs
    .AAGuns+SAMs+LARTs as well as GunBoats carrying helicopters/strafers

   Strafer elevation will be 150
   Helicopter elevation will be 75
*/
//----------------------------------------------------------
//---------- DOMINION BEACHHEAD THEATRE --------------------
var DominionBeachheadTheatre = function() {
   var LandingForce, RepellingForce;
};
DominionBeachheadTheatre.prototype = new DominionTheatre();
DominionBeachheadTheatre.prototype.SetForces = function(lForce, rForce) {
};

//---------------------------------------------------------
//---------- DOMINION LAND SEA THEATRE --------------------
var DominionLandSeaTheatre = function() {
   var Screen;
   var InfoBox;
   var GraphicsTool;
   var CalcPad;
   var AnimationFrameHandle;
   var ScreenRect;

   var TerrainPolygons;
   var InfoBoxPolygons;

   var OctagonVertices;
   var LeftHalfOctagonVertices;
   var RightHalfOctagonVertices;
   var InfoBoxOctagonVertices;

   var Strafer;
   var Angle;
   var TurretRotationDirection;
   var MicroInterdictorSprite;
   var InterdictorPosition;
   var AAGunAgent;
   var TargetingColour;
   var TargetingText;

   var MicroStrafers, MicroStraferSprite;
   var AAGuns;

   var distance;
   var colour;
};
DominionLandSeaTheatre.prototype = {
   Set(cntxt, iBox, gTool, cPad) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.GraphicsTool = gTool;
      this.CalcPad = cPad;

      this.OctagonVertices = this.CalcPad.GetOctagonVertices(SCREEN.WIDTH);
      //TODO: above needs to be corrected now that size is 2*SCREEN.WIDTH; below then will need to be vertex.Y /= 4;
      //TODO: distance between x of vertex 3 and 4 has to be recorded to monitor what to draw while scrolling
      this.OctagonVertices.forEach(function(vertex) {vertex.Y /= 2;});
//      this.LeftHalfOctagonVertices = new Array();
      this.LeftHalfOctagonVertices = this.OctagonVertices.slice(0, 4);
      this.LeftHalfOctagonVertices.unshift( { X: 0, Y: this.OctagonVertices[0].Y } );
      this.LeftHalfOctagonVertices.push( { X: 0, Y: this.OctagonVertices[3].Y } );
//      this.RightHalfOctagonVertices = new Array();
      this.RightHalfOctagonVertices = this.OctagonVertices.slice(4);
      this.RightHalfOctagonVertices.unshift( { X: 0, Y: this.OctagonVertices[4].Y } );
      this.RightHalfOctagonVertices.push( { X: 0, Y: this.OctagonVertices[7].Y } );

      this.ScreenRect = new GenieRect();
      this.ScreenRect.L = 300;
      this.ScreenRect.T = 100;
      this.ScreenRect.W = 700;
      this.ScreenRect.H = 450;
      this.DetermineTerrainPolygons();
      var polygon = this.CalcPad.GetTruncatedPolygon(this.TerrainPolygons[0], this.ScreenRect);

      this.Strafer = new DominionStrafer();
      this.Strafer.Set(TEMpFIGHTER, StraferSprite);
      this.Strafer.SetLinks(this.ScreenRect, this.InfoBox, this.GraphicsTool);
      this.Strafer.SetPosition( { X: 100, Y: 300 } );
      this.Strafer.SetDirection(DIRECTION.E);
      StraferSprite.Rotate(90);

      this.SetMicroStrafers();
      this.SetAAGuns();

      this.Angle = 0;
      this.TurretRotationDirection = DIRECTION.LEFT;
      this.MicroInterdictorSprite = new StaticSprite();
      this.MicroInterdictorSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MICRoSPRITES], MICRoINTERDICTOrSPRITE);
      this.InterdictorPosition = new Coordinate2D();
      this.InterdictorPosition.X = 100;
      this.InterdictorPosition.Y = 100;
      this.AAGunAgent = new DominionAAGun();
      this.AAGunAgent.Set(null, AAGunSprite);
      this.AAGunAgent.SetPosition( { X: 400, Y: 400 } );
      this.AAGunAgent.TargetPosition = this.InterdictorPosition;
//      this.AAGunAgent.Target = this.Interdictor;
//      this.AAGunAgent.SetExtraLinks(AAGunTurretSprite);
//      this.AAGunAgent.Monitor(this.InterdictorPosition);

      this.TargetingColour = new TransitionalColour();
      this.TargetingColour.Set( "rgb(000,255,000)", "rgb(255,000,000)" );
      this.TargetingText = new GenieText();
      this.TargetingText.Set(this.InfoBox, INTERDICTOrTARGETING);

      this.InfoBox.fillStyle = "yellow";
      this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

      TempStraferSprite = new GeometricSprite();
      TempStraferSprite.Set(this.Screen, MicroStraferSpriteSpecs[0], this.GraphicsTool);
   },
   DetermineTerrainPolygons() {
      var i;
      var octagon;
      var triangle;

      //Main screen - determine coords of 2 octagons and 6 triangles
      //IMPLEMENTATION: first left octagon coords are attached, then those of triangles, and finally right octagon
      this.TerrainPolygons = new Array();
      octagon = this.CalcPad.GetOctagonVertices(SCREEN.WIDTH);		//left octagon
      this.CalcPad.VerticesToScreenCoords(octagon, SCREEN.WIDTH/2, SCREEN.WIDTH/2);
      for (i=0;i<octagon.length;++i) {
	 octagon[i].Y /= 2;		//squish octagon vertically (by half)
	 octagon[i].Y += 150;		//move octagon to bottom of screen
      }
      this.TerrainPolygons.push(octagon);		
      triangle = new Array();						//top-left
      triangle.push( { X: 0, Y: 0 } );
      triangle.push( { X: octagon[7].X, Y: 0 } );
      triangle.push( { X: 0, Y: octagon[1].Y } );
      this.TerrainPolygons.push(triangle);
      triangle = new Array();						//top-middle
      triangle.push( { X: octagon[0].X, Y: 0 } );
      triangle.push( { X: (SCREEN.WIDTH*2)-octagon[0].X, Y: 0 } );
      triangle.push( { X: SCREEN.WIDTH, Y: octagon[1].Y } );
      this.TerrainPolygons.push(triangle);
      triangle = new Array();						//top-right
      triangle.push( { X: (SCREEN.WIDTH*2)-octagon[7].X, Y: 0 } );
      triangle.push( { X: (SCREEN.WIDTH*2), Y: 0 } );
      triangle.push( { X: 0, Y: octagon[1].Y } );
      this.TerrainPolygons.push(triangle);
      triangle = new Array();						//bottom-right
      triangle.push( { X: SCREEN.WIDTH*2, Y: octagon[5].Y } );
      triangle.push( { X: SCREEN.WIDTH*2, Y: SCREEN.HEIGHT } );
      triangle.push( { X: (SCREEN.WIDTH*2)-octagon[7].X, Y: SCREEN.HEIGHT } );
      this.TerrainPolygons.push(triangle);
      triangle = new Array();						//bottom-middle
      triangle.push( { X: (SCREEN.WIDTH*2)-octagon[0].X, Y: SCREEN.HEIGHT } );
      triangle.push( { X: octagon[0].X, Y: SCREEN.HEIGHT } );
      triangle.push( { X: SCREEN.WIDTH, Y: octagon[2].Y } );
      this.TerrainPolygons.push(triangle);
      triangle = new Array();				//bottom-left
      triangle.push( { X: octagon[7].X, Y: SCREEN.WIDTH } );
      triangle.push( { X: 0, Y: SCREEN.HEIGHT } );
      triangle.push( { X: 0, Y: octagon[5].Y } );
      this.TerrainPolygons.push(triangle);
      octagon = this.CalcPad.GetOctagonVertices(SCREEN.WIDTH);		//right octagon
      this.CalcPad.VerticesToScreenCoords(octagon, SCREEN.WIDTH*(3/2), SCREEN.WIDTH/2);
      for (i=0;i<octagon.length;++i) {
	 octagon[i].Y /= 2;		//squish octagon vertically (by half)
	 octagon[i].Y += 150;		//move octagon to bottom of screen
      }
      this.TerrainPolygons.push(octagon);		

      //Info Box
//      this.InfoBoxOctagonVertices = Utilities.CreateArray(8, Coordinate2D);
      
   },
   SetMicroStrafers() {

      //UNLOGGED

      this.MicroStraferSprite = new GeometricSprite();
      this.MicroStraferSprite.Set(this.Screen, MICRoSTRAFErSPRITE, this.GraphicsTool);
      this.MicroStrafers = new GenieArray();
      this.MicroStrafers.Set(8, DominionStrafer, INDEXED, { SPEED: 0.5 }, this.MicroStraferSprite);
      for (indx=0;indx<this.MicroStrafers.length;++indx) {
	 if (indx % 2)
	    coords.X = 860;
	 else
	    coords.X = 800;
	 coords.Y = 40 + (40*indx);
	 this.MicroStrafers[indx].SetPosition(coords);
	 this.MicroStrafers[indx].SetDirection(DIRECTION.W);
	 this.MicroStrafers[indx].Elevation = 100;	//could actually be 200, 100 for helicopters; think will also try 75-100
      }

      //NOTE: this will eventually be done via SetNation
      for (indx=0;indx<MICRoSTRAFErSPRITE.GS.length;++indx)
	 MICRoSTRAFErSPRITE.GS[indx][3][3] = 8;
   },
   SetAAGuns() {

      //UNLOGGED

      this.AAGuns = new GenieArray();
      this.AAGuns.Set(8, DominionAAGun, INDEXED, null, AAGunSprite);
      for (indx=0;indx<this.AAGuns.length;++indx) {
	 coords.X = 40;
	 coords.Y = 140 + (50*indx);
	 this.AAGuns[indx].SetPosition(coords);
	 this.AAGuns[indx].SetDirection(DIRECTION.E);
      }
   },
   DrawBackground() {

      //Main screen terrain
      this.Screen.fillStyle = "lightgray";
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      this.GraphicsTool.DrawPolygon(0, SCREEN.HEIGHT/2, this.LeftHalfOctagonVertices, "green", 0);
      this.GraphicsTool.DrawPolygon(SCREEN.WIDTH, SCREEN.HEIGHT/2, this.RightHalfOctagonVertices, "dodgerblue", 0);
      //TODO: draw walls please

      //Info Box terrain
   },
   DrawTargetingBullsEye() {
      //Determine correct colour; NOTE: distance of >400 will be indicated by yellow, <200 by red
      this.distance = Utilities.GetDistance(this.AAGunAgent.Position, this.InterdictorPosition);
      if (this.distance>400)
	 this.colour = "rgb(255,0,0)";
      else if (this.distance<200)
	 this.colour = "rgb(127,255,0)";
      else
	 this.colour = this.TargetingColour.GetIntermediateColour((this.distance-200)/2);

      //Draw circle
      this.GraphicsTool.SwitchContext(this.InfoBox);
      this.GraphicsTool.DrawCircle(INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, 30, this.colour, 0);
      this.GraphicsTool.RestoreContext();

      //Write percentage
      this.TargetingText.Write(Math.round((this.distance-200)/2) + "%");
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      this.DrawBackground();
      this.Strafer.Draw();

      AAGunTurretSprite.DrawRotated(407,289, this.Angle);
      AAGunSprite.Draw(400, 300);

      if (this.TurretRotationDirection==DIRECTION.LEFT) {
	 --this.Angle;
	 if (this.Angle==-60)
	    this.TurretRotationDirection = DIRECTION.RIGHT;
      } else {
	 ++this.Angle;
	 if (this.Angle==60)
	    this.TurretRotationDirection = DIRECTION.LEFT;
      }

      this.MicroInterdictorSprite.Draw(this.InterdictorPosition.X, this.InterdictorPosition.Y);
      this.AAGunAgent.Draw();

      this.MicroStrafers.forEach(function(strfr){strfr.Draw();});
      this.MicroStrafers.forEach(function(strfr){strfr.Move();});
      this.AAGuns.forEach(function(aagun){aagun.Draw();});

      TempStraferSprite.Draw(450, 300);

      Controller.CheckControls();
      if (Controller.Up)    --this.InterdictorPosition.Y;
      if (Controller.Right) ++this.InterdictorPosition.X;
      if (Controller.Down)  ++this.InterdictorPosition.Y;
      if (Controller.Left)  --this.InterdictorPosition.X;

      this.DrawTargetingBullsEye();
   }
};
