
//------------------------------------------
//--------- SOLAR JOURNEY ------------------
var SolarJourney = function() {
	var Departure, Destination;
	var Distance, Travelled;
};
SolarJourney.prototype = {
	Set() {
		this.Travelled = 0;
	},
	Reset() {

		this.Travelled = 0;
	},
	SetLocations(dprtr, dstntn) {

		this.Departure = dprtr;
		this.Destination = dstntn;
		this.Distance = (50/1.5) * SpaceUtils.GetDistance(this.Departure.Location, this.Destination.Location);
	},
	Update() {

		this.Travelled += 0.3 * (Starfield.Speed/2.0);
	},
	GetDistanceTravelled() {  //NOTE: returns percentage (as decimal)

		return (this.Travelled/this.Distance);
	}
};
