
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

var ShopSellEvent = function() {
}