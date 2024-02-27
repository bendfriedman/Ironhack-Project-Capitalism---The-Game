class Factory {
  constructor(
    name,
    amountOfInputs,
    inputType1,
    inputAmount1,
    inputType2,
    inputAmount2,
    amountOfOutputs,
    outputType1,
    outputAmount1,
    outputType2,
    outputAmount2,
    cost
  ) {
    this.factoryName = name;
    this.amountOfInputs = amountOfInputs;
    this.inputType1 = inputType1;
    this.inputAmount1 = inputAmount1;
    this.inputType2 = inputType2;
    this.inputAmount2 = inputAmount2;
    this.amountOfOutputs = amountOfOutputs;
    this.outputType1 = outputType1;
    this.outputAmount1 = outputAmount1;
    this.outputType2 = outputType2;
    this.outputAmount2 = outputAmount2;
    this.buildCost = cost;
    this.factoryCount = 0;
    this.maxFactoryCount = 99;
    this.productionTimerId = null;
    this.producing = false;
  }
  startProduction() {
    if (!this.producing && this.checkInput() && this.factoryCount > 0) {
      console.log(this.factoryName, "production started");
      this.producing = true;
      this.eatInputs();

      let i = 0;
      this.productionTimerId = setInterval(() => {
        i++;
        if (i % secondsPerDay === 0) {
          warehouse[this.outputType1] += this.outputAmount1 * this.factoryCount;
          if (this.amountOfOutputs === 2) {
            warehouse[this.outputType2] +=
              this.outputAmount2 * this.factoryCount;
          }
          this.producing = false;
          clearInterval(this.productionTimerId);
        }
      }, 1000);
    }
  }
  checkInput() {
    if (this.amountOfInputs === 1) {
      if (warehouse[this.inputType1] > this.inputAmount1 * this.factoryCount) {
        return true;
      }
    } else if (this.amountOfInputs === 2) {
      if (
        warehouse[this.inputType1] > this.inputAmount1 * this.factoryCount &&
        warehouse[this.inputType2] > this.inputAmount2 * this.factoryCount
      ) {
        return true;
      }
    } else if (this.amountOfInputs === 0) {
      return true;
    }
  }

  eatInputs() {
    if (this.amountOfInputs === 1) {
      warehouse[this.inputType1] -= this.inputAmount1 * this.factoryCount;
    }
    if (this.amountOfInputs === 2) {
      warehouse[this.inputType2] -= this.inputAmount2 * this.factoryCount;
    }
  }

  buildFactory() {
    if (
      currentMoney >= this.buildCost &&
      this.factoryCount < this.maxFactoryCount &&
      !gameOver
    ) {
      this.factoryCount += 1;
      currentMoney -= this.buildCost;
      buySound.play();
      console.log("You built 1x", this.factoryName);
    } else {
      console.log("not enought money!");
    }
  }
}
