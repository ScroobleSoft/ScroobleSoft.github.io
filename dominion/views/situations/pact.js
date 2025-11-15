
DominionChoiceInfoView.prototype.OpenPactScreen = function() {  //UNLOGGED
	var info;

	this.Partner = Pact.GetAllied(this.Nation);

	this.TextWriter.SetContext(this.Context);

	//Title
	this.TextWriter.Write("Pact:", 5, 20, { FONT: "bond 14px Arial", STYLE: FONT.STYLE.UNDERLINED } );

	//Allied state info
	this.TextWriter.Write("Allied State:", 5, 40);
	this.TextWriter.Write(AlliedNames[this.Partner.NameIndex], 120, 40);
	this.TextWriter.Write("Affiliaion:", 5, 57);
	this.TextWriter.Write(PowerNames[this.Partner.AssociatedIndex], 120, 57);
	this.TextWriter.Write("Continent:", 5, 74);
	this.TextWriter.Write(PowerNames[this.Partner.Continent.Index], 120, 74);

	this.TextWriter.ResetContext();
};
DominionChoiceInfoView.prototype.DisplayPactProsCons = function() {  //UNLOGGED

	//-pro: very strong alliance
	//-con: antagonizing continent Power
	//-con: spreads out military, reducing units per base
};
DominionChoiceInfoView.prototype.AcceptPactScreen = function() {  //UNLOGGED
};
