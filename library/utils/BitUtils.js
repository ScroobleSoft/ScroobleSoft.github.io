
//-----------------------------------------------------
//---------- BIT-PACKING UTILITIES --------------------
var BitPackingUtilities = function() {
	var Val, Num;
	var Mask;

	var i, nBits;
};
BitPackingUtilities.prototype = {
	Set() {
	},
	GetBits(val, sBits, eBits) {  //s- start, e- end (from left to right)

		this.Mask = Math.pow(2,(sBits-eBits)+1) - 1;
		this.Mask = this.Mask << eBits;
		val &= this.Mask;
		val = val >> eBits;

		return (val);
	},
	GetMaskedBits(val, mask) {

		val &= mask;
		if (!val)
			return (0);
		else {
			while (BitUtils.CheckBit(val,0)==0)
				val = val >> 1;
			return (val);
		}
	},
	AddAtBits(val, num, eBits) {

		num *= Math.pow(2,eBits);
		val = val | num;

		return (val);
	},
	AddBit(val, iBit) {

		val = val | Math.pow(2, iBit);
		return (val);
	},
	RemoveBit(val, iBit) {

		if (val & Math.pow(2, iBit))
			val -= Math.pow(2, iBit);

		return (val);
	},
	BlankBits(val, sBits, eBits) {

		for (this.i=eBits;this.i<=sBits;++this.i)
			if (val & Math.pow(2,this.i))
				val -= Math.pow(2,this.i);

		return (val);
	},
	CheckBit(val, nBit) {

		return (val & Math.pow(2,nBit));
	},
	CheckBitsEmpty(val, sBits, eBits) {

		return (this.GetBits(val, sBits, eBits)==0);
	},
	IncrementBits(val, sBits, eBits) {  //NOTE: also does an overflow check

		this.Val = val;
		this.Num = this.GetBits(val, sBits, eBits);
		++this.Num;
		if (this.Num<Math.pow(2,sBits-eBits)) {	//check
	 val = this.BlankBits(this.Val, sBits, eBits);
	 this.Val = this.AddAtBits(val, this.Num, eBits);
		}

		return (this.Val);		//NOTE: returns value unchanged on overflow
	},
	DecrementBits(val, sBits, eBits) {  //NOTE: does an 'underflow' check

		this.Val = val;
		this.Num = this.GetBits(val, sBits, eBits);
		--this.Num;
		if (this.Num>=0) {
	 val = this.BlankBits(this.Val, sBits, eBits);
	 this.Val = this.AddAtBits(val, this.Num, eBits);
		}

		return (this.Val);		//NOTE: returns value unchanged on underflow
	},
	GetBinaryString(val) {

		return (val.toString(2));
	},
	GetHexString(val) {

		return (val.toString(16));
	}
};

var BitUtils = new BitPackingUtilities();
BitUtils.Set();
