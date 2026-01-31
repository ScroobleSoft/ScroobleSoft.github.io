
//---------------------------------------------
//---------- TACTICAL CLAN --------------------
var TacticalClan = function() {
	var Cities, Platforms;
	var Stacks, LandStacks, SeaStacks, AirStacks, MilitaryStacks, ActiveStack;
	var ExplorationEndeavour, ExpansionAmbition;
	var TravelledTiles, UnexploredCities;
};
TacticalClan.prototype = {
	Set() {
		this.SetLists();
	},
	SetLists() {

		//Possessions
		this.Cities = new GenieArray();				//a GenieArray because removing elements will be easier
		this.Cities.Set();
		this.Platforms = new GenieArray();			//ditto above
		this.Platforms.Set();

		//Stacks
		this.Stacks = new GenieArray();				//ditto above
		this.Stacks.Set();
		this.LandStacks = new GenieArray();			//ditto above
		this.LandStacks.Set();
		this.SeaStacks = new GenieArray();			//ditto above
		this.SeaStacks.Set();
		this.AirStacks = new GenieArray();			//ditto above
		this.AirStacks.Set();
		this.MilitaryStacks = [ this.LandStacks, this.SeaStacks, this.AirStacks ];

		//Exploration
		this.TravelledTiles = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);
		this.UnexploredCities = new GenieArray();											//contains indices, lists visible, but unchecked, cities
		this.UnexploredCities.Set();
	},
	AddCity(city) {

		city.SetClan(this);
		this.Cities.push(city);
	},
	AddStack(stack) {

		this.Stacks.Add(stack);
		switch (stack.Type) {
			case STACK.LAND:
				this.LandStacks.push(stack);
				return;
			case STACK.SEA:
				this.SeaStacks.push(stack);
				return;
			case STACK.AIR:
				this.AirStacks.push(stack);
				return;
		}
	},
	ExecuteTurn() {  //UNLOGGED

		this.ExecuteRandomAITurn();

		return;

		//-maybe have 8 'explorer' units, preferrably Gunners, stronger units left to garrison
		//-leave one 8-stack to defend city, send rest to conquer
		//-actually, there will be a separate exploration and acquisition aggressiveness rating; in fact, there are dynamics,
		//	.exploration (number of scouts sent out, maybe even varied strength stacks per clan)
		//	.pace of city acquisition
		// .garrision size
		//-explore island first
		//-locate port as priority
		//-for ships, when they discover an island, they circle it until all shore tiles are visible to clan (**)
		//		otherwise, head to the centre of the map
		//		in later turns, least explored sectors with unexplored tiles are sailed towards, sectors being 5x5 in a 10x10 grid
		if (this.ActiveStack)
			this.ActiveStack.Update();		//-probably won't happen like this, but it might, a value being returned to determine whether .ActiveStack
													// needs to be switched to another, etc.

		//-another AI approach
		//		.look for naval city
		//		.capture it, sent unit off to explore
		//		.interleave turns between exploration and capturing the remaining cities on the first island
		//		.once island is found, it is circumnavigated in search of a naval city and capture it
		//		.might need to explore the island first fully (ports are enough) to see if other clan have discovered it, since they can be territorial
		//		.this process is repeated
		//		.this opens another option - how aggressively should cities be captured on a previously 'owned' island
		//		.another option - whether to complete island circumnavigation, or just take the port
		//		.option - completely take island first, or establish 'colonies' through aggressive exploration
		//-note: should be able to tell type of island by contour and city location, in case there is value in that

		//-exploration
		//		.send a sip to search in a horizontal band, or vertical, circumnavigating to opposite shore if hitting an island, in search for platforms
	},
	ExecuteRandomAITurn() {  //UNLOGGED
		var asset;
		var stck;

		if (this.ActiveStack) {																//decide action based on target being stack/city/platform

			if (this.ActiveStack.Target)
				asset = this.ActiveStack.Target.GetAssetType();
			switch (asset) {
				case TACTICAL.ASSET.STACK:
					stck = this.ActiveStack.Merge(this.Target);						//if 1 stack is left, delete the empty one
					if (stck.length==0)
						this.DeleteStack(stck);
					//TODO: scan for possible new active stack - actually, this is done in lines 121-130
					break;
				case TACTICAL.ASSET.CITY:
					this.CaptureCity();
					break;
				case TACTICAL.ASSET.PLATFORM:
					this.AttackPlatform();
					break;
			}
		} else {																					//pick a random stack, move it
			this.ActiveStack = this.PickRandomStack();
			if (!this.ActiveStack)
				return;																			//could happen that a clan has no stacks, so turn is skipped
			this.ActiveStack.MoveEfficiently();											//move to least travelled neighbouring tile
			asset = this.ActiveStack.GetAdjacentAsset();
			if (!asset)																			//do nothing if all neighbouring tiles are clear
				return;
			if (asset.GetAssetType()==TACTICAL.ASSET.STACK) {						//check if next to another stack
				if (this.ActiveStack.Clan===asset.Clan)								//check if stack is of the same clan
					this.Target = asset;														//set a goal of merging in the next turn
			} else {																				//city or platform
				if (!asset.Clan)																//set a goal of capturing in the next turn
					this.Target = asset;
			}
		}
	},
	PickActiveStack() {  //UNLOGGED - move lines 121-130 here
	},
	MoveRandomStack() {
		var iStck;

		if (this.Stacks.length) {
			iStck = Randomizer.GetIndex(this.Stacks.length);
			this.Stacks[iStck].MoveEfficiently();
		}
	},
	CaptureCity() {  //UNLOGGED - for AI sides only
		var city;
		var asset;

		if (this.ActiveStack.Target.Clan) {											//necessary step if another clan slips in and takes platform in their turn
			city = this.ActiveStack.GetAdjacentNeutralCity();					//look for another city
			if (city) {
				this.ActiveStack.CaptureCity(city);
				asset = this.ActiveStack.GetAdjacentAsset();						//check if there is another target nearby
				if (asset)
					this.ActiveStack = asset;
				else
					this.ActiveStack = null;
			} else
				this.MoveRandomStack();				//TODO: might other moves open up for some stacks?
		} else {
			this.ActiveStack.CaptureCity(this.ActiveStack.Target);
			this.ActiveStack = null;
			this.Target = null;
		}
	},
	AttackPlatform() {  //UNLOGGED

		if (this.Target.Clan)															//necessary step if another clan slips in and takes platform in their turn
			this.MoveRandomStack();				//TODO: might other moves open up for some stacks?
		else
			this.ActiveStack.CapturePlatform(this.Target);
		this.ActiveStack = null;
		this.Target = null;
	},
	PickRandomStack() {  //TODO: it's better to pick an 'actionable' stack
		var val, num;

		//Decide between land/sea/air force stacks
		val = Randomizer.GetIndex(4);
		if (val>2)
			val = 2;
		else if (this.SeaStacks.length==0) {
			if (this.AirStacks.length==0)
				val = 2;
			else
				val = 0;
		}

		num = Randomizer.GetIndex(this.MilitaryStacks[2-val].length);
		return (this.MilitaryStacks[2-val][num]);
	},
	DeleteStack(stack) {
		var i;

		//Remove from stack list
		for (i=0;i<this.Stacks.length;++i)
			if (this.Stacks[i]===stack) {
				this.Stacks.RemoveElement(stack);
				break;
			}

		//Remove from appropriate arm of forces
		for (i=0;i<this.MilitaryStacks[stack.Type].length;++i)
			if (this.MilitaryStacks[stack.Type][i]===stack) {
				this.MilitaryStacks[stack.Type].RemoveElement(stack);
				break;
			}

		stack.Tile.ClearStack();									//remove tile reference to deleted stack
		this.ActiveStack = null;									//remove last remaining reference to stack (ASSUMPTION: will be garbage collected)
	}
};
