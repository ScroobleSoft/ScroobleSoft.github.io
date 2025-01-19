
//-----------------------------------------------------
//---------- DOMININON BUDGET PAGE --------------------
var DominionBudgetPage = function() {
   var Chart;
};
DominionBudgetPage.prototype = {
   Set() {
      this.Chart = new Genie3DBarChart();
      this.Chart.Set(DominionScape.PrimeScape, OFFICE.PAGE.BUDGET);
      this.Chart.SetLinks(DominionGraphics);
   },
   Draw() {
      this.Chart.SetValues( [200,100,100,100,100,100,100,100,100] );
      this.Chart.SetColours(PowerColours);
      this.Chart.Draw();
   }
};
