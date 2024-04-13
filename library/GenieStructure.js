
//-----------------------------------------------
//---------- GENIE STRUCTURE --------------------  // SPECS = { W: -1, H: -1, B: -1, PEAK: -1, OFFSET: { X: -1, Y: -1 } } . . . need PERSPECTIVE if not Top-Down
var GenieStructure = function() {
	var GraphicsTool, Randomizer;
	var ScreenRect;
	var Specs;
	var Pic, PicState;
	var Type;
	var Terrain;
	var Tile, Location, ScreenCoords;
	var BoundingBox, Footprint, ZIndex;
	var Status;					//visible/extant
	var State, Frames;
	var Peak;					//height of the structure

	var x, y;	//scratch variables
};
GenieStructure.prototype = {		//TODO: ditch terrain, just use assumed global MAP
	Set(specs, pic, sRect) {
		this.Specs = specs;
		this.Pic = pic;
		this.PicState = 0;
		this.ScreenRect = sRect;
		this.Tile = new GenieTile();
		this.Location = new Coordinate2D();
		this.ScreenCoords = new Coordinate2D();
		this.Status = 0;

		this.SetPeak();
		this.SetBoundingBox();
		this.SetFootprint();
	},
	SetPeak() {

		if (this.Specs)
			this.Peak = this.Specs.PEAK;
	},
	SetBoundingBox() {

		this.BoundingBox = new GenieRect();
		if (this.Specs)
	 if (this.Specs.W) {
		 this.BoundingBox.W = this.Specs.W;
		 this.BoundingBox.H = this.Specs.H;
		 return;
	 }
		if (this.Pic.Specs.PATCH) {
	 this.BoundingBox.W = this.Pic.Specs.PATCH.W;
	 this.BoundingBox.H = this.Pic.Specs.PATCH.H;
		} else {
	 this.BoundingBox.W = this.Pic.Specs.W;
	 this.BoundingBox.H = this.Pic.Specs.H;
		}
	},
	SetFootprint() {

		this.Footprint = new GenieRect();
		if (this.Specs) {
	 if (this.Pic.Specs.PATCH) {
		 this.Footprint.W = this.Specs.W || this.Pic.Specs.PATCH.W;
		 if (this.Specs.PERSPECTIVE)
			 this.Footprint.H = this.Specs.B || this.Pic.Specs.PATCH.W;
		 else
			 this.Footprint.H = this.Specs.B || this.Pic.Specs.PATCH.H;
	 } else {
		 this.Footprint.W = this.Specs.W || this.Pic.Specs.W;
		 if (this.Specs.PERSPECTIVE)
			 this.Footprint.H = this.Specs.B || this.Pic.Specs.W;
		 else
			 this.Footprint.H = this.Specs.B || this.Pic.Specs.H;
	 }
		} else {
	 this.Footprint.W = this.Specs.W;
	 this.Footprint.H = this.Specs.H;
		}
	},
	SetTerrain(trrn) {  //NOTE: expect trrn to have a .Specs field

		this.Terrain = trrn;
	},
	SetTile(c, r) {  //NOTE: an alternative to calling .SetPosition

		this.Tile.Set(c, r);
		if (this.Terrain) {
			this.x = (this.Terrain.Specs.TILE.W*c) + this.Specs.OFFSET.X;
			this.y = (this.Terrain.Specs.TILE.H*r) + this.Specs.OFFSET.Y;
			this.SetLocation(this.x, this.y);
		} else {
			this.x = (MAP.TILE.W*c) + this.Specs.OFFSET.X;
			this.y = (MAP.TILE.H*r) + this.Specs.OFFSET.Y;
			this.SetLocation(this.x, this.y);
		}
	},
	SetLocation(x, y) {

		this.Location.Set(x, y);
		this.UpdateBoundingBox();
		if (this.Specs.PERSPECTIVE)
			this.SetFootprint();
	},
	DetermineScreenCoords() {

		this.ScreenCoords.X = this.Location.X;
		this.ScreenCoords.Y = this.Location.Y;
		if (this.ScreenRect) {
			this.ScreenCoords.X -= this.ScreenRect.L;
			this.ScreenCoords.Y -= this.ScreenRect.T;
		}
	},
	DetermineState() {  //NOTE: meant to be over-ridden if sprites are used
	},
	DetermineZIndex() {
	},
	UpdateBoundingBox() {

		this.BoundingBox.L = this.Location.X;
		this.BoundingBox.T = this.Location.Y;
		if (this.ScreenRect) {
	 this.BoundingBox.L -= this.ScreenRect.L;
	 this.BoundingBox.T -= this.ScreenRect.T;
		}
	},
	UpdateFootprint() {

		this.Footprint.L = this.Location.X;
		this.Footprint.T = this.Location.Y;
		if (this.ScreenRect) {
	 this.Footprint.L -= this.ScreenRect.L;
	 this.Footprint.T -= this.ScreenRect.T;
		}
	},
	Select() {

		this.Status |= STATUS.SELECTED;
	},
	UnSelect() {

		this.Status -= STATUS.SELECTED;
	},
	CheckSelected() {

		return (this.Status & STATUS.SELECTED);
	},
	SetExtant() {

		this.Status |= STATUS.EXTANT;
	},
	UnsetExtant() {

		this.Status -= STATUS.EXTANT;
	},
	CheckExtant() {

		return (this.Status & STATUS.EXTANT);
	},
	SetVisible() {

		this.Status |= STATUS.VISIBLE;
	},
	UnsetVisible() {

		this.Status -= STATUS.VISIBLE;
	},
	CheckVisible() {

		return (this.Status & STATUS.VISIBLE);
	},
	CheckOnScreen() {  //TODO: has to be adjusted for perspective

		return (SpaceUtils.CheckBoxBoxIntersection(this.ScreenRect, this.BoundingBox));
	},
	Draw() {

		//UNLOGGED - relevant only to top-down perspective

		//TODO: have to check if .PATCH is specified in .Specs, in which case it is an image that likely has a state per side

		this.DetermineScreenCoords();
		this.DetermineState();

		//Adjust for offsets if specified
		if (this.Specs.OFFSETS) {
			this.ScreenCoords.X += this.Specs.OFFSETS.X;
			this.ScreenCoords.Y += this.Specs.OFFSETS.Y;
		}

		this.Pic.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.PicState);
		/* TODO: instead of line above, need this below:
		if (this.Specs.PATCH)
			this.Pic.DrawPatchNumber(this.PicState, this.ScreenCoords.X, this.ScreenCoords.Y);
		else
			this.Pic.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.PicState);
		*/
	}
};
