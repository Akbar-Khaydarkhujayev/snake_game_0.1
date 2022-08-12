var apple = document.getElementById("apple");
var score = document.getElementById("score");
var arrSnake = Array.prototype.slice.call(
  document.getElementsByClassName("snake")
);
var interval;
var newDiv;
var case37 = true;
var case38 = true;
var case39 = true;
var case40 = true;

arrSnake[0].style.left = 20 + "px";
arrSnake[0].style.top = 20 + "px";
document.getElementById("apple").style.top = "200px";
document.getElementById("apple").style.left = "340px";

for (let i = 1; i < arrSnake.length; i++) {
  arrSnake[i].style.left =
    Number(arrSnake[i - 1].style.left.replace(/[^0-9]/g, "")) + 20 + "px";
  arrSnake[i].style.top = 20 + "px";
}

function moveRight() {
  interval = setInterval(() => {
    arrSnake[0].style.left =
      Number(arrSnake[arrSnake.length - 1].style.left.replace(/[^0-9]/g, "")) +
      20 +
      "px";
    arrSnake[0].style.top =
      Number(arrSnake[arrSnake.length - 1].style.top.replace(/[^0-9]/g, "")) +
      "px";
    tailPush();
    isGameOver();
    appleCatch();
    selfCrush();
    case37 = false;
    case38 = true;
    case39 = false;
    case40 = true;
  }, diffictulty);
}

function handle(e) {
  switch (e.keyCode) {
    case 37:
      if (case37 == true) {
        clearInterval(interval);
        interval = setInterval(() => {
          arrSnake[0].style.left =
            Number(
              arrSnake[arrSnake.length - 1].style.left.replace(/[^0-9]/g, "")
            ) -
            20 +
            "px";
          arrSnake[0].style.top =
            Number(
              arrSnake[arrSnake.length - 1].style.top.replace(/[^0-9]/g, "")
            ) + "px";
          tailPush();
          isGameOver();
          appleCatch();
          selfCrush();
          case37 = false;
          case38 = true;
          case39 = false;
          case40 = true;
        }, diffictulty);
      }
      break;
    case 38:
      if (case38 == true) {
        clearInterval(interval);
        interval = setInterval(() => {
          arrSnake[0].style.top =
            Number(
              arrSnake[arrSnake.length - 1].style.top.replace(/[^0-9]/g, "")
            ) -
            20 +
            "px";
          arrSnake[0].style.left =
            Number(
              arrSnake[arrSnake.length - 1].style.left.replace(/[^0-9]/g, "")
            ) + "px";
          tailPush();
          isGameOver();
          appleCatch();
          selfCrush();
          case37 = true;
          case38 = false;
          case39 = true;
          case40 = false;
        }, diffictulty);
      }
      break;
    case 39:
      if (case39 == true) {
        clearInterval(interval);
        moveRight();
      }
      break;
    case 40:
      if (case40 == true) {
        clearInterval(interval);
        interval = setInterval(() => {
          arrSnake[0].style.top =
            Number(
              arrSnake[arrSnake.length - 1].style.top.replace(/[^0-9]/g, "")
            ) +
            20 +
            "px";
          arrSnake[0].style.left =
            Number(
              arrSnake[arrSnake.length - 1].style.left.replace(/[^0-9]/g, "")
            ) + "px";
          tailPush();
          isGameOver();
          appleCatch();
          selfCrush();
          case37 = true;
          case38 = false;
          case39 = true;
          case40 = false;
        }, diffictulty);
      }
      break;
  }
}

function tailPush() {
  snakeTail = arrSnake[0];
  arrSnake.shift();
  arrSnake.push(snakeTail);
}

function reload() {
  location.reload();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isGameOver() {
  for (let i = 0; i < arrSnake.length; i++) {
    if (
      arrSnake[i].style.top == "500px" ||
      arrSnake[i].style.left == "500px" ||
      arrSnake[i].style.left == "-20px" ||
      arrSnake[i].style.top == "-20px"
    ) {
      clearInterval(interval);
      document.getElementById("overAllScore").innerText =
        document.getElementById("score").innerText;
      document.removeEventListener("keydown", handle);
      document.getElementById("layer").style.display = "block";
    }
  }
}

function appleCatch() {
  for (let a = 0; a < arrSnake.length; a++) {
    if (
      arrSnake[a].style.top == document.getElementById("apple").style.top &&
      arrSnake[a].style.left == document.getElementById("apple").style.left
    ) {
      top1 = Number(getRandomInt(25)) * 20 + "px";
      left1 = Number(getRandomInt(25)) * 20 + "px";
      if (top1 == arrSnake[a].style.top || left1 == arrSnake[a].style.left) {
        console.log("none");
      } else {
        document.getElementById("apple").style.left = top1;
        document.getElementById("apple").style.top = left1;
        document.getElementById("apple").style.display = "block";
        score.innerHTML = Number(score.innerHTML) + 1;
        newDiv = document.createElement("div");
        newDiv.classList.add("snake");
        newDiv.style.left = arrSnake[0].style.left;
        newDiv.style.top = arrSnake[0].style.top;
        document.getElementById("main").prepend(newDiv);
        arrSnake.unshift(newDiv);
      }
    }
  }
}

function selfCrush() {
  for (let i = 0; i < arrSnake.length - 1; i++) {
    if (
      arrSnake[arrSnake.length - 1].style.left == arrSnake[i].style.left &&
      arrSnake[arrSnake.length - 1].style.top == arrSnake[i].style.top
    ) {
      clearInterval(interval);
      document.removeEventListener("keydown", handle);
      document.getElementById("overAllScore").innerText =
        document.getElementById("score").innerText;
      document.getElementById("layer").style.display = "block";
    }
  }
}

function forBegining() {
  document.addEventListener("keydown", handle);
  document.getElementById("startLayer").style.display = "none";
  moveRight();
}

function start() {
  if (document.getElementById("checkbox1").checked) {
    diffictulty = 200;
    forBegining();
  } else if (document.getElementById("checkbox2").checked) {
    diffictulty = 100;
    forBegining();
  } else if (document.getElementById("checkbox3").checked) {
    diffictulty = 50;
    forBegining();
  } else {
    alert("Choose difficulty !");
  }
}
