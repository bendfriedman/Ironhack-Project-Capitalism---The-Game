const moneyCounter = document.getElementById("money-count");
const resourceCounter = document.querySelectorAll(".res-counter");
const monthCounter = document.getElementById("month-counter");
const dayCounter = document.getElementById("day-counter");

let gameLoopTimerId = null;
// const secondsPerDay = 5;

let currentMoney = 5000;
let currentMonth = 3;
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
}

function gameLoop() {
  update();
}

gameLoopTimerId = setInterval(() => {
  gameLoop();
}, 30 / 1000);

const testFactory = new Factory(
  "Cow Factory",
  "wheat",
  100,
  null,
  null,
  "cows",
  1,
  "milk",
  5,
  100
);

// console.log(testFactory.checkInput());
// console.log(warehouse[testFactory.inputType1]);
testFactory.startProduction();
