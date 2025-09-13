
//-- Names --

var PowerNames = [ "Hornet", "Jaguar", "Falcon", "Vulcan", "Eagle", "Buccaneer", "Phantom", "Mirage", "Tomcat" ];
var AlliedNames = [ "Rome", "Ostia", "Ravenna", "Florentia", "Rhegium", "Catana", "Pompeii", "Mediolanum",			//Hornet
						  "Ecbatana", "Susa", "Anshan", "Pasargadae", "Ctesiphon", "Behistun", "Elam", "Ahvaz",			//Jaguar
						  "Luxor", "Abydos", "Amarna", "Alexandria", "Memphis", "Avaris", "Tanis", "Sais",					//Falcon
						  "Tintagel", "Viriconium", "Camelot", "Avalon", "Ys", "Brigadoon", "Tirnanog", "Lyonesse",		//Vulcan
						  "Athens", "Sparta", "Corinth", "Thebes", "Mycenae", "Argos", "Pylos", "Knossos",					//Eagle
						  "Troy", "Lydia", "Smyrna", "Phrygia", "Sardis", "Carchemish", "Mitanni", "Ionia",					//Buccaneer
						  "Sumer", "Babylon", "Palmyra", "Nippur", "Lagash", "Ur", "Akkad", "Nineveh",						//Phantom
						  "Tyre", "Byblos", "Kadesh", "Megiddo", "Sidon", "Erum", "Petra", "Carthage",						//Mirage
						  "Harappa", "Maggan", "Dilmun", "Mehrgarh", "Taxila", "Dholavira", "Kalibangan", "Lothal"		//Tomcat
];
var CityStateNames = [ "Harrier", "Panther", "Corsair", "Viper",			//central states
							  "Raptor", "Mustang", "Tornado", "Typhoon",			//NE
							  "Fawn", "Foxbat", "Skyhawk", "Scorpion",			//NW
							  "Orion", "Poseidon", "Neptune", "Hawkeye",			//SW
							  "Foxhound", "Fresco", "Hart", "Dragon"				//SE
];
/*
				 "Aardvark", "Skyraider", "Gryfalcon", "Galaxy", "Draken", "Viggen",
				 "Angel", "Skynight", "Talon", "Valiant", "Bobcat", "Banshee", "Bantam", "Nighthawk",
				 "Spitfire", "Osprey", "Catalina", "Blackfish", "Bearcat", "Thunderbolt", "Mongoose", "Goblin",
				 "Catfish", "Chipmunk", "Dagger", "Badger", "Hoverfly", "Huskie", "Skyray", "Lightning",
				 "Mariner", "Dakota", "Blackbird", "Cobra", "Lancer", "Colt", "Crusader", "Maverick",
				 "Polecat", "Rhino", "Raven", "Swan", "Swordfish", "Stallion", "Tadpole", "Blackhawk" ];
*/
/*
var ProvinceNames = [ [ "Cattom", "Omcatt", "Matcot", "Amcott", "Mocatt", "Tamcot", "Comatt", "Camtot", "Tatcom",
			"Octmat", "Atmoct", "Motact", "Mattoc", "Omtact", "Otmact", "Catmot", "Tomact" ],
				[ "Tehorn", "Horten", "Thorne", "Therno", "Orthen", "Trehon", "Rentho", "Rhonet", "Ethron",
			"Entor", "Hetron", "Noreth", "Rheont", "Rethon", "Orhent", "Ornhet", "Hentor" ],
				[ "Mantoph", "Photnam", "Onphmat", "Tophnam", "Omnapht", "Nompath", "Apnomth", "Panthom", "Nomtaph",
			"Hampton", "Hantpom", "Ontmaph", "Phanmot", "Tomphan", "Pahtnom", "Thamnop", "Thapmon" ],
				[ "Fonlac", "Coflan", "Lafnoc", "Nocfal", "Olfanc", "Flanco", "Calfon", "Oclanf", "Lacnof",
			"Flocan", "Onclaf", "Aflonc", "Flanoc", "Falnoc", "Confal", "Clonaf", "Alfcon" ],
				[ "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "" ],
				[ "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "" ],
				[ "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "" ],
				[ "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "" ],
				[ "", "", "", "", "", "", "", "", "",
			"", "", "", "", "", "", "", "" ]			];
*/
var ProvinceNames = [ [ "Bornet", "Cornet", "Dornet", "Fornet", "Gornet", "Jornet", "Kornet", "Lornet", "Mornet",
								"Nornet", "Rornet", "Sornet", "Tornet", "Vornet", "Wornet", "Xornet", "Yornet", "Zornet" ],
							 [ "Baguar", "Caguar", "Daguar", "Gaguar", "Haguar", "Kaguar", "Laguar", "Maguar", "Naguar",
								"Paguar", "Raguar", "Saguar", "Taguar", "Vaguar", "Waguar", "Xaguar", "Yaguar", "Zaguar" ],
							 [ "Balcon", "Calcon", "Dalcon", "Halcon", "Jalcon", "Kalcon", "Lalcon", "Malcon", "Nalcon",
								"Palcon", "Ralcon", "Salcon", "Talcon", "Valcon", "Walcon", "Xalcon", "Yalcon", "Zalcon" ],
							 [ "Bulcan", "Culcan", "Dulcan", "Fulcan", "Hulcan", "Julcan", "Kulcan", "Lulcan", "Mulcan",
								"Nulcan", "Pulcan", "Rulcan", "Sulcan", "Tulcan", "Wulcan", "Xulcan", "Yulcan", "Zulcan" ],
							 [ "Beagle", "Deagle", "Feagle", "Heagle", "Jeagle", "Keagle", "Leagle", "Meagle", "Neagle",
								"Peagle", "Reagle", "Seagle", "Teagle", "Veagle", "Weagle", "Xeagle", "Yeagle", "Zeagle" ],
							 [ "Duccanear", "Guccanear", "Huccanear", "Juccanear", "Luccanear", "Muccanear", "Nuccanear", "Puccanear",
								"Ruccanear", "Succanear", "Tuccanear", "Vuccanear", "Wuccanear", "Xuccanear", "Yuccanear", "Zuccanear" ],
							 [ "Bantom", "Cantom", "Dantom", "Fantom", "Gantom", "Hantom", "Jantom", "Kantom", "Lantom",
								"Mantom", "Nantom", "Rantom", "Tantom", "Vantom", "Wantom", "Xantom", "Yantom", "Zantom" ],
							 [ "Birage", "Cirage", "Dirage", "Firage", "Girage", "Hirage", "Jirage", "Kirage", "Lirage",
								"Nirage", "Pirage", "Rirage", "Sirage", "Tirage", "Virage", "Wirage", "Xirage", "Zirage" ],
							 [ "Bomcat", "Comcat", "Domcat", "Fomcat", "Gomcat", "Homcat", "Jomcat", "Komcat", "Lomcat",
								"Nomcat", "Pomcat", "Romcat", "Somcat", "Vomcat", "Womcat", "Xomcat", "Yomcat", "Zomcat" ]
];
var StateNames = [ [ "Jome", "Lome", "Nome", "Vome" ], [ "Fostia", "Jostia", "Rostia", "Tostia" ], [ "Cavenna", "Lavenna", "Pavenna", "Wavenna" ],
						 [ "Orentia", "Morentia", "Norentia", "Torentia" ], [ "Aegium", "Hegium", "Legium", "Negium" ], [ "Hatana", "Natana", "Ratana", "Satana" ],
						 [ "Compeii", "Jompeii", "Nompeii", "Rompeii" ], [ "Bediolanum", "Fediolanum", "Rediolanum", "Vediolanum" ],
						 [ "Lumer", "Numer", "Rumer", "Wumer" ], [ "Dabylon", "Fabylon", "Labylon", "Rabylon" ], [ "Calmyra", "Falmyra", "Halmyra", "Talmyra" ],
						 [ "Bippur", "Lippur", "Mippur", "Vippur" ], [ "Hagash", "Jagash", "Magash", "Ragash" ], [ "Hur", "Lur", "Mur", "Yur" ],
						 [ "Dakkad", "Lakkad", "Makkad", "Rakkad" ], [ "Fineveh", "Lineveh", "Pineveh", "Wineveh" ],
						 [ "Cathens", "Rathens", "Vathens", "Zathens" ], [ "Carta", "Garta", "Parta", "Tharta" ], [ "Borinth", "Gorinth", "Lorinth", "Quorinth" ],
						 "Thebes", "Mycenae", "Argos", "Pylos", "Knossos",
			 "Luxor", "Abydos", "Amarna", "Alexandria", "Memphis", "Avaris", "Tanis", "Sais",
			 "Harappa", "Balakot", "Kot Diji", "Mehrgarh", "Taxila", "Dholavira", "Kalibangan", "Lothal",
			 "Tyre", "Byblos", "Kadesh", "Megiddo", "Sidon", "Erum", "Petra", "Carthage",
			 "Ecbatana", "Susa", "Anshan", "Pasargadae", "Ctesiphon", "Behistun", "Elam", "Ahvaz",
			 "Troy", "Lydia", "Smyrna", "Phrygia", "Sardis", "Carchemish", "Mitanni", "Ionia",
			 "Dilmun", "Maggan", "Tintagel", "Viriconium", "Camelot", "Avalon", "Ys", "Brigadoon"
];

//-- Abbreviations --

var PowerAbbreviations = [ "HRNT", "JGUR", "FLCN", "VLCN", "EGLE", "BCNR", "PNTM", "MRGE", "TMCT" ];

var CityStateAbbreviations = [ "HRRR", "PNTR", "CRSR", "VIPR",
										 "RPTR", "MSTG", "TRND", "TPHN",
										 "FAWN", "FXBT", "SKHK", "SCPN",
										 "ORIN", "PSDN", "NPTN", "HWKY",
										 "FXHD", "FRSC", "HART", "DRGN"
];
