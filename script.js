const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const scene2 = document.getElementById("scene-2");

startButton.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  scene2.classList.remove("hidden");
});
const continueButton = document.getElementById("continue-btn");
const scene3 = document.getElementById("scene-3");

continueButton.addEventListener("click", function () {
  scene2.classList.add("hidden");
  scene3.classList.remove("hidden");
});
