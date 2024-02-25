class Factory {
  constructor(
    name,
    inputType1,
    inputAmount1,
    inputType2,
    inputAmount2,
    outputType1,
    outputAmount1,
    outputType2,
    outputAmount2,
    cost
  ) {
    this.factoryName = name;
    this.inputType1 = inputType1;
    this.inputAmount1 = inputAmount1;
    this.inputType2 = inputType2;
    this.inputAmount2 = inputAmount2;
    this.outputType1 = outputType1;
    this.outputAmount1 = outputAmount1;
    this.outputType2 = outputType2;
    this.outputAmount2 = outputAmount2;
    this.buildCost = cost;
    this.factoryCount = 1;
    this.timerId = null;
  }
  startProduction() {
    if (this.checkInput()) {
      console.log("production started");
      let i = 0;
      this.timerId = setInterval(() => {
        if (i % 5 === 0) {
          warehouse[this.outputType1] += this.outputAmount1;
          if (this.outputType2 !== 0) {
            warehouse[this.outputType2] += this.outputAmount2;
          }

          //   clearInterval(this.timerId);
        }
        i++;
      }, 1000);
    }
  }
  checkInput() {
    if (this.inputType1 !== null && this.inputType2 === null) {
      if (warehouse[this.inputType1] === this.inputAmount1) {
        console.log("Input Check = True");
        return true;
      }
    } else if (this.inputType1 !== null && this.inputType2 !== null) {
      if (
        warehouse[this.inputType1] === this.inputAmount1 &&
        warehouse[this.inputType2] === this.inputAmount2
      ) {
        console.log("Input Check = True");
        return true;
      }
    } else if (this.inputType1 === null && this.inputType2 === null) {
      console.log("Input Check = True");
      return true;
    }
  }
}
