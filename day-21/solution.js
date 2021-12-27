"use strict";
const winningScore = 1000;
let playerPositions = [8, 7];
let playerScores = [0, 0];
let dieCounter = 0;
function getDieNumberGenerator() {
    let dieNumber = 0;
    return () => {
        dieCounter++;
        let ans = ++dieNumber;
        dieNumber %= 100;
        return ans;
    };
}
function movePlayer(n, p) {
    playerPositions[p] += n - 1;
    playerPositions[p] %= 10;
    playerPositions[p] += 1;
    playerScores[p] += playerPositions[p];
}
const getDieNumber = getDieNumberGenerator();
// for (let i = 0; i < 102; i++) {
//     console.log(getDieNumber());
// }
while (true) {
    // player 1 plays
    const numberOfMovesP1 = getDieNumber() + getDieNumber() + getDieNumber();
    movePlayer(numberOfMovesP1, 0);
    if (playerScores[0] >= winningScore)
        break;
    const numberOfMovesP2 = getDieNumber() + getDieNumber() + getDieNumber();
    movePlayer(numberOfMovesP2, 1);
    if (playerScores[1] >= winningScore)
        break;
}
console.log(Math.min(...playerScores) * dieCounter);
