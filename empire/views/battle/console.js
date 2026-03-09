
//------------------------------------------------------------
//---------- IMPERIAL BATTLE CONSOLE VIEW --------------------
var ImperialBattleConsoleView = function() {
	var UnitLabelImages, TerrainNameImages, ImmortalImage, SteppeImage;
	var LabelsIconPanel;
	var UnitsFlag;
};
ImperialBattleConsoleView.prototype = new GenieSubView();
ImperialBattleConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.UnitsFlag = true;
};
ImperialBattleConsoleView.prototype.SetImages = function() {

	this.UnitLabelImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LABELS);
	this.TerrainNameImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TERRAIN);
	this.ImmortalImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.IMMORTAL);
	this.SteppeImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.STEPPE);
};
ImperialBattleConsoleView.prototype.SetControls = function() {

	this.LabelsIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.LABELS, this.Specs.ICOnPANEL.LABELS.IMAGE, IconCornerImages, Graphics,
																																						ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
ImperialBattleConsoleView.prototype.Update = function() {

	if (this.LabelsIconPanel.CheckIconChanged()) {
		this.UnitsFlag = (this.LabelsIconPanel.DepressedIcon==0);
		this.Context.clearRect(0, 0, CONTROlPANEL.WIDTH, 190);
		this.Context.clearRect(0, 190, 140, 50);
		this.Draw();
	}
};
ImperialBattleConsoleView.prototype.Draw = function() {  //NOTE: Phone resolution is 156x320, Tablet is 240x240
	var i;
	var x, y;

	Graphics.SetContext(this.Context);
	ScreenManager.SwitchSpriteContext(this.Context);

	//Draw 10 units and 10 corresponding terrains
	if (Game.CheckPhone()) {
		for (i=0;i<IMPERIAlUNIT.TYPES;++i) {  //3 columns with unit, terrain and label arranged vertically - 3x3 45x90px slots used
			x = 79 * Math.floor(i/5);
			y = 65 * (i % 5);
			if (PlayerSatrapy.Army.CheckInfantryUnit(i))
				ScreenManager.DrawUnit(this.Context, i, DIRECTION.NE, this.MainView.LeftCommand.Satrapy, { Type: TERRAIN.STEPPE }, { X: x+12, Y: y+27 } );
			else
				ScreenManager.DrawUnit(this.Context, i, DIRECTION.NE, this.MainView.LeftCommand.Satrapy, { Type: TERRAIN.STEPPE }, { X: x+14, Y: y+31 } );
			Battlefield.DiamondCoords.Set(x+36, y+25);
			Battlefield.DrawRegion(UnitTerrainMapping[i], null, this.Context);
			if (this.UnitsFlag) {
				if (i==IMPERIAlUNIT.IMMORTAL)
					this.ImmortalImage.Draw( x+2, y+40);
				else
					this.UnitLabelImages.DrawPatchNumber(i, x+2, y+40);
			} else {
				if (i==IMPERIAlUNIT.IMMORTAL)
					this.SteppImage.Draw(x+2, y+40);
				else
					this.TerrainNameImages(i, x+2, y+40);
			}
		}
	} else {		//tablet
		for (i=0;i<IMPERIAlUNIT.TYPES;++i) {  //3 columns with unit and terrain side by side, labels below them - 3x3 80x65 slots
			x = 80 * (i % 3);
			y = 65 * Math.floor(i/3);
			if (PlayerSatrapy.Army.CheckInfantryUnit(i))
				ScreenManager.DrawUnit(this.Context, i, DIRECTION.NE, this.MainView.LeftCommand.Satrapy, { Type: TERRAIN.STEPPE }, { X: x+11, Y: y+34 } );
			else
				ScreenManager.DrawUnit(this.Context, i, DIRECTION.NE, this.MainView.LeftCommand.Satrapy, { Type: TERRAIN.STEPPE }, { X: x+13, Y: y+38 } );
			Battlefield.DiamondCoords.Set(x+40, y+26);
			Battlefield.DrawRegion(UnitTerrainMapping[i], null, this.Context);
			if (i==IMPERIAlUNIT.IMMORTAL) {
				if (this.UnitsFlag)
					this.ImmortalImage.Draw(82, y+21);
				else
					this.SteppeImage.Draw(82, y+21);
			} else {
				if (this.UnitsFlag)
					this.UnitLabelImages.DrawPatchNumber(i, x+4, y+46);
				else
					this.TerrainNameImages.DrawPatchNumber(i, x+4, y+46);
			}
		}
	}

	Graphics.ResetContext();
	ScreenManager.SwitchSpriteContext(GameScape.Screen);
};
