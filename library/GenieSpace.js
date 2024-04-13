/*
 *  if Occupancy approach is used, this is where it will be partly implemented with a 2D grid of pointers (or lists)
 *  added complication - what about various projectiles?
 *  NOTE: initial distance check will be with .X and .Y coords, then the more expensive 'magnitude' of distance check will be performed if there is a
 *	  possibilty of units being close enough
 *
 *	TODO: have to re-evaluate the sentence below -
 *  will match standard tile sizes with standard screen width and height, 600*600px, in most cases, which, if there can be as many as 200 units per tile,
 *  it would mean 51.2K at least of storage space, assuming there are 16x16 tiles
 */
//-------------------------------------------  Specs: { SIDES: -1, TILE: { W: -1, H: -1, C: -1, R: -1 }, DIPLOMACY: { LEVELS: -1 },
//---------- GENIE SPACE --------------------			  AGENT: { LISTS: -1, SPACE: -1 }, STRUCTURE: { LISTS: -1, SPACE: -1 }, AMMO: { LISTS: -1, SPACE: -1 } }
																//TODO: none of the specs above may be needed
var GenieSpace = function() {
	var Specs;
	var AgentLists;					//this will be a list of lists of arrays
	var StructureLists;				//can be buildings or terrain features (array of arrays)
	var AmmoLists;
	var Selections;					//TODO: has to created, a list
	var Tiles, Stack, Tile;
	var DiplomacyTable;				//TODO: perhaps better to remove this and handle collision DiplomacyTable look-ups individually in the games
	var StackNode, NodeIndex;		//used in Tiles and Stack maintenance

	var i, j, c, r, side, aArray, node;  //TODO: would like to ditch '.aArray,' not sure if 'side' is needed either
};
GenieSpace.prototype = {
	Set(specs) {
		this.Specs = specs;
		this.SetLists();
		if (typeof Game)
			if (Game.CheckTiled()) {
				if (MAP.TILE)
					this.SetTiles(MAP.TILE);
				else
					this.SetTiles(this.Specs.TILE);
			}
		if (this.Specs.STACK)
			this.SetStack();
	},
	SetLists(sides) {
/* re-designing this, making number of sides irrelevant, intending to use DiplomacyTable
		var i;

		sides = sides || this.Specs.SIDES;

		//Agents
		this.AgentLists = new Array(sides);
		for (i=0;i<sides;++i)
			this.AgentLists[i] = new Array(this.Specs.AGENT.LISTS);
*/
		this.AgentLists = new Array();

		//Structures
//		this.StructureLists = new Array(this.Specs.STRUCTURE.LISTS);
		this.StructureLists = new Array();

		//Ammo
//		this.AmmoLists = new Array(this.Specs.AMMO.LISTS);
		this.AmmoLists = new Array();
	},
	SetTable(dTbl) {

		//UNLOGGED

		this.DiplomacyTable = dTbl;
	},
	SetTiles(tSpecs) {
		var c;

		this.Tiles = ArrayUtils.Create2D(tSpecs.C, tSpecs.R, Array);
		for (c=0;c<tSpecs.C;++c)
			this.Tiles[c].fill(-1);
	},
	SetStack() {

		this.Stack = new GenieStack();
		this.Stack.Set(this.Specs.STACK.QUANTITY || 200);
	},
	ClearTiles() {
		var c, r;

		for (c=0;c<this.Tiles.length;++c)
			for (r=0;r<this.Tiles[c].length;++r)
				this.Tiles[c][r] = -1;
		this.Stack.Clear();
	},
	InitZone(c, r, asst) { //REDUNDANT, there for compatibility, DE-LOG

		this.InitTile(c, r, asst);
	},
	InitTile(c, r, asst) {  //add first element to empty tile

		this.Node = this.Stack.GetOpen();
		this.Node.Previous = -1;
		this.Node.Element = asst;
		this.Node.Next = -1;
		this.Tiles[c][r] = this.Node.Index;
	},
	DeleteFromTile(c, r, asst) {

		//UNLOGGED

		this.TileSubtract(c, r, asst);
		this.StackNode.Empty();				//NOTE: .StackNode has been set in ::TileSubtract method call
	},
	SwitchTile(col, row, asst) {  //col, row are indices of old tile

		//UNLOGGED

		this.SubtractFromTile(asst);
		this.AddToTile(col, row, asst);
	},
	AddToTile(c, r, asst) {

		if (this.Tiles[c][r]==-1)
			this.InitTile(c, r, asst);
		else {
			this.StackNode = this.Stack.GetOpen();
			this.StackNode.Element = asst;
			this.StackNode.Next = -1;
			this.node = this.Stack[this.Tiles[c][r]];
			while (this.node.Next!=-1)
				this.node = this.Stack[this.node.Next];
			this.node.Next = this.StackNode.Index;
			this.StackNode.Previous = this.node.Index;
		}
	},
	SubtractFromTile(asst) {  //remove reference to asset from stack

		this.StackNode = this.Stack[this.Tiles[asst.Tile.C][asst.Tile.R]];
		while (this.StackNode.Element!==asst)		//search for agent
			this.StackNode = this.Stack[this.StackNode.Next];
		if (this.StackNode.Previous==-1)				//check if it is the first item
			this.Tiles[asst.Tile.C][asst.Tile.R] = this.StackNode.Next;
		else
			this.Stack[this.StackNode.Previous].Next = this.StackNode.Next;
		this.StackNode.Element = null;
	},
	AddAgentList(aAgnts) {

		//UNLOGGED - prefer it if this is REDUNDANT; actually, now with a re-design, it is relevant again

		this.AgentLists.push(aAgnts);
	},
	AddAmmoList(aAmmo) {

		this.AmmoLists.push(aAmmo);
	},
	CheckAmmoIgnited() {

		for (this.i=0;this.i<this.AmmoLists.length;++this.i)
			for (this.j=0;this.j<this.AmmoLists[this.i].length;++this.j)
				if (this.CheckTiledAmmoCollision(this.AmmoLists[this.i][this.j]))
					return (true);

		return (false);
	},
	CheckTiledAmmoCollision(ammo) {

		for (this.c=-1;this.c<2;++this.c)
			for (this.r=-1;this.r<2;++this.r) {
				if ( this.c<0 || this.r<0 || this.c==this.Tiles.length || this.r==this.Tiles[0].length )
					continue;
				this.NodeIndex = this.Tiles[this.c][this.r];
				while (this.NodeIndex!=-1) {
					this.StackNode = this.Stack[this.NodeIndex];
					if (this.StackNode.Element.CheckCollision(ammo))
						return (true);
					this.NodeIndex = this.StackNode.Next;
				}
			}

		return (false);
	},
	CheckAmmoCollision(iTargets) {  //iTargets indicates which structures to check against

		for (this.i=0;this.i<this.AmmoLists.length;++this.i)
			for (this.j=0;this.j<this.AmmoLists[this.i].Length;++this.j) {
				if (this.AmmoLists[this.i][this.j].CheckExtant())
					if (iTargets & ASSET.AGENT) {
						if (this.CheckAmmoAgentCollision(this.AmmoLists[this.i][this.j]))
							return;
					}
					if (iTargets & ASSET.STRUCTURE) {
						if (this.CheckAmmoStructureCollision(this.AmmoLists[this.i][this.j]))
							return;
					}
					if (iTargets & ASSET.AMMUNITION) {	//TODO: this option may never be taken up
						if (this.CheckAmmoAmmoCollision(this.AmmoLists[this.i][this.j]))
							return;
					}
			}
	},
	CheckAmmoAgentCollision(ammo) {  //TODO: aArray should be changed to something else

		for (this.side=0;this.side<this.AgentLists.length;++this.side)
			for (this.aArray=0;this.aArray<this.AgentLists[this.side].length;++this.aArray)
				for (this.item=0;this.item<this.AgentLists[this.side][this.aArray].length;++this.item)
					if ( Math.abs(ammo.Position.X-this.AgentLists[this.side][this.aArray][this.item].Position.X) < this.Specs.AGENT.SPACE )
						if ( Math.abs(ammo.Position.Y-this.AgentLists[this.side][this.aArray][this.item].Position.Y) < this.Specs.AGENT.SPACE )
							if (ammo.CheckCollision(this.AgentLists[this.side][this.aArray][this.item])) {
								if (!this.DiplomacyTable[ammo.Weapon.Asset.GetOwnerIndex()][this.side]) {
									this.AgentLists[this.side][this.aArray][this.item].Hit();
									ammo.UnsetExtant();
								}
								return;
							}
	},
	CheckAmmoStructureCollision(ammo) {

		//UNLOGGED

	},
	CheckAmmoAmmoCollision(ammo) {

		//UNLOGGED - may never be implemented

	},
	GetDiplomacyStatus(iSide1, iSide2) {

		//UNLOGGED

		return (this.DiplomacyTable[iSide1][iSide2]);
	},
	CheckFree(gmPiece, rect) {  //rect - space gmPiece is trying to move into
/*
		this.rect = { L: gmPiece.Position.X+gmPiece.Velocity.X, T: gmPiece.Position.Y+gmPiece.Velocity.Y-gmPiece.Sprite.Height, W: gmPiece.Sprite.Width, H: gmPiece.Sprite.Height };
*/
		for (this.i=0;this.i<this.Units.length;++this.i) {
	 if (this.Units[this.i]===gmPiece)
		 continue;
	 this.Units[this.i].GetBoundingBox();
//	 if (Utilities.BoxesIntersecting(this.Units[this.i].BoundingBox, gmPiece.BoundingBox))
	 if (Utilities.BoxesIntersecting(this.Units[this.i].BoundingBox, rect))
		 return (false);
		}

		return (true);
	},
	CheckAgentObstructed(gmPiece, rect) {  //rect - space gmPiece is trying to move into
/*
		this.rect = { L: gmPiece.Position.X+gmPiece.Velocity.X, T: gmPiece.Position.Y+gmPiece.Velocity.Y-gmPiece.Sprite.Height, W: gmPiece.Sprite.Width, H: gmPiece.Sprite.Height };
*/
		for (this.i=0;this.i<this.Units.length;++this.i) {
	 if (this.Units[this.i]===gmPiece)
		 continue;
	 this.Units[this.i].GetBoundingBox();
//	 if (Utilities.BoxesIntersecting(this.Units[this.i].BoundingBox, gmPiece.BoundingBox))
	 if (Utilities.BoxesIntersecting(this.Units[this.i].BoundingBox, rect))
		 return (this.Units[this.i]);
		}

		return (null);
	},
	CheckUnitNearby(pos, rds, units) {

		units = units || this.Units;
		for (this.i=0;this.i<units.length;++this.i)
	 if (Utilities.GetDistance(pos, units[this.i].Position)<=rds)
		 return (units[this.i]);
		return (null);
	},
	CheckPathClear(source, destination, width) {  //NOTE: right now only using this for laser shots
		var x, y;

		//NOTE: no idea whether this function works or not!! (also, not optimized)

		//iterate from source to destination, checking unit footprints
		this.distance = Utilities.GetDistance(source, destination);
		x = source.X;
		y = source.Y;
		for (this.i=0;this.i<this.distance;++this.i)
	 for (this.j=0;this.j<this.Units.length;++this.j) {
		 x += (destination.X-source.X)/this.distance;
		 y += (destination.Y-source.Y)/this.distance;
		 this.Units[this.j].SetFootprint();
		 if (Utilities.PointInBox( { X: x, Y: y }, this.Units[this.j].Footprint))
			 return (false);
	 }

		return (true);
	}
};
