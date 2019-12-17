const fs = require("fs");
const EXPECTED = 19690720;

const input = fs
  .readFileSync("input", { encoding: "utf8" })
  .replace("\n", "")
  .split(",")
  .map(Number);
let intCode = input.slice();

const gravityAssistant = input => {};

const operationManager = code => {
  switch (code) {
    case 4:
      break;
    case 3:
      break;
    case 2:
      break;
    case 1:
      break;
    case 99:
      return;
  }
};

console.log(gravityAssistant(1));
