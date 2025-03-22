
//----------------------------------------------
//---------- FOOTBALL PLAYER -------------------
var FootballPlayer = function() {
	var Randomizer;
	var Team;										//an index, since lower league/foreign/non-league teams won't actually be fleshed out (latter 2 indicated by -1)
	var Name, BirthWeek, Age, Position;		//basic info
	var Type, Designation;						//characteristics . . . TODO: .Designation and .Origin are inter-changeable
	var Quality, Potential, Variation;
	var Appearance, Attributes;				//bit-packed indices, .Attributes includes Strengths and Weaknesses
	var Status, Morale;							// .Status bit-packing possibilities - morale/last match rating/season form/designation info (games played)
	var Training;
	var Wages, Price;
	var Stats;										//TODO: field just added, can be bit-packed to include appearances-subs-goals-assists
	var History;
	var Selected, Rating;						//.Rating is match rating based on quality and position change
};
FootballPlayer.prototype = {
	Set(rGenerator, team) {
		this.Randomizer = rGenerator;
		this.Team = team;
		this.Name = new GenieName();
		this.Potential = 0
		this.Status = 0;
		this.Morale = 0;
		this.Variation = 0;
		this.Attributes = 0;		//TEMP, maybe REDUNDANT
		this.Training = TRAINING.INTENSITY.LIGHT;
		this.Wages = 0;
		this.Stats = 0;
		this.History = 0;
	},
	SetIdentity() {
		
		this.DetermineGender();
		this.GenerateBirthWeek();
		this.GenerateName();
		this.GenerateAppearance();
	},
	SetCharacteristics(type, dsgntn) {  //NOTE: chance of being NORMAL is 1/2 in both cases . . . ASSUMPTION: called after .Age has been set

		//Type
		if (type)
			this.Type = type;
		else {
			if (this.Randomizer.CheckBoolean())
				this.Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);
		}

		//Designation
		if (dsgntn)
			this.Designation = dsgntn;
		else {
			if (this.Age<=FOOTBALLER.AGE.YOUTH) {
				if (this.Randomizer.CheckUnderOdds(3,4))
					this.Designation = FOOTBALLER.DESIGNATION.YOUTH;
				else
					this.Designation = FOOTBALLER.DESIGNATION.PRODIGY;
			} else {
				if (this.Randomizer.CheckBoolean()) {
					this.Designation = this.Randomizer.GetInRange(1,FOOTBALLER.DESIGNATION.COUNT-1);
					if (this.Designation==FOOTBALLER.DESIGNATION.CHRONIC)
						if (this.Randomizer.CheckBoolean())
							this.Status = BitUtils.AddBit(this.Status, FOOTBALLER.BIT.STRICKEN);
				} else
					this.Designation = FOOTBALLER.DESIGNATION.LEAGUE;
			}
		}
	},
	DetermineGender() {

		if (this.Randomizer.CheckBoolean())
			this.Status += BitUtils.AddBit(this.Status, FOOTBALLER.BIT.GENDER);
	},
	GenerateBirthWeek() {

		this.BirthWeek = this.Randomizer.GetIndex(YEAR.WEEKS);
	},
	GenerateName() {
		var fName, lName;  //f- first, l- last
		var tIndex, pIndex;  //t- team, p- player

		if (Game.Type!=FOOTBALL.TYPE.EPL) {
			if (BitUtils.CheckBit(this.Status, FOOTBALLER.BIT.GENDER))
				fName = FemaleNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.FEMALE])];
			else
				fName = FirstNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.FIRST])];
			switch (this.Designation) {
				case FOOTBALLER.DESIGNATION.LEAGUE:
				case FOOTBALLER.DESIGNATION.LAGGARD:
				case FOOTBALLER.DESIGNATION.YOUTH:
				case FOOTBALLER.DESIGNATION.CHRONIC:
					lName = LastNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.LAST])];
					break;
				case FOOTBALLER.DESIGNATION.OVERSEAS:
					lName = OverseasNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.OVERSEAS])];
					break;
				case FOOTBALLER.DESIGNATION.DOMESTIC:
					lName = DomesticNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.DOMESTIC])];
					break;
				case FOOTBALLER.DESIGNATION.PERIPHERAL:
					lName = PeripheralNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.PERIPHERAL])];
					break;
				case FOOTBALLER.DESIGNATION.SEMiPRO:
					lName = SemiProNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.SEMiPRO])];
					break;
				case FOOTBALLER.DESIGNATION.PRODIGY:
					lName = ProdigyNames[this.Randomizer.GetIndex(NameListSizes[FOOTBALLER.NAME.PRODIGY])];
					break;
			}
		} else {  //TODO: eventually REDUNDANT, since EPL data is used
			tIndex = this.Randomizer.GetIndex(LeaguePlayers.length);	//TODO: LeaguePlayers.length will change to LEAGUE.TEAMS
			fName = LeaguePlayers[tIndex][this.Randomizer.GetIndex(LeaguePlayers[tIndex].length)][0][0];
			tIndex = this.Randomizer.GetIndex(LeaguePlayers.length);
			pIndex = this.Randomizer.GetIndex(LeaguePlayers[tIndex].length);
			lName = LeaguePlayers[tIndex][pIndex][0][LeaguePlayers[tIndex][pIndex][0].length-1];
		//TODO: need a pointer to squad here to check for duplicate names, issue to be resolved by inserting a middle name (using either
		//		existing middle names or using a first name
		}
		this.Name.Set(fName, lName);
	},
	GenerateAppearance() {  //bit-packed format will be meeehhhccc, h- hair, c- complexion, e- eye, m- monolid

		this.Appearance  =	 this.Randomizer.GetInRange(0,7);		//complexion
		this.Appearance +=  8*this.Randomizer.GetInRange(0,7);		//hair
		this.Appearance += 64*this.Randomizer.GetInRange(0,7);		//eye colour
		if (this.Randomizer.CheckUnderOdds(1,5))
			this.Appearance = BitUtils.AddBit(this.Appearance, FOOTBALLER.BIT.MONOLID);;
	},
	GenerateGender() {  //TODO: not called - REDUNDANT?

		if (this.Randomizer.CheckBoolean())
			this.Status = BitUtils.AddBit(this.Status, FOOTBALLER.BIT.FEMALE);
	},
	GeneratePosition() {

		if (this.Randomizer.CheckUnderOdds(SQUAD.SLOTS.G,SQUAD.SIZE))
			this.Position = POSITION.GK;
		else
			this.Position = this.Randomizer.GetInRange(POSITION.RB, POSITION.LW);
	},
	GenerateYouth() {

		//Characteristics
		this.Designation = FOOTBALLER.DESIGNATION.YOUTH;
		if (this.Randomizer.CheckBoolean())
			this.Type = FOOTBALLER.TYPE.NORMAL;
		else
			this.Type = this.Randomizer.GetIndex(FOOTBALLER.TYPE.COUNT);

		this.SetIdentity();
		this.Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.MIN,FOOTBALLER.AGE.YOUTH);
		this.GeneratePosition();
		this.GenerateYouthRating();
		this.Potential = 0;
	},
	GenerateYouthRating() {

		switch (this.Age) {
			case 18:
				this.Quality = this.Randomizer.GetInRange(GRADE.Iplus, GRADE.Jminus);
				break;
			case 19:
				this.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Iminus);
				break;
			case 20:
				this.Quality = this.Randomizer.GetInRange(GRADE.Gplus, GRADE.Hminus);
				break;
			case 21:
				this.Quality = this.Randomizer.GetInRange(GRADE.Fplus, GRADE.Gminus);
				break;
		}
	},
	GetComplexion() {

		return (this.Appearance & 0b000000111);
	},
	GetHairColour() {

		return ((this.Appearance & 0b000111000)/8);
	},
	GetEyeColour() {

		return ((this.Appearance & 0b111000000)/64);
	},
	SetPrice() {  //UNLOGGED

		this.Price = this.GetPrice();
	},
	GetPrice() {

		//UNLOGGED

		//TODO: factoring in morale
		//TODO: factor in games played for prospects
		//NOTE: player will be given the option to sell their own prospects if they so choose

		//Factor in age
		if (this.Age<22)											//HARD-CODED
			return (((24-this.Age)/2)*this.GetWorth());	//HARD-CODED
		else if (this.Age<26)									//HARD-CODED
			return (this.GetWorth());
		else
			return (this.GetWorth(this.Age-25));
	},
	DeterminePrice() {

		//UNLOGGED - appears REDUNDANT

		//Check if Prodigy
		if (this.Designation==FOOTBALLER.DESIGNATION.PRODIGY)
			return (1000000);

		//Calculate price based on Quality, Type, Designation, Age and Potential
		if (this.Age>FOOTBALLER.AGE.EXPERIENCED) {
			tmp = this.GetRating();
			temp = 31 - this.GetRating() - Math.sqrt(101-this.Potential);
			this.Price = Math.round(10*Math.pow(1.25,(31-this.GetRating()-Math.sqrt(101-this.Potential))));
		} else {
			tmp = this.GetRating();
			temp = 31 - this.GetRating() - (this.Age-25);
			this.Price = Math.round(10*Math.pow(1.25,(31-this.GetRating()-(this.Age-25))));
		}
		this.Price *= 1000;

		//Cap price at 10M
		if (this.Price>10000000)
			this.Price = 10000000;
	},
	GetRating() {
		var rtng;

		//UNLOGGED

		rtng = this.Quality;
		rtng += TypeDifferentials[this.Type];
		rtng += this.GetDesignationDifferential();

		return (rtng);
	},
	GetWages() {  //TODO: it should be ::GenerateWage for 22+ players, decided at the time contract is signed

		//UNLOGGED

		//NOTE: for 22+, it's price/4 years, further divided by 50 (weekly)

		if (this.Age>21)		//HARD-CODED
			return (Math.round(this.GetWorth()/(4*50)));
		else
			return (Math.round((this.GetWorth()/(4*50))/((24-this.Age)/2)));
	},
	GetWorth(aDifferential) {  //a- age
		var qlty;

		qlty = this.GetProjectedQuality();
		if (aDifferential)
			return (10000*Math.pow(1.25, (FOOTBALL.GRADE.K-(qlty+aDifferential))));
		else
			return (10000*Math.pow(1.25, (FOOTBALL.GRADE.K-qlty)));
	},
	GetProjectedQuality() {  //REDUNDANT
		var qlty;

		//UNLOGGED

		qlty = this.Quality;

		return (qlty);  //TEMP

		switch (this.Type) {
			case FOOTBALLER.TYPE.BRITTLE:
				qlty += this.GetBrittleDifferential();
				break;
			case FOOTBALLER.TYPE.INSPIRATIONAL:
				qlty += this.GetInspirationalDifferential();
				break;
			case FOOTBALLER.TYPE.OVERSEAS:
				qlty += this.GetOverseasDifferential();
				break;
			case FOOTBALLER.TYPE.SPECIALIST:
				qlty += this.GetSpecialistDifferential();
				break;
//			case FOOTBALLER.TYPE.SPARKER:
//				qlty += this.GetSparkerDifferential();
//				break;
//			case FOOTBALLER.TYPE.TEMPERAMENTAL:
//				qlty += this.GetTemperamentalDifferential();
//				break;
			case FOOTBALLER.TYPE.UNDISCIPLINED:
				qlty += this.GetUndisciplinedDifferential();
				break;
			case FOOTBALLER.TYPE.VERSATILE:
				qlty += this.GetVersatileDifferential();
				break;
			case FOOTBALLER.TYPE.VOLATILE:
				qlty += this.GetVolatileDifferential();
				break;
		}

		switch (this.Designation) {
			case FOOTBALLER.DESIGNATION.LAGGARD:
				qlty += this.GetLaggardDifferential();
				break;
			case FOOTBALLER.DESIGNATION.OVERSEAS:
				qlty += this.GetOverseasDifferential();
				break;
			case FOOTBALLER.DESIGNATION.DOMESTIC:
				qlty += this.GetDomesticDifferential();
				break;
			case FOOTBALLER.DESIGNATION.PERIPHERAL:
				qlty += this.GetPeripheralDifferential();
				break;
			case FOOTBALLER.DESIGNATION.YOUTH:
				qlty += this.GetYouthDifferential();
				break;
			case FOOTBALLER.DESIGNATION.SEMiPRO:
				qlty += this.GetSemiProDifferential();
				break;
			case FOOTBALLER.DESIGNATION.PRODIGY:
				qlty += this.GetProdigyDifferential();
				break;
			case FOOTBALLER.DESIGNATION.CHRONIC:
				qlty += this.GetProdigyDifferential();
				break;
		}
	},
	GetDisplacement(pstn) {  //determine change in rating if position is changed
		var dstnc1, dstnc2;

		if (this.Position==POSITION.GK)
			return (0);

		dstnc1 = Math.abs(PositionZones[this.Position][0][0]-PositionZones[pstn][0][0]) +
					Math.abs(PositionZones[this.Position][0][1]-PositionZones[pstn][0][1]);
		dstnc2 = Math.abs(PositionZones[this.Position][1][0]-PositionZones[pstn][1][0]) + 
					Math.abs(PositionZones[this.Position][1][1]-PositionZones[pstn][1][1]);

		return (Math.min(dstnc1,dstnc2));
	},
	DetermineMatchRating(pstn) {  //TODO: this doesn't factor in designated differentials
		var ofst;

		ofst = 2 * this.GetDisplacement(pstn);
		this.Rating = this.Randomizer.GetIndex(ofst) + this.Quality;
	},
	GetDesignationDifferential() {

		//UNLOGGED

		switch (this.Designation) {
			case FOOTBALLER.DESIGNATION.LAGGARD:
				return (3);
			case FOOTBALLER.DESIGNATION.OVERSEAS:
				if (this.Team==-1)
					return (3);
				else
					return (Math.round(this.Variation/2));
			case FOOTBALLER.DESIGNATION.DOMESTIC:
				if (this.Team<LEAGUE.TEAMS)
					return (0);
				else
					return (3);
			case FOOTBALLER.DESIGNATION.PERIPHERAL:
				if (this.Team<LEAGUE.TEAMS) {
					if (BitUtils.CheckBit(this.Status, FOOTBALLER.AGE.NATURALIZED)) {
						if (BitUtils.CheckBit(this.Status, FOOTBALLER.AGE.MATURED))
							return (0);
						else
							return (-3);
					} else
						return (-6);
				} else
					return (-6);
			case FOOTBALLER.DESIGNATION.YOUTH:
				if (this.Age>FOOTBALLER.AGE.YOUTH)
					return (0);
				else
					return (Math.round(this.Quality/4));
			case FOOTBALLER.DESIGNATION.SEMiPRO:
				if (this.Team<LEAGUE.TEAMS) {
					if (BitUtils.CheckBit(this.Status, FOOTBALLER.AGE.NATURALIZED)) {
						if (BitUtils.CheckBit(this.Status, FOOTBALLER.AGE.MATURED))
							return (0);
						else
							return (-6);
					} else
						return (-6);
				} else
					return (-9);
			case FOOTBALLER.DESIGNATION.CHRONIC:
				return (-6);
			default:
				return (0);
		}
	},
	GetGroup() {

		if (this.Position==POSITION.GK)
			return (SQUAD.CATEGORY.G);
		else if (this.Position<=POSITION.LWB)
			return (SQUAD.CATEGORY.D);
		else if (this.Position<=POSITION.LAM)
			return (SQUAD.CATEGORY.M);
		else
			return (SQUAD.CATEGORY.A);
	},
	SetInjured() {

		this.Status += BitUtils.AddBit(this.Status, FOOTBALLER.BIT.INJURY);
	},
	CheckMale() {

		return (!BitUtils.CheckBit(this.Status, FOOTBALLER.BIT.GENDER));
	},
	CheckMonolidEyes() {

		return (BitUtils.CheckBit(this.Appearance, FOOTBALLER.BIT.MONOLID));
	},
	CheckInjured() {

		return (BitUtils.CheckBit(this.Status, FOOTBALLER.BIT.INJURY));
	},
	CheckStricken() {

		return (BitUtils.CheckBit(this.Status, FOOTBALLER.BIT.STRICKEN));
	},
	Update() {  //TODO: may set a bit indicating if played in League and/or Cup match that week, or could pass in that info plus minutes played

		//UNLOGGED

		switch (this.Type) {
			case FOOTBALLER.TYPE.LEAGUE:
				this.UpdateLeague();
				break;
			case FOOTBALLER.TYPE.LAGGARD:
				this.UpdateLaggard();
				break;
			case FOOTBALLER.TYPE.OVERSEAS:
				this.UpdateOverseas();
				break;
			case FOOTBALLER.TYPE.DOMESTIC:
				this.UpdateDomestic();
				break;
			case FOOTBALLER.TYPE.PERIPHERAL:
				this.UpdatePeripheral();
				break;
			case FOOTBALLER.TYPE.YOUTH:
				this.UpdateYouth();
				break;
			case FOOTBALLER.TYPE.SEMiPRO:
				this.UpdateSemiPro();
				break;
			case FOOTBALLER.TYPE.PRODIGY:
				this.UpdateProdigy();
				break;
			case FOOTBALLER.TYPE.PRODIGY:
				this.UpdateChronic();
				break;
		}
	},
	UpdateAge() {
	},
	UpdateLeague() {  //REDUNDANT, maybe
	},
	UpdateCup() {  //REDUNDANT, maybe
	}
};
