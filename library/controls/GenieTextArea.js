
//-----------------------------------------------
//---------- GENIE TEXT AREA --------------------
var GenieTextArea = function() {
	var Id;
	var Specs;
	var Contents;
};
GenieTextArea.prototype = {
	Set(id, specs) {
		this.Id = id;
		this.Specs = specs;
	},
	CheckEmpty() {

		this.Read();
		if (this.Contents=="" || this.Contents[0]==" " || this.Contents[0]=="\n")  //ISSUE: could cause an exception
			return (true);
		else
			return (false);
	},
	Read() {

		this.Contents = document.getElementById(this.Id).value;
	},
	Write(str) {

		if (str)
			document.getElementById(this.Id).value = str;
		else
			document.getElementById(this.Id).value = this.Contents;
	},
	ClearContent() {

		this.Contents = "";
		document.getElementById(this.Id).value = this.Contents;
	},
	AddContent(str) {

		if (this.Contents)
			this.Contents += ("\n" + str);
		else
			this.Contents = str;
		document.getElementById(this.Id).value = this.Contents;
	},
	LoadArray(dArray) {  //d- data

		var r, c;
		var cIndex, sIndex, eIndex;  //c- character, s- start, e- end

		this.Read();
		cIndex = 0;
		for (r=0;r<dArray.length;++r) {  //one line at a time
/*
	 //TODO: check here if have run out of lines to read
	 if (this.Contents[eIndex]!="\n")
*/
			sIndex = cIndex;
			for (c=0;c<dArray[r].length-1;++c) {  //one entry on each line at a time
				eIndex = sIndex;
				while (this.Contents[eIndex]!=" ")
					++eIndex;
				dArray[r][c] = Utilities.StringOrInteger(this.Contents.substring(sIndex, eIndex));
				sIndex = eIndex + 1;
			}
			eIndex = sIndex;
			while (this.Contents[eIndex]!="\n") {
				++eIndex;
				if (eIndex==this.Contents.length)
					break;
			}
			dArray[r][c] = Utilities.StringOrInteger(this.Contents.substring(sIndex, eIndex));
			cIndex = eIndex + 1;
		}
	},
	DumpArray(dArray) {  //d- data
		var r, c;
		var str;

		str = "";
		for (r=0;r<dArray.length;++r) {
			str += dArray[r][0];
			for (c=1;c<dArray[r].length;++c)
				str += (" " + dArray[r][c]);
			str += "\n";
		}
		this.Write(str);
	},
	LoadArrays() {
		var i;
		var r, c;
		var iChar, iStart, iEnd;  //c- character, s- start, e- end

		this.Read();
		cIndex = 0;
		for (i=0;i<arguments.length;++i)
	 for (r=0;r<arguments[i].length;++r) {
		 sIndex = cIndex;
		 for (c=0;c<arguments[i][r].length-1;++c) {  //one entry on each line at a time
			 eIndex = sIndex;
			 while (this.Contents[eIndex]!=" ")
		  ++eIndex;
			 arguments[i][r][c] = Utilities.StringOrInteger(this.Contents.substring(sIndex, eIndex));
			 sIndex = eIndex + 1;
		 }
		 eIndex = sIndex;
		 while (this.Contents[eIndex]!="\n") {
			 ++eIndex;
			 if (eIndex==this.Contents.length)
				 break;
		 }
		 arguments[i][r][c] = Utilities.StringOrInteger(this.Contents.substring(sIndex, eIndex));
		 cIndex = eIndex + 1;
	 }
	},
	DumpArrays() {
		var i;
		var r, c;
		var str;

		str = "";
		for (i=0;i<arguments.length;++i)
			for (r=0;r<arguments[i].length;++r) {
				str += arguments[i][r][0];
				for (c=1;c<arguments[i][r].length;++c)
					str += (" " + arguments[i][r][c]);
				str += "\n";
			}

		this.Write(str);
	}
};
