/* -- GAME FUNCTIONS -- */

/*
* == INCLUDES ==
* 1. BuildScene 
* 2. Add to inventory
* 3. load next scene (read choices)
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

  // build scene story
  heading.html(scene.sceneName);
  $.each(scene.sceneText, function(i, text) {
    textContainer.append("<p>" + text + "</p>");
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
    $.each(scene.sceneChoices, function(i, choice) {
      choicesContainer.append(
        "<li class='choice " + i + "'><h4 class='" + i + "'>- " + choice + "</h4></li>"
      );
    });
  }
};

// 2: Render inventory
var renderInventory = function() {
  var container = $("#inventory-container ul");
  container.html("");
  $.each(playerInventory, function(i, item) {
    container.append(
      "<li class='inventory-element " + i + "'>" + item.name + "</li>"
    );
  });

  // Add description on hover
  $(".inventory-element").hover(function(e) {
    var i = e.target.className.split(" ")[1];
    var descP = $(".inventory-item-description");
    var desc = playerInventory[i].description;

    descP.html(desc);
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
    var value = $(".input").val();
  
    e.preventDefault();
    // next scene
    var sceneIndex = classes.slice(-1)[0];
    var sceneToDisplay = currentScene.sceneChoicesNextScene[sceneIndex];
    currentScene = sceneArray[sceneToDisplay];
    console.log(sceneIndex);
    
    BuildScene(currentScene);
  });

//---------------------------------//
  