console.time('start');
const fs = require("fs");
const input = fs
    .readFileSync("input", {encoding: "utf8"})
    .replace(" ", "")
    .split("\n");

const instructions1 = input[0].split(",");
const instructions2 = input[1].split(",");
const CENTRAL_PORT = [14000, 9000];
let [path1, path2] = [[], []];
let [wire1, wire2] = [[], []];
let intersection = [];

path1[0] = [CENTRAL_PORT[0], CENTRAL_PORT[1]];
path2[0] = [CENTRAL_PORT[0], CENTRAL_PORT[1]];
instructions1.map(x => wire1.push([x[0], parseInt(x.slice(1))]));
instructions2.map(x => wire2.push([x[0], parseInt(x.slice(1))]));

const findIntersections = () => {
    let tmp;
    drawPath(wire1, path1);
    drawPath(wire2, path2);
    for (let i = 0; i < path1.length - 1; i += 1) {
        for (let j = 0; j < path2.length - 1; j += 1) {
            tmp = doIntersect(path1[i], path1[i + 1], path2[j], path2[j + 1]);
            if (tmp !== undefined) {
                intersection.push(tmp);
            }
        }
    }
    intersection.shift();
};

const drawPath = (instructions, path) => {
    let point = path[0].slice();
    instructions.forEach(instruction => {
        switch (instruction[0]) {
            case "R":
                point[0] += instruction[1];
                break;
            case "D":
                point[1] += instruction[1];
                break;
            case "L":
                point[0] -= instruction[1];
                break;
            case "U":
                point[1] -= instruction[1];
                break;
        }
        path.push([point[0], point[1]]);
    })
};

const doIntersect = (p1, p2, p3, p4) => {
    /*
    *  p1 e p2 segmento 1
    *  p3 e p4 segmento 2
    */
    let intersect = [0, 0];
    let delta = ((p4[1] - p3[1]) * (p2[0] - p1[0])) - ((p4[0] - p3[0]) * (p2[1] - p1[1]));

    if (delta !== 0) {

        let delta1 = ((p4[0] - p3[0]) * (p1[1] - p3[1])) - ((p4[1] - p3[1]) * (p1[0] - p3[0]));
        let delta2 = ((p2[0] - p1[0]) * (p1[1] - p3[1])) - ((p2[1] - p1[1]) * (p1[0] - p3[0]));

        let ka = delta1 / delta;
        let kb = delta2 / delta;

        if (ka >= 0 && ka <= 1 && kb >= 0 && kb <= 1) {
            intersect = [p1[0] + ka * (p2[0] - p1[0]), p1[1] + ka * (p2[1] - p1[1])];
            return intersect;
        }
    }
};

const manhattanDistance = (point) => {
    let tmp;
    tmp = Math.abs(CENTRAL_PORT[0] - point[0]) + Math.abs(CENTRAL_PORT[1] - point[1]);
    return tmp;
};

const calcSteps = (path, point) => {
    let steps = 0;
    for (let i = 0; i < path.length - 1; i++) {

        if (det(path[i], path[i + 1], point) === 0) {
            steps += path[i][0] === point[0] ? Math.abs(point[1] - path[i][1]) : Math.abs(point[0] - path[i][0]);
            return steps;
        }
        steps += path[i][0] === path[i + 1][0] ? Math.abs(path[i + 1][1] - path[i][1]) : Math.abs(path[i + 1][0] - path[i][0]);
    }
};

const det = (p1, p2, p3) => {
    let tmp;
    tmp = (p1[0] * p2[1] + p2[0] * p3[1] + p3[0] * p1[1]) - (p2[1] * p3[0] + p1[0] * p3[1] + p2[0] * p1[1]);
    return tmp;
}

const minDistance = () => {
    let min_manhattan, min_steps;
    intersection.forEach(point => {
        min_manhattan = min_manhattan > manhattanDistance(point) || min_manhattan === undefined ? manhattanDistance(point) : min_manhattan;
        min_steps = min_steps > calcSteps(path1, point) + calcSteps(path2, point) || min_steps === undefined ? calcSteps(path1, point) + calcSteps(path2, point) : min_steps;
    });
    console.log(min_manhattan, min_steps);
};

findIntersections();
minDistance();

console.timeEnd('start')
/*
 *
 *
 *
 *
 *RAPPRESENTAZIONE SU CANVAS
 *
 *
 *
 */
/*
var c = document.getElementsByTagName("canvas");
var ctx = c[0].getContext("2d");
ctx.lineWidth = 6;
ctx.scale(0.3, 0.3);

const drawOnCanvas = point => {
    ctx.lineTo(point[0] / 10, point[1] / 10);
};


ctx.beginPath();
path1.forEach(point => {
    drawOnCanvas(point);
});
ctx.stroke();

ctx.strokeStyle = "red";
ctx.beginPath();
path2.forEach(point => {
    drawOnCanvas(point);
});
ctx.stroke();


ctx.fillStyle = "yellow"

intersection.forEach(point => {
    ctx.beginPath();
    ctx.arc(point[0] / 10, point[1] / 10, 4, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
});

*/