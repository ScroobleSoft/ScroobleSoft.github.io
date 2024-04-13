/*
 *  -might need separate ones for dominion theaters (because of varying perspectives)
 *  -this is starting to look like specialized classes will be needed per game
 *  ISSUE: actually, even having a list of pointers to objects visible (.VisibleObjects) will create garbage to be collected since pointer values are discarded
 *		on every sweep (or are they? - maybe not); 2 sweeps (one for marking .Visible, and a second for drawing) would be pretty slow (verification needed)
 *
 *  GameSpace: with a pointer to a GameSpace object, if there are zones defined, only need to check 4 zones (as that is the max that can be on-screen if 600x600px
 *			 zone sizes are picked) to see if assets are visibile; note that this is applicable to top-down: other perspectives get more complicated; actually
 *			 for other perspectives, could determine central zone by using quad centre coords, then checking surrounding zones using ::PointInPolygon, or
 *			 could simply make sure zones are large enough that there are never more than 4 on screen
 */
//----------------------------------------------------
//---------- GENIE SCREEN MANAGER --------------------
var GenieScreenManager = function() {
	var InfoBox;
	var ScreenRect, InfoBoxRect;
	var GraphicsTool;
	var Perspective;
	var InfoBoxScale;
	var ScreenRectW, ScreenRectH;	//REDUNDANT?
	var VisualObjects;			//array of arrays
	var VisibleObjects;			//lists
	var SelectedAgent, Top, Left, Bottom, Right;

	var AgentArrays, StructureArrays;	//currently REDUNDANT

	var i, j;	//scratch variables
};
GenieScreenManager.prototype = {
	Set(iBox, sRect, gTool, nObjects, bRect) {  //NOTE: nObjects is an estimate of maximum number of objects reasonably expected on screen (includes FX, ammo)
		this.InfoBox = iBox;
		this.ScreenRect = sRect;
		this.GraphicsTool = gTool;
		this.VisualObjects = new Array();
		this.VisibleObjects = new GenieList();
		this.VisibleObjects.Set(nObjects);

		this.AgentArrays = new Array();

		this.InfoBoxRect = new GenieRect();
		if (bRect)
			this.SetInfoBoxRect();
	},
	SetInfoBoxRect() {

		this.InfoBoxScale = MAP.W/INFoBOX.WIDTH;
		this.InfoBoxRect.W = SCREEN.WIDTH/this.InfoBoxScale;
		this.InfoBoxRect.H = SCREEN.HEIGHT/this.InfoBoxScale;
	},
	SetPerspective(prspctv) {

		this.Perspective = prspctv;
	},
	SetVisualObjects() {
		//-idea is to pass arrays of agents and terrain features as arguments, and add them to .VisualObjects array with extra .Type field
	},
	SetAgentLists() {

		//UNLOGGED
		
	},
	SetAgent(agnt, brdr) {

		this.SelectedAgent = agnt;
		if (brdr) {
			this.Top = brdr;
			this.Left = brdr;
			this.Bottom = SCREEN.HEIGHT - brdr;
			this.Right = SCREEN.WIDTH - brdr;
		}
	},
	AddArray(aArray) {  //a- asset

		//UNLOGGED

		this.VisualObjects.push(aArray);
	},
	AddAgentArrays() {  //unlimited arguments

		//UNLOGGED - maybe REDUNDANT

		for (indx=0;indx<arguments.length;++indx)
	 this.AgentArrays.push(arguments[indx]);
	},
	AddObjectArrays() {  //maybe TEMP . . . maybe should be StructureArrays . . . would like to use 'Asset' instead of Object

		//UNLOGGED - maybe REDUNDANT

		for (indx=0;indx<arguments.length;++indx)
	 this.VisualObjects.push(arguments[indx]);
	},
	DrawAssets() {

		//UNLOGGED

		if (this.Perspective) {
	 //-have to draw per 'scan line'
		} else {
	 //-only need to check if asset is visible
		}
	},
	DetermineVisibleObjects() {

		//UNLOGGED

		//Go through all lists to see which agents are extant; for each extant object, record an entry in GenieList if visible
		this.VisibleObjects.Reset();
		for (this.i=0;this.i<this.VisualObjects.length;++this.i)
	 for (this.j=0;this.j<this.VisualObjects[this.i].length;++this.j)
		 if (this.VisualObjects[this.i][this.j].CheckExtant())
			 if (this.VisualObjects[this.i][this.j].CheckVisible())
		  this.VisibleObjects.Add(this.VisualObjects[this.i][this.j]);

		//TODO: list might be sorted here if perspective is not top-down; sorted list will have to have dummy Coordinate structures added
	},
	DetermineObjectCoords() {

		//UNLOGGED - ::DetermineCoords called here, ::QuickDraw called in this->DrawVisibleObjects() (to separate Update-Draw cycles)

	},
	DrawVisibleObjects() {

		//UNLOGGED - maybe TEMP, likely not as should replace ::DrawObjects

		//-first determine screen coords
		//-then draw (quickdraw)
		for (this.i=0;this.i<this.VisibleObjects.Length;++this.i)
	 this.VisibleObjects[this.i].Draw();
	},
	DrawObjects() {

		//UNLOGGED - very, very TEMP (for a BVR Test), not using .VisualObjects

		for (indx=0;indx<this.AgentArrays.length;++indx)
	 for (indx2=0;indx2<this.AgentArrays[indx].length;++indx2)
		 if (this.AgentArrays[indx][indx2].Extant)
//			 if (GeoUtils.CheckPointInBox(this.AgentArrays[indx][indx2].Position, this.ScreenRect))
			 if (this.AgentArrays[indx][indx2].CheckOnScreen())
		  this.AgentArrays[indx][indx2].Draw();
	},
	UpdateScreenRect() {

		this.ScreenRect.L = Math.round(Mouse.Click.X*this.InfoBoxScale) - (SCREEN.WIDTH/2);
		this.ScreenRect.T = Math.round(Mouse.Click.Y*this.InfoBoxScale) - (SCREEN.HEIGHT/2);
		this.NormalizeScreenRect();
	},
	NormalizeScreenRect() { //makes sure rect is within map

		if (this.ScreenRect.L<0)
			this.ScreenRect.L = 0;
		if (this.ScreenRect.L>(MAP.W-SCREEN.WIDTH))
			this.ScreenRect.L = MAP.W - SCREEN.WIDTH;
		if (this.ScreenRect.T<0)
			this.ScreenRect.T = 0;
		if (this.ScreenRect.T>(MAP.H-SCREEN.HEIGHT))
			this.ScreenRect.T = MAP.H - SCREEN.HEIGHT;
	},
	AdjustScreenRect() { //keep selected agent within boundaries

		if (this.SelectedAgent) {

			if ((this.SelectedAgent.Position.X+this.SelectedAgent.CentreOffset.X)-this.ScreenRect.L<this.Left)
				this.ScreenRect.L = Math.round((this.SelectedAgent.Position.X+this.SelectedAgent.CentreOffset.X)-this.Left);
			if ((this.SelectedAgent.Position.X+this.SelectedAgent.CentreOffset.X)-this.ScreenRect.L>this.Right)
				this.ScreenRect.L = Math.round((this.SelectedAgent.Position.X+this.SelectedAgent.CentreOffset.X)-this.Right);
			if ((this.SelectedAgent.Position.Y+this.SelectedAgent.CentreOffset.Y)-this.ScreenRect.T<this.Top)
				this.ScreenRect.T = Math.round((this.SelectedAgent.Position.Y+this.SelectedAgent.CentreOffset.Y)-this.Top);
			if ((this.SelectedAgent.Position.Y+this.SelectedAgent.CentreOffset.Y)-this.ScreenRect.T>this.Bottom)
				this.ScreenRect.T = Math.round((this.SelectedAgent.Position.Y+this.SelectedAgent.CentreOffset.Y)-this.Bottom);

			this.NormalizeScreenRect();
		}
	},
	NormalizeRect(rect, map, screen) {  //TODO: move to utilities?
		var mW, mH;
		var sW, sH;

		if (rect.L<0)
	 rect.L = 0;
		if (rect.T<0)
	 rect.T = 0;
		mW = map.W || map.WIDTH;
		sW = screen.W || screen.WIDTH;
		if (rect.L>(mW-sW))
	 rect.L = mW - sW;
		mH = map.H || map.HEIGHT;
		sH = screen.H || screen.HEIGHT;
		if (rect.T>(mH-sH))
	 rect.T = mH - sH;
	},
	DrawScreenRect() {

		this.GraphicsTool.SwitchContext(this.InfoBox);
		this.InfoBoxRect.L = this.ScreenRect.L/this.InfoBoxScale;
		this.InfoBoxRect.T = this.ScreenRect.T/this.InfoBoxScale;
		this.GraphicsTool.DrawRectangle(this.InfoBoxRect.L, this.InfoBoxRect.T, this.InfoBoxRect.W, this.InfoBoxRect.H, SCREEnRECT.COLOUR, SCREEnRECT.LW);
		this.GraphicsTool.RestoreContext();
	},
	GetObjectClicked() {

		//UNLOGGED

		//-return NULL if terrain clicked (have to check agents and structures, not projectiles), otherwise return object
	}
};
