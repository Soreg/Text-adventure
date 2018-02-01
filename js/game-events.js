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

    // heading
    $("#shop-event-container .description-container h4").html("Nimba Shop");
    // instructional text
    $("#shop-event-container .description-container")
    .after("<p class='text-instructions'>Select the items you want to buy. \
    Accept by clicking Buy, or cancel by clicking Back</p>");

    // hide event when clicking back
    // set variable to visited
    // build current scene again -- BuildScene(CurrentScene) to load new dialogue
    // show event after build complete
}

var ShopSellEvent = function() {
    console.log("ShopSellEvent");
}