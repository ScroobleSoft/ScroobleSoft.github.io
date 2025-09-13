
DominionForcesView.prototype.DisplayArmySprites = function() {
	var i;
	var y;
	var hSprites;
	var aUnits;

	aUnits = [ this.Nation.Army.LARTs, this.Nation.Army.MARTs, this.Nation.Army.HARTs, this.Nation.Army.Jeeps, this.Nation.Army.Howitzers,
				  this.Nation.Army.APCs, this.Nation.Army.AVs, this.Nation.Army.Artilleries, this.Nation.Army.IFVs, this.Nation.Army.MobileGuns,
				  this.Nation.Army.Trucks, this.Nation.Army.Tanks, this.Nation.Army.AAGuns, this.Nation.Army.ATWs, this.Nation.Army.LCGs, 0, 0 ];

	hSprites = 0;
	for (i=0;i<this.ArmySprites.length;++i) {

		//Sprites
		hSprites += this.ArmySprites[i].Specs.H;
		y = hSprites + 5 + (5*i);
		this.ArmySprites[i].Draw(5, y);

		//Digits
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i]/100), 50, y-16);
		this.DigitImages.DrawPatchNumber((Math.floor(aUnits[i]/10) % 10), 60, y-16);
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i] % 10), 70, y-16);
	}
};
DominionForcesView.prototype.DisplayAirForceSprites = function() {
	var i;
	var y;
	var hSprites;
	var aUnits;

	aUnits = [ this.Nation.AirForce.Fighters, this.Nation.AirForce.Bombers, this.Nation.AirForce.Interceptors, this.Nation.AirForce.Interdictors,
				  this.Nation.AirForce.Recons, this.Nation.AirForce.Refuellers, this.Nation.AirForce.Strafers, this.Nation.AirForce.Transports ];

	hSprites = 0;
	for (i=0;i<this.AirForceSprites.length;++i) {

		//Sprites
		hSprites += this.AirForceSprites[i].Specs.H;
		y = hSprites + 5 + (10*i);
		this.AirForceSprites[i].Draw(110, y);

		//Digits
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i]/100), 165, y-19);
		this.DigitImages.DrawPatchNumber((Math.floor(aUnits[i]/10) % 10), 175, y-19);
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i] % 10), 185, y-19);
	}
};
DominionForcesView.prototype.DisplayNavySprites = function() {
	var i;
	var y;
	var hSprites;
	var aUnits;

	aUnits = [ this.Nation.Navy.GunBoats, this.Nation.Navy.MissileBoats, this.Nation.Navy.Frigates,
				  this.Nation.Navy.Cruisers, this.Nation.Navy.Destroyers, this.Nation.Navy.Battleships ];

	hSprites = 0;
	for (i=0;i<this.NavySprites.length;++i) {

		//Sprites
		hSprites += this.NavySprites[i].Specs.H;
		y = hSprites + 5 + (10*i);
		this.NavySprites[i].Draw(230, y);

		//Digits
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i]/100), 360, y-14);
		this.DigitImages.DrawPatchNumber((Math.floor(aUnits[i]/10) % 10), 370, y-14);
		this.DigitImages.DrawPatchNumber(Math.floor(aUnits[i] % 10), 380, y-14);
	}
};
DominionForcesView.prototype.DisplayFleetSprites = function() {
	var nCarriers;

	this.EscortCarrierSprite.Draw(212, 345);
	nCarriers = this.Nation.GetCarriers(SHIP.ESCORtCARRIER);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers/100), 356, 360);
	this.DigitImages.DrawPatchNumber((Math.floor(nCarriers/10) % 10), 366, 360);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers % 10), 376, 360);

	this.LightCarrierSprite.Draw(259, 345);
	nCarriers = this.Nation.GetCarriers(SHIP.LIGHtCARRIER);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers/100), 310, 360);
	this.DigitImages.DrawPatchNumber((Math.floor(nCarriers/10) % 10), 320, 360);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers % 10), 330, 360);

	this.FleetCarrierSprite.Draw(306, 345);
	nCarriers = this.Nation.GetCarriers(SHIP.FLEEtCARRIER);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers/100), 264, 360);
	this.DigitImages.DrawPatchNumber((Math.floor(nCarriers/10) % 10), 274, 360);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers % 10), 284, 360);

	this.SuperCarrierSprite.Draw(353, 345);
	nCarriers = this.Nation.GetCarriers(SHIP.SUPErCARRIER);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers/100), 218, 360);
	this.DigitImages.DrawPatchNumber((Math.floor(nCarriers/10) % 10), 228, 360);
	this.DigitImages.DrawPatchNumber(Math.floor(nCarriers % 10), 238, 360);

	this.SubmarineSprite.Draw(110, 315);
	this.DigitImages.DrawPatchNumber(Math.floor(this.Nation.Navy.Submarines/100), 125, 325);
	this.DigitImages.DrawPatchNumber((Math.floor(this.Nation.Navy.Submarines/10) % 10), 135, 325);
	this.DigitImages.DrawPatchNumber(Math.floor(this.Nation.Navy.Submarines % 10), 145, 325);
};
DominionForcesView.prototype.DisplayCombatantSprites = function() {  //UNLOGGED
};
DominionForcesView.prototype.DisplayVehicleSprites = function() {  //UNLOGGED
};
DominionForcesView.prototype.DisplayJetSprites = function() {  //UNLOGGED
};
DominionForcesView.prototype.DisplayVesselSprites = function() {  //UNLOGGED
};
