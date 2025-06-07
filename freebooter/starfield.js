/*
 *  working, but a mess - stars should always start out tiny no matter what their size; also, stars should speed up the
 *  closer they are to the edge of the screen; have to use new random number generator because right now there is too
 *  much bunching in the top left
 *  take another look at Coding Train star field for reference
 *  TODO: warp effect and top-down to be implemented
 */
//------------------------------------------------
//----------- SOLAR STARFIELD --------------------
var SolarStarfield = function() {
	var Screen;
	var GraphicsTool, Randomizer;
	var Specs;
	var Stars;
	var View;		//planet background, 3D or top-down
	var Warp;		//on/off
	var Speed;		//TODO: has to be set by whatever function uses this

	var i, size;
};
SolarStarfield.prototype = {
	Set(cntxt, gTool, rGenerator, specs, view) {
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.Specs = specs;
		this.Stars = ArrayUtils.Create(STARFIELD.STARS, StarfieldStar);
		this.Stars.forEach(function(star){star.Origin = new Coordinate2D();});
		this.View = view || ELITeVIEW.PLANEtVIEW;
		this.View = ELITeVIEW.FP3D;		//TEMP
		this.Speed = 2;		//NOTE: higher is faster, fractions work

//		this.Generate();
	},
	SetSpeed(speed) {

		this.Speed = speed;
	},
	SetView(view) {  //UNLOGGED

		this.View = view;
		//-for right/left/top/front, a flatter generation is needed
	},
	Generate() {

		for (this.i=0;this.i<this.Specs.STARS;++this.i) {
			do {  //NOTE: this loop is to ensure no star is in centre of screen (a 20x20px window), and so doesn't fly directly at the player
				this.Stars[this.i].Origin.X = (this.Specs.W/2) - this.Randomizer.GetIndex(this.Specs.W);
				this.Stars[this.i].Origin.Y = (this.Specs.H/2) - this.Randomizer.GetIndex(this.Specs.H);
			} while (this.Stars[this.i].Origin.X>-10 && this.Stars[this.i].Origin.X<10 && this.Stars[this.i].Origin.Y>-10 && this.Stars[this.i].Origin.Y<10);
			this.Stars[this.i].x = this.Stars[this.i].Origin.X + (this.Specs.W/2);
			this.Stars[this.i].y = this.Stars[this.i].Origin.Y + (this.Specs.H/2);
//	 this.Stars[this.i].z = this.Specs.W/2;
			this.Stars[this.i].z = 100 + this.Randomizer.GetIndex(200);		//HARD-CODING
		}
	},
	GenerateFlat() {  //UNLOGGED
		var i;

		for (i=0;i<this.Specs.STARS;++i) {
			this.Stars[i].x = this.Randomizer.GetIndex(this.Specs.W);
			this.Stars[i].y = this.Randomizer.GetIndex(this.Specs.H);
			this.Stars[i].Radius = this.Randomizer.GetInRange(1,4);
			this.Stars[i].Speed = this.Randomizer.GetInRange(1,5);
		}
	},
	Update() {

		switch (this.View) {
			case ELITeVIEW.PLANEtVIEW:
				this.UpdatePlanetView();
				break;
			case ELITeVIEW.FP3D:
				this.Update3D();
				break;
			case ELITeVIEW.TOpDOWN:
				this.UpdateTopDown();
				break;
			case ELITeVIEW.LAUNCHING:
				this.UpdateLaunching();
				break;
		}
	},
	UpdatePlanetView() {

		//ASSUMPTION: planets will only be depicted rotating right to left (facing), and stars move the same way

		for (this.i=0;this.i<100;++this.i)
			if (this.Stars[this.i].x<0) {
				if (this.Stars[this.i].y)
					this.Stars[this.i].x = this.Specs.W;
				else
					this.Stars[this.i].x = this.Randomizer.GetIndex(this.Specs.W);
				this.Stars[this.i].y = this.Randomizer.GetIndex(this.Specs.H);
				this.Stars[this.i].z = 50 + this.Randomizer.GetIndex(250);				//HARD-CODING
			} else
				this.Stars[this.i].x -= 0.1;
	},
	Update3D() {

		for (this.i=0;this.i<this.Specs.STARS;++this.i) {
			if ((this.Stars[this.i].x<0 || this.Stars[this.i].x>this.Specs.W-1) || (this.Stars[this.i].y<0 || this.Stars[this.i].y>this.Specs.H-1) || this.Stars[this.i].z<=0) {
				do {  //NOTE: this loop is to ensure no star is in centre of screen, and so doesn't fly directly at the player
					this.Stars[this.i].Origin.X = (this.Specs.W/2) - this.Randomizer.GetIndex(this.Specs.W, STARtAtZERO);
					this.Stars[this.i].Origin.Y = (this.Specs.H/2) - this.Randomizer.GetIndex(this.Specs.H, STARtAtZERO);
				} while (this.Stars[this.i].Origin.X>-10 && this.Stars[this.i].Origin.X<10 && this.Stars[this.i].Origin.Y>-10 && this.Stars[this.i].Origin.Y<10);
				this.Stars[this.i].x = this.Stars[this.i].Origin.X + (this.Specs.W/2);
				this.Stars[this.i].y = this.Stars[this.i].Origin.Y + (this.Specs.H/2);
				this.Stars[this.i].z = this.Specs.W/2;
			} else {
				this.Stars[this.i].x = (this.Stars[this.i].Origin.X*((this.Specs.W/2)/this.Stars[this.i].z)) + (this.Specs.W/2);
				this.Stars[this.i].y = (this.Stars[this.i].Origin.Y*((this.Specs.H/2)/this.Stars[this.i].z)) + (this.Specs.H/2);
				this.Stars[this.i].z -= this.Speed;
			}
		}
	},
	UpdateTopDown() {
	},
	UpdateLaunching() {  //TODO: doesn't appear to be used
		// .z will increase this time, so stars will disappear as they get to 300, then appear from one of the 4 edges

		for (this.i=0;this.i<this.Specs.STARS;++this.i) {
	 if (this.Stars[this.i].z>(this.Specs.W/2)) {
		 switch (this.Randomizer.GetIndex(this.Specs.W)) {
			 case 0:
		  this.Stars[this.i].Origin.X = (this.Specs.W/2) - this.Randomizer.GetIndex(this.Specs.W, STARtAtZERO);
		  this.Stars[this.i].Origin.Y = -this.Specs.H/2;
		  break;
			 case 1:
		  this.Stars[this.i].Origin.X = this.Specs.W/2;
		  this.Stars[this.i].Origin.Y = (this.Specs.H/2) - this.Randomizer.GetIndex(this.Specs.H, STARtAtZERO);
		  break;
			 case 2:
		  this.Stars[this.i].Origin.X = (this.Specs.W/2) - this.Randomizer.GetIndex(this.Specs.W, STARtAtZERO);
		  this.Stars[this.i].Origin.Y = this.Specs.H/2;
		  break;
			 case 3:
		  this.Stars[this.i].Origin.X = -this.Specs.W/2;
		  this.Stars[this.i].Origin.Y = (this.Specs.H/2) - this.Randomizer.GetIndex(this.Specs.H, STARtAtZERO);
		  break;
		 }
		 this.Stars[this.i].x = this.Stars[this.i].Origin.X + (this.Specs.W/2);
		 this.Stars[this.i].y = this.Stars[this.i].Origin.Y + (this.Specs.H/2);
		 this.Stars[this.i].z = 100 + this.Randomizer.GetIndex(100);
	 } else {
		 this.Stars[this.i].x = (this.Stars[this.i].Origin.X*((this.Specs.W/2)/this.Stars[this.i].z)) + (this.Specs.W/2);
		 this.Stars[this.i].y = (this.Stars[this.i].Origin.Y*((this.Specs.H/2)/this.Stars[this.i].z)) + (this.Specs.H/2);
		 this.Stars[this.i].z += this.Speed;
	 }
		}
	},
	Draw() {

		this.Screen.fillStyle = "black";
		this.Screen.fillRect(0, 0, this.Specs.W, this.Specs.H);

		//TODO: have to switch for top-down

		for (this.i=0;this.i<this.Specs.STARS;++this.i) {
			this.size = (this.Specs.W/2)/this.Stars[this.i].z;
			this.GraphicsTool.DrawCircle(this.Stars[this.i].x, this.Stars[this.i].y, this.size, "white", 0);
		}
/*
		switch (this.View) {
	 case ELITeVIEW.PLANEtVIEW:
		 this.UpdatePlanetView();
		 this.DrawPlanetView();
		 break;
	 case ELITeVIEW.FP3D:
		 this.Update3D();
		 this.Draw3D();
		 break;
	 case ELITeVIEW.TOpDOWN:
		 this.UpdateTopDown();
		 this.DrawTopDown();
		 break;
	 case ELITeVIEW.LAUNCHING:
		 this.UpdateLaunching();
		 this.DrawLaunching();
		 break;
		}
*/
//		this.DrawCockpit();
	},
	DrawPlanetView() {  //REDUNDANT

		for (this.i=0;this.i<100;++this.i) {
			this.size = (this.Specs.W/2)/this.Stars[this.i].z;
			this.GraphicsTool.DrawCircle(this.Stars[this.i].x, this.Stars[this.i].y, this.size, "white", 0);
		}
	},
	Draw3D() {  //REDUNDANT

		for (this.i=0;this.i<this.Specs.STARS;++this.i) {
			this.size = (this.Specs.W/2)/this.Stars[this.i].z;
			this.GraphicsTool.DrawCircle(this.Stars[this.i].x, this.Stars[this.i].y, this.size, "white", 0);
		}
	},
	DrawTopDown() {  //REDUNDANT
	},
	DrawLaunching() {  //REDUNDANT
	},
	DrawCockpit() {  //TEMP
		this.GraphicsTool.DrawRectangle(0, 0, this.Specs.W, this.Specs.H, GREY.ASH, 5);
		this.GraphicsTool.DrawRectangle(5, 5, this.Specs.W-10, this.Specs.H-10, GREY.SILVER, 2);

		//TODO: below is only for PC/TABLET version
		this.GraphicsTool.DrawRectangle(0, 585, this.Specs.W, 15, GREY.ASH, 0);
		this.GraphicsTool.DrawRectangle(5, 585, this.Specs.W-10, 2, GREY.LIGHT, 1);
		this.GraphicsTool.DrawRectangle(5, 490, 100, 100, "black", 0);
		this.GraphicsTool.DrawRectangle(3, 488, 104, 104, GREY.ASH, 2);
		this.GraphicsTool.DrawRectangle(5, 490, 100, 100, GREY.LIGHT, 1);
		this.GraphicsTool.DrawRectangle(495, 490, 100, 100, "black", 0);
		this.GraphicsTool.DrawRectangle(493, 488, 104, 104, GREY.ASH, 2);
		this.GraphicsTool.DrawRectangle(495, 490, 100, 100, GREY.LIGHT, 1);
	},
	Accelerate(speed) {

		this.Speed += speed;
	}
};
