/*
		** select see in cities/stacks/platform options here
*/
//-------------------------------------------------
//---------- GAME OPTIONS VIEW --------------------
var GameOptionsView = function() {
	var CityCheckBox, StackCheckBox, PlatformCheckBox;		//UNLOGGED
	var OkButton;														//UNLOGGED - no specs
};
GameOptionsView.prototype = new GenieView();
GameOptionsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
GameOptionsView.prototype.SetControls = function() {  //UNLOGGED

	this.CityCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.CITY, CheckBoxImages, Text);				//specs not set
	this.StackCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.STACK, CheckBoxImages, Text);				//specs not set
	this.PlatformCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.PLATFORM, CheckBoxImages, Text);				//specs not set
};
GameOptionsView.prototype.Draw = function() {  //UNLOGGED
	//-color selection, possibly name entry via keys (color could be a panel control)
};
GameOptionsView.prototype.Update = function() {  //UNLOGGED
	//-colour selection and Ok button
};
