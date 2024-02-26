const moneyCounter = document.getElementById("money-count");
const resourceCounter = document.querySelectorAll(".res-counter");
const monthCounter = document.getElementById("month-counter");
const dayCounter = document.getElementById("day-counter");
const factoryCards = document.querySelectorAll(".factory-card");

let gameLoopTimerId = null;

let currentMonth = 1;
let currentDay = 1;

function capitalizeFirstLetters(text) {
  let newText = text.split(" ");

  newText.forEach((word, index) => {
    newText[index] = word[0].toUpperCase() + word.slice(1);
  });
  return newText.join(" ");
}

function update() {
  moneyCounter.innerText = currentMoney;
  monthCounter.innerText = currentMonth.toString().padStart(2, "0");
  dayCounter.innerText = currentDay.toString().padStart(2, "0");

  resourceCounter.forEach((resource) => {
    resource.innerText = warehouse[resource.id];
  });

  activeFactories.forEach((e) => e.startProduction());
  updateFactoryCards();
}

function gameLoop() {
  update();
}

function gameStart() {
  gameLoopTimerId = setInterval(() => {
    gameLoop();
  }, 30 / 1000);
}

gameStart();

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
  10
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
  20
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
  100
);

const factories = [wheatFarm, mill, cowFactory];

const activeFactories = [wheatFarm];

function updateFactoryCards() {
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
}

function checkBtnClicked() {
  const allBuyBtns = document.querySelectorAll(".buy-btn");
  allBuyBtns.forEach((button) => {
    button.addEventListener("click", () => {
      activeFactories.forEach((factory) => {
        if (factory.factoryName === button.name) {
          factory.buildFactory();
        }
      });
      // updateFactoryCards();
    });
  });
}

checkBtnClicked();
