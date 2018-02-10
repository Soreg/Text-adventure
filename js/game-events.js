
/* -- GAME EVENTS -- */

/*
* == INCLUDES ==
* 1. Shop (buy) 
* 2. Compare gold to items (check if can buy)
* 3. Monster fights
* 4. Boss fights
*/

//---------------------------------//

// temporary shoplist to store items for buy / sale
var tempShopList = [];

// 1: Shop (Buy)
var ShopBuyEvent = function(action) {
    var ValueOfItems = 0;


    // Hide scene-container, show shop-container
    $("#scene-outer-container").css("display", "none");
    $("#shop-event-container").css("display", "block");

    var shopHeading, shopDescription, shopItems;
    var confirmButton = $(".shop-confirm");

    if(action == "Buy") {
        shopItems = NimbaShopItems;

        shopHeading = "Nimba Shop - Buy";
        shopDescription = "<p class='shop-instructions'>Select the items you want to buy. \
        Accept by clicking Buy, or cancel by clicking Back</p>";

        confirmButton.html("Buy");
        confirmButton.removeClass("sell-items");
        confirmButton.addClass("buy-items");
    }
    else { // sell
        shopItems = playerInventory;

        shopHeading = "Nimba Shop - Sell";
        shopDescription = "<p class='shop-instructions'>Select the items you want to sell. \
        Accept by clicking Confirm, or cancel by clicking Back</p>";

        confirmButton.html("Confirm");
        confirmButton.removeClass("buy-items");
        confirmButton.addClass("sell-items");
    }

    // Populate shop list
    // heading
    $("#shop-event-container .description-container h4").html(shopHeading);
    // instructional text

    $("#shop-event-container .description-container").append(shopDescription);
    
    $("#shop-event-container .shop-container .player-gold")
    .html("Gold: " + playerGold);

    // List items in the shop along with the item stats
    var shopContainer = $("#shop-event-container .shop-container ul");
    var defaultShopContainer = shopContainer.html(); // to reset on leave
    $.each(shopItems, function(i, item) {
        if(action == "Buy") {
            shopContainer.append("<li class='shop-item " + i +"'><div>" + item.name + "</div> \
            <div>" + item.specialStat[0] + "</div>\
            <div class='item-price'>" + item.value + "</div><div class='action-container'><div class='decrease'> - </div><p> 0 </p><div class='increase'> + </div></div></li>");
        } else {
            shopContainer.append("<li class='shop-item " + i +"'><div>" + item.name + "</div> \
            <div>" + item.specialStat[0] + "</div>\
            <div class='item-price'>" + item.value + "</div><div class='action-container'><div class='sell-event sell'>SELL</div></div></li>");
        }
    });

    // When clicking on "sell" button
    $(".sell-event.sell").click(function() {
        var parentLi = $(this).parent().parent();
        var itemPrice = parentLi.find('.item-price').text();
        var container = this.closest(".shop-item");
        var playerGoldContainer = $("#shop-event-container .shop-container .player-gold");

        var i = container.className.split(" ")[1];
        var item = playerInventory[i];


        if(!($(this).is(".to-sell"))) {
            tempShopList.push(item);
    
            ValueOfItems += parseInt(itemPrice);
    
            parentLi.css("color", "#9c9c9c");
            $(this).addClass("to-sell");
            $(this).css("color", "white");

            $(this).html("CANCEL");
        }
        else {
            tempShopList.splice($.inArray(item, tempShopList), 1);
            ValueOfItems -= parseInt(itemPrice);
            parentLi.css("color", "white");
            $(this).removeClass("to-sell");
            $(this).html("SELL");
        }

        if(tempShopList.length > 0) {
            playerGoldContainer.html("Gold: " + playerGold + " (+ " + ValueOfItems + ")");
        } else {
            playerGoldContainer.html("Gold: " + playerGold);
        }

        if(ValueOfItems > 0) {
            $(".sell-items").removeClass("disabled");
        } else {
            $(".sell-items").addClass("disabled");
        }

    });
    

    // When clicking on + or - button
    $(".shop-item .action-container div").click(function() {
        if(action == "Buy") {
            var container = this.closest(".shop-item");
            var i = container.className.split(" ")[1];
            var item = NimbaShopItems[i];
    
            var pTarget = $(this).siblings('p');
            var pValue = pTarget.text();
    
            if(this.className == "increase") {
                tempShopList.push(item);
                pValue++;
                pTarget.html(pValue);
            } else {
                // Do not allow to go below 0
                if(pValue > 0) {
                    // splice item away
                    tempShopList.splice($.inArray(item, tempShopList), 1);
                    pValue--;
                    pTarget.html(pValue);
                }
            }
            ValueOfItems = CompareGoldToItems();
        }
    });

    // when clicking buy or confirm (buy / sell)
    $(".shop-confirm").click(function() {
        if(action == "Buy") {
            if(playerGold >= ValueOfItems && ValueOfItems > 0) {
                playerGold -= ValueOfItems;
                // transfer items from temp array to the inventory array
                AddToInventory(tempShopList);
    
                // reset all values
                tempShopList = [];
                $("#shop-event-container .description-container").html("<h4></h4>");
                $("#shop-event-container .shop-container ul").html(defaultShopContainer);
    
                $(".buy-items").addClass("disabled");
                ValueOfItems = 0;
    
                BuildScene(currentScene);
    
                $("#shop-event-container").css("display", "none");
                $("#scene-outer-container").css("display", "block");
            }
        } else {
            if(ValueOfItems > 0) {
                playerGold += ValueOfItems;
                RemoveFromInventory(tempShopList);

                // reset all values
                tempShopList = [];
                $("#shop-event-container .description-container").html("<h4></h4>");
                $("#shop-event-container .shop-container ul").html(defaultShopContainer);
    
                $(".sell-items").addClass("disabled");
                ValueOfItems = 0;
    
                BuildScene(currentScene);
    
                $("#shop-event-container").css("display", "none");
                $("#scene-outer-container").css("display", "block");
            }
        }
    });


    // when clicking cancel
    $(".cancel-items").click(function() {
        // reset all values
        tempShopList = [];
        $("#shop-event-container .description-container").html("<h4></h4>");
        $("#shop-event-container .shop-container ul").html(defaultShopContainer);

        $(".shop-confirm").addClass("disabled");
        ValueOfItems = 0;

        BuildScene(currentScene);

        $("#shop-event-container").css("display", "none");
        $("#scene-outer-container").css("display", "block");
    });

    // hide event when clicking back
    // set variable to visited
    // build current scene again -- BuildScene(CurrentScene) to load new dialogue
    // show event after build complete
}

// 2: Compare gold to items
var CompareGoldToItems = function() {
    var container = $("#shop-event-container .shop-container .player-gold");
    var totalValue = 0;


    $.each(tempShopList, function(i, item) {
        totalValue += parseInt(item.value);
    });

    if(tempShopList.length > 0) {
        container.html("Gold: " + playerGold + " (- " + totalValue + ")");
    } else {
        container.html("Gold: " + playerGold);
    }

    if(playerGold >= totalValue && totalValue > 0) {
        container.css("color", "lightgreen");
        $(".buy-items").removeClass("disabled");

    } else if(playerGold >= totalValue) {
        container.css("color", "lightgreen");
        $(".buy-items").addClass("disabled");
    } else {
        container.css("color", "red");
        $(".buy-items").addClass("disabled");
    }

    return totalValue;
}

// 3: Monster fights (random encounters)
var RandomMonsterEncounter = function() {
    var monster = GetRandomMonster();

    var testrun = 0;

    // new variables to avoid overwriting monster objects
    var monsterHealth = monster.monsterHealth;
    var monsterDmgRange = [monster.damageRange[0], monster.damageRange[1]];
    var monsterHitChance = monster.hitChance;
    var monsterPlayerEscapeChance = monster.playerEscapeChace;

    var playerFled = false;
    var playerOk = false;

    var mainContainer = $("#battle-event-container");
    mainContainer.find(".fatal").removeClass("battle-won");
    mainContainer.find(".fatal").removeClass("battle-lost");

    $("#scene-outer-container").css("display", "none");
    mainContainer.css("display", "block");
    mainContainer.find(".finish-choices .battle-won").css("display", "none");
    mainContainer.find(".finish-choices .battle-lost").css("display", "none");
    mainContainer.find(".round-choices").css("display", "block");

    // List monster details
    var RenderMonsterStats = function() {
        mainContainer.find(".headline").html("You encountered a monster!");
        mainContainer.find(".monster-name").html("Monster: " + monster.name);
        mainContainer.find(".monster-description").html("Description: " + monster.description);
        mainContainer.find(".monster-hp").html("Monster HP: " + monsterHealth);
        mainContainer.find(".monster-damage").html("Damage range: " + monsterDmgRange[0] + " - " + monsterDmgRange[1]);
        mainContainer.find(".monster-hit-chance").html("hit-chance: " + monsterHitChance*100 + "%");
    }

    // -- MONSTER TURN --
    var monsterTurn = function() {
        mainContainer.find(".battle-choices").css("display", "none");
        mainContainer.find(".turn").html(monster.name + "'s turn");
        mainContainer.find(".move").html(monster.name + " is considering his attack . . .");
        mainContainer.find(".effect").html("");
        var monsterHit = DidMonsterHit(monster);
        setTimeout(function() {
            if(monsterHit) {
                var monsterTurnDamage = GetMonsterAttack();
                playerHealth -= monsterTurnDamage;
                renderStats();
                mainContainer.find(".move").html(monster.name + " strikes hard!");
                mainContainer.find(".effect").html("It damaged for " + monsterTurnDamage + " HP!");
            }
            else {
                mainContainer.find(".move").html(monster.name + " missed his attack!");
            }
    playerTurn();
    }, 3000);
    }

    // -- PLAYER TURN --
    var playerTurn = function() {
        mainContainer.find(".battle-choices").css("display", "block");

        $(".battle-attack").unbind().click(function() {
            mainContainer.find(".battle-choices").css("display", "none");
            var playerRoundDamage = GetPlayerAttack();
            if(monsterHealth - playerRoundDamage <= 0) {
                monsterHealth = 0;
            }
            else {
                monsterHealth -= playerRoundDamage;
            }
            RenderMonsterStats();
            mainContainer.find(".turn").html("");
            mainContainer.find(".move").html("You hit the target!");
            mainContainer.find(".effect").html("You damaged the monster for " + playerRoundDamage + " HP!");
            if(monsterHealth <= 0) { // PLAYER WINS
                mainContainer.find(".fatal").addClass("battle-won");
                mainContainer.find(".fatal").html("YOU KILLED THE MONSTER!");
                // enable win-button
                mainContainer.find(".round-choices").css("display", "none");

                mainContainer.find(".finish-choices").css("display", "block");
                mainContainer.find(".battle-won").css("display", "block");
                mainContainer.find(".battle-choices").css("display", "block");
            } else {
                setTimeout(function() {
                    monsterTurn();
                }, 3000);
            }
        });

        $(".battle-run").unbind().click(function() {
            console.log("Player is running");
        });

        // when clicking on button (WON)
        $(".battle-won").unbind().click(function() {
            ReturnToScene("won");
        });

        // when clicking on button (LOST)
        $(".battle-lost").unbind().click(function() {
            ReturnToScene("lost");
        });
    }

    // clear scene (remove all generated html)
    var clearScene = function() {
        mainContainer.find(".headline").empty();
        mainContainer.find(".monster-name").empty()
        mainContainer.find(".monster-description").empty();
        mainContainer.find(".monster-hp").empty();
        mainContainer.find(".monster-damage").empty();
        mainContainer.find(".monster-hit-chance").empty();
        mainContainer.find(".turn").empty();
        mainContainer.find(".move").empty();
        mainContainer.find(".effect").empty();
        mainContainer.find(".fatal").empty();
    }

    // Return to scene (BATTLE OVER)
    var ReturnToScene = function(outcome) {
        if(outcome == "won") { // if player has won
            playerXp += monster.xpGained;
            playerGold += monster.goldToGive;
        }
        else { // if player has lost
            playerGold -= monster.goldToTake;
        }

        // Go back to previous scene
        BuildScene(currentScene);
        clearScene();
        mainContainer.css("display", "none");
        $("#scene-outer-container").css("display", "block");
        
    };

    var GetMonsterAttack = function() {
        var damage = Math.floor(Math.random() * monster.damageRange[1]) + monster.damageRange[0];
        return damage;
    };

    // start turn with monster
    RenderMonsterStats();
    monsterTurn();
    
    // display remaining monster HP
    // ask player for move
    // if player attack
    //     call function to calculate attack
    //     Minus damage with monster hp
    //     check if monster is dead
    //     timeout before monster attack
    //     call function for monster attack (takes monster)
    //     minus player hp with monster hp
    //     check if player dead
    //     repeat
    // if player flee
    //     call function to calculate player flee
    //     repeat if not success, or quit
    // if player use item
    //      call consumeItem function
    //      repeat

    // if PLAYER WINS
    //      Congratulate player
    //      give player xp
    //      return to last scene
    // if PLAYER DIES
    //      Game over screen
    //      lose some money (if exists)
    //      go back to last scene

    // --END--


}