/* -- GAME OBJECTS -- */

/*
* == INCLUDES ==
* -- Scenes -- (Section, large)
* -- Items (Section, large)
*
*
*
*/

//---------------------------------//

/* -- SCENES -- */

/*
* 1: Scene01 - Intro / Welcome - Input(name)
*
*
*
*
*
*/

//---------------------------------//

/* -- ITEMS -- */

/*
* 1: Minor health potion
* 2: Health potion
* 3: Big health potion
*
*
*/

//===================================//
//===================================//

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

// 1: Scene02 - Choose Initial Route
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
    sceneChoicesNextScene: [0, 1]
  };

// scene array
var sceneArray = [Scene01, Scene02];
  

/* === ITEMS === */

// 1: Minor health potion
var ItemMinorHealthPotion = {
  name: "Minor health potion",
  description: "A minor healing potion - heals 10 hp",
  specialStat: ["hp +10"],
  value: "5"
};

//---------------------------------//

// 2: Health potion
var ItemHealthPotion = {
  name: "Health potion",
  description: "A healing potion - heals 25 hp",
  specialStat: ["hp +25"],
  value: "10"
};

//---------------------------------//

// 3: Big health potion
var ItemBigHealthPotion = {
  name: "Big health potion",
  description: "A big healing potion - heals 50 hp",
  specialStat: ["hp +50"],
  value: "25"
};
