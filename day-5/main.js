const fs = require("fs");

/*const input = fs
    .readFileSync("input", {encoding: "utf8"})
    .replace("\n", "")
    .split(",")
    .map(Number);*/

const input = "1002,4,3,4,33";
let intCode = input.split(",")
    .map(Number).slice();

console.log(intCode)

const gravityAssistant = input => {
    let i = 0;
    while (i < intCode.length) {
        switch (intCode[i]) {
            case 99:
                console.log(intCode[0]);
                return intCode[0];
            case 3:
                intCode[intCode[i + 1]] = input;
                i += 2;
                break;
            default:
                let opCode = immediateMode(intCode[i]).slice();
                switch (opCode[0]) {
                    case 1:
                        intCode[intCode[i + 3]] = getValue(opCode, 1, i) + getValue(opCode, 2, i);
                        i += 4;
                        break;
                    case 2:
                        intCode[intCode[i + 3]] = getValue(opCode, 1, i) * getValue(opCode, 2, i);
                        i += 4;
                        break;
                    case 4:
                        console.log(getValue(opCode, 1, i));
                        i += 2;
                        break;
                }
                break;
        }
    }
};

const operationManager = (code, input, i) => {
    switch (code) {
        case 99:
            console.log(intCode[0]);
            return intCode[0];
        case 3:
            intCode[intCode[i + 1]] = input;
            i += 2;
            break;
        default:
            let opCode = immediateMode(code).slice();
            switch (opCode[0]) {
                case 1:
                    intCode[intCode[i + 3]] = getValue(opCode, 2, i) + getValue(opCode, 3, i);
                    i += 4;
                    break;
                case 2:
                    intCode[intCode[i + 3]] = getValue(opCode, 2, i) * getValue(opCode, 3, i);
                    i += 4;
                    break;
                case 4:
                    console.log(getValue(opCode, 1, i));
                    i += 2;
                    break;
                default:
                    return i + 4;
            }
            break;
    }
    return i;
};


const immediateMode = code => {
    let opcode = [];
    opcode.push(code % 100);
    opcode.push(Math.floor(code / 100) % 10);
    opcode.push(Math.floor(code / 1000) % 10);
    opcode.push(Math.floor(code / 10000) % 10);
    return opcode;
}

const getValue = (opCode, index, i) => {
    console.log(opCode, "DED")
    return opCode[index] === 0 ? intCode[intCode[i + index]] : intCode[i + index];
};

console.log(gravityAssistant(1));
