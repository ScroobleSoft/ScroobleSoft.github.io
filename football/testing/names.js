
FootballTesting.prototype.SetDuplicateNameTest = function() {

	this.NameIndex = 0;

   this.DisplayNameText();
};
FootballTesting.prototype.DisplayNameText = function() {

   this.InfoBox.fillStyle = GREY.LIGHT;
   this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

   this.TextWriter.SetContext(this.InfoBox);

   this.TextWriter.Write("Every single name is checked", 5, 20);
   this.TextWriter.Write("against every name on all", 5, 35);
   this.TextWriter.Write("lists. All names should be", 5, 50);
   this.TextWriter.Write("unique.", 5, 65);

   this.TextWriter.ResetContext();
};
FootballTesting.prototype.PlayDuplicateNameTest = function() {

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlayDuplicateNameTest.bind(this));

   this.DisplayNamesResult();
};
FootballTesting.prototype.DisplayNamesResult = function() {
   var i, j, k, l;

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	for (i=0;i<NameLists.length;++i)
		for (j=0;j<NameLists[i].length;++j) {
			this.NameDuplicates = 0;
			for (k=0;k<NameLists.length;++k)
				for (l=0;l<NameLists[k].length;++l)
					if (NameLists[i][j]==NameLists[k][l])
						++this.NameDuplicates;
			if (this.NameDuplicates>1) {
				this.TextWriter.Write(NameLists[i][j] + " " + (this.NameDuplicates-1), 5, 15*(this.NameIndex+1));
				++this.NameIndex;
			}
		}

	this.TextWriter.Write("End of scan", 5, 15*(this.NameIndex+2));
};
