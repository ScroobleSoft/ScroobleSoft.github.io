
//-------------------------------------------------------
//---------- OFFICE POPULARITY CHART --------------------  (approval rating)
var OfficePopularityChart = function() {
	var GraphicsTool;
	var Specs;
	var FortnightPercentages;
};
OfficePopularityChart.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.FortnightPercentages = new Array(DOMINION.FORTNIGHTS+1);
		this.FortnightPercentages[0] = 50;
	},
	Draw() {  //UNLOGGED - current rating percentage showed imposed over the chart (in red)

	}
};
