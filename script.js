const startButton =
  document.getElementById("start-btn");

const continueButton =
  document.getElementById("continue-btn");

const nextButton =
  document.getElementById("next-btn");

const yesButton =
  document.getElementById("yes-btn");

const noButton =
  document.getElementById("no-btn");

const finalButton =
  document.getElementById("final-btn");


const startScreen =
  document.getElementById("start-screen");

const scene2 =
  document.getElementById("scene-2");

const scene3 =
  document.getElementById("scene-3");

const scene4 =
  document.getElementById("scene-4");

const scene5 =
  document.getElementById("scene-5");

const scene6 =
  document.getElementById("scene-6");


const bgMusic =
  document.getElementById("bg-music");


/* =========================
   START
========================= */

startButton.addEventListener(
  "click",
  function () {

    bgMusic.volume = 0.65;

    bgMusic
      .play()
      .catch(function (error) {
        console.log(
          "Music could not start:",
          error
        );
      });


    startScreen.classList.add("hidden");

    scene2.classList.remove("hidden");

  }
);


/* =========================
   SCENE 2 -> 3
========================= */

continueButton.addEventListener(
  "click",
  function () {

    scene2.classList.add("hidden");

    scene3.classList.remove("hidden");

  }
);


/* =========================
   SCENE 3 -> 4
========================= */

nextButton.addEventListener(
  "click",
  function () {

    scene3.classList.add("hidden");

    scene4.classList.remove("hidden");

  }
);


/* =========================
   NO BUTTON RUNS AWAY
========================= */

noButton.addEventListener(
  "click",
  function () {

    const padding = 20;

    const maxX =
      window.innerWidth
      - noButton.offsetWidth
      - padding;

    const maxY =
      window.innerHeight
      - noButton.offsetHeight
      - padding;


    const randomX =
      Math.max(
        padding,
        Math.floor(
          Math.random() * maxX
        )
      );

    const randomY =
      Math.max(
        padding,
        Math.floor(
          Math.random() * maxY
        )
      );


    noButton.style.position =
      "fixed";

    noButton.style.left =
      randomX + "px";

    noButton.style.top =
      randomY + "px";

    noButton.style.zIndex =
      "9999";

  }
);


/* =========================
   YES -> BIRTHDAY
========================= */

yesButton.addEventListener(
  "click",
  function () {

    scene4.classList.add("hidden");

    scene5.classList.remove("hidden");

  }
);


/* =========================
   FINAL LETTER
========================= */

finalButton.addEventListener(
  "click",
  function () {

    scene5.classList.add("hidden");

    scene6.classList.remove("hidden");

  }
);
