
FootballGridder.prototype.SetImproverValue = function() {

	switch (this.Type) {
		case GRIDDER.TYPE.NORMAL:
		case GRIDDER.TYPE.INJURED:
		case GRIDDER.TYPE.SPECIAL:
		case GRIDDER.TYPE.VERSATILE:
			if (this.Experience==GRIDDER.YEARS.ROOKIE)
				this.Value = this.Quality - this.Potential;
			else {
				this.Value = this.Quality;
				for (i=this.Experience;i<GRIDDER.YEARS.IMPROVER;++i) 
					this.Value -= this.Potential/Math.pow(2,(i-this.Experience)+1);
				this.Value = Math.round(this.Value);
			}
			break;
		case GRIDDER.TYPE.DIVISIONAL:
			this.Value = this.Quality;
			this.Value -= (GRIDDER.DIVISIONAL.PROBABILITY[0]/GRIDDER.DIVISIONAL.PROBABILITY[1]) * ((GRIDDER.YEARS.IMPROVER-this.Experience)*SEASON.GAMES);
			if (League.GamesPlayed>SEASON.STATE.CAMP) {
				if (League.GamesPlayed>0)
					this.Value += (GRIDDER.DIVISIONAL.PROBABILITY[0]/GRIDDER.DIVISIONAL.PROBABILITY[1]) * (League.GamesPlayed+4);
				else
					this.Value += (GRIDDER.DIVISIONAL.PROBABILITY[0]/GRIDDER.DIVISIONAL.PROBABILITY[1]) * 4;
			}
			break;
		case GRIDDER.TYPE.SPARKER:
		case GRIDDER.TYPE.VOLATILE:
			this.Value = this.Quality;
			break;
		case GRIDDER.TYPE.TEMPERAMENTAL:
			this.Value = this.Quality - (this.Potential*(GRIDDER.YEARS.IMPROVER-this.Experience));
			if (League.GamesPlayed>SEASON.STATE.CAMP)
				this.Value -= this.Potential;
			break;
		case GRIDDER.TYPE.DIMENSIONAL:
			this.Value = Math.round(0.75*this.Quality);
			break;
	}

	if (this.Value<0)
		this.Value = 0;
	else
		this.Value = Math.round(this.Value);
};
FootballGridder.prototype.SetDeclinerValue = function() {
	var ptntl;

	if (this.Experience==(GRIDDER.YEARS.CAREER-1))
		this.Value = this.Quality;
	else {
		if (this.Potential)
			ptntl = this.Potential * Math.pow(2, 11-this.Experience);
		else
			ptntl = -0.5 * Math.pow(2, 11-this.Experience);
		this.Value = Math.round(this.Quality-ptntl);
	}
};
FootballGridder.prototype.GetTradeValue = function() {  //NOTE: only gives value in terms of pick

		if (this.Experience>7 && this.Quality<9) {		//Decliners
	 if (this.Potential==0)
		 return (this.Quality+(this.Experience-4)+1);
	 else
		 return (this.Quality+(this.Experience-4)-(2*this.Potential));
		} else if (this.Experience>3) {	//Veterans
	 if (this.Quality>11)					//players E+ or worse have no trade value
		 return (-1);
	 else if (this.Quality>8)				//players D+ to D- have their value fully depreciated
		 return (this.Quality+3+(this.Experience-4));
	 else
		 return (this.Quality+(this.Experience-4));
		} else if (this.Experience<=3) {				//Improvers
	 if (this.Value>11) {
		 if ((this.Quality-((4-this.Experience)*this.Potential))<9)		//TODO: adjust if post-camp
			 return (18);
		 else
			 return (-1);
	 } else if (this.Value>8)
		 return (this.Value+3);
	 else if (this.Value<0)
		 return (0);
	 else
		 return (this.Value);
		} else
	 return (-1);
};
FootballGridder.prototype.GetProjectedValue = function() {  //NOTE: applies only to Improvers - value of Decliners is not hidden; call after training camp
		var i;
		var val;
		var ptntl;

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
