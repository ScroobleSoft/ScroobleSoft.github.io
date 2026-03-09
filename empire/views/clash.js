
//---------------------------------------------------
//---------- IMPERIAL CLASH VIEW --------------------
var ImperialClashView = function() {
	var LeftRegiment, RightRegiment, LeftBattalions, RightBattalions;
	var Terrain;
	var BattalionNames;
};
ImperialClashView.prototype = new GenieView();
ImperialClashView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.BattalionNames = [ "Purple", "Indigo", "Blue", "Green", "Lime", "Orange", "Red", "Pink", "Livid", "Russet" ];
};
ImperialClashView.prototype.SetRegiments = function(lRgmnt, rRgmnt) {  //UNLOGGED
	var i, j;
	var nBttlns;
/*
	ImperialEngagementView.prototype.SetSides.call(this, lRgmnt.Unit, rRgmnt.Unit);

//-set battalions as Left and Right Divisions
	nDvsns = this.LeftSide.GetBattalions();
	this.LeftDivisions = new Array(nDvsns);
	for (i=0;i<nDvsns;++i) {
		this.LeftDivisions[i] = Divisions[i];
		this.LeftDivisions[i].SetCommand(this.LeftCommand);
		this.LeftDivisions[i].SetUnit(this.LeftSide.Battalions[i]);
	}
	nDvsns = this.RightSide.GetBattalions();
	this.RightDivisions = new Array(nDvsns);
	for (j=0;j<nDvsns;++j) {
		this.RightDivisions[j] = Divisions[j+i];
		this.RightDivisions[j].SetCommand(this.RightCommand);
		this.RightDivisions[j].SetUnit(this.RightSide.Battalions[j]);
	}
//	this.Terrain = [rRgmnt.Type];  TODO: needs to be some kind of mapping
*/
	this.LeftRegiment = lRgmnt;
	this.RightRegiment = rRgmnt;

	nBttlns = this.LeftRegiment.GetBattalions();
	this.LeftBattalions = new Array(nBttlns);
	for (i=0;i<nBttlns;++i) {
		this.LeftBattalions[i] = Divisions[i];
		this.LeftBattalions[i].SetSatrap(this.LeftSatrap);
		this.LeftBattalions[i].SetUnit(this.LeftRegiment.Battalions[i]);
	}
	nBttlns = this.RightRegiment.GetBattalions();
	this.RightBattalions = new Array(nBttlns);
	for (j=0;j<nBttlns;++j) {
		this.RightBattalions[j] = Divisions[j+i];
		this.RightBattalions[j].SetSatrap(this.RightSatrap);
		this.RightBattalions[j].SetUnit(this.RightRegiment.Battalions[j]);
	}
};
ImperialClashView.prototype.Draw = function() {  //UNLOGGED

	//-10x10 grid for 20 battalions (10 on each side)
	//-mobile: 5x5 grid with same number of battalions (so 20 over 25 tiles)

	//TEMP: text only
	var i, j;
	var x, y;

	for (i=0;i<ARMY.REGIMENT.BATTALIONS;++i) {
		x = 40 + (75*i);
		Text.Write(this.BattalionNames[i], x, 20);
		Text.Write("Battalion", x, 35);
		Graphics.DrawHorizontalLine( { X: x, Y: 35 }, 65, "black", 1);
		y = 55 + (20*i);
		Text.Write("Squad: "+i, 5, y);
		for (j=0;j<ARMY.BATTALION.SQUADS;++j)
			Text.Write(this.LeftRegiment.Regiment.Battalions[i].GetSoldiers(), x+10, y+(20*j));

		//-right regiments
		y = 300 + (20*i);
		Text.Write("Squad: "+i, 5, y);
		for (j=0;j<ARMY.BATTALION.SQUADS;++j)
			Text.Write(this.RightRegiment.Regiment.Battalions[i].GetSoldiers(), x+10, y+(20*j));
	}

	//-winning has a green circle drawn next to it, losing a red one (TEMP)
};
ImperialClashView.prototype.Move = function(drctn) {  //UNLOGGED
	//-use tile utils to move
};
