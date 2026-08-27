/* =========================================================
   GLOBAL
========================================================= */

const bgMusic = document.getElementById("bgMusic");

const correctImage = document.getElementById("correctImage");

let currentQuest = 1;



/* =========================================================
   SHOW SCENE
========================================================= */

function showScene(sceneId) {

  document
    .querySelectorAll(".scene")
    .forEach(function(scene) {

      scene.classList.remove("active");

    });


  const target =
    document.getElementById(sceneId);


  if (!target) {

    console.error(
      "Scene not found:",
      sceneId
    );

    return;

  }


  target.classList.add("active");


  /* =================================
     MEMORY VIDEOS
  ================================= */

  const memoryVideos =
    document.querySelectorAll(
      "#memoryScene video"
    );


  if (sceneId === "memoryScene") {

    memoryVideos.forEach(function(video) {

      video.muted = true;

      video.loop = true;

      video.playsInline = true;


      const playPromise =
        video.play();


      if (playPromise !== undefined) {

        playPromise.catch(function(error) {

          console.log(
            "Autoplay waiting:",
            error
          );

        });

      }

    });

  }

  else {

    memoryVideos.forEach(function(video) {

      video.pause();

    });

  }

}



/* =========================================================
   BACKGROUND MUSIC
========================================================= */

function startMusic() {

  if (!bgMusic) {
    return;
  }


  bgMusic.volume = 0.45;


  const playPromise =
    bgMusic.play();


  if (playPromise !== undefined) {

    playPromise.catch(function(error) {

      console.log(
        "Music waiting for interaction:",
        error
      );

    });

  }

}



/* =========================================================
   INTRO -> READY
========================================================= */

function startGame() {

  startMusic();

  showScene("readyScene");

}



/* =========================================================
   READY -> WELCOME
========================================================= */

function showWelcome() {

  showScene("welcomeScene");

}



/* =========================================================
   WELCOME -> QUEST 1
========================================================= */

function startQuest() {

  currentQuest = 1;

  showScene("quest1");

}



/* =========================================================
   WRONG ANSWER
========================================================= */

function wrongAnswer(questNumber) {

  currentQuest = questNumber;

  showScene("wrongScene");

}



/* =========================================================
   TRY AGAIN
========================================================= */

function tryAgain() {

  showScene(
    "quest" + currentQuest
  );

}



/* =========================================================
   CORRECT ANSWER
========================================================= */

function correctAnswer(questNumber) {

  currentQuest = questNumber;


  const images = {

    1: "correct1.JPG",

    2: "correct2.JPG",

    3: "correct3.JPG"

  };


  if (correctImage) {

    correctImage.src =
      images[questNumber];

  }


  showScene("correctScene");

}



/* =========================================================
   NEXT QUEST
========================================================= */

function nextQuest() {

  if (currentQuest === 1) {

    currentQuest = 2;

    showScene("quest2");

  }

  else if (currentQuest === 2) {

    currentQuest = 3;

    showScene("quest3");

  }

  else {

    /*
      Quest 3 complete.
      Go straight to six memories.
    */

    showScene("memoryScene");

  }

}



/* =========================================================
   MEMORY GALLERY -> JUST US
========================================================= */

function showUniverse() {

  showScene("universeScene");

}



/* =========================================================
   YES BUTTON
========================================================= */

function yesUniverse() {

  showScene("birthdayScene");

}



/* =========================================================
   NO BUTTON
========================================================= */

let noClicks = 0;


function moveNoButton() {

  const button =
    document.getElementById(
      "noButton"
    );


  if (!button) {
    return;
  }


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


  const x =
    Math.floor(
      Math.random() * 130
    ) - 65;


  const y =
    Math.floor(
      Math.random() * 80
    ) - 40;


  button.style.transform =
    "translate(" +
    x +
    "px, " +
    y +
    "px)";


  /*
    Lepas beberapa kali,
    NO surrender jadi YES 😂
  */

  if (noClicks >= 5) {

    button.textContent =
      "YES ♡";


    button.style.transform =
      "none";


    button.onclick =
      yesUniverse;

  }

}



/* =========================================================
   BIRTHDAY -> LETTER
========================================================= */

function showLetter() {

  showScene("letterScene");

}



/* =========================================================
   CONNECT NO BUTTON
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const noButton =
      document.getElementById(
        "noButton"
      );


    if (noButton) {

      noButton.addEventListener(
        "click",
        moveNoButton
      );

      noButton.addEventListener(
        "mouseenter",
        moveNoButton
      );

    }

  }
);
