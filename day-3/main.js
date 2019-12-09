const fs = require("fs");
const input = fs
  .readFileSync("input", { encoding: "utf8" })
  .replace(" ", "")
  .split("\n");
const instructions1 = input[0].split(",");
const instructions2 = input[1].split(",");
const CENTRAL_PORT = [0, 0];
let [path1, path2] = [[], []];
let [wire1, wire2] = [[], []];

path1[0] = CENTRAL_PORT.slice();
path2[0] = CENTRAL_PORT.slice();

instructions1.map(x => wire1.push([x[0], x.slice(1)]));
instructions2.map(x => wire2.push([x[0], x.slice(1)]));

const longest_wire =
  instructions1.length < instructions2.length
    ? instructions2.length
    : instructions1.length;

const findIntersections = () => {
  for (let i = 0; i < longest_wire; i++) {
    drawPath(instructions1[i], path1[i].slice(), path1);
    drawPath(instructions2[i], path2[i].slice(), path2);
  }
};

const drawPath = (x, point, path) => {
  switch (x[0]) {
    case "R":
      point[0] += parseInt(x.slice(1));
      break;
    case "D":
      point[1] += parseInt(x.slice(1));
      break;
    case "L":
      point[0] -= parseInt(x.slice(1));
      break;
    case "U":
      point[1] -= parseInt(x.slice(1));
      break;
  }
  path.push(point.slice());
};

findIntersections();
