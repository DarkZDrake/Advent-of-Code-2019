const fs = require("fs");

const input = fs
    .readFileSync("input", {encoding: "utf8"})
    .replace("\n", "")
    .split(",")
    .map(Number);

/*const input = "1002,4,3,4,33";*/
let intCode = input.slice();

const gravityAssistant = input => {
    let i = 0;
    while (i < intCode.length) {
        switch (intCode[i]) {
            case 99:
                return intCode[0];
            case 3:
                intCode[intCode[i + 1]] = input;
                i += 2;
                break;
            default:
                let opCode = immediateMode(intCode[i]).slice();
                switch (opCode[0]) {
                    case 1:
                        intCode[intCode[i + 3]] =
                            getValue(opCode, 1, i) + getValue(opCode, 2, i);
                        i += 4;
                        break;
                    case 2:
                        intCode[intCode[i + 3]] =
                            getValue(opCode, 1, i) * getValue(opCode, 2, i);
                        i += 4;
                        break;
                    case 4:
                        console.log(getValue(opCode, 1, i));
                        i += 2;
                        break;
                    case 5:
                        if (getValue(opCode, 1, i) !== 0) {
                            i = getValue(opCode, 2, i);
                            console.log(i);
                        } else i += 3;
                        break;
                    case 6:
                        if (getValue(opCode, 1, i) === 0) i = getValue(opCode, 2, i);
                        else i += 3;
                        break;
                    case 7:
                        intCode[intCode[i + 3]] = getValue(opCode, 1, i) < getValue(opCode, 2, i) ? 1 : 0;
                        i += 4;
                        break;
                    case 8:
                        intCode[intCode[i + 3]] = getValue(opCode, 1, i) === getValue(opCode, 2, i) ? 1 : 0;
                        i += 4;
                        break;
                }
                break;
        }
    }
};

const immediateMode = code => {
    let opcode = [];
    opcode.push(code % 100);
    opcode.push(Math.floor(code / 100) % 10);
    opcode.push(Math.floor(code / 1000) % 10);
    opcode.push(Math.floor(code / 10000) % 10);
    return opcode;
};

const getValue = (opCode, index, i) => {
    return opCode[index] === 0 ? intCode[intCode[i + index]] : intCode[i + index];
};

gravityAssistant(5);
