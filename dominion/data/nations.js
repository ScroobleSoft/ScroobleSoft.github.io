
//-- GOVERNMENT --

var NATION = { POWER: 0, ALLIED: 1, CITySTATE: 2 };
var MINISTRY = { NONE: -1, AGRICULTURE: 0, CULTURE: 1, DEFENCE: 2, ENERGY: 3, FOREIGN: 4, HEALTH: 5, INDUSTRY: 6, INFORMATION: 7, PORTFOLIOS: 8 };
var Ministries = [ "Agriculture", "Culture", "Defence", "Energy", "Foreign", "Health", "Industry", "Information" ];
var MinistriesFullNames = [ "Food and Agriculture", "Culture, Sports, Science and Education", "Defence", "Energy Production and Exploration",
									 "Foreign Affairs", "Health and Social Services", "Industry and Finance", "Information and Interior" ];
var GOVERNMENT = { DEMOCRACY: 0, THEOCRACY: 1, ANARCHY: 2, MARXIST: 3, REPUBLIC: 4, FEDERATION: 5, FEUDAL: 6, MONARCHY: 7, DICTATORSHIP: 8,
						 COMMONWEALTH: 9, TYPES: 10  };
var Government = [ "Democray", "Theocracy", "Anarchy", "Marxist", "Republic", "Federation", "Feudal", "Monarchy", "Dictatorship", "Commonwealth" ];
var NationAppellations = [ "Democratic Republic", "Holy Republic", "Territory", "People's Republic", "Republic", "Federation",
									"Seigniory", "Kingdom", "Union", "Commonwealth" ];
var HeadOfState = [ [ "Prime Minister", "High Priest", "Prime Citizen", "Chairman", "President",
							 "Chancellor", "High Lord", "King", "Field Marshal", "C.E.O." ],
						  [ "Prime Minister", "High Priestess", "Prime Citizen", "Chairwoman", "President",
							 "Chancellor", "High Lady", "Queen", "Field Marshal", "C.E.O." ] ];
var Adviser = [ "Deputy Prime Minister", "Legate", "Deputy Citizen", "Commissar", "Vice President",
					 "Vice Chancellor", "Squire", "Vizier", "General", "C.F.O." ];
var Appelation = [ [ "Mr.", "Your Holiness", "", "Comrade", "Sir", "Your Excellency", "My Lord", "Your Majesty", "Master" ],
						 [ "Ms.", "Your Holiness", "", "Comrade", "Ma'am", "Your Excellency", "My Lady", "Your Majesty", "Mistress" ] ];
var InternalRival = [ [ "Minister", "Priest", "Citizen", "Secretary", "Senator", "Legislator", "Sir", "Crown Prince", "General", "V.P." ],
							 [ "Minister", "Priestess", "Citizen", "Secretary", "Senator", "Legislator", "Dame", "Crown Princess", "General", "V.P." ] ];
var ExternalRival = [ [ "Parliamentarian", "Dr.", "Citizen", "Director", "Governor", "Premier", "Count", "Duke", "Magistrate", "Director" ],
							 [ "Parliamentarian", "Dr.", "Citizen", "Director", "Governor", "Premier", "Countess", "Duchess", "Magistrate", "Director" ] ];

//-- DIPLOMACY --

var BELLIGERENCE = { INERT: 0, PASSIVE: 1, BENIGN: 2, MILD: 3, CAUTIOUS: 4, MODERATE: 5, AGGRESSIVE: 6, HOSTILE: 7, BELLICOSE: 8, TYPES: 8 };
var Belligerence = [ "Inert", "Passive", "Benign", "Mild", "Cautious", "Moderate", "Aggressive", "Hostile", "Bellicose" ];
var DIPLOMACY = { SIDES: 9, LEVELS: 8 };
var Relations = [ "Excellent", "Friendly", "Amicable", "Neutral", "Wary", "Tense", "Fraught", "War" ];
var COMMODITY = { FOOD: 0, ENTERTAINMENT: 1, ARMS: 2, LAVENOIL: 3, BONDS: 4, MEDICINE: 2, GOODS: 3, SURVEILLANCE: 7, TYPES: 8 };
var Commodity = [ "Food", "Entertainment", "Arms", "Lavenoil", "Bonds", "Medicine", "Goods", "Surveillance" ];
var CommodityPreference = [ "Food and Beverages", "Entertainment and Educational Fare", "Military Units and Supplies", "Lavenoil",
									 "Dominion Bonds", "Medicines and Hospital Equipment", "TVs and Appliances", "Surveillance Equipment"  ];

//-- EXPANSION --

var EXPANSION = { FUNDING: 0, BENEFICENCE: 1, NEGOTIATION: 2, AGREEMENT: 3, UNDERTAKING: 4, SUBVERSION: 5, BUYING: 6, CONQUEST: 7, METHODS: 8 };
var MISSION = { SABOTAGE: 0, RAID: 1, BLOCKADE: 2, CHAMPIONS: 3, INTERDICTION: 4, ICBM: 5, DOGFIGHT: 6, HUNTING: 7, TYPES: 8 };
var ALLIANCE = { GRANT: 0, AID: 1, TREATY: 2, PACT: 3, MISSION: 4, INTRIGUE: 5, PURCHASE: 6, CONQUEST: 7, TYPES: 8,
					  NONE: 0, NOMINAL: 1, MILD: 2, MODERATE: 3, SOLID: 4, STRONG: 5, STURDY: 6, RESOLUTE: 7, IMPREGNABLE: 8 };
var Alliance = [ "None", "Nominal", "Mild", "Moderate", "Solid", "Strong", "Sturdy", "Resolute", "Impregnable" ];	//TODO: Firm? . . . all REDUNDANT?
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
							 [ BELLIGERENCE.PASSIVE,	 MINISTRY.CULTURE,		GOVERNMENT.THEOCRACY,	 9, DIRECTION.WNW	],		//Mirage
							 [ BELLIGERENCE.INERT,		 MINISTRY.NONE,			GOVERNMENT.DEMOCRACY,	 5, DIRECTION.C	]		//Tomcat
];  //Posture-Specialty-Government-Tech Level-Location

//-- ALLIEDS --

var ALLIED = { COUNT: 72, CITIES: 5 };

//-- CITY STATES --

var CITySTATE = { COUNT: 20, ARCHIPELAGO: { COUNT: 4, ISLANDS: 5 }, CITIES: 1 };
