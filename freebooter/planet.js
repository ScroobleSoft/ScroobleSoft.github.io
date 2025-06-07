
//---------------------------------------------
//----------- SOLAR PLANET --------------------
var SolarPlanet = function() {
	var Screen;
	var GraphicsTool, Randomizer;
	var Specs;
	var Stations;
	var Buffer;
	var Selected;
	var Location;
	var Continents;
	var TerrainColour, ContinentColour;
	var Orbit;
	var VisibleSquare;		//used in drawing from buffer
	var Scale;

	var X, Y;
};
SolarPlanet.prototype = {
	Set(cntxt, gTool, rGenerator, specs, buffer) {
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.Specs = specs;
		this.Buffer = buffer;

		this.SetSpecs();
		this.SetStations();
	},
	SetSpecs() {
		var r, c;

		//Geography
		this.Location = new Coordinate2D();
		r = this.Specs.CONTINENT.H / this.Specs.CONTINENT.GAP;
		c = this.Specs.CONTINENT.W / this.Specs.CONTINENT.GAP;
		this.Continents = ArrayUtils.Create2D(r, c, SolarContinent);
		this.Orbit = { Radius: -1, Speed: -1, Direction: -1, Angle: -1 }	//Speed is in radians per frame, Direction indicates clockwise/anti-clockwise
		this.Scale = SCREEN.WIDTH/INFoBOX.WIDTH;

		//Colours
		this.TerrainColour = new GenieColour();
		this.TerrainColour.Set(this.Randomizer);
		this.ContinentColour = new GenieColour();
		this.ContinentColour.Set(this.Randomizer);

		this.VisibleSquare = new GenieRect();
		this.VisibleSquare.T = 0;
	},
	SetStations() {  //TODO: expect to add more details and content to each station

		this.Stations = new GenieArray();
		this.Stations.Set(STATION.COUNT.PLANET, HabitationStation, INDEXED);
	},
	Generate() {  //NOTE: planet a random coloured background with five circles of varying sizes and locations depicting continents
		var i, j;
		var r, c;

		//Get random colours for the terrain and continents (no greys or colours too similar to each other)
		do {
			this.TerrainColour.GenerateRandom();
		} while (this.TerrainColour.CheckGreyTone());
		do {
			do {
				this.ContinentColour.GenerateRandom();
			} while (this.ContinentColour.CheckGreyTone());
		} while (this.TerrainColour.CheckColourClash(this.ContinentColour));
		this.TerrainColour.SetRGBFormat();
		this.ContinentColour.SetRGBFormat();

		//Pick random continent sizes and locations . . . NOTE: not having continents on edges as it will take extra work to 'wrap' them - later ENHANCEMENT
		r = this.Specs.CONTINENT.H / this.Specs.CONTINENT.GAP;
		c = this.Specs.CONTINENT.W / this.Specs.CONTINENT.GAP;
		for (i=1;i<r;++i)
			for (j=1;j<c;++j) {
				if (this.Randomizer.GetIndex(2)) {	//50% chance of there being a continent at each node
					this.Continents[i][j].Location = new Coordinate2D();
					this.Continents[i][j].Location.X = this.Specs.CONTINENT.GAP * j;
					this.Continents[i][j].Location.Y = this.Specs.CONTINENT.GAP * i;
					this.Continents[i][j].Size = this.Randomizer.GetInRange(this.Specs.CONTINENT.SIZE.MIN, this.Specs.CONTINENT.SIZE.MAX);
				}
			}
	},
	GenerateOrbit() {

		//ISSUE: need to slow down orbit speed the further away planet is from the sun, possibly

		//Randomly pick orbit radius and direction, plus starting location
		this.Orbit.Radius = (1.5*this.Index) + (2*SUN.R);
		this.Orbit.Speed = this.Randomizer.GetInRange(1,4) / 16;		//in degrees, gives a range of 24-120s
		this.Orbit.Speed *= (2*SUN.R)/this.Orbit.Radius;
		this.Orbit.Direction = this.Randomizer.GetIndex(2);			//TODO: make this a boolean entry
		this.Orbit.Angle = this.Randomizer.GetIndex(360);				//starting angle

		this.SetLocation();
	},
	SetLocation() {

		this.Location.X = (INFoBOX.WIDTH/2) + (this.Orbit.Radius*Math.sin(GeoUtils.DegreesToRadians(this.Orbit.Angle)));
		this.Location.Y = (INFoBOX.HEIGHT/2) - (this.Orbit.Radius*Math.cos(GeoUtils.DegreesToRadians(this.Orbit.Angle)));
	},
	Update(factor) {

		factor = factor || 1.0;

		if (this.Orbit.Direction) {
			this.Orbit.Angle -= this.Orbit.Speed * factor;
			if (this.Orbit.Angle<0)
				this.Orbit.Angle += 360;
		} else {
			this.Orbit.Angle += this.Orbit.Speed * factor;
			if (this.Orbit.Angle>=360)
				this.Orbit.Angle -= 360;
		}
		this.SetLocation();

		//TODO: update planet axis rotation here

	},
	DrawInInfoBox(bWireframe) {  //NOTE: planets are not shown to scale in Info Box, so apparent collisions aren't actual collisions

		this.GraphicsTool.SwitchContextByID(CANVAS.ZOOM);
		if (this.Selected)  //NOTE: selected planet will have white circle around it
			this.GraphicsTool.DrawCircle(this.Location.X, this.Location.Y, PLANET.R+2, "white", 0);
		if (bWireframe)
			this.GraphicsTool.DrawCircle(this.Location.X, this.Location.Y, PLANET.R, this.TerrainColour.RGB, 2);
		else
			this.GraphicsTool.DrawCircle(this.Location.X, this.Location.Y, PLANET.R, this.TerrainColour.RGB, 0);
		this.GraphicsTool.RestoreContext();
	},
	DrawInControlPanel() {

		//Determine coordinates
		this.X = (this.Location.X-(INFoBOX.WIDTH/2)) * (140/INFoBOX.WIDTH);
		this.X += 70;
		this.Y = (this.Location.Y-(INFoBOX.HEIGHT/2)) * (140/INFoBOX.HEIGHT);
		this.Y += 70;

		this.GraphicsTool.SwitchContextByID(CANVAS.CONSOLE);
		this.GraphicsTool.DrawCircle(this.X+8, this.Y+95, PLANET.R, this.TerrainColour.RGB, 0);
		this.GraphicsTool.RestoreContext();
	},
	DrawMain() {  //UNLOGGED

		if (this.Selected)  //NOTE: selected planet will have white circle around it
			this.GraphicsTool.DrawCircle(this.Location.X*this.Scale, this.Location.Y*this.Scale, PLANET.R+2, "white", 0);
		this.GraphicsTool.DrawCircle(this.Location.X*this.Scale, this.Location.Y*this.Scale, PLANET.R, this.TerrainColour.RGB, 0);
	},
	DrawInBuffer() {
		var i, j;
		var r, c;
		var x, y;

		//Draw 'oceans'
		this.Buffer.Context.fillStyle = this.TerrainColour.RGB;
		this.Buffer.Context.fillRect(0, 0, this.Buffer.Canvas.width, this.Buffer.Canvas.height);

		//Draw continents
		this.GraphicsTool.SwitchContext(this.Buffer.Context);
		r = this.Specs.CONTINENT.H / this.Specs.CONTINENT.GAP;
		c = this.Specs.CONTINENT.W / this.Specs.CONTINENT.GAP;
		for (i=0;i<r;++i)
			for (j=0;j<c;++j)
				if (this.Continents[i][j].Location) {
					x = this.Continents[i][j].Location.X;
					y = this.Continents[i][j].Location.Y;
					this.GraphicsTool.DrawCircle(x, y, this.Continents[i][j].Size, this.ContinentColour.RGB, 0);
				}
		this.GraphicsTool.RestoreContext();

		//Replicate first half of planet, tack it on in the final third of the buffer
		this.Buffer.Context.drawImage(this.Buffer.Canvas, 0, 0, this.Specs.W/2, this.Specs.H, this.Specs.W, 0, this.Specs.W/2, this.Specs.H);
	},
	Draw(x, bInfoBox) {

		this.VisibleSquare.L = x;
		if (bInfoBox) {
			this.VisibleSquare.W = INFoBOX.WIDTH;
			this.GraphicsTool.SkewSquareToCircle(this.Buffer.Canvas, this.VisibleSquare, INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, 0.4*INFoBOX.WIDTH);
		} else {
			this.VisibleSquare.W = this.Specs.W/2;
			this.GraphicsTool.SkewSquareToCircle(this.Buffer.Canvas, this.VisibleSquare, SCREEN.WIDTH/2, SCREEN.HEIGHT/2, this.Specs.H/2);
		}
//		this.GraphicsTool.SkewSquareToCircle(this.Buffer.Canvas, this.VisibleSquare, INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, 120);
/* ENHANCEMENT
			 //Check if a continent has spilled over, draw that portion of it (top and bottom edges only)
			 if (this.Continents[i][j].Location.Y-this.Continents[i][j].Size<0)
		  this.GraphicsTool.DrawCircle(this.Continents[i][j].Location.X, PLANET.H+this.Continents[i][j].Location.Y, this.Continents[i][j].Size, this.ContinentColour.GetRGBFormat(), 0);
			 if (this.Continents[i][j].Location.Y+this.Continents[i][j].Size>PLANET.H)
		  this.GraphicsTool.DrawCircle(this.Continents[i][j].Location.X, this.Continents[i][j].Location.Y-PLANET.H, this.Continents[i][j].Size, this.ContinentColour.GetRGBFormat(), 0);
*/
	},
	DrawToStarStileBuffer(x) {

		//UNLOGGED

		StarStileBuffer.Clear();
		this.GraphicsTool.Context = StarStileBuffer.Context;
		this.Draw(x);
		this.GraphicsTool.Context = this.Screen;
	},
	DrawSphericallySkewedToScreen() {  //UNUSED - may revisit this if skip buffering step

		//UNLOGGED

/* TEMP below */
		this.Screen.fillStyle = "black";
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
/* */
		this.Screen.drawImage(this.GraphicsTool.GOL.ScratchPad.Canvas, 0, 0);

		//TODO: going to use cos to calculate strip heights
		this.DrawRectangleInCircle(0, 0, SCREEN.WIDTH/2, SCREEN.HEIGHT/2, 100);

		//TODO: have to take care of image wrapping here, maybe by drawing only relevant portion to ScratchPad; also
		//		have to re-draw continents at relevant edges if they slip off the screen
	},
	DrawRectangleInCircle(cnvs, cRect, x, y, rds) {  //c- canvas;  UNUSED - may revisit this if skip buffering step
		var i;
		var height;

		//UNLOGGED

		//NOTE: cRect.W has to equal 2*radius (or else image will have to be compressed first horizontally)
		//ASSUMPTION: cRect is even, or else another step, and maybe other changes, will be needed

		for (i=rds;i>0;--i) {
	 height = Math.sqrt(Math.pow(rds, 2) - Math.pow(rds-i, 2));  //ISSUE: create a table instead of always calculating
/*
	 this.GraphicsTool.DrawLine( { X: SCREEN.WIDTH/2, Y: SCREEN.HEIGHT }, { X: (SCREEN.WIDTH/2)-(rds-i), Y: SCREEN.HEIGHT-height }, "white", 1);
*/
	 this.Screen.drawImage(this.GraphicsTool.GOL.ScratchPad.Canvas, 400-(rds-i)-1, 400-rds, 1, rds, (SCREEN.WIDTH/2)-(rds-i), SCREEN.HEIGHT-height, 1, height);
	 this.Screen.drawImage(this.GraphicsTool.GOL.ScratchPad.Canvas, 400+(rds-i), 400-rds, 1, rds, (SCREEN.WIDTH/2)+(rds-i), SCREEN.HEIGHT-height, 1, height);
		}
	}
};
