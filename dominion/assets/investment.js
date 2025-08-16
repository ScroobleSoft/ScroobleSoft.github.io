
//---------------------------------------------------
//---------- DOMINION INVESTMENT --------------------
var DominionInvestment = function() {
	var Power, CityState;		//TODO: .CityState reference currently unused
	var Amount, Credit;
};
DominionInvestment.prototype = {
	Set(power, cState) {
		this.Power = power;
		this.CityState = cState;
		this.Amount = 0;
		this.Credit = 0;
	},
	Invest(cash) {

		this.Amount += cash;
		this.Credit += this.Amount;
		this.Power.Treasury -= this.Amount;
	},
	Increase() {

		++this.Amount;
		++this.Credit;
		--this.Power.Treasury;
	},
	Reduce() {

		if (!this.Amount) {
			--this.Amount;
			++this.Power.Treasury;
		}
	},
	Withdraw() {

		this.Power.Treasury += this.Amount;
		this.Amount = 0;
	}
};
