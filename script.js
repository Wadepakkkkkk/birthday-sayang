document.addEventListener("DOMContentLoaded", function () {

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


  const startBtn =
    document.getElementById("start-btn");

  const continueBtn =
    document.getElementById("continue-btn");

  const nextBtn =
    document.getElementById("next-btn");

  const yesBtn =
    document.getElementById("yes-btn");

  const noBtn =
    document.getElementById("no-btn");

  const finalBtn =
    document.getElementById("final-btn");

  const music =
    document.getElementById("bg-music");


  /* =========================
     CHANGE SCENE
  ========================== */

  function showScene(scene) {

    document
      .querySelectorAll(".screen")
      .forEach(function (screen) {

        screen.classList.add("hidden");

      });


    scene.classList.remove("hidden");

  }


  /* =========================
     START
  ========================== */

  startBtn.addEventListener("click", function () {

    if (music) {

      music.volume = 0.5;

      music.play().catch(function () {
        console.log("Music waiting for user interaction.");
      });

    }

    showScene(scene2);

  });


  /* =========================
     SCENE 2
  ========================== */

  continueBtn.addEventListener("click", function () {

    showScene(scene3);

  });


  /* =========================
     SCENE 3 MEMORY QUIZ
  ========================== */

  const quizOptions =
    document.querySelectorAll(".quiz-option");

  const quizResult =
    document.getElementById("quiz-result");


  quizOptions.forEach(function (option) {

    option.addEventListener("click", function () {


      /* CORRECT ANSWER */

      if (
        option.classList.contains("correct-answer")
      ) {

        quizResult.textContent =
          "CORRECT! ♡ MEMORY UNLOCKED";

        option.classList.add(
          "answer-correct"
        );


        quizOptions.forEach(function (button) {

          button.disabled = true;

        });


        nextBtn.classList.remove("hidden");

      }


      /* WRONG ANSWER */

      else {

        quizResult.textContent =
          "WRONG MEMORY! TRY AGAIN ♡";


        option.classList.add(
          "answer-wrong"
        );


        setTimeout(function () {

          option.classList.remove(
            "answer-wrong"
          );

        }, 350);

      }

    });

  });


  /* NEXT AFTER CORRECT ANSWER */

  nextBtn.addEventListener("click", function () {

    showScene(scene4);

  });


  /* =========================
     SCENE 4
  ========================== */

  yesBtn.addEventListener("click", function () {

    showScene(scene5);

  });


  /* NO BUTTON RUNS AWAY */

  noBtn.addEventListener("click", function () {

    noBtn.textContent =
      "ARE YOU SURE? 😭";

  });


  noBtn.addEventListener("mouseenter", function () {

    const x =
      Math.floor(Math.random() * 80) - 40;

    const y =
      Math.floor(Math.random() * 40) - 20;


    noBtn.style.transform =
      "translate(" + x + "px," + y + "px)";

  });


  /* =========================
     SCENE 5
  ========================== */

  finalBtn.addEventListener("click", function () {

    showScene(scene6);

  });

});
