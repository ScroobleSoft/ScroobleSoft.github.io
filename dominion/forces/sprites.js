
DominionForcesView.prototype.SetTrooperSprites = function() {  //UNLOGGED

	this.LARTSprite = new GenieSprite();
	this.MARTSprite = new GenieSprite();
	this.HARTSprite = new GenieSprite();

	this.LARTSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 572, T: 197, W: 12, H: 19 } );
	this.MARTSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 572, T: 218, W: 12, H: 19 } );
	this.HARTSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 571, T: 239, W: 12, H: 19 } );

	this.ArmySprites.push(this.LARTSprite, this.MARTSprite, this.HARTSprite);
};
DominionForcesView.prototype.SetLightCombatantSprites = function() {  //UNLOGGED

	this.JeepSprite = new GenieSprite();
	this.HowitzerSprite = new GenieSprite();
	this.APCSprite = new GenieSprite();

	this.JeepSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 586, T: 197, W: 24, H: 18 } );
	this.HowitzerSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 586, T: 217, W: 11, H: 12 } );
	this.APCSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 586, T: 231, W: 20, H: 17 } );

	this.ArmySprites.push(this.JeepSprite, this.HowitzerSprite, this.APCSprite);
};
DominionForcesView.prototype.SetMediumCombatantSprites = function() {  //UNLOGGED

	this.AVSprite = new GenieSprite();
	this.ArtillerySprite = new GenieSprite();
	this.IFVSprite = new GenieSprite();

	this.AVSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 613, T: 197, W: 24, H: 18 } );
	this.ArtillerySprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 613, T: 217, W: 24, H: 18 } );
	this.IFVSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 613, T: 237, W: 24, H: 17 } );

	this.ArmySprites.push(this.AVSprite, this.ArtillerySprite, this.IFVSprite);
};
DominionForcesView.prototype.SetHeavyCombatantSprites = function() {  //UNLOGGED

	this.MobileGunSprite = new GenieSprite();
	this.MortarTruckSprite = new GenieSprite();
	this.TankSprite = new GenieSprite();

	this.MobileGunSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 639, T: 197, W: 24, H: 18 } );
	this.MortarTruckSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 639, T: 217, W: 24, H: 16 } );
	this.TankSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 639, T: 235, W: 24, H: 18 } );

	this.ArmySprites.push(this.MobileGunSprite, this.MortarTruckSprite, this.TankSprite);
};
DominionForcesView.prototype.SetDefenceCombatantSprites = function() {  //UNLOGGED

	this.ATWSprite = new GenieSprite();
	this.AAGunSprite = new GenieSprite();
	this.LCGSprite = new GenieSprite();
	this.SSMSprite = new GenieSprite();
	this.SAMSprite = new GenieSprite();

	this.ATWSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 665, T: 197, W: 18, H: 13 } );
	this.AAGunSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 665, T: 212, W: 18, H: 23 } );
	this.LCGSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 665, T: 237, W: 30, H: 18 } );
	this.SSMSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 685, T: 197, W: 26, H: 20 } );
	this.SAMSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 685, T: 217, W: 27, H: 17 } );

	this.ArmySprites.push(this.ATWSprite, this.AAGunSprite, this.LCGSprite, this.SSMSprite, this.SAMSprite);
};
DominionForcesView.prototype.SetJetSprites = function() {  //UNLOGGED

	this.BomberSprite = new GenieSprite();
	this.FighterSprite = new GenieSprite();
	this.InterceptorSprite = new GenieSprite();
	this.InterdictorSprite = new GenieSprite();
	this.ReconSprite = new GenieSprite();
	this.RefuellerSprite = new GenieSprite();
	this.StraferSprite = new GenieSprite();
	this.TransportSprite = new GenieSprite();

	this.BomberSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 715, T: 197, W: 40, H: 26 } );
	this.FighterSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 758, T: 197, W: 42, H: 26 } );
	this.InterceptorSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 802, T: 197, W: 40, H: 26 } );
	this.InterdictorSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 844, T: 197, W: 42, H: 26 } );
	this.ReconSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 714, T: 225, W: 42, H: 26 } );
	this.RefuellerSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 758, T: 225, W: 42, H: 26 } );
	this.StraferSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 802, T: 225, W: 42, H: 26 } );
	this.TransportSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 846, T: 225, W: 42, H: 26 } );

	this.AirForceSprites.push(this.BomberSprite, this.FighterSprite, this.InterceptorSprite, this.InterdictorSprite);
	this.AirForceSprites.push(this.ReconSprite, this.RefuellerSprite, this.StraferSprite, this.TransportSprite);
};
DominionForcesView.prototype.SetShipSprites = function() {  //UNLOGGED

	this.GunBoatSprite = new GenieSprite();
	this.MissileBoatSprite = new GenieSprite();
	this.FrigateSprite = new GenieSprite();
	this.CruiserSprite = new GenieSprite();
	this.DestroyerSprite = new GenieSprite();
	this.BattleshipSprite = new GenieSprite();

	this.GunBoatSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 262, W: 32, H: 16 } );
	this.MissileBoatSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 280, W: 44, H: 16 } );
	this.FrigateSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 298, W: 56, H: 16 } );
	this.CruiserSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 316, W: 68, H: 16 } );
	this.DestroyerSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 334, W: 80, H: 16 } );
	this.BattleshipSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 352, W: 92, H: 16 } );

	this.NavySprites.push(this.GunBoatSprite, this.MissileBoatSprite, this.FrigateSprite, this.CruiserSprite, this.DestroyerSprite, this.BattleshipSprite);
};
DominionForcesView.prototype.SetCarrierSprites = function() {  //UNLOGGED

	this.EscortCarrierSprite = new GenieSprite();
	this.LightCarrierSprite = new GenieSprite();
	this.FleetCarrierSprite = new GenieSprite();
	this.SuperCarrierSprite = new GenieSprite();
	this.SubmarineSprite = new GenieSprite();

	this.EscortCarrierSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 662, T: 319, W: 39, H: 113 } );
	this.LightCarrierSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 703, T: 297, W: 39, H: 135 } );
	this.FleetCarrierSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 744, T: 275, W: 39, H: 157 } );
	this.SuperCarrierSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 785, T: 253, W: 39, H: 179 } );
	this.SubmarineSprite.Set(this.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 568, T: 370, W: 59, H: 12 } );
};
