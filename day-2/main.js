const fs = require ('fs');
const util = require('util');
const EXPECTED = 19690720;

const input = fs.readFileSync('input', {encoding: 'utf8'}).replace('\n', "").split(',').map(Number);

const gravityAssistant = (input, replace1, replace2) => {
    let i = 0;
    let output;
    let code = input.slice();
    code [1] =  replace1;
    code [2] =  replace2;
    while( code[i]!==99) {
        output = code[i+3];
        code [output] = operationManager(code, code[i], code[i+1], code[i+2]);
        i += 4;
    }
    return code[0];
};

const bruteForce = () => {
    let result = 0;
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            result = gravityAssistant(input, noun, verb);
            if (result === EXPECTED) {
                console.log("PORCA PUTTANA TROIA")
                return [noun, verb, 100*noun+verb];
            }
        }
    }
}

const operationManager = (arr, operator, x, y) => {
    return operator === 1 ? arr[x]+arr[y] : arr[x]*arr[y];
};
console.log( gravityAssistant(input, 12, 2));
console.log(bruteForce())

