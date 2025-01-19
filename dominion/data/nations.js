
//-- ATTRIBUTES --

var NATION = { POWER: 0, ALLIED: 1, CITySTATE: 2 };
var MINISTRY = { NONE: -1, AGRICULTURE: 0, DEFENCE: 1, ENERGY: 2, FINANCE: 3, FOREIGN: 4, HEALTH: 5, INDUSTRY: 6, INFORMATION: 7, PORTFOLIOS: 8 };
var Ministries = [ "Agriculture", "Defence", "Energy", "Finance", "Foreign", "Health", "Industry", "Information" ];
var GOVERNMENT = { DEMOCRACY: 0, THEOCRACY: 1, ANARCHY: 2, MARXIST: 3, REPUBLIC: 4, FEDERATION: 5, FEUDAL: 6, MONARCHY: 7, DICTATORSHIP: 8,
						 COMMONWEALTH: 9, TYPES: 10  };
var Government = [ "Democray", "Theocracy", "Anarchy", "Marxist", "Republic", "Federation", "Feudal", "Monarchy", "Dictatorship", "Commonwealth" ];
var NationAppellations = [ "Democratic Republic", "Holy Republic", "Territory", "People's Republic", "Republic", "Federation",
									"Seigniory", "Kingdom", "Union", "Commonwealth" ];
var HeadOfState = [ [ "Prime Minister", "High Priest", "Prime Citizen", "Chairman", "President", "Chancellor", "High Lord", "King", "Field Marshal", "C.E.O." ],
				  [ "Prime Minister", "High Priestess", "Prime Citizen", "Chairwoman", "President", "Chancellor", "High Lady", "Queen", "Field Marshal", "C.E.O." ] ];
var Advisor = [ "Finance Minister", "Legate", "Deputy Citizen", "Commissar", "Vice President", "Vice Chancellor", "Squire", "Vizier", "General", "V.P." ];
var InternalRival = [ [ "Minister", "Priest", "Citizen", "Secretary", "Senator", "Legislator", "Sir", "Crown Prince", "General", "V.P." ],
							 [ "Minister", "Priestess", "Citizen", "Secretary", "Senator", "Legislator", "Dame", "Crown Princess", "General", "V.P." ] ];
var ExternalRival = [ [ "Parliamentarian", "Dr.", "Citizen", "Director", "Governor", "Premier", "Count", "Duke", "Magistrate", "Director" ],
							 [ "Parliamentarian", "Dr.", "Citizen", "Director", "Governor", "Premier", "Countess", "Duchess", "Magistrate", "Director" ] ];
var BELLIGERENCE = { INERT: 0, PASSIVE: 1, BENIGN: 2, MILD: 3, CAUTIOUS: 4, MODERATE: 5, AGGRESSIVE: 6, HOSTILE: 7, BELLICOSE: 8, TYPES: 8 };
var Belligerence = [ "Inert", "Passive", "Benign", "Mild", "Cautious", "Moderate", "Aggressive", "Hostile", "Bellicose" ];
var DIPLOMACY = { SIDES: 9, LEVELS: 8 };
var Relations = [ "Excellent", "Friendly", "Amicable", "Neutral", "Wary", "Tense", "Fraught", "War" ];
//var COMMODITY = { FOOD: 0, ARMS: 1, LAVENOIL: 2, ADVICE: 3, FARES: 4, EQUIPMENT: 5, GOODS: 6, INTELLIGENCE: 7, TYPES: 8 };		anticipating REDUNDANT
//var Commodity = [ "Food", "Arms", "Lavenoil", "Advice", "Low Cost Fares", "Medical Equipment", "Goods", "Satellites" ];
var COMMODITY = { FOOD: 0, LAVENOIL: 1, MEDICINE: 2, GOODS: 3, TYPES: 4 };
var Commodity = [ "Food", "Lavenoil", "Medicine", "Goods" ];
var CommodityMap = [ 0,2,5,6 ];
var ALLIANCE = { PURCHASE: 0, GRANT: 1, INVESTMENT: 2, PACT: 3, INTRIGUE: 4, TREATY: 5, MISSION: 6, CONQUEST: 7, TYPES: 8,
					  NONE: 0, NOMINAL: 1, MILD: 2, MODERATE: 3, SOLID: 4, STRONG: 5, STURDY: 6, RESOLUTE: 7, IMPREGNABLE: 8 };
var Alliance = [ "None", "Nominal", "Mild", "Moderate", "Solid", "Strong", "Sturdy", "Resolute", "Impregnable" ];	//TODO: Firm?
var Populations = [ 10000000, 3000000, 600000 ];
var GDP = { TOMCAT: 800000000000, POWER: 400000000000, ALLIED: 150000000000, CITySTATE: 24000000000, PErCAPITA: 50000 };
var BUDGET = { UNITS: 28 };

//-- POWERS --

var POWER = { HORNET: 0, JAGUAR: 1, FALCON: 2, VULCAN: 3, EAGLE: 4, BUCCANEER: 5, PHANTOM: 6, MIRAGE: 7, TOMCAT: 8, COUNT: 9,
				  SATELLITES: 8, CITIES: 17,
				  PROFILE: { POSTURE: 0, SPECIALTY: 1, GOVERNMENT: 2, TECH: 3, LOCATION: 4 } };
var PowerProfiles = [ [ BELLIGERENCE.BELLICOSE,	 MINISTRY.DEFENCE,		GOVERNMENT.DICTATORSHIP, 1, DIRECTION.NNE ],		//Hornet
							 [ BELLIGERENCE.HOSTILE,	 MINISTRY.INFORMATION,	GOVERNMENT.MONARCHY,		 2, DIRECTION.WSW	],		//Jaguar
							 [ BELLIGERENCE.AGGRESSIVE, MINISTRY.AGRICULTURE,	GOVERNMENT.FEUDAL,		 3, DIRECTION.ESE	],		//Falcon
							 [ BELLIGERENCE.MODERATE,	 MINISTRY.ENERGY, 		GOVERNMENT.FEDERATION,	 4, DIRECTION.NNW	],		//Vulcan
							 [ BELLIGERENCE.CAUTIOUS,	 MINISTRY.FOREIGN,		GOVERNMENT.REPUBLIC,		 6, DIRECTION.SSW	],		//Eagle
							 [ BELLIGERENCE.MILD,		 MINISTRY.INDUSTRY,		GOVERNMENT.MARXIST,		 7, DIRECTION.SSE	],		//Buccaneer
							 [ BELLIGERENCE.BENIGN,		 MINISTRY.HEALTH,			GOVERNMENT.ANARCHY,		 8, DIRECTION.ENE	],		//Phantom
							 [ BELLIGERENCE.PASSIVE,	 MINISTRY.FINANCE,		GOVERNMENT.THEOCRACY,	 9, DIRECTION.WNW	],		//Mirage
							 [ BELLIGERENCE.INERT,		 MINISTRY.NONE,			GOVERNMENT.DEMOCRACY,	 5, DIRECTION.C	]		//Tomcat
];  //Posture-Specialty-Government-Tech Level-Location

//-- ALLIEDS --

var ALLIED = { COUNT: 72, CITIES: 5 };

//-- CITY STATES --

var CITySTATE = { COUNT: 20, ARCHIPELAGO: { COUNT: 4, ISLANDS: 5 }, CITIES: 1 };
