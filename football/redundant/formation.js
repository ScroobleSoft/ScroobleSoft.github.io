/* not used and won't even work due to one flaw
FootballTeamConsoleView.prototype.TryPermutations = function() {
	var schdl;
	var perms;

	schdl = [ [0,1,2,3] ];
	perms = this.Permutations(24, schdl);
};
FootballTeamConsoleView.prototype.Permutations = function(nCombos, aNums) {
	var aOrgnl;

	aOrgnl = ArrayUtils.CreateDuplicate(aNums);  //here's the flaw, since ::CreateDuplicate is for 2-dim arrays; fixing that will likely make this work

	function permutate(nCombos, arry, aOrgnl, aUtils) {
		var i;

		if (nCombos==1)
			return (arry);
		else {
			for (i=0;i<nCombos-1;++i) {
				if (nCombos % 2 == 0)
					arry.push(aUtils.GetSwappedArray(aOrgnl, i, nCombos-1));
				else
					arry.push(aUtils.GetSwappedArray(aOrgnl, 0, nCombos-1));
			}
			permutate(nCombos-1, arry, aOrgnl, aUtils);
		}
	}

	return (permutate(nCombos, aNums, aOrgnl, ArrayUtils));
}
*/
	SelectStarters(frmtn) {
		var i;

		//Flush previous selections
		this.SelectedIndices.fill(false);
		this.SelectedYouth.fill(false);

		for (i=0;i<MATCH.PLAYERS;++i) {

			//Get exact matches for positions in selected formation
			this.FormationStarters[frmtn][i] = this.SelectExact(Formations[frmtn][i]);

			//If no exact match available, get next best option
			if (!this.FormationStarters[frmtn][i])
				this.FormationStarters[frmtn][i] = this.SelectAlternate(Formations[frmtn][i]);

			//If no alternate available, fill spot from the youth team
			if (!this.FormationStarters[frmtn][i])
				this.FormationStarters[frmtn][i] = this.SelectYouth(Formations[frmtn][i]);

			//If there is still a vacancy, sign an alternate from youth team
			if (!this.FormationStarters[frmtn][i])
				this.FormationStarters[frmtn][i] = this.SelectYouthAlternative(Formations[frmtn][i]);

			//As a last resort, (sign an emergency player, a la ZFL, but probaly from an 'avaliable loan' list)
			if (!this.FormationStarters[frmtn][i])
				this.FormationStarters[frmtn][i] = this.LoanPlayer(Formations[frmtn][i]);
		}
	},
	SelectExact(pstn) {
		var i;

		for (i=0;i<this.Squad.Players.length;++i)
			if (this.Squad.Players[i].Position==pstn)
				if (!this.Squad.Players[i].Injury && !this.Squad.Players[i].Selected) {
					this.Squad.Players[i].Selected = true;
					return (this.Squad.Players[i]);
				}
	},
	SelectExact2(pstn) {
		var i;

		for (i=0;i<10;++i)
			if (this.SortedSquadList[i].Position==pstn)
				if (!this.SortedSquadList[i].Injury) {
					this.SelectedIndices[i] = true;
					return (this.SortedSquadList[i]);
				}
	},
	SelectAlternate(pstn) {
		var i;
		var pstn2;
		var dstnc1, dstnc2;
		var mPlayer, qDfrntl;	//m- max, q- quality

		mPlayer = -1;
		qDfrntl = 13;			//NOTE: this figure is the lowest a rating can drop by
		for (i=0;i<this.Squad.Players.length;++i) {
	 if (this.Squad.Players[i].Injury || this.SelectedIndices[i])
		 continue;
	 if (this.Squad.Players[i].Position!=POSITION.GK) {
		 pstn2 = this.Squad.Players[i].Position;
		 dstnc1 = Math.abs(PositionZones[pstn2][0][0]-PositionZones[pstn][0][0]) + Math.abs(PositionZones[pstn2][0][1]-PositionZones[pstn][0][1]);
		 dstnc2 = Math.abs(PositionZones[pstn2][1][0]-PositionZones[pstn][1][0]) + Math.abs(PositionZones[pstn2][1][1]-PositionZones[pstn][1][1]);
		 dstnc1 = Math.min(dstnc1, dstnc2);
		 if (dstnc1<qDfrntl) {
			 qDfrntl = dstnc1;
			 mPlayer = i;
		 }
	 }
		}

		if (mPlayer!=i) {
	 this.SelectedIndices[mPlayer] = true;
	 return (this.Squad.Players[mPlayer]);
		}
	},
	SelectYouth(pstn) {
		var i;

		for (i=0;i<this.YouthTeam.Players.length;++i)
	 if (this.YouthTeam.Players[i].Position==pstn)
		 if (!this.YouthTeam.Players[i].Injury)
			 if (!this.SelectedYouth[i]) {
		  this.SelectedYouth[i] = true;
		  return (this.YouthTeam.Players[i]);
			 }
	},
	SelectYouthAlternative(pstn) {
		var i;
		var pstn2;
		var dstnc1, dstnc2;
		var mPlayer, qDfrntl;	//m- max, q- quality

		mPlayer = -1;
		qDfrntl = 13;			//NOTE: this figure is the lowest a rating can drop by
		for (i=0;i<this.YouthTeam.Players.length;++i) {
	 if (this.YouthTeam.Players[i].Injury || this.SelectedYouth[i])
		 continue;
	 if (this.YouthTeam.Players[i].Position!=POSITION.GK) {
		 pstn2 = this.YouthTeam.Players[i].Position;
		 dstnc1 = Math.abs(PositionZones[pstn2][0][0]-PositionZones[pstn][0][0]) + Math.abs(PositionZones[pstn2][0][1]-PositionZones[pstn][0][1]);
		 dstnc2 = Math.abs(PositionZones[pstn2][1][0]-PositionZones[pstn][1][0]) + Math.abs(PositionZones[pstn2][1][1]-PositionZones[pstn][1][1]);
		 dstnc1 = Math.min(dstnc1, dstnc2);
		 if (dstnc1<qDfrntl) {
			 qDfrntl = dstnc1;
			 mPlayer = i;
		 }
	 }
		}

		if (mPlayer!=i) {
	 this.SelectedYouth[mPlayer] = true;
	 return (this.YouthTeam.Players[mPlayer]);
		}
	},
