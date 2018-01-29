/* VARIABLES */

// Enemy variables
var enemyHealth = 100;
var enemyDamage = 10;

// location variables
var mainLandName = "Kashak";
var mainCityName = "Nimba";
var mainChurchName = "Alkarath";

// Misc variables
var vendorInfluence = 0; // Based on level

// Game-function variables -- Used by game engine
var currentScene = Scene01;

// Start game with intro scene
BuildScene(Scene01);
// test
AddToInventory(ItemBigHealthPotion);