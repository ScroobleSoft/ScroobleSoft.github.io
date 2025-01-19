
//------------------------------------------------
//---------- FOOTBALL GRIDDER --------------------
var FootballGridder = function() {
	var Randomizer;
	var Team;

	var Type;
	var Position, SubPosition;
	var Name;
	var Appearance;				//bit-packed
	var Experience;
	var Quality;
	var Potential;					//can be -ve for Decliners
	var Target;						//maximum grade to which gridder can improve
	var Drafted;					//0 if UDFA, otherwise pick number from 1 to 224 (-1 if unknown)
	var History1, History2;		//bit-packed, split into 2 variables since not all machines are 64-bit
	var Injury;						//0 if none, otherwise bit-packed to indicate games out
	var Stat1, Stat2;
	var Status;						//TODO: unused field, will be used for book-keeping, such as for Versatiles

	var Value;
	var Salary;						//set rather than computed since depends on draft position rather than quality
/*
	 to begin with could store basic stats for each player (2 really):
	 QB: TD-INT	RB: YDs-CTCHs	WR: CTCHs-TDs	TE: CTCHs-TDs	OL: PSBLKs-RNBLKs
	 DE: SK-TKL	DT: TKL-SK	LB: TKLs-SKs	S:  TKLs-INTs	CB: INTs-PSDFNSD
*/
};
FootballGridder.prototype = {
	Set(rGenerator, team) {
		this.Randomizer = rGenerator;
		this.Team = team;
		this.Name = new GenieName();
		this.Type = GRIDDER.TYPE.NORMAL;
		this.Drafted = -1;
		this.History1 = 0;
		this.History2 = 0;
		this.Injury = 0;
		this.Salary = -1;			//TEMP
		this.Stat1 = 0;
		this.Stat2 = 0;
	},
	SetTeam(team) {

		this.Team = team;
	},
	Generate(pos) {

		this.GeneratePosition();
		this.GenerateName();
		this.GenerateAppearance();
		this.Experience = 0;		//NOTE: this is default - can be over-written elsewhere
	},
	GeneratePosition() {  //NOTE: must be called after .Type is set, or else will fail for Versatiles

		if (this.Type==GRIDDER.TYPE.VERSATILE)
			this.SetVersatile();
		else
			this.SubPosition = this.Randomizer.GetIndex(SubPositionTypes[this.Position]);
	},
	GenerateName() {
		var indx;

		indx = this.Randomizer.GetIndex(FirstNames.length);
		this.Name.First = FirstNames[indx];
		indx = this.Randomizer.GetIndex(LastNames[this.Position].length);
		this.Name.Last = LastNames[this.Position][indx];
	},
	GenerateAppearance() {  //bit-packed format will be hhhssseee, h- hair, s- skin, e- eye

		//LOGGED - very basic right now, just hair-eye-skin colour . . . some skin-hair combos will have to be avoided

		this.Appearance  =	 this.Randomizer.GetIndex(8);		//eye
		this.Appearance +=  8*this.Randomizer.GetIndex(8);		//skin
		this.Appearance += 64*this.Randomizer.GetIndex(8);		//hair
	},
	SetValue() {  //NOTE: not called before first training camp
		var i;

		if (this.Experience<GRIDDER.YEARS.IMPROVER)
			this.SetImproverValue();
		else if (this.Experience<GRIDDER.YEARS.DECLINER)
			this.Value = this.Quality;
		else
			this.SetDeclinerValue();
	},
	SetVersatile() {

		//UNLOGGED - still have to see what to do with this

	},
	SetSalary() {
		//TODO: plenty left here to implement - in fact should be ::DetermineSalary
		this.Salary = Math.round(23000/(20+this.Drafted));		//number is in K's
	},
	SwitchPosition() {
		var num;
		var pos;
		var info;

		num = this.Randomizer.GetInRange(0,1);
		if (this.Team.Index==PlayerTeam.Index)
			pos = this.Position;
		this.Position = PositionSwitches[this.Position][num];
		//TODO: sub-position
		this.Quality = this.Randomizer.GetInRange(GRADE.Fplus,GRADE.Jminus);
		this.Potential = this.Randomizer.GetInRange(1,15);
		this.Target = GRADE.Cplus;
		if (this.Team.Index==PlayerTeam.Index) {
			info = Positions[pos] + " " + this.Name.GetFullName() + " has switched position to " + Positions[this.Position];
			alert(info);
		}
		this.Status = true;
	},
	SetAlternate() {

		this.Type = this.Randomizer.GetInRange(1, GRIDDER.ALTERNATES);
		switch (this.Type) {
			case GRIDDER.TYPE.DIVISIONAL:
				this.Quality = this.Randomizer.GetInRange(GRADE.Iplus, GRADE.Jminus);
				this.Potential = 1;
				this.Value = this.Quality - 9;
				break;
			case GRIDDER.TYPE.INJURED:
				this.Quality = this.Randomizer.GetInRange(GRADE.Iplus, GRADE.Jminus);
				this.Potential = 15;
				this.Value = this.Quality - 9;
				break;
			case GRIDDER.TYPE.SPARKER:
				this.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Jminus);
				this.Potential = 21;
				this.Value = this.Quality - 6;
				break;
			case GRIDDER.TYPE.SPECIAL:
				this.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Jminus);
				this.Potential = 6;
				this.Value = this.Quality - 6;
				break;
			case GRIDDER.TYPE.TEMPERAMENTAL:
				this.Quality = this.Randomizer.GetInRange(GRADE.Jplus, GRADE.Jminus);
				this.Potential = 6;
				this.Value = this.Quality - 12;
				break;
			case GRIDDER.TYPE.VERSATILE:
				this.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Jminus);
				this.Potential = 6;
				this.Value = this.Quality - 6;
				break;
			case GRIDDER.TYPE.VOLATILE:
				this.Quality = this.Randomizer.GetInRange(GRADE.Fplus, GRADE.Hminus);
				this.Potential = 15;
				this.Value = this.Quality;
				break;
		}
		this.Target = 0;
	},
	GetQuality() {  //NOTE: purely to account for DIMENSIONALs

		if (this.Type==GRIDDER.TYPE.DIMENSIONAL)
			return (Math.round(0.75*this.Quality));
		else
			return (this.Quality);
	},
	Age() {

		++this.Experience;
		if (this.Experience==GRIDDER.YEARS.IMPROVER)
			this.Potential = 0;
	},
	CheckInjured() {
		var bit;

		bit = Math.pow(2,League.GamesPlayed);
		return (this.Injured & bit);
	},
	GetLayoff() {

		//UNLOGGED

	},
	CheckVeteran() {

		if (this.Experience<GRIDDER.YEARS.IMPROVER)
			return (false);

		if (this.Experience<GRIDDER.YEARS.DECLINER)
			return (true);

		return (false);
	},
	CheckImprover() {

		if (this.Experience<GRIDDER.YEARS.IMPROVER)
			return (true);

		return (false);
	}
};
