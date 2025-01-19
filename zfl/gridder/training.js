
FootballGridder.prototype.Train = function() {

	if (this.CheckVeteran())
		return;						//no change in rating

	if (this.CheckImprover())
		this.TrainImprover();
	else
		this.TrainDecliner();

	this.SetValue();
};
FootballGridder.prototype.TrainImprover = function() {

	if (this.Potential==0)
		return;

	switch (this.Type) {
		case GRIDDER.TYPE.NORMAL:
		case GRIDDER.TYPE.SPECIAL:
			this.TrainNormal();
			break;
		case GRIDDER.TYPE.DIVISIONAL:
			this.TrainDivisional();
			break;
		case GRIDDER.TYPE.INJURED:
			this.TrainInjured();
			break;
		case GRIDDER.TYPE.PROJECT:
			break;
		case GRIDDER.TYPE.SPARKER:
			this.TrainSparker();
			break;
		case GRIDDER.TYPE.TEMPERAMENTAL:
			this.TrainTemperamental();
			break;
		case GRIDDER.TYPE.VERSATILE:
			this.TrainVersatile();
			break;
		case GRIDDER.TYPE.VOLATILE:
			this.TrainVolatile();
			break;
		case GRIDDER.TYPE.DIMENSIONAL:
			this.TrainDimensional();
			break;
	}
};
FootballGridder.prototype.TrainDecliner = function() {

	if (this.Potential==0) {  //process Decliner who hasn't declined yet
		this.Potential = this.Randomizer.GetInRange(0, 1);
		if (this.Potential==1)
			this.Potential = -this.Potential;
	} else
		 this.Potential = -this.Randomizer.GetInRange(-this.Potential, -(2*this.Potential));
	this.Quality -= this.Potential;
};
FootballGridder.prototype.TrainNormal = function() {
	var ptntl;

	ptntl = this.Potential;
	if (this.Experience==GRIDDER.YEARS.ROOKIE) {
		this.Potential = this.Randomizer.GetInRange(1, this.Potential);
		if (this.Potential>(0.75*ptntl))
			this.Status = 3;
		else if (this.Potential>(0.5*ptntl))
			this.Status = 2;
		else if (this.Potential>(0.25*ptntl))
			this.Status = 1;
		else 
			this.Status = 0;
	} else
		if (this.Potential!=0)
			this.Potential = this.Randomizer.GetInRange(1, this.Potential);

	this.Quality -= this.Potential;
	if (this.Quality<GRADE.Aplus) {
		this.Potential += this.Quality;
		this.Quality = GRADE.Aplus;
	}
	if (this.Quality<this.Target) {
		this.Potential = this.Target - this.Quality;
		this.Quality = this.Target;
	}
};
FootballGridder.prototype.TrainDivisional = function() {
	var i;

	if (this.Potential==0)
		return;

	if (League.GamesPlayed<0) {
		for (i=0;i<3;++i)
			if (this.Randomizer.CheckUnderOdds(GRIDDER.DIVISIONAL.PROBABILITY[0],GRIDDER.DIVISIONAL.PROBABILITY[1]))
				--this.Quality;
	} else {
		if (this.Randomizer.CheckUnderOdds(GRIDDER.DIVISIONAL.PROBABILITY[0],GRIDDER.DIVISIONAL.PROBABILITY[1]))
			--this.Quality;
	}
	if (this.Experience==GRIDDER.YEARS.ROOKIE)
		this.Status = 2;

	if (this.Quality<GRADE.Aplus) {
		this.Quality = GRADE.Aplus;
		this.Potential = 0;
	}
};
FootballGridder.prototype.TrainInjured = function() {

	if (this.Potential==0)
		return;

	if (this.Potential==15 && this.Quality>=GRADE.Iplus) {  //check if injury hasn't cleared
		if (this.Randomizer.CheckUnderOdds(1,this.Experience+2)) {	//check if player can overcome injury
			this.Potential = this.Randomizer.GetInRange(1, this.Potential);
			if (this.Experience==GRIDDER.YEARS.ROOKIE) {
				this.Status = 2;
				if (this.Potential>=8)
					++this.Status;
			}
		} else {
			if (this.Experience==GRIDDER.YEARS.ROOKIE)
				this.Status = 0;
			return;
		}
	} else
		this.Potential = this.Randomizer.GetInRange(1, this.Potential);
	this.Quality -= this.Potential;
	if (this.Quality<GRADE.Aplus) {
		this.Potential += this.Quality;
		this.Quality = GRADE.Aplus;
	}
	if (this.Quality<this.Target) {
		this.Potential = this.Target - this.Quality;
		this.Quality = this.Target;
	}
};
FootballGridder.prototype.TrainSparker = function() {

	if (this.Experience==GRIDDER.YEARS.ROOKIE) {
		if (this.Randomizer.CheckUnderOdds(3,4)) {
			this.Potential = 0;
			this.Status = 0;
		} else {
			this.Quality -= this.Potential;
			this.Status = 3;
		}
	}
};
FootballGridder.prototype.TrainTemperamental = function() {

	if (this.Experience==GRIDDER.YEARS.ROOKIE) {
		this.Potential = this.Randomizer.GetInRange(0, this.Potential);
		if (this.Potential>4)
			this.Status = 3;
		else if (this.Potential>2)
			this.Status = 2;
		else if (this.Potential>0)
			this.Status = 1;
		else
			this.Status = 0;
	}
	this.Quality -= this.Potential;
};
FootballGridder.prototype.TrainVersatile = function() {

	if (this.Potential!=0)
		this.Potential = this.Randomizer.GetInRange(1, this.Potential);
	if (this.Experience==GRIDDER.YEARS.ROOKIE) {
			if (this.Potential>5)
				this.Status = 3;
			else if (this.Potential>3)
				this.Status = 2;
			else if (this.Potential>1)
				this.Status = 1;
			else
				this.Status = 0;
	}
	this.Quality -= this.Potential;
	if (this.Quality<GRADE.Cplus) {							//NOTE: Versatiles can not be better than C+
		this.Potential -= GRADE.Cplus - this.Quality;
		this.Quality = GRADE.Cplus;
	}
};
FootballGridder.prototype.TrainVolatile = function() {
	var num;

	if (this.Potential==0)
		return;

	num = Math.abs(this.Potential);
	this.Potential = num - this.Randomizer.GetInRange(0,2*num);
	if (this.Experience==GRIDDER.YEARS.ROOKIE) {
		if (this.Potential>7)
			this.Status = 3;
		else if (this.Potential>0)
			this.Status = 2;
		else if (this.Potential>-7)
			this.Status = 1;
		else
			this.Status = 0;
	}
	this.Quality -= this.Potential;
	if (this.Quality<GRADE.Aplus) {
		this.Potential += this.Quality;
		this.Quality = GRADE.Aplus;
	}
};
FootballGridder.prototype.TrainDimensional = function() {

	this.Potential = this.Randomizer.GetInRange(1, this.Potential);
	if (this.Experience==GRIDDER.YEARS.ROOKIE)
		this.Status = this.Potential;
};
FootballGridder.prototype.GetProjectedValue = function() {  //NOTE: applies only to Improvers - value of Decliners is not hidden; called after training camp
		var i;
		var val;
		var ptntl;

		//LOGGED - TESTED . . . currently unused - REDUNDANT?

		//Check if not Improver
		if (this.Experience>3)
	 return (null);

		//Check if roster ready, or other evaluation result
		if (this.Quality<15)
	 return (0);		//roster ready
		else {
	 val = this.Quality;
	 ptntl = this.Potential;
	 for (i=this.Experience;i<3;++i) {
		 ptntl /= 2;
		 val -= ptntl;
	 }
	 if (val<15)
		 return (1);		//projected to make roster
	 val = this.Quality;
	 for (i=this.Experience;i<3;++i)
		 val -= this.Potential;
	 if (val<15)
		 return (2);		//best case makes roster
	 else
		 return (3)		//not NFL material
		}
};
