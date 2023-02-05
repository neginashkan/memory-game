class AudioController {
  constructor() {
    this.bgMusic = new Audio("audios/background-audio.mp3");
    this.flipSound = new Audio("audios/flip.wav");
    this.matchSound = new Audio("audios/write-audio.wav");
    this.notMatchSound = new Audio("audios/wrong-audio.wav");
    this.victorySound = new Audio("audios/victory.wav");
    this.gameOverSound = new Audio("audios/gameover.wav");
    this.bgMusic.volume = 0.5;
  }
  startMusic() {
    this.bgMusic.play();
    this.bgMusic.loop = true;
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  notMatch() {
    this.notMatchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}
let audioController = new AudioController();

// --------------------------------------
const addByJavaScript = document.getElementById("add-by-javaScript");
const timeEl = document.getElementById("time");
// --------------------------------------
// let timeLeft = 90;
// timerId = setInterval(countdown, 1000);
// const timeEl = document.getElementById("time");
//     function countdown() {
//       if (timeLeft == -1) {
//         clearTimeout(timerId);
//         document.getElementById("game-over-text").classList.add("visible");
//         audioController.gameOver();
//         addByJavaScript.textContent = "";
//         randersGame();
//       } else {
//         timeEl.textContent = timeLeft;
//         timeLeft--;
//       }
//     }
// --------------------------------------------------
let seconds = 90;
// function startClickGameTime(){
//   let timer = setInterval(() => {
//     timeEl.textContent = seconds;
//     seconds--;
//     if (seconds < 0) {
//       clearInterval(timer);
//     }
//   }, 1000);

// }

function stopTimer() {
  clearInterval(timer);
  timeEl.textContent = seconds;
}


function startTimer() {
  timer = setInterval(()=> {
    timeEl.textContent = seconds;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      timeEl.textContent = seconds;
    }
  }, 1000);
}
// --------------------------------------------------
function game() {
  const allCards = [
    { name: "a  girl with black hair and glasses on", src: "images/1.png" },
    { name: "a girl with red hair", src: "images/2.png" },
    { name: "a boy with black hair smiling", src: "images/3.png" },
    { name: "a girl with black hair", src: "images/4.png" },
    { name: "a boy with brown hair and glasses on", src: "images/5.png" },
    { name: "a girl with brown hair", src: "images/6.png" },
    { name: "a boy with black hair", src: "images/7.png" },
    { name: "a boy with orange hair", src: "images/8.png" },
    { name: "a  girl with black hair and glasses on", src: "images/1.png" },
    { name: "a girl with red hair", src: "images/2.png" },
    { name: "a boy with black hair smiling", src: "images/3.png" },
    { name: "a girl with black hair", src: "images/4.png" },
    { name: "a boy with brown hair and glasses on", src: "images/5.png" },
    { name: "a girl with brown hair", src: "images/6.png" },
    { name: "a boy with black hair", src: "images/7.png" },
    { name: "a boy with orange hair", src: "images/8.png" },
  ];
  // shuffle cards
  allCards.sort(() => 0.5 - Math.random());

  const matchCards = [];
  let twoChosenCardsName = [];
  let twoChosenCardsId = [];

  function checkForMatch() {
    const scoreEL = document.getElementById("score");
    const allHTMLCards = document.querySelectorAll("img");
    const first_card_name = twoChosenCardsName[0];
    const second_card_name = twoChosenCardsName[1];
    const first_card_id = twoChosenCardsId[0];
    const second_card_id = twoChosenCardsId[1];
    const first_card_element = allHTMLCards[first_card_id];
    const second_card_element = allHTMLCards[second_card_id];

    if (
      first_card_name === second_card_name &&
      first_card_id !== second_card_id
    ) {
      first_card_element.removeEventListener("click", flipCard);
      second_card_element.removeEventListener("click", flipCard);
      first_card_element.setAttribute("src", "images/check.png");
      second_card_element.setAttribute("src", "images/check.png");
      first_card_element.setAttribute("class", "remove-border");
      second_card_element.setAttribute("class", "remove-border");
      matchCards.push(twoChosenCardsName);
      audioController.match();
    } else {
      first_card_element.setAttribute("src", "images/question.png");
      second_card_element.setAttribute("src", "images/question.png");
      first_card_element.classList.add("remove-border");
      second_card_element.classList.add("remove-border");
      // not match sound
      // let audioController = new AudioController();
      // audioController.notMatch()
      // or you can write it like this
      // first_card_element.setAttribute("class", "remove-border");
      // second_card_element.setAttribute("class", "remove-border");
    }
    twoChosenCardsName = [];
    twoChosenCardsId = [];
    const score = matchCards.length;
    scoreEL.textContent = score;
    if (score === allCards.length / 2) {
      document.getElementById("victory-text").classList.add("visible");
      audioController.victory();
      // stopTimer();
      addByJavaScript.textContent = "";
      randersGame();
    }
  }
  // Clicked Card
  function flipCard(event) {
    audioController.flip();
    event.preventDefault();
    const clickedCardId = Number(this.getAttribute("data-id"));
    const clickedCardName = allCards[clickedCardId].name;
    const clickedCardSrc = allCards[clickedCardId].src;
    this.setAttribute("src", clickedCardSrc);
    this.classList.remove("remove-border");
    twoChosenCardsId.push(clickedCardId);
    twoChosenCardsName.push(clickedCardName);
    if (twoChosenCardsName.length === 2) {
      setTimeout(checkForMatch, 600);
    }
  }
  // show it in html

  let row;
  for (let i = 0; i < allCards.length; i++) {
    if (i % 4 === 0) {
      row = document.createElement("div");
      row.setAttribute("class", "row mb-3");
      addByJavaScript.append(row);
    }
    let col_3 = document.createElement("div");
    let img = document.createElement("img");
    let dashDiv = document.createElement("div");
    col_3.setAttribute("class", "col-3 text-center");
    img.setAttribute("class", "remove-border");
    img.setAttribute("src", "images/question.png");
    img.setAttribute("alt", "question mark");
    img.setAttribute("data-id", i);
    img.addEventListener("click", flipCard);
    dashDiv.setAttribute("class", "dash");
    dashDiv.appendChild(img);
    col_3.appendChild(dashDiv);
    row.appendChild(col_3);
  }
}

const allOverlayText = Array.from(document.querySelectorAll(".overlay-text"));
function ready() {
  allOverlayText.forEach((eachOverlayText) =>
    eachOverlayText.addEventListener("click", () => {
      // startTimer()
      eachOverlayText.classList.remove("visible");
      audioController.startMusic();
      const scoreEL = document.getElementById("score");
      scoreEL.textContent = 0;
    })
  );
}
function randersGame() {
  game();
  ready();
}
randersGame();

//? mute icon of on button
//? fix time
//? time over game over
