let gameOver = false;
const secondsPerDay = 2;
const secondsBeforeGameOverScreen = 6;
const secondsForBgMusicFadeOut = 8;
const startMoney = 9999;
const startMonth = 12;
const startDay = 27;
const loseMessage =
  "You lost! You did not manage to become a millionaire in time.  :(";
const winMessage = "You won!!! Congrats, you are a millionaire!!! :)";
//music + sounds
const buySound = new Audio("sounds/reload.mp3");
buySound.volume = 0.3;
const bgMusic = new Audio("sounds/025_A_New_Town.mp3");
const startBgMusicVolume = 0.2;
bgMusic.volume = startBgMusicVolume;
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
  burgers: 100,
};
