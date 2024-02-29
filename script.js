const splashStartBtn = document.getElementById("splash-start-btn");
const splashScreen = document.getElementById("splash-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverMsg = document.getElementById("game-over-msg");
const gameOverScore = document.getElementById("game-over-score");
const gameOverRestartBtn = document.getElementById("go-restart-btn");
const gameOverMenuBtn = document.getElementById("go-menu-btn");
const moneyCounter = document.getElementById("money-count");
const resourceCounter = document.querySelectorAll(".res-counter");
const resourceCards = document.querySelectorAll(".resource-card");
const monthCounter = document.getElementById("month-counter");
const dayCounter = document.getElementById("day-counter");
const factoryCards = document.querySelectorAll(".factory-card");
let gameLoopTimerId = null;
// let productionCheckTimer = null;
let dayTimerId = null;

let currentMoney = startMoney;
let currentMonth = startMonth;
let currentDay = startDay;
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const screens = [splashScreen, gameScreen, gameOverScreen];

const wheatFarm = new Factory(
  "wheat farm",
  0,
  null,
  0,
  null,
  0,
  1,
  "wheat",
  10,
  null,
  0,
  40
);

const mill = new Factory(
  "mill",
  1,
  "wheat",
  30,
  null,
  null,
  1,
  "flour",
  20,
  null,
  null,
  200
);

const cowFactory = new Factory(
  "cow farm",
  1,
  "wheat",
  100,
  null,
  null,
  2,
  "cows",
  1,
  "milk",
  5,
  500
);

const bakery = new Factory(
  "bakery",
  1,
  "flour",
  10,
  null,
  null,
  1,
  "bread",
  200,
  null,
  null,
  400
);

const butchery = new Factory(
  "butchery",
  1,
  "cows",
  1,
  null,
  null,
  1,
  "meat",
  10,
  null,
  null,
  2500
);

const burgerStore = new Factory(
  "burger store",
  2,
  "meat",
  999,
  "bread",
  999,
  1,
  "burgers",
  999,
  null,
  null,
  50000
);

const factories = [wheatFarm, mill, cowFactory, bakery, butchery, burgerStore];

const activeFactories = [
  wheatFarm,
  mill,
  cowFactory,
  bakery,
  butchery,
  burgerStore,
];

splashStartBtn.addEventListener("click", () => {
  startGame();
});

gameOverRestartBtn.addEventListener("click", () => {
  startGame();
});

gameOverMenuBtn.addEventListener("click", () => {
  switchScreen(splashScreen);
});

function switchScreen(switchedScreen) {
  screens.forEach((screen) => {
    if (screen != switchedScreen) {
      screen.style.display = "none";
    }
    switchedScreen.style.display = "flex";
  });
}

function capitalizeFirstLetters(text) {
  let newText = text.split(" ");

  newText.forEach((word, index) => {
    newText[index] = word[0].toUpperCase() + word.slice(1);
  });
  return newText.join(" ");
}

function update() {
  moneyCounter.innerText = currentMoney.toLocaleString();
  monthCounter.innerText = currentMonth.toString().padStart(2, "0");
  dayCounter.innerText = currentDay.toString().padStart(2, "0");

  resourceCounter.forEach((resource) => {
    resource.innerText = warehouse[resource.id].toLocaleString();
  });

  activeFactories.forEach((factory) => {
    factory.startProduction();
  });
}

function startDayTimer() {
  let i = 0;
  dayTimerId = setInterval(() => {
    i++;
    if (i % secondsPerDay === 0) {
      if (currentDay < daysPerMonth[currentMonth - 1]) {
        currentDay++;
      } else if (currentMonth < 12) {
        currentMonth++;
        currentDay = 1;
      } else {
        currentMonth = 0;
        currentDay = 0;
        GameOver();
        clearInterval(dayTimerId);
      }
    }
  }, 1000);
}

function GameOver() {
  if (currentDay === 0 && currentMonth === 0) {
    gameOver = true;
    update();
    clearInterval(gameLoopTimerId);
    gameOverScore.innerText = currentMoney;
    if (currentMoney < 1000 * 1000) {
      gameOverMsg.innerText = loseMessage;
      console.log("GAME OVER! YOU LOSE!");
    } else {
      gameOverMsg.innerText = winMessage;
      console.log("CONGRATS, YOU WON!!!");
    }

    let i = 0;
    let tempVolumeStorage = bgMusic.volume;
    const gameOverTimerId = setInterval(() => {
      i++;

      if (i % secondsBeforeGameOverScreen === 0) {
        switchScreen(gameOverScreen);
      }
      if (i % secondsForBgMusicFadeOut === 0) {
        bgMusic.pause();
        clearInterval(gameOverTimerId);
      } else {
        bgMusic.volume -= tempVolumeStorage / secondsForBgMusicFadeOut;
      }
    }, 1000);
  }
}

function startGameLoop() {
  gameOver = false;
  resetGame();
  gameLoopTimerId = setInterval(() => {
    update();
  }, 30 / 1000);
  startDayTimer();
  updateCards();
  checkBtnClicked();
  bgMusic.play();
}

function startGame() {
  switchScreen(gameScreen);
  startGameLoop();
}

function resetGame() {
  currentDay = startDay;
  currentMonth = startMonth;
  currentMoney = startMoney;
  bgMusic.currentTime = 0;
  bgMusic.volume = startBgMusicVolume;
  //reset resources to 0
  for (resource in warehouse) {
    warehouse[resource] = 0;
  }
  //reset factories
  activeFactories.forEach((factory) => (factory.factoryCount = 0));
  factoryCards.forEach((card) => card.classList.remove("active"));
}

function updateCards() {
  factoryCards.forEach((card) => {
    activeFactories.forEach((factory) => {
      if (factory.factoryName === card.id) {
        if (factory.factoryCount > 0) {
          card.classList.add("active");
        }

        card.querySelector(".title-text").innerText = capitalizeFirstLetters(
          factory.factoryName
        );
        card.querySelector("span.cost-text").innerText = factory.buildCost;

        //update Inputs on factory cards
        if (factory.amountOfInputs === 0) {
          card.querySelector(".input").style.display = "none";
        } else {
          card.querySelector(".inputAmount1").innerText = factory.inputAmount1;
          card.querySelector(".inputType1").innerText = factory.inputType1;
          if (factory.amountOfInputs === 2) {
            card.querySelector(".inputAmount2").innerText =
              " + " + factory.inputAmount2;
            card.querySelector(".inputType2").innerText = factory.inputType2;
          }
        }

        //update Outputs on factory cards
        card.querySelector(".outputAmount1").innerText = factory.outputAmount1;
        card.querySelector(".outputType1").innerText = factory.outputType1;
        if (factory.amountOfOutputs === 2) {
          card.querySelector(".outputAmount2").innerText =
            " + " + factory.outputAmount2;
          card.querySelector(".outputType2").innerText = factory.outputType2;
        }

        //update factoryCount
        card.querySelector(".factoryCount").innerText = factory.factoryCount
          .toString()
          .padStart(2, "0");
      }
    });
  });

  //update resource prices
  resourceCards.forEach((e) => {
    e.querySelector(".sales-price").innerText =
      resourePrices[e.querySelector(".res-counter").id];
  });
}

function checkBtnClicked() {
  //BuyBtns
  const allBuyBtns = document.querySelectorAll(".buy-btn");
  allBuyBtns.forEach((button) => {
    button.addEventListener("click", () => {
      activeFactories.forEach((factory) => {
        if (factory.factoryName === button.name) {
          factory.buildFactory();
        }
      });
      updateCards();
    });
  });

  //SellBtns
  const allSellBtns = document.querySelectorAll(".sell-btn");
  allSellBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (warehouse[button.name] > 0 && !gameOver) {
        let tempAmount = warehouse[button.name];
        warehouse[button.name] -= tempAmount;
        currentMoney += resourePrices[button.name] * tempAmount;
        sellSound.play();
      }
    });
  });
}
