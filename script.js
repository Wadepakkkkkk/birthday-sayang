/* =========================================================
   ELEMENTS
========================================================= */

const bgMusic = document.getElementById("bgMusic");

const introText = document.getElementById("introText");
const introNext = document.getElementById("introNext");

const questionText = document.getElementById("questionText");
const answerGrid = document.getElementById("answerGrid");
const questNumber = document.getElementById("questNumber");

const correctImage = document.getElementById("correctImage");

let currentQuest = 1;


/* =========================================================
   INTRO TYPEWRITER
========================================================= */

const introMessage =
  "Hi Dee ♡\n\n" +
  "I made a little game just for you.\n\n" +
  "Complete all the levels to unlock your surprise...";

let introIndex = 0;


function typeIntro() {

  if (introIndex < introMessage.length) {

    const character = introMessage.charAt(introIndex);

    if (character === "\n") {
      introText.innerHTML += "<br>";
    } else {
      introText.innerHTML += character;
    }

    introIndex++;

    setTimeout(typeIntro, 38);

  } else {

    introNext.classList.remove("hidden");

  }

}


window.addEventListener("load", () => {

  setTimeout(typeIntro, 500);

});


/* =========================================================
   START MUSIC AFTER USER INTERACTION
========================================================= */

function startMusic() {

  if (!bgMusic) return;

  bgMusic.volume = 0.45;

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {

    playPromise.catch(() => {
      console.log("Music waiting for user interaction.");
    });

  }

}


/* =========================================================
   SCENE SYSTEM
========================================================= */

function showScene(sceneId) {

  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.getElementById(sceneId);

  if (!target) {
    console.error("Scene not found:", sceneId);
    return;
  }

  target.classList.add("active");

  /*
    Stop memory videos when leaving memory page.
  */

  if (sceneId !== "sceneMemories") {

    document
      .querySelectorAll("#sceneMemories video")
      .forEach(video => {

        video.pause();

      });

  }

}


/* =========================================================
   INTRO
========================================================= */

function finishIntro() {

  startMusic();

  showScene("sceneReady");

}


/* =========================================================
   QUEST DATA
========================================================= */

const quests = {

  1: {

    question:
      "What was Dee's first impression of Hanif?",

    answers: [
      {
        text: "SOMBONG",
        correct: false
      },
      {
        text: "HANDSOME ♡",
        correct: true
      },
      {
        text: "ANNOYING",
        correct: false
      }
    ],

    image: "correct1.JPG"

  },


  2: {

    question:
      "When did we first meet?",

    answers: [
      {
        text: "12/4/2025",
        correct: false
      },
      {
        text: "19/7/2025",
        correct: true
      },
      {
        text: "3/11/2025",
        correct: false
      }
    ],

    image: "correct2.JPG"

  },


  3: {

    question:
      "What is Dee's favourite?",

    answers: [
      {
        text: "DUBAI CHEWY COOKIES",
        correct: false
      },
      {
        text: "SOFT COOKIES",
        correct: false
      },
      {
        text: "HANIF ♡",
        correct: true
      }
    ],

    image: "correct3.JPG"

  }

};


/* =========================================================
   START / LOAD QUEST
========================================================= */

function startQuest(number) {

  currentQuest = number;

  loadQuest();

  showScene("sceneQuest");

}


function loadQuest() {

  const quest = quests[currentQuest];

  if (!quest) {
    return;
  }


  questNumber.textContent =
    `MEMORY QUEST 0${currentQuest}`;


  questionText.textContent =
    quest.question;


  answerGrid.innerHTML = "";


  quest.answers.forEach(answer => {

    const button =
      document.createElement("button");

    button.className = "pixel-btn";

    button.textContent = answer.text;


    button.addEventListener("click", () => {

      checkAnswer(answer.correct);

    });


    answerGrid.appendChild(button);

  });

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkAnswer(isCorrect) {

  if (isCorrect) {

    correctImage.src =
      quests[currentQuest].image;

    showScene("sceneCorrect");

  } else {

    showScene("sceneWrong");

  }

}


/* =========================================================
   WRONG → RETRY SAME QUEST
========================================================= */

function retryQuest() {

  loadQuest();

  showScene("sceneQuest");

}


/* =========================================================
   CORRECT → NEXT QUEST
========================================================= */

function nextQuest() {

  if (currentQuest < 3) {

    currentQuest++;

    loadQuest();

    showScene("sceneQuest");

  } else {

    showScene("sceneQuestComplete");

  }

}


/* =========================================================
   UNIVERSE YES
========================================================= */

function sayYes() {

  showScene("sceneBirthday");

}


/* =========================================================
   NO BUTTON
========================================================= */

let noClicks = 0;


function moveNoButton() {

  const button =
    document.getElementById("noButton");

  noClicks++;


  const messages = [
    "NO",
    "REALLY?",
    "SURE? 😭",
    "DEE...",
    "TRY AGAIN ♡"
  ];


  button.textContent =
    messages[
      Math.min(
        noClicks,
        messages.length - 1
      )
    ];


  /*
    Move button slightly so NO becomes
    annoying to click, like a mini game.
  */

  const x =
    Math.floor(Math.random() * 100) - 50;

  const y =
    Math.floor(Math.random() * 60) - 30;


  button.style.transform =
    `translate(${x}px, ${y}px)`;


  /*
    Eventually give up and turn it into YES.
  */

  if (noClicks >= 5) {

    button.textContent = "YES ♡";

    button.onclick = sayYes;

    button.style.transform = "none";

  }

}
