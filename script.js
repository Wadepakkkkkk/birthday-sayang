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
/* =========================================
   HEART BURST
========================================= */

function createHeartBurst() {

  const burst =
    document.createElement("div");

  burst.className =
    "heart-burst";


  for (let i = 0; i < 18; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "heart-particle";

    heart.textContent =
      i % 3 === 0 ? "✦" : "♡";


    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      80 + Math.random() * 160;


    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;


    heart.style.setProperty(
      "--x",
      x + "px"
    );

    heart.style.setProperty(
      "--y",
      y + "px"
    );


    burst.appendChild(heart);

  }


  document.body.appendChild(burst);


  setTimeout(function() {

    burst.remove();

  }, 1300);

}


/* =========================================
   ADD BURST TO CORRECT ANSWER
========================================= */

const originalCorrectAnswer =
  correctAnswer;


correctAnswer =
  function(questNumber) {

    createHeartBurst();

    originalCorrectAnswer(
      questNumber
    );

  };


/* =========================================
   ADD BURST TO YES
========================================= */

const originalYesUniverse =
  yesUniverse;


yesUniverse =
  function() {

    createHeartBurst();

    originalYesUniverse();

  };


/* =========================================
   FINAL LETTER TYPEWRITER - PROPER
========================================= */

let finalLetterPlayed = false;


function typeFinalLetterProper() {

  if (finalLetterPlayed) {
    return;
  }

  finalLetterPlayed = true;


  const paragraphs =
    Array.from(
      document.querySelectorAll(
        ".letter-body > p"
      )
    );


  let paragraphIndex = 0;


  function typeNextParagraph() {

    if (
      paragraphIndex >=
      paragraphs.length
    ) {

      addEndButton();

      return;

    }


    const paragraph =
      paragraphs[paragraphIndex];


    const originalText =
      paragraph.innerText;


    paragraph.textContent = "";

    paragraph.classList.add(
      "reveal-text",
      "typing-now"
    );


    let charIndex = 0;


    function typeCharacter() {

      if (
        charIndex <
        originalText.length
      ) {

        paragraph.textContent +=
          originalText.charAt(
            charIndex
          );


        charIndex++;


        /*
          Auto scroll as text grows
        */

        const letter =
          document.querySelector(
            ".final-letter"
          );


        if (letter) {

          letter.scrollTop =
            letter.scrollHeight;

        }


        setTimeout(
          typeCharacter,
          22
        );

      }

      else {

        paragraph.classList.remove(
          "typing-now"
        );


        paragraphIndex++;


        setTimeout(
          typeNextParagraph,
          350
        );

      }

    }


    typeCharacter();

  }


  typeNextParagraph();

}


/* =========================================
   END BUTTON
========================================= */

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


/* =========================================
   END SCREEN
========================================= */

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


/* =========================================
   HEART BURST
========================================= */

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


/* =========================================
   HOOK CORRECT ANSWER
========================================= */

const originalCorrectAnswer =
  correctAnswer;


correctAnswer =
  function(questNumber) {

    createHeartBurst();

    originalCorrectAnswer(
      questNumber
    );

  };


/* =========================================
   HOOK YES
========================================= */

const originalYesUniverse =
  yesUniverse;


yesUniverse =
  function() {

    createHeartBurst();

    originalYesUniverse();

  };


/* =========================================
   HOOK LETTER
========================================= */

const originalShowLetter =
  showLetter;


showLetter =
  function() {

    originalShowLetter();


    setTimeout(
      function() {

        typeFinalLetterProper();

      },
      500
    );

  };
