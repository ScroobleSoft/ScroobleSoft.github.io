
GridironDraftView.prototype.SelectProspect = function() {

	//Check if there are no prospects available at that position
	if (Game.CheckPhone()) {
		if (this.ConsoleView.Position>-1)		//TODO: 'Select' button should be disabled instead
			if (this.Draft.PositionLists[this.ConsoleView.Position].length==0)
				return;
	} else {
		if (this.ConsoleView.PositionTouchBar.SelectedKey)
			if (this.Draft.PositionLists[this.ConsoleView.PositionTouchBar.SelectedKey-1].length==0)
				return;
	}

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
		if (!Game.CheckPhone())
			this.DisplayRoster();

	//Refresh selected page of prospects if necessary
	if (Game.CheckPhone())
		this.ConsoleView.DisplayPhoneProspects();
	else
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
		if (!Game.CheckPhone()) {
			++this.DisplayRound;
			if (this.DisplayRound<=this.RoundTouchBar.Specs.KEYS)
				this.RoundTouchBar.ChangeKey(this.DisplayRound-1);
		}
	}

	//Display selections
	if (Game.CheckPhone()) {
		this.InfoView.ClearSelections();
		this.InfoView.DisplaySelections();
	} else {
		if (this.Draft.Round<=DRAFT.ROUNDS)
			this.DisplaySelections();
		else {													//HACK!!
			--this.DisplayRound;
			this.DisplaySelections();
			++this.DisplayRound;
		}
	}
};
GridironDraftView.prototype.PlayerTeamSelect = function() {
	var pstn;

	//TODO: safety check to see player doesn't take non-existent player
/*
		if (this.ConsoleView.Position==-1) {
			this.Draft.Prospect = this.Draft.ValueList.Extract(this.num);
			this.Position = this.Draft.Prospect.Position;
			this.Draft.ExciseProspect(this.Draft.Prospect);
		} else {
			this.Position = this.ConsoleView.Position;
			this.Draft.Prospect = this.Draft.PositionLists[this.Position].Extract(this.num);
			this.Draft.ExciseValueList(this.Draft.Prospect);
		}
	} else {
*/
	//Get appropriate list and player index within it	
	if (Game.CheckPhone()) {
		this.num = this.ConsoleView.Page * this.ConsoleView.Specs.ITEMS;
		this.num += this.ConsoleView.Slot;
		pstn = this.ConsoleView.Position;
	} else {
		this.num = this.ConsoleView.ProspectPagination.SelectedPage * this.ConsoleView.ProspectPagination.Specs.ITEM.COUNT;
		this.num += this.ConsoleView.ProspectPagination.SelectedItemIndex;
		pstn = this.ConsoleView.PositionTouchBar.SelectedKey - 1;
	}

	if (pstn==-1) {		//comprehensive list
		this.Draft.Prospect = this.Draft.ValueList.Extract(this.num);
		this.Position = this.Draft.Prospect.Position;
		this.Draft.ExciseProspect(this.Draft.Prospect);
	} else {					//position list
		this.Draft.Prospect = this.Draft.PositionLists[pstn].Extract(this.num);
		this.Draft.ExciseValueList(this.Draft.Prospect);
	}
	this.Draft.Prospect.Experience = 0;		//make sure prospect is 'unmarked'

	if (this.Draft.Prospect.Type)
		this.Draft.ExciseAlternate(this.Draft.Prospect);

	this.Draft.Picks.push(this.Draft.Prospect);
	this.Draft.PickNumbers.push(this.Draft.CurrentPick);
	++this.PlayerPicks;
	if (Game.CheckPhone())
		this.DisplayPhonePicks();
	else	
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
	this.Draft.Prospect.Experience = 0;		//make sure prospect is 'unmarked'
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
	this.Draft.Prospect.Experience = 0;		//make sure prospect is 'unmarked'
	this.Draft.ExciseValueList(this.Draft.Prospect);
	if (this.Draft.Prospect.Type)
		this.Draft.ExciseAlternate(this.Draft.Prospect);
	this.Team.CycleNeeds();
};
GridironDraftView.prototype.SelectAlternate = function() {

	this.Draft.Prospect = this.Draft.AlternatesList.Extract(0);
	this.Draft.Prospect.Experience = 0;		//make sure prospect is 'unmarked'
	this.Draft.ExciseValueList(this.Draft.Prospect);
	this.Draft.ExciseProspect(this.Draft.Prospect);
	this.Draft.ExciseAlternate(this.Draft.Prospect);
};
