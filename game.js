let HighScore = localStorage.getItem("High Score");
var player = document.getElementById("player");
var startgameid = null;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var count = 0;
var scoree = 0;
var x = null;
var height = null;
var moveInterval = null;
var setTimeoutId = null;
var setIntervalId2 = null;
var bombClassProperty = null;
var life = 0;
var newTop = 0;
// -----------------for level-------------------------------//

var levelUp = {
  level:1,
  speed:7,
  levelUpCondition:10
}

//----------------------------------------------------------
// JS variables
//Score-> 0
let score = (document.querySelector("#point").innerHTML = scoree);
// Start Button
const startBtn = document.getElementsByClassName("start");
startBtn[0].addEventListener("click", startGame);
// Bomb Image
const bombImg = document.querySelector(".sky");

//===========================================================//

// Functions Sections
function move() {
  var positionLeft = player.offsetLeft;
  var positionTop = player.offsetTop;
  if (downPressed) {
    newTop = positionTop + 1;

    var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
    if (element.classList.contains("sky") == false) {
      player.style.top = newTop + "px";
    }

    if (leftPressed == false) {
      if (rightPressed == false) {
        player.className = "character walk down";
      }
    }
  }
  if (upPressed) {
    newTop = positionTop - 1;

    var element = document.elementFromPoint(player.offsetLeft, newTop);
    if (element.classList.contains("sky") == false) {
      player.style.top = newTop + "px";
    }

    if (leftPressed == false) {
      if (rightPressed == false) {
        player.className = "character walk up";
      }
    }
  }
  if (leftPressed) {
    var newLeft = positionLeft - 1;

    var element = document.elementFromPoint(newLeft, player.offsetTop);
    if (element.classList.contains("sky") == false) {
      player.style.left = newLeft + "px";
    }

    player.className = "character walk left";
  }
  if (rightPressed) {
    var newLeft = positionLeft + 1;

    var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
    if (element.classList.contains("sky") == false) {
      player.style.left = newLeft + "px";
    }

    player.className = "character walk right";
  }
}

function keyup(event) {
  var player = document.getElementById("player");
  if (event.keyCode == 37) {
    leftPressed = false;
    lastPressed = "left";
  }
  if (event.keyCode == 39) {
    rightPressed = false;
    lastPressed = "right";
  }
  if (event.keyCode == 38) {
    upPressed = false;
    lastPressed = "up";
  }
  if (event.keyCode == 40) {
    downPressed = false;
    lastPressed = "down";
  }

  player.className = "character stand " + lastPressed;
}

function keydown(event) {
  if (event.keyCode == 37) {
    leftPressed = true;
  }
  if (event.keyCode == 39) {
    rightPressed = true;
  }
  if (event.keyCode == 38) {
    upPressed = true;
  }
  if (event.keyCode == 40) {
    downPressed = true;
  }
}

function myLoadFunction() {
  timeout = setInterval(move, 10);
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);
}

function startGame() {
  //Executing Fxn when Start btn is clicked
  startBtn[0].style.display = "none";
  if (setTimeoutId) {
    clearTimeout(setTimeoutId);
  }

  setTimeoutId = setTimeout(bombs, 1);
} //ending of StartGame func

//for bomb
function bombs() {
  var bombDiv = document.createElement("div");
  bombDiv.classList.add("bomb", "skadoosh");
  bombImg.appendChild(bombDiv);
  x = Math.ceil(Math.random() * 1024); //math.random()*max ------------> falling range
  // var bombRandomValue = player.getBoundingClientRect();
  // x = bombRandomValue.x;
  height = Math.ceil(Math.random() * (670 - 550)) + 550; //math.random()*(max-min)+min ------------> for different height
  var mar = document.querySelectorAll(".bomb");
  mar[0].style.top = "0px";
  mar[0].style.left = x + "px";
  var pos = 0;
  var ska = document.getElementsByClassName("skadoosh");
  if (setIntervalId2 != true) {
    setIntervalId2 = setInterval(isOverlapping, 10, player, ska, count);
  }
  setTimeout(hideExplosion, 8000, ska, count); //call hideExplosion function to disappear the bomb P.S bomb gets disappear after 8000ms i.e 8secs

  if (moveInterval) {
    clearInterval(moveInterval);
  }

  //level up                         
  // console.log(levelUp.levelUpCondition); //for level up condition check 
  if(count==levelUp.levelUpCondition){
    // console.log('level is increased'); //if level increase is to be showed
    levelUp.level++; //increases Game Level;
    levelUp.levelUpCondition+=10; //game level is increased after every 10 bombs
    levelUp.speed-=3; //increases the speed of the falling bomb
    let levelUpDiv = document.getElementById('levelDiv');
    levelUpDiv.style.display='block';
    document.getElementById('levelDivID').innerText=levelUp.level;
    // levelUpDiv.innerHTML='<h1>Level </h1>'+levelUp.level;
    // bombImg.appendChild(levelUpDiv);
    setTimeout(() => {
      levelUpDiv.style.display='none';
    }, 2000);
  }
  //level up

  moveInterval = setInterval(dropGame, levelUp.speed, height);
  // setTimeoutId = setTimeout(startGame,1000);

  function dropGame(height) {
    // console.log("Drop BOmb ANiumation")
    //Js for bomb falling animation
    bombDiv.classList.add("bomb");
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }

    if (pos == height) {
      clearInterval(moveInterval);
      count += 1;
      bombDiv.classList.remove("bomb");
      bombDiv.classList.add("explosion");
      // var ska = document.getElementsByClassName("explosion");
      if (setIntervalId2 != true) {
        // console.log("inside");
        // setIntervalId2 = setInterval(isCollide, 10, player, ska,count);
        // setIntervalId2 = setInterval(isOverlapping, 10, player, ska, count);
      }
      startgameid = setTimeout(startGame, 10);
    } else {
      pos++;
      mar[0].style.top = pos + "px";
    }
  }
} //ending of bomb function

function hideExplosion(classProperty, count) {
  // console.log("timeout");
  bombClassProperty = classProperty;
  if(bombClassProperty[count].style.display === 'none'){
    return;
  }else{
    bombClassProperty[count].style.display = "none";
    scoree++;
    let score = document.querySelector("#point");
    score.innerHTML = scoree;    
  }
}

function isOverlapping(div1, div2, c) {
  // for player and bomb explosion collision

  const di1 = div1.getBoundingClientRect(); //-------->canvas fxn
  const di2 = div2[c].getBoundingClientRect();

  result1 =
    di1.right > di2.left &&
    di1.left < di2.right &&
    di1.bottom > di2.top - 60 && //---> detect whether the collison taken place or not
    di1.top - 60 < di2.bottom;
  if (result1) {
    div2[count].style.display = "none";
    life++;
    let hitWarning = document.createElement('p');
    hitWarning.innerText="You have been hit by bomb";
    player.classList.add('character', 'hit', 'left');
    hitWarning.setAttribute('style','position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);');
    bombImg.appendChild(hitWarning);
    setTimeout(() => {
      bombImg.removeChild(hitWarning);
    }, 2000);

    if (life <= 2) {
      document.getElementsByTagName("li")[life].style.display = "none";
      div2[c].style.display = "none";
    } else {
      div1.className = "character stand dead";
      clearTimeout(startgameid);
      clearTimeout(setTimeoutId);
      clearInterval(moveInterval);
      clearInterval(setIntervalId2);
      clearInterval(timeout);
      document.querySelector(".hud").style.display = "none";
      var containerDisplay = document.querySelector(".container");
      // console.log('Log1');
      containerDisplay.setAttribute(
        "style",
        "display:flex;flex-direction:column;justify-content:center;align-items:center"
      );
      // console.log('Log2');
      let name = document.getElementById("nameScore");
      // console.log(name);

      document.querySelector("#setItemBtn").addEventListener("click", () => {
        clearInterval(timeout);
        div1.className = "character stand dead";
        containerDisplay.setAttribute("style", "display:none");
        if (HighScore < scoree) {
          localStorage.setItem("High Score", scoree);
          localStorage.setItem('Name',name.value);
        }
        localStorage.setItem('current score',scoree);
        console.log("The Current Score of "+ name.value + " is:" + localStorage.getItem('current score'));
        let end_Div = document.createElement("div");
        end_Div.setAttribute(
          "style",
          "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
        );
        let contentDiv = document.createElement("div");
        contentDiv.setAttribute("style", "display:block;");
        end_Div.appendChild(contentDiv);
        end_Div.innerHTML = "Game Over <br> High Score:"+HighScore;
        let end_Btn = document.createElement("button");
        end_Btn.setAttribute(
          "style",
          "padding:10px;margin-top:10px;display:block;cursur:pointer;"
        );
        end_Btn.innerText = "Play Again";

        end_Div.appendChild(end_Btn);
        end_Btn.addEventListener("click", () => {
          location.reload();
        });
        bombImg.appendChild(end_Div);
      });
    }
  }
}



// Js events

// function hellopello(){

// 	document.addEventListener('DOMContentLoaded', myLoadFunction)
// }
