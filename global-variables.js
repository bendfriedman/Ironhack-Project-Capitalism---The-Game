const titleOfGame = "Capitalism: The Game";
let gameOver = false;
const secondsPerDay = 2;
const secondsBeforeGameOverScreen = 3;
const secondsForBgMusicFadeOut = 5;
const startMoney = 50;
const startMonth = 1;
const startDay = 1;
const loseMessage =
  "You lost! You did not manage to become a millionaire in time.  :(";
const winMessage = "You won!!! Congrats, you are a millionaire!!! :)";
//music + sounds
const buySound = new Audio("sounds/reload.mp3");
const startBuySoundVolume = 0.2;
const bgMusic = new Audio("sounds/025_A_New_Town.mp3");
const startBgMusicVolume = 0.2;
bgMusic.loop = true;
const sellSound = new Audio("sounds/cash-register-kaching-sound-effect.mp3");
const startSellSoundVolume = 0.4;

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
  wheat: 0.1,
  flour: 1,
  cows: 100,
  milk: 1,
  bread: 0.5,
  meat: 20,
  burgers: 50,
};
