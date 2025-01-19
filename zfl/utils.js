//TODO: not LOGGED for re-design
//--------------------------------------------------
//---------- GRIDIRON UTILITIES --------------------
var GridironUtilities = function() {
	var Randomizer;
	var LeagueIndex;
	var LeagueLetters, LeagueAffixes;

	var i;
};
GridironUtilities.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.LeagueLetters = [ ["",""], ["A","a"], ["B","b"], ["D","d"], ["C","c"], ["M","m"], ["T","t"],
				  ["F","f"], ["S","s"], ["X","x"], ["V","v"], ["O","o"], ["Qu","qu"], ["H","h"] ];
		this.LeagueAffixes = [ ["",""], ["A","a"], ["Ben","sby"], ["D'","ard"], ["Cor","ic"], ["Mc","man"], ["Ten","ston"],
				  ["Fin","off"], ["St.","son"], ["Xy","ix"], ["Ver","ov"], ["O","o"], ["Qu","quer"] , ["Hil","hart"] ];
	},
	ConfigureNomenclature(team) {  //NOTE: SFL names now begin with 'H'
		var i, j;

		for (i=0;i<team.Roster.Gridders.length;++i)
	 for (j=0;j<team.Roster.Gridders[i].length;++j)
		 team.Roster.Gridders[i][j].Name.Last = this.ConfigureName(team.Roster.Gridders[i][j].Name.Last);
		for (i=0;i<team.PracticeSquad.Gridders.length;++i)
	 team.PracticeSquad.Gridders[i].Name.Last = this.ConfigureName(team.PracticeSquad.Gridders[i].Name.Last);
	},
	SetLeague(iLeague) {

		this.LeagueIndex = iLeague;
	},
	ConfigureName(name) {

		if (name.includes(this.LeagueLetters[this.LeagueIndex][0]) || name.includes(this.LeagueLetters[this.LeagueIndex][1]))
	 return (name);

		switch (this.LeagueIndex) {
	 case LEAGUE.AFL:
	 case LEAGUE.USFL:
		 return (this.ChangeVowel(name));
	 case LEAGUE.BFL:
	 case LEAGUE.DFL:
	 case LEAGUE.CFL:
	 case LEAGUE.MFL:
	 case LEAGUE.TFL:
	 case LEAGUE.XFL:
	 case LEAGUE.XSL:
	 case LEAGUE.XXL:
	 case LEAGUE.BCFL:
	 case LEAGUE.QFL:
	 case LEAGUE.SFL:
		 return (this.ChangeConsonant(name));
		}
	},
	ChangeVowel(name) {

		if (Utils.CheckVowel(name[0])) {  //Check if name starts with a vowel
	 name = name.substring(1);
	 name = this.LeagueLetters[this.LeagueIndex][0] + name;
		} else {
	 for (this.i=1;this.i<name.length;++this.i)
		 if (Utils.CheckVowel(name[this.i])) 
			 break;
	 if (this.i==name.length)  //NOTE: check if there is no vowel - if not, search for 'y'
		 this.i = name.indexOf("y");
	 name = name.substring(0,this.i) + this.LeagueLetters[this.LeagueIndex][1] + name.substring(this.i+1);
		}

		return (name);
	},
	ChangeConsonant(name) {

		num = this.Randomizer.GetNumberWithinRange(0,6);
		switch (num) {
	 case 0:
	 case 1:
	 case 2:
	 case 3:
		 if (Utils.CheckConsonant(name[0])) {  //If name starts with a consonant, remove all letters till a vowel is encountered
			 do {
		  name = name.substring(1);
			 } while (Utils.CheckConsonant(name[0]) && name[0]!="y");		//ASSUMPTION: if a name starts with Y, it will have 1 vowel at least
			 name = this.LeagueLetters[this.LeagueIndex][0] + name;
		 } else {
			name = name.toLowerCase();
			name = this.LeagueLetters[this.LeagueIndex][0] + name;
		 }
		 break;
	 case 4:
		 name = this.LeagueAffixes[this.LeagueIndex][0] + name;
		 break;
	 case 5:
	 case 6:
		 name = name + this.LeagueAffixes[this.LeagueIndex][1];
		 break;
/* TODO: these last 2 options yield some strange sounding name, even if they do add variety - possibly re-visit
	 case 7:
	 case 8:
		 name = this.LeagueLetters[this.LeagueIndex][0] + Vowels[this.Randomizer.GetNumberWithinRange(0,4)] + name;
		 break;
	 case 9:
	 case 10:
		 name = name + Vowels[this.Randomizer.GetNumberWithinRange(0,4)] + this.LeagueLetters[this.LeagueIndex][1];
		 break;
*/
		}

		return (name);
	},
	TruncateName(grddr, wdth, cntxt) {
		var lName;		//l- last

		lName = grddr.Name.Last;
		while (cntxt.measureText(lName).width>wdth)
			lName = lName[0] + lName.slice(2);
		lName = lName[0] + "'" + lName.slice(1);

		return (lName);
	},
	CreateGridder(pos) {
		var grddr;

		switch (pos) {
			case POSITION.QB:
				grddr = new Quarterback();
				break;
			case POSITION.RB:
				grddr = new RunningBack();
				break;
			case POSITION.WR:
				grddr = new WideReceiver();
				break;
			case POSITION.TE:
				grddr = new TightEnd();
				break;
			case POSITION.OL:
				grddr = new OffensiveLineman();
				break;
			case POSITION.DE:
				grddr = new DefensiveEnd();
				break;
			case POSITION.DT:
				grddr = new DefensiveTackle();
				break;
			case POSITION.LB:
				grddr = new Linebacker();
				break;
			case POSITION.S:
				grddr = new Safety();
				break;
			case POSITION.CB:
				grddr = new Cornerback();
				break;
		}

		grddr.Set(this.Randomizer);
		grddr.Generate();

		return (grddr);
	},
	AppendTypeSymbol(info, type) {  //UNLOGGED

		switch (type) {
			case GRIDDER.TYPE.DIVISIONAL:
				return ("÷"+info);
				break;
			case GRIDDER.TYPE.INJURED:
				return ("!"+info);
				break;
			case GRIDDER.TYPE.SPARKER:
				return ("*"+info);
				break;
			case GRIDDER.TYPE.SPECIAL:
				return ("$"+info);
				break;
			case GRIDDER.TYPE.TEMPERAMENTAL:
				return ("†"+info);
				break;
			case GRIDDER.TYPE.VERSATILE:
				return ("^"+info);
				break;
			case GRIDDER.TYPE.VOLATILE:
				return ("±"+info);
				break;
			case GRIDDER.TYPE.DIMENSIONAL:
				return ("°"+info);
				break;
		}
	}
};
