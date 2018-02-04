
/* -- GAME EVENTS -- */

/*
* == INCLUDES ==
* 1. Shop (buy) 
* 2. Compare gold to items (check if can buy)
* 3. Shop (sell)
* 4. Monster fights
* 5. Boss fights
*/

//---------------------------------//

// temporary shoplist to store items for buy / sale
var tempShopList = [];

// 1: Shop (Buy)
var ShopBuyEvent = function() {
    var ValueOfItems = 0;

    // Hide scene-container, show shop-container
    $("#scene-outer-container").css("display", "none");
    $("#shop-event-container").css("display", "block");

    // Populate shop list
    // heading
    $("#shop-event-container .description-container h4").html("Nimba Shop");
    // instructional text

    $("#shop-event-container .description-container")
    .append("<p class='shop-instructions'>Select the items you want to buy. \
    Accept by clicking Buy, or cancel by clicking Back</p>");
    
    $("#shop-event-container .shop-container .player-gold")
    .html("Gold: " + playerGold);

    // List items in the shop along with the item stats
    var shopContainer = $("#shop-event-container .shop-container ul");
    var defaultShopContainer = shopContainer.html();
    $.each(NimbaShopItems, function(i, item) {
        shopContainer.append("<li class='shop-item " + i +"'><div>" + item.name + "</div> \
        <div>" + item.specialStat[0] + "</div>\
        <div>" + item.value + "</div><div class='action-container'><div class='decrease'> - </div><p> 0 </p><div class='increase'> + </div></div></li>");
    });


    // When clicking on + or - button
    $(".shop-item .action-container div").click(function() {
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
        
    });
    
    // when clicking buy
    $(".buy-items").click(function() {
        console.log(ValueOfItems);
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
    });


    // when clicking cancel
    $(".cancel-items").click(function() {
        // reset all values
        tempShopList = [];
        $("#shop-event-container .description-container").html("<h4></h4>");
        $("#shop-event-container .shop-container ul").html(defaultShopContainer);

        $(".buy-items").addClass("disabled");
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

var ShopSellEvent = function() {
    console.log("ShopSellEvent");
}