// import * as fs from 'fs';
// import * as path from 'path';

// const input : string = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim();

const x = [60, 94], y = [-171, -136];
const minXVelocity = Math.ceil(0.5 * (-1 + Math.sqrt(1 + 8 * x[0])));
const minYVelocity = y[0];
const maxXVelocity = x[1];
const maxYVelocity = -y[0] - 1;

// console.log(minXVelocity, maxXVelocity, minYVelocity, maxYVelocity)

let sum = 0;

for (let i = minXVelocity; i <= maxXVelocity; i++) {
    for (let j = minYVelocity; j <= maxYVelocity; j++) {
        sum += simulate(i, j);
    }
}

function simulate(i: number, j: number) : 1 | 0 {
    let currentPos = [0, 0];
    while (currentPos[0] <= x[1] && currentPos[1] >= y[0]) {
        if (currentPos[0] >= x[0] && currentPos[1] <= y[1]) return 1;
        currentPos[0] += i;
        currentPos[1] += j;
        if (i > 0) i -= 1;
        if (i < 0) i += 1;
        j -= 1;
    }
    return 0;
}

console.log(sum);
