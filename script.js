const moneyCounter = document.getElementById("money-count");
const resourceCounter = document.querySelectorAll(".res-counter");
const monthCounter = document.getElementById("month-counter");
const dayCounter = document.getElementById("day-counter");
const factoryCards = document.querySelectorAll(".factory-card");

let gameLoopTimerId = null;

let currentMonth = 1;
let currentDay = 1;

const warehouse = {
  wheat: 100,
  flour: 0,
  bread: 0,
  cows: 0,
  milk: 0,
  meat: 0,
  burgers: 0,
};

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

  //   activeFactories.forEach((e) => e.startProduction());
}

function gameLoop() {
  update();
}

gameLoopTimerId = setInterval(() => {
  gameLoop();
}, 30 / 1000);

const wheatFarm = new Factory(
  "wheat farm",
  0,
  null,
  null,
  null,
  null,
  1,
  "wheat",
  10,
  null,
  null,
  10
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

const factories = [wheatFarm, cowFactory];

const activeFactories = [wheatFarm, cowFactory];

function updateFactoryCards() {
  factoryCards.forEach((card) => {
    activeFactories.forEach((factory) => {
      if (factory.factoryName === card.id) {
        card.classList.toggle("active");
        card.querySelector(".title-text").innerText = capitalizeFirstLetters(
          factory.factoryName
        );
        card.querySelector("span.cost-text").innerText = factory.buildCost;
      }
    });
  });
}

// updateFactoryCards();
