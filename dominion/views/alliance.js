
//-------------------------------------------------------
//---------- ALLIANCE SELECTION VIEW --------------------
var AllianceSelectionView = function() {
	var AlliancePanelImage, AllianceImagePanel;
	var CommodityPanelImage, CommodityImagePanel;
	var MissionImages, AllianceMarkerImage;
	var MissionSlots;
};
AllianceSelectionView.prototype = new GenieView();
AllianceSelectionView.prototype.Set = function(cnvs, specs, gTool) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.SetLinks(gTool);
	this.SetSlots();
};
AllianceSelectionView.prototype.SetControls = function() {

	this.AlliancePanelImage = new GenieImage();
	this.AlliancePanelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], ALLIANCePANElIMAGE);
	this.AllianceImagePanel = new GenieImagePanel();
	this.AllianceImagePanel.Set(this.Canvas, ALLIANCeIMAGePANEL, this.AlliancePanelImage);
	this.Controls.push(this.AllianceImagePanel);

	this.CommodityPanelImage = new GenieImage();
	this.CommodityPanelImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], COMMODITyPANElIMAGE);
	this.CommodityImagePanel = new GenieImagePanel();
	this.CommodityImagePanel.Set(this.Canvas, COMMODITyIMAGePANEL, this.CommodityPanelImage);
	this.Controls.push(this.CommodityImagePanel);
};
AllianceSelectionView.prototype.SetComponents = function() {

	this.MissionImages = new GenieImage();
	this.MissionImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], MISSIOnIMAGEs);

	this.AllianceMarkerImage = new GenieImage();
	this.AllianceMarkerImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], ALLIANCeMARKErIMAGE);
};
AllianceSelectionView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	//LOGGED

};
AllianceSelectionView.prototype.Update = function() {

	//LOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.UpdateMissionClick();
};
AllianceSelectionView.prototype.Draw = function() {
	var i, x, y;

	//UNLOGGED

	this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 1 }, SCREEN.WIDTH, "black", 3);
	this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 200 }, SCREEN.WIDTH, "black", 3);
	this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 400 }, SCREEN.WIDTH, "black", 3);
	this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 638 }, SCREEN.WIDTH, "black", 3);

	for (i=0;i<MISSION.TYPES;++i) {
		x = this.Specs.MISSION.L + ((this.Specs.MISSION.W+this.Specs.MISSION.O)*Math.floor(i/this.Specs.MISSION.R));
		y = this.Specs.MISSION.T + ((this.Specs.MISSION.H+this.Specs.MISSION.O)*Math.floor(i % this.Specs.MISSION.R));
		this.GraphicsTool.DrawRectangle(x, y, this.Specs.MISSION.W, this.Specs.MISSION.H, "white", 0);
		this.GraphicsTool.DrawRectangle(x, y, this.Specs.MISSION.W, this.Specs.MISSION.H, "black", 3);
		x += this.Specs.MISSION.LW;
		y += this.Specs.MISSION.TITLE;
		this.MissionImages.DrawPatchNumber(i, x, y);
	}
};
AllianceSelectionView.prototype.SetSlots = function() {
	var i, x, y;

	this.MissionSlots = ArrayUtils.Create(MISSION.TYPES, GenieRect);
	for (i=0;i<this.MissionSlots.length;++i) {
		x = this.Specs.MISSION.L + ((this.Specs.MISSION.W+this.Specs.MISSION.O)*Math.floor(i/this.Specs.MISSION.R));
		y = this.Specs.MISSION.T + ((this.Specs.MISSION.H+this.Specs.MISSION.O)*Math.floor(i % this.Specs.MISSION.R));
		this.MissionSlots[i].Set(x, y, ALLIANCE.MISSION.W, ALLIANCE.MISSION.H);
	}
};
AllianceSelectionView.prototype.DisplayAllianceInfo = function() {

	//UNLOGGED

	//-marker
	//-relevant info

};
AllianceSelectionView.prototype.DisplayCommodityInfo = function() {

	//UNLOGGED

};
AllianceSelectionView.prototype.DisplayMissionInfo = function() {

	//UNLOGGED

};
AllianceSelectionView.prototype.DisableCommoditySection = function() {

	//UNLOGGED - maybe REDUNDANT

	this.Context.globalAlpha = 0.5;
	this.Context.fillStyle = "black";
	this.Context.fillRect(0, 202, SCREEN.WIDTH, 197);
	this.Context.globalAlpha = 1.0;
};
AllianceSelectionView.prototype.DisableMissionSection = function() {

	//UNLOGGED - maybe REDUNDANT

	this.Context.globalAlpha = 0.5;
	this.Context.fillStyle = "black";
	this.Context.fillRect(0, 514, SCREEN.WIDTH, 235);
	this.Context.globalAlpha = 1.0;
};
AllianceSelectionView.prototype.UpdateMissionClick = function() {

	//UNLOGGED

	for (this.i=0;this.i<this.MissionSlots.length;++this.i)
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.MissionSlots[this.i])) {
			Game.Interface.SuspendInput();
			//-place a square around relevant button
			setTimeout(this.OpenMissionView.bind(this, this.i), 60);
			return;
		}
};
AllianceSelectionView.prototype.OpenMissionView = function(iMssn) {

	//UNLOGGED

	this.Close();
	switch (iMssn) {
		case MISSION.SABOTAGE:
			break;
		case MISSION.AIrMISSION:

			//TEMP
			var lSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
			var rSqdrn = [ { Type: JET.FIGHTER, Grade: 0 } ];
			//TEMP

			AirMissionView.SetNations(Powers[POWER.TOMCAT], Powers[POWER.HORNET]);
			AirMissionView.SetSquadrons(lSqdrn, rSqdrn);
			AirMissionView.DrawFrame();
			AirMissionView.DrawInfoBox();
			AirMissionView.DrawJets();
			break;
		case MISSION.CHAMPIONS:
			ChampionsView.Play();
			break;
		case MISSION.BLOCKADE:
   var blockade = new ShipBattleMiniGame();
   blockade.Set(this.Context, DominionScape.ZoomScape.Context, this.GraphicsTool, DominionText, DominionRandomizer);
   DominionScape.ZoomScape.Context.fillStyle = "lightgrey";
   DominionScape.ZoomScape.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
   blockade.Play();
			break;
		case MISSION.INTERDICTION:
			MiniGames.SetInterdictionStrike();
			MiniGames.PlayInterdictionStrike();
			break;
		case MISSION.ICBM:
			break;
		case MISSION.DOGFIGHT:
			break;
		case MISSION.HUNTING:
			break;
	}
};
