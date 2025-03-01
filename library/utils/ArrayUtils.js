
//-----------------------------------------------
//---------- ARRAY UTILITIES --------------------
var ArrayUtilities = function() {
	var i, val;
};
ArrayUtilities.prototype = {
	Set() {
	},
	Create(size, type) {
		var i, j;
		var array;
		var elmnt;
		var aArray;	//a- arguments

		array = new Array(size);
		for (i=0;i<size;++i) {
			if (type) {
				elmnt = new type();
				array[i] = elmnt;
				if (arguments.length>2) {
					aArray = new Array(arguments.length-2);
					for (j=2;j<arguments.length;++j)
						aArray[j-2] = arguments[j];
					elmnt.Set.apply(elmnt, aArray);
				}
			} else
				array[i] = 0;
		}

		return (array);
	},
	Create2D(rows, columns, type) {
		var r, c;
		var column, array;
		var elmnt;

		array = new Array(rows);
		for (r=0;r<rows;++r) {
			column = new Array(columns);
			for (c=0;c<columns;++c) {
				if (type) {
					elmnt = new type();
					column[c] = elmnt;
				} else
					column[c] = 0;
			}
			array[r] = column;
		}

		return (array);
	},
	Clear2D(a2D, val) {
		var c, r;

		if (!val)
			val = 0;

		for (c=0;c<a2D.length;++c)
			for (r=0;r<a2D[c].length;++r)
				a2D[c][r] = val;
	},
	Index(arry) {

		for (this.i=0;this.i<arry.length;++this.i)
			arry[this.i] = this.i;
	},
	Remove(arry, eIndx) {

		arry.splice(eIndx, 1);
	},
	Extract(arry, eIndx) {

		return (arry.splice(eIndx, 1)[0]);
	},
	InsertAtFront(arry, elmnt) {

		arry.unshift(elmnt);
	},
	GetSum(arry) {
		var i;
		var sum;

		sum = 0;
		for (i=0;i<arry.length;++i)
			sum += arry[i];

		return (sum);
	},
	GetAverage(arry) {

		return (this.GetSum(arry)/arry.length);
	},
	GetMaxValue(arry) {

		this.val = arry[0];
		for (this.i=1;this.i<arry.length;++this.i)
			this.val = Math.max(this.val, arry[this.i]);

		return (this.val);
	},
	GetKeyMaxValue(arry, iKey) {

		this.val = arry[0][iKey];
		for (this.i=1;this.i<arry.length;++this.i)
			this.val = Math.max(this.val, arry[this.i][iKey]);

		return (this.val);
	},
	GetColumn(arry, nCol) {
		var i;
		var aCol;

		aCol = new Array(arry.length);
		for (i=0;i<aCol.length;++i)
			aCol[i] = arry[i][nCol];

		return (aCol);
	},
	Index(arry) {
		var i;

		for (i=0;i<arry.length;++i)
			arry[i] = i;
	},
	Rotate(arry) {  //UNTESTED

		this.InsertAtFront(arry, arry.pop());
	},
	SwapElements(aElmnts, iElmnt1, iElmnt2) {  //TODO: remove from GenieUtils

		this.val = aElmnts[iElmnt2];
		aElmnts[iElmnt2] = aElmnts[iElmnt1];
		aElmnts[iElmnt1] = this.val;
	},
	GetSwappedArray(aElmnts, iElmnt1, iElmnt2) {
		var arry;

		//Create duplicate array
		arry = new Array(aElmnts.length);
		for (this.i=0;this.i<arry.length;++this.i)
			arry[this.i] = aElmnts[this.i];

		this.SwapElements(arry, iElmnt1, iElmnt2);

		return (arry);
	},
	CreateDuplicate(arry) {  //UNLOGGED
		var aElmnts;

		aElmnts = new Array(arry.length);
		for (this.i=0;this.i<arry.length;++this.i)
			aElmnts[this.i] = arry[this.i];

		return (aElmnts);
	}
};

var ArrayUtils = new ArrayUtilities();
ArrayUtils.Set();
