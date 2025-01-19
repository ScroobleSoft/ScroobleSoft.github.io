
//--------------------------------------------------
//---------- DOMINION UTILITIES --------------------
var DominionUtilities = function() {
	var Randomizer;

	var info;
};
DominionUtilities.prototype = {
	Set(rGenerator) {

		this.Randomizer = rGenerator;
	},
	GetJetPolygonSides(nation) {

		switch (nation.Type) {
	 case NATION.POWER:
		 if (nation.Index<Math.floor(POWER.COUNT/2))
			 return (4+nation.Index);
		 else if (nation.Index==POWER.TOMCAT)
			 return (VERTICES.OCTAGON);
		 else
			 return (5+nation.Index);
	 case NATION.ALLIED:
		 if (nation.AssociatedIndex<Math.floor(POWER.COUNT/2))
			 return (4+nation.AssociatedIndex);
		 else if (nation.AssociatedIndex==POWER.TOMCAT)
			 return (VERTICES.OCTAGON);
		 else
			 return (5+nation.AssociatedIndex);
	 case NATION.CITySTATE:
		 return (VERTICES.OCTAGON);
		}
	},
	GetPrimaryColour(nation) {

		switch (nation.Type) {
	 case NATION.POWER:
		 return (PowerColours[nation.Index][0]);
	 case NATION.ALLIED:
		 return (nation.PrimaryColour);
	 case NATION.CITySTATE:
		 return (CityStateColours[nation.Index][0]);
		}
	},
	GetSecondaryColour(nation) {

		switch (nation.Type) {
	 case NATION.POWER:
		 return (PowerColours[nation.Index][1]);
	 case NATION.ALLIED:
		 return (nation.SecondaryColour);
	 case NATION.CITySTATE:
		 return (CityStateColours[nation.Index][0]);
		}
	},
	GetTertiaryColour(nation) {

		switch (nation.Type) {
	 case NATION.POWER:
		 return (PowerColours[nation.Index][2]);
	 case NATION.ALLIED:
		 return (PowerColours[nation.index % POWER.COUNT][2]);
	 case NATION.CITySTATE:
		 return (CityStateColours[20]);
		}
	},
	GetBitmapIndex(nation) {

		switch (nation.Type) {
	 case NATION.POWER:
		 return (nation.Index);
	 case NATION.ALLIED:
		 return (nation.AssociatedIndex);
	 case NATION.CITySTATE:
		 return (9);
		}
	},
	GetSecondaryIndex(nation) {	//NOTE: used for image drawing

		switch (nation.Type) {
	 case NATION.POWER:
		 return (nation.Index);
	 case NATION.ALLIED:
		 return (nation.SecondaryIndex);
	 case NATION.CITySTATE:
		 return (9);
		}
	},
	GenerateName() {
		var iName;
		var name;

		iName = this.Randomizer.GetIndex(CapitalConsonants.length);
		name = CapitalConsonants[iName];
		if (name=="Q")
			name += "u";
		else {
			iName = this.Randomizer.GetIndex(Vowels.length);
			name += Vowels[iName];
		}
		iName = this.Randomizer.GetIndex(Consonants.length);
		name += Consonants[iName];
		if (name=="q")
			name += "u";
		else {
			iName = this.Randomizer.GetIndex(Vowels.length);
			name += Vowels[iName];
		}
		iName = this.Randomizer.GetIndex(Consonants.length);
		name += Consonants[iName];

		return (name);
	},
	GetFormattedAmount(num) {  //NOTE: does not go above billion (trillion, quadrillion etc. ignored)

		this.info = num.toString();
		if (num<1000)
			return (this.info);
		else if (num<1000000) {
			this.info = Math.floor(num/1000);
			this.info += ",";
			this.info += Utils.GetPaddedAmount(num % 1000);
			return (this.info);
		} else if (num<1000000000) {
			this.info = Math.floor(num/1000000);
			this.info += ",";
			this.info += Utils.GetPaddedAmount(Math.floor(num/1000) % 1000);
			this.info += "K";
			return (this.info);
		} else if (num<1000000000000) {
			this.info = Math.floor(num/1000000000);
			this.info += ",";
			this.info += Utils.GetPaddedAmount(Math.floor(num/1000000) % 1000);
			this.info += "M";
			return (this.info);
		} else {
			this.info = Math.floor(num/1000000000000);
			this.info += ",";
			this.info += Utils.GetPaddedAmount(Math.floor(num/1000000000) % 1000);
			this.info += "B";
			return (this.info);
		}
	}
};
