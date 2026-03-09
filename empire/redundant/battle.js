/*
		ratings for each regiment are either 10 or 11
		each 'spin' in a 1 on 1 roll of the (10/11 sided) dice, whichever value a regiment gets that number is subtracted from the total strength x 10
		however, for multi regiment engagements, cucmulative values get removed?

		SALVAGE NOTE: only useful method is ::GetClosestRegiment (to mouse click)
*/
//----------------------------------------------------
//---------- IMPERIAL BATTLE VIEW --------------------
var ImperialBattleView = function() {
	var TerrainCheckBox, RegimentIconPanel;
	var LeftCommand, RightCommand;
	var TerrainFlag, RegimentFlag;
	var RegimentPosition, RegimentDistances, RegimentOpacity;
	var ClickedRegiments, ClickedRegiment, RegimentBox;		//TODO: these will eventually replace the 1st 2 variables in previous line;
	var Frames;

	var i, c, r;
};
ImperialBattleView.prototype = new GenieView();
ImperialBattleView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetRegiments();
	this.Frames = 100;
	this.RegimentDistances = new GenieArray();
	this.RegimentDistances.Set(2*ARMY.COMMAND.REGIMENTS, function() { var Distance; }, INDEXED);
	this.RegimentPosition = new Coordinate2D();
	this.ClickedRegiments = new GenieList();
	this.ClickedRegiments.Set(6);							//TODO: 6 is probably the most regiments can overlap
	this.RegimentBox = new GenieRect();
};
ImperialBattleView.prototype.SetControls = function() {

	this.TerrainCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.TERRAIN, CheckBoxImages, Text);
	this.RegimentIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.REGIMENT, this.Specs.ICOnPANEL.REGIMENT.IMAGE, IconCornerImages, Graphics,
																																						ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
ImperialBattleView.prototype.SetRegiments = function() {

	this.LeftRegiments = new GenieArray();
	this.LeftRegiments.Set(ARMY.COMMAND.REGIMENTS, BattleRegiment, null, REGIMENT, PennantSprite);
	this.RightRegiments = new GenieArray();
	this.RightRegiments.Set(ARMY.COMMAND.REGIMENTS, BattleRegiment, null, REGIMENT, PennantSprite);
};
ImperialBattleView.prototype.SetCommands = function(lCmmnd, rCmmnd) {

	this.LeftCommand = lCmmnd;
	this.RightCommand = rCmmnd;
	this.LeftRegiments.forEach( function(rgmnt) {rgmnt.SetSatrapy(lCmmnd.Satrapy);} );
	this.RightRegiments.forEach( function(rgmnt) {rgmnt.SetSatrapy(rCmmnd.Satrapy);} );
	this.LeftRegiments.forEach( function(rgmnt) {rgmnt.SetDirection(DIRECTION.NE);} );
	this.RightRegiments.forEach( function(rgmnt) {rgmnt.SetDirection(DIRECTION.SW);} );
	this.SetRegimentTypes();
	this.SetRegimentPositions();
};
ImperialBattleView.prototype.SetRegimentTypes = function() {
	var i;
	var lRgmnt, rRgmnt;

	lRgmnt = new Array(ARMY.COMMAND.REGIMENTS);
	Randomizer.Shuffle(lRgmnt, INITIALIZE);
	rRgmnt = new Array(ARMY.COMMAND.REGIMENTS);
	Randomizer.Shuffle(rRgmnt, INITIALIZE);

	for (i=0;i<ARMY.COMMAND.REGIMENTS;++i) {
		this.LeftRegiments[i].Regiment = this.LeftCommand.Regiments[lRgmnt[i]];
		this.RightRegiments[i].Regiment = this.RightCommand.Regiments[rRgmnt[i]];
	}
};
ImperialBattleView.prototype.SetRegimentPositions = function() {
	var i, c, r;
	var aRgns, iRgns;

	//Arrange half the rows at the base of either side of the battlefield
	for (i=0;i<ARMY.COMMAND.REGIMENTS/2;++i) {
		c = 2 * (i % 10);
		r = Math.floor(i/10);														//HARD-CODED!!!
		if (r % 2)
			++c;
//		this.LeftRegiments[i].SetRegion(c, r);
//		this.RightRegiments[i].SetRegion(BATTLeFIELD.REGION.C-(c+1), BATTLeFIELD.REGION.R-(r+1));
/**/		this.LeftRegiments[i].SetRegion(Battlefield.Regions[c][r]);
/**/		this.RightRegiments[i].SetRegion(Battlefield.Regions[BATTLeFIELD.REGION.C-(c+1)][BATTLeFIELD.REGION.R-(r+1)]);
	}

	//Arrange the other half randomly in the centre
	aRgns = new Array(240);		//NOTE: only first 40 values in the array will be used
	for (i=0;i<240;++i)																											//HARD-CODED!!!
		aRgns[i] = i;
	Randomizer.Shuffle(aRgns, INITIALIZE);
	iRgns = 0;
	for (i=ARMY.COMMAND.REGIMENTS/2;i<ARMY.COMMAND.REGIMENTS;i+=2) {
		c = aRgns[iRgns] % BATTLeFIELD.REGION.C;
		r = 4 + Math.floor(aRgns[iRgns]/BATTLeFIELD.REGION.C);														//HARD-CODED!!!
//		this.LeftRegiments[i].SetRegion(c, r);
/**/		this.LeftRegiments[i].SetRegion(Battlefield.Regions[c][r]);
		++iRgns;
		c = aRgns[iRgns] % BATTLeFIELD.REGION.C;
		r = 4 + Math.floor(aRgns[iRgns]/BATTLeFIELD.REGION.C);														//HARD-CODED!!!
//		this.RightRegiments[i].SetRegion(c, r);
/**/		this.RightRegiments[i].SetRegion(Battlefield.Regions[c][r]);
		++iRgns;
	}
};
ImperialBattleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.TerrainCheckBox.CheckClicked())
		this.TerrainFlag = this.TerrainCheckBox.Checked;

	if (this.RegimentIconPanel.CheckIconChanged())
		this.RegimentFlag = (this.RegimentIconPanel.DepressedIcon==1);

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}

	if (this.SelectedRegiment) {
		--this.Frames;
		if (!this.Frames)
			this.Frames = 100;
	}

	this.Draw();
};
ImperialBattleView.prototype.Draw = function() {

	for (this.r=(BATTLeFIELD.REGION.R-1);this.r>=0;--this.r)
		for (this.c=0;this.c<=(BATTLeFIELD.REGION.C-1);++this.c) {
			Battlefield.GetDiamondCoords(this.c, this.r);
			Battlefield.DrawRegion(Battlefield.Regions[this.c][this.r].Type, ((this.c+this.r) % 2));
			for (this.i=0;this.i<ARMY.COMMAND.REGIMENTS;++this.i) {
				if ( this.LeftRegiments[this.i].Region.C==this.c && this.LeftRegiments[this.i].Region.R==this.r ) {
					this.SetRegimentOpacity(this.LeftRegiments[this.i]);
					this.LeftRegiments[this.i].Display(this.RegimentFlag, this.RegimentOpacity);
				}
				if ( this.RightRegiments[this.i].Region.C==this.c && this.RightRegiments[this.i].Region.R==this.r ) {
					this.SetRegimentOpacity(this.RightRegiments[this.i]);
					this.RightRegiments[this.i].Display(this.RegimentFlag, this.RegimentOpacity);
				}
			}
		}
};
ImperialBattleView.prototype.SetRegimentOpacity = function(rgmnt) {

	if (rgmnt===this.SelectedRegiment) {
		if (this.Frames>50)
			this.RegimentOpacity = this.Frames / 100;
		else
			this.RegimentOpacity = 1.0 - (this.Frames/100);
	} else
		if (this.TerrainFlag)
			this.RegimentOpacity = 0.5;
};
ImperialBattleView.prototype.UpdateClick = function() {

	//Left regiments
	this.ClickedRegiment = this.UpdateRegimentClick(this.LeftRegiments);
	if (this.ClickedRegiment) {
		this.UpdateLeftRegimentClick();
		return;
	}

	//Right regiments
	if (this.SelectedRegiment) {
		this.ClickedRegiment = this.UpdateRegimentClick(this.RightRegiments);
		if (this.ClickedRegiment) {
			this.UpdateRightRegimentClick();
			return;
		}
	}

	this.UpdateTileClick();
};
ImperialBattleView.prototype.UpdateRegimentClick = function(aRgmnts) {
	var i;
	var y;
	var iRgmnt;

	//Add all units clicked to list
	this.ClickedRegiments.Reset();
	for (i=0;i<ARMY.COMMAND.REGIMENTS;++i)
		if (aRgmnts[i].CheckClicked())
			this.ClickedRegiments.Add(aRgmnts[i]);

	if (this.ClickedRegiments.CheckEmpty())
		return;

	//Pick regiment with lowest z-index
	iRgmnt = 0;
	y = aRgmnts[iRgmnt].Position.Y;
	for (i=1;i<this.ClickedRegiments.Length;++i)
		if (this.ClickedRegiments[i].Position.Y>y) {
			y = this.ClickedRegiments[i].Position.Y;
			iRgmnt = i;
		}

	return (this.ClickedRegiments[i]);
};
ImperialBattleView.prototype.UpdateLeftRegimentClick = function() {

	if (this.ClickedRegiment==this.SelectedRegiment)
		this.SelectedRegiment = null;
	else {
		if (TileUtils.CheckNeighbours(this.ClickedRegiment.Region, this.SelectedRegiment.Region)) {									//check are neighbours
			if (this.ClickedRegiment.Regiment.Type==this.SelectedRegiment.Regiment.Type) {												//check of same type
				if (this.LeftCommand.CheckRegimentsMergeable(this.ClickedRegiment.Regiment, this.SelectedRegiment.Regiment))	//check are mergeable
					this.LeftCommand.MergeRegiments(this.ClickedRegiment.Regiment, this.SelectedRegiment.Regiment);					//merge
				else
					this.SelectedRegiment = this.ClickedRegiment;																					//select clicked
			} else
				this.SelectedRegiment = this.ClickedRegiment;																						//select clicked
		} else
			this.SelectedRegiment = this.ClickedRegiment;																							//select clicked
	}
};
ImperialBattleView.prototype.UpdateRightRegimentClick = function() {

	if (TileUtils.CheckNeighbours(this.ClickedRegiment.Region, this.SelectedRegiment.Region)) {
		RegimentClashView.SetRegiments(this.SelectedRegiment, this.ClickedRegiment);
		setTimeout(this.Close(this.OpenClashView.bind(this)), 100);
	}
};
ImperialBattleView.prototype.UpdateTileClick = function() {  //UNLOGGED
	var region;

	region = Battlefield.GetRegionClicked();
	//TODO:
};
ImperialBattleView.prototype.GetClosestRegiment = function() {  //UNLOGGED - REDUNDANT?
	var i;
	var dstnc, mDstnc;		//m-min
	var iRgmnt;

	iRgmnt = 0;
	mDstnc = SCREEN.WIDTH;		//NOTE: arbitrary large number chosen
	for (i=0;i<this.ClickedRegiments.Length;++i) {
		dstnc = GeoUtils.GetDistance(Mouse.Click, this.ClickedRegiments[i].Position);
		if (dstnc<mDstnc)
			iRgmnt = i;
	}

	return (this.ClickedRegiments[iRgmnt]);
};
ImperialBattleView.prototype.OpenClashView = function() {  //UNLOGGED

	RegimentClashView.Open();
	RegimentClashView.Update();
};
/*
ImperialBattleView.prototype.UpdateOldClick = function() {  //UNLOGGED
	var rgmnt;

	//Instead of checking on collisions of mouse pointer and units, will select (or de-select) whichever regiment is closest to click
	for (this.i=0;this.i<this.RegimentDistances.length;++this.i)				//get all distances from mouse click
		if (this.i<ARMY.COMMAND.REGIMENTS) {
			this.RegimentPosition.X = this.LeftRegiments[this.i].Position.X + (this.LeftRegiments[this.i].Sprite.Specs.W/2);
			this.RegimentPosition.Y = this.LeftRegiments[this.i].Position.Y - (this.LeftRegiments[this.i].Sprite.Specs.H/2);
			this.RegimentDistances[this.i].Distance = SpaceUtils.GetDistance(this.RegimentPosition, Mouse.Click);
		} else {
			this.RegimentPosition.X = this.RightRegiments[this.i-ARMY.COMMAND.REGIMENTS].Position.X;
			this.RegimentPosition.X += this.RightRegiments[this.i-ARMY.COMMAND.REGIMENTS].Sprite.Specs.W / 2;
			this.RegimentPosition.Y = this.RightRegiments[this.i-ARMY.COMMAND.REGIMENTS].Position.Y;
			this.RegimentPosition.Y -= this.RightRegiments[this.i-ARMY.COMMAND.REGIMENTS].Sprite.Specs.H / 2;
			this.RegimentDistances[this.i].Distance = SpaceUtils.GetDistance(this.RegimentPosition, Mouse.Click);
		}

	//Determine closest regiment to mouse click
	this.RegimentDistances.sort( function(a, b) {b.Distance-a.Distance;} );
	if (this.RegimentDistances[0].Index<ARMY.COMMAND.REGIMENTS)
		rgmnt = this.LeftRegiments[this.RegimentDistances[0].Index];
	else
		rgmnt = this.RightRegiments[this.RegimentDistances[0].Index-ARMY.COMMAND.REGIMENTS];

	if (this.SelectedRegiment) {
		if (this.SelectedRegiment==rgmnt)
			this.SelectedRegiment = null;
		else {
			if (this.SelectedRegiment.Satrapy===rgmnt.Satrapy) {
				if (true) {  //regiments are neighbours and of same type
					if (true) {  //regiments are mergeable
						//merge
					} else
						this.SelectedRegiment = rgmnt;
				} else
					this.SelectedRegiment = rgmnt;
			} else
				if (TileUtils.CheckNeighbours(this.SelectedRegiment.Region, rgmnt.Region)) {
					RegimentBattleView.SetRegiments(this.EnemyRegiment, rgmnt);
					setTimeout(this.OpenRegimentView.bind(this), 100);
				}
		}
	}
};
ImperialBattleView.prototype.UpdateUnitClick = function() {  //UNLOGGED - REDUNDANT
	var i;
	var rgmnt;

	//Add all units clicked to list
	this.ClickedRegiments.Reset();
	for (i=0;i<ARMY.COMMAND.REGIMENTS;++i) {
		this.RegimentBoxes[i].Set(this.LeftRegiments[this.i].Position.X, this.LeftRegiments[this.i].Position.Y-50, 43, 50);
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.RegimentBoxes[i]))
			this.ClickedRegiments.Add(this.RegimentBoxes[i]);
		this.RegimentBoxes[i].Set(this.RightRegiments[this.i].Position.X, this.LeftRegiments[this.i].Position.Y-50, 43, 50);
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.RegimentBoxes[i]))
			this.ClickedRegiments.Add(this.RegimentBoxes[i]);
	}

	if (this.ClickedRegiments.CheckEmpty()) {
		//-handle tile click
		return;
	} else
		rgmnt = this.GetClosestRegiment();

	if (this.SelectedRegiment) {
		if (this.SelectedRegiment==rgmnt)
			this.SelectedRegiment = null;				//de-select
		else {
			if (TileUtilities.CheckNeighbours(this.SelectedRegiment.Region, rgmnt.Region)) {		//check if are neighbours
				if (this.SelectedRegiment.Satrapy===rgmnt.Satrapy) {									//check if are on same side
					if (this.SelectedRegiment.Regiment.Type==rgmnt.Regiment.Type) {		  		//check if are of same type
						if (this.SelectedRegiment.Regiment.CheckMergeable(rgmnt.Regiment))  		//check mergeable
							this.LeftCommand.MergeRegiments(this.SelectedRegiment, rgmnt);			//merge
						else
							this.SelectedRegiment = rgmnt;
					} else
						this.SelectedRegiment = rgmnt;
				} else {
					RegimentBattleView.SetRegiments(this.EnemyRegiment, rgmnt);
					setTimeout(this.OpenRegimentView.bind(this), 100);
				}
			}
		}
	} else
		this.SelectedRegiment = rgmnt;
};
*/
