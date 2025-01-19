
GridironDraftView.prototype.SelectProspect = function() {

	//Check if there are no prospects available at that position
	if (this.ConsoleView.PositionTouchBar.SelectedKey)
		if (this.Draft.PositionLists[this.ConsoleView.PositionTouchBar.SelectedKey-1].length==0)
			return;

	//First check for AI teams, implement their pick
	this.Team = Teams[this.Draft.SelectionOrder[this.Draft.CurrentPick]];

	if (this.Team.Index==PlayerTeam.Index)
		this.PlayerTeamSelect();
	else {
		if (this.Randomizer.CheckBoolean())
			this.AITeamBPASelect();
		else
			this.AITeamNeedSelect();
	}
	this.Team.Roster.AddGridder(this.Draft.Prospect);
	if (this.Team.Index==PlayerTeam.Index)
		this.DisplayRoster();

	//Refresh selected page if necessary
	if (this.ConsoleView.PositionTouchBar.SelectedKey==0 || this.ConsoleView.PositionTouchBar.SelectedKey==(this.Draft.Prospect.Position+1))
		this.ConsoleView.DisplayProspects();

	this.Draft.Prospect.Drafted = this.Draft.CurrentPick + 1;

	//Update selections list
	this.Selections[this.Draft.CurrentPick].Position = Positions[this.Draft.Prospect.Position];												//position
	this.Selections[this.Draft.CurrentPick].Initials = this.Draft.Prospect.Name.First[0] + this.Draft.Prospect.Name.Last[0];		//initials
	this.Selections[this.Draft.CurrentPick].Grade = Utils.NumberToGrade(this.Draft.Prospect.Quality);										//grade
	this.Selections[this.Draft.CurrentPick].Potential = this.Draft.Prospect.Potential;															//potential

	//Update selection number
	++this.Draft.CurrentPick;
	if ( (this.Draft.CurrentPick % LEAGUE.TEAMS)==0 ) {
		++this.Draft.Round;
		++this.DisplayRound;
		if (this.DisplayRound<=this.RoundTouchBar.Specs.KEYS)
			this.RoundTouchBar.ChangeKey(this.DisplayRound-1);
	}

	if (this.Draft.Round<=DRAFT.ROUNDS)
		this.DisplaySelections();
	else {													//HACK!!
		--this.DisplayRound;
		this.DisplaySelections();
		++this.DisplayRound;
	}
};
GridironDraftView.prototype.PlayerTeamSelect = function() {

	//Check if selection is being made from positions or value tab . . . TODO: safety check to see player doesn't take non-existent player
	this.num = this.ConsoleView.ProspectPagination.SelectedPage * this.ConsoleView.ProspectPagination.Specs.ITEM.COUNT;
	this.num += this.ConsoleView.ProspectPagination.SelectedItemIndex;
	if (this.ConsoleView.PositionTouchBar.SelectedKey) {	//position keys
		this.Position = this.ConsoleView.PositionTouchBar.SelectedKey - 1;
		this.Draft.Prospect = this.Draft.PositionLists[this.Position].Extract(this.num);
		this.Draft.ExciseValueList(this.Draft.Prospect);
	} else {			//value tab
		this.Draft.Prospect = this.Draft.ValueList.Extract(this.num);
		this.Position = this.Draft.Prospect.Position;
		this.Draft.ExciseProspect(this.Draft.Prospect);
	}
	if (this.Draft.Prospect.Type)
		this.Draft.ExciseAlternate(this.Draft.Prospect);

	this.Draft.Picks.push(this.Draft.Prospect);
	this.Draft.PickNumbers.push(this.Draft.CurrentPick);
	++this.PlayerPicks;
	this.InfoView.Draw();
};
GridironDraftView.prototype.AITeamBPASelect = function() {

	//For rounds 4-7, take best alternative if fits draft profile, otherwise take highest value prospect
//	if (Draft.Round>=4 && Draft.Round<=7 && this.Randomizer.CheckUnderOdds(1, this.DraftProfile))	//numerator could be higher number?
	if (Draft.Round>3)
		if (this.Randomizer.CheckBoolean()) {
			this.SelectAlternate();
			return;
		}

	this.Draft.Prospect = this.Draft.ValueList.shift();
	this.Draft.PositionLists[this.Draft.Prospect.Position].shift();
	if (this.Draft.Prospect.Type)
		this.Draft.ExciseAlternate(this.Draft.Prospect);
};
GridironDraftView.prototype.AITeamNeedSelect = function() {

	this.Position = this.Team.StarterNeeds[0].Position;
	while (this.Draft.PositionLists[this.Position].length==0) {
		this.Team.CycleNeeds();
		this.Position = this.Team.StarterNeeds[0].Position;
	}
	this.Draft.Prospect = this.Draft.PositionLists[this.Position].shift();
	this.Draft.ExciseValueList(this.Draft.Prospect);
	if (this.Draft.Prospect.Type)
		this.Draft.ExciseAlternate(this.Draft.Prospect);
	this.Team.CycleNeeds();
};
GridironDraftView.prototype.SelectAlternate = function() {

	this.Draft.Prospect = this.Draft.AlternatesList.Extract(0);
	this.Draft.ExciseValueList(this.Draft.Prospect);
	this.Draft.ExciseProspect(this.Draft.Prospect);
	this.Draft.ExciseAlternate(this.Draft.Prospect);
};
