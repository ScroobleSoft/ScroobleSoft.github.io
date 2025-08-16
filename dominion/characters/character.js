
//--------------------------------------------------
//---------- DOMINION CHARACTER --------------------
var DominionCharacter = function() {
	var Name;
	var Profile;
};
DominionCharacter.prototype = {
	Set() {
		this.Generate();		//TODO: this could be removed from here
	},
	Generate() {  //TODO: may also have ::GenerateMale/::GenerateFemale

		this.Profile = CharacterGenerator.GenerateProfile();
		if (this.GetGender()==GENDER.MALE)
			this.Name = CharacterGenerator.GenerateName() + " " + CharacterGenerator.GenerateName();
		else
			this.Name = CharacterGenerator.GenerateName() + "a " + CharacterGenerator.GenerateName();
	},
	GetGender() {

		if (BitUtils.CheckBit(this.Profile, DOMINION.CHARACTER.BITS.GENDER))
			return (GENDER.FEMALE);
		else
			return (GENDER.MALE);
	}
};
