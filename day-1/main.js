const fs = require("fs");
let input = fs.readFileSync("input.txt", { encoding: "utf8" }).split(/\r?\n/);
let total = 0;
const calcolateNeededFuel = mass => Math.floor(mass / 3) - 2;

const calcolateTotalNeededWithoutFuel = modules => {
  let total_needing = 0;

  modules.forEach(module => {
    total_needing += calcolateNeededFuel(module);
  });
  return total_needing;
};

const calcolateFuelRequirement = modules => {
  let total_needingv2 = 0;

  modules.forEach(module => {
    total_needingv2 += calcolateTotalNeeded(module);
  });
  return total_needingv2;
};

const calcolateTotalNeeded = mass => {
  console.log(total);
  if (mass <= 8) return total;
  total += calcolateNeededFuel(mass);
  return calcolateTotalNeeded(calcolateNeededFuel(mass));
};

console.log("Funzione   " + calcolateTotalNeededWithoutFuel(input));
console.log("Funzione2  " + calcolateFuelRequirement(input));
