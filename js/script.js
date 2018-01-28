/* VARIABLES */

// Player variables
var playerName = "";
var playerHealth = 100;
var playerBasicDamage = 10;
var playerBonusDamage = 0; // Based on level + weapon
var playerGold = 0;
var playerInventory = []; // list of objects

// Enemy variables
var enemyHealth = 100;
var enemyDamage = 10;

// Misc variables
var VendorInfluence = 0; // Based on level

// Functionality variables -- for JS code only
var sceneToDisplay = Scene01; // 01 = intro


/* INVENTORY FUNCTIONS */

// Add description to items on hover
$(".inventory-element").hover(function (e) {
  var element = e.target.className.split(" ")[0];
  var descP = $(".inventory-item-description");

  if (element == "health-potion") {
    descP.html("A small health potion - heals 10 HP");
  } else if (element == "stamina-potion") {
    descP.html("A small stamina potion - gives 10 Stamina");
  } else if (element == "fireball-scroll") {
    descP.html("A scroll to throw a fireball - deals 50 dmg.");
  } else {
    descP.html("Can be sold to vendor for gold.");
  }
});

// change text back on mouse leave
$(".inventory-element").mouseleave(function () {
  $(".inventory-item-description").html("Description");
});

/* -- SCENES -- */

// Scene01 - Intro scene
var Scene01 = {
  sceneName: "Welcome, Adventurer",
  sceneText: [
    "Welcome adventurer, to the land of Kashak.",
    "This is a game of mystery, combat, quests, leveling, trading and combat.",
    "Your goal is to progress, level up, slay monsters, and defeat the evil warlord on top of Mount Doom.",
    "I wish you luck, adventurer. Please select a name to continue."
  ],
  sceneType: "input",
  sceneChoicesHeadline: "Pick your name",
  inputPlaceholder: "Adventurer",
  inputClass: "set-player-name",
  sceneChoicesNextScene: "oo"
}




/* -- GAME FUNCTIONS -- */

// Build scene function
var BuildScene = function (scene) {
  // declare containers
  var heading = $("#scene-container .outer .inner h2");
  var textContainer = $("#scene-container .outer .inner .text-container");
  var inputContainer = $("#choices-container .outer .inner .input-container");
  var choicesContainer = $("#choices-container .outer .inner .choice-container ul");

  // clear containers
  heading.html("");
  textContainer.html("");
  inputContainer.html("");
  choicesContainer.html("");

  // build scene story
  heading.html(scene.sceneName);
  $.each(scene.sceneText, function (i, text) {
    textContainer.append("<p>" + text + "</p>")
  });

  // Scene choices
  $("#choices-container .outer .inner h3").html(scene.sceneChoicesHeadline);
  // scene choices == input
  if (scene.sceneType == "input") {
    inputContainer.append("<form class='set-player-name'><input class='input' type='text' placeholder='" + scene.inputPlaceholder + "'/><input type='submit' value='Pick name'/></form>");

    // scene choices == choices (array)  
  } else if (sceneType = "choices") {
    $.each(scene.sceneChoices, function (i, choice) {
      choicesContainer.append("<li class='" + scene.sceneChoicesNextScene[i] + "'><h4>- " + choice + "</h4></li>")
    });
  }
}

/* -- CHOICE AND INPUT FUNCTIONS -- */
$(document).on('submit','.set-player-name',function(e){
  e.preventDefault();
  var value = $(".input").val();
  if(value != "") {
    this.playerName = value;
    console.log(this.playerName); // debugging
  }
  else {
    console.log("Empty"); // change later
  }
}); 

// Start game with intro scene
BuildScene(Scene01);