/* -- PLAYER FUNCTIONS -- */


/*
* == INCLUDES ==
* 1. Add to inventory
* 2. Remove from inventory
* 3. Build monster array
* 4. Consume item (Inventory)
*/

// Player variables
var playerName;
var playerBonusDamage = 0; // Based on level + weapon
var playerInventory = []; 
var playerWildMonsterArray = []; // Array of monsters the player can encounter (re-calculated on level change)


// player stats variables
var playerGold = 100;
var playerBasicDamage = 10;
var playerHealth = 100;
var playerMaxHealth = 100;
var playerLevel = 1;
var playerXp = 0;
var playerXpForNextLevel = 100;


//---------------------------------//

// 1: Add to inventory
var AddToInventory = function(items) {
    $.merge(this.playerInventory, items);
    renderInventory();
}

// 2: Remove from inventory
var RemoveFromInventory = function(items) {
    $.each(items, function(i, item) {
        playerInventory.splice($.inArray(item, playerInventory), 1);
    });
    renderInventory();
}

// 3: Build monster array
var BuildMonsterArray = function() {
    $.each(wildMonsterArray, function(i, monster) {
        if(playerLevel >= monster.showsAtLevel[0] && playerLevel < monster.showsAtLevel[1]) {
            playerWildMonsterArray.push(monster);
        }
    })
}

// 4: Consume item (Inventory)
var ConsumeItem = function(item) {
    var items = [item];
    $.each(item.specialStat, function(i, stat) {
        var statToChange = stat[0];
        var statProperty = stat[1];

        if(statToChange == "hp") {
            playerHealth += statProperty;
        }
        renderStats();
        RemoveFromInventory(items);
    });
    // Check what stat the item wants to change
    // Change the stat
    // Remove item from iventory (function)
}