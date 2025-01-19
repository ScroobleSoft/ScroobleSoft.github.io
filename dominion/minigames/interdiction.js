/*
 *  wonder if could use kite game for interdictor missions, with pulses of varying speeds passing across the screen, the unit when spotted still having the chance to escape . . . come to think of it, this is a pretty interesting dynamic for a game - if the radar works as a series of circles spreading outwards from a source, so the closer the Interdictor gets to the target the harder it gets to negotiate the outwards expanding circles, it not being necessary to go right up to the target but to get close enough to fire a (presumably) pulse of its own, with disabling action, the pulse circles coming in waves - will need a type of pulse targeting
 */

DominionMiniGames.prototype.SetInterdictionStrike = function() {

   this.SetStrikeTarget();
   this.SetStrikeInterdictor();
   this.SetStrikerPulses();
   this.ScreenRect.L = this.StrikeInterdictor.Position.X - 300;
   this.ScreenRect.T = this.StrikeInterdictor.Position.Y - 300;

   this.DrawStrikeAssets();
   this.DrawStrikeInfoBox();
};
DominionMiniGames.prototype.SetStrikeTarget = function() {

   this.TargetLocation = { X: 900, Y: 900 };
   this.TargetImage = new GenieImage();
   this.TargetImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 44, T: 1, W: 45, H: 45 } );
};
DominionMiniGames.prototype.SetStrikeInterdictor = function() {
   var iLoc;

   //Sprite
   this.StrikeInterdictorSprite = new GenieSprite();
   this.StrikeInterdictorSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { T: 1, L: 1, W: 42, H: 26 } );

   //Create agent
   this.StrikeInterdictor = new GenieAgent();
   this.StrikeInterdictor.Set( { SPEED: 1.0, TURN: 2, ALIGN: ALIGNMENT.CENTRE }, this.StrikeInterdictorSprite);
   this.StrikeInterdictor.ScreenRect = this.ScreenRect;
   this.StrikeInterdictor.Controller = Controller;
   this.StrikeInterdictor.Status = STATUS.TRANSFORM.DIRECT;
   this.StrikeInterdictor.Form = { Type: SPRITeFORM.ROTATED, Angle: this.Angle };

   //Set parameters
   this.InterdictorLocations = [ { X:  300, Y:  300 }, { X: 900, Y:  300 }, { X: 1500, Y:  300 }, { X: 1500, Y: 900 },
				 { X: 1500, Y: 1500 }, { X: 900, Y: 1500 }, { X:  300, Y: 1500 }, { X:  300, Y: 900 }  ];
   this.InterdictorWingOffsets = [ { X: -17, Y: -5 }, { X: -17, Y: 5 }, { X: 17, Y: -5 }, { X: 17, Y: 5 } ];
   iLoc = this.Randomizer.GetIndex(DIRECTION.COUNT);
   this.StrikeInterdictor.SetPosition(this.InterdictorLocations[iLoc]);
   this.StrikeInterdictor.SetDestination(this.TargetLocation);
   this.StrikeInterdictor.Angle = GeoUtils.GetAngle(this.StrikeInterdictor.Position, this.TargetLocation);
};
DominionMiniGames.prototype.SetStrikerPulses = function() {
   var i, j;

   this.Pulses = ArrayUtils.Create2D(10, 8, function() {var Position, Velocity, Countdown, Extant;});
   for (i=0;i<10;++i) {
      for (j=0;j<8;++j) {
          this.Pulses[i][j].Position = { X: 900, Y: 900 };
          this.Pulses[i][j].Velocity = new Coordinate2D();
          this.Pulses[i][j].Countdown = 90*i;
          this.Pulses[i][j].Extant = 900;
      }
   }
   this.SetPulseVelocities(this.Pulses[0]);
};
DominionMiniGames.prototype.SetPulseVelocities = function(plses) {
   var i;
   var angl;

   for (i=0;i<8;++i) {
      angl = this.Randomizer.GetInRange(45*i, (45*i)+44);
      plses[i].Velocity.X = Math.sin(GeoUtils.DegreesToRadians(angl));
      plses[i].Velocity.Y = Math.cos(GeoUtils.DegreesToRadians(angl));
   }
};
DominionMiniGames.prototype.PlayInterdictionStrike = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayInterdictionStrike.bind(this));

   if (!this.UpdateStrikeInterdictor())
      cancelAnimationFrame(this.AnimationFrameHandle);
   this.UpdateStrikePulses();
   this.UpdateStrikeMouse();

   this.DrawStrikeAssets();
   this.DrawStrikeInfoBox();
};
DominionMiniGames.prototype.DrawStrikeAssets = function() {

   this.Screen.fillStyle = PAINT.SKY;
   this.Screen.fillRect(0, 0, 600, 600);
   this.DrawStrikePulses();
   this.TargetImage.Draw(900-23-this.ScreenRect.L, 900-23-this.ScreenRect.T);		//INEFFICIENT - always draws
   this.StrikeInterdictor.Draw();
   if (this.StatusFlag) {
      this.x = this.StrikeInterdictor.Position.X + this.StrikeInterdictor.CentreOffset.X - this.ScreenRect.L;
      this.y = this.StrikeInterdictor.Position.Y + this.StrikeInterdictor.CentreOffset.Y - this.ScreenRect.T;
      this.GraphicsTool.DrawCircle(this.x, this.y, 10, "red", 0, 0.5);
   }
};
DominionMiniGames.prototype.DrawStrikeInfoBox = function() {

   this.InfoBox.fillStyle = PAINT.SKY;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.GraphicsTool.SwitchContext(this.InfoBox);

   this.GraphicsTool.DrawSquare(116, 116, 8, "rgb(159,079,159)", 0);									//Base
   this.GraphicsTool.DrawCircle(this.StrikeInterdictor.Position.X/7.5, this.StrikeInterdictor.Position.Y/7.5, 3, "green", 0);		//Interdictor

   //Draw pulses
   for (this.i=0;this.i<10;++this.i)
      for (this.j=0;this.j<8;++this.j)
         if (this.Pulses[this.i][this.j].Countdown==0) {
            this.x = this.Pulses[this.i][this.j].Position.X/7.5;
            this.y = this.Pulses[this.i][this.j].Position.Y/7.5;
            this.GraphicsTool.DrawCircle(this.x, this.y, 2, "yellow", 0, 0.5);
         }

   this.GraphicsTool.SwitchContext(this.InfoBox);

   ScreenManager.DrawScreenRect();
};
DominionMiniGames.prototype.DrawStrikePulses = function() {

   //TODO: check on-screen

   for (this.i=0;this.i<10;++this.i)
      for (this.j=0;this.j<8;++this.j)
         if (this.Pulses[this.i][this.j].Countdown==0) {
            this.x = this.Pulses[this.i][this.j].Position.X - this.ScreenRect.L;
            this.y = this.Pulses[this.i][this.j].Position.Y - this.ScreenRect.T;
            this.GraphicsTool.DrawCircle(this.x, this.y, 15, "yellow", 0, 0.5);
         }
};
DominionMiniGames.prototype.UpdateStrikeInterdictor = function() {

   this.StrikeInterdictor.UpdateTankControls();

   //Check for collisions
   this.StatusFlag = false
   for (this.i=0;this.i<10;++this.i)
      for (this.j=0;this.j<8;++this.j)
	 if (this.CheckInterdictorCollision(this.Pulses[this.i][this.j])) {
//	    this.GraphicsTool.SwitchContext(this.ControlPanel.Canvas.Context);
//	    this.GraphicsTool.DrawCircle(this.Pulses[this.i][this.j].Position.X/7.5, this.Pulses[this.i][this.j].Position.Y/7.5, 2, "red", 0);
//	    this.GraphicsTool.SwitchContext(this.Screen);
//	    return (false);
	    this.StatusFlag = true;
	 }

   return (true);
};
DominionMiniGames.prototype.CheckInterdictorCollision = function(plse) {

   //Chassis
   this.pos.Set(this.StrikeInterdictor.Position.X+8, this.StrikeInterdictor.Position.Y);
   if (SpaceUtils.CheckCirclesIntersection(this.pos, 13, plse, 15))
      return (true);

   //Wings
   for (this.k=0;this.k<this.InterdictorWingOffsets.length;++this.k) {
      this.pos.Set(this.InterdictorWingOffsets[this.k].X, this.InterdictorWingOffsets[this.k].Y);
      this.pos.X += this.StrikeInterdictor.Position.X;
      this.pos.Y += this.StrikeInterdictor.Position.Y;
      this.GraphicsTool.DrawCircle(this.pos.X-this.ScreenRect.L, this.pos.Y-this.ScreenRect.T, 4, "blue", 0, 0.25);
      if (SpaceUtils.CheckCirclesIntersection(this.pos, 4, plse.Position, 15))
	 return (true);
   }

   return (false);
};
DominionMiniGames.prototype.UpdateStrikePulses = function() {

   for (this.i=0;this.i<10;++this.i) {
      if (this.Pulses[this.i][0].Countdown!=0) {
	 this.Pulses[this.i].forEach(function(plse){--plse.Countdown;});
	 if (this.Pulses[this.i][0].Countdown==0)
	    this.SetPulseVelocities(this.Pulses[this.i]);
	 continue;
      }
      for (this.j=0;this.j<8;++this.j) {
	 this.Pulses[this.i][this.j].Position.X += this.Pulses[this.i][this.j].Velocity.X;
	 this.Pulses[this.i][this.j].Position.Y += this.Pulses[this.i][this.j].Velocity.Y;
	 --this.Pulses[this.i][this.j].Extant;
      }
      if (!this.Pulses[this.i][0].Extant)
	 for (this.j=0;this.j<8;++this.j) {
	    this.Pulses[this.i][this.j].Position.X = 900;
	    this.Pulses[this.i][this.j].Position.Y = 900;
	    this.Pulses[this.i][this.j].Extant = 900;
	    this.SetPulseVelocities(this.Pulses[this.i]);
	 }
   }

   this.ScreenRect.L = this.StrikeInterdictor.Position.X - 300;
   this.ScreenRect.T = this.StrikeInterdictor.Position.Y - 300;
};
DominionMiniGames.prototype.UpdateStrikeMouse = function() {

   if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
      ScreenManager.UpdateScreenRect();
   } else
      Mouse.ClearClicks();
};
