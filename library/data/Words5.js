//+1
var Words5a = [ "aback", "abase", "abate", "abbey", "abbot", "abhor", "abide", "abode", "abort", "about", "above", "abuse", "abyss", "ached",
					 "acorn", "acrid", "acute", "adage", "adapt", "adder", "adept", "adieu", "admit", "adopt", "adore", "adorn", "adult", "aegis",
					 "aerie", "affix", "afoot", "after", "again", "agape", "agate", "agent", "agile", "aglow", "agony", "agree", "ahead", "aided",
					 "ailed", "aimed", "aisle", "alarm", "album", "alder", "alert", "algae", "alias", "alibi", "alien", "align", "alike", "alive",
					 "allay", "alley", "allot", "allow", "alloy", "aloft", "alone", "along", "aloof", "aloud", "alpha", "altar", "alter", "amass",
					 "amaze", "amber", "ambit", "amble", "amend", "amiss", "amity", "among", "ample", "amuse", "angel", "anger", "angle", "angry",
					 "angst", "ankle", "annex", "annoy", "annul", "anode", "antsy", "anvil", "aorta", "apace", "apart", "apple", "apply", "aspen",
					 "apron", "arena", "argon", "argot", "argue", "arise", "armed", "aroma", "arrow", "arson", "artsy", "ascot", "ashen", "aside", "asked",
					 "askew", "assay", "asset", "aster", "atlas", "atoll", "atone", "attic", "audio", "audit", "aught", "augur", "aural", "avail",
					 "avert", "avoid", "await", "awake", "award", "aware", "awash", "awful", "awoke", "axiom", "azure"
];

var Words5b = [ "bacon", "badge", "badly", "bagel", "baggy", "baize", "baker", "balky", "balmy", "balsa", "banal", "bandy", "banjo",
					 "barge", "barmy", "baron", "based", "basic", "basil", "basin", "basis", "baste", "bathe", "batik", "baton", "batty",
					 "baulk", "bawdy", "bayou", "beach", "beady", "beard", "beast", "bebop", "beech", "beefy", "befit", "began", "beget", "begin",
					 "begot", "begun", "beige", "being", "belay", "belie", "belle", "belly", "below", "bench", "beret", "berry", "berth", "beset",
					 "betel", "bevel", "bible", "bidet", "bigot", "biker", "bilge", "binge", "bingo", "biped", "birch", "birth", "bison",
					 "black", "blade", "blame", "bland", "blank", "blare", "blast", "blaze", "bleak", "bleat", "bleed", "bleep", "blend", "bless",
					 "blimp", "blind", "blink", "bliss", "blitz", "bloat", "block", "blood", "bloom", "blown", "blues", "bluff", "blunt", "blurb",
					 "blurt", "blush", "board", "boast", "bogey", "bogus", "bongo", "bonus", "boost", "booth", "booty", "booze", "boozy", "borax",
					 "bored", "borne", "bossy", "botch", "bough", "bound", "bowel", "bower", "boxed", "boxer", "brace", "braid", "brain", "brand",
					 "brash", "brass", "brave", "bravo", "brawl", "brawn", "bread", "break", "breed", "briar", "bribe", "brick", "bride", "brief",
					 "brine", "bring", "brink", "briny", "brisk", "broad", "broil", "broke", "brood", "brook", "broom", "broth", "brown", "brunt",
					 "brush", "brute", "buddy", "budge", "buggy", "build", "built", "bulge", "bulky", "bully", "bumpy", "bunch", "bunny", "burly",
					 "burnt", "burst", "bushy", "butch", "buyer"
];

var Words5c = [ "cabal", "caber", "cabin", "cable", "cache", "cadet", "cadge", "cagey", "cairn", "caked", "calyx", "camel", "cameo", "canal",
					 "candy", "canny", "canoe", "canon", "canto", "caper", "carat", "cared", "carer", "cargo", "carol", "carry", "carve", "cased",
					 "caste", "catch", "cater", "catty", "cause", "caved", "cavil", "cease", "cedar", "cello", "chafe", "chaff", "chain", "chair",
					 "chalk", "champ", "chant", "chaos", "chaps", "charm", "chart", "chase", "chasm", "cheap", "cheat", "check", "cheek", "cheep",
					 "cheer", "chess", "chest", "chewy", "chick", "chide", "chief", "chide", "chill", "chime", "china", "chink", "chirp", "choir",
					 "choke", "chomp", "chord", "chore", "chose", "chuck", "chump", "chunk", "churn", "chute", "cider", "cigar", "cinch", "circa",
					 "cited", "civet", "civic", "civil", "claim", "clamp", "clash", "clasp", "class", "clean", "clear", "cleat", "cleft", "clerk",
					 "click", "cliff", "climb", "clime", "cling", "clink", "cloak", "clock", "clone", "close", "cloth", "cloud", "clout", "clove",
					 "clown", "cluck", "clump", "clung", "clunk", "coach", "coast", "cobra", "cocky", "cocoa", "coded", "colic", "colon", "comet",
					 "comic", "comma", "conch", "conga", "cooed", "copra", "copse", "corgi", "corny", "corps", "couch", "cough", "could", "count",
					 "coupe", "court", "coven", "cover", "covet", "cowed", "cower", "crack", "craft", "cramp", "crane", "crank", "craps", "crash",
					 "crass", "crate", "crave", "crawl", "craze", "crazy", "creak", "cream", "credo", "creed", "creek", "creel", "creep", "crepe",
					 "crept", "crest", "crick", "cried", "crier", "crime", "crimp", "crisp", "croak", "crock", "croft", "crone", "crony",
					 "crook", "croon", "cross", "croup", "crowd", "crown", "crude", "cruel", "cruet", "crumb", "crush", "crust", "crypt", "cubed",
					 "cubic", "cumin", "cupid", "cured", "curio", "curly", "curry", "curse", "curve", "curvy", "cushy", "cutie", "cycle", "cynic"
];

var Words5d = [ "dacha", "daddy", "daily", "dairy", "daisy", "dally", "dance", "dandy", "datum", "daunt", "dazed", "dealt", "death", "debar",
					 "debit", "debug", "debut", "decal", "decay", "decor", "decoy", "decry", "defer", "deify", "deign", "deity", "delay", "delta",
					 "delve", "demon", "demur", "denim", "dense", "depot", "depth", "derby", "deter", "deuce", "devil", "diary", "dicey", "digit",
					 "dimly", "diner", "dingo", "dingy", "dinky", "diode", "dirge", "dirty", "disco", "ditch", "ditto", "ditty", "divan", "diver",
					 "divot", "dizzy", "dodge", "dodgy", "dogma", "doily", "doing", "dolly", "domed", "donor", "donut", "dorky", "doted", "dotty",
					 "doubt", "dough", "douse", "dowdy", "downs", "downy", "dowry", "dowse", "doyen", "dozed", "dozen", "draft", "drain", "drake",
					 "drama", "drank", "drape", "drawl", "drawn", "dread", "dream", "dregs", "dress", "dried", "drift", "drill", "drink", "drive",
					 "droll", "drone", "drool", "droop", "dross", "drove", "drown", "druid", "drunk", "dryad", "dryer", "dryly", "duchy", "dummy",
					 "dumps", "dunce", "duped", "dusky", "dusty", "duvet", "dwarf", "dwell", "dying", 
];

var Words5e = [ "eager", "eagle", "early", "earth", "easel", "eaten", "ebony", "edged", "edict", "edify", "eerie", "egret", "eight", "eject",
					 "elbow", "elder", "elect", "elegy", "elfin", "elide", "elite", "elope", "elude", "embed", "ember", "emote", "empty",
					 "enact", "ended", "endow", "enemy", "enjoy", "ennui", "ensue", "enter", "entry", "envoy", "epoch", "epoxy", "equal", "equip",
					 "erase", "erect", "erode", "error", "erupt", "essay", "ether", "ethic", "ethos", "evade", "event", "every", "evict", "evoke",
					 "exact", "exalt", "excel", "exert", "exile", "exist", "expel", "extra", "exude", "exult", "eyrie"
];

var Words5f = [ "fable", "facet", "faded", "faint", "fairy", "faith", "faked", "false", "famed", "fancy", "farce", "fared", "fatal", "fated",
					 "fault", "fauna", "feast", "feign", "feint", "felon", "femur", "fence", "feral", "ferry", "fetal", "fetch", "fetid",
					 "fever", "fewer", "fibre", "field", "fiend", "fiery", "fifth", "fifty", "fight", "filed", "filly", "filmy", "filth", "final",
					 "finch", "fined", "finer", "fired", "first", "firth", "fishy", "fixed", "fixer", "fizzy", "flack", "flail", "flair", "flake",
					 "flaky", "fizzy", "flack", "flail", "flair", "flake", "flaky", "flame", "flank", "flare", "flash", "flask", "fleck", "fleet",
					 "flesh", "flick", "fling", "flint", "flirt", "float", "flock", "flood", "floor", "flora", "floss", "flour", "flout", "flown",
					 "fluff", "fluid", "fluke", "flung", "flunk", "flush", "flute", "flyer", "foamy", "focal", "focus", "foggy", "foist",
					 "folio", "folly", "foray", "force", "forge", "forte", "forth", "forty", "forum", "found", "fount", "foyer", "frail", "frame",
					 "frank", "fraud", "freak", "freed", "fresh", "friar", "fried", "frill", "frisk", "frock", "frond", "front", "frost", "froth",
					 "frown", "froze", "fruit", "fryer", "fudge", "fugue", "fully", "fumed", "fumes", "funky", "funny", "furry", "fused", "fussy",
					 "futon", "fuzzy"
];

var Words5g = [ "gable", "gaffe", "gamed", "gamma", "gamut", "gaped", "gassy", "gated", "gaudy", "gauge", "gaunt", "gauze", "gavel", "gazed",
					 "gecko", "genie", "genre", "genus", "ghost", "ghoul", "giant", "giddy", "girth", "given", "glade", "gland", "glare", "glass",
					 "glaze", "gleam", "glean", "glide", "glint", "glitz", "gloat", "globe", "gloom", "glory", "gloss", "glove", "glued", "gnash",
					 "gnome", "godly", "gofer", "going", "goner", "goofy", "goose", "gorge", "gorse", "gouge", "gourd", "grace", "grade", "graft",
					 "grail", "grain", "grand", "grant", "grape", "graph", "grasp", "grass", "grate", "grave", "gravy", "graze", "great", "greed",
					 "green", "greet", "grief", "grill", "grime", "grimy", "grind", "gripe", "grist", "grits", "groan", "groin", "groom", "grope",
					 "gross", "group", "grout", "grove", "growl", "grown", "gruel", "gruff", "grunt", "guano", "guard", "guava", "guess", "guest",
					 "guide", "guild", "guilt", "guise", "gulch", "gully", "gummy", "gusto", "gusty", "gutsy", "gypsy"
];

var Words5h = [ "habit", "haiku", "hairy", "halon", "halve", "handy", "happy", "hardy", "harpy", "harry", "harsh", "haste", "hasty", "hatch",
					 "hated", "haunt", "haven", "havoc", "hazel", "heady", "heart", "heath", "heave", "heavy", "hedge", "hefty", "heist", "helix",
					 "hello", "hence", "henna", "heron", "hertz", "hiker", "hilly", "hinge", "hired", "hitch", "hoard", "hoary", "hobby", "hoist",
					 "holly", "homey", "honey", "hoped", "horde", "horse", "hotel", "hotly", "hound", "house", "hovel", "hover", "human", "humid", "hunch",
					 "hunky", "hurry", "husky", "hutch", "hyena", "hyped"
];

var Words5i = [ "icing", "ideal", "idiot", "idler", "idyll", "igloo", "image", "imbue", "impel", "imply", "inane", "incur", "index", "inept",
					 "inert", "infer", "ingot", "inlay", "inlet", "input", "inset", "inter", "inure", "ionic", "irate", "irked", "irony", "islet", "issue",
					 "itchy", "ivory"
];

var Words5j = [ "jaded", "jaunt", "jeans", "jelly", "jerky", "jetty", "jewel", "jiffy", "joint", "joker", "jolly", "joule", "joust",
					 "judge", "juice", "juicy", "jumbo", "jumpy", "juror"
];

var Words5k = [ "kaput", "karma", "kayak", "kebab", "khaki", "kinky", "kiosk", "knack", "knave", "knead", "kneel", "knell", "knife", "knock", "knoll",
					 "known", "koala", "krill"
];

var Words5l = [ "label", "laced", "laden", "ladle", "lager", "lance", "lanky", "lapse", "larch", "large", "larva", "laser",
					 "lasso", "latch", "later", "latex", "lathe", "latte", "laugh", "layer", "leach", "leafy", "leaky", "leant", "leapt",
					 "learn", "lease", "leash", "least", "leave", "ledge", "leech", "leery", "legal", "lemon", "lemur", "leper", "levee", "level",
					 "lever", "libel", "liege", "light", "liked", "liken", "lilac", "limbo", "limit", "lined", "linen", "liner", "lingo", "lithe", "liven",
					 "liver", "livid", "llama", "lobby", "local", "locus", "lodge", "lofty", "logic", "loner", "loony", "loose",
					 "lorry", "loser", "lotus", "louse", "lousy", "loved", "lover", "lower", "lowly", "loyal", "lucid", "lucky", "lucre",
					 "lumpy", "lunar", "lunch", "lunge", "lurch", "lurid", "lusty", "lymph", "lynch", "lyric"
];

var Words5m = [ "macaw", "macho", "madam", "madly", "mafia", "magic", "magma", "major", "maker", "mangy", "mania", "manic", "manly",
					 "manna", "manor", "maple", "march", "marry", "marsh", "mason", "match", "mated", "matte", "mauve", "maxim", "maybe",
					 "mayor", "meant", "meaty", "medal", "media", "medic", "melee", "melon", "mercy", "merge", "merit", "merry", "messy", "metal",
					 "meted", "meter", "metro", "midge", "midst", "might", "milky", "mimed", "mimic", "mince", "mined", "miner", "mingy", "minor",
					 "minty", "minus", "mired", "mirth", "miser", "misty", "mitre", "mixed", "mixer", "mocha", "modal", "model", "modem", "mogul",
					 "moist", "molar", "money", "month", "moody", "moose", "moped", "moral", "mores", "moron", "mossy", "motel", "motif", "motor",
					 "motto", "mould", "mound", "mount", "mourn", "mouse", "mousy", "mouth", "moved", "mover", "movie", "mower", "moxie", "mucus",
					 "muddy", "muggy", "mulch", "mummy", "munch", "mural", "murky", "mused", "mushy", "music", "musty", "muted", "mynah", "myrrh"
];

var Words5n = [ "nadir", "naive", "nanny", "nappy", "nasal", "nasty", "naval", "navel", "nears", "needy", "neigh", "nerve", "nervy",
					 "nests", "never", "newly", "nexus", "niche", "niece", "nifty", "night", "nippy", "noble", "noise", "noisy",
					 "nomad", "noone", "noose", "north", "notch", "noted", "novel", "nudge", "nurse", "nutty", "nylon", "nymph"
];

var Words5o = [ "oaken", "oasis", "obese", "occur", "ocean", "ochre", "octet", "oddly", "odium", "odour", "offal", "offer", "often", "ogled",
					 "oiled", "olden", "olive", "omega", "onion", "onset", "oozed", "opera", "opium", "opted", "optic", "orate", "orbit", "order",
					 "organ", "other", "otter", "ought", "ounce", "outdo", "outer", "ovary", "overt", "owing", "owned", "owner", "ozone"
];

var Words5p = [ "paced", "paean", "pagan", "pager", "paint", "paled", "paler", "palsy", "panda", "panel", "panic", "pansy", "pants", "papal",
					 "paper", "pared", "parch", "parka", "parry", "parse", "party", "passe", "pasta", "paste", "pasty", "patch", "patio", "patsy",
					 "patty", "pause", "paved", "pawed", "peace", "peach", "peaky", "pearl", "pecan", "pedal", "peeve", "penal",
					 "pence", "penny", "peony", "perch", "peril", "perky", "pesky", "petal", "petty", "phase", "phial", "phone", "photo", "piano",
					 "picky", "piece", "piety", "pilot", "pinch", "pious", "piper", "pique", "pitch", "pithy", "piton", "pivot", "pixel", "pixie",
					 "pizza", "place", "plaid", "plain", "plait", "plane", "plank", "plant", "plate", "plaza", "plead", "pleat", "plonk", "pluck",
					 "plumb", "plume", "plunk", "plush", "pluto", "poach", "point", "poise", "poked", "poker", "polar", "polio", "polka", "polyp",
					 "pooch", "poppy", "porch", "posed", "poser", "posit", "posse", "potty", "pouch", "pound", "pouty", "power", "prank", "prawn",
					 "preen", "press", "prick", "pride", "prime", "primp", "print", "prior", "prise", "prism", "privy", "prize", "probe", "prone",
					 "prong", "proof", "prose", "proud", "prove", "prowl", "proxy", "prude", "prune", "pudgy", "puffy", "pulpy", "pulse", "punch",
					 "pupil", "puppy", "puree", "purge", "purse", "pushy", "putty", "pygmy", "pylon"
];

var Words5q = [ "quack", "quaff", "quail", "quake", "qualm", "quark", "quart", "quash", "queen", "queer", "quell", "query", "quest", "quick",
					 "quiet", "quiff", "quill", "quilt", "quirk", "quite", "quota", "quote"
];

var Words5r = [ "rabid", "racer", "radar", "radio", "radon", "raged", "raids", "rails", "rains", "rainy", "raise", "raked", "rally", "ranch",
					 "range", "rangy", "rapid", "raspy", "ratio", "ratty", "raved", "raven", "rayon", "razed", "razor", "reach", "react", "ready",
					 "realm", "rearm", "rebel", "rebut", "recap", "recce", "recur", "reedy", "refer", "regal", "rehab", "reign", "relax", "relay",
					 "relic", "remit", "remix", "renew", "repay", "repel", "reply", "rerun", "reset", "resin", "retro", "retry", "reuse", "revel",
					 "revue", "rhyme", "rider", "rifle", "right", "rigid", "rinse", "ripen", "risky", "ritzy", "rival", "riven", "river", "rivet",
					 "roach", "roast", "robed", "robin", "robot", "rocky", "rodeo", "rogue", "roomy", "roost", "roped", "rotor", "rouge", "rough",
					 "round", "rouse", "roust", "route", "rover", "rowdy", "rowed", "royal", "ruddy", "rugby", "ruled", "ruler", "rumba", "rummy",
					 "runny", "rural", "rusty"
];

var Words5s = [ "sable", "sabre", "safer", "saggy", "saint", "salad", "sally", "salon", "salsa", "salty", "salve", "salvo", "samba",
					 "sandy", "saner", "sappy", "sassy", "sated", "satyr", "sauce", "saucy", "sauna", "saute", "saved", "sawed", "scald",
					 "scale", "scalp", "scaly", "scamp", "scant", "scare", "scarf", "scary", "scene", "scent", "scion", "scoff", "scold",
					 "scone", "scoop", "scoot", "scope", "score", "scorn", "scour", "scout", "scowl", "scram", "scrap", "screw", "scrub", "scrum",
					 "scuff", "scull", "seamy", "sedan", "sedge", "seedy", "segue", "seize", "sense", "sepia", "serum", "serve",
					 "seven", "sewed", "sewer", "shack", "shade", "shady", "shaft", "shake", "shaky", "shale", "shall", "shame", "shank",
					 "shape", "share", "shark", "sharp", "shave", "shawl", "sheaf", "shear", "sheen", "sheep", "sheer", "sheet", "shelf", "shell",
					 "sherd", "shied", "shift", "shine", "shiny", "shire", "shirk", "shirt", "shoal", "shock", "shone", "shock", "shoot", "shore",
					 "shorn", "short", "shout", "shove", "shown", "showy", "shred", "shrew", "shrub", "shrug", "shunt", "shush", "siege", "sieve",
					 "sight", "silky", "silly", "silty", "since", "singe", "siren", "sissy", "sitar", "sixth", "sixty", "skate", "skier", "skiff",
					 "skill", "skimp", "skirt", "skulk", "skull", "skunk", "slack", "slain", "slake", "slang", "slant", "slash", "slate", "slave",
					 "sleek", "sleep", "sleet", "slept", "slice", "slick", "slide", "slime", "slimy", "sling", "slink", "sloop", "slope", "slosh",
					 "sloth", "slung", "slurp", "slush", "smack", "small", "smart", "smash", "smear", "smell", "smelt", "smirk", "smite", "smith",
					 "smock", "smoky", "smote", "snack", "snafu", "snail", "snake", "snare", "snarl", "sneak", "sneer", "snide", "sniff", "snipe",
					 "snoop", "snore", "snort", "snout", "snowy", "snuck", "snuff", "soapy", "sober", "softy", "soggy", "solar", "solid", "solve",
					 "sonar", "soppy", "sorry", "sound", "souse", "sowed", "space", "spade", "spank", "spare", "spark", "spasm", "spate", "spawn",
					 "speak", "spear", "speck", "speed", "spell", "spend", "spice", "spicy", "spied", "spike", "spiky", "spill", "spine", "spire",
					 "spite", "splat", "splay", "split", "spoil", "spoke", "spoof", "spook", "spool", "spoon", "spore", "sport", "spout",
					 "spray", "spree", "spume", "spunk", "spurn", "spurt", "squad", "squat", "squib", "squid", "stack", "staff", "stage", "staid",
					 "stain", "stair", "stake", "stale", "stalk", "stall", "stamp", "stand", "stank", "stare", "stark", "start", "stash", "state",
					 "stave", "stead", "steak", "steal", "steam", "steed", "steel", "steep", "steer", "stern", "stick", "stiff", "still", "stilt",
					 "sting", "stint", "stoat", "stock", "stoic", "stoke", "stole", "stomp", "stone", "stony", "stood", "stole", "stoop", "store",
					 "stork", "storm", "story", "stout", "stove", "strap", "straw", "stray", "strip", "strop", "strum", "strut", "stuck", "study",
					 "stuff", "stump", "stung", "stunk", "stunt", "style", "suave", "suede", "sugar", "suite", "sulky", "sully", "sunny", "super",
					 "surge", "surly", "sushi", "swain", "swami", "swamp", "swank", "sward", "swarm", "swear", "sweat", "sweep", "sweet", "swell",
					 "swept", "swift", "swill", "swine", "swing", "swipe", "swirl", "swish", "swoon", "swoop", "sword", "swore", "sworn", "swung",
					 "synod", "syrup"
];

var Words5t = [ "tabby", "table", "taboo", "tacit", "tacky", "taffy", "taint", "taken", "tally", "talon", "tamed", "tamer", "tangy",
					 "tango", "taped", "taper", "tardy", "tarot", "tarry", "taste", "tasty", "taunt", "taupe", "tawny", "taxed", "teach", "teary",
					 "tease", "teeth", "tempo", "tempt", "tenet", "tenor", "tense", "tenth", "tepid", "terse", "testy", "thank", "theft",
					 "their", "theme", "there", "these", "thick", "thief", "thigh", "thing", "think", "third", "thong", "thorn", "those", "three",
					 "throb", "throw", "thumb", "thump", "thyme", "tiara", "tibia", "tidal", "tiger", "tight", "tilde", "tiled", "timed", "timer",
					 "timid", "tinge", "tinny", "tipsy", "tired", "titan", "tithe", "title", "tizzy", "toady", "toast", "today", "token", "tonal",
					 "toner", "tongs", "tonic", "tonne", "tooth", "topaz", "topic", "torch", "torso", "total", "totem", "touch", "tough", "towel",
					 "tower", "toxic", "toxin", "trace", "track", "tract", "trade", "trail", "train", "trait", "tramp", "trash", "trawl", "tread",
					 "treat", "trend", "trial", "tribe", "trice", "trick", "tried", "trier", "trill", "tripe", "trite", "troll", "troop", "trope",
					 "trout", "trove", "truce", "truck", "truly", "trump", "trunk", "truss", "trust", "truth", "tryst", "tubby", "tuber", "tulip",
					 "tummy", "tuned", "tuner", "tunic", "tutor", "twang", "tweak", "tweed", "tweet", "twerp", "twice", "twine", "twirl", "twist",
					 "typed"
];

var Words5u = [ "udder", "ulcer", "umber", "uncle", "uncut", "under", "undue", "unfit", "unify", "union", "unite", "unity", "unlit", "unmet",
					 "untie", "until", "unwed", "unzip", "upset", "urban", "urged", "usage", "usher", "usual", "usurp", "usury", "utter"
];

var Words5v = [ "vague", "valet", "valid", "value", "valve", "vapid", "vault", "vegan", "venal", "venom", "venue", "verge", "verse", "verve",
					 "vexed", "vibes", "vicar", "video", "vigil", "villa", "vinyl", "viola", "viper", "viral", "virgo", "virus", "visit", "visor",
					 "vista", "vital", "vivid", "vixen", "vocal", "vodka", "vogue", "voice", "voted", "voter", "vouch", "vowel", "vying"
];

var Words5w = [ "wafer", "wager", "wagon", "waist", "waive", "wally", "waltz", "waste", "watch", "water", "waved", "waver", "waxen", "wears",
					 "weary", "weave", "weepy", "weigh", "weird", "whack", "whale", "wharf", "wheat", "wheel", "whelp", "where", "which",
					 "whiff", "while", "whine", "whirl", "whirr", "whisk", "white", "whole", "whoop", "whorl", "whose", "widen", "wider",
					 "widow", "width", "wield", "wiles", "wince", "winch", "windy", "wined", "wiped", "wiper", "wired", "wiser", "wispy", "witch",
					 "witty", "woken", "woman", "woozy", "wordy", "world", "worry", "worse", "worst", "worth", "would", "wound", "woven", "wowed",
					 "wrack", "wrath", "wreak", "wreck", "wrest", "wring", "wrist", "write", "wrong", "wrote", "wrung"
];

var Words5y = [ "yacht", "yearn", "yeast", "yield", "yodel", "yokel", "young", "youth", "yummy"
];

var Words5z = [ "zebra", "zesty", "zippy", "zonal", "zoned"
];
