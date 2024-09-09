
var SpindleWords = [ "knickknacks", "nonchalance", "fabrication", "acclamation", "cohabitates", "singularity", "concurrence", "calligraphy",
							"termination", "persnickety", "reconnoitre", "demarcation", "beleaguered", "chronometer", "magnificent", "beneficiary",
							"abomination", "reminiscent", "caffeinated", "anticipated", "incinerated", "edification", "magnanimous", "combustible",
							"camaraderie", "peripatetic", "obfuscation", "palindromes", "maintenance", "hairstylist", "punctuality", "intelligent",
							"fabrication", "ignominious", "coruscating", "kleptomania", "kindhearted", "backstabbed", "calculating", "calibration",
							"perpetrator", "singularity", "fantabulous", "fairgrounds", "abnormality", "participant", "egalitarian", "femmefatale",
							"mountaineer", "acrimonious", "gastronomic", "reprimanded", "narcoleptic", "ideological", "dilapidated", "cacophonous",
							"machination", "callousness", "spokesmodel", "paperweight", "entertainer", "immigration", "landscaping", "needlepoint",
							"beleaguered", "information", "appropriate", "traditional", "responsible", "substantial", "opportunity", "eradication",
							"comfortable", "immediately", "complicated", "cornerstone", "highlighter", "cataclysmic", "rainforests",	"fascination",		//80
							"independent", "abracadabra", "rapscallion", "battlefield", "declaration", "sacramental", "egotistical", "serendipity",
							"generations", "candlelight", "electricity", "inscription", "hallucinate", "geopolitics", "electronics", "safecracker",
							"candlestick", "insouciance", "mathematics", "handwriting", "geometrical", "scrumptious", "legislation", "deferential",
							"constipated", "handcrafted", "oncloudnine", "recognition", "reciprocate", "neurologist", "illustrated", "enchantress",
							"imagination", "felicitated", "sarcophagus", "counterpart", "embroidered", "synchronize", "criminology", "standoffish",
							"housekeeper", "bullfighter", "misanthrope", "compression", "amalgamated", "infiltrator", "malapropism", "dissolution",
							"skeletonkey", "ingredients", "titillation", "dissociated", "centripetal", "implication", "suppressant", "concentrate",
							"loudmouthed", "nondescript", "fluorescent", "regrettable", "billionaire", "frustration", "stockbroker", "connoisseur",
							"gesticulate", "tracheotomy", "subcontract", "designation", "renaissance", "contentment", "streamlined", "cylindrical",
							"information", "draughtsman", "breadwinner", "aerodynamic", "masculinity", "emancipated", "lightweight", "bibliophile",		//160
							"speedometer", "outmaneuver", "whereabouts", "godforsaken", "tonsillitis", "metaphysics", "trustworthy", "disembodied",
							"stipulation", "considerate", "inheritance", "planetarium", "impeachment", "humiliation", "scaffolding", "dreadnought",
							"superiority", "intentional", "sleepwalked", "demonstrate", "transparent", "dislocation", "preparation", "apocalyptic"
];

// "tamperproof", "tattletales", "technophile", "abstraction", "belligerent", "bellybutton", "malfunction", "opportunity", "perfunctory"
// "defenceless", "electrician", "fashionable", "illuminated", "malpractice", "omniscience", "orchestrate", "scattershot"
// "fingerprint", "firecracker", "geomagnetic", "illusionist", "leapfrogged", "negotiation", "competition", "scholarship", "telecommute"
// "nightingale", "indubitably", "scuttlebutt", "optometrist", "complacency", "paratrooper", "temperament", "temperature", "tempestuous"
// "partnership", "rattlesnake", "accommodate", "accountable", "accumulated", "acupuncture", "adolescence", "ambiguities"
// "affectation", "afficionado", "altercation", "ameliorated", "anachronism", "androgynous", "annihilated", "antibiotics", "aphrodisiac"
// "application", "appointment", "arbitration", "archaeology", "archipelago", "aristocracy", "arrangement", "assimilated", "association", "atmospheric"
// "authorities", "bittersweet", "blockbuster", "bombardment", "brainwashed", "brotherhood", "bulletproof"
// "bureaucracy", "butterflies", "cartography", "catastrophe", "catchphrase", "caterpillar", "cauliflower", "celebration", "centrifugal"
// "certifiable", "certificate", "chairperson", "chamberlain", "chambermaid", "charismatic", "cheerleader", "cheesesteak", "circulation"
// "citizenship", "clandestine", "cliffhanger", "clothesline", "cockroaches", "coefficient", "coffeemaker", "coincidence", "collaborate", "collectable"
// "colonialism", "combination", "comeuppance", "commandment", "commiserate", "commodities", "commonplace", "communicate", "compartment", "compilation"
// "complacency", "comportment", "composition", "compunction", "computation", "concordance", "condolences", "condominium" 
// "confederacy", "consecrated", "consignment", "consistency", "consolation", "conspicuous", "constituent", "consumption"
// "contaminant", "contemplate", "contentious", "contingency", "contraption", "contributor", "conurbation", "cooperation", "coordinated"
// "coordinates", "copyrighted", "corporation", "correlation", "corroborate", "cosmetology", "counterfeit", "countryside", "credentials", "crematorium"
// "crestfallen", "criminalist", "crowdfunded", "cybernetics", "degradation", "dehydration", "demographic", "denunciated",
// "dereliction", "dermatology", "description", "desperation", "destabilize", "destination", "destitution", "destruction", "deteriorate",
// "detrimental", "diagnostics", "directorate", "disciplined", "discography", "discredited", "discrepancy", "disembarked", "dysfunction", 
// "disgraceful", "disgruntled", "disinfected", "disobedient", "disoriented", "displeasure", "disposition", "disregarded", "disseminate", 
// "distasteful", "distinction", "distinguish", "distraction", "ditchdigger", "documentary",
// "dumbfounded", "duplication", "embellished", "empowerment", "enchantment", "endorsement", "engineering", "enhancement", "enlightened", "enunciation", 
// "firefighter", "flamboyance", "flirtatious", "floodlights", "forbearance", "foreclosure", "formalities", "forthcoming", "fragmentary",
// "freemasonry", "fundamental", "furthermore", "established", "ghostwriter", "gingerbread", "grandparent",
// "grandfather", "grandmaster", "grandmother", "granularity", "grasshopper", "haemoglobin", "hibernation", "hitchhiking", "honeysuckle", "housebroken",
// "hydrocarbon", "impersonate", "impertinent", "implausible", "impractical", "impregnable", "incarcerate",
// "incarnation", "incinerator", "inclination", "incompetent", "incongruous", "incontinent", "incorporate", "incredulous", "incremental", "indifferent",
// "indigestion", "indignation", "indomitable", "industrious", "ineffectual", "inefficient", "infantryman", "infatuation", "inferiority", "infestation",
// "influential", "infomercial", "innumerable", "inopportune", "insecticide", "insincerity",
// "insinuation", "inspiration", "instability", "installment", "instigation", "institution", "instruction", "integration", "intercessor",
// "intermingle", "interpreter", "intimidated", "intolerable", "intractable", "iridescence", "irrefutable", "libertarian", "lightheaded",
// "liposuction", "loudspeaker", "lubrication", "luminescent", "mantelpiece", "marginalize", "marketplace", "marshmallow",
// "masterpiece", "mathematics", "matriculate", "matrimonial", "meaningless", "measurement", "megalomania", "melancholic", "merchandise", "meritocracy",
// "mesmerising", "meteorology", "methodology", "microcredit", "microscopic", "millionaire", "millisecond", "minesweeper", 
// "misconstrue", "misinformed", "mockingbird", "moisturizer", "mollycoddle", "moneylender", "monstrosity", "motorsports", "mountaintop", "munificence",
// "musclebound", "mustachioed", "nonetheless", "nonsensical", "nourishment", "orthoscopic", "oscillating", "osteopathic", "outdoorsman",
// "outnumbered", "outstanding", "peacekeeper", "peculiarity", "percentages", "perceptible", "perforation", "performance", "pericardium", "peripatetic",
// "permutation", "persecution", "persistence", "personality", "personalize", "personified", "pescatarian", "pessimistic", "photocopier", "photography",
// "physicality", "placeholder", "policewoman", "pollination", "poltergeist", "pontificate", "powerbroker", "predecessor", "predestined",
// "predicament", "predictable", "predisposed", "predominant", "preferences", "prehistoric", "preliminary", "premeditate", "premonition", "prepackaged",
// "pressurized", "prestigious", "presumption", "pretentious", "problematic", "proceedings", "procurement", "proficiency", "progression",
// "prohibition", "proletarian", "proletariat", "proliferate", "promulgated", "proprietary", "prosecution", "protagonist", "psychedelic", "pterodactyl",
// "punctuation", "putrescence", "reciprocate", "reciprocity", "reclamation", "recruitment", "rectangular", "recuperated", "reenactment", "refreshment",
// "refrigerate", "refurbished", "regurgitate", "reincarnate", "reliability", "remembrance", "remonstrate", "remorseless",
// "renumerated", "repetitious", "replacement", "resemblance", "resignation", "resourceful", "respectable", "respiration", "resplendent", "restitution",
// "restriction", "retaliation", "retribution", "romanticise", "rudimentary", "searchlight", "segregation", "seismograph", "sensational", "sensibility",
// "sentimental", "shortcoming", "shuttlecock", "significant", "smithereens", "snakebitten", "snowboarder", "sociologist", "speculation",
// "spendthrift", "sponsorship", "spontaneous", "spreadsheet", "stagestruck", "stakeholder", "steamrolled", "stenography", "stigmatized",
// "stimulating", "storyteller", "strategized", "sublimation", "submersible", "subordinate",
// "subsistence", "substandard", "subtraction", "subtropical", "sugarcoated", "supermarket", "supposition", "susceptible",
// "suspenseful", "sustainable", "sweepstakes", "switchblade", "sympathetic", "syndication", "terminology", "theological", "theoretical", "thermometer",
// "thickheaded", "thoughtless", "thunderbolt", "titillating", "toastmaster", "torchbearer", "touchscreen",
// "trailblazer", "transaction", "transformer", "transfusion", "transmitter", "transponder", "transporter", "treacherous", "trendsetter",
// "trepidation", "triangulate", "tribulation", "triceratops", "troublesome", "unbeknownst", "unblemished", "unbreakable", "uncertainty",
// "unconscious", "unflappable", "unfortunate", "unfulfilled", "unification", "unimportant", "uninhibited", "uninitiated", "unmitigated", "unpalatable",
// "unrealistic", "unrelenting", "unrepentant", "unsolicited", "unspecified", "untouchable", "unvarnished", "unwillingly", "utilitarian", "wheelbarrow",
// "wherewithal", "wintergreen", "woodchipper", "wrongheaded"
