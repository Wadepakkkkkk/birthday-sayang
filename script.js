const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const scene2 = document.getElementById("scene-2");
const bgMusic = document.getElementById("bg-music");

startButton.addEventListener("click", function () {
  bgMusic.play();

  startScreen.classList.add("hidden");
  scene2.classList.remove("hidden");
});

const continueButton = document.getElementById("continue-btn");
const scene3 = document.getElementById("scene-3");

continueButton.addEventListener("click", function () {
  scene2.classList.add("hidden");
  scene3.classList.remove("hidden");
});
const nextButton = document.getElementById("next-btn");
const scene4 = document.getElementById("scene-4");

nextButton.addEventListener("click", function () {
  scene3.classList.add("hidden");
  scene4.classList.remove("hidden");
});
const noButton = document.getElementById("no-btn");

noButton.addEventListener("click", function () {

  const maxX = window.innerWidth - noButton.offsetWidth;
  const maxY = window.innerHeight - noButton.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noButton.style.position = "fixed";
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
  noButton.style.zIndex = "999";
});
const yesButton = document.getElementById("yes-btn");
const scene5 = document.getElementById("scene-5");

yesButton.addEventListener("click", function () {
  scene4.classList.add("hidden");
  scene5.classList.remove("hidden");
});
const finalButton = document.getElementById("final-btn");
const scene6 = document.getElementById("scene-6");

finalButton.addEventListener("click", function () {
  scene5.classList.add("hidden");
  scene6.classList.remove("hidden");
});
