
//-----------------------------------------------
//---------- ARRAY UTILITIES --------------------
var ArrayUtilities = function() {
	var i;
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
	}
};

var ArrayUtils = new ArrayUtilities();
ArrayUtils.Set();
