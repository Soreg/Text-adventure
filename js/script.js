/* VARIABLES */

// location variables
var mainLandName = "Kashak";
var mainCityName = "Nimba";
var mainChurchName = "Alkarath";

// Misc variables

// Game-function variables -- Used by game engine
var currentScene = Scene01;

// Build monster array (monsters that the player can encounter, based on level)
BuildMonsterArray();
// Start game with intro scene
BuildScene(currentScene);
