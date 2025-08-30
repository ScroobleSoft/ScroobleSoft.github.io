
//------------------------------------------------
//---------- STRING UTILITIES --------------------
var StringUtilities = function() {

	var i, num, fnt, str;
};
StringUtilities.prototype = {
	Set() {
	},
	CheckDescending(str) {
		
		for (this.i=0;this.i<DescendingLetters.length;++this.i)
			if (str.includes(DescendingLetters[this.i]))
				return (true);

		return (false);
	},
	GetWidth(str, font, context) {	//REDUNDANT

		if (font) {
			this.fnt = context.font;
			context.font = font;
		}

		this.num = context.measureText(str).width;

		if (font)
			context.font = this.fnt;

		return (this.num);
	},
	GetTextWidth(str, font, context) {

		if (font) {
			this.fnt = context.font;
			context.font = font;
		}

		this.num = context.measureText(str).width;

		if (font)
			context.font = this.fnt;

		return (this.num);
	},
	GetTextHeight(font, context) {

		if (font) {
			this.fnt = context.font;
			context.font = font;
		}

		this.str = context.font.split(' ')
		if (this.str.length==2)  //check if plain
			this.num = parseInt(this.str[0].replace('px', ''));			//plain
		else
			this.num = parseInt(this.str[1].replace('px', ''));			//bold

		if (font)
			context.font = this.fnt;

		return (this.num);
	},
	GetLineBreaks(str, font, context, width) {
		var aBrks;
		var iStart, iEnd;

		if (font) {
			this.fnt = context.font;
			context.font = font;
		}

		aBrks = new Array();
		this.num = str.length;
		iStart = 0;
		iEnd = 1;
		for (this.i=1;this.i<this.num;++this.i) {
			if (str[this.i]==" " || str[this.i]==".") {
				if (context.measureText(str.substring(iStart, this.i)).width>width) {
					aBrks.push(iEnd);
					iStart = iEnd + 1;
				} else
					iEnd = this.i;
			}
		}

		if (font)
			context.font = this.fnt;

		return (aBrks);
	},
	GetLetterIndex(lttr) {
		var a;

		a = "a";
		return (lttr.charCodeAt(0)-a.charCodeAt(0));
	},
	GetSubString(str, start, lttrs) {

		if (lttrs)
			return (str.substring(start, start+lttrs));
		else
			return (str.substring(start));
	},
	CapitalizeFirstLetter(str) {

		this.str = str[0].toUpperCase();
		str[0] = this.str;

		return (this.str);
	},
	InitializeFirstName(fName, lName, width, context) {  //contract first name to initial if full name doesn't fit

		if (this.GetTextWidth(fName + " " + lName, null, context)<width)
			return (fName + " " + lName);
		else
			return (fName[0] + " " + lName);
	},
	TruncateLastName(fName, lName, width, mantissa, context) {

		if (this.GetTextWidth(fName + " " + lName, null, context)<width)
			return (fName + " " + lName);
		else {
			this.str = lName.slice(lName.length-mantissa);
			return (fName + " " + this.str);
		}
	},
	TruncateFullName(fName, lName, width, context) {  //UNLOGGED
	},
	Duplicate(str) {

		return (str.repeat(1));
	},
	Compare(str1, str2) {

		for (this.i=0;this.i<str1.length;++this.i)
			if (str1[this.i]!=str2[this.i])
				return (false);

		return (true);
	},
	Reverse(str) {

		this.str = str.split('');
		this.str.reverse();
		str = this.str.join('');

		return (str);
	}
};

var StringUtils = new StringUtilities();
StringUtils.Set();
