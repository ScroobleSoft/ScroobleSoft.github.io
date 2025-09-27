
//----------------------------------------------
//---------- GENIE CALENDAR --------------------  TODO: only works for the same year
var GenieCalendar = function() {
	var Year;
	var MonthlyDays;
	var BaseDate, BaseDays;									//.BaseDays- number of days since start of year
	var BaseMonth, BaseMonthDay, BaseMonthDays;		//.BaseMonthDay is indexed from 1
};
GenieCalendar.prototype = {
	Set() {
		this.MonthlyDays = [ 31,28,31,30,31,30,31,31,30,31,30,31 ];
	},
	SetYear(year) {

		this.Year = year;
	},
	SetBaseDate(date) {
		var i;

		this.BaseDate = new Date(date);
		this.BaseMonth = this.BaseDate.getMonth();
		this.BaseMonthDay = this.BaseDate.getDate();
		this.BaseMonthDays = (this.MonthlyDays[this.BaseMonth]-this.BaseMonthDay) + 1;
		this.BaseDays = 0;
		for (i=0;i<this.BaseMonth;++i)
			this.BaseDays += this.MonthlyDays[i];
		this.BaseDays += this.BaseDate.getDate();
	},
	GetScheduledGames() {
		var bDays, cDays;		//b- base, c- current

		bDays = this.GetGameIndex(this.BaseDate);		//first day
		cDays = this.GetGameIndex();						//present day

		return ((cDays-bDays)+1);
	},
	GetGameIndex(date) {
/*
		var i;
		var dt;
		var days, mnth;

		//Get days since base day
		if (date)
			dt = date;
		else
			dt = new Date();
		days = 0;
		mnth = dt.getMonth();
		for (i=0;i<mnth;++i)
			days += this.MonthlyDays[i];
		days += dt.getDate();

		return (days);
*/
		var dt;
		var days;

		if (date)
			dt = new Date(date);
		else
			dt = new Date();
		days = Math.floor(dt.getTime()/MILLISECONDS);

		return (days);
	},
	GetDate(indx) {
		var days, mnth;

		indx += this.BaseDays;
		mnth = 0;
		while (indx>this.MonthlyDays[mnth]) {
			indx -= this.MonthlyDays[mnth];
			++mnth;
		}

		return (this.BaseDate.getFullYear()+"-"+mnth+"-"+indx);
	},
	GetBaseYear() {  //UNLOGGED - REDUNDANT?

		return (this.BaseDate.getFullYear());
	}
};
