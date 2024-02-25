const moneyCounter = document.getElementById("money-count");
const resourceCounter = document.querySelectorAll(".res-counter");
const monthCounter = document.getElementById("month-counter");
const dayCounter = document.getElementById("day-counter");

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

function update() {
  moneyCounter.innerText = currentMoney;
  monthCounter.innerText = currentMonth.toString().padStart(2, "0");
  dayCounter.innerText = currentDay.toString().padStart(2, "0");

  resourceCounter.forEach((resource) => {
    resource.innerText = warehouse[resource.id];
  });

  activeFactories.forEach((e) => e.startProduction());
}

function gameLoop() {
  update();
}

gameLoopTimerId = setInterval(() => {
  gameLoop();
}, 30 / 1000);

const wheatFactory = new Factory(
  "Wheat Factory",
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
  "Cow Factory",
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

const factories = [wheatFactory, cowFactory];

const activeFactories = [wheatFactory, cowFactory];
