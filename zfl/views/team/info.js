
//-------------------------------------------------------
//---------- GRIDIRON TEAM INFO VIEW --------------------
var GridironTeamInfoView = function() {
	var SectionIcons;

	var info;
};
GridironTeamInfoView.prototype = new GenieSubView();
GridironTeamInfoView.prototype.Set = function(cnvs, specs, mView, gTool) {  //TODO: might need to add ID for current nested view

	this.SetLinks(gTool);

	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);
};
GridironTeamInfoView.prototype.SetControls = function() {

	this.SectionIcons = new GenieIconPanel();
	this.SectionIcons.Set(this.Canvas, this.Specs.ICONS.SECTION, this.Specs.ICONS.SECTION.IMAGE);
	this.SectionIcons.SetLinks(this.GraphicsTool);
	this.SectionIcons.SetCornersPic(IconCornersImage);
	this.Controls.push(this.SectionIcons);
};
GridironTeamInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	switch (this.MainView.NestedView.Id) {
		case this.MainView.Specs.SUB.INFO:
			break;
		case this.MainView.Specs.SUB.ROSTER:
			GridderNestedView.Open();
			PracticeSquadNestedView.Open();
			break;
		case this.MainView.Specs.SUB.TRANSACTIONS:
			break;
		case this.MainView.Specs.SUB.PLAYBOOK:
			break;
		case this.MainView.Specs.SUB.OPPONENT:
			break;
		case this.MainView.Specs.SUB.LEAGUE:
			break;
	}
};
