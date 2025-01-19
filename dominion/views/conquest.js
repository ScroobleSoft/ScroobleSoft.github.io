/*
 *	 WAVES: attacks are computed in 'waves,' especially aerial (so could be salvos for navy and army), a Wave: and Salvo: graphic keeping score
 *	 CONTROLS: 'Attack' button could trigger waves and salvos, 'Withdraw' and 'Surrender' buttons also present
 *	 PHASES: Air-Sea-Land phases (bombers carried over from first successful phase? strafers? this would give a combat advantage)
 *				Sea phase needs to be won to make landing, transport boats may or may not being visible
 */
//------------------------------------------------------
//---------- DOMINION CONQUEST VIEW --------------------  NOTE: need not be derived from DominionExpansionView, which looks REDUNDANT
var DominionConquestView = function() {
	var Province, Phase;
	var AttackingNation, DefendingNation;
	var AttackArray, DefenceArray;				//scalar values (quantities)
	var AttackFighters, DefenceFighters;
	var AttackNumbers, DefenceNumbers;
	var AttackCasualties, DefenceCasualties;
	var AirConquest, SeaConquest, LandConquest, ActivePhase;

	var i, colour;	//scratch variables
};
DominionConquestView.prototype = new GenieView();
DominionConquestView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.AttackArray = new BattleArray();
	this.DefenceArray = new BattleArray();
	this.AttackFighters = ArrayUtils.Create2D(FIGHTER.TYPES, 64);								//TODO: HARD-CODED!
	this.DefenceFighters = ArrayUtils.Create2D(FIGHTER.TYPES, 64);								//TODO: HARD-CODED!
	this.AttackNumbers = 0;
	this.DefenceNumbers = 0;
	this.AttackCasualties = 0;
	this.DefenceCasualties = 0;
	this.Province = 0;
	this.SetPhases();
};
DominionConquestView.prototype.SetPhases = function() {

	this.AirConquest = new DominionAirConquest();
	this.AirConquest.Set(this);
	this.SeaConquest = new DominionAirConquest();
	this.SeaConquest.Set(this);
	this.LandConquest = new DominionAirConquest();
	this.LandConquest.Set(this);
	this.ActivePhase = this.AirConquest;
	this.Phase = this.Specs.PHASE.AIR;
};
DominionConquestView.prototype.SetCombatants = function(aNtn, dNtn) {

	this.AttackingNation = aNtn;
	this.DefendingNation = dNtn;
	this.SetBattleArray(this.AttackArray, this.AttackingNation);
	this.SetBattleArray(this.DefenceArray, this.DefendingNation);
	this.ActivePhase.SetPhase();
	this.SetFighters();		//TEMP
};
DominionConquestView.prototype.SetBattleArray = function(aArms, aNtn) {

	this.SetArmyArray(aArms, aNtn);
	this.SetNavyArray(aArms, aNtn);
	this.SetAirForceArray(aArms, aNtn);
};
DominionConquestView.prototype.SetArmyArray = function(aArms, aNtn) {  //UNLOGGED

	aArms.LARTs 		= Math.round(aNtn.Army.LARTs/aNtn.Cities.length);
	aArms.MARTs 		= Math.round(aNtn.Army.MARTs/aNtn.Cities.length);
	aArms.HARTs 		= Math.round(aNtn.Army.HARTs/aNtn.Cities.length);
	aArms.Jeeps			= Math.round(aNtn.Army.Jeeps/aNtn.Cities.length);
	aArms.Howitzers	= Math.round(aNtn.Army.Howitzers/aNtn.Cities.length);
	aArms.APCs			= Math.round(aNtn.Army.APCs/aNtn.Cities.length);
	aArms.AVs			= Math.round(aNtn.Army.AVs/aNtn.Cities.length);
	aArms.Artilleries	= Math.round(aNtn.Army.Artilleries/aNtn.Cities.length);
	aArms.IFVs			= Math.round(aNtn.Army.IFVs/aNtn.Cities.length);
	aArms.MobileGuns	= Math.round(aNtn.Army.MobileGuns/aNtn.Cities.length);
	aArms.Trucks		= Math.round(aNtn.Army.Trucks/aNtn.Cities.length);
	aArms.Tanks			= Math.round(aNtn.Army.Tanks/aNtn.Cities.length);
	aArms.AAGuns		= Math.round(aNtn.Army.AAGuns/aNtn.Cities.length);
	aArms.ATWs			= Math.round(aNtn.Army.ATWs/aNtn.Cities.length);
	aArms.LCGs			= Math.round(aNtn.Army.LCGs/aNtn.Cities.length);
	aArms.Helicopters	= Math.round(aNtn.Army.Helicopters/aNtn.Cities.length);
};
DominionConquestView.prototype.SetNavyArray = function(aArms, aNtn) {  //UNLOGGED

	aArms.GunBoats		 = Math.round(aNtn.Navy.GunBoats/aNtn.Cities.length);
	aArms.MissileBoats = Math.round(aNtn.Navy.MissileBoats/aNtn.Cities.length);
	aArms.Frigates		 = Math.round(aNtn.Navy.Frigates/aNtn.Cities.length);
	aArms.Cruisers		 = Math.round(aNtn.Navy.Cruisers/aNtn.Cities.length);
	aArms.Destroyers	 = Math.round(aNtn.Navy.Destroyers/aNtn.Cities.length);
	aArms.Battleships	 = Math.round(aNtn.Navy.Battleships/aNtn.Cities.length);
};
DominionConquestView.prototype.SetAirForceArray = function(aArms, aNtn) {  //UNLOGGED

	//Fighters
	aArms.F1s = Math.round(aNtn.AirForce.F1s/aNtn.Cities.length);
	aArms.F2s = Math.round(aNtn.AirForce.F2s/aNtn.Cities.length);
	aArms.F3s = Math.round(aNtn.AirForce.F3s/aNtn.Cities.length);
	aArms.F4s = Math.round(aNtn.AirForce.F4s/aNtn.Cities.length);
	aArms.F5s = Math.round(aNtn.AirForce.F5s/aNtn.Cities.length);
	aArms.F6s = Math.round(aNtn.AirForce.F6s/aNtn.Cities.length);
	aArms.F7s = Math.round(aNtn.AirForce.F7s/aNtn.Cities.length);
	aArms.F8s = Math.round(aNtn.AirForce.F8s/aNtn.Cities.length);
	aArms.F9s = Math.round(aNtn.AirForce.F9s/aNtn.Cities.length);

	//Support
	aArms.Bombers		 = Math.round(aNtn.AirForce.Bombers/aNtn.Cities.length);
	aArms.Interceptors = Math.round(aNtn.AirForce.Interceptors/aNtn.Cities.length);
	aArms.Interdictors = Math.round(aNtn.AirForce.Interdictors/aNtn.Cities.length);
	aArms.Strafers		 = Math.round(aNtn.AirForce.Strafers/aNtn.Cities.length);
};
DominionConquestView.prototype.SetFighters = function() {  //UNLOGGED
	var aNums;

	aNums = [ this.AttackArray.F1s, this.AttackArray.F2s, this.AttackArray.F3s, this.AttackArray.F4s, this.AttackArray.F5s, this.AttackArray.F6s,
				 this.AttackArray.F7s, this.AttackArray.F8s, this.AttackArray.F9s ];
	this.SetFighterSquadron(this.AttackFighters, aNums, ATTACK);
	aNums = [ this.DefenceArray.F1s, this.DefenceArray.F2s, this.DefenceArray.F3s, this.DefenceArray.F4s, this.DefenceArray.F5s, this.DefenceArray.F6s,
				 this.DefenceArray.F7s, this.DefenceArray.F8s, this.DefenceArray.F9s ];
	this.SetFighterSquadron(this.DefenceFighters, aNums);
};
DominionConquestView.prototype.SetFighterSquadron = function(aFghtrs, mtrx, bAttck) {
	var i, j;
	var xGap, yGap;
	var x, y, ofst;
	var nRows, nFghtrs;

	//Determine number of fighter types used
	nRows = 0;
	for (i=0;i<FIGHTER.TYPES;++i)
		if (mtrx[i]!=0)
			++nRows;

	//Calculate and set positions, attach fighters
	yGap = SCREEN.HEIGHT / nRows;
	nRows = 0;
	nFghtrs = 0;
	ofst = 15 + 5;			//(0.4*75)/2, 75px-height of jet
	for (i=0;i<FIGHTER.TYPES;++i) {
		if (mtrx[i]==0)
			continue;
		else {
			y = (0.5+nRows) * yGap;
			xGap = ((SCREEN.WIDTH/2)-(2*ofst)) / mtrx[i];
			if (xGap>ofst)
				xGap = ofst;
			for (j=0;j<mtrx[i];++j) {
				if (bAttck)
					x = ofst + (j*xGap);
				else
					x = (SCREEN.WIDTH-ofst) - (j*xGap);
				if (bAttck)
					aFghtrs[i][j] = LeftFighters[nFghtrs];
				else
					aFghtrs[i][j] = RightFighters[nFghtrs];
				aFghtrs[i][j].SetFighterType(i);
				aFghtrs[i][j].SetPosition( { X: x, Y: y } );
				aFghtrs[i][j].SetScale( { X: 0.4, Y: 0.4 } );		//NOTE: same for mobile and desktop, will look different
				aFghtrs[i][j].SetExtant();
				aFghtrs[i][j].SetVisible();
				aFghtrs[i][j].Shield = i + 4;								//NOTE: shield strength ranges from 4 to 12, 
				if (bAttck) {
					aFghtrs[i][j].SetNation(this.AttackingNation);
					aFghtrs[i][j].SetAngle(90);
					++this.AttackNumbers;
				} else {
					aFghtrs[i][j].SetNation(this.DefendingNation);
					aFghtrs[i][j].SetAngle(270);
					++this.DefenceNumbers;
				}
				++nFghtrs;
			}
			++nRows;
		}
	}
};
DominionConquestView.prototype.Open = function() {  //UNLOGGED - only setting could be for mobile/desktop position settings
	GenieView.prototype.Open.call(this);

	this.Update();
};
DominionConquestView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	GenieView.prototype.Update.call(this);
};
/*
DominionConquestView.prototype.Close = function() {
	GenieView.prototype.Close.call(this);

	//UNLOGGED

};
*/
DominionConquestView.prototype.Draw = function() {  //UNLOGGED

	//Title: Province 0/1
	//-3 buttons: air-sea-land, initially 2nd and 3rd disabled, later others are disabled

	this.GraphicsTool.DrawVerticalLine( { X: SCREEN.WIDTH/2, Y: 0 }, SCREEN.HEIGHT, GREY.DARK, 3);
	this.DisplayFighters();
};
DominionConquestView.prototype.DisplayFighters = function() {
	var i;

	for (i=0;i<this.AirConquest.AttackStart;++i)
		if (LeftFighters[i].CheckExtant())
			LeftFighters[i].Draw();
	for (i=0;i<this.AirConquest.DefenceStart;++i)
		if (RightFighters[i].CheckExtant())
			RightFighters[i].Draw();
};
DominionConquestView.prototype.Reset = function() {  //UNLOGGED

	LeftFighters.forEach(function(fghtrs) {fghtrs.UnsetExtant();fghtrs.UnsetVisible();});
	RighttFighters.forEach(function(fghtrs) {fghtrs.UnsetExtant();fghtrs.UnsetVisible();});
};
DominionConquestView.prototype.UpdateFighters = function() {  //UNLOGGED

	for (this.i=0;this.i<this.AttackNumbers;++this.i)
		if (LeftFighters[this.i].CheckExtant())
			if (this.Randomizer.CheckUnderOdds(1,LeftFighters[this.i].Shield)) {
				LeftFighters[this.i].UnsetExtant();
//				LeftFighters[this.i].Explode();
				++this.AttackCasualties;
			}

	for (this.i=0;this.i<this.DefenceNumbers;++this.i)
		if (RightFighters[this.i].CheckExtant())
			if (this.Randomizer.CheckUnderOdds(1,RightFighters[this.i].Shield)) {
				RightFighters[this.i].UnsetExtant();
//				RightFighters[this.i].Explode();
				++this.DefenceCasualties;
			}

	this.ColourScape();
	this.Draw();

	//Surrender calculation, coin flip if numbers are less than 50% for either side, but not if are within 10% of each other
	if (this.AirConquest.AttackCurrent==0 || this.AirConquest.DefenceCurrent==0) {
		if (this.AirConquest.AttackCurrent)
			alert("Defenders have won");
		if (this.AirConquest.DefenceCurrent)
			alert("Defenders have won");
		return;
	}
	if (this.AirConquest.CheckBattleClose())
		return;
	if ((this.AirConquest.AttackCurrent/this.AirConquest.AttackStarters)<0.5)
		if (this.Randomizer.CheckBoolean())
			alert("Defenders have won");
	if ((this.AirConquest.DefenceCurrent/this.AirConquest.DefenceStarters)<0.5)
		if (this.Randomizer.CheckBoolean())
			alert("Attackers have won");
};
DominionConquestView.prototype.PlayAirPhase = function() {  //UNLOGGED
};
DominionConquestView.prototype.PlaySeaPhase = function() {  //UNLOGGED
};
DominionConquestView.prototype.PlayLandPhase = function() {  //UNLOGGED
};
