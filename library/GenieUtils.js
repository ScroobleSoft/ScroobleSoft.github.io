
//-----------------------------------------------
//---------- GENIE UTILITIES --------------------
var GeneralGenieUtilities = function() {		//TODO: 'General' will be removed once old Utilities have been phased out
/*
	//FUTURE: if getting cos and sin is slow, can keep a table of values of principle or all 360 angles
	var SinHalf45, CosHalf45;

	var X, Y;
	var Rectangle;

*/
	var AnimationFrameHandle;
	var Ticks, FunctionIndex;		//used for delay
	var i, num;
};
GeneralGenieUtilities.prototype = {
	Set() {
	},
	CreateArray(size, type) {  //TODO: move to ArrayUtils
		var i, j;
		var array;
		var element;

		array = new Array(size);
		for (i=0;i<size;++i) {
	 if (type) {
		element = new type();
		array[i] = element;
	 } else
		array[i] = 0;
		}
		return (array);
	},
	SwapElements(array, eIndx1, eIndx2) {  //NOTE: method for work on arrays that are not GenieArray . . . TODO: move to ArrayUtils
		var elmnt;

		elmnt = array[eIndx2];
		array[eIndx2] = array[eIndx1];
		array[eIndx1] = elmnt;
	},
	CheckEven(val) {

		return ((val % 2)==0);
	},
	CheckOdd(val) {

		return (val % 2);
	},
	SwapValues(val1, val2) {
		var val;

		val = val2;
		val2 = val1;
		val1 = val;
	},
	SafeIncrement(val, ovrflw, num) {

		if (num)
			val += num;
		else
			++val;
		if (val>=ovrflw)
		val -= ovrflw;
		return (val);
	},
	CheckVowel(lttr) {
		lttr = lttr.toLowerCase();
		if (Vowels.indexOf(lttr)==-1)
	 return (false);
		else
	 return (true);
	},
	CheckConsonant(lttr) {
		var iCnsnnt;

		lttr = lttr.toLowerCase();
		if (Consonants.indexOf(lttr)==-1)
	 return (false);
		else
	 return (true);
	},
	CheckBit(intgr, iBit) {
		return (intgr & Math.pow(2,iBit));
	},
/* unused, and REDUNDANT
	Delay(objct, ticks, iFnctn) {  //UNTESTED . . . NOTE: naturally, delay is in frames and not ms

		this.Object = object;
		this.Ticks = ticks;
		this.FunctionIndex = iFnctn;
		this.i = 0;
		this.DelayLoop();
	},
	DelayLoop() {

		this.AnimationFrameHandle = requestAnimationFrame(this.DelayLoop.bind(this));

		++this.i;
		if (this.i==this.Ticks) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 Mouse.ClearClicks();						//NOTE: number of Controllers is unknown, so have to be reset elsewhere
	 this.Object.DelayOver(this.FunctionIndex);			//ASSUMPTION: object has ::DelayOver implemented
		}
	},
*/
	GetBits(val, sBits, eBits) {  //s- start, e- end (from left to right)
		var mask;

		mask = Math.pow(2,(sBits-eBits)+1) - 1;
		mask = mask << eBits;
		val &= mask;
		return (val >> eBits);
	},
	NumberToGrade(number) {
		var grade;
		var remainder;

		grade = String.fromCharCode(Math.floor((number/3)+65));
		remainder = number % 3;
		switch (remainder) {
	 case 0 :
		 grade += "+";
		 break;
	 case 2 :
		 grade += "-";
		 break;
		}
		return(grade);
	},
	GradeToNumber(grade) {
		var number;

		//NOTE: UNTESTED!!
		number = 3*(grade.charCodeAt(0)-65);
		if (grade.length==1)
	 ++number;
		else if (grade[1]=="-")
	 number += 2;
		return (number);
	},
	ReverseString(str) {
		var aLttrs;

		aLttrs = Array.from(str);
		aLttrs.reverse();
		str = aLttrs.join("");
		return (str);
	},
	CheckTileValid(c, r, cols, rows) {

		return (c>=0 && c<cols && r>=0 && r<rows);
	},
	GetPaddedAmount(num) {  //adds 00 to amounts < 10, 0 to amounts < 100

		if (num<10)
			return ("00" + num);
		else if (num<100)
			return ("0" + num);
		else
			return (num);
	},
	FormatMoney(num) {  //NOTE: only works for amounts less than 1000 Billion

		if (num<1000)
			return (num);
		else if (num<1000000) {  //NOTE: for 'K' amounts, no decimal values are displayed
			this.num = Math.round(num/1000);
			this.num += "K";
			return (this.num);
		} else if (num<1000000000) {  //NOTE: for 'M' and 'B' amounts, only 2 decimal numerals are displayed (unrounded)
			num = Math.round(num/1000);
			this.num = Math.floor(num/1000);
			this.num += ".";
			this.num += this.GetPaddedAmount(num % 1000);
			this.num = this.num.substring(0, this.num.length-1);
			this.num += "M";
			return (this.num);
		} else {
			num = Math.round(num/1000000);
			this.num = Math.floor(num/1000);
			this.num += ".";
			this.num += this.GetPaddedAmount(num % 1000);
			this.num = this.num.substring(0, this.num.length-1);
			this.num += "B";
			return (this.num);
		}
	},
	CombineSpecs(tSpecs, bSpecs) {  //t- target, b- base

		tSpecs = Object.assign({}, bSpecs, tSpecs);

		return (tSpecs);		//NOTE: this step is only needed when pointers aren't passed
	},
	GetOrdinalNumber(num) {

		//Process numbers ending in '11' to '20'
		if ( (num % 100)>10 && (num % 100)<21 )
			return (num+"th");

		switch (num % 10) {
			case 1:
				return (num+"st");
			case 2:
				return (num+"nd");
			case 3:
				return (num+"rd");
			default:
				return (num+"th");
		}
	}
};

var Utils = new GeneralGenieUtilities();
Utils.Set();
