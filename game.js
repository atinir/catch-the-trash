var trashCollection = ["banana", "bottle", "eggshells", "phone"];

var trashSpeed = [20, 10, 30, 25]; //mapped speeds of the trash objects in [trashCollection]

var xPosTrash = []; // to collect all the x-coordinates of trash

var start = 0;

var points = 0;

var startGame; // the variable for Interval function that causes new trash to appear.

var timeForNewTrash = 2000;

// var speedOfTrashFall = 20;

// upon button click, the trash starts falling.
$("button").click(function() {
  start = start + 1;

  if (start === 1) {
    trashFall();
    $(".points").text("Points: " + points);
    $("h1").text("Catch the 🗑 trash");
    startGame = setInterval(function() {
      trashFall();
    }, timeForNewTrash);

    // the trash-can starts following the x-coordinate of mouse.
    $(document).mousemove(function(event) {
      document.querySelector(".trash-can").style.left = event.pageX + "px";
    });
  }
});

// capture the mouse coordinates in a global object.
$(document).mousemove(function(e) {
  var event = e || window.event;
  window.mouseX = event.pageX;
});


// function that causes new pieces to trash to fall when called.
function trashFall() {
  var fallingTrashIndex = randomNumber(trashCollection.length); //gives index of trashCollection
  var fallingTrashID = trashCollection[fallingTrashIndex]; //gives "banana" or "bottle"
  var parent = document.querySelector("#trash-area");
  var newImage = document.createElement("img");
  newImage.src = fallingTrashID + ".png"; // e.g banana.png
  newImage.setAttribute("id", fallingTrashID); //#banana
  newImage.setAttribute("class", "trash"); // .trash
  parent.append(newImage);

  var yPos = 0;
  var xPos = randomNumber(710); //xPos = x-Position of fallingTrash:
  newImage.style.left = xPos + "px";
  console.log(newImage.style.left);
  xPosTrash.push(xPos);
  console.log(xPosTrash + " ," + xPosTrash.length);


  // the animation of trash falling. increments by 1px every 10 Ms.
  var intervalID = setInterval(function() {

    if (xPosTrash.length === 0) {
      clearInterval(intervalID);
      console.log("omg cleared");
    } else {
      if (yPos < 360 ) { // keep trash falling
        yPos++;
        newImage.style.top = yPos + "px";

      } else if (yPos >= 360 && yPos < 400 ) { // check if its caught
        if (window.mouseX > xPos - 120 && window.mouseX < xPos + 120 + 70 ) {
          console.log("caught it, " + "mouse x-pos: " + window.mouseX + ", trash x-Pos: " + xPos);
          newImage.remove();
          points = points + 1;
          $(".points").text("Points: " + points);
          console.log("intervalID:" + intervalID);
          clearInterval(intervalID);
          console.log(" caught intervalID:" + intervalID);
        } else {
          console.log("not yet caught, " + "mouse x-pos: " + window.mouseX + ", trash x-Pos: " + xPos);
          yPos++;
          newImage.style.top = yPos + "px";
        }

      } else if (yPos === 400 ) { // end game.
        console.log("did not catch it");
        newImage.remove();
        $("h1").text("Game Over");
        clearInterval(intervalID);
        console.log("not caught intervalID:" + intervalID);
        clearInterval(startGame);
        $(".trash").remove();
        xPosTrash.length = 0;
        console.log(xPosTrash);
        points = 0;
        start = 0;
      }
    }
  }, trashSpeed[fallingTrashIndex]);
}


// function to generate a random number between 0 - length of Array (not inclusive) when a number is passed thru.
function randomNumber(lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
}
