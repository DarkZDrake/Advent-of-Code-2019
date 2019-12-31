const fs = require("fs");

const input = fs
    .readFileSync("input", {encoding: "utf8"}).split('\n').map(i => i.split(")"));

/*const input = ("COM)B\n" +
    "B)C\n" +
    "C)D\n" +
    "D)E\n" +
    "E)F\n" +
    "B)G\n" +
    "G)H\n" +
    "D)I\n" +
    "E)J\n" +
    "J)K\n" +
    "K)L").split('\n').map(i => i.split(")"));*/

const mapTree = input.reduce((out, [main, orbital]) => {
    out[main] = out[main] || {direct: new Set(), indirect: new Set()};
    out[main].direct.add(orbital);
    return out;
}, {});

input.forEach(([a, b]) => {
    const findIndirect = o => {
        if (mapTree[o]) {
            mapTree[o].direct.forEach(i => {
                mapTree[a].indirect.add(i);
                findIndirect(i);
            });
        }
    };
    findIndirect(b);
});

const orbits = Object.values(mapTree).reduce(
    (total, {direct, indirect}) => total + direct.size + indirect.size,
    0
);

const keys = Object.keys(mapTree);
const me = keys.find(k => mapTree[k].direct.has("YOU"));
const santa = keys.find(k => mapTree[k].direct.has("SAN"));

const orbitsMe = keys.filter(
    k => k === me || mapTree[k].direct.has(me) || mapTree[k].indirect.has(me)
);
const orbitsSanta = keys.filter(
    k => k === santa || mapTree[k].direct.has(santa) || mapTree[k].indirect.has(santa)
);

const diffMe = orbitsMe.filter(i => !orbitsSanta.includes(i));
const diffSanta = orbitsSanta.filter(i => !orbitsMe.includes(i));
const transfers = [...diffMe, ...diffSanta].length;

console.log(transfers);