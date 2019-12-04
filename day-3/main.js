const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf8'}).replace(" ", "").split('\n');
const originalWire1 = input[0].split(',');
const originalWire2 = input[1].split(',');
const CENTRAL_PORT = {'x': 0, 'y': 0};
let [path1, path2] = [CENTRAL_PORT, CENTRAL_PORT];
let [wire1, wire2] = [[], []];
originalWire1.map(x => wire1.push({'direction': x[0], 'value': x.slice(1)}));
originalWire2.map(x => wire2.push({'direction': x[0], 'value': x.slice(1)}));
const longest_wire = originalWire1.length < originalWire2.length ? originalWire2.length : originalWire1.length;

const findIntersections = () => {
    for (let i = 0; i < longest_wire; i++) {
        console.log(path1, path2);
        drawPath(originalWire1[i], path1);
        drawPath(originalWire2[i], path2);
    }
};

const drawPath = (x, path) => {
    console.log(x)
    switch (x[0]) {
        case 'R':
            path.x += parseInt(x.slice(1));
            break;
        case 'D':
            path.y += parseInt(x.slice(1));
            break;
        case 'L':
            path.x -= parseInt(x.slice(1));
            break;
        case 'U':
            path.y -= parseInt(x.slice(1));
            break;
    }
};


findIntersections();