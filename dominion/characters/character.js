
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
	Generate(gender) {

		this.Profile = CharacterGenerator.GenerateProfile(gender);
		if (gender) {
			switch (gender) {
				case GENDER.MALE:
					this.Name = CharacterGenerator.GenerateMaleName();
					break;
				case GENDER.FEMALE:
					this.Name = CharacterGenerator.GenerateFemaleName();
					break;
			}
		} else {
			this.Profile = CharacterGenerator.GenerateProfile();
			if (this.GetGender()==GENDER.MALE)
				this.Name = CharacterGenerator.GenerateMaleName();
			else
				this.Name = CharacterGenerator.GenerateFemaleName();
		}
	},
	GetGender() {

		if (BitUtils.CheckBit(this.Profile, DOMINION.CHARACTER.BITS.GENDER))
			return (GENDER.FEMALE);
		else
			return (GENDER.MALE);
	}
};
