
DominionChoiceInfoView.prototype.OpenIntrigueScreen = function() {  //UNLOGGED

	this.Partner = Intrigue.GetAllied(this.Nation);

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(this.Specs.TEXT.COLOUR);

	this.DisplayIntrigueHeader();
	this.DisplayIntrigueSuggestion();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();

	this.AttachIntrigueProsCons();

	// ** with 9 systems of government (for non city-states), there can be 81 different types of intrigue, but for now will just sponsor rival
	// ** actually, impose own form of government
};
DominionChoiceInfoView.prototype.DisplayIntrigueHeader = function() {  //UNLOGGED

	//Title
	this.TextWriter.Write("Intrigue:", 5, 17, { FONT: "bold 18px Arial", STYLE: FONT.STYLE.UNDERLINED } );

	//Allied state info
	this.TextWriter.Write("Allied State:", 5, 40);
	this.TextWriter.Write(AlliedNames[this.Partner.NameIndex], 100, 40);
	this.TextWriter.Write("Affiliaion:", 5, 57);
	this.TextWriter.Write(PowerNames[this.Partner.AssociatedIndex], 100, 57);
	this.TextWriter.Write("Government:", 5, 74);
	this.TextWriter.Write(Government[this.Partner.Government.Type], 100, 74);
};
DominionChoiceInfoView.prototype.DisplayIntrigueSuggestion = function() {  //UNLOGGED
	var info;

	if (this.Partner.Rival.GetGender()==GENDER.MALE)
		info = ExternalRival[0][this.Partner.Government.Type] + " ";
	else
		info = ExternalRival[1][this.Partner.Government.Type] + " ";
	info += this.Partner.Rival.Name;
	info += " wants to";
	this.TextWriter.Write(info, 5, 95);
	info  = "topple ";
	if (this.Partner.HeadOfState.GetGender()==GENDER.MALE)
		info += HeadOfState[0][this.Partner.Government.Type] + " ";
	else
		info += HeadOfState[1][this.Partner.Government.Type] + " ";
	info += this.Partner.HeadOfState.Name + ",";
	this.TextWriter.Write(info, 5, 112);
	info = "and install a democracy."
	this.TextWriter.Write(info, 5, 129);
};
DominionChoiceInfoView.prototype.AttachIntrigueProsCons = function() {  //UNLOGGED
	var info;

	//TODO: also, financial evaluation, both ministerial coffers, and treasury

	this.Pros.length = 0;
	this.Pros.push("* 1 vote.");
	this.Cons.length = 0;
	info = PowerNames[this.Partner.Continent.Index];
	this.Cons.push("* Antagonizing "+info+".");
	info = PowerNames[this.Partner.AssociatedIndex];
	this.Cons.push("* Antagonizing "+info+".");
};
DominionChoiceInfoView.prototype.AcceptIntrigueScreen = function() {  //UNLOGGED
};
