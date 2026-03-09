/*
		ratings for each regiment are either 10 or 11
		each 'spin' in a 1 on 1 roll of the (10/11 sided) dice, whichever value a regiment gets that number is subtracted from the total strength x 10
		however, for multi regiment engagements, cucmulative values get removed?
*/
//----------------------------------------------------
//---------- IMPERIAL BATTLE VIEW --------------------
var ImperialBattleView = function() {
	var TerrainCheckBox, RegimentIconPanel;
	var UnitOffsets;
};
ImperialBattleView.prototype = new ImperialEngagementView();
ImperialBattleView.prototype.Set = function(cnvs, specs) {
	ImperialEngagementView.prototype.Set.call(this, cnvs, specs);

};
ImperialBattleView.prototype.SetControls = function() {

	this.TerrainCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.TERRAIN, CheckBoxImages, Text);
	this.RegimentIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.REGIMENT, this.Specs.ICOnPANEL.REGIMENT.IMAGE, IconCornerImages, Graphics,
																																						ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
ImperialBattleView.prototype.SetCommands = function(lCmmnd, rCmmnd) {
	ImperialEngagementView.prototype.SetCommands.call(this, lCmmnd, rCmmnd);

	this.SetRegiments();
	this.SetPositions();
	this.SetDirections();
};
ImperialBattleView.prototype.SetRegiments = function() {
	var i, j;
	var nDvsns;

	nDvsns = this.LeftCommand.GetRegiments();
	this.LeftDivisions = new Array(nDvsns);
	for (i=0;i<nDvsns;++i) {
		this.LeftDivisions[i] = Divisions[i];
		this.LeftDivisions[i].SetCommand(this.LeftCommand);
		this.LeftDivisions[i].SetUnit(this.LeftCommand.Regiments[i]);
	}
	nDvsns = this.RightCommand.GetRegiments();
	this.RightDivisions = new Array(nDvsns);
	for (j=0;j<nDvsns;++j) {
		this.RightDivisions[j] = Divisions[j+i];
		this.RightDivisions[j].SetCommand(this.RightCommand);
		this.RightDivisions[j].SetUnit(this.RightCommand.Regiments[j]);
	}
};
ImperialBattleView.prototype.Open = function() {
	ImperialEngagementView.prototype.Open.call(this);

	this.Attackers = this.LeftCommand;
	this.StepDownView = RegimentClashView;
};
ImperialBattleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.TerrainCheckBox.CheckClicked())
		this.TerrainFlag = this.TerrainCheckBox.Checked;

	if (this.RegimentIconPanel.CheckIconChanged())
		this.DivisionFlag = (this.RegimentIconPanel.DepressedIcon==1);

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}

	this.ConsoleView.Update();

	if (this.SelectedDivision) {
		--this.Frames;
		if (!this.Frames)
			this.Frames = 200;
	}

	Graphics.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT/2, this.Specs.COLOUR, 0);
	this.Draw();
};
ImperialBattleView.prototype.Draw = function() {

	for (this.r=(BATTLeFIELD.REGION.R-1);this.r>=0;--this.r)
		for (this.c=0;this.c<=(BATTLeFIELD.REGION.C-1);++this.c) {
			Battlefield.GetDiamondCoords(this.c, this.r);
			Battlefield.DrawRegion(Battlefield.Regions[this.c][this.r].Type, ((this.c+this.r) % 2));
			for (this.i=0;this.i<ARMY.COMMAND.REGIMENTS;++this.i) {
				if ( this.LeftDivisions[this.i].Region.C==this.c && this.LeftDivisions[this.i].Region.R==this.r ) {
					if (this.LeftDivisions[this.i]===this.SelectedDivision)
						Graphics.DrawCircle(this.LeftDivisions[this.i].Position.X, this.LeftDivisions[this.i].Position.Y, 10, "yellow", 2);
					this.SetDivisionOpacity(this.LeftDivisions[this.i]);
					this.LeftDivisions[this.i].Display(this.DivisionFlag, this.DivisionOpacity);
				}
				if ( this.RightDivisions[this.i].Region.C==this.c && this.RightDivisions[this.i].Region.R==this.r ) {
					this.SetDivisionOpacity(this.RightDivisions[this.i]);
					this.RightDivisions[this.i].Display(this.DivisionFlag, this.DivisionOpacity);
				}
			}
		}
};
ImperialBattleView.prototype.SetClashRegiments = function() {  //UNLOGGED
	var i;
	var c, r;
	var lRgmnts, rRgmnts;

	lRgmnts = new Array();
	rRgmnts = new Array();
	for (i=0;i<TileUtils.Neighbours.length;++i) {
		c = this.ClickedDivision.Region.C + TileUtils.Neighbours[i][0];
		r = this.ClickedDivision.Region.R + TileUtils.Neighbours[i][1];
		if (TileUtils.CheckTileValid(c, r))
			if (Battlefield.Regions[c][r].Division) {
				if (Battlefield.Regions[c][r].Division.Satrapy===this.LeftSatrapy)
					lRgmnts.push(Battlefield.Regions[c][r].Division);
				else
					rRgmnts.push(Battlefield.Regions[c][r].Division);
		}
	}

	ClashSimView.SetRegiments(lRgmnts, rRgmnts);
};
ImperialBattleView.prototype.OpenClashView = function() {  //UNLOGGED

	ClashSimView.SetSatrapies(this.LeftSatrapy, this.RightSatrapy);
	this.SetClashRegiments();
	ClashSimView.SetTerrain(this.ClickedDivision.Region.Type);
	ClashSimView.SetAttackers(DIRECTION.R);		//maybe REDUNDANT
	ClashSimView.Open();
	ClashSimView.Update();
/*
	RegimentClashView.SetSatrapies(this.LeftSatrapy, this.RightSatrapy);
	this.SetRegiments();
	RegimentClashView.SetTerrain(this.ClickedDivision.Region.Type);
	RegimentClashView.SetAttackers(DIRECTION.R);
	RegimentClashView.Open();
	RegimentClashView.Update();
*/
};
