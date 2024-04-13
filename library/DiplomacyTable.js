
//-----------------------------------------------------
//---------- GENIE DIPLOMACY TABLE --------------------
var GenieDiplomacyTable = function() {
	var Specs;
	var Matrix;
};
GenieDiplomacyTable.prototype = {  //Specs: { SIDES: -1, LEVELS: -1 }
	Set(specs) {
		this.Specs = specs;
		this.SetTable();
	},
	SetTable() {
		var c, r;

		this.Matrix = ArrayUtils.Create2D(this.Specs.SIDES, this.Specs.SIDES);
		for (c=0;c<this.Specs.SIDES;++c)
			for (r=0;r<this.Specs.SIDES;++r)
				if (c==r)
					this.Matrix[c][r] = 0;
	},
	Update(side1, side2, level) {

		this.Matrix[side1][side2] = level;
	},
	IncreaseHostility(side1, side2) {  //NOTE: top-right half of table entries needn't match bottom-left because 2 sides can have different stances
												  //		 towards each other
		++this.Matrix[side1][side2];
		if (this.Matrix[side1][side2]==this.Specs.LEVELS)
			--this.Matrix[side1][side2];
	},
	DecreaseHostility(side1, side2) { 

		--this.Matrix[side1][side2];
		if (this.Matrix[side1][side2]<0)
			this.Matrix[side1][side2] = 0;
	}
};
