/* -- GAME FUNCTIONS -- */

/*
* == INCLUDES ==
* 1. BuildScene 
* 2. render inventory
* 3. load next scene (read choices)
* 4. Render stats
* 5. Get monster attack (dmg)
* 6. Did monster hit (bool)
* 7. Get player attack
* 8. Did player flee (bool)
*/

//---------------------------------//

// 1: BuildScene
var BuildScene = function(scene) {
  // declare containers
  var heading = $("#scene-container .outer .inner h2");
  var textContainer = $("#scene-container .outer .inner .text-container");
  var inputContainer = $("#choices-container .outer .inner .input-container");
  var choicesContainer = $(
    "#choices-container .outer .inner .choice-container ul"
  );

  // clear containers
  heading.html("");
  textContainer.html("");
  inputContainer.html("");
  choicesContainer.html("");

  var sceneText = [];
  var sceneChoices = [];

    // check if first visit exists in object
    if(scene.hasOwnProperty('sceneFirstVisitCompare') == true && scene.sceneFirstVisitCompare == true) {
      sceneText = scene.sceneTextFirstVisit;
      sceneChoices = scene.sceneChoicesFirstVisit;

      // flip bool to false -- location visited
      scene.sceneFirstVisitCompare = false;
    } else {
      sceneText = scene.sceneText;
      sceneChoices = scene.sceneChoices;
    }

  // build scene story
  heading.html(scene.sceneName);
  $.each(sceneText, function(i, text) {
    if(text[0] == "-") {
      text = text.substr(1);
      textContainer.append("<p class='text-speech'>'' " + text + " ''</p>")
    } else {
      textContainer.append("<p>" + text + "</p>");
    }
  });

  // Scene choices
  $("#choices-container .outer .inner h3").html(scene.sceneChoicesHeadline);
  // scene choices == input
  if (scene.sceneType == "input") {
    inputContainer.append(
      "<form class='choice-input " +
        scene.functionClass +
        " 0'><input class='input' type='text' placeholder='" +
        scene.inputPlaceholder +
        "'/><input type='submit' value='" +
        scene.inputValue +
        "'/></form>"
    );
    // scene choices == choices (array)
  } else if ((sceneType = "choices")) {
    $.each(sceneChoices, function(i, choice) {
      choicesContainer.append(
        "<li class='choice " + i + "'><h4 class='" + i + "'>- " + choice + "</h4></li>"
      );
    });
  }
  renderStats(); // re-render stats every time a scene changes
};

// 2: Render inventory
var renderInventory = function() {
  var container = $("#inventory-container ul");
  container.html("");

  $.each(playerInventory, function(i, item) {
    var itemClass = "." + item.id;
    if($("#inventory-container ul " + itemClass).length) { // if inventory-html already contains this item..
      var child = $("#inventory-container ul " + itemClass);
      var childVal = child.children("span").text();

      childVal++;
      child.children("span").html(childVal);
      child.children("span").css("display", "inline");
    }
    else {
      container.append(
        "<li class='inventory-element " + i + " " + item.id + "'>" + item.name + "<span>1</span></li>"
      );
    }
  });

  // Add description on hover
  $(".inventory-element").hover(function(e) {
    if(!$(this).hasClass("disabled")) {
      var classNames = e.target.className.split(" ");
      var i = classNames[1];
      var descP = $(".inventory-item-description");
      var desc = playerInventory[i].description;
  
      descP.html(desc);
    }
  });

  // Consume item on click (call function)
  $(".inventory-element").click(function(e) {
    if(!$(this).hasClass("disabled")) {
      var classNames = e.target.className.split(" ");
      var i = classNames[1];
      var item = playerInventory[i];
      ConsumeItem(item);
    }
  });

  // change text back on mouse leave
  $(".inventory-element").mouseleave(function() {
    $(".inventory-item-description").html("Description");
  });
};

//---------------------------------//

// 3: Load next scene (read choices)

// on submit (input)
$(document).on("submit", ".choice-input", function(e) {
  var classes = e.target.className.split(" ");
  var value = $(".input").val();

  e.preventDefault();

  $.each(classes, function(i, className) {
    // check for specific classes
    if (className == "set-player-name") {
      playerName = value;
    }
  })
  // next scene
  var sceneIndex = classes.slice(-1)[0];
  var sceneToDisplay = currentScene.sceneChoicesNextScene[0];
  currentScene = sceneArray[sceneToDisplay];
  BuildScene(currentScene);
});

// on click (choices)
$(document).on("click", ".choice", function(e) {
    var classes = e.target.className.split(" ");
  
    e.preventDefault();
    // next scene
    var sceneIndex = classes.slice(-1)[0];
    var sceneToDisplay = currentScene.sceneChoicesNextScene[sceneIndex];
    if(isNaN(sceneToDisplay)) {
      // fire event (return to previous scene when done)
      var i = sceneToDisplay.split("")[1];
      var event = currentScene.sceneSpecialEvents[i];

      var value = $(this).text().split(" ")[1];

      event(value);

    } else {
      // build next scene
      currentScene = sceneArray[sceneToDisplay];
    }
    
    BuildScene(currentScene);
  });

//---------------------------------//
  
// 4: Render stats
var renderStats = function() {
  // checck XP
  if(playerXp >= playerXpForNextLevel) {
    playerLevel++;
    playerXp = playerXp - playerXpForNextLevel;
    playerMaxHealth += 20;
    playerXpForNextLevel += 20;
    BuildMonsterArray();
  }
  if(playerHealth <= 0) {
    playerHealth = 0;
  }
  else if( playerHealth > playerMaxHealth) {
    playerHealth = playerMaxHealth;
  }
  if(playerGold < 0) {
    playerGold = 0;
  }
  var container = $("#stats-container .outer .inner");
  container.find(".name").html(playerName);
  container.find(".level-container").html("<h4>Level " + playerLevel + "</h4>");
  container.find(".level-progress-container").html("<p>" + playerXp + " XP out of " + playerXpForNextLevel + " XP</p>");
  container.find(".player-stats-container .player-stats.hp").html("<h4>HP: " + playerHealth + " / " + playerMaxHealth + "</h4>");
  if(playerBonusDamage > 0) {
    container.find(".player-stats-container .player-stats.damage").html("<h4>Damage: " + playerBasicDamage + " (+ " + playerBonusDamage + " bonus)</h4>");
  } else {
    container.find(".player-stats-container .player-stats.damage").html("<h4>Damage: " + playerBasicDamage + "</h4>");  
  }
  container.find(".player-stats-container .player-stats.gold").html("<h4>Gold: " + playerGold + "</h4>");
}

//---------------------------------//

// 5: Get random monster 
var GetRandomMonster = function() {
  var monster = playerWildMonsterArray[
    Math.floor(
      Math.random()
      * playerWildMonsterArray.length
    )
  ];
  return monster;
}

//---------------------------------//

// 6: Did monster hit (bool)
var DidMonsterHit = function(monster) {
  var hit = false;
  var roll = Math.random();
  if(roll < monster.hitChance) {
    hit = true;
  }
  else {
    hit = false;
  }
  return hit;
}

//---------------------------------//

// 7: Get player attack
var GetPlayerAttack = function() {
  var playerMinDmg = (playerBasicDamage + playerBonusDamage) - 4;
  var playerMaxDmg = (playerBasicDamage + playerBonusDamage) + 4;

  var damage = Math.floor(Math.random() * (playerMaxDmg - playerMinDmg + 1)) + playerMinDmg;
  return damage;
}

//---------------------------------//

// 8: Did player flee (bool)
var DidPlayerFlee = function(monster) {
  var escape = false;
  var roll = Math.random();
  if(roll < monster.playerEscapeChance) {
    escape = true;
  }
  return escape;
}

//---------------------------------//