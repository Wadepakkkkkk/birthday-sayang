const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const scene2 = document.getElementById("scene-2");

startButton.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  scene2.classList.remove("hidden");
});
