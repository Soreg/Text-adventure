/* -- PLAYER FUNCTIONS -- */


/*
* == INCLUDES ==
* 1. Add to inventory
*
*
* 
*/

// Player variables
var playerName = "";
var playerHealth = 100;
var playerBasicDamage = 10;
var playerBonusDamage = 0; // Based on level + weapon
var playerGold = 0;
var playerInventory = []; // list of objects

//---------------------------------//

// 1: Add to inventory
var AddToInventory = function(item) {
    this.playerInventory.push(item)
    renderInventory();
}