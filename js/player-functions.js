/* -- PLAYER FUNCTIONS -- */


/*
* == INCLUDES ==
* 1. Add to inventory
*
*
* 
*/

// Player variables
var playerName;
var playerBonusDamage = 0; // Based on level + weapon
var playerInventory = []; // list of objects

// player stats variables
var playerGold = 0;
var playerBasicDamage = 10;
var playerHealth = 100;
var playerLevel = 1;
var playerXp = 0;
var playerXpForNextLevel = 100;

//---------------------------------//

// 1: Add to inventory
var AddToInventory = function(item) {
    this.playerInventory.push(item)
    renderInventory();
}

// 2: Remove from inventory
var RemoveFromInventory = function(item) {
    
}