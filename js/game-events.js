/* -- GAME EVENTS -- */

/*
* == INCLUDES ==
* 1. Shop (buy) 
* 2. Shop (sell)
* 3. Monster fights
* 4. Boss fights
*/

//---------------------------------//

// 1: Shop (Buy)
var ShopBuyEvent = function() {
    console.log("ShopEvent fired");

    $("#scene-outer-container").css("display", "none");
    $("#shop-event-container").css("display", "block");

    // heading
    $("#shop-event-container .description-container h4").html("Nimba Shop");
    // instructional text
    $("#shop-event-container .description-container")
    .append("<p class='text-instructions'>Select the items you want to buy. \
    Accept by clicking Buy, or cancel by clicking Back</p>");

    var shopContainer = $("#shop-event-container .shop-container ul");
    // List items in the shop along with the item stats
    $.each(NimbaShopItems, function(i, item) {
        shopContainer.append("<li class='shop-item'><div>" + item.name + "</div> \
        <div>" + item.specialStat[0] + "</div>\
        <div>" + item.value + "</div></li>");
    });

    // hide event when clicking back
    // set variable to visited
    // build current scene again -- BuildScene(CurrentScene) to load new dialogue
    // show event after build complete
}

var ShopSellEvent = function() {
    console.log("ShopSellEvent");
}