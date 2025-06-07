
//-- PLANETS --

var PlanetNames = [ "Dragur",  "Prixoma",  "Mididium", "Torphobe",   "Clynis",	"Cardonis",  "Scipium",  "Taucite",
						  "Silone",  "Criptosi", "Iridane",  "Rautian",    "Poxlul",	"Presentis", "Polinise", "Rocona",
						  "Borial",  "Gilese",	 "Paprak",	 "Mandoreda",	"Pleken",	"Tocatan",   "Orphiss",  "Okmer",
						  "Sauer",   "Jasmori",	 "Scaile",   "Waspure",		"Toroch",	"Cendis",    "Gorme",    "Enlaut",
						  "Kreple",  "Berisat",  "Scanthor", "Minoria",    "Cranice",	"Baladrean", "Folsawe",  "Crees",
						  "Nogle",   "Rhotia",   "Traspia",  "Quatra",     "Spuros",	"Sandine",   "Prastpit", "Scawp",
						  "Kruate",  "Taycoin",  "Trepcore", "Nagatasi",   "Moara",		"Skipsey",   "Rokitoa",  "Celletane",
						  "Cynagle", "Liborsia", "Vinneger", "Thoriel",    "Horlon",	"Cripse",    "Viboste",  "Roamac"
];
var StationNames = [ "Darjeeling", "Shimla",	  "Murgo",		 "Achabal",	"Daksum",	 "Diskit",		"Dras",		"Gangtok",
							"Gulmarg",	  "Geyzing",  "Karzok",		 "Kargil",	"Lachen",	 "Lachung",		"Leh",		"Patnitop",
							"Pelling",	  "Sonamarg", "Tosamaidan", "Turtuk",	"Yusmarg",	 "Yuksom",		"Yumthang", "Antsirabe",
							"Ifrane",	  "Jos",		  "Bandarban",	 "Jaflong", "Rangamati", "Sreemangal", "Guling",	"Bokor",
							"Mogan",		  "Kuliang",  "Solok",		 "Tomohon", "Cameron",	 "Fraser",		"Genting",	"Maxwell",
							"Penang",	  "Thandong", "Tagaytay",	 "Da Lat",	"Sa Pa",		 "Ba Na",		"Bandipur", "Tansen",
							"Nagarkot",	  "Daman",	  "Sarangkot",	 "Jomsom",	"Tamghas",	 "Simikot",		"Behrain",	"Kalam",
							"Chitral",	  "Ziarat",	  "Hunza",		 "Skardu",	"Astore",	 "Gilgit",		"Bhurban",	"Murree"
];
var DistrictNames = [ "Montmarte", "Shinjuku", "Colaba", "Belleville", "Garrison", "Trastevere", "Inchicore", "Entrevias",
							 "Mayfair", "Pererenan", "Yarraville", "Sodermalm", "Gangnam", "Laureles", "Gulou", "Gombe",
							 "Anarkali", "Sultanahmet", "Patriki", "Pinheiros", "Kemang", "Zamalek", "Ingombota", "Polanco",
							 "Vanak", "Mansour", "Teusaquillo", "Recoleta", "Palermo", "Intramuros", "Barranco", "Sukhumvit",
							 "Bangsar", "Soho", "Danforth", "Masaki", "Hougang", "Sandton", "Bahan", "Zaisan",
							 "Hoankiem", "Chamkarmon", "Watchan", "Fitzroy", "Ponsonby", "Wellawatte", "Thamel", "Juffair",
							 "Samal", "Kubinka", "Vake", "Podil", "Praga", "Mitte", "Leopoldstadt", "Ikoyi",
							 "Almadies", "Agdal", "Altamira", "Noord", "Bellavista", "Barbican", "Marolles", "Kololo"
];

//-- MERCENARIES --

var FirstNames = [ "Johnny", "Danny", "Ossie", "Jimmy", "Davy", "Mickey", "Stevie", "Timmy",
						 "Ronnie", "Terry", "Sammy", "Eddie", "Georgie", "Bobby", "Denny", "Wally",
						 "Janie", "Sophie", "Lizzie", "Tessie", "Nellie", "Tammy", "Katie", "Teri",
						 "Connie", "Jeri", "Bonnie", "Cassie", "Edie", "Ellie", "Franny", "Penny"
];
//Unused- Willy, Kerry, Kenny
//Unused- Teri, Keri, Lori, Annie, Sherry, Sammie
/*
var LastNames = [ "Lave", "Leesti", "Orerve", "Diso", "Zaonce", "Reidquat", "Tionisia", "Isinor",
						"Ontiat", "Xeesle", "Que", "Tibedied", "Qube", "Leleer", "Biarge", "Zequerin",
						"Tiraor", "Rabedira", "Zaatxe", "Diusreza", "Teaatis", "Riinus", "Esbiza", "Ontimaxe",
						"Cebetela", "Ceedra", "Rizala", "Atriso", "Teanrebi", "Azaqu", "Retila", "Sotiqu"
];
*/
var LastNames = [ "Vale", "Steile", "Revore", "Osid", "Cazone", "Quadrite", "Siniotia", "Rosini",
						"Tantio", "Exsele", "Equ", "Beditedi", "Queb", "Erleel", "Garibe", "Quezerin",
						"Ratior", "Arabride", "Zataxe", "Zaderius", "Taistea", "Rinius", "Absize", "Maxonite",
						"Ecbeatle", "Dreace", "Azrial", "Soriat", "Beritane", "Azqua", "Traile", "Quisot"
];
//NOTE: derived from 'most popular names by country' Wiki search
var MaleNames = [ "Rachid", "Djamel", "Brahim", "Taha", "Hamza", "Karim", "Adama", "Bakary", "Sekou",
						"Beshoi", "Kirollos", "Fadi", "Petros", "Giorgis", "Markos", "Bandile", "Lethabo", "Samkeko",
						"Santiago", "Mateo", "Santino", "Daniel", "Dyllan", "Keven", "Joao", "Pedro", "Luiz",
						"Noah", "Liam", "Logan", "Raphael", "Nathan", "Leo", "Agustin", "Vicente", "Joaquin",
						"Sebastian", "Alejandro", "Jeronimo", "Ramon", "Javier", "Cesar", "Ian", "Diego", "Fabian",
						"Mason", "Oliver", "Jacob", "Bruno", "Francisco", "Rodrigo", "Cheng", "Feng", "Wen",
						"Wei", "Jie", "Hao", "Arjun", "Krishna", "Prakash", "Ori", "Noam", "Lavi",
						"Ariel", "Adi", "Yuval", "Julian", "Jude", "Amir", "Omri", "Salman", "Tamir",
						"Ren", "Haruki", "Ryo", "Sanzhar", "Miras", "Arsen", "Min-jun", "Joo-won", "Ji-hoon",
						"Somchai", "Somsak", "Prasert", "Noel", "Roan", "Pol", "Enzo", "Davit", "Arman",
						"Murad", "Samir", "Rashad", "Maksim", "Ivan", "Roman", "Lucas", "Arthur", "Victor",
						"Pavel", "Milos", "Dimitar", "Marko", "Costas", "Valdemar", "Lars", "Yanis", "Vedad",
						"Rasmus", "Kaspar", "Vaino", "Onni", "Edvin", "Luka", "Sava", "Finn", "Minik",
						"Marcel", "Dominik", "Gunnar", "Olaf", "Riccardo", "Edoardo", "Goran", "Dragan", "Dejan",
						"Damjan", "Jovan", "Zoran", "Kirill", "Berat", "Ismail"
];  //132
var FemaleNames = [ "Sara", "Aicha", "Meriem", "Fatma", "Maha", "Sahar", "Rania", "Zineb", "Imane",
						  "Marina", "Irene", "Hana", "Ruth", "Helen", "Lidya", "Amahle", "Faith", "Lesedi",
						  "Sofia", "Catalina", "Valentina", "Alysha", "Isabella", "Emily", "Clara", "Cecilia", "Alice",
						  "Francisca", "Antonia", "Patricia", "Olivia", "Aria", "Abigail", "Florence", "Rosalie", "Beatrice",
						  "Isidora", "Florencia", "Antonella", "Valeria", "Gabriela", "Salome", "Myrlande", "Judeline", "Esther",
						  "Ximena", "Zoe", "Mia", "Ramona", "Raquel", "Noemi", "Camila", "Ariana", "Luciana",
						  "Noor", "Thalia", "Jana", "Lan", "Li", "Shen", "Ying", "Lili", "Tingting",
						  "Maya", "Anaya", "Riya", "Zahra", "Leyla", "Narges", "Celine", "Eden", "Maya",
						  "Sakura", "Riko", "Himari", "Marie", "Jessica", "Christina", "Sunita", "Aasha", "Sita",
						  "Zara", "Sobia", "Farzana", "Althea", "Samantha", "Janine", "Seo-yun", "Min-seo", "Chae-won",
						  "Shu-fen", "Mei-ling", "Li-hua", "Carlota", "Martina", "Blanca", "Milena", "Nuray", "Polina",
						  "Darya", "Mila", "Kseniya", "Yasmine", "Lina", "Anastasija", "Katarina", "Tereza", "Freya",
						  "Isla", "Aurora", "Vesna", "Violeta", "Jelena", "Radmila", "Aoife", "Leonora", "Margarida",
						  "Tatiana", "Nina", "Valeria", "Veronika"
];  //121
