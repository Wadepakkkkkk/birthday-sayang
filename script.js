/* =========================================================
   GLOBAL
========================================================= */

const bgMusic =
  document.getElementById("bgMusic");

const correctImage =
  document.getElementById("correctImage");

let currentQuest = 1;

let noClicks = 0;

let finalLetterPlayed = false;


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
     MEMORY VIDEO AUTOPLAY
  ================================= */

  const memoryVideos =
    document.querySelectorAll(
      "#memoryScene video"
    );


  if (sceneId === "memoryScene") {

    memoryVideos.forEach(
      function(video) {

        video.muted = true;

        video.loop = true;

        video.playsInline = true;


        const playPromise =
          video.play();


        if (
          playPromise !== undefined
        ) {

          playPromise.catch(
            function() {}
          );

        }

      }
    );

  }

  else {

    memoryVideos.forEach(
      function(video) {

        video.pause();

      }
    );

  }

}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

  if (!bgMusic) {
    return;
  }


  bgMusic.volume = 0.45;


  const playPromise =
    bgMusic.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch(
      function() {}
    );

  }

}


/* =========================================================
   INTRO -> READY
========================================================= */

function startGame() {

  startMusic();

  showScene(
    "readyScene"
  );

}


/* =========================================================
   READY -> WELCOME
========================================================= */

function showWelcome() {

  showScene(
    "welcomeScene"
  );

}


/* =========================================================
   WELCOME -> QUEST 1
========================================================= */

function startQuest() {

  currentQuest = 1;

  showScene(
    "quest1"
  );

}


/* =========================================================
   WRONG ANSWER
========================================================= */

function wrongAnswer(
  questNumber
) {

  currentQuest =
    questNumber;


  showScene(
    "wrongScene"
  );

}


/* =========================================================
   TRY AGAIN
========================================================= */

function tryAgain() {

  showScene(
    "quest" +
    currentQuest
  );

}


/* =========================================================
   HEART BURST
========================================================= */

function createHeartBurst() {

  const burst =
    document.createElement(
      "div"
    );


  burst.className =
    "heart-burst";


  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "heart-particle";


    heart.textContent =
      i % 3 === 0
        ? "✦"
        : "♡";


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      80 +
      Math.random() *
      160;


    const x =
      Math.cos(angle) *
      distance;


    const y =
      Math.sin(angle) *
      distance;


    heart.style.setProperty(
      "--x",
      x + "px"
    );


    heart.style.setProperty(
      "--y",
      y + "px"
    );


    burst.appendChild(
      heart
    );

  }


  document.body.appendChild(
    burst
  );


  setTimeout(
    function() {

      burst.remove();

    },
    1300
  );

}


/* =========================================================
   CORRECT ANSWER
========================================================= */

function correctAnswer(
  questNumber
) {

  currentQuest =
    questNumber;


  const images = {

    1: "correct1.JPG",

    2: "correct2.JPG",

    3: "correct3.JPG"

  };


  if (correctImage) {

    correctImage.src =
      images[
        questNumber
      ];

  }


  createHeartBurst();


  showScene(
    "correctScene"
  );

}


/* =========================================================
   NEXT QUEST
========================================================= */

function nextQuest() {

  if (
    currentQuest === 1
  ) {

    currentQuest = 2;


    showScene(
      "quest2"
    );

  }

  else if (
    currentQuest === 2
  ) {

    currentQuest = 3;


    showScene(
      "quest3"
    );

  }

  else {

    showScene(
      "memoryScene"
    );

  }

}


/* =========================================================
   MEMORY -> UNIVERSE
========================================================= */

function showUniverse() {

  showScene(
    "universeScene"
  );

}


/* =========================================================
   YES
========================================================= */

function yesUniverse() {

  createHeartBurst();


  setTimeout(
    function() {

      showScene(
        "birthdayScene"
      );

    },
    350
  );

}


/* =========================================================
   NO BUTTON
========================================================= */

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
      Math.random() *
      130
    ) - 65;


  const y =
    Math.floor(
      Math.random() *
      80
    ) - 40;


  button.style.transform =
    "translate(" +
    x +
    "px, " +
    y +
    "px)";


  if (
    noClicks >= 5
  ) {

    button.textContent =
      "YES ♡";


    button.style.transform =
      "none";


    button.onclick =
      yesUniverse;

  }

}


/* =========================================================
   LETTER
========================================================= */

/* =========================================================
   FINAL LETTER
========================================================= */

function showLetter() {

  showScene("letterScene");

  const letterScene =
    document.getElementById(
      "letterScene"
    );

  if (letterScene) {
    letterScene.scrollTop = 0;
  }

  if (!finalLetterPlayed) {

    finalLetterPlayed = true;

    setTimeout(
      revealFinalLetter,
      350
    );

  }

}


/* =========================================================
   REVEAL FINAL LETTER
========================================================= */

function revealFinalLetter() {

  const paragraphs =
    Array.from(
      document.querySelectorAll(
        ".letter-body > p"
      )
    );


  paragraphs.forEach(
    function(paragraph) {

      paragraph.classList.remove(
        "letter-show"
      );

    }
  );


  let index = 0;


  function revealNext() {

    if (
      index >=
      paragraphs.length
    ) {

      setTimeout(
        addEndButton,
        500
      );

      return;

    }


    const paragraph =
      paragraphs[index];


    paragraph.classList.add(
      "letter-show"
    );


    const letterScene =
      document.getElementById(
        "letterScene"
      );


    if (letterScene) {

      paragraph.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }


    index++;


    setTimeout(
      revealNext,
      900
    );

  }


  revealNext();

}
/* =========================================================
   END BUTTON
========================================================= */

function addEndButton() {

  const letter =
    document.querySelector(
      ".final-letter"
    );


  if (!letter) {
    return;
  }


  if (
    document.getElementById(
      "endGameButton"
    )
  ) {
    return;
  }


  const button =
    document.createElement(
      "button"
    );


  button.id =
    "endGameButton";


  button.className =
    "pixel-btn";


  button.textContent =
    "THE END ♡";


  button.onclick =
    showEndScreen;


  letter.appendChild(
    button
  );

}


/* =========================================================
   END SCREEN
========================================================= */

function showEndScreen() {

  createHeartBurst();


  let screen =
    document.getElementById(
      "endScreen"
    );


  if (!screen) {

    screen =
      document.createElement(
        "div"
      );


    screen.id =
      "endScreen";


    screen.innerHTML = `
      <div class="end-content">

        <p class="tiny-title">
          GAME COMPLETE ♡
        </p>

        <h1>
          THE END ♡
        </h1>

        <p>
          Hanif ♡ Dee
        </p>

      </div>
    `;


    document.body.appendChild(
      screen
    );

  }


  screen.classList.add(
    "active"
  );

}


/* =========================================================
   SETUP BUTTONS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    /*
      INTRO BUTTON
      Extra iPhone/iPad touch fallback
    */

    const introNext =
      document.getElementById(
        "introNext"
      );


    if (introNext) {

      introNext.addEventListener(
        "touchend",
        function(event) {

          event.preventDefault();

          startGame();

        },
        {
          passive: false
        }
      );

    }


    /*
      NO BUTTON
    */

    const noButton =
      document.getElementById(
        "noButton"
      );


    if (noButton) {

      noButton.addEventListener(
        "click",
        moveNoButton
      );


      /*
        Desktop only:
        NO runs away on hover.
      */

      if (
        window.matchMedia(
          "(hover: hover)"
        ).matches
      ) {

        noButton.addEventListener(
          "mouseenter",
          moveNoButton
        );

      }

    }

  }
);
