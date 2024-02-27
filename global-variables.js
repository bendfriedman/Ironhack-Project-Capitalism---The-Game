let gameOver = false;
const secondsPerDay = 1;
let startMoney = 9999;
let startMonth = 12;
let startDay = 25;

//music + sounds
const buySound = new Audio("sounds/reload.mp3");
buySound.volume = 0.3;
const bgMusic = new Audio("sounds/025_A_New_Town.mp3");
bgMusic.volume = 0.2;
bgMusic.loop = true;
const sellSound = new Audio("sounds/cash-register-kaching-sound-effect.mp3");
sellSound.volume = 0.4;

const warehouse = {
  wheat: 0,
  flour: 0,
  cows: 0,
  milk: 0,
  bread: 0,
  meat: 0,
  burgers: 0,
};

const resourePrices = {
  wheat: 0.5,
  flour: 1,
  cows: 100,
  milk: 1,
  bread: 0.2,
  meat: 20,
  burgers: 999,
};
