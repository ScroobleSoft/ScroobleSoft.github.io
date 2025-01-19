
ZFLTesting.prototype.SetNameChange = function() {

   this.NameLeagueIndex = 0;
   this.NamePositionIndex = POSITION.QB;
   this.NamePrefixes = [ "F", "M", "Z", "H", "P", "T", "S", "V", "R", "C", "B", "D", "W" ];
   this.DisplayChangedNames();
   this.DisplayNameText();
};
ZFLTesting.prototype.DisplayNameText = function() {

   this.TextWriter.Write("Only removing the first set of consonants", 5, 40, null, CANVAS.ZOOM);
   this.TextWriter.Write("or vowels, and adding a consonant from a", 5, 55, null, CANVAS.ZOOM);
   this.TextWriter.Write("set of letters, and a vowel.", 5, 70, null, CANVAS.ZOOM);

   this.TextWriter.Write("Click on main screen to cycle through", 5, 90, null, CANVAS.ZOOM);
   this.TextWriter.Write("positions, on Info Box for leagues.", 5, 105, null, CANVAS.ZOOM);
};
ZFLTesting.prototype.PlayNameChange = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayNameChange.bind(this));

   if (Mouse.CheckLeftClicked(CANVAS.PRIME))
      this.CycleNameChange();
   else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
      this.NameLeagueChange();
   else
      Mouse.ClearClicks();
};
ZFLTesting.prototype.CycleNameChange = function() {

   ++this.NamePositionIndex;
   if (this.NamePositionIndex==POSITION.COUNT)
      this.NamePositionIndex = 0;
   this.DisplayChangedNames();
};
ZFLTesting.prototype.NameLeagueChange = function() {

   ++this.NameLeagueIndex;
   if (this.NameLeagueIndex==this.NamePrefixes.length)
      this.NameLeagueIndex = 0;
   this.DisplayChangedNames();
};
ZFLTesting.prototype.DisplayChangedNames = function() {
   var x, y;

   this.Screen.fillStyle = GREY.LIGHT;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   for (i=0;i<240;++i) {
      if (i==LastNames[this.NamePositionIndex].length)
	 return;
      this.ChangedName = this.ChangeName(LastNames[this.NamePositionIndex][i]);
      x = 5 + (100*Math.floor(i/40));
      y = 11 + (15*(i % 40));
      this.TextWriter.Write(this.ChangedName, x, y);
   }
};
ZFLTesting.prototype.ChangeName = function(name) {

   this.NameVowel = Vowels[this.Randomizer.GetIndex(Vowels.length)];
   if (Utils.CheckVowel(name[0])) {			//check if name starts with a vowel
      if (Utils.CheckVowel(name[1]))			//there won't be more than 2 vowels
	 name = this.NamePrefixes[this.NameLeagueIndex] + this.NameVowel + name.substring(2);
      else
	 name = this.NamePrefixes[this.NameLeagueIndex] + this.NameVowel + name.substring(1);
   } else {
      for (this.i=1;this.i<name.length;++this.i)
	 if (Utils.CheckVowel(name[this.i])) 
	    break;
      if (this.i==name.length)			//NOTE: check if there is no vowel - if not, search for 'y'
	 this.i = name.indexOf("y");
      else
	 ++this.i;
      name = this.NamePrefixes[this.NameLeagueIndex] + this.NameVowel + name.substring(this.i);
   }

   return (name);
};
