/*
		Only one page shown
		In the future, a separate army/air force/navy/specialist page shows a comparison of Power units
		An additional dailog pop-up, or separate page, shows a F1-F9 comparison
*/
//----------------------------------------------------
//---------- DOMINION FORCES VIEW --------------------
var DominionForcesView = function() {
	var Nation;
	var CallingViewId;					//used in ::Close method
	var DigitImages;
	var CloseButton, CompareButton, ReturnButton;

	//TEMP and UNLOGGED - scratch sprites
	var LARTSprite, MARTSprite, HARTSprite;
	var JeepSprite, HowitzerSprite, APCSprite;
	var AVSprite, ArtillerySprite, IFVSprite;
	var MobileGunSprite, MortarTruckSprite, TankSprite;
	var ATWSprite, AAGunSprite, LCGSprite, SSMSprite, SAMSprite;
	var BomberSprite, FighterSprite, InterceptorSprite, InterdictorSprite, ReconSprite, RefuellerSprite, StraferSprite, TransportSprite;
	var GunBoatSprite, MissileBoatSprite, FrigateSprite, CruiserSprite, DestroyerSprite, BattleshipSprite;
	var EscortCarrierSprite, LightCarrierSprite, FleetCarrierSprite, SuperCarrierSprite, SubmarineSprite;
	var ArmySprites, AirForceSprites, NavySprites;
};
DominionForcesView.prototype = new GenieView();
DominionForcesView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.CallingViewId = VIEW.CURRENT.ASSETS;
	this.State = this.Specs.STATE.OVERALL;
	this.SetSprites();
};
DominionForcesView.prototype.SetImages = function() {

	this.DigitImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
};
DominionForcesView.prototype.SetControls = function() {

	this.CloseButton = this.SetTextButton(this.Specs.BUTTON.CLOSE, RaisedCornerImages, this.TextWriter);
	this.CompareButton = this.SetTextButton(this.Specs.BUTTON.COMPARE, RaisedCornerImages, this.TextWriter);
	this.ReturnButton = this.SetTextButton(this.Specs.BUTTON.RETURN, RaisedCornerImages, this.TextWriter);
};
DominionForcesView.prototype.SetSprites = function() {

	this.ArmySprites = new Array();
	this.AirForceSprites = new Array();
	this.NavySprites = new Array();

	this.SetTrooperSprites();
	this.SetLightCombatantSprites();
	this.SetMediumCombatantSprites();
	this.SetHeavyCombatantSprites();
	this.SetDefenceCombatantSprites();
	this.SetJetSprites();
	this.SetShipSprites();
	this.SetCarrierSprites();
};
DominionForcesView.prototype.ShowControls = function() {  //UNLOGGED

	switch (this.State) {
		case this.Specs.STATE.OVERALL:
			this.CompareButton.Show();
			this.CloseButton.Show();
			break;
		case this.Specs.STATE.COMBATANTS:
		case this.Specs.STATE.VEHICLES:
		case this.Specs.STATE.JETS:
		case this.Specs.STATE.VESSELS:
			this.ReturnButton.Show();
			this.CloseButton.Show();
			break;
	}
};
DominionForcesView.prototype.SetNation = function(nation) {

	this.Nation = nation;
};
DominionForcesView.prototype.Update = function() {  //UNLOGGED - will add controls for more pages

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.CloseButton.CheckClicked())
		this.Close(this.OpenAssetsView.bind(this), 100);

	if (this.CompareButton.CheckClicked()) {
		this.State = this.Specs.STATE.COMBATANTS;
		this.CompareButton.DeActivate();
		this.ColourScape();
		this.Draw();
		this.ShowControls();
	}

	if (this.ReturnButton.CheckClicked()) {
		this.State = this.Specs.STATE.COMBATANTS;
		this.ReturnButton.DeActivate();
		this.ColourScape();
		this.Draw();
		this.ShowControls();
	}
};
DominionForcesView.prototype.Draw = function() {  //UNLOGGED

	//-two tabs (army-airforce/navy-fleets); possibly also submarines in navy tab
	//-army units in first column (15 in all), with unit names (so may need small font) and quantity
	//-jets in second column, fighters in a third column

	switch (this.State) {
		case this.Specs.STATE.OVERALL:
			this.DisplayArmySprites();
			this.DisplayAirForceSprites();
			this.DisplayNavySprites();
			this.DisplayFleetSprites();
			break;
		case this.Specs.STATE.COMBATANTS:
			this.DisplayCombatantSprites();
			break;
		case this.Specs.STATE.VEHICLES:
			this.DisplayVehicleSprites();
			break;
		case this.Specs.STATE.JETS:
			this.DisplayJetSprites();
			break;
		case this.Specs.STATE.VESSELS:
			this.DisplayVesselSprites();
			break;
	}
};
DominionForcesView.prototype.OpenAssetsView = function() {

	AssetsView.Open();
	AssetsView.Update();
};
