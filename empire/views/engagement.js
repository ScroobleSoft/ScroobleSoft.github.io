
//--------------------------------------------------------
//---------- IMPERIAL ENGAGEMENT VIEW -------------------- 
var ImperialEngagementView = function() {
	var LeftSatrapy, RightSatrapy;
	var LeftCommand, RightCommand;
	var LeftSide, RightSide, LeftDivisions, RightDivisions, SelectedDivision;
	var ClickedDivision, ClickedDivisions;
	var DivisionOpacity;
	var TerrainFlag, DivisionFlag;
	var MiddleRegions, RegionCount, DivisionIndices;					//used in setting positions for battles and clashes
	var StepDownView;
	var Frames;

	var i, c, r;
};
ImperialEngagementView.prototype = new GenieView();
ImperialEngagementView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.ClickedDivisions = new GenieList();
	this.ClickedDivisions.Set(6);							//TODO: 6 is probably the most divisions can overlap
	this.Frames = 200;
};
ImperialEngagementView.prototype.SetSatrapies = function(lStrpy, rStrpy) {  //UNLOGGED

	this.LeftSatrapy = lStrpy;
	this.RightSatrapy = rStrpy;
};
ImperialEngagementView.prototype.SetCommands = function(lCmmnd, rCmmnd) {  //UNLOGGED - might be replaced by ::SetSides

	this.LeftCommand = lCmmnd;
	this.RightCommand = rCmmnd;
};
ImperialEngagementView.prototype.SetSides = function(lSide, rSide) {  //UNLOGGED

	this.LeftSide = lSide;
	this.RightSide = rSide;
};
ImperialEngagementView.prototype.SetPositions = function() {  //UNLOGGED
	var iRgns, bRgns, mRgns;		//b- base, m- middle

	//Set indices for middle divisions
	this.RegionCount = 0;
	this.MiddleRegions = new Array(BATTLeFIELD.REGIONS.CENTRAL);		//NOTE: only first 40 values in the array will be used
	Randomizer.Shuffle(this.MiddleRegions, INITIALIZE);

	this.SetBasePositions(this.LeftDivisions);				//arrange half the attacking divisions at the base of the battlefield
	this.SetMiddlePositions(this.LeftDivisions);				//arrange the other half in the middle
	this.SetBasePositions(this.RightDivisions, true);		//arrange half the attacking divisions at the base of the battlefield
	this.SetMiddlePositions(this.RightDivisions);			//arrange the other half in the middle
};
ImperialEngagementView.prototype.SetDirections = function() {  //UNLOGGED

	this.LeftDivisions.forEach( function(dvsn) {dvsn.SetDirection(DIRECTION.NE);} );
	this.RightDivisions.forEach( function(dvsn) {dvsn.SetDirection(DIRECTION.SW);} );
};
ImperialEngagementView.prototype.SetBasePositions = function(divisions, bTop) {  //arrange divisions at the base or top of the battlefield
	var i, c, r;
	var hRgmnts;		//h- half

	this.DivisionIndices = new Array(divisions.length);												//TODO: 20 for MOBILE, even less for smaller fields
	Randomizer.Shuffle(this.DivisionIndices, INITIALIZE);
	hRgmnts = Math.round(divisions.length/2);
	for (i=0;i<hRgmnts;++i) {
		c = 2 * (i % (BATTLeFIELD.REGION.C/2));
		r = Math.floor(i/(BATTLeFIELD.REGION.C/2));
		if (r % 2)
			++c;
		if (bTop)
			divisions[this.DivisionIndices[i]].SetRegion(Battlefield.Regions[BATTLeFIELD.REGION.C-(c+1)][BATTLeFIELD.REGION.R-(r+1)]);
		else
			divisions[this.DivisionIndices[i]].SetRegion(Battlefield.Regions[c][r]);
	}
};
ImperialEngagementView.prototype.SetMiddlePositions = function(divisions) {
	var i, c, r;
	var hRgmnts;		//h- half

	hRgmnts = Math.round(divisions.length/2);
	for (i=hRgmnts;i<divisions.length;++i) {		//TODO: all values in this loop should depend on size of battlefield
		c = this.MiddleRegions[this.RegionCount] % BATTLeFIELD.REGION.C;
		r = BATTLeFIELD.REGIONS.CLEAR.R + Math.floor(this.MiddleRegions[this.RegionCount]/BATTLeFIELD.REGION.C);
		divisions[this.DivisionIndices[i]].SetRegion(Battlefield.Regions[c][r]);
		++this.RegionCount;
	}
};
ImperialEngagementView.prototype.SetDivisionOpacity = function(dvsn) {

	if (dvsn===this.SelectedDivision) {
		if (this.Frames>100)
			this.DivisionOpacity = (this.Frames-100) / 100;
		else
			this.DivisionOpacity = 1.0 - (this.Frames/100);
	} else
		if (this.TerrainFlag)
			this.DivisionOpacity = 0.5;
		else
			this.DivisionOpacity = 1.0;
};
ImperialEngagementView.prototype.SetSides = function(lSide, rSide) {  //UNLOGGED - EXPERIMENTAL for now
	var nDvsns;
//	ImperialEngagementView.prototype.SetSides.call(this, lRgmnt.Unit, rRgmnt.Unit);

	this.LeftSide = lSide;
	this.RightSide = rSide;

	//Set groups (regiments/batallions/squads/soldiers)
	nDvsns = this.LeftSide.GetGroups();
	this.LeftDivisions = new Array(nDvsns);
	for (i=0;i<nDvsns;++i) {
		this.LeftDivisions[i] = Divisions[i];
		this.LeftDivisions[i].SetCommand(this.LeftCommand);			//replace with .SetSatrap, as shown below
//		this.LeftDivisions[i].SetSatrap(this.LeftSide.Satrapy);
		this.LeftDivisions[i].SetUnit(this.LeftSide.Groups[i]);
	}
	nDvsns = this.RightSide.GetGroups();
	this.RightDivisions = new Array(nDvsns);
	for (j=0;j<nDvsns;++j) {
		this.RightDivisions[j] = Divisions[j+i];
		this.RightDivisions[j].SetCommand(this.RightCommand);			//??? see above
		this.RightDivisions[j].SetUnit(this.RightSide.Groups[j]);
	}
//	this.Terrain = [rRgmnt.Type];  TODO: needs to be some kind of mapping
};
ImperialEngagementView.prototype.UpdateClick = function() {

	//Left regiments
	this.ClickedDivision = this.UpdateDivisionClick(this.LeftDivisions, this.DivisionFlag);
	if (this.ClickedDivision) {
		this.UpdateLeftDivisionClick();
		return;
	}

	//Right regiments
	if (this.SelectedDivision) {
		this.ClickedDivision = this.UpdateDivisionClick(this.RightDivisions, this.DivisionFlag);
		if (this.ClickedDivision) {
			this.UpdateRightDivisionClick();
			return;
		}
	}

	this.UpdateTileClick();
};
ImperialEngagementView.prototype.UpdateDivisionClick = function(aDvsns, bFlag) {
	var i;
	var y;
	var iDvsn;

	//Add all units clicked to list
	this.ClickedDivisions.Reset();
	for (i=0;i<aDvsns.length;++i)
		if (aDvsns[i].CheckClicked(bFlag))
			this.ClickedDivisions.Add(aDvsns[i]);

	if (this.ClickedDivisions.CheckEmpty())
		return;

	//Pick division with lowest z-index
	iDvsn = 0;
	y = aDvsns[iDvsn].Position.Y;
	for (i=1;i<this.ClickedDivisions.Length;++i)
		if (this.ClickedDivisions[i].Position.Y>y) {
			y = this.ClickedDivisions[i].Position.Y;
			iDvsn = i;
		}

	return (this.ClickedDivisions[iDvsn]);
};
ImperialEngagementView.prototype.UpdateLeftDivisionClick = function() {

	if (!this.SelectedDivision)
		this.SelectDivision(this.ClickedDivision);																									//select if none selected
	else if (this.ClickedDivision==this.SelectedDivision)
		this.SelectDivision(null);																															//de-select
	else {
		if (TileUtils.CheckNeighbours(this.ClickedDivision.Region, this.SelectedDivision.Region)) {									//check are neighbours
			if (this.ClickedDivision.Unit.Type==this.SelectedDivision.Unit.Type) {															//check of same type
				if (this.LeftCommand.CheckDivisionsMergeable(this.ClickedDivision.Unit, this.SelectedDivision.Unit))				//check are mergeable
					this.LeftCommand.MergeDivisions(this.ClickedDivision.Unit, this.SelectedDivision.Unit);							//merge
				else
					this.SelectDivision(this.ClickedDivision);																						//select clicked
			} else
				this.SelectDivision(this.ClickedDivision);																							//select clicked
		} else
			this.SelectDivision(this.ClickedDivision);																								//select clicked
	}
};
ImperialEngagementView.prototype.SelectDivision = function(dvsn) {  //UNLOGGED

	this.SelectedDivision = dvsn;
	this.InfoView.Update();
};
ImperialEngagementView.prototype.UpdateRightDivisionClick = function() {

	if (TileUtils.CheckNeighbours(this.ClickedDivision.Region, this.SelectedDivision.Region))
		this.Close(this.OpenClashView.bind(this), 20);
};
ImperialEngagementView.prototype.UpdateTileClick = function() {  //UNLOGGED
	var region;

	region = Battlefield.GetRegionClicked();
	//TODO:
};
