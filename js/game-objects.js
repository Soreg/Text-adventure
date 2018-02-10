/* -- GAME OBJECTS -- */

/*
* == INCLUDES ==
* -- Scenes -- (Section, large)
* -- Items (Section, large)
* -- Monsters (Section, Large)
*
*
*/

//---------------------------------//

/* -- SCENES -- */

/*
* 1: Scene01 - Intro / Welcome - Input(name)
* 2: Scene02 - Initial Path 
* 3: City
* 4: Church
* 5: Shop
* 6: Inn
* 7: Forest
* 8: Holy keep
* 9: Prayer room
*/

//---------------------------------//

/* -- ITEMS -- */

/*
* 1: Minor health potion
* 2: Health potion
* 3: Big health potion
* 4: Magicka potion
* 5: Stamina potion
*/

//---------------------------------//

/* -- MONSTERS -- */

/*
* 1: Trek (lvl 1-5)
* 2: Trukit (lvl 1-5)
* 3: Chaba (lvl 1-5)
* 4: Katar (lvl 1-5)
* 5: Beshy (lvl 1-5)
*/

//---------------------------------//

//===================================//
//===================================//

// CompareTo variables (first visits)
var nimbaFirstVisit = true, alkarathFirstVisit = true, nimbaForestFirstVisit = true;


/* === SCENES === */

//1: Scene01 - Intro scene
var Scene01 = {
  sceneName: "Welcome, Adventurer",
  sceneText: [
    "Welcome adventurer, to the land of Kashak." ,
    "This is a game of mystery, combat, quests, leveling, trading and combat.",
    "Your goal is to progress, level up, slay monsters, and defeat the evil warlord on top of Mount Doom.",
    "I wish you luck, adventurer. Please select a name to continue."
  ],
  sceneType: "input",
  sceneChoicesHeadline: "Pick your name",
  inputPlaceholder: "Adventurer",
  inputValue: "Pick name",
  functionClass: "set-player-name",
  sceneChoicesNextScene: [1]
};

//--------------------------------------------------------------------//

// 2: Scene02 - Choose Initial Route
var Scene02 = {
  sceneName: "A splitting path",
  sceneText: [
    "You venture down the path of adventure, and suddenly it splits in two.",
    "You read the roadsigns. The left path goes to Church of Alkarath, while the right goes to the city of Nimba.",
  ],
  sceneType: "choices",
  sceneChoicesHeadline: "Which path do you choose",
  sceneChoices: ["I go left, to the church of Alkarath", "I go right, to the city of Nimba"],
  functionClass: "set-player-name",
  sceneChoicesNextScene: [3, 2]
};

  //--------------------------------------------------------------------//

// 3: Scene03 - City
var Scene03 = {
  sceneName: "City of Nimba",
  sceneFirstVisitCompare: nimbaFirstVisit,
  sceneTextFirstVisit: [
    "The city of Nimba is a small and welcoming place. despise it's small size, there's a lot of activity in this small town.",
    "The moment you walk through the door, you are met by an old man, who happily greets you",
    "-Hello there! My name is Timothy. Welcome to our small town!",
    "-I know the town is fairly small, but we still have everything you need. We have a shop where you can sell or buy any goods, and an inn where you can rest and get stamina",
    "-You can also go to the church to heal up any magicka if you need to. The final road out leads through the forest. Beware of this road. It's inhabitet by monsters!"
  ],
  sceneText: [
    "The old man greets you again.",
    "-Welcome back to Nimba, young one!"
  ],
  sceneType: "choices",
  sceneChoicesHeadline: "Where in the city do you go?",
  sceneSpecialEvents: [RandomMonsterEncounter],
  sceneChoicesFirstVisit: ["I go to the shop, to buy or sell", "I go to the inn, I need to rest!", "I go to the forest - I want to slay some monsters!", "I want to explore the church of Alkarath!"],
  sceneChoices: ["Shop", "Inn", "Forest", "Church of Alkarath"],
  functionClass: "set-player-name",
  sceneChoicesNextScene: [4, 5, "e0", 3]
};

//--------------------------------------------------------------------//

// 4: Scene04 - Church
var Scene04 = {
  sceneName: "The Church of Alkarath",
  sceneFirstVisitCompare: alkarathFirstVisit,
  sceneTextFirstVisit: [
    "The church of Alkarath was built a thousand years ago to honor the hero who enslaved all the monsters.",
    "The church is huge, and statues of marble decorates the exterior walls.",
    "As you approach the church, one of the monks - often called to as Alkarathians - approach you.",
    "-Greetings, traveler. This is the last church of Alkarath. Once there were a thousand, now only one stands left.",
    "-You are free to use our prayer room to regain your magicka, but please stay away from the Holy Keep. We have trapped a monster inside! Once you are strong enough, you may be able to help us with that problem!"
  ],
  sceneText: [
    "The Alkarathian monk still stands in front of the church",
    "-Welcome back, traveler. May the fame of Alkarath shine upon you!"
  ],
  sceneType: "choices",
  sceneChoicesHeadline: "Where in the church do you go?",
  sceneChoicesFirstVisit: ["I go to the Prayer Room to heal my magicka", "I want to explore the Holy Keep and fight the monster!", "I go to the forest to fight off monsters!", "I go to the City of Nimba"],
  sceneChoices: ["Prayer Room", "Holy Keep", "Forest", "City of Nimba"],
  sceneChoicesNextScene: [8, 7, 6, 2]
};

//--------------------------------------------------------------------//

// 5: Scene05 - Shop
var Scene05 = {
  sceneName: "The Nimba Shop",
  sceneText: ["-Hello there! How can I help you?"],
  sceneType: "choices",
  sceneChoicesHeadline:"Options",
  sceneSpecialEvents: [ShopBuyEvent],
  sceneChoices: ["Buy", "Sell", "Back to city"],
  sceneChoicesNextScene: ["e0", "e0", 2]
};

//--------------------------------------------------------------------//

// 6: Scene06 - Inn
var Scene06 = {
  sceneName: "Nimba Inn",
  sceneText: ["-Hello, Hello, Helloooo!", "-Do you want to stay in one of our fine rooms?"],
  sceneType: "choices",
  sceneChoicesHeadline: "Do you wish to sleep at the inn?",
  sceneChoices: ["Yes (restore full stamina) (-10 gold)", "No, back to city"],
  sceneChoicesNextScene: [2, 2]
};

//--------------------------------------------------------------------//

// 7: Scene07 -  Forest
var Scene07 = {
  sceneName: "The Nimba Forest",
  sceneFirstVisitCompare: nimbaForestFirstVisit,
  sceneTextFirstVisit: [
    "A short while after you enter the forest, a fleeing person runs towards you",
    "-Stop! Be careful! This forest is full of monsters!",
    "-Oh, you .. You have a sword. Okay then. You are more prepared than I am then!",
    "-Just remember to watch your health and stamina.",
    "",
    "-Your stamina will increase your blocking chance against monsters, but will decrease after each round. The longer you fight, the more the monsters will hit you!",
    "-You will lose health based on the attack of the monster. Health potions will be useful in this case!",
    "-You will gain XP if you win, and will level your skills in the end. Once you level up, you will have more health and stamina. You will also gain some gold after you kill a monster!"
  ],
  sceneText: [
    "-Welcome back, fighter. Ready to take on some more monsters?"
  ],
  sceneType: "choices",
  sceneChoicesHeadline: "What do you do?",
  sceneChoicesFirstVisit: ["Go look for monsters!", "Go back to the City of Nimba", "Go back to the Church of Alkarath"],
  sceneChoices: ["Look for monsters", "City of Nimba", "Church of Alkarath"],
  sceneChoicesNextScene: ["event", 2, 3]
};

//--------------------------------------------------------------------//

// 8: Scene08 - Holy Keep
var Scene08 = {
  sceneName: "Holy Keep of Alkarath",
  sceneText: ["SECTION NOT COMPLETED -- GAME MECHANICS REQUIRED (Unlockables / Stats)"],
  sceneType: "choices",
  sceneChoicesHeadline: "You found an undeveloped section -- Where do you go?",
  sceneChoices: ["Nimba", "Church"],
  sceneChoicesNextScene: [2, 3]
};

//--------------------------------------------------------------------//

// 9: Scene09 - Prayer Room
var Scene09 = {
  sceneName: "Holy Keep of Alkarath",
  sceneText: ["SECTION NOT COMPLETED -- GAME MECHANICS REQUIRED (PlayerStats)"],
  sceneType: "choices",
  sceneChoicesHeadline: "You found an undeveloped section -- Where do you go?",
  sceneChoices: ["Nimba", "Church"],
  sceneChoicesNextScene: [2, 3]
};

//--------------------------------------------------------------------//

//*====== END OF SCENES ====== */

// scene array
var sceneArray = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09];


/* === ITEMS === */

// 1: Minor health potion
var ItemMinorHealthPotion = {
  name: "Minor health potion",
  id: "smHpPotion",
  description: "A minor healing potion - heals 10 hp",
  specialStat: ["+10 hp"],
  value: "5"
};

//---------------------------------//

// 2: Health potion
var ItemHealthPotion = {
  name: "Health potion",
  id: "hpPotion",
  description: "A healing potion - heals 25 hp",
  specialStat: ["+25 hp"],
  value: "10"
};

//---------------------------------//

// 3: Big health potion
var ItemBigHealthPotion = {
  name: "Big health potion",
  id: "lgHpPotion",
  description: "A big healing potion - heals 50 hp",
  specialStat: ["+50 hp"],
  value: "25"
};

//---------------------------------//

// 4: Magicka potion
var ItemMagickaPotion = {
  name: "Magicka potion",
  id: "magPotion",
  description: "A magicka potion - Gives +25 magicka",
  specialStat: ["+25 magicka"],
  value: "10"
};

//---------------------------------//

// 5: Stamina potion
var ItemStaminaPotion = {
  name: "Stamina potion",
  id: "staPotion",
  description: "A stamina potion - Gives +25 stamina",
  specialStat: ["+25 stamina"],
  value: "8"
};

//---------------------------------//

//*====== END OF ITEMS ====== */


/* === MONSTERS === */
// - HitChange: % (100 = always, 0 = never)

// 1: Trek (lvl 1-5)
var MonsterTrek = {
  name: "Trek",
  id: "trek01",
  monsterHealth: 20,
  showsAtLevel: [1, 20],
  description: "A tree-monster - Slow, but hits hard",
  damageRange: [0, 20],
  hitChance: 0.25,
  playerEscapeChance: 0.5
};

//---------------------------------//

// 2: Trukit (lvl 1-5)
var MonsterTrukit = {
  name: "Trukit",
  id: "trukit01",
  monsterHealth: 20,
  showsAtLevel: [1, 10],
  description: "A tree-monster - Hits often, but low damage",
  damageRange: [0, 5],
  hitChance: 0.9,
  playerEscapeChance: 0.5
};

//---------------------------------//

// 3: Chaba (lvl 1-5)
var MonsterChaba = {
  name: "Chaba",
  id: "chaba01",
  monsterHealth: 50,
  showsAtLevel: [1, 15],
  description: "A chaba - An aggressive monster",
  damageRange: [0, 15],
  hitChance: 0.75,
  playerEscapeChance: 0.5
};

//---------------------------------//

// 4: Katar (lvl 1-5)
var MonsterKatar = {
  name: "Katar",
  id: "katar01",
  monsterHealth: 50,
  showsAtLevel: [1, 5],
  description: "With razor-sharp teeth, this monster will bite everything he sees!",
  damageRange: [0, 10],
  hitChance: 0.75,
  playerEscapeChance: 0.5
};

//---------------------------------//

// 5: Beshy (lvl 1-5)
var MonsterBeshy = {
  name: "Beshy",
  id: "beshy01",
  monsterHealth: 50,
  showsAtLevel: [1, 3],
  description: "A monster in a bush - Doesn't seem friendly",
  damageRange: [0, 8],
  hitChance: 0.75,
  playerEscapeChance: 0.5
};

//---------------------------------//

// monster arrays
var wildMonsterArray = [MonsterTrek, MonsterTrukit, MonsterChaba, MonsterKatar, MonsterBeshy];
