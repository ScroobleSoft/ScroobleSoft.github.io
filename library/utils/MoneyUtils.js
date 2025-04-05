
//-----------------------------------------------
//---------- MONEY UTILITIES --------------------
var MoneyUtilities = function() {
	var Val, Num;
	var Mask;

	var i, nBits;
};
MoneyUtilities.prototype = {
	Set() {
	},
	GetCommaFormat(val) {  //NOTE: expecting an integer
		var i;
		var nDgts;
		var strng;
		var sgmnts;

		//Set up string composition
		if (val<1000)
			return (val);
		else {
			nDgts = Math.ceil(Math.log10(val));
			if (val % 1000==0)
				++nDgts;
		}

		//Compose the string
		strng = val % 1000;
		sgmnts = Math.floor(nDgts/3);
		for (i=0;i<sgmnts;++i) {
			val = Math.floor(val/1000);
			strng += "," + val;
		}

		return (strng);
	}
};

var MoneyUtils = new MoneyUtilities();
MoneyUtils.Set();
